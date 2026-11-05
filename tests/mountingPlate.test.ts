import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {newDrawer,newTray,parseDrawer,drawerIssues} from '../src/drawer.js';
import {platePlan,MOUNT} from '../src/mountingPlate.js';
import {buildPlateTiles,mountedKit} from '../src/mountingKernel.js';
import {buildKit} from '../src/accessoryKernel.js';
import {setLevelCount} from '../src/accessories.js';
import {decodeSTL} from '../src/stl.js';
function drawer(width=500,depth=300,bed=270){const d=newDrawer();d.width=width;d.depth=depth;d.plate={enabled:true,bedWidth:bed,bedDepth:bed};return d;}
test('drawer coverage depends on drawer size, tile count on printer bed, preserving nonstandard dimensions',()=>{
 for(const [w,h,bed]of [[500,300,270],[503.7,307.2,220],[180,280,270],[999,613,180]]){
  const d=drawer(w,h,bed),p=platePlan(d);
  assert.ok(Math.abs(p.tiles.reduce((s,t)=>s+t.width*t.depth,0)-(w-4)*(h-4))<.001);
  for(const t of p.tiles){assert.ok(t.width+(t.column<p.columns-1?MOUNT.tabDepth:0)<=bed-4+.001);assert.ok(t.depth+(t.row<p.rows-1?MOUNT.tabDepth:0)<=bed-4+.001);}
  for(const peg of p.pegs){assert.equal((peg.x-d.gap-10)%20,0);assert.equal((peg.y-d.gap-10)%20,0);}
 }
 assert.equal(platePlan(drawer()).tiles.length,4);
 assert.ok(platePlan(drawer(500,300,180)).tiles.length>4);
 assert.ok(platePlan(drawer(1000,600)).tiles.length>4);
 const d=drawer();assert.deepEqual(parseDrawer(JSON.stringify(d)).plate,d.plate);
 d.plate!.bedWidth=0;assert.throws(()=>parseDrawer(JSON.stringify(d)));
});
test('mounted height includes plate and external socket base',()=>{
 const d=drawer();d.height=33;const t=newTray('A',80,60,30);t.x=t.y=2;d.trays=[t];
 assert.ok(drawerIssues(d,{[t.id]:{width:80,depth:60,height:30}})[t.id].includes('Выше доступной высоты ящика'));
 d.plate!.enabled=false;assert.deepEqual(drawerIssues(d,{[t.id]:{width:80,depth:60,height:30}})[t.id],[]);
});
test('section meshes fit the bed and neighbouring dovetails have no intersection',async()=>{
 const d=drawer(103.7,87.2,80),tiles=await buildPlateTiles(d),wasm=await Module();wasm.setup();const owned:any[]=[];
 try{const solids=tiles.map(p=>{const triangles=decodeSTL(p.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(Array.from({length:triangles.length*3},(_,i)=>i))});mesh.merge();const m=new wasm.Manifold(mesh);owned.push(m);const shifted=m.translate(p.position);owned.push(shifted);assert.ok(p.inspection.bounds.max[0]<=76.001);assert.ok(p.inspection.bounds.max[1]<=76.001);return shifted;});
 for(let i=0;i<solids.length;i++)for(let j=i+1;j<solids.length;j++){const overlap=solids[i].intersect(solids[j]);owned.push(overlap);assert.ok(overlap.volume()<.001,`tiles ${i}/${j}`);}
 }finally{owned.reverse().forEach(m=>m.delete());}
});
test('socket base preserves compartment volume and matches pegs after tray rotation',async()=>{
 const d=drawer(180,280),tray=newTray('A',80,60,30);tray.x=4.3;tray.y=7.6;d.trays=[tray];const source=JSON.stringify(tray.project);
 const wasm=await Module();wasm.setup();const owned:any[]=[];const solid=(stl:ArrayBuffer)=>{const tris=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(Array.from({length:tris.length*3},(_,i)=>i))});mesh.merge();const s=new wasm.Manifold(mesh);owned.push(s);return s;};
 try{const original=(await buildKit(tray.project))[0];for(const rotation of [0,90] as const){tray.rotation=rotation;const mounted=(await mountedKit({layout:d,trayId:tray.id}))[0];assert.ok(Math.abs(mounted.inspection.bounds.max[2]-32.1)<.001);const m=solid(mounted.stl).translate([0,0,-2.1]);owned.push(m);const clip=wasm.Manifold.cube([80,60,40]);owned.push(clip);const above=m.intersect(clip);owned.push(above);assert.ok(Math.abs(above.volume()-solid(original.stl).volume())<.01);
 const plate=(await buildPlateTiles(d))[0];const base=solid(plate.stl).translate(plate.position);owned.push(base);const position=rotation===0?m.translate([tray.x,tray.y,4.1]):m.rotate([0,0,90]).translate([60+tray.x,tray.y,4.1]);owned.push(position);const intersection=position.intersect(base);owned.push(intersection);assert.ok(intersection.volume()<.01);
 }assert.equal(JSON.stringify(tray.project),source);
 }finally{owned.reverse().forEach(m=>m.delete());}
});

test('shells and upper tiers stay unchanged; only the bottom organizer receives sockets',async()=>{
 const d=drawer(180,280),tray=newTray('Stack',80,60,25);tray.x=tray.y=10;
 tray.project.shell={pattern:'diamonds',size:12,gap:.5,thickness:1.6};tray.project.baseBand={height:4,style:'rings'};tray.project=setLevelCount(tray.project,2);d.trays=[tray];
 const original=await buildKit(tray.project),mounted=await mountedKit({layout:d,trayId:tray.id});
 assert.equal(mounted.length,original.length);
 for(let i=0;i<original.length;i++)if(original[i].kind!=='organizer'||original[i].level!==0)assert.deepEqual(mounted[i],original[i]);
 const i=original.findIndex(v=>v.kind==='organizer'&&v.level===0);assert.ok(Math.abs(mounted[i].inspection.bounds.max[2]-original[i].inspection.bounds.max[2]-2.1)<.001);
});

test('default plate joints reproduce the print-validated V3 coupon',async()=>{
 const d=drawer(84,44,64),actual=await buildPlateTiles(d),validated=await buildPlateTiles(d,.03,.05);
 assert.equal(actual.length,2);assert.equal(MOUNT.clearance,.12);
 for(let i=0;i<actual.length;i++)assert.deepEqual(actual[i].stl,validated[i].stl);
 const wasm=await Module();wasm.setup();const owned:any[]=[];
 try{
  const solids=actual.map(p=>{const tris=decodeSTL(p.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(Array.from({length:tris.length*3},(_,i)=>i))});mesh.merge();const m=new wasm.Manifold(mesh);owned.push(m);const placed=m.translate(p.position);owned.push(placed);return placed;});
  const nominal=solids[0].intersect(solids[1]);owned.push(nominal);assert.ok(Math.abs(nominal.volume())<1e-6);
  const separated=solids[1].translate([.1,0,0]);owned.push(separated);const collision=solids[0].intersect(separated);owned.push(collision);assert.ok(collision.volume()>.01,'joint must stop sections separating by 0.1 mm');
 }finally{owned.reverse().forEach(m=>m.delete());}
});
