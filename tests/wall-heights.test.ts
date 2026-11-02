import {test} from 'node:test';import assert from 'node:assert/strict';
import {defaultProject,resolveWalls} from '../src/model.js';import {splitCell,parseProject,editProject} from '../src/editor.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';import {defaultShell,shellLayout,topAt} from '../src/shell.js';import {buildPrintPieces} from '../src/assemblyKernel.js';
test('internal wall endpoints follow axis and retain constant legacy height',()=>{
 for(const axis of ['x','y'] as const){let p=splitCell(defaultProject(),'root',axis);let w=resolveWalls(p).find(w=>w.id==='root')!;assert.equal(w.startHeight,30);assert.equal(w.endHeight,30);
  p=editProject(p,d=>{d.root.split!.profile={start:15,end:65,style:'wavy'};});w=resolveWalls(p).find(w=>w.id==='root')!;assert.equal(w.axis,axis==='x'?'y':'x');assert.equal(topAt(w,0),15);assert.equal(topAt(w,w.length),65);assert.equal(w.transitionStyle,'wavy');assert.deepEqual(parseProject(JSON.stringify(p)),p);
 }
});
test('linked outer transitions read the correct endpoints of their source walls',()=>{
 const p=defaultProject();p.wallProfiles={front:{start:12,end:25,style:'straight'},back:{start:65,end:80,style:'wavy'}};p.transitions=['left','right'];
 const walls=resolveWalls(p);assert.deepEqual(walls.filter(w=>['left','right'].includes(w.id)).map(w=>[w.startHeight,w.endHeight]),[[12,65],[25,80]]);
 p.wallProfiles={left:{start:12,end:25,style:'straight'},right:{start:65,end:80,style:'wavy'}};p.transitions=['front','back'];assert.deepEqual(resolveWalls(p).slice(0,2).map(w=>[w.startHeight,w.endHeight]),[[12,65],[25,80]]);
});
for(const radius of [0,12])test(`custom profiles preserve shell alignment and export (radius ${radius})`,async()=>{
 let p=splitCell(defaultProject(),'root','x');p.cornerRadius=radius;p.root.split!.profile={start:10,end:75,style:'wavy'};p.wallProfiles={front:{start:15,end:35,style:'wavy'},back:{start:50,end:70,style:'straight'}};p.transitions=['left','right'];p.shell=defaultShell('waves');
 const walls=resolveWalls(p),layout=shellLayout(p),offset=p.shell.gap+p.shell.thickness;
 for(const panel of layout.panels){const wall=walls.find(w=>w.id===panel.id)!;for(let i=0;i<=100;i++){const x=wall.length*i/100;assert.ok(Math.abs(topAt(panel,x+offset)-topAt(wall,x))<1e-8);}}
 assert.equal((await buildOrganizer(p)).inspection.bounds.max[2],75);const shell=await buildShell(p);assert.ok(Math.abs(shell.inspection.bounds.max[2]+shell.position[2]-70)<.001);
 p.width=240;p.wallThickness=5;p.floorThickness=3;p.printing={parts:2,bedWidth:270,bedDepth:270,bedHeight:270};assert.equal((await buildPrintPieces(p)).length,4);
});
test('invalid profiles cannot enter project state; disabling preserves old flat dimensions',()=>{
 let p=splitCell(defaultProject(),'root','y');const old=resolveWalls(p);p=editProject(p,d=>{d.root.split!.profile={start:15,end:60,style:'straight'};});p=editProject(p,d=>{delete d.root.split!.profile;});assert.deepEqual(resolveWalls(p),old);
 for(const value of [null,[],{start:-1,end:30,style:'wavy'},{start:10,end:30,style:'bad'}])assert.throws(()=>parseProject(JSON.stringify({...p,wallProfiles:{left:value}})));
 assert.throws(()=>parseProject(JSON.stringify({...p,wallProfiles:{front:{start:15,end:30,style:'straight'}},transitions:['front']})));
 assert.throws(()=>parseProject(JSON.stringify({...p,root:{...p.root,split:{...p.root.split,profile:{start:0,end:20,style:'straight'}}}})));
});

test('fit divider ends samples supporting slopes and nested walls without changing neighbours',async()=>{
 const {fitDividerEnds}=await import('../src/editor.js');
 let p=splitCell(defaultProject(),'root','x');p.heights={front:12,back:64};p.transitions=['left','right'];
 let fitted=fitDividerEnds(p,'root');assert.deepEqual(fitted.root.split!.profile,{start:12,end:64,style:'straight'});assert.deepEqual(fitted.heights,p.heights);assert.equal(p.root.split!.profile,undefined);
 const child=fitted.root.split!.first.id;fitted=splitCell(fitted,child,'y');
 const w=resolveWalls(fitted).find(w=>w.id===child)!;
 const left=resolveWalls(fitted).find(w=>w.id==='left')!;
 const parent=resolveWalls(fitted).find(w=>w.id==='root')!;
 fitted=fitDividerEnds(fitted,child);
 assert.ok(Math.abs(fitted.root.split!.first.split!.profile!.start-topAt(left,w.y+w.thickness/2))<1e-8);
 assert.ok(Math.abs(fitted.root.split!.first.split!.profile!.end-topAt(parent,w.y+w.thickness/2-parent.y))<1e-8);
 fitted.cornerRadius=12;assert.ok((await buildOrganizer(fitted)).inspection.volume>0);
});
