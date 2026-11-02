import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject} from '../src/model.js';
import {defaultShell} from '../src/shell.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {decodeSTL} from '../src/stl.js';
import {shellClipIssue} from '../src/shellClips.js';
import {parseProject} from '../src/editor.js';
for(const thickness of [1,1.6,2])test(`shell clips closed and collision-free at ${thickness} mm`,async()=>{
 const p=defaultProject();p.width=60;p.depth=40;p.height=32;p.cornerRadius=5;p.shell={...defaultShell('honeycomb'),thickness,snap:true};
 const a=await buildOrganizer(p),b=await buildShell(p);
 const wasm=await Module();wasm.setup();
 const solid=(part:typeof a)=>{const tris=decodeSTL(part.stl);const mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(Array.from({length:tris.length*3},(_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),m=raw.translate(part.position);raw.delete();return m;};
 const x=solid(a),y=solid(b),collision=x.intersect(y);
 try{assert.ok(collision.volume()<.001,`collision ${collision.volume()}`);assert.equal(x.status(),'NoError');assert.equal(y.status(),'NoError');}finally{collision.delete();x.delete();y.delete();}
 assert.equal(parseProject(JSON.stringify(p)).shell?.snap,true);
});
test('clip configurations report unsupported combinations',()=>{const p=defaultProject();p.tilt=10;assert.ok(shellClipIssue(p));p.shell={...defaultShell('honeycomb'),snap:true};assert.throws(()=>parseProject(JSON.stringify(p)));});
