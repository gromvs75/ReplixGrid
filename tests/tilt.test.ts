import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {tiltOnBase} from '../src/tilt.js';
import {organizerTemplate} from '../src/templates.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {defaultShell} from '../src/shell.js';
import {decodeSTL} from '../src/stl.js';

test('lean preserves floor height, thickness and material volume while moving the top forward',async()=>{
 const wasm=await Module();wasm.setup();const p=organizerTemplate('rounded','flat');p.tilt=25;
 const owned:{delete():void}[]=[];const keep=<T extends {delete():void}>(v:T):T=>{owned.push(v);return v;};
 try{
  const floor=keep(wasm.Manifold.cube([p.width,p.depth,p.floorThickness]));
  const tilted=tiltOnBase(wasm,p,floor,false,keep);
  assert.equal(tilted.status(),'NoError');assert.ok(Math.abs(tilted.volume()-floor.volume())<1e-6);
  assert.equal(tilted.boundingBox().min[2],0);assert.equal(tilted.boundingBox().max[2],p.floorThickness);
  const mesh=tilted.getMesh();for(let i=0;i<mesh.vertProperties.length;i+=mesh.numProp)assert.ok(mesh.vertProperties[i+2]===0||mesh.vertProperties[i+2]===p.floorThickness);
  assert.ok(Math.abs(tilted.boundingBox().min[0]+p.floorThickness*Math.tan(25*Math.PI/180))<1e-5);
 }finally{owned.reverse().forEach(v=>v.delete());}
});

test('exported organizer has no added wedge, and matching shell has no collision',async()=>{
 const p=organizerTemplate('rounded','flat');p.width=90;p.depth=65;p.shell=defaultShell('diamonds');
 // The non-tilted sleeved organizer has a separate support ledge; tilt
 // deliberately disables that ledge. Compare equal base geometry.
 const straight=await buildOrganizer({...p,shell:undefined});p.tilt=25;const tilted=await buildOrganizer(p),sleeve=await buildShell(p);
 assert.ok(Math.abs(tilted.inspection.volume-straight.inspection.volume)<.1);
 assert.equal(tilted.inspection.bounds.min[2],0);assert.equal(tilted.inspection.bounds.max[2],straight.inspection.bounds.max[2]);
 const wasm=await Module();wasm.setup();const owned:{delete():void}[]=[];const keep=<T extends {delete():void}>(v:T):T=>{owned.push(v);return v;};
 const load=(built:typeof tilted)=>{const tris=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(Array.from({length:tris.length*3},(_,i)=>i))});mesh.merge();return keep(keep(new wasm.Manifold(mesh)).translate(built.position));};
 try{const body=load(tilted),shell=load(sleeve);assert.ok(keep(body.intersect(shell)).volume()<1e-5);
  // Probe just above the floor; a tall vertical ray can hit a leaning divider.
  for(const x of [25,50]){const probe=keep(keep(wasm.Manifold.cube([.1,.1,p.floorThickness+1])).translate([x,10,0]));const section=keep(body.intersect(probe));assert.ok(Math.abs(section.boundingBox().max[2]-p.floorThickness)<1e-5);}
 }finally{owned.reverse().forEach(v=>v.delete());}
});

for(const shape of ['rounded','honeycomb'] as const)test(`${shape}: exported upper walls lean toward the front, not the rear`,async()=>{
 const p=organizerTemplate(shape,'flat');p.tilt=20;
 const built=await buildOrganizer(p),wasm=await Module();wasm.setup();
 const tris=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(tris.flat().map((_,i)=>i))});mesh.merge();
 const body=new wasm.Manifold(mesh),low=body.slice(5),high=body.slice(20);
 try{
  const expected=-15*Math.tan(20*Math.PI/180);
  for(const edge of ['min','max'] as const){assert.ok(Math.abs(high.bounds()[edge][0]-low.bounds()[edge][0]-expected)<.001);assert.ok(Math.abs(high.bounds()[edge][1]-low.bounds()[edge][1])<.001);}
 }finally{low.delete();high.delete();body.delete();}
});
