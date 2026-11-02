import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,resolveWalls} from '../src/model.js';
import {topAt,wallOutline,shellLayout,defaultShell} from '../src/shell.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
for(const style of ['wavy','zigzag'] as const){
 test(`${style}: pitch changes pattern, endpoints stay fixed and shell follows`,()=>{
  const p=defaultProject();p.wallProfiles={front:{start:30,end:60,style,wavelength:20}};p.shell=defaultShell('diamonds');
  const w=resolveWalls(p)[0],panel=shellLayout(p,false).panels[0],offset=p.shell.gap+p.shell.thickness;
  assert.equal(topAt(w,0),30);assert.equal(topAt(w,w.length),60);
  for(let x=0;x<=w.length;x+=.25)assert.ok(Math.abs(topAt(w,x)-topAt(panel,x+offset))<1e-7);
  assert.notEqual(topAt(w,12),topAt({...w,wavelength:40},12));
  const flat={...w,startHeight:30,endHeight:30};assert.ok(topAt(flat,12)<30);assert.ok(wallOutline(flat).length>30);
  p.wallProfiles.front!.wavelength=0;assert.throws(()=>resolveWalls(p));
 });
 test(`${style}: organizer and patterned shell export as valid solids`,async()=>{
  const p=defaultProject();p.width=80;p.depth=60;p.cornerRadius=6;p.wallProfiles={front:{start:30,end:50,style,wavelength:18}};p.shell=defaultShell('diamonds');
  const a=await buildOrganizer(p),b=await buildShell(p);assert.ok(a.inspection.volume>0);assert.ok(b.inspection.volume>0);
 });
}
test('legacy smooth transition is preserved without wavelength',()=>{const p=defaultProject();p.transitions=['front'];p.transitionStyles={front:'wavy'};p.heights={left:20,right:60};const w=resolveWalls(p)[0];assert.equal(topAt(w,w.length/2),40);assert.ok(topAt(w,w.cap+(w.length-2*w.cap)/4)<30);});
