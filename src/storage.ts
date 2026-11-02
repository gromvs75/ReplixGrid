import type {Project} from './model.js';
import {parseProject} from './editor.js';
export interface SavedProject {id:string;name:string;createdAt:number;updatedAt:number;project:Project}
const db=()=>new Promise<IDBDatabase>((resolve,reject)=>{
 let blocked=false;
 const request=indexedDB.open('formanest',2);
 request.onupgradeneeded=()=>{const d=request.result;if(!d.objectStoreNames.contains('projects'))d.createObjectStore('projects');if(!d.objectStoreNames.contains('library'))d.createObjectStore('library',{keyPath:'id'});};
 request.onsuccess=()=>{const d=request.result;if(blocked){d.close();return;}d.onversionchange=()=>d.close();resolve(d);};
 request.onerror=()=>reject(request.error);
 request.onblocked=()=>{blocked=true;reject(new Error('Storage upgrade blocked'));};
});
async function transaction<T>(mode:IDBTransactionMode,run:(tx:IDBTransaction,done:(value:T)=>void)=>void):Promise<T>{
 const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction(['projects','library'],mode);let result:T;
 tx.oncomplete=()=>{d.close();resolve(result);};tx.onabort=()=>{d.close();reject(tx.error??new Error('Storage transaction aborted'));};
 try{run(tx,value=>{result=value;});}catch(e){tx.abort();reject(e);}
 });
}
export async function loadSession(){return transaction<{project:Project|null;activeId:string|null}>('readonly',(tx,done)=>{
 const state={project:null as Project|null,activeId:null as string|null};done(state);
 const latest=tx.objectStore('projects').get('latest');latest.onsuccess=()=>{try{state.project=latest.result?parseProject(latest.result):null;}catch{tx.abort();}};
 const active=tx.objectStore('projects').get('active');active.onsuccess=()=>{if(typeof active.result==='string'){const r=tx.objectStore('library').get(active.result);r.onsuccess=()=>{if(r.result)state.activeId=active.result;};}};
});}
export async function loadSaved():Promise<Project|null>{return (await loadSession()).project;}
export async function saveCurrent(project:Project,activeId:string|null=null){
 return transaction<void>('readwrite',(tx,done)=>{
  tx.objectStore('projects').put(JSON.stringify(project),'latest');tx.objectStore('projects').put(activeId,'active');
  if(activeId){const library=tx.objectStore('library'),r=library.get(activeId);r.onsuccess=()=>{if(r.result)library.put({...r.result,project,updatedAt:Date.now()});};}done();
 });
}
export async function listProjects(){return transaction<SavedProject[]>('readonly',(tx,done)=>{const r=tx.objectStore('library').getAll();r.onsuccess=()=>done((r.result as SavedProject[]).sort((a,b)=>b.updatedAt-a.updatedAt));});}
export function projectName(name:string){return name.trim().slice(0,80);}
export async function saveNamedProject(name:string,project:Project){
 const clean=projectName(name);if(!clean)throw new Error('Project name is empty');
 const record:SavedProject={id:crypto.randomUUID(),name:clean,createdAt:Date.now(),updatedAt:Date.now(),project:structuredClone(project)};
 return transaction<SavedProject>('readwrite',(tx,done)=>{tx.objectStore('library').add(record);tx.objectStore('projects').put(JSON.stringify(project),'latest');tx.objectStore('projects').put(record.id,'active');done(record);});
}
export async function renameProject(id:string,name:string){
 const clean=projectName(name);if(!clean)throw new Error('Project name is empty');
 return transaction<void>('readwrite',(tx,done)=>{const s=tx.objectStore('library'),r=s.get(id);r.onsuccess=()=>{if(r.result)s.put({...r.result,name:clean});};done();});
}
export async function deleteProject(id:string){return transaction<void>('readwrite',(tx,done)=>{tx.objectStore('library').delete(id);const s=tx.objectStore('projects'),r=s.get('active');r.onsuccess=()=>{if(r.result===id)s.put(null,'active');};done();});}
export function download(data:BlobPart,name:string,type:string){const url=URL.createObjectURL(new Blob([data],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}
