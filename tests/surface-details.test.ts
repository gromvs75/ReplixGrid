import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {defaultProject,resolveWalls} from '../src/model.js';
import {topAt,defaultShell} from '../src/shell.js';
import {parseProject,splitCell,resizeHeight} from '../src/editor.js';
import {organizerTemplate} from '../src/templates.js';
for(const shape of ['smooth','round','square'] as const)test(`${shape} cutout: width, depth, position and solid floor`,async()=>{
 const p=defaultProject();p.cutouts={left:{shape,width:.5,depth:18,position:.5}};
 const w=resolveWalls(p)[2];assert.equal(topAt(w,0),30);assert.equal(topAt(w,50),12);assert.equal(topAt(w,100),30);
 const original=await buildOrganizer(defaultProject()),cut=await buildOrganizer(p);assert.ok(cut.inspection.volume<original.inspection.volume);assert.equal(cut.inspection.bounds.min[2],0);
 p.cutouts.left.depth=100;assert.equal(topAt(resolveWalls(p)[2],50),2.8);
 assert.ok((await buildOrganizer(p)).inspection.volume>0);
 p.cutouts.left.position=0;const shifted=resolveWalls(p)[2];assert.ok(topAt(shifted,27.5)<topAt(shifted,72.5));
 assert.deepEqual(parseProject(JSON.stringify(p)),p);
 assert.equal(resizeHeight(p,58).cutouts!.left.depth,200);
});
for(const pattern of ['ribs','diagonal','waffle'] as const)test(`${pattern}: closed relief STL preserves floor and adds outward volume`,async()=>{
 const p=defaultProject();p.width=70;p.depth=50;p.height=30;p.cornerRadius=8;
 const plain=await buildOrganizer(p);p.relief={pattern,spacing:8,depth:.8};
 const relief=await buildOrganizer(p);
 assert.ok(relief.inspection.volume>plain.inspection.volume);assert.ok(relief.inspection.volume>plain.inspection.volume*.7);
 assert.equal(relief.inspection.bounds.min[2],0);assert.equal(relief.inspection.bounds.max[2],30);
 assert.ok(relief.inspection.bounds.min[0]<-.1&&relief.inspection.bounds.max[0]>70.1);
 assert.deepEqual(parseProject(JSON.stringify(p)),p);
});
for(const shape of ['rounded','capsule','circle','oval'] as const)test(`${shape}: cutout, relief, divider and sleeve export together`,async()=>{
 let p=organizerTemplate(shape,'flat');p.cutouts={left:{shape:'smooth',width:.5,depth:18,position:.5}};p.relief={pattern:'ribs',spacing:12,depth:.6};p.shell=defaultShell('diamonds');
 const first=resolveWalls(p)[4];if(first)p.cutouts[first.id]={shape:'round',width:.4,depth:10,position:.5};
 const a=await buildOrganizer(p),b=await buildShell(p);assert.ok(a.inspection.volume>0&&b.inspection.volume>0);
});
test('invalid imported controls are rejected',()=>{
 const p=defaultProject();p.cutouts={left:{shape:'round',width:.99,depth:12,position:.5}};assert.throws(()=>parseProject(JSON.stringify(p)));delete p.cutouts;
 p.relief={pattern:'ribs',spacing:0,depth:.8};assert.throws(()=>resolveWalls(p));
});
for(const pattern of ['ribs','diagonal','waffle'] as const)test(`${pattern}: honeycomb and inclined rounded relief`,async()=>{
 for(const shape of ['honeycomb','rounded'] as const){const p=organizerTemplate(shape,'slope');p.relief={pattern,spacing:10,depth:1.2};p.tilt=shape==='rounded'?20:0;
 const a=await buildOrganizer(p);assert.ok(a.inspection.volume>0);assert.equal(a.inspection.bounds.min[2],0);}
});
test('shallow relief on a thin wall remains a single printable solid',async()=>{
 const p=defaultProject();p.wallThickness=.8;p.cornerRadius=10;p.relief={pattern:'waffle',spacing:4,depth:1.2};
 assert.ok((await buildOrganizer(p)).inspection.volume>0);
});
