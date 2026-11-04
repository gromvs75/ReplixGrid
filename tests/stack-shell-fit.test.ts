import {footprintContour} from '../src/footprint.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,resolveWalls,type Project} from '../src/model.js';
import {setLevelCount,switchLevel,tierElevation,levelProject} from '../src/accessories.js';
import {buildKit} from '../src/accessoryKernel.js';
import {decodeSTL} from '../src/stl.js';
import {parseProject,splitCell} from '../src/editor.js';
import {buildOrganizer} from '../src/kernel.js';
const source=():Project=>({...defaultProject(),width:80,depth:60,height:25,cornerRadius:8,shell:{pattern:'cellular',size:14,gap:.5,thickness:1.6}});
for(const footprint of ['rounded','circle','oval'] as const)test(`wrapped ${footprint} tiers have complete separate sleeves and no solid collisions`,async()=>{
 let p=source();if(footprint==='circle'){p.footprint='circle';p.depth=p.width;}if(footprint==='oval')p.footprint='oval';
 p.baseBand={height:4,style:footprint==='rounded'?'smooth':footprint==='circle'?'rings':'steps'};
 p=splitCell(p,'root','x',3);p=setLevelCount(p,3);p=switchLevel(p,1);p.height=30;p.shell={...p.shell!,pattern:'waves',gap:1,thickness:2};p=switchLevel(p,2);delete p.shell;p=switchLevel(p,0);
 resolveWalls(p);assert.deepEqual(parseProject(JSON.stringify(p)),JSON.parse(JSON.stringify(p)));
 const parts=await buildKit(p);assert.equal(parts.filter(v=>v.kind==='shell').length,2);assert.deepEqual(parts.filter(v=>v.kind==='shell').map(v=>v.level),[0,1]);
 const w=await Module();w.setup();const bodies=parts.map(part=>{const t=decodeSTL(part.stl),mesh=new w.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const raw=new w.Manifold(mesh),placed=raw.translate(part.position);raw.delete();assert.equal(placed.status(),'NoError');return placed;});
 try{for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){const intersection=bodies[i].intersect(bodies[j]);try{assert.ok(Math.abs(intersection.volume())<.005,`${parts[i].name}/${parts[j].name}: ${intersection.volume()}`);}finally{intersection.delete();}}
 for(let i=0;i<parts.length;i++)if(parts[i].kind==='shell')for(const dz of [1,10,40]){
  const shifted=bodies[i].translate([0,0,dz]),tray=bodies[parts.findIndex(v=>v.kind==='organizer'&&v.level===parts[i].level)],hit=shifted.intersect(tray);
  try{assert.ok(Math.abs(hit.volume())<.005,'shell must slide off upward');}finally{hit.delete();shifted.delete();}
 }
 }finally{for(const b of bodies)b.delete();}
 const lower=parts.find(v=>v.name==='tier-1-shell')!;
 assert.ok(Math.abs(lower.position[2]+lower.inspection.bounds.max[2]-25)<.001);
 assert.ok(Math.abs(tierElevation(p,1)-27.2)<.001);
 for(let i=0;i<3;i++){
  const lp=levelProject(p,i),part=parts.find(v=>v.kind==='organizer'&&v.level===i)!;
  // Original floor-to-rim geometry remains byte-independent of the added socket below it.
  const original=await buildOrganizer({...lp,shell:undefined});
  const make=(data:ArrayBuffer,position:[number,number,number])=>{const t=decodeSTL(data),mesh=new w.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,j)=>j))});mesh.merge();const raw=new w.Manifold(mesh),placed=raw.translate(position);raw.delete();return placed;};
  const actual=make(part.stl,[part.position[0],part.position[1],part.position[2]-tierElevation(p,i)]),expected=make(original.stl,original.position);
  const clip=w.Manifold.extrude([footprintContour(lp,0)],lp.height);const a=actual.intersect(clip),e=expected.intersect(clip),missing=e.subtract(a),extra=a.subtract(e);
  try{assert.ok(Math.abs(missing.volume())<.02,`no original floor or wall removed: ${missing.volume()} tier ${i}`);assert.ok(Math.abs(extra.volume())<.02,'no interior volume consumed');}finally{for(const v of [actual,expected,clip,a,e,missing,extra])v.delete();}
 }
 const switched=await buildKit(switchLevel(p,1));assert.deepEqual(switched.map(v=>[v.name,v.position,v.inspection.volume]),parts.map(v=>[v.name,v.position,v.inspection.volume]));
});
test('large gaps refuse a tongue outside the wall and one tray restores original shell height',async()=>{
 let p=setLevelCount(source(),2);p.stack!.gap=1;assert.throws(()=>resolveWalls(p),/зазор посадки/);
 const plain=setLevelCount(setLevelCount(source(),2),1),kit=await buildKit(plain),shell=kit.find(v=>v.kind==='shell')!;
 assert.ok(Math.abs(shell.position[2]+shell.inspection.bounds.max[2]-25)<.001);
});

test('hidden sockets retain lids, inserts and their tier origins',async()=>{
 let p=setLevelCount(source(),2);p=switchLevel(p,1);p.lid=true;p.lidDesign={pattern:'smooth',rimHeight:2,handle:'none',fit:'inset'};
 p.cups=[{cellId:p.root.id,shape:'fitted',height:15}];
 const parts=await buildKit(p),upper=parts.find(v=>v.kind==='organizer'&&v.level===1)!,cup=parts.find(v=>v.kind==='cup')!;
 assert.ok(Math.abs(upper.position[2]-25)<.001);
 assert.ok(Math.abs(cup.position[2]-(tierElevation(p,1)+p.floorThickness))<.001);
 assert.ok(parts.some(v=>v.kind==='lid'));assert.equal(p.height,25);assert.equal(p.floorThickness,2);
});

test('bottom band stays on tier one through switching, adding, removing and serialization',()=>{
 let p=source();p.baseBand={height:4,style:'rings'};p=setLevelCount(p,2);
 assert.ok(levelProject(p,0).baseBand);assert.equal(levelProject(p,1).baseBand,undefined);
 p=switchLevel(p,1);assert.equal(p.baseBand,undefined);resolveWalls(p);
 const invalid=structuredClone(p);invalid.baseBand={height:4,style:'steps'};assert.throws(()=>resolveWalls(invalid),/только на первом/);
 p=setLevelCount(p,3);assert.equal(levelProject(p,2).baseBand,undefined);
 p=parseProject(JSON.stringify(p));p=switchLevel(p,0);assert.equal(p.baseBand?.style,'rings');
 const stored=structuredClone(p);stored.stack!.levels[1].settings!.baseBand={height:4,style:'smooth'};assert.throws(()=>parseProject(JSON.stringify(stored)),/только на первом/);
 p=setLevelCount(p,2);assert.equal(p.baseBand?.height,4);p=setLevelCount(p,1);resolveWalls(p);assert.equal(p.baseBand?.height,4);
});
