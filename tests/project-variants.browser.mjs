// Run with a Playwright Browser and the Vite dev server. Uses an isolated context.
// Example: await (await import('./tests/project-variants.browser.mjs')).checkVariants(browser)
import assert from 'node:assert/strict';
export async function checkVariants(browser,baseURL='http://127.0.0.1:5194',screenshot){
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const session=()=>page.evaluate(async()=> (await import('/src/storage.ts')).loadSession());
 const library=()=>page.evaluate(async()=> (await import('/src/storage.ts')).listProjects());
 const width=()=>page.getByRole('spinbutton',{name:'Width',exact:true});
 const setWidth=async n=>{await width().fill(String(n));await width().press('Enter');};
 const switchTo=async id=>{await page.getByRole('combobox',{name:'Project variant',exact:true}).selectOption(id);await page.locator('.project-switching').waitFor({state:'hidden'});};
 const waitWidth=async n=>page.waitForFunction(n=>document.querySelector('input[aria-label="Width"]')?.value===String(n),n);
 const saved=async n=>page.waitForFunction(async n=>(await(await import('/src/storage.ts')).loadSession()).project?.width===n,n);
 try{
  await page.goto(baseURL+'/?lang=en');await width().waitFor();
  await setWidth(140);
  // Fork immediately, before the autosave debounce: original and history must survive.
  await page.getByRole('button',{name:'+ Variant',exact:true}).click();
  await page.getByRole('textbox',{name:'Project name',exact:true}).fill('Wide variant');
  await page.getByRole('button',{name:'Create variant',exact:true}).click();
  await page.getByRole('heading',{name:'My projects',exact:true}).waitFor({state:'hidden'});
  let records=await library();assert.equal(records.length,2);
  const variant=records.find(v=>v.name==='Wide variant'),original=records.find(v=>v.id!==variant.id);
  assert.equal(original.project.width,140);assert.equal(original.history.past.at(-1).width,100);
  assert.equal(original.groupId,variant.groupId);assert.deepEqual(variant.history,{past:[],future:[]});
  await setWidth(180);await switchTo(original.id);await waitWidth(140);
  await page.locator('.tools button').nth(0).click();await waitWidth(100);
  await page.locator('.tools button').nth(1).click();await waitWidth(140);
  await switchTo(variant.id);await waitWidth(180);
  await page.locator('.tools button').nth(0).click();await waitWidth(140);
  await page.locator('.tools button').nth(1).click();await waitWidth(180);await saved(180);
  await page.reload();await waitWidth(180);
  await page.locator('.tools button').nth(0).click();await waitWidth(140);
  await page.locator('.tools button').nth(1).click();await waitWidth(180);
  const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Save project',exact:true}).click();
  const download=await downloadPromise,stream=await download.createReadStream(),chunks=[];for await(const c of stream)chunks.push(c);
  assert.equal(JSON.parse(Buffer.concat(chunks).toString()).width,180);
  const exportWidth=async expected=>{
   await page.getByRole('button',{name:'↓ Download',exact:true}).click();
   await page.locator('.export-formats button').nth(0).click();
   const event=page.waitForEvent('download');await page.locator('.export-confirm').click();
   const file=await event,stream=await file.createReadStream(),chunks=[];for await(const c of stream)chunks.push(c);
   const bytes=Buffer.concat(chunks);const count=bytes.readUInt32LE(80);let lo=Infinity,hi=-Infinity;
   assert.equal(bytes.length,84+count*50);
   for(let i=0;i<count;i++)for(let v=0;v<3;v++){const x=bytes.readFloatLE(84+i*50+12+v*12);lo=Math.min(lo,x);hi=Math.max(hi,x);}
   assert.equal(Math.round((hi-lo)*1000)/1000,expected);
   await page.locator('.export-confirm').waitFor({state:'hidden'});
  };
  await exportWidth(180);await switchTo(original.id);await waitWidth(140);await exportWidth(140);await switchTo(variant.id);await waitWidth(180);
  await page.getByRole('button',{name:'My projects',exact:true}).click();
  await page.getByText('Variants of this project',{exact:true}).waitFor();
  if(screenshot)await page.screenshot({path:screenshot});
  // Renaming/deleting the original does not break the independent variant.
  const card=page.locator('.project-card').filter({has:page.getByRole('button',{name:'Open project: Draft',exact:true})});
  await card.getByRole('button',{name:'Rename',exact:true}).click();await card.getByRole('textbox',{name:'New name',exact:true}).fill('Original layout');await card.getByRole('button',{name:'Save',exact:true}).click();
  await page.getByRole('button',{name:'Open project: Original layout',exact:true}).waitFor();
  const renamed=page.locator('.project-card').filter({has:page.getByRole('button',{name:'Open project: Original layout',exact:true})});
  await renamed.getByRole('button',{name:'Delete',exact:true}).click();await renamed.getByRole('button',{name:'Delete',exact:true}).click();
  await page.getByRole('button',{name:'Open project: Original layout',exact:true}).waitFor({state:'hidden'});
  await page.getByRole('button',{name:'Close',exact:true}).click();await page.reload();await waitWidth(180);
  assert.equal((await session()).activeId,variant.id);assert.equal((await library()).length,1);
  await page.getByRole('button',{name:'My projects',exact:true}).click();await page.getByRole('button',{name:'Separate project',exact:true}).click();await page.getByRole('textbox',{name:'Project name',exact:true}).fill('Separate copy');await page.getByRole('button',{name:'Save a copy',exact:true}).click();
  await page.getByRole('button',{name:'Open project: Separate copy',exact:true}).waitFor();
  records=await library();assert.equal(records.length,2);assert.equal(records.find(r=>r.name==='Separate copy').groupId,undefined);
  assert.deepEqual(errors,[]);
  return {passed:true,checks:['atomic draft fork','independent edits','per-variant undo/redo','reload history','selected JSON and STL exports','rename/delete original','separate project copy'],errors};
 }finally{await page.close();}
}
