import {indexedMesh,formatExport,type ExportFormat,type ExportPart} from './exportFormats.js';
import {decodeSTL,inspectSurface} from './stl.js';
import {packBeds,type BedSettings,type BedPlan,type Placement} from './bedPacking.js';
import {zipFiles} from './zip.js';
export interface PrintUnit {name:string;parts:ExportPart[];min:number[];size:number[]}
type Unit=PrintUnit;
const xml=(s:string)=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
/** Core 3MF: one build item per printable unit, component groups retain multicolour lid alignment. */
export function bed3mf(units:Unit[],placements:Placement[],partSlots:(number|null)[]=[]){
 let id=2;const materials:string[]=[],objects:string[]=[],build:string[]=[],assignments:string[]=[];
 for(const place of placements){const unit=units[place.item],ids:number[]=[];
  const slots=partSlots.slice(units.slice(0,place.item).reduce((n,u)=>n+u.parts.length,0));
  for(const part of unit.parts){const mesh=indexedMesh(part.stl),oid=id++,mi=materials.length;ids.push(oid);materials.push(`<base name="${xml(part.name)}" displaycolor="${part.color.toUpperCase()}FF"/>`);
   objects.push(`<object id="${oid}" type="model" name="${xml(unit.parts.length===1?unit.name:unit.name+'-'+part.name)}" pid="1" pindex="${mi}"><mesh><vertices>${mesh.vertices.map(v=>{const p=v.map((n,k)=>n-unit.min[k]);const x=place.rotation?unit.size[1]-p[1]:p[0],y=place.rotation?p[0]:p[1];return `<vertex x="${x+place.x}" y="${y+place.y}" z="${p[2]}"/>`;}).join('')}</vertices><triangles>${mesh.faces.map(f=>`<triangle v1="${f[0]}" v2="${f[1]}" v3="${f[2]}"/>`).join('')}</triangles></mesh></object>`);
  }
  const group=id++;objects.push(`<object id="${group}" type="model" name="${xml(unit.name)}"><components>${ids.map(i=>`<component objectid="${i}"/>`).join('')}</components></object>`);build.push(`<item objectid="${group}"/>`);
  assignments.push(`<object id="${group}">${ids.map((oid,i)=>`<part id="${oid}" subtype="normal_part"><metadata key="name" value="${xml(unit.parts.length===1?unit.name:unit.name+'-'+unit.parts[i].name)}"/>${Number.isInteger(slots[i])&&slots[i]!>=1&&slots[i]!<=64?`<metadata key="extruder" value="${slots[i]}"/>`:''}</part>`).join('')}</object>`);
 }
 return zipFiles([{name:'Metadata/model_settings.config',data:`<?xml version="1.0" encoding="UTF-8"?><config>${assignments.join('')}</config>`},{name:'[Content_Types].xml',data:'<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>'},{name:'_rels/.rels',data:'<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" Target="/3D/3dmodel.model"/></Relationships>'},{name:'3D/3dmodel.model',data:`<?xml version="1.0" encoding="UTF-8"?><model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"><metadata name="Application">ReplixGrid</metadata><resources><basematerials id="1">${materials.join('')}</basematerials>${objects.join('')}</resources><build>${build.join('')}</build></model>`}]);
}

export function packedBedFiles(units:PrintUnit[],report:BedPlan,format:ExportFormat='3mf',partSlots:(number|null)[]=[]){
 const files:{name:string;data:ArrayBuffer|string}[]=[];
 report.beds.forEach((bed,i)=>{const name=`bed-${String(i+1).padStart(2,'0')}`;if(format==='3mf')files.push({name:name+'.3mf',data:bed3mf(units,bed,partSlots)});files.push({name:name+'.svg',data:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${report.settings.length} ${report.settings.width}"><rect width="100%" height="100%" fill="white"/>${bed.map(v=>`<rect x="${v.x}" y="${v.y}" width="${v.width}" height="${v.depth}" fill="#bdd4c8" stroke="#325e4d" stroke-width=".5"/><text x="${v.x+2}" y="${v.y+5}" font-size="3">${v.item+1}</text>`).join('')}</svg>`});});
 if(format==='obj'){units.forEach((unit,i)=>{const out=formatExport(unit.parts,'obj');files.push({name:`unit-${i+1}-obj.zip`,data:out.data});});}
 if(format==='stl'){const parts=units.flatMap(u=>u.parts.map(part=>({...part,name:u.parts.length===1?u.name:u.name+'-'+part.name})));const out=formatExport(parts,format);files.push({name:`models.${out.extension}`,data:out.data});}
 return files;
}

export function preparePrintBeds(parts:ExportPart[],settings:BedSettings){
 let bytes=0;
 const units=parts.map(part=>{bytes+=part.stl.byteLength;if(bytes>150_000_000)throw Error('Комплект слишком большой. Экспортируйте часть лотков отдельно.');const check=inspectSurface(decodeSTL(part.stl));return {name:part.name,parts:[part],min:check.bounds.min,size:check.bounds.max.map((v,i)=>v-check.bounds.min[i])};});
 const items=units.map(({name,size})=>({name,size}));
 return {units,report:{...packBeds(items,settings),items,partCount:parts.length,warnings:[] as string[]}};
}
