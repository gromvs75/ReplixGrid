/** Synchronous write-ahead copy while IndexedDB commits; never stores credentials. */
export function writeRecovery(key:string,value:unknown):string|null{
 const raw=JSON.stringify(value);
 try{localStorage.setItem(key,raw);return raw;}catch{return null;}
}
export function readRecovery(key:string):unknown{
 try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):null;}catch{return null;}
}
export function clearRecovery(key:string,raw:string|null){
 if(raw===null)return;
 try{if(localStorage.getItem(key)===raw)localStorage.removeItem(key);}catch{/* Keep the pending copy if storage becomes unavailable. */}
}
