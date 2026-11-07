import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,resolveWalls} from '../src/model.js';
import {parseProject} from '../src/editor.js';
import {defaultShell} from '../src/shell.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {decodeSTL} from '../src/stl.js';
import {readFile} from 'node:fs/promises';
import {buildKit} from '../src/accessoryKernel.js';
import {organizerTemplate} from '../src/templates.js';

for(const style of ['smooth','rings','steps'] as const)test(`honeycomb ${style} band supports a stepped sleeve`,async()=>{
 const p=organizerTemplate('honeycomb','steps');p.baseBand={style,height:4};p.shell=defaultShell('diamonds');
 const tray=await buildOrganizer(p),sleeve=await buildShell(p),wasm=await Module();wasm.setup();
 const owned:import('manifold-3d').Manifold[]=[];
 const keep=(m:import('manifold-3d').Manifold)=>{owned.push(m);return m;};
 const make=(stl:ArrayBuffer)=>{const t=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();return keep(new wasm.Manifold(mesh));};
 try{
  const body=make(tray.stl),shell=make(sleeve.stl);assert.ok(Math.abs(sleeve.position[2]-4)<.001);
  const components=body.decompose();owned.push(...components);assert.equal(components.length,1);
  const lower=shell.slice(.1),upper=shell.slice(2.5);try{assert.equal(lower.toPolygons().length,2);assert.ok(Math.abs(lower.area()-upper.area())<.1);}finally{lower.delete();upper.delete();}
  for(const dz of [0,5,80]){const shifted=keep(shell.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]+dz]));assert.ok(Math.abs(keep(body.intersect(shifted)).volume())<.01,'sleeve must slide without collision');}
  const below=keep(shell.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]-.2]));assert.ok(keep(body.intersect(below)).volume()>.1,'band supports sleeve');
 }finally{owned.reverse().forEach(m=>m.delete());}
});

for(const style of ['smooth','rings','steps'] as const)test(`${style} band is connected and supports the sleeve`,async()=>{
 const p=defaultProject();p.width=80;p.depth=60;p.height=25;p.cornerRadius=8;p.baseBand={style,height:4};p.shell=defaultShell('diamonds');
 assert.deepEqual(parseProject(JSON.stringify(p)).baseBand,p.baseBand);
 const tray=await buildOrganizer(p),sleeve=await buildShell(p);
 assert.ok(Math.abs(sleeve.position[2]-4)<.001);
 assert.ok(Math.abs(sleeve.position[2]+sleeve.inspection.bounds.max[2]-25)<.001);
 const wasm=await Module();wasm.setup();const owned:import('manifold-3d').Manifold[]=[];
 const make=(stl:ArrayBuffer)=>{const t=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const s=new wasm.Manifold(mesh);owned.push(s);return s;};
 try{
  const a=make(tray.stl),b=make(sleeve.stl),pieces=a.decompose();owned.push(...pieces);assert.equal(pieces.length,1);
  const bottom=b.slice(.1),upper=b.slice(2.5);
  try{assert.equal(bottom.toPolygons().length,2,'sleeve starts with a continuous closed rim');assert.ok(Math.abs(bottom.area()-upper.area())<.05,'lower rim stays solid above its trimmed edge');}finally{bottom.delete();upper.delete();}
  if(style==='rings'){const ridge=a.slice(.5),groove=a.slice(1.5);try{assert.ok(ridge.bounds().max[0]-groove.bounds().max[0]>.5,'decorative grooves have visible depth');}finally{ridge.delete();groove.delete();}}
  for(const dz of [0,5,30]){const moved=b.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]+dz]);owned.push(moved);const overlap=a.intersect(moved);owned.push(overlap);assert.ok(Math.abs(overlap.volume())<.001);}
  const below=b.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]-.2]);owned.push(below);const overlap=a.intersect(below);owned.push(overlap);assert.ok(overlap.volume()>.1,'rim supports sleeve');
 }finally{owned.reverse().forEach(s=>s.delete());}
});
test('decorative band supports a sleeve on a sloped oval body',async()=>{
 const p=defaultProject();p.width=100;p.depth=60;p.heights={right:55};p.transitions=['front','back'];p.baseBand={style:'rings',height:4};
 assert.ok((await buildOrganizer(p)).inspection.volume>0);
 p.footprint='oval';assert.ok((await buildOrganizer(p)).inspection.volume>0);
 p.shell=defaultShell('diamonds');resolveWalls(p);
 const tray=await buildOrganizer(p),sleeve=await buildShell(p),wasm=await Module();wasm.setup();const owned:import('manifold-3d').Manifold[]=[];
 const make=(stl:ArrayBuffer)=>{const t=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const s=new wasm.Manifold(mesh);owned.push(s);return s;};
 try{const a=make(tray.stl),b=make(sleeve.stl);for(const dz of [0,5,60]){const moved=b.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]+dz]);owned.push(moved);const overlap=a.intersect(moved);owned.push(overlap);assert.ok(Math.abs(overlap.volume())<.001);}const below=b.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]-.2]);owned.push(below);const overlap=a.intersect(below);owned.push(overlap);assert.ok(overlap.volume()>.1);}finally{owned.reverse().forEach(s=>s.delete());}
});
test('band rejects unsafe combinations',()=>{
 const p=defaultProject();p.baseBand={style:'rings',height:4};p.shell={...defaultShell('diamonds'),snap:true};assert.throws(()=>resolveWalls(p),/кант/);
 p.shell.snap=false;p.floorThickness=1;assert.throws(()=>resolveWalls(p),/кант/);
});
test('wavy triangle shell with band and pen insert exports closed solids',async()=>{
 const p=parseProject(await readFile(new URL('./fixtures/wavy-triangles-band.json',import.meta.url),'utf8'));
 const kit=await buildKit(p);
 assert.deepEqual(kit.map(part=>part.kind),['organizer','shell','cup']);
 for(const part of kit)assert.ok(part.inspection.volume>0);
});
for(const cutout of [false,true])test(`base band with lid and sleeve${cutout?' and wall cutout':''} fits and supports the sleeve`,async()=>{
 const p=defaultProject();p.width=100;p.depth=60;p.height=30;p.cornerRadius=8;p.baseBand={style:'rings',height:4};p.lid=true;p.shell=defaultShell('diamonds');
 if(cutout)p.cutouts={left:{shape:'round',width:.5,depth:12,position:.5}};
 const parts=await buildKit(p),tray=parts.find(x=>x.kind==='organizer')!,sleeve=parts.find(x=>x.kind==='shell')!,lid=parts.find(x=>x.kind==='lid')!,wasm=await Module();wasm.setup();const owned:import('manifold-3d').Manifold[]=[];
 const keep=(m:import('manifold-3d').Manifold)=>{owned.push(m);return m;};
 const make=(stl:ArrayBuffer)=>{const t=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();return keep(new wasm.Manifold(mesh));};
 try{
  const body=keep(make(tray.stl).translate(tray.position)),shell=make(sleeve.stl),cover=keep(keep(make(lid.stl).rotate([180,0,0])).translate([lid.position[0],lid.position[1]+lid.inspection.bounds.max[1],p.height+2]));
  assert.ok(Math.abs(sleeve.position[2]-4)<.001);
  const bottom=shell.slice(.1),upper=shell.slice(2.5);try{assert.equal(bottom.toPolygons().length,2);assert.ok(Math.abs(bottom.area()-upper.area())<.05,'continuous lower sleeve rim');}finally{bottom.delete();upper.delete();}
  for(const dz of [0,5,35]){const moved=keep(shell.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]+dz]));assert.ok(Math.abs(keep(body.intersect(moved)).volume())<.001,'sleeve slides free of body');if(dz===0)assert.ok(Math.abs(keep(cover.intersect(moved)).volume())<.001,'lid clears sleeve');}
  assert.ok(Math.abs(keep(body.intersect(cover)).volume())<.001,'lid clears body');
  const below=keep(shell.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]-.2]));assert.ok(keep(body.intersect(below)).volume()>.1,'band supports sleeve');
 }finally{owned.reverse().forEach(m=>m.delete());}
});
test('band cannot fill a deep exterior cutout',()=>{
 const p=defaultProject();p.baseBand={style:'smooth',height:4};p.cutouts={front:{shape:'round',width:.5,depth:29,position:.5}};
 assert.throws(()=>resolveWalls(p),/перекрывает вырез/);
});
