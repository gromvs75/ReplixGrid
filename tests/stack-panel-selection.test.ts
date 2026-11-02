import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Side} from '../src/model.js';
import {editProject} from '../src/editor.js';
import {setLevelCount} from '../src/accessories.js';
import {shellForPattern} from '../src/shellSelection.js';
import {buildKit} from '../src/accessoryKernel.js';

test('selecting a pattern without tiers preserves the regular wrapped shell',()=>{
 const p=defaultProject(),s=shellForPattern(p,'diamonds');assert.notEqual(s.mode,'panels');
});
for(const side of ['front','back','left','right'] as Side[])test(`tiers choose panels on walls without a ${side} cutout`,async()=>{
 let p=defaultProject();p.width=180;p.depth=90;p.height=36;p.cutouts={[side]:{shape:'round',width:.3,depth:8,position:.5}};
 p=setLevelCount(p,2);p=editProject(p,d=>{d.shell=shellForPattern(d,'diamonds');});
 assert.equal(p.shell?.mode,'panels');assert.ok(!p.shell.sides?.includes(side));assert.equal(p.wallThickness,3.2);
 const kit=await buildKit(p);assert.equal(kit.filter(part=>part.kind==='organizer').length,2);assert.ok(kit.some(part=>part.kind==='shell'));
 const next=shellForPattern(p,'waves');assert.deepEqual(next.sides,p.shell.sides);assert.equal(next.mounts,p.shell.mounts);
});
