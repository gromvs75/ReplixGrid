import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,resolveWalls} from '../src/model.js';
import {defaultShell,topAt} from '../src/shell.js';
import {buildShell} from '../src/kernel.js';
import {decodeSTL} from '../src/stl.js';
for(const shape of ['round','smooth','square'] as const)for(const pattern of ['honeycomb','diamonds','waves','petals','cubes','triangles','slots','cellular'] as const){
 test(`${shape}/${pattern}: exported cutout has a continuous constant-width rim`,async()=>{
  const p=defaultProject();p.width=100;p.depth=60;p.height=60;
  p.cutouts={front:{shape,width:.7,depth:40,position:.5}};
  p.shell={...defaultShell(pattern),thickness:1,size:9};
  const built=await buildShell(p),wasm=await Module();wasm.setup();
  const tris=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(Array.from({length:tris.length*3},(_,i)=>i))});mesh.merge();
  const local=new wasm.Manifold(mesh),shell=local.translate(built.position);local.delete();
  const w=resolveWalls(p)[0];let checked=0;
  try{
   // Probe along the inward NORMAL, including steep shoulders where a vertical
   // height subtraction left the rim almost zero-width.
   for(let x=20;x<=80;x+=1){
    const h=topAt(w,x),slope=(topAt(w,x+.05)-topAt(w,x-.05))/.1;
    const norm=Math.hypot(1,slope);
    for(const distance of [1,2,2.6]){
     const px=x+distance*slope/norm,pz=h-distance/norm;
     const cube=wasm.Manifold.cube([.06,.06,.06]);
     const probe=cube.translate([px-.03,-1-.03,pz-.03]),overlap=shell.intersect(probe);
     try{assert.ok(overlap.volume()>.00019,`rim missing at x=${x}, distance=${distance}`);checked++;}
     finally{overlap.delete();probe.delete();cube.delete();}
    }
   }
   assert.ok(checked>100);
  }finally{shell.delete();}
 });
}
