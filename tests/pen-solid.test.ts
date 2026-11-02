import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject} from '../src/model.js';
import {buildKit} from '../src/accessoryKernel.js';
import {decodeSTL} from '../src/stl.js';

test('pen insert has one solid body with blind holes that adapt to diameter and size',async()=>{
 const wasm=await Module();wasm.setup();
 const examine=async(width:number,holeDiameter:number)=>{
  const p={...defaultProject(),width,depth:55,height:25,cups:[{cellId:'root',shape:'fitted' as const,height:10,content:'pens' as const,holeDiameter}]};
  const parts=await buildKit(p),part=parts.find(x=>x.kind==='cup')!;
  const triangles=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(triangles.flat().map((_,i)=>i))});mesh.merge();
  const body=new wasm.Manifold(mesh),components=body.decompose(),bottom=body.slice(.6),mid=body.slice(10),nearTop=body.slice(21);
  try{
   assert.equal(components.length,1,'insert remains one connected part');
   assert.equal(bottom.toPolygons().length,1,'holes stop above the closed bottom');
   assert.ok(mid.toPolygons().length>1,'holes are present');
   assert.equal(nearTop.toPolygons().length,mid.toPolygons().length,'holes reach the top');
   const count=mid.toPolygons().length-1,radius=holeDiameter/2;
   const expected=bottom.area()-count*32*radius*radius*Math.sin(2*Math.PI/64);
   assert.ok(Math.abs(mid.area()-expected)<.1,'all material between holes is solid');
   return mid.toPolygons().length-1;
  }finally{components.forEach(v=>v.delete());bottom.delete();mid.delete();nearTop.delete();body.delete();}
 };
 const baseline=await examine(60,10),larger=await examine(90,10),wideHoles=await examine(60,16);
 assert.ok(larger>baseline,'wider insert has more holes');
 assert.ok(wideHoles<baseline,'larger holes reduce their number');
});
