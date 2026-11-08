import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Project,type ShellSettings} from '../src/model.js';
import {buildShell} from '../src/kernel.js';
import {buildKit} from '../src/accessoryKernel.js';
import {setLevelCount} from '../src/accessories.js';
import {decodeSTL,inspectSurface} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';

const patterns:ShellSettings['pattern'][]=['honeycomb','diamonds','waves','petals','cubes','triangles','slots','cellular'];
const dimensions=[
 {width:6.68,depth:5.58,height:8.71,cornerRadius:.5},
 {width:13.27,depth:9.63,height:18.37,cornerRadius:.5},
 {width:51.73,depth:47.19,height:27.43,cornerRadius:3.27},
 {width:90,depth:90,height:24,cornerRadius:3.5},
 {width:123.45,depth:67.89,height:39.17,cornerRadius:8.23},
];
async function check(p:Project){
 const built=await buildShell(p),surface=inspectSurface(decodeSTL(built.stl));
 assert.ok(surface.volume>0);
 assert.equal(surface.bounds.min[2],0,'export must sit on the print bed');
 const offset=p.shell!.gap+p.shell!.thickness;
 assert.ok(Math.abs(surface.bounds.max[0]-(p.width+2*offset))<.01,'outer width must survive perforation');
 assert.ok(Math.abs(surface.bounds.max[1]-(p.depth+2*offset))<.01,'outer depth must survive perforation');
}
for(const pattern of patterns){
 for(const c of dimensions)for(const [j,size] of [5,8.13,15.61,23.87].entries())test(`${pattern}: ${c.width} × ${c.depth}, lattice ${size}, ${j?'cutout':'plain rim'}`,async()=>{
  await check({...defaultProject(),...c,wallThickness:.8,floorThickness:.8,
   cutouts:j===0?undefined:{front:{shape:(['smooth','round','square'] as const)[j-1],width:.4,depth:Math.min(4.17,c.height/3),position:.5}},
   shell:{pattern,gap:.2,thickness:1.2,size,border:2}});
 });
 for(const size of [pattern==='cubes'?5:2,24])test(`${pattern}: supported lattice limit ${size} with fractional wall, gap and border`,async()=>{
  await check({...defaultProject(),width:19.73,depth:14.29,height:12.51,wallThickness:.8,floorThickness:.8,cornerRadius:1.23,
   cutouts:{right:{shape:'round',width:.4,depth:3.17,position:.63}},shell:{pattern,gap:.37,thickness:1.07,size,border:2.13}});
 });
 test(`${pattern}: fractional tiered kit retains shell, cutouts and lid in 3MF`,async()=>{
  const p=setLevelCount({...defaultProject(),width:53.17,depth:44.83,height:18.37,wallThickness:2,floorThickness:2,cornerRadius:1.23,
   cutouts:{front:{shape:'smooth',width:.4,depth:4.17,position:.5}},shell:{pattern,gap:.5,thickness:1.2,size:8.13,border:2}},2);
  p.lid=true;p.lidDesign={pattern:'smooth',rimHeight:2.5,handle:'none',olive:true,raised:true,motif:'fern',fit:'outer'};
  const parts=await buildKit(p);
  assert.equal(parts.filter(x=>x.kind==='organizer').length,2);
  assert.equal(parts.filter(x=>x.kind==='shell').length,2);
  assert.ok(parts.some(x=>x.kind==='lid'));
  for(const part of parts)assert.ok(inspectSurface(decodeSTL(part.stl)).volume>0,part.name);
  assert.ok(formatExport(parts,'3mf').data.byteLength>1000);
 });
}

for(const pattern of patterns)test(`${pattern}: large shell with fractional depth, height and pattern settings`,async()=>{
 await check({...defaultProject(),width:400,depth:287.63,height:72.41,cornerRadius:17.37,
  cutouts:{front:{shape:'square',width:.4,depth:16.13,position:.37}},shell:{pattern,gap:.57,thickness:1.37,size:23.87,border:3.17}});
});
