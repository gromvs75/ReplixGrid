import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {organizerTemplate} from '../src/templates.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {resolveWalls,steppedChamferLimit} from '../src/model.js';
import {regions,splitCell,cellById,editProject,parseProject} from '../src/editor.js';
import {defaultShell} from '../src/shell.js';
import {decodeSTL} from '../src/stl.js';
const wasm=await Module();wasm.setup();
function solid(part:Awaited<ReturnType<typeof buildOrganizer>>){const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),placed=raw.translate(part.position);raw.delete();return placed;}
for(const shape of ['rounded','capsule'] as const)for(const style of ['round','chamfer'] as const)test(`${shape} ${style}: stepped small radii produce connected printable solids`,async()=>{
 for(const radius of [0,.5,1,2,3,3.5]){
  const p=organizerTemplate(shape,'steps');p.cornerStyle=style;p.cornerRadius=radius;
  const body=solid(await buildOrganizer(p)),parts=body.decompose();
  try{assert.equal(parts.length,1,`radius ${radius}`);}finally{parts.forEach(s=>s.delete());body.delete();}
 }
});
for(const style of ['round','chamfer'] as const)test(`${style}: square stepped wall joins the divider without a recessed half-wall`,async()=>{
 const p=organizerTemplate('rounded','steps');p.cornerStyle=style;p.cornerRadius=0;
 const x=resolveWalls(p)[0].stepPoints![1][0],body=solid(await buildOrganizer(p));
 try{for(const y of [.2,p.depth-.7]){
  const probe=wasm.Manifold.cube([.4,.4,1]).translate([x-.8,y,25]),intersection=body.intersect(probe);
  try{assert.ok(intersection.volume()>.155,'outer wall must reach the edge of the divider');}finally{intersection.delete();probe.delete();}
 }}finally{body.delete();}
});
for(const count of [3,4])test(`${count} compartments: both raised corners round as radius changes`,async()=>{
 let p=organizerTemplate('rounded','steps');
 if(count===4){const leaves=regions(p).filter(r=>!r.cell.split).sort((a,b)=>a.x-b.x);p=splitCell(p,leaves.at(-1)!.cell.id,'x');const dividers=resolveWalls(p).slice(4).sort((a,b)=>a.x-b.x);dividers.forEach((w,i)=>{cellById(p.root,w.id)!.split!.height=38+i*16;});p.heights.right=70;}
 const wall=resolveWalls(p).find(w=>w.id==='front')!,steps=wall.stepPoints!;
 const small=solid(await buildOrganizer({...p,cornerRadius:0})),rounded=solid(await buildOrganizer({...p,cornerRadius:12}));
 try{for(let i=1;i<steps.length;i++)for(const y of [.25,p.depth-.75]){
  const z=steps[i-1][1]+Math.min(3,(steps[i][1]-steps[i-1][1])/2),probe=wasm.Manifold.cube([.5,.5,1]).translate([steps[i][0]+.25,y,z]);
  const before=small.intersect(probe),after=rounded.intersect(probe);
  try{assert.ok(before.volume()>.24,`unrounded step ${i} side ${y}`);assert.ok(after.volume()<.001,`rounded step ${i} side ${y}: ${after.volume()}`);}finally{probe.delete();before.delete();after.delete();}
 }}finally{small.delete();rounded.delete();}
});
test('rounded stepped organizer and its sleeve do not intersect',async()=>{
 const p=organizerTemplate('rounded','steps');p.cornerRadius=12;p.innerCornerRadius=10;p.shell=defaultShell('diamonds');
 const a=solid(await buildOrganizer(p)),b=solid(await buildShell(p)),overlap=a.intersect(b);
 try{assert.ok(Math.abs(overlap.volume())<.001);}finally{overlap.delete();b.delete();a.delete();}
});
test('inner corner is not added twice when the outer radius exceeds it',async()=>{
 const p=organizerTemplate('rounded','steps');p.wallThickness=2;p.innerCornerRadius=9;p.cornerRadius=11.5;p.shell=defaultShell('diamonds');
 const x=resolveWalls(p)[0].stepPoints![1][0]-p.wallThickness/2,body=solid(await buildOrganizer(p)),sleeve=solid(await buildShell(p));
 const excess=wasm.Manifold.cube([.3,.3,1]).translate([x+2.2,3,30]),wall=wasm.Manifold.cube([.3,.3,1]).translate([x+4.8,3,30]);
 const a=body.intersect(excess),b=body.intersect(wall),collision=body.intersect(sleeve);
 try{assert.ok(a.volume()<.001,'there must be no extra material inside the fillet');assert.ok(b.volume()>.08,'the rounded wall remains solid');assert.ok(Math.abs(collision.volume())<.001,'sleeve must clear the body');}
 finally{collision.delete();a.delete();b.delete();excess.delete();wall.delete();sleeve.delete();body.delete();}
});
test('chamfer applies to raised corners of both steps without floating walls',async()=>{
 const p=organizerTemplate('rounded','steps');p.cornerStyle='chamfer';p.cornerRadius=12;
 const points=resolveWalls(p)[0].stepPoints!,body=solid(await buildOrganizer(p));
 try{for(let i=1;i<points.length;i++)for(const y of [.1,p.depth-.2]){
  const z=points[i-1][1]+3,probe=wasm.Manifold.cube([.1,.1,1]).translate([points[i][0]-p.wallThickness/2+.1,y,z]);
  const intersection=body.intersect(probe);
  try{assert.ok(intersection.volume()<.001,`raised step ${i} must have a chamfer`);}finally{intersection.delete();probe.delete();}
 }for(const z of [23,30,37,40,50,69]){
  const slice=body.slice(z);try{const components=slice.toPolygons().filter(poly=>poly.reduce((a,v,i)=>{const n=poly[(i+1)%poly.length];return a+v[0]*n[1]-n[0]*v[1];},0)>0);assert.equal(components.length,1,`no separated fins at height ${z}`);}finally{slice.delete();}
 }}finally{body.delete();}
});

for(const style of ['round','chamfer'] as const)test(`${style}: inner corner fill does not protrude beyond the exposed outer corner`,async()=>{
 const p=organizerTemplate('rounded','steps');p.cornerStyle=style;p.cornerRadius=12;p.innerCornerRadius=0;
 const points=resolveWalls(p)[0].stepPoints!,body=solid(await buildOrganizer(p));
 try{for(let i=1;i<points.length;i++)for(const y of [2.4,p.depth-2.8]){
  const x=points[i][0]-p.wallThickness/2+2.4,z=points[i-1][1]+3;
  const probe=wasm.Manifold.cube([.4,.4,1]).translate([x,y,z]),overlap=body.intersect(probe);
  try{assert.ok(overlap.volume()<.001,`step ${i}: fill must remain inside the outer contour`);}finally{overlap.delete();probe.delete();}
 }}finally{body.delete();}
});

for(const style of ['round','chamfer'] as const)test(`${style}: inner radius controls the compartment below a step independently of the outer corner`,async()=>{
 const p=organizerTemplate('rounded','steps');p.cornerStyle=style;p.cornerRadius=12;
 const edge=resolveWalls(p)[0].stepPoints![1][0]-p.wallThickness/2;
 const square=solid(await buildOrganizer({...p,innerCornerRadius:0}));
 const rounded=solid(await buildOrganizer({...p,innerCornerRadius:6}));
 const probe=wasm.Manifold.cube([.3,.3,1]).translate([edge-1.4,3,10]);
 const a=square.intersect(probe),b=rounded.intersect(probe);
 try{assert.ok(a.volume()<.001,'zero inner radius keeps the compartment corner open');assert.ok(b.volume()>.08,'inner radius adds a rounded corner');}
 finally{a.delete();b.delete();probe.delete();square.delete();rounded.delete();}
});

test('large outer radius with a smaller inner radius produces a connected STL',async()=>{
 const p=organizerTemplate('rounded','steps');p.cornerRadius=45;p.innerCornerRadius=6.5;
 const body=solid(await buildOrganizer(p)),parts=body.decompose();
 try{assert.equal(parts.length,1);assert.ok(body.volume()>0);}finally{parts.forEach(part=>part.delete());body.delete();}
});

test('step chamfer is limited for a square inner corner, including opened projects',async()=>{
 const p=organizerTemplate('rounded','steps');p.innerCornerRadius=0;p.cornerRadius=12;p.cornerStyle='chamfer';
 const limited=editProject(p,()=>{});assert.equal(steppedChamferLimit(p),1.1);assert.equal(limited.cornerRadius,1.1);
 assert.equal(parseProject(JSON.stringify(p)).cornerRadius,1.1);
 assert.ok((2*p.wallThickness-limited.cornerRadius!)/Math.SQRT2>=p.wallThickness);
 const x=resolveWalls(p)[0].stepPoints![1][0]-p.wallThickness/2;
 const body=solid(await buildOrganizer(p));
 const cavity=wasm.Manifold.cube([.2,.2,1]).translate([x+p.wallThickness+.1,p.wallThickness+.1,30]);
 const joined=body.intersect(cavity);
 try{assert.ok(joined.volume()<.001,'the inner corner must remain open and square');}finally{joined.delete();cavity.delete();body.delete();}
});
