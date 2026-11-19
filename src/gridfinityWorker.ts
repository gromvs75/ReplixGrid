import {configuredBedSettings} from './printerBed.js';
import {preparePrintBeds,packedBedFiles} from './printBeds.js';
import {gridfinityExportItems,validateGridfinityAssembly,gridfinityAssemblyItems,type GridfinitySelection} from './gridfinityAssembly.js';
import {buildGridfinity} from './gridfinityKernel.js';
import {gridPitch,gridfinitySize,hasGridfinityLid,gridfinityColor} from './gridfinity.js';
import {type ExportPart} from './exportFormats.js';
import {inspectPrintParts} from './preflight.js';
import {zipFiles} from './zip.js';
import license from '../public/licenses/GRIDFINITY-MIT.txt';
let prepared:ExportPart[]|null=null,packing:ReturnType<typeof preparePrintBeds>|null=null,checkedKey='';
async function preview(project:import('./gridfinity.js').GridfinityProject,kind:'tray'|'plate'){
 const {stl}=await buildGridfinity(project,kind);
 const lid=kind==='tray'&&hasGridfinityLid(project)?(await buildGridfinity(project,'lid')).stl:undefined;
 const tag=kind==='tray'&&project.label?.mode==='tag'?(await buildGridfinity(project,'tag')).stl:undefined;
 return {stl,lid,tag};
}
function buffers(mesh:{stl:ArrayBuffer;lid?:ArrayBuffer;tag?:ArrayBuffer}){
 return [mesh.stl,mesh.lid,mesh.tag].filter((v):v is ArrayBuffer=>v!==undefined);
}
self.onmessage=async({data})=>{
 try{
  if(data.purpose==='assembly-preview'){
   const items=gridfinityAssemblyItems(validateGridfinityAssembly(data.assembly)),meshes=[];
   for(const item of items){meshes.push({id:item.id,...await preview(item.project,item.kind)});}
   self.postMessage({meshes},{transfer:meshes.flatMap(buffers)});return;
  }
  if(!data.purpose){const result=await preview(data.project,data.part);self.postMessage({id:data.id,...result},{transfer:buffers(result)});return;}
  const key=JSON.stringify([data.gridfinity,data.assembly,data.selection,data.part,data.project]);
  if(data.purpose==='check'){
   prepared=null;packing=null;checkedKey='';const p=data.gridfinity;
   const kinds:('tray'|'plate')[]=data.part==='all'?['tray','plate']:[data.part];
   const parts:ExportPart[]=[];
   if(data.assembly){
    const a=validateGridfinityAssembly(data.assembly),selection=data.selection as GridfinitySelection;
    const items=gridfinityExportItems(a,selection,data.part);
    for(const item of items){const result=await buildGridfinity(item.project,item.kind);parts.push({name:item.name,stl:result.stl,color:item.color});}
   }else for(const part of kinds){const result=await buildGridfinity(p,part);parts.push({name:`Gridfinity-${part}-${p.columns}x${p.rows}`,stl:result.stl,color:gridfinityColor(p,part)});}
   const inspected=inspectPrintParts(data.project,parts);
   packing=preparePrintBeds(parts,configuredBedSettings(data.project));
   const report={...inspected,packing:packing.report};prepared=parts;checkedKey=key;
   self.postMessage({revision:data.revision,ok:true,report,partColors:parts.map(({name,color})=>({name,color}))});
  }else{
   if(!prepared||!packing||key!==checkedKey)throw Error('Сначала проверьте детали.');
   const files=packedBedFiles(packing.units,packing.report,data.format,data.partSlots);
   const formatted=zipFiles([...(data.assembly?[{name:'Gridfinity.replixgrid-gridfinity.json',data:JSON.stringify(data.assembly,null,2)},{name:'assembly-layout.svg',data:assemblyDiagram(data.assembly)}]:[]),...files,{name:'print-plan.json',data:JSON.stringify(packing.report,null,2)},{name:'GRIDFINITY-MIT.txt',data:license},{name:'README.txt',data:(data.assembly?.drawer?`ReplixGrid — custom drawer grid. Cell pitch: ${gridPitch(data.assembly.plates[0].project).join(' x ')} mm. Use matching trays.`:'ReplixGrid — Gridfinity lower-interface compatibility.')+' Units: mm; print at 100% scale.\nOne bed-NN.3mf per print bed, using the configured printer dimensions, 2 mm edge margins and 5 mm spacing. Keep object positions when importing a bed. Bed SVGs and print-plan.json describe the arrangement. The bed count is not a guaranteed minimum. Check supports, brim and filament assignments in your slicer. STL and OBJ models require placement following the supplied plans. 3MF preserves colors and selected filament assignments. No printer profiles are included.\nEnable the stacking lip on each lower tray to stack trays with the same footprint. Test the fit before printing a large set.\nReference dimensions: Gridfinity Rebuilt by Kenneth Hodson; original Gridfinity by Zack Freedman / Voidstar Lab LLC. See accompanying MIT notices.\n'}]);
   self.postMessage({revision:data.revision,ok:true,formatted,extension:'zip',mime:'application/zip',count:prepared.length},{transfer:[formatted]});
  }
 }catch(error){self.postMessage({id:data.id,revision:data.revision,ok:false,error:error instanceof Error?error.message:'Gridfinity geometry failed'});}
};

function assemblyDiagram(a:import('./gridfinityAssembly.js').GridfinityAssembly){
 const [px,py]=gridPitch(a.plates[0].project);
 const w=Math.max(...a.plates.map(p=>(p.x+p.project.columns)*px)),h=Math.max(...a.plates.map(p=>(p.y+p.project.rows)*py));
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 ${w+24} ${h+24}"><title>Gridfinity assembly layout · ${a.drawer?'custom grid '+px+' × '+py+' mm':'42 mm'}</title><rect x="-12" y="-12" width="${w+24}" height="${h+24}" fill="white"/>${gridfinityAssemblyItems(a).sort((a,b)=>Number(a.kind==='tray')-Number(b.kind==='tray')).map(item=>{const size=gridfinitySize(item.project,item.kind),width=size[item.rotated?1:0],height=size[item.rotated?0:1];return `<rect x="${item.position[0]}" y="${item.position[1]}" width="${width}" height="${height}" fill="${item.color}" stroke="#334155" stroke-width="${item.kind==='plate'?1:.4}"/><text x="${item.position[0]+3}" y="${item.position[1]+(item.kind==='plate'?8:17)}" font-size="5" fill="#111">${item.name}</text>`;}).join('')}</svg>`;
}
