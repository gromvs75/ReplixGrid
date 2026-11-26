import {useEffect,useRef,useState} from 'react';
import type {DrawerLayout,TrayBounds} from '../drawer.js';
import {drawerPreviewPlateKey,drawerPreviewWorkerUrl,reuseDrawerPreviewMeshes,type DrawerPreview,type DrawerPreviewResponse} from '../drawerPreview.js';

interface DrawerPreviewResult {
 key:string;
 error?:string;
 ready?:{id:string;plateKey:string;preview:DrawerPreview};
}

export function useDrawerPreview(layout:DrawerLayout|null){
 const worker=useRef<Worker|null>(null),revision=useRef(0);
 const receive=useRef<(value:DrawerPreviewResponse)=>void>(()=>{});
 const [result,setResult]=useState<DrawerPreviewResult>();
 // The plan rotation and labels do not affect part geometry.
 const key=layout?JSON.stringify({
  ...layout,viewRotation:undefined,name:'',trays:layout.trays.map(tray=>({...tray,name:''})),
 }):'';

 useEffect(()=>{
  const instance=new Worker(drawerPreviewWorkerUrl,{type:'module'});
  worker.current=instance;
  instance.onmessage=(event:MessageEvent<DrawerPreviewResponse>)=>receive.current(event.data);
  instance.onerror=()=>receive.current({revision:revision.current,error:'Не удалось построить предпросмотр ящика.'});
  return()=>{instance.terminate();worker.current=null;};
 },[]);

 useEffect(()=>{
  if(!key)return;
  const request=JSON.parse(key) as DrawerLayout,current=++revision.current;
  const plateKey=drawerPreviewPlateKey(request);
  const timer=setTimeout(()=>receive.current({revision:current,error:'Не удалось построить предпросмотр ящика.'}),180_000);
  receive.current=({revision,preview,error})=>{
   if(revision!==current)return;
   clearTimeout(timer);
   setResult(previous=>{
    const old=previous?.ready;
    const compatible=old?.id===request.id&&old.plateKey===plateKey?old.preview:undefined;
    const ready=preview?{id:request.id,plateKey,preview:reuseDrawerPreviewMeshes(preview,compatible)}:old;
    return {key,ready,error};
   });
  };
  worker.current?.postMessage({revision:current,layout:request});
  return()=>{clearTimeout(timer);receive.current=()=>{};};
 },[key]);

 const latest=result?.key===key?result:undefined;
 const ready=result?.ready;
 const visible=ready?.id===layout?.id?ready:undefined;
 const bounds:Record<string,TrayBounds>={},errors:Record<string,string>={};
 const trays=[];
 for(const tray of layout?.trays??[]){
  const geometry=visible?.preview.trays.find(item=>item.id===tray.id&&item.projectKey===JSON.stringify(tray.project));
  if(geometry?.bounds)bounds[tray.id]=geometry.bounds;
  if(geometry?.error)errors[tray.id]=geometry.error;
  if(geometry)trays.push(geometry);
 }
 // Keep the assembly visible for pose edits. Only the current worker response can confirm fit.
 const scenePreview=layout&&visible?.plateKey===drawerPreviewPlateKey(layout)?{...visible.preview,trays}:undefined;
 return {preview:latest&&!latest.error?latest.ready?.preview:undefined,scenePreview,bounds,errors,busy:!!key&&!latest,error:latest?.error};
}
