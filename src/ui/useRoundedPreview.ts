import type {KitPart} from '../accessoryKernel.js';
import {useEffect,useMemo,useRef,useState} from 'react';
import {toCreasedNormals} from 'three/addons/utils/BufferGeometryUtils.js';
import {STLLoader} from 'three/addons/loaders/STLLoader.js';
import type {PrintPiece} from '../assemblyKernel.js';
import type {BufferGeometry} from 'three';
import type {Project} from '../model.js';
export type PreviewPiece=Omit<PrintPiece,'stl'>&{geometry:BufferGeometry};
const enabled=(p:Project)=>!!p.baseBand||!!p.label||!!p.stack||!!p.lid||!!p.cups?.length||!!p.innerCornerRadius||!!p.relief||!!Object.keys(p.cutouts??{}).length||!!p.shell||!!p.tilt||!!p.footprint||!!p.printing||(p.cornerRadius??0)>0;
export function useRoundedPreview(project:Project){
  // Appearance changes must never rebuild the printable mesh.
  const geometryKey=JSON.stringify({...project,printArea:undefined,colors:undefined,cups:project.cups?.map(c=>({...c,color:undefined}))});
  const geometryProject=useMemo(()=>JSON.parse(geometryKey) as Project,[geometryKey]);
  const [result,setResult]=useState<{extras:(Omit<KitPart,'stl'>&{geometry:BufferGeometry})[];activeZ:number;organizer:BufferGeometry|null;shell:BufferGeometry|null;pieces:PreviewPiece[];pending:boolean;error:string;sourceProject:Project|null}>({extras:[],activeZ:0,organizer:null,shell:null,pieces:[],pending:false,error:'',sourceProject:null});
  const runtime=useRef<{submit:(p:Project)=>void}|null>(null);
  useEffect(()=>{
    let worker=new Worker(new URL(`${import.meta.env.BASE_URL}kernel/worker.js`,window.location.origin),{type:'module'});
    type Job={revision:number;project:Project};
    let timer:ReturnType<typeof setTimeout>|undefined;
    let serial=0,latest:Job|null=null,flight:Job|null=null,active=true;
    const send=()=>{if(!timer&&!flight&&latest&&enabled(latest.project)){flight=latest;worker.postMessage({...flight,purpose:'preview'});}};
    const receive=(event:MessageEvent)=>{
      const {data}=event;
      if(!active||!flight||data.revision!==flight.revision)return;const job=flight;flight=null;
      if(latest&&enabled(latest.project)&&data.revision===latest.revision){
        if(data.ok&&Array.isArray(data.pieces)){const loader=new STLLoader();setResult({extras:(data.extras??[]).map(({stl,...part}:KitPart)=>({...part,geometry:loader.parse(stl)})),activeZ:0,sourceProject:job.project,organizer:null,shell:null,pieces:data.pieces.map(({stl,...p}:PrintPiece)=>({...p,geometry:loader.parse(stl)})),pending:data.revision!==latest?.revision,error:''});}
        else if(data.ok&&data.organizer instanceof ArrayBuffer){const loader=new STLLoader(),organizer=toCreasedNormals(loader.parse(data.organizer),job.project.relief?Math.PI/9:Math.PI/4),shell=data.shell?loader.parse(data.shell):null;
          if(data.organizerPosition)organizer.translate(...data.organizerPosition as [number,number,number]);
          if(shell&&data.shellPosition)shell.translate(...data.shellPosition as [number,number,number]);
          setResult({extras:(data.extras??[]).map(({stl,...part}:KitPart)=>({...part,geometry:loader.parse(stl)})),activeZ:data.activeZ??0,sourceProject:job.project,organizer,shell,pieces:[],pending:data.revision!==latest?.revision,error:''});
        }else setResult(old=>({...old,pending:false,error:data.error||'Не удалось построить форму. Измените размеры или упростите узор.'}));
      }
      if(latest&&latest.revision!==job.revision)send();
    };
    const failed=()=>{flight=null;setResult(old=>({...old,pending:false,error:'Не удалось запустить построение формы. Обновите страницу.'}));};
    worker.onmessage=receive;worker.onerror=failed;
    runtime.current={submit:p=>{latest={revision:++serial,project:p};setResult(old=>({...old,pending:enabled(p),error:''}));clearTimeout(timer);timer=setTimeout(()=>{
      timer=undefined;
      send();
    },180);}};
    return()=>{active=false;clearTimeout(timer);worker.terminate();runtime.current=null;};
  },[]);
  useEffect(()=>{runtime.current?.submit(geometryProject);},[geometryProject]);
  useEffect(()=>()=>{result.extras.forEach(p=>p.geometry.dispose());result.organizer?.dispose();result.shell?.dispose();result.pieces.forEach(p=>p.geometry.dispose());},[result.organizer,result.shell,result.pieces,result.extras]);
  return result;
}
