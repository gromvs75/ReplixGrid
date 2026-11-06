async(page)=>{
 const c=await page.context().browser().newContext({viewport:{width:1440,height:1000}}),p=await c.newPage();const results=[];
 const check=(ok,msg)=>{if(!ok)throw Error(msg);results.push(msg);};
 try{
  await p.goto('http://127.0.0.1:5194/?lang=ru');await p.getByRole('button',{name:'Сохранить проект',exact:true}).waitFor();
  const parsing=await p.evaluate(async()=>{const {importSvg}=await import('/src/svgImport.ts');const wrap=s=>'<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';const a=importSvg(wrap('<g transform="translate(5 10) scale(2)"><rect width="30" height="20"/></g>'),'rectangle');
   const hole=importSvg(wrap('<path fill-rule="evenodd" d="M0 0h30v30H0z M10 10v10h10V10z"/>'),'hole');
   const hidden=importSvg(wrap('<g style="display:none"><rect width="100" height="100"/></g><rect width="30" height="20"/>'),'hidden');
   const invalid=['<script>alert(1)</script>','<text>hello</text>','<path fill="none" stroke="black" d="M0 0L10 10"/>','<image href="https://example.org/a.png"/>','<rect width="30" height="20" onclick="alert(1)"/>','<defs><path id="a"/></defs>'];let rejected=0;for(const value of invalid)try{importSvg(wrap(value),'bad');}catch{rejected++;}
   return {aspect:a.aspect,hole:hole.shapes[0].length,hidden:hidden.aspect,rejected};
  });check(parsing.aspect===2/3&&parsing.hole===2&&parsing.hidden===2/3&&parsing.rejected===6,'SVG transforms, holes, hidden shapes and unsupported elements');
  await p.getByText('Рельеф органайзера',{exact:true}).click();await p.getByRole('button',{name:'Мои SVG',exact:true}).click();
  await p.getByLabel('Загрузить SVG',{exact:true}).setInputFiles('/Volumes/Projects/FormaNest/tests/fixtures/svg/leaf.svg');
  await p.getByRole('spinbutton',{name:'Ширина рисунка',exact:true}).waitFor();
  await p.waitForFunction(async()=>!!(await(await import('/src/storage.ts')).loadSession()).project.relief?.svg);
  const snapshot=await p.evaluate(async()=>(await(await import('/src/storage.ts')).loadSession()).project);
  check(snapshot.relief?.svg?.asset.name==='leaf','upload applies embedded numeric contours');
  const worker=await p.evaluate(async project=>{const w=new Worker('/kernel/worker-accessory-svg-v1.js',{type:'module'});const ask=purpose=>new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('timeout')),90000);w.onmessage=e=>{clearTimeout(t);resolve(e.data);};w.onerror=e=>reject(Error(e.message));w.postMessage({revision:1,project,part:'organizer',purpose,format:'3mf'});});try{const preview=await ask('preview'),check=await ask('check'),download=await ask('download');if(!preview.ok||!check.report?.ok||!download.ok)throw Error(JSON.stringify({preview:preview.error,check,download}));return {size:check.report.rows[0].size,bytes:download.formatted.byteLength};}finally{w.terminate();}},snapshot);
  check(worker.bytes>1000,'worker preview, preflight and 3MF export');
  await p.getByRole('button',{name:'Повторять',exact:true}).click();await p.getByRole('spinbutton',{name:'Поворот рисунка',exact:true}).fill('25');await p.getByRole('spinbutton',{name:'Поворот рисунка',exact:true}).press('Enter');
  await p.waitForFunction(async()=>{const s=await import('/src/storage.ts');return (await s.loadSession()).project.relief?.svg?.rotation===25;});
  await p.reload();await p.getByRole('button',{name:'Сохранить проект',exact:true}).waitFor();
  const saved=await p.evaluate(async()=>{const s=await import('/src/storage.ts');return {session:await s.loadSession(),items:await s.listSvgAssets()};});
  check(saved.session.project.relief.svg.rotation===25&&saved.session.project.relief.svg.mode==='repeat'&&saved.items.length===1,'repeat and rotation survive reload with library');
  await p.getByText('Рельеф органайзера · включён',{exact:true}).click();
  await p.getByRole('button',{name:'Мои SVG',exact:true}).click();
  await p.getByRole('button',{name:'Удалить SVG leaf',exact:true}).click();await p.getByRole('button',{name:'Удалить',exact:true}).click();
  await p.waitForFunction(async()=>!(await(await import('/src/storage.ts')).listSvgAssets()).length);
  check(await p.evaluate(async()=>!!(await(await import('/src/storage.ts')).loadSession()).project.relief?.svg),'deleting library item retains project geometry');
  await p.getByRole('button',{name:'Один рисунок',exact:true}).click();await p.getByRole('button',{name:'По центру',exact:true}).click();
  await p.waitForFunction(()=>!document.body.innerText.includes('Обновляем форму…'));
  await p.getByRole('button',{name:'Мои SVG',exact:true}).scrollIntoViewIfNeeded();
  await p.screenshot({path:'/Volumes/Projects/FormaNest/.playwright-mcp/svg-relief.png'});
  const json=await p.evaluate(async()=>JSON.stringify((await(await import('/src/storage.ts')).loadSession()).project));
  const other=await page.context().browser().newContext();try{const q=await other.newPage();await q.goto('http://127.0.0.1:5194/?lang=en');await q.getByRole('button',{name:'Save project',exact:true}).waitFor();await q.locator('input[type=file]').setInputFiles({name:'with-svg.json',mimeType:'application/json',buffer:Buffer.from(json)});await q.waitForFunction(async()=>!!(await(await import('/src/storage.ts')).loadSession()).project.relief?.svg);check(await q.evaluate(async()=>!(await(await import('/src/storage.ts')).listSvgAssets()).length),'project reopens with SVG on a fresh browser without its library');}finally{await other.close();}
  return results;
 }catch(e){throw Error(results.join(' | ')+' -> '+String(e));}finally{await c.close();}
}
