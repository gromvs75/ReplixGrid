import {parseDrawer,drawerIssues,type DrawerLayout,type TrayBounds} from './drawer.js';
import {buildKit} from './accessoryKernel.js';
import {exportParts} from './exportParts.js';
import {buildPlateTiles,mountedKit} from './mountingKernel.js';
import {indexedMesh,type ExportPart} from './exportFormats.js';
import {decodeSTL,inspectSurface} from './stl.js';
import {packBeds,type BedSettings,type BedPlan,type Placement} from './bedPacking.js';
import {platePlan} from './mountingPlate.js';
import {zipFiles} from './zip.js';
export const xml=(s:string)=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
interface Unit {name:string;parts:ExportPart[];min:number[];size:number[]}
export interface DrawerPrintReport extends BedPlan {items:{name:string;size:number[]}[];partCount:number;warnings:string[]}
export interface PreparedDrawer {layout:DrawerLayout;bounds:Record<string,TrayBounds>;units:Unit[];report:DrawerPrintReport}
export async function prepareDrawer(input:DrawerLayout,settings:BedSettings,progress:(text:string)=>void=()=>{}):Promise<PreparedDrawer>{
 const layout=parseDrawer(JSON.stringify(input));
 if(!layout.trays.length&&!layout.plate?.enabled)throw Error('Ящик пуст. Добавьте органайзер или включите пластину.');
 if(layout.plate?.enabled){layout.plate.bedWidth=settings.length;layout.plate.bedDepth=settings.width;}
 // Validate before expensive geometry work.
 packBeds([],settings);layout.printBed={...settings};
 const units:Unit[]=[],bounds:Record<string,TrayBounds>={},warnings:string[]=[];let bytes=0;
 const add=(name:string,parts:ExportPart[])=>{
  const checks=parts.map(p=>{bytes+=p.stl.byteLength;if(bytes>150_000_000)throw Error('Комплект слишком большой. Экспортируйте часть лотков отдельно.');return inspectSurface(decodeSTL(p.stl));});
  const min=[0,1,2].map(i=>Math.min(...checks.map(c=>c.bounds.min[i]))),max=[0,1,2].map(i=>Math.max(...checks.map(c=>c.bounds.max[i])));
  if(units.length>=500)throw Error('Слишком много деталей. Экспортируйте часть лотков отдельно.');
  units.push({name,parts,min,size:max.map((v,i)=>v-min[i])});
 };
 for(const [i,tray] of layout.trays.entries()){
  progress(`${i+1} / ${layout.trays.length}: ${tray.name}`);
  try{
   const assembled=await buildKit({...tray.project,printing:undefined});
   const min=[0,1,2].map(k=>Math.min(...assembled.map(p=>p.position[k]+p.inspection.bounds.min[k]))),max=[0,1,2].map(k=>Math.max(...assembled.map(p=>p.position[k]+p.inspection.bounds.max[k])));
   bounds[tray.id]={width:max[0]-min[0],depth:max[1]-min[1],height:max[2]-min[2]};
   const parts=layout.plate?.enabled?await mountedKit({layout,trayId:tray.id}):tray.project.printing?await exportParts(tray.project,'kit'):assembled;
   const prefix=`${i+1}-${tray.name||'tray'}`;
   const base=parts.find(p=>p.name==='lid'),accent=parts.find(p=>p.name==='lid-olive');
   for(const part of parts){if(part===accent&&base)continue;add(`${prefix}-${part.name}`,part===base&&accent?[base,accent]:[part]);}
   if(tray.project.tilt)warnings.push(`${prefix}: ${'Наклонные стенки — проверьте поддержки в слайсере.'}`);
   if(tray.project.printing)warnings.push(`${prefix}: ${'Печать по частям — сборка со склейкой.'}`);
  }catch(e){throw Error(`${tray.name||i+1}: ${(e as Error).message}`);}
 }
 const issues=drawerIssues(layout,bounds);for(const tray of layout.trays)if(issues[tray.id]?.length)throw Error(`${tray.name}: ${issues[tray.id].join('; ')}`);
 if(layout.plate?.enabled){progress('Строим секции основания…');for(const tile of await buildPlateTiles(layout))add(tile.name,[{name:tile.name,stl:tile.stl,color:'#a6bcb1'}]);}
 const items=units.map(({name,size})=>({name,size})),plan=packBeds(items,settings);
 return {layout,bounds,units,report:{...plan,items,partCount:units.reduce((n,u)=>n+u.parts.length,0),warnings}};
}
/** Core 3MF: one build item per printable unit, component groups retain multicolour lid alignment. */
export function bed3mf(units:Unit[],placements:Placement[]){
 let id=2;const materials:string[]=[],objects:string[]=[],build:string[]=[];
 for(const place of placements){const unit=units[place.item],ids:number[]=[];
  for(const part of unit.parts){const mesh=indexedMesh(part.stl),oid=id++,mi=materials.length;ids.push(oid);materials.push(`<base name="${xml(part.name)}" displaycolor="${part.color.toUpperCase()}FF"/>`);
   objects.push(`<object id="${oid}" type="model" name="${xml(unit.name+'-'+part.name)}" pid="1" pindex="${mi}"><mesh><vertices>${mesh.vertices.map(v=>{const p=v.map((n,k)=>n-unit.min[k]);const x=place.rotation?unit.size[1]-p[1]:p[0],y=place.rotation?p[0]:p[1];return `<vertex x="${x+place.x}" y="${y+place.y}" z="${p[2]}"/>`;}).join('')}</vertices><triangles>${mesh.faces.map(f=>`<triangle v1="${f[0]}" v2="${f[1]}" v3="${f[2]}"/>`).join('')}</triangles></mesh></object>`);
  }
  const group=id++;objects.push(`<object id="${group}" type="model" name="${xml(unit.name)}"><components>${ids.map(i=>`<component objectid="${i}"/>`).join('')}</components></object>`);build.push(`<item objectid="${group}"/>`);
 }
 return zipFiles([{name:'[Content_Types].xml',data:'<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>'},{name:'_rels/.rels',data:'<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" Target="/3D/3dmodel.model"/></Relationships>'},{name:'3D/3dmodel.model',data:`<?xml version="1.0" encoding="UTF-8"?><model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"><metadata name="Application">ReplixGrid</metadata><resources><basematerials id="1">${materials.join('')}</basematerials>${objects.join('')}</resources><build>${build.join('')}</build></model>`}]);
}
export function drawerArchive(p:PreparedDrawer){
 const files:{name:string;data:ArrayBuffer|string}[]=[],{report,layout}=p;
 report.beds.forEach((bed,i)=>{const name=`bed-${String(i+1).padStart(2,'0')}`;files.push({name:name+'.3mf',data:bed3mf(p.units,bed)},{name:name+'.svg',data:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${report.settings.length} ${report.settings.width}"><rect width="100%" height="100%" fill="white"/>${bed.map(v=>`<rect x="${v.x}" y="${v.y}" width="${v.width}" height="${v.depth}" fill="#bdd4c8" stroke="#325e4d" stroke-width=".5"/><text x="${v.x+2}" y="${v.y+5}" font-size="3">${v.item+1}</text>`).join('')}</svg>`});});
 const tiles=layout.plate?.enabled?platePlan(layout).tiles:[];
 files.push({name:'assembly.svg',data:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${layout.width} ${layout.depth}"><rect width="100%" height="100%" fill="white" stroke="black"/>${tiles.map(v=>`<rect x="${v.x}" y="${v.y}" width="${v.width}" height="${v.depth}" fill="none" stroke="#8797ac" stroke-width=".5"/><text x="${v.x+2}" y="${v.y+5}" font-size="3">R${v.row+1} C${v.column+1}</text>`).join('')}${layout.trays.map((v,i)=>`<rect x="${v.x}" y="${v.y}" width="${v.rotation?p.bounds[v.id].depth:p.bounds[v.id].width}" height="${v.rotation?p.bounds[v.id].width:p.bounds[v.id].depth}" fill="#bdd4c8" fill-opacity=".5" stroke="#325e4d" stroke-width=".5"/><circle cx="${v.x+5}" cy="${v.y+10}" r="4" fill="#325e4d"/><text x="${v.x+5}" y="${v.y+11}" text-anchor="middle" font-size="3" fill="white">${i+1}</text>`).join('')}</svg>`},
 {name:'drawer.replixdrawer.json',data:JSON.stringify(layout,null,2)},
 {name:'print-plan.json',data:JSON.stringify(report,null,2)},
 {name:'README.txt',data:`ReplixGrid — ${layout.name}\n${report.beds.length} print beds / ${report.partCount} parts. Units: mm; scale: 100%.\nBed: ${report.settings.length} x ${report.settings.width} x ${report.settings.height} mm. Edge margin: 2 mm; spacing: ${report.settings.gap} mm.\nOpen each bed-NN.3mf as a separate print job. Import objects together and retain their relative placement. Printer profiles, supports, brim and filament slot assignments are not included. Check these in your slicer before printing. Parts retain names and colour metadata. Multicolour lids remain component assemblies.\nThe bed count describes this rectangular arrangement, not a guaranteed minimum. Brim/supports or material-specific jobs can require extra space/beds.\nNumbers on bed SVGs correspond to the list below. assembly.svg shows section positions and tray numbers in drawer coordinates (length horizontal, width vertical).\n${report.items.map((v,i)=>`${i+1}. ${v.name} — ${v.size.map(n=>n.toFixed(2)).join(' x ')} mm`).join('\n')}\n${report.warnings.join('\n')}\n`});
 return zipFiles(files);
}
