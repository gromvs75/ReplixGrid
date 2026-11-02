import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,resolveWalls,type Side} from '../src/model.js';
import {setLevelCount} from '../src/accessories.js';
import {buildKit} from '../src/accessoryKernel.js';
import {decodeSTL} from '../src/stl.js';
import {dividerOuterDistances} from '../src/wallDistances.js';
import {organizerTemplate} from '../src/templates.js';
import {splitCell} from '../src/editor.js';

for(const side of ['left','right','front','back'] as Side[])test(`tiers: ${side} cutout leaves an open collar and no overlap`,async()=>{
 const base=defaultProject();base.width=140;base.depth=100;base.cutouts={[side]:{shape:'round',width:.4,depth:10,position:.5}};
 const p=setLevelCount(base,2),parts=await buildKit(p),wasm=await Module();wasm.setup();
 const solid=(part:typeof parts[number])=>{const tris=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(tris.flat().map((_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),placed=raw.translate(part.position);raw.delete();return placed;};
 const lower=solid(parts[0]),upper=solid(parts[1]),collision=lower.intersect(upper);
 const pos: [number,number,number]=side==='left'?[-2,p.depth/2-4,p.height-1]:side==='right'?[p.width-3,p.depth/2-4,p.height-1]:side==='front'?[p.width/2-4,-2,p.height-1]:[p.width/2-4,p.depth-3,p.height-1];
 const dims: [number,number,number]=side==='left'||side==='right'?[5,8,4]:[8,5,4];
 const probe=wasm.Manifold.cube(dims).translate(pos),blocked=lower.intersect(probe);
 try{assert.ok(Math.abs(collision.volume())<.001);assert.ok(Math.abs(blocked.volume())<.001,'collar must leave cutout open');}finally{blocked.delete();probe.delete();collision.delete();upper.delete();lower.delete();}
});

test('distance from divider measures both external inside faces',()=>{
 const p=organizerTemplate('rounded','flat'),wall=resolveWalls(p)[4];
 const distances=dividerOuterDistances(p,wall)!;
 assert.ok(Math.abs(distances[0]+distances[1]+wall.thickness-(p.width-2*p.wallThickness))<.001);
 assert.ok(Math.abs(distances[0]-(wall.x-p.wallThickness))<.001);
});

test('perpendicular dividers measure depth correctly',()=>{
 let p=defaultProject();p.width=140;p.depth=100;p=splitCell(p,'root','y');
 const wall=resolveWalls(p)[4],distances=dividerOuterDistances(p,wall)!;
 assert.ok(Math.abs(distances[0]-(wall.y-p.wallThickness))<.001);
 assert.ok(Math.abs(distances[1]-(p.depth-p.wallThickness-wall.y-wall.thickness))<.001);
});

test('several exterior cutouts can be used together',async()=>{
 const p=defaultProject();p.width=160;p.depth=120;
 p.cutouts={front:{shape:'round',width:.3,depth:10,position:.5},right:{shape:'smooth',width:.3,depth:8,position:.5}};
 const parts=await buildKit(setLevelCount(p,2));assert.equal(parts.length,2);
});
