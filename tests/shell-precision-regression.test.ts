import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Project,type Side} from '../src/model.js';
import {buildKit} from '../src/accessoryKernel.js';
import {buildOrganizer} from '../src/kernel.js';
import {setLevelCount,switchLevel} from '../src/accessories.js';
import {decodeSTL,inspectSurface} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';

for(const size of [50,90])test(`petal sleeve, multiple cutouts and fern lid build together at ${size} mm`,async()=>{
 let p:Project={...defaultProject(),width:size,depth:size,height:24,wallThickness:2,floorThickness:2,cornerRadius:3.5,innerCornerRadius:.5,topEdge:{style:'round',size:.5},shell:{pattern:'diamonds',gap:.2,thickness:1.2,size:10,mode:'wrap',border:2}};
 p=setLevelCount(p,2);p=switchLevel(p,1);
 p.shell={...p.shell!,pattern:'petals',size:8};
 p.cutouts={front:{shape:'smooth',width:.5,depth:14.4,position:.5},right:{shape:'smooth',width:16.6/81,depth:5,position:.5},back:{shape:'smooth',width:10.1/81,depth:2,position:.5}};
 p.lid=true;p.lidDesign={pattern:'smooth',rimHeight:2.5,handle:'round',rimPattern:'rings',olive:true,raised:true,motif:'fern',fit:'outer',handleWidth:6,handleEdge:'chamfer'};
 const parts=await buildKit(p);
 assert.equal(parts.filter(x=>x.kind==='organizer').length,2);
 assert.equal(parts.filter(x=>x.kind==='shell').length,2);
 assert.ok(parts.some(x=>x.kind==='lid'));assert.ok(parts.some(x=>x.kind==='lid-handle'));
 for(const part of parts)assert.ok(inspectSurface(decodeSTL(part.stl)).volume>0,part.name);
 assert.ok(formatExport(parts,'3mf').data.byteLength>1000);
});

for(const shape of ['smooth','round','square'] as const)test(`10 mm tray supports a physical ${shape} cutout on every side`,async()=>{
 for(const side of ['front','back','left','right'] as Side[]){
  const p={...defaultProject(),width:10,depth:10,height:10,wallThickness:1,floorThickness:1,cornerRadius:1,cutouts:{[side]:{shape,width:.4,depth:3,position:.5}}};
  const plain=await buildOrganizer({...p,cutouts:undefined}),cut=await buildOrganizer(p);
  assert.ok(cut.inspection.volume<plain.inspection.volume-.1,`${side} must remove material`);
 }
});

for(const [width,depth] of [[13,13],[9.5,9.5],[6.68,5.58]])test(`fractional ${width} × ${depth} tray: cutouts remove material without opening the floor`,async()=>{
 for(const shape of ['smooth','round','square'] as const){
  const p={...defaultProject(),width,depth,height:8,wallThickness:.8,floorThickness:.8,cornerRadius:.5,cutouts:{front:{shape,width:.4,depth:2,position:.5}}};
  const plain=await buildOrganizer({...p,cutouts:undefined}),cut=await buildOrganizer(p);
  assert.ok(cut.inspection.volume<plain.inspection.volume-.05);
  assert.equal(cut.inspection.bounds.min[2],0);
 }
});

test('small tiers use actual corner and wall clearance, not a fixed 8 mm margin',async()=>{
 const p={...defaultProject(),width:10,depth:10,height:10,wallThickness:1,floorThickness:1,cornerRadius:.5,cutouts:{front:{shape:'smooth' as const,width:.4,depth:3,position:.5}}};
 const parts=await buildKit(setLevelCount(p,2));assert.equal(parts.length,2);
 for(const part of parts)assert.ok(inspectSurface(decodeSTL(part.stl)).volume>0);
});
