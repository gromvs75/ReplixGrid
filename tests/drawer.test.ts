import test from 'node:test';
import assert from 'node:assert/strict';
import {newDrawer,newTray,copyTray,parseDrawer,drawerIssues,trayRect} from '../src/drawer.js';
import {buildKit} from '../src/accessoryKernel.js';
import {setLevelCount} from '../src/accessories.js';
test('drawer copies, layout JSON and nested edits remain independent',()=>{
 const d=newDrawer(),a=newTray('Tools',80,60,30),b=copyTray(a.project,'Copy');d.trays=[a,b];b.project.root.id='changed';assert.notEqual(a.project.root.id,b.project.root.id);
 b.rotation=90;b.x=90;const reopened=parseDrawer(JSON.stringify(d));assert.deepEqual(reopened,d);reopened.trays[0].project.width=100;assert.equal(d.trays[0].project.width,80);
 assert.deepEqual(trayRect(b,{width:82,depth:64,height:30}),{x:90,y:0,width:64,depth:82});
});
test('fit checks include wall clearance, tray clearance, rotation and usable height',()=>{
 const d=newDrawer(),a=newTray('A',80,60,30),b=newTray('B',80,60,30);a.x=a.y=b.y=2;b.x=84;d.trays=[a,b];const bounds={[a.id]:{width:80,depth:60,height:30},[b.id]:{width:80,depth:60,height:30}};
 assert.deepEqual(drawerIssues(d,bounds),{[a.id]:[],[b.id]:[]});b.x=83;assert.equal(drawerIssues(d,bounds)[a.id].length,1);b.x=84;b.rotation=90;b.y=110;assert.equal(drawerIssues(d,bounds)[b.id].length,1);b.y=2;d.height=20;assert.equal(drawerIssues(d,bounds)[a.id].length,1);
});
test('rejects malformed layouts instead of trusting imported placements',()=>{
 const d=newDrawer();d.width=NaN;assert.throws(()=>parseDrawer(JSON.stringify(d)));d.width=280;const a=newTray('a',80,60,30);d.trays=[a,a];assert.throws(()=>parseDrawer(JSON.stringify(d)));d.trays=[a];a.rotation=45 as 0;assert.throws(()=>parseDrawer(JSON.stringify(d)));
});
test('assembled bounds account for shell, trim and hidden stack bases',async()=>{
 const tray=newTray('A',80,60,25);tray.project.shell={pattern:'diamonds',size:12,gap:.5,thickness:1.6};tray.project.baseBand={height:4,style:'rings'};tray.project=setLevelCount(tray.project,2);
 const kit=await buildKit(tray.project),min=[0,1,2].map(i=>Math.min(...kit.map(p=>p.position[i]+p.inspection.bounds.min[i]))),max=[0,1,2].map(i=>Math.max(...kit.map(p=>p.position[i]+p.inspection.bounds.max[i])));
 assert.ok(max[0]-min[0]>84);assert.ok(max[1]-min[1]>64);assert.ok(Math.abs(max[2]-min[2]-52.2)<.01);
});
