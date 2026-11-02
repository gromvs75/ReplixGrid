import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import Module from 'manifold-3d';
import {buildKit} from '../src/accessoryKernel.js';
import {insertHeightAt} from '../src/accessories.js';
import {regions} from '../src/editor.js';
import {resolveWalls,type Project} from '../src/model.js';
import {decodeSTL} from '../src/stl.js';
import {organizerTemplate} from '../src/templates.js';
import {setStepHeight} from '../src/editor.js';

for(const content of ['pens','grid'] as const)test(`stepped ${content} inserts have flat tops at each compartment height`,async()=>{
 let p=organizerTemplate('rounded','steps');
 const ids=regions(p).filter(r=>!r.cell.split).sort((a,b)=>a.x-b.x).map(r=>r.cell.id);
 p.cups=ids.map(cellId=>({cellId,shape:'fitted' as const,height:20,content,holeDiameter:10}));
 for(const [project,heights] of [[p,[22,38,70]],[setStepHeight(p,'front',1,44),[22,44,70]]] as const){
  const parts=await buildKit(project),inserts=parts.filter(part=>part.kind==='cup');
  const wasm=await Module();wasm.setup();
  const solid=(part:typeof parts[number])=>{const tris=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(tris.flat().map((_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),placed=raw.translate(part.position);raw.delete();return placed;};
  const body=solid(parts.find(part=>part.kind==='organizer')!);
  for(const [i,part] of inserts.entries()){
   const vertices=decodeSTL(part.stl).flat().map(v=>v.map((n,j)=>n+part.position[j]));
   const top=Math.max(...vertices.map(v=>v[2]));
   assert.ok(Math.abs(top-(heights[i]-1))<.01,`compartment ${i+1}: ${top}`);
   assert.ok(vertices.some(v=>Math.abs(v[2]-top)<.01));
   const r=regions(project).find(r=>r.cell.id===ids[i])!,walls=resolveWalls(project);
   for(const x of [r.x+.6,r.x+r.width/2,r.x+r.width-.6])assert.ok(Math.abs(insertHeightAt(project,ids[i],x,r.y+r.depth/2,walls)+project.floorThickness-top)<.01);
   const insert=solid(part),overlap=body.intersect(insert);
   try{assert.ok(Math.abs(overlap.volume())<.001,'insert must not overlap the compartment');}finally{overlap.delete();insert.delete();}
  }
  body.delete();
 }
});

test('oval middle insert follows its partitions and the wavy outer walls',async()=>{
 const p=JSON.parse(readFileSync(new URL('./fixtures/oval-stepped-insert.json',import.meta.url),'utf8')) as Project;
 const id=p.cups![0].cellId,r=regions(p).find(v=>v.cell.id===id)!,walls=resolveWalls(p);
 const zRegion=(x:number,y:number)=>insertHeightAt(p,id,x,y,walls)+p.floorThickness;
 for(const y of [r.y,r.y+r.depth/2,r.y+r.depth]){
  assert.ok(Math.abs(zRegion(r.x,y)-35.4)<.001);
  assert.ok(Math.abs(zRegion(r.x+r.width/2,y)-45.9)<.001);
  assert.ok(Math.abs(zRegion(r.x+r.width,y)-56.4)<.001);
 }
 const parts=await buildKit({...p,shell:undefined});const insert=parts.find(v=>v.kind==='cup')!,body=parts.find(v=>v.kind==='organizer')!;
 const vertices=decodeSTL(insert.stl).flat().map(v=>v.map((n,i)=>n+insert.position[i]));
 const bounds={minX:Math.min(...vertices.map(v=>v[0])),maxX:Math.max(...vertices.map(v=>v[0])),minY:Math.min(...vertices.map(v=>v[1])),maxY:Math.max(...vertices.map(v=>v[1]))};
 const z=(x:number,y:number)=>insertHeightAt(p,id,x,y,walls,bounds,true)+p.floorThickness;
 assert.ok(Math.abs(z(bounds.minX,bounds.minY)-35.4)<.001);
 assert.ok(Math.abs(z(bounds.maxX,bounds.maxY)-56.4)<.001);
 for(const [x,y,h] of vertices)assert.ok(h<=z(x,y)+.005,'insert must not rise above its straight top');
 const top=vertices.filter(([x,y,h])=>h>5&&Math.abs(h-z(x,y))<.005);
 assert.ok(top.length>20,'rim and divider tops follow the height profile');
 assert.ok(top.some(([x,,h])=>Math.abs(x-bounds.minX)<.01&&Math.abs(h-35.4)<.01),'lower edge follows its partition');
 assert.ok(top.some(([x,,h])=>Math.abs(x-bounds.maxX)<.01&&Math.abs(h-56.4)<.01),'higher edge follows its partition');
 const mid=(bounds.minX+bounds.maxX)/2;
 assert.ok(Math.abs(z(mid,bounds.minY)-(insertHeightAt(p,id,mid,bounds.minY,walls,bounds)+p.floorThickness))>.05,'outer wave changes the middle insert rim');
 assert.ok(top.some(([x,y,h])=>Math.abs(h-(insertHeightAt(p,id,x,y,walls,bounds)+p.floorThickness))>.1),'exported surface contains the wave');
 const wasm=await Module();wasm.setup();const owned:import('manifold-3d').Manifold[]=[];
 const solid=(part:typeof insert)=>{const tris=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(tris.flat().map((_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),placed=raw.translate(part.position);owned.push(raw,placed);return placed;};
 try{const overlap=solid(body).intersect(solid(insert));owned.push(overlap);assert.ok(Math.abs(overlap.volume())<.001);}finally{owned.reverse().forEach(v=>v.delete());}
});

test('fitted insert updates when the neighboring partition height changes',async()=>{
 const p=JSON.parse(readFileSync(new URL('./fixtures/oval-stepped-insert.json',import.meta.url),'utf8')) as Project;
 const split=p.root.split!.second.split!;
 split.profile!.start=split.profile!.end=65;
 const part=(await buildKit({...p,shell:undefined})).find(v=>v.kind==='cup')!;
 const vertices=decodeSTL(part.stl).flat().map(v=>v.map((n,i)=>n+part.position[i]));
 const edge=Math.max(...vertices.map(v=>v[0]));
 assert.ok(vertices.some(([x,,z])=>Math.abs(x-edge)<.01&&Math.abs(z-64)<.01),'insert edge tracks the new partition height with the 1 mm offset');
});

test('end insert follows its partition while retaining the outer profile',async()=>{
 const p=JSON.parse(readFileSync(new URL('./fixtures/oval-stepped-insert.json',import.meta.url),'utf8')) as Project;
 const id=p.root.split!.second.split!.second.id;
 p.cups=[{...p.cups![0],cellId:id}];
 const walls=resolveWalls(p),parts=await buildKit({...p,shell:undefined}),part=parts.find(v=>v.kind==='cup')!,body=parts.find(v=>v.kind==='organizer')!;
 const vertices=decodeSTL(part.stl).flat().map(v=>v.map((n,i)=>n+part.position[i]));
 const bounds={minX:Math.min(...vertices.map(v=>v[0])),maxX:Math.max(...vertices.map(v=>v[0])),minY:Math.min(...vertices.map(v=>v[1])),maxY:Math.max(...vertices.map(v=>v[1]))};
 for(const y of [bounds.minY,(bounds.minY+bounds.maxY)/2,bounds.maxY])assert.ok(Math.abs(insertHeightAt(p,id,bounds.minX,y,walls,bounds)+p.floorThickness-56.4)<.001);
 assert.ok(vertices.some(([x,,z])=>Math.abs(x-bounds.minX)<.01&&Math.abs(z-56.4)<.01),'actual edge is below the partition');
 const x=(bounds.minX+bounds.maxX)/2,y=bounds.minY;
 const straight=walls.map(w=>({...w,transitionStyle:'straight' as const,wavelength:undefined}));
 assert.ok(Math.abs(insertHeightAt(p,id,x,y,walls,bounds)-insertHeightAt(p,id,x,y,straight,bounds))>.05,'outer wave remains visible');
 const wasm=await Module();wasm.setup();const owned:import('manifold-3d').Manifold[]=[];
 const solid=(v:typeof part)=>{const tris=decodeSTL(v.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(tris.flat().map((_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),placed=raw.translate(v.position);owned.push(raw,placed);return placed;};
 try{const overlap=solid(body).intersect(solid(part));owned.push(overlap);assert.ok(Math.abs(overlap.volume())<.001,'insert must not intersect the organizer');}finally{owned.reverse().forEach(v=>v.delete());}
});
