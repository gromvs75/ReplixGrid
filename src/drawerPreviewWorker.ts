import {createDrawerPreviewBuilder} from './drawerPreviewKernel.js';
import type {DrawerPreviewRequest,DrawerPreviewResponse} from './drawerPreview.js';

const build=createDrawerPreviewBuilder();
let pending:DrawerPreviewRequest|undefined,running=false;

globalThis.onmessage=async({data}:MessageEvent<DrawerPreviewRequest>)=>{
 pending=data;
 if(running)return;
 running=true;
 try{
  while(pending){
   const {revision,layout}=pending;
   pending=undefined;
   const response:DrawerPreviewResponse={revision};
   try{response.preview=await build(layout);}
   catch(error){response.error=error instanceof Error?error.message:String(error);}
   if(!pending)globalThis.postMessage(response);
  }
 }finally{running=false;}
};
