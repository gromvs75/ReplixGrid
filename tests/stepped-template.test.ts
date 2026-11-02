import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {organizerTemplate} from '../src/templates.js';
import {resolveWalls} from '../src/model.js';
import {editProject,parseProject} from '../src/editor.js';
import {topAt,defaultShell} from '../src/shell.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {decodeSTL} from '../src/stl.js';
import {shellGap} from '../src/reliefSize.js';

test('stepped capsule starts with a small radius without changing other capsule profiles',()=>{
 for(const shape of ['capsule','rounded'] as const){
  assert.equal(organizerTemplate(shape,'steps').cornerRadius,1);
  assert.equal(organizerTemplate(shape,'steps').innerCornerRadius,0.5);
 }
 assert.equal(organizerTemplate('capsule','flat').cornerRadius,45);
 assert.equal(organizerTemplate('capsule','slope').cornerRadius,45);
});

for(const border of [2,5])test(`shell keeps a ${border} mm solid vertical border at each step`,async()=>{
 const p=organizerTemplate('rounded','steps');p.shell={...defaultShell('diamonds'),border};
 const steps=resolveWalls(p)[0].stepPoints!,built=await buildShell(p),wasm=await Module();wasm.setup();
 const triangles=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(triangles.flat().map((_,i)=>i))});mesh.merge();
 const raw=new wasm.Manifold(mesh),shell=raw.translate(built.position);
 try{for(let i=1;i<steps.length;i++){
  const [x,h]=steps[i],lo=steps[i-1][1],width=border-.4;
  const probe=wasm.Manifold.cube([width,.4,h-lo-2]).translate([x+.2,-shellGap(p)-p.shell.thickness+.2,lo+1]);
  const intersection=shell.intersect(probe);try{assert.ok(intersection.volume()>probe.volume()*.98,`step ${i}: vertical border must be solid`);}finally{intersection.delete();probe.delete();}
 }}finally{shell.delete();raw.delete();}
});

for(const shape of ['rounded','capsule'] as const)test(`${shape}: stepped outer walls follow dividers in project and exported geometry`,async()=>{
 let p=organizerTemplate(shape,'steps');assert.deepEqual(parseProject(JSON.stringify(p)),JSON.parse(JSON.stringify(p)));
 const front=resolveWalls(p).find(w=>w.id==='front')!;
 assert.deepEqual(front.stepPoints?.map(([,h])=>h),[22,38,70]);
 const [first,second]=front.stepPoints!.slice(1).map(([x])=>x);
 assert.equal(topAt(front,first-1),22);assert.equal(topAt(front,first+1),38);assert.equal(topAt(front,second+1),70);
 const built=await buildOrganizer(p),wasm=await Module();wasm.setup();const ts=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(ts.flat(2)),triVerts:new Uint32Array(ts.flat().map((_,i)=>i))});mesh.merge();const body=new wasm.Manifold(mesh);
 try{
  for(const [x,z] of [[first-5,30],[second-5,50]] as const){const probe=wasm.Manifold.cube([1,.5,1]).translate([x,.7,z]);const overlap=body.intersect(probe);assert.ok(overlap.volume()<.001,`low level x=${x}, z=${z}`);overlap.delete();probe.delete();}
  for(const [i,z] of [[1,30],[2,50]] as const){const boundary=front.stepPoints![i][0]-p.wallThickness/2,next=front.stepPoints![i+1]?.[0]??p.width,r=Math.min(p.cornerRadius!,p.depth/2,(next-boundary)/2),diagonal=r-(r-p.wallThickness/2)/Math.sqrt(2);const probe=wasm.Manifold.cube([.25,.25,1]).translate([boundary+diagonal,diagonal,z]);const overlap=body.intersect(probe);assert.ok(overlap.volume()>.04,`rounded wall ${i}: ${overlap.volume()}`);overlap.delete();probe.delete();}
 }finally{body.delete();}
 p=editProject(p,d=>{d.root.split!.ratio=.25;d.root.split!.height=44;});
 const changed=resolveWalls(p).find(w=>w.id==='front')!;
 assert.notEqual(changed.stepPoints![1][0],first);assert.equal(changed.stepPoints![1][1],44);
 p.shell=defaultShell('diamonds');assert.ok((await buildShell(p)).inspection.volume>0);
});
for(const shape of ['circle','oval'] as const)test(`${shape}: stepped contour follows its divider heights`,async()=>{
 let p=organizerTemplate(shape,'steps');const before=resolveWalls(p).find(w=>w.id==='front')!;
 assert.deepEqual(before.stepPoints?.map(([,h])=>h),[22,38,70]);
 assert.ok((await buildOrganizer(p)).inspection.volume>0);
 p=editProject(p,d=>{d.root.split!.ratio=.27;d.root.split!.height=46;});
 const after=resolveWalls(p).find(w=>w.id==='front')!;
 assert.notEqual(after.stepPoints![1][0],before.stepPoints![1][0]);assert.equal(after.stepPoints![1][1],46);
 p.shell=defaultShell('diamonds');assert.ok((await buildShell(p)).inspection.volume>0);
});
for(const shape of ['rounded','circle','oval'] as const)test(`${shape}: setting one step changes its divider and survives serialization`,async()=>{
 const {setStepHeight}=await import('../src/editor.js');let p=organizerTemplate(shape,'steps');
 p=setStepHeight(p,'front',1,47);const walls=resolveWalls(p);
 assert.equal(walls.find(w=>w.id==='front')!.stepPoints![1][1],47);
 assert.equal(walls.find(w=>w.id==='back')!.stepPoints![1][1],47);
 assert.equal(walls.find(w=>w.id===p.root.id)!.startHeight,47);
 assert.deepEqual(parseProject(JSON.stringify(p)),JSON.parse(JSON.stringify(p)));
 assert.ok((await buildOrganizer(p)).inspection.volume>0);
});
