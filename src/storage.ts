import {t} from './i18n.js';
import {readRecovery,writeRecovery,clearRecovery} from './recovery.js';
import {parseDrawer} from './drawer.js';
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
// Baselines are local to this document. Compare and write in one IndexedDB transaction.
const baselines=new Map<string,string>();
const aliases=new Map<string,string>();
const stamp=(value:unknown)=>JSON.stringify(value??null);
const content=(value:{project:Project;history?:ProjectHistory}|undefined|null)=>value?{project:value.project,history:readHistory(value.history)}:null;
const projectKey=(id:string|null)=>id??'draft';
const resolveProject=(id:string|null):string|null=>aliases.get(projectKey(id))??id;
const remember=(id:string|null,value:unknown)=>baselines.set(projectKey(id),stamp(value));
function rememberSession(project:Project,activeId:string|null,history:ProjectHistory){
 const value={project,history};remember(activeId,value);
 try{sessionStorage.setItem('replixgrid.tab-session',JSON.stringify({...value,activeId,base:stamp(value)}));}catch{}
}
const conflictName=(name:string)=>`${name.slice(0,55)} — ${t('Копия из другой вкладки')}`;
// Each document owns its journal; a reload follows its sessionStorage pointer.
const journalId=crypto.randomUUID();
function pendingKey(kind:string){return `replixgrid.pending-${kind}.${journalId}`;}
function previousKey(kind:string){try{return sessionStorage.getItem(`replixgrid.recovery-${kind}`);}catch{return null;}}
function journalKeys(kind:string){
 const own=previousKey(kind),legacy=`replixgrid.pending-${kind}`;
 // A fresh tab can also recover an interrupted write left by a closed tab.
 try{return [...new Set([own,legacy,...(!own?Object.keys(localStorage).filter(k=>k.startsWith(legacy+'.')):[])].filter((k):k is string=>!!k))];}catch{return [legacy];}
}
function writeJournal(kind:string,value:unknown){const key=pendingKey(kind);try{sessionStorage.setItem(`replixgrid.recovery-${kind}`,key);}catch{}return {key,raw:writeRecovery(key,value)};}
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
async function loadDatabaseSession(){
 const raw=await transaction<{latest:unknown;active:unknown;history:unknown;backup:unknown;activeExists:boolean;record?:SavedProject;draft?:unknown}>('readonly',(tx,done)=>{
  const state={latest:null as unknown,active:null as unknown,history:null as unknown,backup:null as unknown,activeExists:false,record:undefined as SavedProject|undefined,draft:undefined as unknown};done(state);
  const store=tx.objectStore('projects');
  for(const [key,field]of [['latest','latest'],['history','history'],['lastGoodSession','backup'],['draftSession','draft']] as const){const r=store.get(key);r.onsuccess=()=>{state[field]=r.result;};}
  const r=store.get('active');r.onsuccess=()=>{state.active=r.result;if(typeof r.result==='string'){const q=tx.objectStore('library').get(r.result);q.onsuccess=()=>{state.activeExists=!!q.result;state.record=q.result;};}};
 });
 remember(raw.activeExists?raw.active as string:null,raw.activeExists?content(raw.record):raw.draft??null);
 try{if(raw.latest==null&&raw.backup)throw new Error('Missing current snapshot');return {project:raw.latest==null?null:parseProject(raw.latest as string),activeId:raw.activeExists?raw.active as string:null,history:readHistory(raw.history)};}
 catch(error){
  const backup=raw.backup as {project:Project;activeId:string|null;history:ProjectHistory}|null;
  if(!backup)throw error;
  return {project:parseProject(JSON.stringify(backup.project)),activeId:raw.activeExists&&backup.activeId===raw.active?backup.activeId:null,history:readHistory(backup.history)};
 }
}
let recoveredJournal:{key:string;raw:string}|null=null;
function recoverSession(){
 for(const key of journalKeys('session'))try{
  const value=readRecovery(key) as {project:Project;activeId:string|null;history:ProjectHistory;base?:string}|null;
  if(!value||(value.activeId!==null&&typeof value.activeId!=='string'))continue;
  const result={project:parseProject(JSON.stringify(value.project)),activeId:value.activeId,history:readHistory(value.history)};
  remember(result.activeId,null);if(value.base!==undefined)baselines.set(projectKey(result.activeId),value.base);
  recoveredJournal={key,raw:JSON.stringify(value)};return result;
 }catch{/* Leave damaged journals untouched. */}
 return null;
}
export async function loadSession(){
 const recovery=recoverSession();if(recovery)return recovery;
 // Reopening a tab retains its own project rather than the last active project in another tab.
 try{const own=JSON.parse(sessionStorage.getItem('replixgrid.tab-session')??'null');if(own){const project=parseProject(JSON.stringify(own.project)),history=readHistory(own.history);if(own.activeId===null||typeof own.activeId==='string'){baselines.set(projectKey(own.activeId),own.base??stamp({project,history}));return {project,history,activeId:own.activeId as string|null};}}}catch{}

 const session=await loadDatabaseSession();
 return session;
}
export async function loadSaved():Promise<Project|null>{return (await loadSession()).project;}
export async function saveCurrent(project:Project,activeId:string|null=null,history:ProjectHistory=emptyHistory()){
 const snapshot=structuredClone({project,activeId,history:historyCopy(history)});
 const initialId=resolveProject(activeId),initialBase=baselines.get(projectKey(initialId))??stamp(null);
 const journal=writeJournal('session',{...snapshot,activeId:initialId,base:initialBase});
 const recovery=recoveredJournal;
 const result=await transaction<{activeId:string|null;conflict:boolean}>('readwrite',(tx,done)=>{
  const session=tx.objectStore('projects'),library=tx.objectStore('library');
  const id=resolveProject(activeId),expected=baselines.get(projectKey(id))??stamp(null);
  const r=id?library.get(id):session.get('draftSession');
  r.onsuccess=()=>{
   const current=id?content(r.result):r.result??null;
   const next={project:snapshot.project,history:snapshot.history};
   const conflict=stamp(current)!==expected&&stamp(current)!==stamp(next);
   let target=id;
   if(conflict){target=crypto.randomUUID();library.add({id:target,name:conflictName(r.result?.name??t('Черновик')),createdAt:Date.now(),updatedAt:Date.now(),...next});}
   else if(target)library.put({...r.result,id:target,...next,updatedAt:Date.now()});
   else session.put(next,'draftSession');
   const saved={...next,activeId:target};session.put(saved,'lastGoodSession');session.put(JSON.stringify(next.project),'latest');session.put(target,'active');session.put(next.history,'history');
   done({activeId:target,conflict});
  };
 });
 if(result.conflict)aliases.set(projectKey(activeId),result.activeId!);
 rememberSession(snapshot.project,result.activeId,snapshot.history);
 clearRecovery(journal.key,journal.raw);if(recovery){clearRecovery(recovery.key,recovery.raw);if(recoveredJournal===recovery)recoveredJournal=null;}
 return result;
}
export async function saveImportedProject(project:Project){
 aliases.delete('draft');remember(null,null);
 return saveCurrent(project,null);
}
export async function listProjects(){return transaction<SavedProject[]>('readonly',(tx,done)=>{const r=tx.objectStore('library').getAll();r.onsuccess=()=>done((r.result as SavedProject[]).sort((a,b)=>b.updatedAt-a.updatedAt));});}
export function projectName(name:string){return name.trim().slice(0,80);}
export async function saveNamedProject(name:string,project:Project){
 const clean=projectName(name);if(!clean)throw new Error('Project name is empty');
 const record:SavedProject={id:crypto.randomUUID(),name:clean,createdAt:Date.now(),updatedAt:Date.now(),project:structuredClone(project)};
 return transaction<SavedProject>('readwrite',(tx,done)=>{tx.objectStore('library').add(record);tx.objectStore('projects').put(JSON.stringify(record.project),'latest');tx.objectStore('projects').put(record.id,'active');tx.objectStore('projects').put(emptyHistory(),'history');tx.objectStore('projects').put({project:record.project,activeId:record.id,history:emptyHistory()},'lastGoodSession');done(record);}).then(saved=>{rememberSession(saved.project,saved.id,readHistory(saved.history));return saved;});
}
/** Atomic fork: retain the current original and activate an independent copy. */
export async function createVariant(name:string,project:Project,sourceId:string|null,history:ProjectHistory,draftName:string){
 const clean=projectName(name);if(!clean)throw new Error('Project name is empty');
 const snapshot=structuredClone(project),savedHistory=historyCopy(history);
 return transaction<SavedProject>('readwrite',(tx,done)=>{
  const library=tx.objectStore('library'),session=tx.objectStore('projects');
  sourceId=resolveProject(sourceId);
  const fork=(source?:SavedProject)=>{
   if(sourceId&&stamp(content(source))!==(baselines.get(sourceId)??stamp(null)))source=undefined;
   const original:SavedProject=source??{id:crypto.randomUUID(),name:projectName(draftName)||'Draft',createdAt:Date.now(),updatedAt:Date.now(),project:snapshot};
   const groupId=original.groupId??original.id;
   library.put({...original,groupId,project:snapshot,history:savedHistory,updatedAt:Date.now()});
   const variant:SavedProject={id:crypto.randomUUID(),name:clean,groupId,createdAt:Date.now(),updatedAt:Date.now(),project:structuredClone(snapshot),history:emptyHistory()};
   library.add(variant);session.put(JSON.stringify(snapshot),'latest');session.put(variant.id,'active');session.put(emptyHistory(),'history');session.put({project:variant.project,activeId:variant.id,history:emptyHistory()},'lastGoodSession');done(variant);
  };
  if(sourceId){const r=library.get(sourceId);r.onsuccess=()=>fork(r.result);}else fork();
 }).then(saved=>{rememberSession(saved.project,saved.id,readHistory(saved.history));return saved;});
}
export async function getSavedProject(id:string){return transaction<SavedProject|undefined>('readonly',(tx,done)=>{const r=tx.objectStore('library').get(id);r.onsuccess=()=>done(r.result);}).then(record=>{aliases.delete(id);remember(id,content(record));return record;});}
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

// Drawer copies never write to the organizer library or its active session.
type Drawer=import('./drawer.js').DrawerLayout;
const drawerBaselines=new Map<string,string>(),drawerAliases=new Map<string,string>();
let drawerRecovery:{key:string;raw:string}|null=null;
function recoverDrawers():{drawer:Drawer;base:string}[]{
 const valid:{drawer:Drawer;base:string}[]=[];
 for(const key of journalKeys('drawers')){
  const raw=readRecovery(key);if(!Array.isArray(raw))continue;
  for(const item of raw)try{valid.push({drawer:parseDrawer(JSON.stringify(item.drawer??item)),base:item.base??stamp(null)});}catch{}
  if(valid.length){drawerRecovery={key,raw:JSON.stringify(raw)};break;}
 }
 return valid;
}
export async function listDrawers(){
 const pending=recoverDrawers();
 try{return await transaction<Drawer[]>('readonly',(tx,done)=>{const r=tx.objectStore('projects').get('drawerLayouts');r.onsuccess=()=>done(r.result??[]);}).then(saved=>{
  for(const d of saved)if(!drawerBaselines.has(d.id))drawerBaselines.set(d.id,stamp(d));
  for(const p of pending)drawerBaselines.set(p.drawer.id,p.base);
  return [...pending.map(p=>p.drawer),...saved.filter(v=>!pending.some(p=>p.drawer.id===v.id))];
 });}catch(error){if(pending.length){for(const p of pending)drawerBaselines.set(p.drawer.id,p.base);return pending.map(p=>p.drawer);}throw error;}
}
export async function saveDrawer(drawer:Drawer){
 const snapshot=structuredClone(drawer),id=drawerAliases.get(drawer.id)??drawer.id;
 const entry={drawer:{...snapshot,id},base:drawerBaselines.get(id)??stamp(null)};
 const old=recoverDrawers();
 const copies=[entry,...old.filter(v=>v.drawer.id!==id)];
 const journal=writeJournal('drawers',copies),recovery=drawerRecovery;
 const result=await transaction<{drawer:Drawer;conflict:boolean}>('readwrite',(tx,done)=>{
  const store=tx.objectStore('projects'),r=store.get('drawerLayouts');r.onsuccess=()=>{
   const all:Drawer[]=r.result??[],id=drawerAliases.get(snapshot.id)??snapshot.id,current=all.find(d=>d.id===id);
   const next={...snapshot,id};
   const conflict=stamp(current)!==(drawerBaselines.get(id)??stamp(null))&&stamp(current)!==stamp(next);
   if(conflict){next.id=crypto.randomUUID();next.name=conflictName(snapshot.name);}
   store.put([next,...all.filter(v=>v.id!==next.id)],'drawerLayouts');done({drawer:next,conflict});
  };
 });
 if(result.conflict)drawerAliases.set(drawer.id,result.drawer.id);
 drawerBaselines.set(result.drawer.id,stamp(result.drawer));
 const current=readRecovery(journal.key);
 if(Array.isArray(current)){const remaining=current.filter(v=>stamp(v)!==stamp(entry));if(remaining.length)writeRecovery(journal.key,remaining);else clearRecovery(journal.key,JSON.stringify(current));}
 if(recovery&&recovery.key!==journal.key){clearRecovery(recovery.key,recovery.raw);if(drawerRecovery===recovery)drawerRecovery=null;}
 return result;
}
