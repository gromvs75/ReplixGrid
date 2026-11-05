import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,type Project} from '../src/model.js';
import {buildOrganizer} from '../src/kernel.js';
import {decodeSTL} from '../src/stl.js';
import {defaultSvgPattern,validateSvgAsset,type SvgAsset} from '../src/svgPattern.js';
import {parseProject} from '../src/editor.js';
import {captureStyle,parseStyle,previewStyle} from '../src/visualStyles.js';
const asset:SvgAsset={version:1,name:'Frame',aspect:1,shapes:[[[[0,0],[1,0],[1,1],[0,1]],[[.3,.3],[.3,.7],[.7,.7],[.7,.3]]]]};
const make=(patch:Partial<Project>={}):Project=>({...defaultProject(),width:60,depth:45,height:30,...patch,relief:{pattern:'ribs',spacing:8,depth:1,svg:{...defaultSvgPattern(asset),width:15,mode:'repeat',sides:['front','back','left','right']}}});
for(const [name,patch] of Object.entries({flat:{},rounded:{cornerRadius:8},capsule:{cornerRadius:22.5},oval:{footprint:'oval'},chamfer:{cornerRadius:8,cornerStyle:'chamfer'},tilt:{cornerRadius:8,tilt:20},cutout:{cornerRadius:8,cutouts:{front:{shape:'smooth',width:.5,depth:12,position:.5}}},slope:{cornerRadius:8,heights:{left:20,right:40},transitions:['front','back'],topEdge:{style:'chamfer',size:.6}}} as Record<string,Partial<Project>>))test(`SVG relief ${name}: closed export retains the original core`,async()=>{
 const p=make(patch),plain=await buildOrganizer({...p,relief:undefined},false),raised=await buildOrganizer(p,false);
 assert.ok(raised.inspection.volume>plain.inspection.volume);
 const w=await Module();w.setup();const solids:import('manifold-3d').Manifold[]=[];const keep=(m:import('manifold-3d').Manifold)=>{solids.push(m);return m;};
 const solid=(part:typeof plain)=>{const faces=decodeSTL(part.stl),mesh=new w.Mesh({numProp:3,vertProperties:new Float32Array(faces.flat(2)),triVerts:new Uint32Array(faces.flat().map((_,i)=>i))});mesh.merge();return keep(keep(new w.Manifold(mesh)).translate(part.position));};
 try{const a=solid(plain),b=solid(raised),missing=keep(a.subtract(b));assert.ok(Math.abs(missing.volume())<.02,`lost core ${missing.volume()}`);}finally{solids.forEach(s=>s.delete());}
});
test('SVG is embedded in project and shared style snapshots',()=>{
 const p=make(),loaded=parseProject(JSON.stringify(p));assert.deepEqual(loaded.relief,p.relief);
 const style=parseStyle(captureStyle(p)),next=previewStyle({...defaultProject(),width:130},style).project;
 assert.deepEqual(next.relief,p.relief);assert.equal(next.width,130);next.relief!.svg!.asset.name='changed';assert.equal(p.relief!.svg!.asset.name,'Frame');
});
test('SVG validation rejects corrupt and excessive input before building',()=>{
 for(const bad of [{...asset,aspect:NaN},{...asset,shapes:[]},{...asset,shapes:[[[[Infinity,0],[0,1],[1,0]]]]}])assert.throws(()=>validateSvgAsset(bad as SvgAsset));
 const p=make();p.relief!.svg!.width=0;assert.throws(()=>parseProject(JSON.stringify(p)));
});
test('SVG off the wall produces an actionable error',async()=>{const p=make();p.relief!.svg!.mode='single';p.relief!.svg!.offsetY=200;await assert.rejects(buildOrganizer(p),/за пределами/);});
test('single SVG retains its hole and follows only the selected wall',async()=>{
 const p=make();p.relief!.svg={...defaultSvgPattern(asset),width:12};
 const built=await buildOrganizer(p,false),points=decodeSTL(built.stl).flat();
 assert.ok(points.some(([x,y])=>y<-.9&&x>20&&x<40));assert.ok(points.every(([x,y])=>x>=0&&x<=60&&y<=45));
 const w=await Module();w.setup();const mesh=new w.Mesh({numProp:3,vertProperties:new Float32Array(points.flat()),triVerts:new Uint32Array(points.map((_,i)=>i))});mesh.merge();
 const solid=new w.Manifold(mesh),cube=w.Manifold.cube([1,.5,1]),probe=cube.translate([29.5,-.8,15]),hit=solid.intersect(probe);
 try{assert.ok(Math.abs(hit.volume())<1e-6,'the SVG hole must stay open above the intact wall');}finally{[hit,probe,cube,solid].forEach(x=>x.delete());}
});
test('repeat complexity limit produces an actionable error',async()=>{const p=make({width:400,depth:400,height:180});p.relief!.svg!.width=4;p.relief!.svg!.gap=0;await assert.rejects(buildOrganizer(p),/повторений SVG/);});
for(const rotation of [0,25])test(`small repeated SVGs stay whole at edges and cutouts (${rotation}°)`,async()=>{
 const p=make({cornerRadius:0,cutouts:{front:{shape:'smooth',width:.5,depth:12,position:.5}}});
 p.relief!.svg!.width=5;p.relief!.svg!.rotation=rotation;
 const w=await Module();w.setup();
 const {applySvgRelief}=await import('../src/svgRelief.js');
 const solids:import('manifold-3d').Manifold[]=[];
 const keep=(m:import('manifold-3d').Manifold)=>{solids.push(m);return m;};
 try{
  const cube=keep(w.Manifold.cube([1,1,1]));
  const relief=applySvgRelief(w,p,keep(cube.subtract(cube)),keep);
  const motifs=relief.decompose();solids.push(...motifs);
  assert.ok(motifs.length>10,`a small repeat must still populate the walls: ${motifs.length}, ${relief.status()}, ${relief.volume()}`);
  const completeVolume=25*(1-.4*.4)*1.15;
  for(const motif of motifs)assert.ok(Math.abs(motif.volume()-completeVolume)<completeVolume*.04,`partial motif: ${motif.volume()} instead of ${completeVolume}`);
 }finally{solids.forEach(s=>s.delete());}
});
