async(page)=>{
 const c=await page.context().browser().newContext({viewport:{width:1440,height:1000}}),p=await c.newPage(),results=[];
 const ready=()=>p.waitForFunction(()=>!document.querySelector('.drawer-export-dialog .export-confirm')?.disabled,null,{timeout:120000});
 try{
  await p.goto('http://127.0.0.1:5194/?lang=ru');await p.getByRole('button',{name:'Ящик',exact:true}).click();await p.getByText('Сначала — размеры ящика',{exact:true}).waitFor();await p.locator('input[type=file]').setInputFiles('/Volumes/Projects/FormaNest/tests/fixtures/drawer-export.json');
  await p.getByRole('button',{name:'Печать всего ящика',exact:true}).click();await ready();
  if(!await p.getByText('Столов для печати: 4',{exact:true}).isVisible())throw Error('wrong bed count');results.push('500 × 300 drawer: six parts on four 270 × 270 beds');
  const length=p.getByRole('spinbutton',{name:'Длина стола принтера',exact:true});await length.fill('60');await length.press('Enter');await p.getByRole('alert').waitFor();if(await p.getByRole('button',{name:'Скачать все столы (ZIP)',exact:true}).isEnabled())throw Error('invalid export enabled');results.push('too-small bed blocks stale download');
  await length.fill('270');await length.press('Enter');await ready();
  const downloadPromise=p.waitForEvent('download');await p.getByRole('button',{name:'Скачать все столы (ZIP)',exact:true}).click();const download=await downloadPromise;if(await download.failure())throw Error('download failed');results.push('ZIP download succeeds');
  await p.getByRole('button',{name:'Закрыть',exact:true}).click();await p.reload();await p.getByRole('button',{name:'Печать всего ящика',exact:true}).click();await ready();if(await length.inputValue()!=='270')throw Error('settings lost');results.push('settings and layout survive reload');
  await p.screenshot({path:'/Volumes/Projects/FormaNest/.playwright-mcp/drawer-export-final.png'});
  await p.getByRole('button',{name:'Закрыть',exact:true}).click();await p.getByRole('button',{name:'Печать всего ящика',exact:true}).click();await p.getByRole('button',{name:'Закрыть',exact:true}).click();if(await p.getByRole('dialog').count())throw Error('cancel failed');results.push('closing while preparing cancels worker');
  return results;
 }catch(e){throw Error(results.join(' | ')+' -> '+String(e)+' UI: '+await p.locator('body').innerText());}finally{await c.close();}
}
