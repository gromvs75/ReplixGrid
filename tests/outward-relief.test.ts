import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {defaultProject} from '../src/model.js';
import {defaultShell} from '../src/shell.js';
import {decodeSTL} from '../src/stl.js';
for(const tilt of [0,20])test(`outward relief keeps the core intact and clears the sleeve at ${tilt} degrees`,async()=>{
 const p=defaultProject();p.width=60;p.depth=45;p.height=28;p.cornerRadius=7;p.tilt=tilt;
 const plain=await buildOrganizer(p);
 p.relief={pattern:'herringbone',spacing:10,depth:3};p.shell=defaultShell('honeycomb');
 const raised=await buildOrganizer(p),shell=await buildShell(p);
 const wasm=await Module();wasm.setup();
 const solid=(part:typeof plain)=>{const tris=decodeSTL(part.stl);const mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(Array.from({length:tris.length*3},(_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),positioned=raw.translate(part.position);raw.delete();return positioned;};
 const a=solid(plain),b=solid(raised),c=solid(shell),missing=a.subtract(b),collision=b.intersect(c);
 try{assert.ok(Math.abs(missing.volume())<.01,'relief must never cut the core');assert.ok(Math.abs(collision.volume())<.01,'sleeve must clear peaks');assert.ok(raised.inspection.volume>plain.inspection.volume);assert.ok(raised.inspection.bounds.max[1]-raised.inspection.bounds.min[1]>p.depth+5);}finally{for(const s of [a,b,c,missing,collision])s.delete();}
});
test('a deep cutout does not move relief rows below its edge',async()=>{
 const p=defaultProject();p.width=60;p.depth=45;p.height=45;p.cornerRadius=6;
 p.relief={pattern:'herringbone',spacing:10,depth:2};
 const plain=await buildOrganizer(p);
 p.cutouts={left:{shape:'round',width:.7,depth:25,position:.5}};
 const cut=await buildOrganizer(p);
 const rows=(part:typeof plain)=>[...new Set(decodeSTL(part.stl).flat().filter(([x,y,z])=>x<-.1&&y>10&&y<35&&z>4&&z<15).map(v=>v[2]))];
 const original=rows(plain),after=rows(cut);
 assert.ok(original.length>8&&after.length>8);
 for(const z of after)assert.ok(original.some(v=>Math.abs(v-z)<.0001),`cutout shifted a relief row to ${z}`);
});
