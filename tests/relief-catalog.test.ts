import {test} from 'node:test';
import assert from 'node:assert/strict';
import {reliefPatterns,reliefValue} from '../src/reliefPatterns.js';
import {defaultProject} from '../src/model.js';
import {parseProject} from '../src/editor.js';
import {buildOrganizer} from '../src/kernel.js';
import {organizerTemplate} from '../src/templates.js';
test('all texture fields are bounded and seamless around the perimeter',()=>{
 assert.equal(reliefPatterns.length,15);
 for(const pattern of reliefPatterns)for(let u=-1;u<2;u+=.071)for(let v=0;v<2;v+=.137){
  const a=reliefValue(pattern,u,v);assert.ok(a>=-1e-8&&a<=1+1e-8,pattern);
  assert.ok(Math.abs(a-reliefValue(pattern,u+1,v))<1e-8,`${pattern} seam`);
 }
});
for(const pattern of reliefPatterns)test(`${pattern}: printable relief survives project roundtrip and adds material outside the wall`,async()=>{
 const p=defaultProject();p.width=48;p.depth=40;p.height=24;p.cornerRadius=6;
 const plain=await buildOrganizer(p);p.relief={pattern,spacing:8,depth:.7};
 assert.deepEqual(parseProject(JSON.stringify(p)),p);
 const built=await buildOrganizer(p);
 assert.ok(built.inspection.volume>plain.inspection.volume);
 assert.ok(built.inspection.volume<plain.inspection.volume*2);
 for(let axis=0;axis<3;axis++){
  assert.ok(built.inspection.bounds.min[axis]<=plain.inspection.bounds.min[axis]+.001);
  assert.ok(built.inspection.bounds.max[axis]>=plain.inspection.bounds.max[axis]-.001);
 }
});
for(const shape of ['honeycomb','circle','rounded'] as const)test(`${shape}: textured slope and cutout remain printable`,async()=>{
 const p=organizerTemplate(shape,'slope');p.relief={pattern:'weave',spacing:12,depth:.7};
 if(shape!=='honeycomb'){p.tilt=20;p.cutouts={left:{shape:'round',width:.5,depth:12,position:.5}};}
 const built=await buildOrganizer(p);assert.ok(built.inspection.volume>0);
});
for(const pattern of reliefPatterns.slice(3))test(`${pattern}: honeycomb with different cell heights stays manifold`,async()=>{
 const p=organizerTemplate('honeycomb','slope');p.relief={pattern,spacing:12,depth:.7};
 assert.ok((await buildOrganizer(p)).inspection.volume>0);
});
test('relief depth changes actual material volume, including thin decorative walls',async()=>{
 const p=defaultProject();p.width=48;p.depth=40;p.height=24;p.cornerRadius=6;
 p.relief={pattern:'diagonal',spacing:8,depth:.2};
 const shallow=await buildOrganizer(p);
 p.relief.depth=.8;const deep=await buildOrganizer(p);
 assert.ok(deep.inspection.volume>shallow.inspection.volume+20);
 p.wallThickness=.8;p.relief.depth=.32;
 assert.equal(parseProject(JSON.stringify(p)).relief?.depth,.32);
 assert.ok((await buildOrganizer(p)).inspection.volume>0);
});
test('herringbone has symmetric V ribs separated by flat valleys',()=>{
 for(const u of [.1,.2,.3,.4]){
  const v=Math.abs(u-.5);
  assert.ok(reliefValue('herringbone',u,v)>.99);
  assert.ok(reliefValue('herringbone',1-u,v)>.99);
  assert.equal(reliefValue('herringbone',u,v+.5),0);
 }
});
