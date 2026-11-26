import test from 'node:test';
import assert from 'node:assert/strict';
import {newDrawer,newTray,drawerViewPoint} from '../src/drawer.js';
import {drawerDragPosition,drawerDrop} from '../src/drawerPlacement.js';
const setup=()=>{const d=newDrawer();d.trays=[newTray('A',30,20,20),newTray('B',30,20,20)];d.trays[0].x=2;d.trays[0].y=2;d.trays[1].x=70;d.trays[1].y=2;return {d,bounds:Object.fromEntries(d.trays.map(t=>[t.id,{width:30,depth:20,height:20}]))};};
test('drop rounds only the released position and preserves the original and neighbors',()=>{const {d,bounds}=setup(),before=structuredClone(d),next=drawerDrop(d,d.trays[0].id,12.345,30.678,bounds)!;assert.equal(next.trays[0].x,12.3);assert.equal(next.trays[0].y,30.7);assert.deepEqual(d,before);assert.deepEqual(next.trays[1],d.trays[1]);});
test('invalid placement includes gap, outer dimensions, height and pending geometry',()=>{const {d,bounds}=setup(),id=d.trays[0].id;for(const [x,y] of [[1,2],[40,2],[151,2],[2,259]])assert.equal(drawerDrop(d,id,x,y,bounds),null);assert.ok(drawerDrop(d,id,38,2,bounds));assert.equal(drawerDrop(d,id,2,30,{}),null);bounds[id].height=81;assert.equal(drawerDrop(d,id,2,30,bounds),null);});
test('rotated trays and rotated views keep model coordinates and exact bounds',()=>{const {d,bounds}=setup(),id=d.trays[0].id;d.trays[0].rotation=90;d.viewRotation=90;const p=drawerViewPoint(230,12,d);const next=drawerDrop(d,id,p.x,p.y,bounds)!;assert.deepEqual([next.trays[0].x,next.trays[0].y],[12,50]);assert.equal(next.trays[0].rotation,90);assert.equal(drawerDrop(d,id,2,249,bounds),null);});

test('dragging reaches each wall with the same clearance from an off-grid position',()=>{
 const tray={...newTray('Tray',80,60,30),x:83.4,y:102.8};
 const layout={...newDrawer(),plate:{enabled:true,bedWidth:270,bedDepth:270},trays:[tray]};
 const bounds={width:80,depth:60,height:30};
 for(const [dx,dy,x,y] of [[-120,0,2,102.8],[120,0,98,102.8],[0,-150,83.4,2],[0,170,83.4,218]]){
  const position=drawerDragPosition(layout,tray,dx,dy,bounds);
  assert.deepEqual(position,{x,y});
  assert.deepEqual(drawerDrop(layout,tray.id,position.x,position.y,{[tray.id]:bounds})?.trays[0],{...tray,x,y});
 }
 const interior=drawerDragPosition(layout,tray,-20,0,bounds);
 assert.ok(Math.abs(interior.x-63.4)<1e-9);
 assert.equal(interior.y,102.8);
});

test('a rotated tray keeps the exact clearance at fractional wall limits',()=>{
 const tray={...newTray('Tray',80,60,30),x:30,y:30,rotation:90 as const};
 const layout={...newDrawer(),gap:2.37,trays:[tray]};
 const bounds={width:80.27,depth:60.24,height:30};
 const position=drawerDragPosition(layout,tray,200,300,bounds);
 const moved=drawerDrop(layout,tray.id,position.x,position.y,{[tray.id]:bounds})?.trays[0];
 assert.equal(moved?.x,layout.width-layout.gap-bounds.depth);
 assert.equal(moved?.y,layout.depth-layout.gap-bounds.width);
});
