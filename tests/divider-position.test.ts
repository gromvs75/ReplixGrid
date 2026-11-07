import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,resolveWalls} from '../src/model.js';
import {splitCell,moveDivider} from '../src/editor.js';

for(const axis of ['x','y'] as const)test(`moving the first of three compartments leaves the next divider fixed (${axis})`,()=>{
 const p=splitCell(defaultProject(),'root',axis,3);
 const snapshot=JSON.stringify(p);
 const id=p.root.split!.second.id;
 const old=resolveWalls(p).find(w=>w.id===id)!;
 const next=moveDivider(p,'root',.4);
 const wall=resolveWalls(next).find(w=>w.id===id)!;
 assert.ok(Math.abs(wall.x-old.x)<1e-8);
 assert.ok(Math.abs(wall.y-old.y)<1e-8);
 assert.notDeepEqual(next.root.split!.ratio,p.root.split!.ratio);
 assert.equal(JSON.stringify(p),snapshot);
});
test('nested perpendicular divisions retain their line positions',()=>{
 let p=splitCell(defaultProject(),'root','x',3);
 p=splitCell(p,p.root.split!.second.split!.first.id,'y',2);
 const before=resolveWalls(p);
 const next=moveDivider(p,'root',.4);
 for(const wall of resolveWalls(next).filter(w=>w.id!=='root')){
   const old=before.find(w=>w.id===wall.id)!;
   assert.ok(Math.abs((wall.axis==='x'?wall.y:wall.x)-(wall.axis==='x'?old.y:old.x))<1e-8);
 }
});
test('moving into another divider rejects the edit without altering the project',()=>{
 const p=splitCell(defaultProject(),'root','x',3),snapshot=JSON.stringify(p);
 assert.throws(()=>moveDivider(p,'root',.9));
 assert.equal(JSON.stringify(p),snapshot);
});
