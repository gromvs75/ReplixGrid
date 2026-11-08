import {useEffect,useRef,useState} from 'react';
import type {DrawerTray,TrayBounds} from '../drawer.js';
/** Geometry jobs are revision-bound; positions do not trigger a rebuild. */
export function useDrawerBounds(trays:DrawerTray[]){
 const cache=useRef(new Map<string,TrayBounds>()),[results,setResults]=useState<Record<string,{key:string;bounds?:TrayBounds;error?:string}>>({});
 const key=JSON.stringify(trays.map(t=>({id:t.id,project:t.project})));
 useEffect(()=>{
  const input=JSON.parse(key) as DrawerTray[],worker=new Worker('/kernel/worker-svg-thickness-v2.js',{type:'module'});let cancelled=false,timer:ReturnType<typeof setTimeout>;
  const run=async()=>{for(const tray of input){if(cancelled)break;const projectKey=JSON.stringify(tray.project),cached=cache.current.get(projectKey);
    let value:{bounds?:TrayBounds;error?:string};
    if(cached)value={bounds:cached};else value=await new Promise(resolve=>{
      timer=setTimeout(()=>resolve({error:'Не удалось проверить габариты. Откройте лоток и проверьте модель.'}),90000);
      worker.onerror=()=>{clearTimeout(timer);resolve({error:'Не удалось проверить габариты. Откройте лоток и проверьте модель.'});};
      worker.onmessage=e=>{if(e.data.revision!==tray.id)return;clearTimeout(timer);resolve(e.data.ok?{bounds:e.data.bounds}:{error:e.data.error});};worker.postMessage({revision:tray.id,project:tray.project,purpose:'drawer'});
    });
    if(cancelled)break;if(value.bounds)cache.current.set(projectKey,value.bounds);setResults(r=>({...r,[tray.id]:{key:projectKey,...value}}));
  }};void run();return()=>{cancelled=true;clearTimeout(timer);worker.terminate();};
 },[key]);
 const bounds:Record<string,TrayBounds>={},errors:Record<string,string>={};
 for(const tray of trays){const r=results[tray.id];if(r?.key!==JSON.stringify(tray.project))continue;if(r.bounds)bounds[tray.id]=r.bounds;if(r.error)errors[tray.id]=r.error;}
 return {bounds,errors};
}
