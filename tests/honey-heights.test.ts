import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {organizerTemplate} from '../src/templates.js';
import {footprintContour,honeyEdgeOwner,honeyCells} from '../src/footprint.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {defaultShell} from '../src/shell.js';
import {decodeSTL} from '../src/stl.js';

test('raising one honey cell leaves neighboring external walls low, including the sleeve',async()=>{
 const wasm=await Module();wasm.setup();
 for(const inherited of [false,true]){
  const p=organizerTemplate('honeycomb','flat');
  p.honeycombHeights=Array(7).fill(inherited?null:30);p.honeycombHeights![1]=120;
  p.shell=defaultShell('waves');
  const owned:{delete():void}[]=[];
  const keep=<T extends {delete():void}>(v:T):T=>{owned.push(v);return v;};
  try{
   for(const shell of [false,true]){
    const built=await (shell?buildShell:buildOrganizer)(p),triangles=decodeSTL(built.stl);
    const mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(Array.from({length:triangles.length*3},(_,i)=>i))});mesh.merge();
    const body=keep(keep(new wasm.Manifold(mesh)).translate(built.position));
    const base=footprintContour(p),contour=footprintContour(p,shell?p.shell!.gap+p.shell!.thickness/2:-p.wallThickness/2);
    for(let i=0;i<base.length;i++){
     const j=(i+1)%base.length,owner=honeyEdgeOwner(p,base[i],base[j]);
     if(owner===1)continue;
     // Sample inside every low external edge, above its top but below the old ramp.
     for(const t of [.25,.5,.75]){
      const x=contour[i][0]*(1-t)+contour[j][0]*t,y=contour[i][1]*(1-t)+contour[j][1]*t;
      const probe=keep(keep(wasm.Manifold.cube([.2,.2,1])).translate([x-.1,y-.1,65]));
      assert.ok(keep(body.intersect(probe)).volume()<1e-6,`raised low edge ${i}, shell=${shell}, inherited=${inherited}`);
     }
    }
    if(!shell){
     // All six walls belonging to the tall cell, including shared walls, remain tall.
     const cell=honeyCells(p)[1];
     for(let i=0;i<6;i++){
      const j=(i+1)%6,x=(cell[i][0]+cell[j][0])/2,y=(cell[i][1]+cell[j][1])/2;
      const probe=keep(keep(wasm.Manifold.cube([.2,.2,1])).translate([x-.1,y-.1,90]));
      assert.ok(keep(body.intersect(probe)).volume()>.01,'tall cell wall missing');
     }
    }
   }
  }finally{owned.reverse().forEach(v=>v.delete());}
 }
});
