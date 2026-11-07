import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Project,type Side} from '../src/model.js';
import {editProject} from '../src/editor.js';
import {setLevelCount} from '../src/accessories.js';
import {shellForPattern} from '../src/shellSelection.js';
import {buildKit} from '../src/accessoryKernel.js';

test('selecting a pattern without tiers preserves the regular wrapped shell',()=>{
 const p=defaultProject(),s=shellForPattern(p,'diamonds');assert.notEqual(s.mode,'panels');
});
for(const style of ['smooth','rings','steps'] as const)test(`tiers with ${style} bottom trim choose a wrapped shell without changing dimensions`,async()=>{
 let p:Project={...defaultProject(),width:80,depth:60,height:36,floorThickness:2,wallThickness:2.4,baseBand:{height:4,style}};
 p=setLevelCount(p,2);
 const before=[p.width,p.depth,p.height,p.floorThickness,p.wallThickness];
 p=editProject(p,d=>{d.shell=shellForPattern(d,'diamonds');});
 assert.notEqual(p.shell?.mode,'panels');
 assert.deepEqual([p.width,p.depth,p.height,p.floorThickness,p.wallThickness],before);
 assert.deepEqual(p.baseBand,{height:4,style});
 const next=shellForPattern(p,'waves');assert.notEqual(next.mode,'panels');
 const kit=await buildKit(p);
 assert.equal(kit.filter(part=>part.kind==='organizer').length,2);
 assert.ok(kit.some(part=>part.kind==='shell'));
});
for(const side of ['front','back','left','right'] as Side[])test(`tiers choose panels on walls without a ${side} cutout`,async()=>{
 let p=defaultProject();p.width=180;p.depth=90;p.height=36;p.cutouts={[side]:{shape:'round',width:.3,depth:8,position:.5}};
 p=setLevelCount(p,2);p=editProject(p,d=>{d.shell=shellForPattern(d,'diamonds');});
 assert.equal(p.shell?.mode,'panels');assert.ok(!p.shell.sides?.includes(side));assert.equal(p.wallThickness,2);assert.equal(p.shell.mounts,false);
 const kit=await buildKit(p);assert.equal(kit.filter(part=>part.kind==='organizer').length,2);assert.ok(kit.some(part=>part.kind==='shell'));
 const next=shellForPattern(p,'waves');assert.deepEqual(next.sides,p.shell.sides);assert.equal(next.mounts,p.shell.mounts);
});
