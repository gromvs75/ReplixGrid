import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject} from '../src/model.js';
import {defaultShell} from '../src/shell.js';
import {buildPrintPieces} from '../src/assemblyKernel.js';
import {splitPlan} from '../src/splitting.js';
import {decodeSTL} from '../src/stl.js';

for(const axis of ['x','y'] as const)test(`both shell socket cuts pass through the wall: ${axis}`,async()=>{
 const p=defaultProject();p.width=axis==='x'?180:90;p.depth=axis==='y'?180:90;p.height=36;p.cornerRadius=12;p.wallThickness=5;p.floorThickness=3;p.shell=defaultShell('diamonds');p.cutouts={[axis==='x'?'left':'front']:{shape:'round',width:.5,depth:10,position:.5}};p.printing={parts:2,bedWidth:270,bedDepth:270,bedHeight:270};
 const plan=splitPlan(p),pieces=await buildPrintPieces(p,'shell'),part=pieces.find(q=>q.section===1)!;
 const wasm=await Module();wasm.setup();const tris=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(tris.flat().map((_,i)=>i))});mesh.merge();const source=new wasm.Manifold(mesh),body=source.translate(part.position),owned:{delete():void}[]=[source,body];
 try{const cross=axis==='x'?p.depth:p.width;
  for(const side of [-2.1,cross+.5])for(const [z,shouldBeSolid] of [[5.5,false],[10.5,true]] as const){
   let probe=wasm.Manifold.cube([6,1.6,1]).translate([plan.cuts[0]+2,side,z]);owned.push(probe);if(axis==='y'){probe=probe.mirror([1,-1,0]);owned.push(probe);}
   const intersection=body.intersect(probe);owned.push(intersection);const volume=intersection.volume();
   assert.ok(shouldBeSolid?volume>8:Math.abs(volume)<.0001,`side ${side}, z ${z}, volume ${volume}`);
  }
 }finally{owned.reverse().forEach(m=>m.delete());}
});
