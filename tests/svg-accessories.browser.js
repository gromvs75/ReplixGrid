async(page)=>{
 const c=await page.context().browser().newContext({viewport:{width:1500,height:1100}}),p=await c.newPage(),results=[];
 const snapshot=()=>p.evaluate(async()=>(await(await import('/src/storage.ts')).loadSession()).project);
 const settled=()=>p.waitForFunction(()=>!document.body.innerText.includes('Обновляем форму…'));
 try{
  await p.goto('http://127.0.0.1:5194/?lang=ru');await p.getByRole('button',{name:'Сохранить проект',exact:true}).waitFor();
  await p.locator('summary').filter({hasText:/^Крышка/}).click();await p.getByRole('button',{name:'+ Крышка',exact:true}).click();
  const lid=p.locator('details.accessories').filter({has:p.locator('summary').filter({hasText:/^Крышка/})});
  await lid.getByRole('button',{name:'Мои SVG',exact:true}).click();const studio=p.locator('.pattern-studio');await studio.locator('input[type=file]').setInputFiles('/Volumes/Projects/FormaNest/tests/fixtures/svg/diamond.svg');
  await p.waitForFunction(async()=>!!(await(await import('/src/storage.ts')).loadSession()).project.lidDesign?.svg);
  await studio.getByRole('button',{name:'Повторять',exact:true}).click();
  const width=studio.getByRole('spinbutton',{name:'Ширина рисунка',exact:true});await width.fill('8');await width.press('Enter');
  await p.waitForFunction(async()=>(await(await import('/src/storage.ts')).loadSession()).project.lidDesign?.svg?.width===8);
  const workerCheck=async(project)=>p.evaluate(async project=>{
   const w=new Worker('/kernel/worker-accessory-svg-v1.js',{type:'module'});
   const ask=purpose=>new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('worker timeout')),90000);w.onmessage=e=>{clearTimeout(t);resolve(e.data);};w.onerror=e=>reject(Error(e.message));w.postMessage({revision:1,project,purpose,part:'organizer',format:'3mf'});});
   try{const preview=await ask('preview'),check=await ask('check'),download=await ask('download');if(!preview.ok||!check.report?.ok||!download.ok)throw Error(JSON.stringify({preview:preview.error,check,download}));return download.formatted.byteLength;}finally{w.terminate();}
  },project);
  if(await workerCheck(await snapshot())<1000)throw Error('empty 3mf');results.push('uploaded/repeated lid SVG: preview, preflight and 3MF');
  await studio.getByRole('switch',{name:'Сквозные прорези',exact:true}).click();await p.waitForFunction(async()=>(await(await import('/src/storage.ts')).loadSession()).project.lidDesign?.svgMode==='cutout');await workerCheck(await snapshot());results.push('through lid openings export');
  await studio.getByRole('switch',{name:'Сквозные прорези',exact:true}).click();
  await p.getByRole('button',{name:/^Оболочка/}).first().click();
  const shell=p.locator('.shell-panel');await shell.getByRole('button',{name:'Мои SVG',exact:true}).click();await studio.getByRole('button',{name:'diamond',exact:true}).click();
  const sw= studio.getByRole('spinbutton',{name:'Ширина рисунка',exact:true});await sw.fill('8');await sw.press('Enter');
  await p.waitForFunction(async()=>(await(await import('/src/storage.ts')).loadSession()).project.shell?.svg?.width===8);await workerCheck(await snapshot());results.push('same library asset on sleeve, complete kit exports');
  await studio.getByRole('tab',{name:'Крышка',exact:true}).click();if(await studio.getByRole('spinbutton',{name:'Ширина рисунка',exact:true}).inputValue()!=='8')throw Error('wrong lid controls');await studio.getByRole('tab',{name:'Крышка',exact:true}).press('ArrowRight');await studio.getByRole('tab',{name:'Оболочка',exact:true}).waitFor();results.push('surface tabs preserve independent settings');await p.reload();await p.getByRole('button',{name:'Сохранить проект',exact:true}).waitFor();const saved=await snapshot();if(!saved.shell?.svg||!saved.lidDesign?.svg)throw Error('lost SVG');results.push('both accessory SVGs survive reload');
  await p.getByRole('button',{name:/^Оболочка/}).first().click();await shell.getByRole('button',{name:'Встроенные',exact:true}).click();
  await p.waitForFunction(async()=>!(await(await import('/src/storage.ts')).loadSession()).project.shell?.svg);if(!(await snapshot()).lidDesign.svg)throw Error('changed other target');results.push('built-in switch affects only shell');
  await shell.getByRole('button',{name:'Мои SVG',exact:true}).click();await studio.getByRole('button',{name:'diamond',exact:true}).click();await workerCheck(await snapshot());await p.locator('.preview-status').waitFor({state:'hidden',timeout:90000});await p.screenshot({path:'/Volumes/Projects/FormaNest/.playwright-mcp/svg-accessory-shell.png'});
  return results;
 }catch(e){throw Error(results.join(' | ')+' -> '+String(e)+' UI: '+await p.locator('body').innerText());}finally{await c.close();}
}
