import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,resolveWalls} from '../src/model.js';
import {buildOrganizer} from '../src/kernel.js';
import {buildKit} from '../src/accessoryKernel.js';
import {honeyCells} from '../src/footprint.js';
import {decodeSTL} from '../src/stl.js';

test('raised central honey cell keeps both halves of all six shared walls',async()=>{
 const p={...defaultProject(),footprint:'honeycomb' as const,width:170,depth:110,honeycombHeights:[80,30,30,30,30,30,30],innerCornerRadius:4};
 const built=await buildOrganizer(p),wasm=await Module();wasm.setup();const t=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const original=new wasm.Manifold(mesh),body=original.translate(built.position);
 try{const cell=honeyCells(p)[0];for(let i=0;i<6;i++){const a=cell[i],b=cell[(i+1)%6],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);for(const side of [-.7,.7]){const x=(a[0]+b[0])/2-dy/l*side,y=(a[1]+b[1])/2+dx/l*side;const probe=wasm.Manifold.cube([.1,.1,1]).translate([x-.05,y-.05,60]);const hit=body.intersect(probe);assert.ok(hit.volume()>.0099,`edge ${i} side ${side}`);hit.delete();probe.delete();}}}finally{body.delete();original.delete();}
});
test('rounding reduces every honey cavity including its exterior-facing corners',async()=>{
 const p={...defaultProject(),footprint:'honeycomb' as const,width:170,depth:110};const wasm=await Module();wasm.setup();
 const slices=[];
 try{for(const radius of [0,4]){const built=await buildOrganizer({...p,innerCornerRadius:radius}),t=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const body=new wasm.Manifold(mesh),slice=body.slice(10);slices.push(slice);body.delete();}
 for(const poly of honeyCells(p)){const region=new wasm.CrossSection([poly]),a=region.subtract(slices[0]),b=region.subtract(slices[1]);assert.ok(a.area()-b.area()>5,'all cells gain internal fillets');const rounded=b.toPolygons().sort((a,b)=>b.length-a.length)[0];for(let i=0;i<rounded.length;i++){const a=rounded[(i+rounded.length-1)%rounded.length],v=rounded[i],c=rounded[(i+1)%rounded.length],ux=v[0]-a[0],uy=v[1]-a[1],vx=c[0]-v[0],vy=c[1]-v[1];const turn=Math.abs(Math.atan2(ux*vy-uy*vx,ux*vx+uy*vy));assert.ok(turn<.1,'no sharp interior corner remains');}region.delete();a.delete();b.delete();}
 }finally{slices.forEach(s=>s.delete());}
});
for(const footprint of [undefined,'circle','honeycomb'] as const)for(const content of ['grid','pens'] as const)test(`${footprint??'rectangle'} ${content}: fitted insert is closed, removable and has a flat bottom`,async()=>{
 const p={...defaultProject(),width:140,depth:footprint==='circle'?140:120,footprint,innerCornerRadius:3,cups:[{cellId:footprint==='honeycomb'?'honey-0':'root',shape:'fitted' as const,height:25,content,rows:2,columns:2,holeDiameter:10}]};
 const kit=await buildKit(p);assert.equal(kit.length,2);assert.equal(kit[1].inspection.bounds.min[2],0);assert.equal(kit[1].inspection.bounds.max[2],27);assert.equal(kit[1].position[2],2);
 const wasm=await Module();wasm.setup();const bodies=kit.map(part=>{const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const original=new wasm.Manifold(mesh),placed=original.translate(part.position);original.delete();return placed;});
 try{const overlap=bodies[0].intersect(bodies[1]);assert.ok(Math.abs(overlap.volume())<.001);overlap.delete();const floor=bodies[1].slice(2.6),middle=bodies[1].slice(10);if(content==='grid')assert.ok(floor.area()>middle.area()*1.5,'grid cells are open');else assert.ok(floor.area()>middle.area(),'pen holes leave a closed bottom');floor.delete();middle.delete();}finally{bodies.forEach(b=>b.delete());}
});
test('invalid insert counts and diameters are rejected',()=>{for(const patch of [{rows:0},{columns:7},{holeDiameter:0},{content:'bad'}])assert.throws(()=>resolveWalls({...defaultProject(),cups:[{cellId:'root',shape:'fitted',height:20,...patch} as any]}));});
test('pen holes use available space while keeping solid walls and a closed floor',async()=>{
 const p={...defaultProject(),width:60,depth:45,cups:[{cellId:'root',shape:'fitted' as const,height:20,content:'pens' as const,holeDiameter:10}]};
 const part=(await buildKit(p))[1],wasm=await Module();wasm.setup();const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const body=new wasm.Manifold(mesh),floor=body.slice(.6),slice=body.slice(5);
 try{assert.equal(floor.toPolygons().length,1);assert.equal(slice.toPolygons().length,13,'12 holes fit in four columns and three rows');assert.equal(body.decompose().length,1);}finally{floor.delete();slice.delete();body.delete();}
});
for(const footprint of [undefined,'honeycomb'] as const)for(const content of ['empty','grid','pens'] as const)test(`leaning ${footprint??'rectangle'} ${content} insert fits and slides out along the lean`,async()=>{
 const p={...defaultProject(),width:140,depth:120,tilt:25,footprint,innerCornerRadius:3,cups:[{cellId:footprint==='honeycomb'?'honey-0':'root',shape:'fitted' as const,height:25,content,holeDiameter:10}]};
 const kit=await buildKit(p),wasm=await Module();wasm.setup();
 const bodies=kit.map(part=>{const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const original=new wasm.Manifold(mesh),placed=original.translate(part.position);original.delete();return placed;});
 try{
  assert.equal(kit[1].inspection.bounds.min[2],0);assert.equal(kit[1].inspection.bounds.max[2],27);
  const lean=-Math.tan(25*Math.PI/180);
  for(const dz of [0,5,15,35]){const raised=bodies[1].translate([dz*lean,0,dz]),overlap=bodies[0].intersect(raised);assert.ok(Math.abs(overlap.volume())<.002,`collision at lift ${dz}`);overlap.delete();raised.delete();}
  const bottom=bodies[1].slice(p.floorThickness+.2),top=bodies[1].slice(p.floorThickness+24.8);
  assert.ok(Math.abs((top.bounds().min[0]-bottom.bounds().min[0])-24.6*lean)<.01,'insert follows same forward lean');bottom.delete();top.delete();
 }finally{bodies.forEach(b=>b.delete());}
});
test('exposed corners above low honey neighbors have no sharp spur in the exported mesh',async()=>{
 const p={...defaultProject(),footprint:'honeycomb' as const,width:170,depth:110,honeycombHeights:[80,30,30,30,30,30,30],innerCornerRadius:4};
 const built=await buildOrganizer(p),wasm=await Module();wasm.setup();const t=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const body=new wasm.Manifold(mesh);
 try{const raw=body.slice(60),section=raw.simplify(.001);raw.delete();try{const contours=section.toPolygons();assert.equal(contours.length,2,'one closed ring above the neighbors');for(const poly of contours)for(let i=0;i<poly.length;i++){const a=poly[(i+poly.length-1)%poly.length],b=poly[i],c=poly[(i+1)%poly.length];const u=[b[0]-a[0],b[1]-a[1]],v=[c[0]-b[0],c[1]-b[1]];const turn=Math.abs(Math.atan2(u[0]*v[1]-u[1]*v[0],u[0]*v[0]+u[1]*v[1]));assert.ok(turn<.1,`outer and inner arcs must both be smooth: ${turn}, ${JSON.stringify([a,b,c])}`);}}finally{section.delete();}}finally{body.delete();}
});

test('saved insert heights follow their own honey cell, including tall cells and floor changes',async()=>{
 const p={...defaultProject(),footprint:'honeycomb' as const,width:170,depth:110,innerCornerRadius:4,floorThickness:3,honeycombHeights:[80,120,36,36,36,36,36],cups:[
  {cellId:'honey-0',shape:'fitted' as const,height:8,content:'empty' as const},
  {cellId:'honey-1',shape:'fitted' as const,height:60,content:'grid' as const},
  {cellId:'honey-2',shape:'fitted' as const,height:20,content:'pens' as const,holeDiameter:8},
 ]};
 for(const changed of [false,true]){
  if(changed){p.honeycombHeights[0]=100;p.floorThickness=2;}
  const kit=await buildKit(p);
  for(const part of kit.filter(p=>p.kind==='cup')){
   const index=Number(part.cellId!.slice(6));
   assert.ok(Math.abs(part.position[2]+part.inspection.bounds.max[2]-(p.honeycombHeights[index]-1))<.001);
   assert.equal(part.position[2],p.floorThickness);
  }
 }
});

test('sloping honey inserts follow the local rim, including after leaning',async()=>{
 const {organizerTemplate}=await import('../src/templates.js');
 const {insertHeightAt}=await import('../src/accessories.js');
 for(const tilt of [0,20]){
  const p=organizerTemplate('honeycomb','slope');p.tilt=tilt;p.innerCornerRadius=3;
  p.cups=[{cellId:'honey-1',shape:'fitted',height:8,content:'grid'}];
  const kit=await buildKit(p),part=kit.find(p=>p.kind==='cup')!,walls=resolveWalls(p),lean=-Math.tan(tilt*Math.PI/180);
  const vertices=decodeSTL(part.stl).flat().map(v=>v.map((n,k)=>n+part.position[k]));
  const top=vertices.filter(v=>Math.abs(v[2]-p.floorThickness-insertHeightAt(p,'honey-1',v[0]-v[2]*lean,v[1],walls))<.01);
  assert.ok(top.length>20,'local top follows slope');
  assert.ok(Math.max(...top.map(v=>v[2]))-Math.min(...top.map(v=>v[2]))>5,'top is not a flat cap');
  assert.equal(part.position[2],p.floorThickness);
 }
});

test('solid pen insert follows a wavy rim with and without lean',async()=>{
 for(const tilt of [0,20]){
  const p={...defaultProject(),width:140,depth:120,tilt,wallProfiles:{front:{start:40,end:65,style:'wavy' as const,wavelength:24},back:{start:40,end:65,style:'wavy' as const,wavelength:24}},cups:[{cellId:'root',shape:'fitted' as const,height:20,content:'pens' as const,holeDiameter:12}]};
  const part=(await buildKit(p)).find(v=>v.kind==='cup')!;
  const vertices=decodeSTL(part.stl).flat();
  assert.ok(part.inspection.volume>0);
  assert.ok(Math.max(...vertices.map(v=>v[2]))-Math.min(...vertices.map(v=>v[2]))>35,'insert retains the varied rim height');
 }
});
