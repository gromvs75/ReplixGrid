async(page)=>{
 const c=await page.context().browser().newContext();const a=await c.newPage(),b=await c.newPage(),results=[];
 const check=(ok,name)=>{if(!ok)throw Error(name);results.push(name);};
 try{
  for(const p of [a,b])await p.goto('http://127.0.0.1:5194/replixgrid-mark.svg');
  const id=await a.evaluate(async()=>{const s=await import('/src/storage.ts'),m=await import('/src/model.ts');const r=await s.saveNamedProject('Shared',m.defaultProject());await s.saveCurrent(r.project,r.id);return r.id;});
  await b.evaluate(async id=>{const s=await import('/src/storage.ts');await s.getSavedProject(id);},id);
  await a.evaluate(async id=>{const s=await import('/src/storage.ts'),r=await s.getSavedProject(id);await s.saveCurrent({...r.project,width:130},id);},id);
  const fork=await b.evaluate(async id=>{const s=await import('/src/storage.ts'),m=await import('/src/model.ts');return s.saveCurrent({...m.defaultProject(),width:150},id);},id);
  check(fork.conflict&&fork.activeId!==id,'stale tab forks instead of overwriting');
  let list=await a.evaluate(async()=> (await import('/src/storage.ts')).listProjects());
  check(list.find(x=>x.id===id).project.width===130&&list.find(x=>x.id===fork.activeId).project.width===150,'both project versions retained');
  await b.evaluate(async id=>{const s=await import('/src/storage.ts'),m=await import('/src/model.ts');await Promise.all([s.saveCurrent({...m.defaultProject(),width:151},id),s.saveCurrent({...m.defaultProject(),width:152},id)]);},id);
  list=await a.evaluate(async()=> (await import('/src/storage.ts')).listProjects());
  check(list.length===2&&list.find(x=>x.id===fork.activeId).project.width===152,'queued edits continue in one conflict copy');
  await b.reload();const own=await b.evaluate(async()=> (await import('/src/storage.ts')).loadSession());
  check(own.activeId===fork.activeId&&own.project.width===152,'reload restores this tab’s project');
  // Both writers observe the same version before racing.
  for(const p of [a,b])await p.evaluate(async id=>{const s=await import('/src/storage.ts');await s.getSavedProject(id);},id);
  const raced=await Promise.all([a.evaluate(async id=>{const s=await import('/src/storage.ts'),m=await import('/src/model.ts');return s.saveCurrent({...m.defaultProject(),width:160},id);},id),b.evaluate(async id=>{const s=await import('/src/storage.ts'),m=await import('/src/model.ts');return s.saveCurrent({...m.defaultProject(),width:170},id);},id)]);
  check(raced.filter(r=>r.conflict).length===1,'simultaneous transactions preserve one original and one copy');
  const drawer=await a.evaluate(async()=>{const s=await import('/src/storage.ts'),d=await import('/src/drawer.ts');const v=d.newDrawer();await s.saveDrawer(v);return v;});
  await b.evaluate(async()=> (await import('/src/storage.ts')).listDrawers());
  await a.evaluate(async d=> (await import('/src/storage.ts')).saveDrawer({...d,width:500}),drawer);
  const df=await b.evaluate(async d=> (await import('/src/storage.ts')).saveDrawer({...d,width:400}),drawer);
  check(df.conflict&&df.drawer.id!==drawer.id,'drawer conflict creates independent copy');
  const drawers=await a.evaluate(async()=> (await import('/src/storage.ts')).listDrawers());
  check(drawers.some(d=>d.id===drawer.id&&d.width===500)&&drawers.some(d=>d.id===df.drawer.id&&d.width===400),'both drawer layouts retained');
  // Deletion in another tab must never resurrect/replace the deleted record.
  await b.evaluate(async id=>{const s=await import('/src/storage.ts');await s.getSavedProject(id);},id);
  await a.evaluate(async id=> (await import('/src/storage.ts')).deleteProject(id),id);
  const deleted=await b.evaluate(async id=>{const s=await import('/src/storage.ts'),m=await import('/src/model.ts');return s.saveCurrent(m.defaultProject(),id);},id);
  check(deleted.conflict&&deleted.activeId!==id,'editing a remotely deleted project preserves a new copy');
  // Failed writes in separate tabs keep separate journals and recover against their original baselines.
  for(const p of [a,b])await p.evaluate(async()=>{const s=await import('/src/storage.ts');await s.loadSession();});
  const failed=await Promise.all([a.evaluate(async()=>{const s=await import('/src/storage.ts'),v=await s.loadSession(),original=IDBDatabase.prototype.transaction;IDBDatabase.prototype.transaction=function(...args){const tx=original.apply(this,args);if(args[1]==='readwrite')queueMicrotask(()=>tx.abort());return tx;};try{await s.saveCurrent({...v.project,width:181},v.activeId);}catch{}finally{IDBDatabase.prototype.transaction=original;}return sessionStorage.getItem('replixgrid.recovery-session');}),b.evaluate(async()=>{const s=await import('/src/storage.ts'),v=await s.loadSession(),original=IDBDatabase.prototype.transaction;IDBDatabase.prototype.transaction=function(...args){const tx=original.apply(this,args);if(args[1]==='readwrite')queueMicrotask(()=>tx.abort());return tx;};try{await s.saveCurrent({...v.project,width:191},v.activeId);}catch{}finally{IDBDatabase.prototype.transaction=original;}return sessionStorage.getItem('replixgrid.recovery-session');})]);
  check(failed[0]!==failed[1],'tabs use independent recovery journals');
  for(const p of [a,b])await p.reload();
  const recovered=await Promise.all([a.evaluate(async()=>(await(await import('/src/storage.ts')).loadSession()).project.width),b.evaluate(async()=>(await(await import('/src/storage.ts')).loadSession()).project.width)]);
  check(recovered[0]===181&&recovered[1]===191,'failed writes recover independently in both tabs');
  const fresh=await c.newPage();await fresh.goto('http://127.0.0.1:5194/replixgrid-mark.svg');
  const orphan=await fresh.evaluate(async()=>{const s=await import('/src/storage.ts'),v=await s.loadSession();return v.project.width;});
  check([181,191].includes(orphan),'fresh tab can recover an interrupted write left by another tab');
  return results;
 }finally{await c.close();}
}
