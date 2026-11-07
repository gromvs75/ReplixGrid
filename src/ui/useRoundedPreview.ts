import type {KitPart} from '../accessoryKernel.js';
import {useEffect,useMemo,useRef,useState} from 'react';
import {toCreasedNormals} from 'three/addons/utils/BufferGeometryUtils.js';
import {STLLoader} from 'three/addons/loaders/STLLoader.js';
import type {PrintPiece} from '../assemblyKernel.js';
import type {BufferGeometry} from 'three';
import type {Project} from '../model.js';
import {PreviewQueue} from '../previewQueue.js';
export type PreviewPiece=Omit<PrintPiece,'stl'>&{geometry:BufferGeometry};
const enabled=(p:Project)=>!!p.topEdge||!!p.baseBand||!!p.label||!!p.stack||!!p.lid||!!p.cups?.length||!!p.innerCornerRadius||!!p.relief||!!Object.keys(p.cutouts??{}).length||!!p.shell||!!p.tilt||!!p.footprint||!!p.printing||(p.cornerRadius??0)>0;
export function useRoundedPreview(project:Project){
  // Appearance changes must never rebuild the printable mesh.
  const geometryKey=JSON.stringify({...project,printArea:undefined,colors:undefined,cups:project.cups?.map(c=>({...c,color:undefined}))});
  const geometryProject=useMemo(()=>JSON.parse(geometryKey) as Project,[geometryKey]);
  const [result,setResult]=useState<{extras:(Omit<KitPart,'stl'>&{geometry:BufferGeometry})[];activeZ:number;organizer:BufferGeometry|null;shell:BufferGeometry|null;pieces:PreviewPiece[];pending:boolean;error:string;sourceProject:Project|null}>({extras:[],activeZ:0,organizer:null,shell:null,pieces:[],pending:false,error:'',sourceProject:null});
  const runtime=useRef<{submit:(p:Project)=>void}|null>(null);
  useEffect(()=>{
    let worker=new Worker(new URL(`${import.meta.env.BASE_URL}kernel/worker-tier-panels-v1.js`,window.location.origin),{type:'module'});
    const queue=new PreviewQueue<Project>(enabled);
    let watchdog:ReturnType<typeof setTimeout>|undefined;
    let active=true,needsRestart=false;
    const send=()=>{const job=queue.take();if(job){if(needsRestart){worker=new Worker(new URL(`${import.meta.env.BASE_URL}kernel/worker-tier-panels-v1.js`,window.location.origin),{type:'module'});worker.onmessage=receive;worker.onerror=failed;needsRestart=false;}setResult(old=>({...old,pending:true,error:''}));watchdog=setTimeout(failed,120000);worker.postMessage({...job,purpose:'preview'});}};
    const receive=(event:MessageEvent)=>{
      const {data}=event;
      if(!active)return;
      const completed=queue.complete(data.revision);
      if(!completed)return;
      clearTimeout(watchdog);
      const {job,current,visible,next}=completed;
      // Display completed exact meshes during a gesture, even while a newer build waits.
      if(visible){
        if(data.ok&&Array.isArray(data.pieces)){const loader=new STLLoader();setResult({extras:(data.extras??[]).map(({stl,...part}:KitPart)=>({...part,geometry:loader.parse(stl)})),activeZ:0,sourceProject:job.project,organizer:null,shell:null,pieces:data.pieces.map(({stl,...p}:PrintPiece)=>({...p,geometry:loader.parse(stl)})),pending:!current,error:''});}
        else if(data.ok&&data.organizer instanceof ArrayBuffer){const loader=new STLLoader(),organizer=toCreasedNormals(loader.parse(data.organizer),job.project.relief?Math.PI/9:Math.PI/4),shell=data.shell?loader.parse(data.shell):null;
          if(data.organizerPosition)organizer.translate(...data.organizerPosition as [number,number,number]);
          if(shell&&data.shellPosition)shell.translate(...data.shellPosition as [number,number,number]);
          setResult({extras:(data.extras??[]).map(({stl,...part}:KitPart)=>({...part,geometry:loader.parse(stl)})),activeZ:data.activeZ??0,sourceProject:job.project,organizer,shell,pieces:[],pending:!current,error:data.error??''});
        }else if(current) setResult(old=>({...old,pending:false,error:data.error||'Не удалось построить форму. Измените размеры или упростите узор.'}));
      }
      if(next)send();
    };
    const failed=()=>{if(!active)return;clearTimeout(watchdog);const completed=queue.flight?queue.complete(queue.flight.revision):null;worker.terminate();needsRestart=true;if(completed?.current&&completed.visible)setResult(old=>({...old,pending:false,error:'Не удалось запустить построение формы. Обновите страницу.'}));if(completed?.next)send();};
    worker.onmessage=receive;worker.onerror=failed;
    runtime.current={submit:p=>{queue.submit(p);setResult(old=>({...old,pending:enabled(p),error:''}));send();}};
    return()=>{active=false;clearTimeout(watchdog);worker.terminate();runtime.current=null;};
  },[]);
  useEffect(()=>{runtime.current?.submit(geometryProject);},[geometryProject]);
  useEffect(()=>()=>{result.extras.forEach(p=>p.geometry.dispose());result.organizer?.dispose();result.shell?.dispose();result.pieces.forEach(p=>p.geometry.dispose());},[result.organizer,result.shell,result.pieces,result.extras]);
  return result;
}
