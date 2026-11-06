async (page) => {
 const c=await page.context().browser().newContext({viewport:{width:1440,height:1000}});const p=await c.newPage();const results=[];
 const check=(ok,msg)=>{if(!ok)throw Error(msg);results.push(msg);};
 try{
  await p.goto('http://127.0.0.1:5194/?lang=en');await p.getByRole('spinbutton',{name:'Width',exact:true}).waitFor();
  await p.waitForFunction(()=>document.body.innerText.includes('Saved in this browser'));
  const persisted=await p.evaluate(async()=>{
   const s=await import('/src/storage.ts'),m=await import('/src/model.ts');const a=m.defaultProject();a.width=120;
   const named=await s.saveNamedProject('Recovery test',a);a.width=121;
   const original=IDBDatabase.prototype.transaction;
   IDBDatabase.prototype.transaction=function(...args){const tx=original.apply(this,args);if(args[1]==='readwrite')queueMicrotask(()=>tx.abort());return tx;};
   let failed=false;try{await s.saveCurrent(a,named.id,{past:[named.project],future:[]});}catch{failed=true;}finally{IDBDatabase.prototype.transaction=original;}
   return {failed,journal:JSON.parse(localStorage.getItem(sessionStorage.getItem('replixgrid.recovery-session')))};
  });
  check(persisted.failed&&persisted.journal.project.width===121,'aborted transaction retains pending snapshot');
  await p.reload();await p.waitForFunction(()=>document.querySelector('input[aria-label="Width"]')?.value==='121');
  await p.waitForFunction(()=>document.body.innerText.includes('Saved in this browser'));
  check(await p.evaluate(async()=>{const s=await import('/src/storage.ts'),v=await s.loadSession();return v.project.width===121&&v.history.past[0].width===120&&!!v.activeId&&!localStorage.getItem(sessionStorage.getItem('replixgrid.recovery-session'));}),'reload recovers named project and undo history then commits');
  check(await p.evaluate(async()=>{const s=await import('/src/storage.ts'),v=await s.loadSession();const project=structuredClone(v.project);project.width=122;const promise=s.saveCurrent(project,v.activeId,v.history);project.width=199;await promise;return (await s.loadSession()).project.width===122;}),'queued save uses immutable snapshot');
  check(await p.evaluate(async()=>{const s=await import('/src/storage.ts'),d=await import('/src/drawer.ts');const a=d.newDrawer();a.width=501;const original=IDBDatabase.prototype.transaction;IDBDatabase.prototype.transaction=function(...args){const tx=original.apply(this,args);if(args[1]==='readwrite')queueMicrotask(()=>tx.abort());return tx;};try{await s.saveDrawer(a);}catch{}finally{IDBDatabase.prototype.transaction=original;}return (await s.listDrawers()).some(x=>x.id===a.id&&x.width===501); }),'drawer survives aborted write');
  const exports=await p.evaluate(async()=>{
   const m=await import('/src/model.ts');const a=m.defaultProject();a.width=80;a.depth=60;const b={...a,width:100};const w=new Worker('/kernel/worker-accessory-svg-v1.js',{type:'module'});
   const request=data=>new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('worker timeout')),30000);w.onmessage=e=>{clearTimeout(timer);resolve(e.data);};w.onerror=e=>{clearTimeout(timer);reject(Error(e.message));};w.postMessage(data);});
   try{const initial=await request({revision:1,project:a,part:'organizer',purpose:'check'});const stale=await request({revision:1,project:b,part:'organizer',purpose:'download',format:'3mf'});const fresh=await request({revision:2,project:b,part:'organizer',purpose:'check'});const oldRevision=await request({revision:1,project:b,part:'organizer',purpose:'download',format:'3mf'});const good=await request({revision:2,project:b,part:'organizer',purpose:'download',format:'3mf'});const bad=await request({revision:3,project:{...b,width:1},part:'organizer',purpose:'check'});const afterError=await request({revision:2,project:b,part:'organizer',purpose:'download',format:'3mf'});return {initial:initial.ok,stale:stale.ok,fresh:fresh.report.rows[0].size,oldRevision:oldRevision.ok,good:good.ok,bytes:good.formatted.byteLength,bad:bad.ok,afterError:afterError.ok};}finally{w.terminate();}
  });
  check(exports.initial&&!exports.stale&&!exports.oldRevision&&exports.good&&exports.bytes>0&&exports.fresh[0]===100&&!exports.bad&&!exports.afterError,'export rejects changed projects, old revisions and previous results after failure');
  await p.evaluate(()=>sessionStorage.removeItem('replixgrid.tab-session'));
  await p.evaluate(()=>new Promise((resolve,reject)=>{const r=indexedDB.open('formanest',2);r.onsuccess=()=>{const db=r.result,tx=db.transaction('projects','readwrite');tx.objectStore('projects').put('corrupted','latest');tx.oncomplete=()=>{db.close();resolve();};tx.onabort=()=>reject(tx.error);};}));
  await p.reload();await p.waitForFunction(()=>document.querySelector('input[aria-label="Width"]')?.value==='122');
  await p.waitForFunction(()=>document.body.innerText.includes('Saved in this browser'));
  check(true,'damaged latest snapshot recovers the last committed backup');
  await p.evaluate(()=>sessionStorage.removeItem('replixgrid.tab-session'));
  await p.evaluate(()=>new Promise(resolve=>{const r=indexedDB.open('formanest',2);r.onsuccess=()=>{const db=r.result,tx=db.transaction('projects','readwrite'),s=tx.objectStore('projects');s.put('corrupted','latest');s.put({project:{}},'lastGoodSession');tx.oncomplete=()=>{db.close();resolve();};};}));
  await p.reload();await p.waitForFunction(()=>document.body.innerText.includes('Failed to restore')||document.body.innerText.includes('Не удалось восстановить'));
  const raw=await p.evaluate(()=>new Promise(resolve=>{const r=indexedDB.open('formanest',2);r.onsuccess=()=>{const db=r.result,tx=db.transaction('projects','readonly'),q=tx.objectStore('projects').get('latest');q.onsuccess=()=>resolve(q.result);tx.oncomplete=()=>db.close();};}));
  check(raw==='corrupted','failed restore does not overwrite original storage with starter model');
  const restoreJSON=await p.evaluate(async()=>JSON.stringify({...((await import('/src/model.ts')).defaultProject()),width:155}));
  await p.locator('input[type=file]').setInputFiles({name:'recovery.json',mimeType:'application/json',buffer:Buffer.from(restoreJSON)});
  await p.waitForFunction(()=>document.querySelector('input[aria-label="Width"]')?.value==='155');
  await p.waitForFunction(()=>document.body.innerText.includes('Saved in this browser'));
  check(await p.evaluate(async()=>!!(await(await import('/src/storage.ts')).loadSession()).project),'explicit JSON import restores saving after unrecoverable database contents');
  return results;
 }finally{await c.close();}
}
