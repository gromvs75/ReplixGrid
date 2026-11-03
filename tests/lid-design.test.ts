import test from 'node:test';
import assert from 'node:assert/strict';
import Module,{type Manifold} from 'manifold-3d';
import {defaultProject} from '../src/model.js';
import {buildKit} from '../src/accessoryKernel.js';
import {parseProject} from '../src/editor.js';
import {decodeSTL} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
import {reliefPatterns} from '../src/reliefPatterns.js';

test('lid designs retain their fit and export separate handles',async()=>{
 const wasm=await Module();wasm.setup();
 for(const shape of ['rounded','circle','oval'] as const)for(const pattern of ['smooth','lines','dots'] as const){
  const p=defaultProject();p.width=80;p.depth=shape==='circle'?80:60;p.cornerRadius=shape==='rounded'?8:0;p.footprint=shape==='rounded'?undefined:shape;p.lid=true;p.lidDesign={pattern,rimPattern:'rings',rimHeight:5,handle:pattern==='lines'?'bar':'round'};
  assert.deepEqual(parseProject(JSON.stringify(p)).lidDesign,p.lidDesign);
  const parts=await buildKit(p),tray=parts.find(x=>x.kind==='organizer')!,lid=parts.find(x=>x.kind==='lid')!,handle=parts.find(x=>x.kind==='lid-handle')!;
  assert.ok(handle&&lid);assert.ok(Math.abs(lid.inspection.bounds.max[2]-7)<.001);
  assert.ok(new TextDecoder().decode(formatExport(parts,'3mf').data).includes('lid-handle'));
  const owned:Manifold[]=[];const keep=(x:Manifold)=>{owned.push(x);return x;};
  const solid=(stl:ArrayBuffer)=>{const t=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();return keep(new wasm.Manifold(mesh));};
  try{const body=keep(solid(tray.stl).translate(tray.position));let cover=keep(solid(lid.stl).rotate([180,0,0]));cover=keep(cover.translate([lid.position[0],lid.position[1]+lid.inspection.bounds.max[1],p.height+2]));assert.ok(Math.abs(keep(body.intersect(cover)).volume())<.001,`mating clearance remains free: ${shape}, ${pattern}`);}
  finally{owned.reverse().forEach(x=>x.delete());}
 }
});
test('lid remains separate and seats without collisions with wall cutouts',async()=>{
 const wasm=await Module();wasm.setup();
 for(const side of ['front','back','left','right','root'] as const){
  let p=defaultProject();p.width=80;p.depth=60;p.cornerRadius=8;p.lid=true;
  if(side==='root'){const {splitCell}=await import('../src/editor.js');p=splitCell(p,'root','x',2);}
  p.cutouts={[side]:{shape:'round',width:.5,depth:12,position:.5}};
  const parts=await buildKit(p),lid=parts.find(x=>x.kind==='lid')!,tray=parts.find(x=>x.kind==='organizer')!,owned:Manifold[]=[];
  const keep=(m:Manifold)=>{owned.push(m);return m;};const solid=(stl:ArrayBuffer)=>{const t=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();return keep(new wasm.Manifold(mesh));};
  try{const body=keep(solid(tray.stl).translate(tray.position)),rotated=keep(solid(lid.stl).rotate([180,0,0])),cover=keep(rotated.translate([lid.position[0],lid.position[1]+lid.inspection.bounds.max[1],p.height+2]));assert.ok(Math.abs(keep(body.intersect(cover)).volume())<.001,side);}
  finally{owned.reverse().forEach(m=>m.delete());}
 }
});
test('organizer relief patterns generate closed lid meshes',async()=>{
 for(const pattern of reliefPatterns){const p=defaultProject();p.width=60;p.depth=40;p.cornerRadius=5;p.lid=true;p.lidDesign={pattern,rimHeight:2,handle:'none',patternSpacing:8,patternDepth:.6};const parts=await buildKit(p);assert.ok(parts.find(x=>x.kind==='lid')!.inspection.volume>0,pattern);}
});
test('lid relief has real depth in the exported mesh',async()=>{
 const p=defaultProject();p.width=60;p.depth=40;p.lid=true;p.lidDesign={pattern:'waffle',rimHeight:2,handle:'none',patternSpacing:8,patternDepth:.8};
 const lid=(await buildKit(p)).find(part=>part.kind==='lid')!,points=decodeSTL(lid.stl).flat().filter(([x,y,z])=>x>12&&x<48&&y>10&&y<30&&z<1);
 assert.ok(Math.min(...points.map(p=>p[2]))<.1);
 assert.ok(Math.max(...points.map(p=>p[2]))>.7,'the chosen depth is present in the STL');
});
test('adjusted handles with bevel or rounded edge export as one closed part',async()=>{
 for(const handle of ['round','bar'] as const)for(const handleEdge of ['round','chamfer'] as const){const p=defaultProject();p.width=80;p.depth=60;p.lid=true;p.lidDesign={pattern:'smooth',rimHeight:2,handle,handleWidth:20,handleHeight:7,handleEdge,edgeSize:1.4};const result=(await buildKit(p)).find(x=>x.kind==='lid-handle')!;assert.ok(result.inspection.volume>0);assert.ok(Math.abs(result.inspection.bounds.max[2]-7)<.01);}
});

test('inset plate clears the rim, divider and cup and rests on the tray seat',async()=>{
 const wasm=await Module();wasm.setup();
 const {splitCell}=await import('../src/editor.js');
 for(const footprint of [undefined,'oval'] as const){
  const p=splitCell({...defaultProject(),width:80,depth:60,cornerRadius:6,footprint},'root','x',2);
  p.lid=true;p.lidDesign={fit:'inset',pattern:'lines',rimHeight:2,handle:'round'};
  p.cutouts={front:{shape:'round',width:.4,depth:7,position:.5}};
  p.cups=[{cellId:p.root.split!.first.id,shape:'fitted',height:15}];
  const parts=await buildKit(parseProject(JSON.stringify(p))),lid=parts.find(x=>x.kind==='lid')!;
  assert.equal(lid.position[2],p.height);
  assert.equal(lid.inspection.bounds.max[2],2);
  assert.ok(lid.position[0]>0 && lid.position[0]+lid.inspection.bounds.max[0]<p.width);
  const owned:Manifold[]=[],keep=(m:Manifold)=>{owned.push(m);return m;};
  const solid=(stl:ArrayBuffer)=>{const t=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();return keep(new wasm.Manifold(mesh));};
  try{
   const cover=keep(keep(solid(lid.stl).rotate([180,0,0])).translate([lid.position[0],lid.position[1]+lid.inspection.bounds.max[1],lid.position[2]]));
   for(const part of parts.filter(x=>x.kind==='organizer'||x.kind==='cup')){
    const body=keep(solid(part.stl).translate(part.position));
    assert.ok(Math.abs(keep(body.intersect(cover)).volume())<.001);
    if(part.kind==='organizer')assert.ok(keep(body.intersect(keep(cover.translate([0,0,-.1])))).volume()>1);
   }
  }finally{owned.reverse().forEach(m=>m.delete());}
 }
});

test('two-color lid shares print coordinates and filament components across both fits',async()=>{
 for(const fit of ['inset','outer'] as const){
  const p=defaultProject();p.lid=true;p.lidDesign={fit,olive:true,pattern:'smooth',handle:'none',rimHeight:2,baseColor:'#ffffff',patternColor:'#557722'};
  const parts=await buildKit(p),base=parts.find(x=>x.name==='lid')!,face=parts.find(x=>x.name==='lid-olive')!;
  assert.deepEqual(face.position,base.position);
  assert.ok(Math.abs(face.inspection.bounds.max[2]-1.6)<.0001);
  assert.ok(Math.abs(base.inspection.bounds.max[2]-(fit==='inset'?3.2:5.2))<.0001);
  const file=new TextDecoder().decode(formatExport([base,face],'3mf',undefined,{'#ffffff':2,'#557722':4}).data);
  assert.match(file,/<components><component objectid="2"\/><component objectid="3"\/><\/components>/);
  assert.equal(file.match(/<item objectid=/g)?.length,1);
  assert.match(file,/<part id="3"[^>]*>[^]*?key="extruder" value="4"/);
 }
});

test('organic motifs survive project reload and create distinct printable accent meshes',async()=>{
 const signatures=new Set<number>();
 for(const motif of ['olive','ginkgo','fern','tide','pebbles','grain'] as const){
  const p=defaultProject();p.lid=true;p.lidDesign={olive:true,motif,fit:'inset',pattern:'smooth',rimHeight:2,handle:'none'};
  const project=parseProject(JSON.stringify(p));assert.equal(project.lidDesign?.motif,motif);
  const parts=await buildKit(project),face=parts.find(x=>x.name==='lid-olive')!;
  assert.ok(face.stl.byteLength>1000);assert.ok(Math.abs(face.inspection.bounds.max[2]-1.6)<.001);
  signatures.add(face.stl.byteLength);
 }
 assert.equal(signatures.size,6);
});
