import {parseStyle,type SavedStyle,type VisualStyle} from './visualStyles.js';
import type {Project} from './model.js';
import {parseProject} from './editor.js';
export interface ProjectHistory {past:Project[];future:Project[]}
export interface SavedProject {id:string;name:string;createdAt:number;updatedAt:number;project:Project;groupId?:string;history?:ProjectHistory}
export const emptyHistory=():ProjectHistory=>({past:[],future:[]});
export function readHistory(value:unknown):ProjectHistory {
 try{const h=value as ProjectHistory;if(!Array.isArray(h?.past)||!Array.isArray(h?.future))return emptyHistory();return {past:h.past.slice(-60).map(p=>parseProject(JSON.stringify(p))),future:h.future.slice(0,60).map(p=>parseProject(JSON.stringify(p)))};}catch{return emptyHistory();}
}
const historyCopy=(h:ProjectHistory)=>structuredClone({past:h.past.slice(-60),future:h.future.slice(0,60)});
// Keep asynchronous database opens from reordering autosave and project switches.
let pending:Promise<unknown>=Promise.resolve();
function transaction<T>(mode:IDBTransactionMode,run:(tx:IDBTransaction,done:(value:T)=>void)=>void):Promise<T>{
 const result=pending.then(()=>transact(mode,run));pending=result.catch(()=>{});return result;
}
const db=()=>new Promise<IDBDatabase>((resolve,reject)=>{
 let blocked=false;
 const request=indexedDB.open('formanest',2);
 request.onupgradeneeded=()=>{const d=request.result;if(!d.objectStoreNames.contains('projects'))d.createObjectStore('projects');if(!d.objectStoreNames.contains('library'))d.createObjectStore('library',{keyPath:'id'});};
 request.onsuccess=()=>{const d=request.result;if(blocked){d.close();return;}d.onversionchange=()=>d.close();resolve(d);};
 request.onerror=()=>reject(request.error);
 request.onblocked=()=>{blocked=true;reject(new Error('Storage upgrade blocked'));};
});
async function transact<T>(mode:IDBTransactionMode,run:(tx:IDBTransaction,done:(value:T)=>void)=>void):Promise<T>{
 const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction(['projects','library'],mode);let result:T;
 tx.oncomplete=()=>{d.close();resolve(result);};tx.onabort=()=>{d.close();reject(tx.error??new Error('Storage transaction aborted'));};
 try{run(tx,value=>{result=value;});}catch(e){tx.abort();reject(e);}
 });
}
export async function loadSession(){return transaction<{project:Project|null;activeId:string|null;history:ProjectHistory}>('readonly',(tx,done)=>{
 const state={project:null as Project|null,activeId:null as string|null,history:emptyHistory()};done(state);
 const latest=tx.objectStore('projects').get('latest');latest.onsuccess=()=>{try{state.project=latest.result?parseProject(latest.result):null;}catch{tx.abort();}};
 const history=tx.objectStore('projects').get('history');history.onsuccess=()=>{state.history=readHistory(history.result);};
 const active=tx.objectStore('projects').get('active');active.onsuccess=()=>{if(typeof active.result==='string'){const r=tx.objectStore('library').get(active.result);r.onsuccess=()=>{if(r.result)state.activeId=active.result;};}};
});}
export async function loadSaved():Promise<Project|null>{return (await loadSession()).project;}
export async function saveCurrent(project:Project,activeId:string|null=null,history:ProjectHistory=emptyHistory()){
 return transaction<void>('readwrite',(tx,done)=>{
  tx.objectStore('projects').put(JSON.stringify(project),'latest');tx.objectStore('projects').put(activeId,'active');tx.objectStore('projects').put(historyCopy(history),'history');
  if(activeId){const library=tx.objectStore('library'),r=library.get(activeId);r.onsuccess=()=>{if(r.result)library.put({...r.result,project,history:historyCopy(history),updatedAt:Date.now()});};}done();
 });
}
export async function listProjects(){return transaction<SavedProject[]>('readonly',(tx,done)=>{const r=tx.objectStore('library').getAll();r.onsuccess=()=>done((r.result as SavedProject[]).sort((a,b)=>b.updatedAt-a.updatedAt));});}
export function projectName(name:string){return name.trim().slice(0,80);}
export async function saveNamedProject(name:string,project:Project){
 const clean=projectName(name);if(!clean)throw new Error('Project name is empty');
 const record:SavedProject={id:crypto.randomUUID(),name:clean,createdAt:Date.now(),updatedAt:Date.now(),project:structuredClone(project)};
 return transaction<SavedProject>('readwrite',(tx,done)=>{tx.objectStore('library').add(record);tx.objectStore('projects').put(JSON.stringify(project),'latest');tx.objectStore('projects').put(record.id,'active');tx.objectStore('projects').put(emptyHistory(),'history');done(record);});
}
/** Atomic fork: retain the current original and activate an independent copy. */
export async function createVariant(name:string,project:Project,sourceId:string|null,history:ProjectHistory,draftName:string){
 const clean=projectName(name);if(!clean)throw new Error('Project name is empty');
 const snapshot=structuredClone(project),savedHistory=historyCopy(history);
 return transaction<SavedProject>('readwrite',(tx,done)=>{
  const library=tx.objectStore('library'),session=tx.objectStore('projects');
  const fork=(source?:SavedProject)=>{
   if(sourceId&&!source){tx.abort();return;}
   const original:SavedProject=source??{id:crypto.randomUUID(),name:projectName(draftName)||'Draft',createdAt:Date.now(),updatedAt:Date.now(),project:snapshot};
   const groupId=original.groupId??original.id;
   library.put({...original,groupId,project:snapshot,history:savedHistory,updatedAt:Date.now()});
   const variant:SavedProject={id:crypto.randomUUID(),name:clean,groupId,createdAt:Date.now(),updatedAt:Date.now(),project:structuredClone(snapshot),history:emptyHistory()};
   library.add(variant);session.put(JSON.stringify(snapshot),'latest');session.put(variant.id,'active');session.put(emptyHistory(),'history');done(variant);
  };
  if(sourceId){const r=library.get(sourceId);r.onsuccess=()=>fork(r.result);}else fork();
 });
}
export async function getSavedProject(id:string){return transaction<SavedProject|undefined>('readonly',(tx,done)=>{const r=tx.objectStore('library').get(id);r.onsuccess=()=>done(r.result);});}
export function variantGroup(record:SavedProject){return record.groupId??record.id;}
export async function renameProject(id:string,name:string){
 const clean=projectName(name);if(!clean)throw new Error('Project name is empty');
 return transaction<void>('readwrite',(tx,done)=>{const s=tx.objectStore('library'),r=s.get(id);r.onsuccess=()=>{if(r.result)s.put({...r.result,name:clean});};done();});
}
export async function deleteProject(id:string){return transaction<void>('readwrite',(tx,done)=>{tx.objectStore('library').delete(id);const s=tx.objectStore('projects'),r=s.get('active');r.onsuccess=()=>{if(r.result===id)s.put(null,'active');};done();});}
export function download(data:BlobPart,name:string,type:string){const url=URL.createObjectURL(new Blob([data],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}

// Presets share the existing settings store; no database upgrade or project migration.
export async function listStyles(){return transaction<SavedStyle[]>('readonly',(tx,done)=>{
 const r=tx.objectStore('projects').get('visualStyles');r.onsuccess=()=>{const valid:SavedStyle[]=[];
  for(const item of Array.isArray(r.result)?r.result:[])try{if(typeof item.id==='string'&&typeof item.name==='string'&&Number.isFinite(item.createdAt))valid.push({...item,style:parseStyle(item.style)});}catch{/* Ignore a damaged preset, preserving the library. */}
  done(valid.sort((a,b)=>b.createdAt-a.createdAt));
 };
});}
export async function saveStyle(name:string,style:VisualStyle){
 const clean=projectName(name);if(!clean)throw new Error('Style name is empty');
 const record:SavedStyle={id:crypto.randomUUID(),name:clean,createdAt:Date.now(),style:parseStyle(style)};
 return transaction<SavedStyle>('readwrite',(tx,done)=>{const s=tx.objectStore('projects'),r=s.get('visualStyles');r.onsuccess=()=>{s.put([...(Array.isArray(r.result)?r.result:[]),record],'visualStyles');done(record);};});
}
export async function deleteStyle(id:string){return transaction<void>('readwrite',(tx,done)=>{const s=tx.objectStore('projects'),r=s.get('visualStyles');r.onsuccess=()=>{s.put((Array.isArray(r.result)?r.result:[]).filter((v:SavedStyle)=>v.id!==id),'visualStyles');done();};});}
