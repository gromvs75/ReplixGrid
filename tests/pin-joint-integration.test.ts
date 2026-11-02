import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject} from '../src/model.js';
import {buildPrintPieces,buildJointPins,jointPinLocations} from '../src/assemblyKernel.js';
import {splitPlan} from '../src/splitting.js';
import {decodeSTL} from '../src/stl.js';

for(const axis of ['x','y'] as const)for(const count of [2,3] as const)test(`glued pin joint ${axis} ${count} sections: fitted floor and pins`,async()=>{
 const p=defaultProject();p.width=axis==='x'?360:80;p.depth=axis==='y'?360:80;p.height=25;p.wallThickness=5;p.floorThickness=3;p.cornerRadius=6;p.printing={parts:count,bedWidth:270,bedDepth:270,bedHeight:270};
 const plan=splitPlan(p);assert.equal(plan.axis,axis);
 const parts=await buildPrintPieces(p),pins=await buildJointPins(p);
 assert.equal(parts.length,count);assert.equal(pins.length,plan.cuts.reduce((sum,_,i)=>sum+jointPinLocations(p,plan,i).length,0));
 const wasm=await Module();wasm.setup();const owned:{delete():void}[]=[];
 const load=(stl:ArrayBuffer,pos:number[])=>{const tris=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(tris.flat().map((_,i)=>i))});mesh.merge();const m=new wasm.Manifold(mesh);owned.push(m);const result=m.translate(pos as [number,number,number]);owned.push(result);return result;};
 try{
  const solids=parts.map(part=>load(part.stl,part.position));
  for(let i=0;i<solids.length;i++)for(let j=i+1;j<solids.length;j++){const overlap=solids[i].intersect(solids[j]);owned.push(overlap);assert.ok(Math.abs(overlap.volume())<.001,`${i}/${j}: ${overlap.volume()}`);}
  const dimensions=load(pins[0].stl,[0,0,0]).boundingBox();assert.ok(Math.abs(dimensions.max[0]-3.2)<.001);assert.ok(Math.abs(dimensions.max[2]-8)<.001);
  const cylinder=wasm.Manifold.cylinder(8,1.6,1.6,48);owned.push(cylinder);
  for(let seam=0;seam<plan.cuts.length;seam++)for(const {side,z} of jointPinLocations(p,plan,seam)){
   let pin=cylinder.rotate([0,90,0]);owned.push(pin);pin=pin.translate([plan.cuts[seam]-4,side,z]);owned.push(pin);if(axis==='y'){pin=pin.mirror([1,-1,0]);owned.push(pin);}
   for(const solid of solids){const overlap=pin.intersect(solid);owned.push(overlap);assert.ok(Math.abs(overlap.volume())<.001,`pin intersects: ${overlap.volume()}`);}
  }
 }finally{owned.reverse().forEach(m=>m.delete());}
});
