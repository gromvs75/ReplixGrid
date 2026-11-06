import {prepareDrawer,drawerArchive,type PreparedDrawer} from './drawerExport.js';
import type {DrawerLayout} from './drawer.js';
import type {BedSettings} from './bedPacking.js';
let prepared:PreparedDrawer|null=null,serial=0,key='',checkedRevision=0;
globalThis.onmessage=async({data}:MessageEvent<{purpose:'check'|'download';revision:number;layout:DrawerLayout;settings:BedSettings}>)=>{
 const {revision,layout,settings,purpose}=data,requestKey=JSON.stringify({layout,settings});
 try{
  if(purpose==='check'){const n=++serial;prepared=null;key='';const p=await prepareDrawer(layout,settings,text=>globalThis.postMessage({revision,progress:text}));if(n!==serial)return;prepared=p;key=requestKey;checkedRevision=revision;globalThis.postMessage({revision,ok:true,report:p.report});}
  else {if(!prepared||key!==requestKey||checkedRevision!==revision)throw Error('Сначала проверьте детали.');const archive=drawerArchive(prepared);globalThis.postMessage({revision,ok:true,archive},{transfer:[archive]});}
 }catch(e){prepared=null;key='';globalThis.postMessage({revision,ok:false,error:(e as Error).message});}
};
