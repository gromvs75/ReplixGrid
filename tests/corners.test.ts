import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,resolveWalls} from '../src/model.js';
import {footprintContour} from '../src/footprint.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {defaultShell} from '../src/shell.js';
import {splitCell} from '../src/editor.js';
import Module from 'manifold-3d';
import {decodeSTL} from '../src/stl.js';
test('chamfer offsets preserve normal clearance at diagonal faces',()=>{const p=defaultProject();p.cornerStyle='chamfer';p.cornerRadius=15;const a=footprintContour(p),b=footprintContour(p,.5);assert.equal(a.length,8);assert.ok(Math.abs((a[0][0]+a[0][1]-b[0][0]-b[0][1])/Math.SQRT2-.5)<1e-8);});
test('radius and chamfer size change the exported shape',async()=>{const p=defaultProject();p.cornerRadius=5;const a=await buildOrganizer(p);p.cornerRadius=20;const b=await buildOrganizer(p);assert.ok(b.inspection.volume<a.inspection.volume);p.cornerStyle='chamfer';const c=await buildOrganizer(p);assert.notEqual(c.inspection.volume,b.inspection.volume);});
for(const style of ['round','chamfer'] as const)test(`${style}: rounded inner compartment corners add material without changing the outer envelope`,async()=>{let p=defaultProject();p.width=80;p.depth=60;p.cornerRadius=10;p.cornerStyle=style;p=splitCell(p,'root','x');const a=await buildOrganizer(p);p.innerCornerRadius=5;const b=await buildOrganizer(p);assert.ok(b.inspection.volume>a.inspection.volume+1);assert.deepEqual(b.inspection.bounds,a.inspection.bounds);});
test('chamfered sleeve fits the organizer with internal fillets',async()=>{let p=defaultProject();p.width=80;p.depth=60;p.cornerStyle='chamfer';p.cornerRadius=12;p.innerCornerRadius=4;p.shell=defaultShell('diamonds');p=splitCell(p,'root','y');const a=await buildOrganizer(p),b=await buildShell(p);const wasm=await Module();wasm.setup();const owned:{delete():void}[]=[];const load=(built:typeof a)=>{const tris=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(tris.flatMap((_,i)=>[i*3,i*3+1,i*3+2]))});mesh.merge();const m=new wasm.Manifold(mesh);owned.push(m);const placed=m.translate(built.position);owned.push(placed);return placed;};try{const aa=load(a),bb=load(b),overlap=aa.intersect(bb);owned.push(overlap);assert.ok(overlap.volume()<.001);}finally{owned.reverse().forEach(o=>o.delete());}});
test('inner corner settings are validated',()=>{const p=defaultProject();p.innerCornerRadius=-1;assert.throws(()=>resolveWalls(p));});
for(const footprint of ['circle','oval','honeycomb'] as const)test(`${footprint}: inner fillets remain a printable connected solid`,async()=>{let p=defaultProject();p.footprint=footprint;p.width=120;p.depth=120;p.innerCornerRadius=5;if(footprint!=='honeycomb')p=splitCell(p,'root','x');const result=await buildOrganizer(p);assert.ok(result.inspection.volume>0);});
test('internal rounds coexist with variable heights, cutouts, waves and lean',async()=>{let p=defaultProject();p.cornerStyle='chamfer';p.cornerRadius=10;p.innerCornerRadius=5;p=splitCell(p,'root','x');p.wallProfiles={front:{start:20,end:55,style:'zigzag',wavelength:18}};p.cutouts={front:{shape:'smooth',width:.5,depth:12,position:.5}};p.tilt=20;const result=await buildOrganizer(p);assert.ok(result.inspection.volume>0);});

// Compare the actual exported cross-section, not just volume or render normals.
for(const requested of [6.5,14])test(`all four cavity corners share one radius (requested ${requested})`,async()=>{
 const {regions}=await import('../src/editor.js');
 const {roundedContour}=await import('../src/rounding.js');
 let p=defaultProject();p.width=100;p.depth=90;p.cornerRadius=12;p.innerCornerRadius=requested;p=splitCell(p,'root','x');
 const built=await buildOrganizer(p),wasm=await Module();wasm.setup();
 const triangles=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(triangles.flat().map((_,i)=>i))});mesh.merge();
 const body=new wasm.Manifold(mesh),slice=body.slice(10);
 try{for(const r of regions(p).filter(r=>!r.cell.split)){
  const box=new wasm.CrossSection([[[r.x,r.y],[r.x+r.width,r.y],[r.x+r.width,r.y+r.depth],[r.x,r.y+r.depth]]]);
  const footprint=new wasm.CrossSection([footprintContour(p,-p.wallThickness)]),space=box.intersect(footprint);
  const actual=space.subtract(slice),expected=new wasm.CrossSection([roundedContour(r.width,r.depth,Math.max(requested,10),r.x,r.y)]);
  const missing=expected.subtract(actual),extra=actual.subtract(expected);
  try{assert.ok(missing.area()+extra.area()<.5,`cavity ${r.cell.id}: error ${missing.area()+extra.area()} mm²`);}
  finally{missing.delete();extra.delete();expected.delete();actual.delete();space.delete();footprint.delete();box.delete();}
 }}finally{slice.delete();body.delete();}
});
