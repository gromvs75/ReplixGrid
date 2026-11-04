import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,resolveWalls,type Project} from '../src/model.js';
import {setLevelCount,switchLevel} from '../src/accessories.js';
import {buildKit} from '../src/accessoryKernel.js';
import {decodeSTL} from '../src/stl.js';
import {parseProject} from '../src/editor.js';
import {stackFit} from '../src/stackFit.js';
const source=():Project=>({...defaultProject(),width:80,depth:60,height:25,cornerRadius:8,shell:{pattern:'cellular',size:14,gap:.5,thickness:1.6}});
for(const footprint of ['rounded','circle','oval'] as const)test(`wrapped ${footprint} tiers have complete separate sleeves and no solid collisions`,async()=>{
 let p=source();if(footprint==='circle'){p.footprint='circle';p.depth=p.width;}if(footprint==='oval')p.footprint='oval';
 p=setLevelCount(p,3);p=switchLevel(p,1);p.height=30;p.shell={...p.shell!,pattern:'waves',gap:1,thickness:2};p=switchLevel(p,2);delete p.shell;p=switchLevel(p,0);
 resolveWalls(p);assert.deepEqual(parseProject(JSON.stringify(p)),JSON.parse(JSON.stringify(p)));
 const parts=await buildKit(p);assert.equal(parts.filter(v=>v.kind==='shell').length,2);assert.deepEqual(parts.filter(v=>v.kind==='shell').map(v=>v.level),[0,1]);
 const w=await Module();w.setup();const bodies=parts.map(part=>{const t=decodeSTL(part.stl),mesh=new w.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const raw=new w.Manifold(mesh),placed=raw.translate(part.position);raw.delete();assert.equal(placed.status(),'NoError');return placed;});
 try{for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){const intersection=bodies[i].intersect(bodies[j]);try{assert.ok(Math.abs(intersection.volume())<.005,`${parts[i].name}/${parts[j].name}: ${intersection.volume()}`);}finally{intersection.delete();}}
 for(let i=0;i<parts.length;i++)if(parts[i].kind==='shell')for(const dz of [-1,-10,-40]){
  const shifted=bodies[i].translate([0,0,dz]),tray=bodies[parts.findIndex(v=>v.kind==='organizer'&&v.level===parts[i].level)],hit=shifted.intersect(tray);
  try{assert.ok(Math.abs(hit.volume())<.005,'lower shell must slide off downward');}finally{hit.delete();shifted.delete();}
 }
 }finally{for(const b of bodies)b.delete();}
 const lower=parts.find(v=>v.name==='tier-1-shell')!;const fit=stackFit({...source(),shell:{...source().shell!,gap:1,thickness:2}},.5);
 assert.ok(Math.abs(lower.position[2]+lower.inspection.bounds.max[2]-(25-fit.flare-.3))<.001);
 const switched=await buildKit(switchLevel(p,1));assert.deepEqual(switched.map(v=>[v.name,v.position,v.inspection.volume]),parts.map(v=>[v.name,v.position,v.inspection.volume]));
});
test('short sleeve tiers refuse an impossible collar and one tray restores original shell height',async()=>{
 let p=setLevelCount(source(),2);p.height=5;assert.throws(()=>resolveWalls(p),/увеличьте высоту/);
 const plain=setLevelCount(setLevelCount(source(),2),1),kit=await buildKit(plain),shell=kit.find(v=>v.kind==='shell')!;
 assert.ok(Math.abs(shell.position[2]+shell.inspection.bounds.max[2]-25)<.001);
});
