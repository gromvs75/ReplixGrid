import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject} from '../src/model.js';
import {defaultShell} from '../src/shell.js';
import {buildShell} from '../src/kernel.js';
import {footprintContour} from '../src/footprint.js';
import {decodeSTL} from '../src/stl.js';
for(const pattern of ['petals','waves','diamonds','honeycomb'] as const)test(`${pattern}: exported openings cover rounded corners and upper wall`,async()=>{
 const p=defaultProject();p.width=180;p.depth=90;p.cornerRadius=20;p.heights={front:22,back:90};p.transitions=['left','right'];p.transitionStyles={left:'wavy',right:'wavy'};p.shell=defaultShell(pattern);
 const built=await buildShell(p),wasm=await Module();wasm.setup();const owned:{delete():void}[]=[];
 const keep=<T extends {delete():void}>(v:T):T=>{owned.push(v);return v;};
 try{
  const triangles=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(Array.from({length:triangles.length*3},(_,i)=>i))});mesh.merge();
  const shell=keep(keep(new wasm.Manifold(mesh)).translate(built.position));
  const openAt=(x:number,y:number,z:number)=>{const cube=wasm.Manifold.cube([.12,.12,.12]),probe=cube.translate([x-.06,y-.06,z-.06]),overlap=shell.intersect(probe);const empty=overlap.volume()<1e-7;overlap.delete();probe.delete();cube.delete();return empty;};
  let corner=false,upper=false;
  for(let angle=15;angle<=75&&!corner;angle+=5)for(let z=10;z<=75&&!corner;z+=2){const a=angle*Math.PI/180;corner=openAt(160+21.3*Math.cos(a),70+21.3*Math.sin(a),z);}
  for(let x=30;x<150&&!upper;x+=2)for(let z=77;z<=86&&!upper;z+=1)upper=openAt(x,91.3,z);
  const seam=footprintContour(p,p.shell.gap+p.shell.thickness/2)[0];
 let seamOpen=false;for(let z=5;z<18&&!seamOpen;z+=.25)seamOpen=openAt(seam[0],seam[1],z);
 assert.ok(seamOpen,'perimeter closure must contain actual through-holes, not a blank stripe');
 assert.ok(corner,'rounded corner must contain actual through-holes');assert.ok(upper,'pattern must reach the upper region of the tall wall');
 }finally{owned.reverse().forEach(v=>v.delete());}
});
for(const pattern of ['petals','waves','diamonds','honeycomb'] as const)test(`${pattern}: leaned shell retains openings and horizontal bottom rim`,async()=>{
 const p=defaultProject();p.width=120;p.depth=70;p.cornerRadius=10;p.tilt=25;p.shell=defaultShell(pattern);
 const built=await buildShell(p),wasm=await Module();wasm.setup();const owned:{delete():void}[]=[];
 const keep=<T extends {delete():void}>(v:T):T=>{owned.push(v);return v;};
 try{
  const triangles=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(Array.from({length:triangles.length*3},(_,i)=>i))});mesh.merge();
  const shell=keep(keep(new wasm.Manifold(mesh)).translate(built.position));
  const lean=-Math.tan(25*Math.PI/180);
  const probeAt=(x:number,worldZ:number)=>{
   const point=[x+worldZ*lean,-p.shell!.gap-p.shell!.thickness/2,worldZ];
   const cube=keep(wasm.Manifold.cube([.1,.1,.1])),probe=keep(cube.translate(point.map(v=>v-.05) as [number,number,number]));
   return keep(shell.intersect(probe)).volume();
  };
  let open=false,solid=false;
  for(let x=70;x<=100;x+=2)for(let z=5;z<=18;z+=2){const volume=probeAt(x,z);open ||= volume<1e-7;solid ||= volume>.0008;}
  assert.ok(open,'leaned wall needs actual holes above its bottom rim');
  assert.ok(solid,'pattern must retain connected ribs');
  assert.ok(probeAt(80,1)>.0008,'flat bottom rim must remain solid');
  assert.equal(built.inspection.bounds.min[2],0);
 }finally{owned.reverse().forEach(v=>v.delete());}
});
