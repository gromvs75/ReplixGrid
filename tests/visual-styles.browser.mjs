// Run against the Vite dev server in an isolated Playwright context.
export async function checkStyles(browser,baseURL='http://127.0.0.1:5194',screenshot){
 const page=await browser.newPage({viewport:{width:1440,height:1050}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const check=(value,message)=>{if(!value)throw new Error(message);};
 const until=async(fn)=>{for(let i=0;i<100;i++){if(await fn())return;await page.waitForTimeout(100);}throw new Error('Timed out waiting for saved state');};
 const project=()=>page.evaluate(async()=>(await import('/src/store.ts')).useEditor.getState().project);
 try{
  await page.goto(baseURL+'/?lang=en');await page.getByRole('spinbutton',{name:'Width',exact:true}).waitFor();
  await page.evaluate(async()=>{
   const {defaultProject}=await import('/src/model.ts'),{useEditor}=await import('/src/store.ts');
   useEditor.getState().load({...defaultProject(),colors:{organizer:'#123456',shell:'#654321'},relief:{pattern:'ribs',spacing:8,depth:.6},shell:{pattern:'cellular',size:12,gap:.5,thickness:1.4},lid:true,lidDesign:{pattern:'smooth',rimHeight:3,handle:'round',olive:true,motif:'ginkgo',raised:true,baseColor:'#f0dfd2',patternColor:'#335f3d'}});
  });
  await page.locator('.style-controls summary').click();
  await page.getByRole('textbox',{name:'Style name',exact:true}).fill('Forest');
  await page.getByRole('button',{name:'Save current style',exact:true}).click();
  await page.getByRole('combobox',{name:'Saved style',exact:true}).waitFor();
  const source=await project();
  // Importing another project retains the source in the library and switches models.
  const target={...source,width:160,depth:80,cornerRadius:12,colors:{organizer:'#aaaaaa',shell:'#bbbbbb'},relief:undefined,shell:{pattern:'diamonds',size:7,gap:1.2,thickness:2.2,border:5},lidDesign:{pattern:'lines',rimHeight:7,handle:'bar',handleWidth:22,handleHeight:6,fit:'inset'}};
  await page.locator('input[type=file]').setInputFiles({name:'target.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(target))});
  await page.waitForFunction(async()=>(await import('/src/store.ts')).useEditor.getState().project.width===160);
  const before=await project();
  await page.getByRole('combobox',{name:'Saved style',exact:true}).selectOption({label:'Forest'});
  await page.getByRole('button',{name:'Apply style',exact:true}).click();
  const applied=await project();check(applied.colors.organizer==='#123456','body color');check(applied.shell.pattern==='cellular','shell pattern');check(applied.lidDesign.motif==='ginkgo','lid motif');
  check(applied.width===160&&applied.depth===80&&applied.cornerRadius===12,'dimensions');check(applied.shell.gap===1.2&&applied.shell.thickness===2.2,'shell fit');check(applied.lidDesign.fit==='inset'&&applied.lidDesign.handle==='bar'&&applied.lidDesign.rimHeight===7,'lid fit');
  await page.locator('.tools button').nth(0).click();check(JSON.stringify(await project())===JSON.stringify(before),'single undo');await page.locator('.tools button').nth(1).click();
  await until(async()=>JSON.stringify(await page.evaluate(async()=>(await(await import('/src/storage.ts')).loadSession()).project))===JSON.stringify(applied));
  await page.reload();await until(async()=>JSON.stringify(await project())===JSON.stringify(applied));check((await project()).width===160,'reload model');
  await page.locator('.style-controls summary').click();await page.getByRole('combobox',{name:'Saved style',exact:true}).selectOption({label:'Forest'});
  check(await page.getByRole('button',{name:'Apply style',exact:true}).isDisabled(),'already applied no-op');
  const library=await page.evaluate(async()=>(await import('/src/storage.ts')).listProjects());check(library.some(r=>r.project.width===100&&r.project.colors.organizer==='#123456'),'source preserved');
  if(screenshot){await page.locator('.style-controls').scrollIntoViewIfNeeded();await page.screenshot({path:screenshot});}
  await page.setViewportSize({width:390,height:844});check(await page.locator('.style-controls').evaluate(el=>el.scrollWidth<=el.clientWidth),'style panel overflow');
  await page.getByRole('button',{name:'Delete style',exact:true}).click();await page.locator('.style-remove').getByRole('button',{name:'Delete',exact:true}).click();await page.getByText('No saved styles yet.',{exact:true}).waitFor();check((await project()).colors.organizer==='#123456','deleting style preserves model');check(errors.length===0,errors.join('\n'));
  return {checks:'save, cross-project import/apply, geometry preservation, undo/redo, reload, source preservation, mobile panel, delete',errors};
 }finally{await page.close();}
}
