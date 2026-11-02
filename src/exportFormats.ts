import {decodeSTL,type Point} from './stl.js';
import {zipFiles} from './zip.js';
export type ExportFormat='stl'|'3mf'|'obj';
export interface ExportPart {name:string;stl:ArrayBuffer;color:string}
const escapeXML=(s:string)=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export function indexedMesh(stl:ArrayBuffer){
 const vertices:Point[]=[],faces:number[][]=[],map=new Map<string,number>();
 for(const triangle of decodeSTL(stl))faces.push(triangle.map(p=>{const key=p.join(',');let index=map.get(key);if(index===undefined){index=vertices.length;vertices.push(p);map.set(key,index);}return index;}));
 return {vertices,faces};
}
export function formatExport(parts:ExportPart[],format:ExportFormat,objInstructions?:string,filamentSlots:Record<string,number>={},partSlots?:Array<number|null>){
 if(!parts.length)throw new Error('Нет деталей для экспорта');
 for(const part of parts)if(!/^#[0-9a-f]{6}$/i.test(part.color))throw new Error('Invalid export color');
 if(format==='stl'){
  if(parts.length===1)return {data:parts[0].stl,extension:'stl',mime:'model/stl'};
  return {data:zipFiles(parts.map((p,i)=>({name:`${i+1}-${p.name}.stl`,data:p.stl}))),extension:'zip',mime:'application/zip'};
 }
 const meshes=parts.map(p=>indexedMesh(p.stl));
 // Distinct objects, resting on Z=0 with a 10 mm gap. Slicer can rearrange them.
 let cursor=0;
 const positions=meshes.map(mesh=>{let minX=Infinity,maxX=-Infinity,minY=Infinity,minZ=Infinity;for(const p of mesh.vertices){minX=Math.min(minX,p[0]);maxX=Math.max(maxX,p[0]);minY=Math.min(minY,p[1]);minZ=Math.min(minZ,p[2]);}const position=[cursor-minX,-minY,-minZ];cursor+=maxX-minX+10;return position;});
 if(format==='3mf'){
  const materials=parts.map(p=>`<base name="${escapeXML(p.name)}" displaycolor="${p.color.toUpperCase()}FF"/>`).join('');
  const objects=meshes.map((mesh,i)=>`<object id="${i+2}" type="model" name="${escapeXML(parts[i].name)}" pid="1" pindex="${i}"><mesh><vertices>${mesh.vertices.map(v=>`<vertex x="${v[0]}" y="${v[1]}" z="${v[2]}"/>`).join('')}</vertices><triangles>${mesh.faces.map(f=>`<triangle v1="${f[0]}" v2="${f[1]}" v3="${f[2]}"/>`).join('')}</triangles></mesh></object>`).join('');
  const model=`<?xml version="1.0" encoding="UTF-8"?><model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"><metadata name="Application">ReplixGrid</metadata><resources><basematerials id="1">${materials}</basematerials>${objects}</resources><build>${positions.map((p,i)=>`<item objectid="${i+2}" transform="1 0 0 0 1 0 0 0 1 ${p.join(' ')}"/>`).join('')}</build></model>`;
  const assignments=parts.map((p,i)=>{const slot=partSlots?partSlots[i]:filamentSlots[p.color.toLowerCase()];return typeof slot==='number'&&Number.isInteger(slot)&&slot>=1&&slot<=64?`<object id="${i+2}"><metadata key="name" value="${escapeXML(p.name)}"/><metadata key="extruder" value="${slot}"/></object>`:'';}).join('');
  const files=[{name:'[Content_Types].xml',data:'<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>'},{name:'_rels/.rels',data:'<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" Target="/3D/3dmodel.model"/></Relationships>'},{name:'3D/3dmodel.model',data:model}];
  if(assignments)files.push({name:'Metadata/model_settings.config',data:`<?xml version="1.0" encoding="UTF-8"?><config>${assignments}</config>`});
  return {data:zipFiles(files),extension:'3mf',mime:'model/3mf'};
 }
 let offset=1;const obj=['# Units: millimeters. Z up. Parts placed separately.','mtllib materials.mtl'];
 const mtl:string[]=[];
 meshes.forEach((mesh,i)=>{const material=`material_${i+1}`,position=positions[i];obj.push(`o part_${i+1}`,`usemtl ${material}`);for(const v of mesh.vertices)obj.push(`v ${v.map((n,k)=>n+position[k]).join(' ')}`);for(const f of mesh.faces)obj.push(`f ${f.map(n=>n+offset).join(' ')}`);offset+=mesh.vertices.length;const hex=parts[i].color.slice(1);mtl.push(`newmtl ${material}`,`Kd ${[0,2,4].map(k=>parseInt(hex.slice(k,k+2),16)/255).join(' ')}`,'Ka 0 0 0','d 1','illum 1','');});
 return {data:zipFiles([{name:'organizer.obj',data:obj.join('\n')+'\n'},{name:'materials.mtl',data:mtl.join('\n')},{name:'README.txt',data:objInstructions??'OBJ: миллиметры, Z вверх. Оставьте OBJ и MTL в одной папке для цветов. Детали размещены рядом; расположите их на столе в слайсере.'}]),extension:'zip',mime:'application/zip'};
}
