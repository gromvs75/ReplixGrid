import Module from 'manifold-3d';
import {footprintContour} from '../src/footprint.js';
import {defaultSvgPattern} from '../src/svgPattern.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Project} from '../src/model.js';
import {setLevelCount} from '../src/accessories.js';
import {buildKit} from '../src/accessoryKernel.js';
import {decodeSTL,inspectSurface} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
import {isolatedLidLayout} from '../src/lidPreview.js';
const wasm=Module();
const cases=[
 {width:6.68,depth:5.58,wallThickness:.8},
 {width:8,depth:8,wallThickness:1},
 {width:9.5,depth:9.5,wallThickness:1},
 {width:13.27,depth:9.63,wallThickness:2},
 {width:50.13,depth:17.37,wallThickness:2},
 {width:17.37,depth:50.13,wallThickness:2},
];
for(const handle of ['round','bar'] as const)for(const handleEdge of ['none','chamfer','round'] as const)for(const fit of ['outer','inset'] as const)for(const [i,c] of cases.entries())test(`handle ${handle}/${handleEdge}/${fit} ${c.width} × ${c.depth}`,async()=>{
 const p=setLevelCount({...defaultProject(),...c,...(fit==='inset'?{wallThickness:2,depth:Math.max(6.18,c.depth)}:{}),height:24.13,floorThickness:.8,cornerRadius:.2,cutouts:{front:{shape:'smooth',width:.25,depth:3.17,position:.5}}},i%2?3:2);
 p.lid=true;p.lidDesign={pattern:i%3===0?'lines':'waffle',patternSpacing:7.13,patternDepth:.63,rimHeight:2.37,handle,handleEdge,fit,handleWidth:i%2?40:6.73,handleHeight:i%2?3:7.37,edgeSize:i%2?4:1.37,...(i%3===2?{olive:true,motif:'fern',raised:true,cutwork:true}: {})};
 const parts=await buildKit(p),h=parts.find(p=>p.kind==='lid-handle')!;
 assert.ok(h,'handle exists');
 for(const part of parts){assert.ok(inspectSurface(decodeSTL(part.stl)).volume>0);assert.ok(part.position.every(Number.isFinite));}
 const b=h.inspection.bounds,w=b.max[0]-b.min[0],d=b.max[1]-b.min[1];
 if(handle==='round'){
  assert.ok(Math.abs(w-d)<1e-4,'cylindrical handle remains circular');
  const top=decodeSTL(h.stl).flat().filter(v=>Math.abs(v[2]-b.max[2])<1e-5);
  const span=(axis:number)=>Math.max(...top.map(v=>v[axis]))-Math.min(...top.map(v=>v[axis]));
  assert.ok(Math.abs(span(0)-span(1))<1e-4,'rounded or chamfered top remains circular');
 }
 assert.ok(w<c.width&&d<c.depth,'handle fits the lid');
 assert.ok(Math.abs(b.max[2]-b.min[2]-p.lidDesign.handleHeight!)<1e-4,'requested height');
 assert.ok(isolatedLidLayout(parts,fit==='inset'&&!!p.lidDesign.olive)?.size);
 for(const f of ['stl','3mf','obj'] as const)assert.ok(formatExport(parts,f).data.byteLength>100);
});

for(const footprint of ['circle','oval','capsule'] as const)for(const handle of ['round','bar'] as const)for(const handleEdge of ['none','chamfer','round'] as const)for(const fit of ['outer','inset'] as const)test(`${footprint} lid handle ${handle}/${handleEdge}/${fit} fits its actual contour`,async()=>{
 const p=setLevelCount({...defaultProject(),width:48.13,depth:footprint==='circle'?48.13:16.37,height:24.13,cornerRadius:footprint==='capsule'?8.185:0,footprint:footprint==='capsule'?undefined:footprint},2);
 p.lid=true;p.lidDesign={fit,pattern:'waffle',rimHeight:2.37,handle,handleEdge,handleWidth:40,handleHeight:20,edgeSize:4};
 const parts=await buildKit(p),h=parts.find(p=>p.kind==='lid-handle')!;
 const w=await wasm;w.setup();
 const triangles=decodeSTL(h.stl),bottom=triangles.flat().filter(v=>Math.abs(v[2])<1e-5).map(v=>[v[0]+h.position[0],v[1]+h.position[1]] as [number,number]);
 const base=w.CrossSection.hull([bottom]),face=new w.CrossSection([footprintContour(p,fit==='inset'?-p.wallThickness/2-.35:1.9)]),outside=base.subtract(face);
 try{assert.ok(outside.area()<1e-6,'entire handle base rests on lid');assert.ok(h.inspection.volume>0);for(const f of ['stl','3mf','obj'] as const)assert.ok(formatExport(parts,f).data.byteLength>100);}finally{outside.delete();face.delete();base.delete();}
});

for(const handle of ['round','bar'] as const)for(const handleEdge of ['none','chamfer','round'] as const)for(const svgMode of ['raised','cutout'] as const)test(`SVG ${svgMode} with ${handle}/${handleEdge} handle and tiers`,async()=>{
 const p=setLevelCount({...defaultProject(),width:41.27,depth:25.63,height:24.13,cornerRadius:2.37},3);
 p.lid=true;p.lidDesign={fit:'inset',pattern:'smooth',rimHeight:2.37,handle,handleEdge,handleWidth:6.73,handleHeight:7.37,edgeSize:1.37,svgMode,svg:{...defaultSvgPattern({version:1,name:'Diamond',aspect:1,shapes:[[[[.5,0],[1,.5],[.5,1],[0,.5]]]]}),width:4,mode:'repeat',gap:1.37}};
 const parts=await buildKit(p);
 assert.ok(parts.some(p=>p.kind==='lid-handle'));
 for(const part of parts)assert.ok(inspectSurface(decodeSTL(part.stl)).volume>0);
 for(const f of ['stl','3mf','obj'] as const)assert.ok(formatExport(parts,f).data.byteLength>100);
});
