import {test} from 'node:test';
import assert from 'node:assert/strict';
import {organizerTemplate} from '../src/templates.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {defaultShell} from '../src/shell.js';
import {parseProject} from '../src/editor.js';
for(const shape of ['rounded','capsule','circle','oval','honeycomb'] as const)for(const heights of ['flat','slope','steps'] as const)test(`${shape} ${heights}: editable template and watertight organizer/sleeve export`,async()=>{
 const p=organizerTemplate(shape,heights);assert.deepEqual(parseProject(JSON.stringify(p)),JSON.parse(JSON.stringify(p)));
 const a=await buildOrganizer(p);assert.ok(a.inspection.volume>0);assert.ok(Math.abs(a.inspection.bounds.max[0]-p.width)<.01);assert.ok(Math.abs(a.inspection.bounds.max[1]-p.depth)<.01);
 p.shell=defaultShell('diamonds');const b=await buildShell(p);assert.ok(b.inspection.volume>0);
});

test('capsule slope: exported rim and both divider faces share the full-length plane',async()=>{
 const p=organizerTemplate('capsule','slope');
 const {decodeSTL}=await import('../src/stl.js');
 const vertices=decodeSTL((await buildOrganizer(p)).stl).flat();
 const top=vertices.filter(v=>v[2]>p.floorThickness+.001);
 assert.ok(top.length>20);
 for(const [x,,z] of top)assert.ok(Math.abs(z-(22+48*x/180))<.001,`x=${x}, z=${z}`);
});
