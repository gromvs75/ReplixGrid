import {prepareDrawer,drawerArchive,type PreparedDrawer} from './drawerExport.js';
import type {DrawerLayout} from './drawer.js';
import type {BedSettings} from './bedPacking.js';
import type {ExportFormat} from './exportFormats.js';
let prepared:PreparedDrawer|null=null,serial=0,key='',checkedRevision=0;
globalThis.onmessage=async({data}:MessageEvent<{purpose:'check'|'download';revision:number;layout:DrawerLayout;settings:BedSettings;format?:ExportFormat;partSlots?:(number|null)[]}>)=>{
 const {revision,layout,settings,purpose}=data,requestKey=JSON.stringify({layout,settings});
 try{
  if(purpose==='check'){
   const n=++serial;prepared=null;key='';const p=await prepareDrawer(layout,settings);if(n!==serial)return;prepared=p;key=requestKey;checkedRevision=revision;
   const report={area:{bedWidth:settings.length,bedDepth:settings.width,bedHeight:settings.height},rows:p.report.items.map(item=>({...item,fits:true,rotate:false})),warnings:p.report.warnings,ok:true,packing:p.report};
   globalThis.postMessage({revision,ok:true,report,partColors:p.units.flatMap(u=>u.parts.map(part=>({name:u.parts.length===1?u.name:u.name+'-'+part.name,color:part.color})))});
  }else{
   if(!prepared||key!==requestKey||checkedRevision!==revision)throw Error('Сначала проверьте детали.');const formatted=drawerArchive(prepared,data.format,data.partSlots);
   globalThis.postMessage({revision,ok:true,formatted,extension:'zip',mime:'application/zip',count:prepared.report.partCount},{transfer:[formatted]});
  }
 }catch(e){prepared=null;key='';globalThis.postMessage({revision,ok:false,error:(e as Error).message});}
};
