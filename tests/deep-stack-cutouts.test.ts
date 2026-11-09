import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,type Project} from '../src/model.js';
import {setLevelCount,tierElevation,switchLevel,lidPlateThickness,levelProject} from '../src/accessories.js';
import {buildKit,type KitPart} from '../src/accessoryKernel.js';
import {decodeSTL,inspectSurface,type Point,type Triangle} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';

function unzip(data:ArrayBuffer){
 const view=new DataView(data),files=new Map<string,ArrayBuffer>();let at=0;
 while(view.getUint32(at,true)===0x04034b50){
  assert.equal(view.getUint16(at+8,true),0);
  const size=view.getUint32(at+18,true),n=view.getUint16(at+26,true),extra=view.getUint16(at+28,true),start=at+30+n+extra;
  files.set(new TextDecoder().decode(data.slice(at+30,at+30+n)),data.slice(start,start+size));at=start+size;
 }return files;
}
function checkExports(parts:KitPart[]){
 const stls=unzip(formatExport(parts,'stl').data);assert.equal(stls.size,parts.length);
 [...stls.values()].forEach((data,i)=>assert.equal(inspectSurface(decodeSTL(data)).volume,parts[i].inspection.volume));
 const xml=new TextDecoder().decode(unzip(formatExport(parts,'3mf').data).get('3D/3dmodel.model'));
 const objects=[...xml.matchAll(/<object\b[^>]*><mesh>([\s\S]*?)<\/mesh><\/object>/g)];assert.equal(objects.length,parts.length);
 objects.forEach((m,i)=>{
  const vertices=[...m[1].matchAll(/<vertex x="([^"]+)" y="([^"]+)" z="([^"]+)"\/>/g)].map(v=>v.slice(1).map(Number) as Point);
  const tris=[...m[1].matchAll(/<triangle v1="(\d+)" v2="(\d+)" v3="(\d+)"\/>/g)].map(t=>t.slice(1).map(v=>vertices[Number(v)]) as Triangle);
  assert.equal(inspectSurface(tris).volume,parts[i].inspection.volume);
 });
 const obj=new TextDecoder().decode(unzip(formatExport(parts,'obj').data).get('organizer.obj'));
 const vertices:Point[]=[],objectsOBJ:Triangle[][]=[];
 for(const line of obj.split('\n')){
  if(line.startsWith('o '))objectsOBJ.push([]);
  if(line.startsWith('v '))vertices.push(line.slice(2).split(' ').map(Number) as Point);
  if(line.startsWith('f '))objectsOBJ.at(-1)!.push(line.slice(2).split(' ').map(v=>vertices[Number(v)-1]) as Triangle);
 }
 assert.equal(objectsOBJ.length,parts.length);
 objectsOBJ.forEach((tris,i)=>assert.ok(Math.abs(inspectSurface(tris).volume-parts[i].inspection.volume)<parts[i].inspection.volume*1e-8));
}
let modulePromise:ReturnType<typeof Module>;
for(const [di,[width,depth,height]] of [[6.68,5.58,8.71],[9.5,9.5,10],[13.27,9.63,18.37],[53.17,44.83,60.13]].entries())for(const form of ['square','rounded','chamfered'])for(const style of ['round','chamfer'] as const)for(const shape of ['round','smooth','square'] as const){
 test(`deep assembled cutouts: ${width}×${depth} ${form}/${style}/${shape}, shell + lid + tiers`,async()=>{
  const wallThickness=di===0?1.6:2,r=form==='square'?0:.2;
  const cutWidth=Math.min(.45,(Math.min(width,depth)-2*(r+wallThickness+.25))/(Math.min(width,depth)*.9)*.8);
  let p:Project={...defaultProject(),width,depth,height,wallThickness,floorThickness:1.2,cornerRadius:r,cornerStyle:form==='chamfered'?'chamfer':'round',topEdge:{style,size:.35},cutouts:{front:{shape,width:cutWidth,depth:height*1.2,position:.5},left:{shape,width:cutWidth,depth:height*.95,position:.5}},shell:{pattern:shape==='round'?'petals':shape==='smooth'?'cellular':'diamonds',size:8.13,gap:.2,thickness:1.2,border:2.13}};
  const count=style==='round'?3:2;
  p=setLevelCount(p,count);p.stack!.gap=di===0?.2:.5;
  p.lid=true;p.lidDesign={fit:di>0&&style==='round'?'inset':'outer',pattern:'smooth',rimHeight:2,handle:'none',olive:true,motif:'olive',raised:true};
  const parts=await buildKit(p);assert.equal(parts.filter(v=>v.kind==='organizer').length,count);assert.equal(parts.filter(v=>v.kind==='shell').length,count);assert.equal(parts.filter(v=>v.kind==='lid').length,2);
  checkExports(parts);
  await checkAssembly(p,parts);
  if(di===0&&form==='rounded'&&shape==='square'){
   const switched=await buildKit(switchLevel(p,count-1));assert.deepEqual(switched.map(v=>[v.name,v.position,v.inspection.volume]),parts.map(v=>[v.name,v.position,v.inspection.volume]));
  }
 });
}

async function checkAssembly(p:Project,parts:KitPart[]){
  const w=await(modulePromise??=Module());w.setup();
  const bodies=parts.map(part=>{
   const t=decodeSTL(part.stl),mesh=new w.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();let body=new w.Manifold(mesh);
   if(part.kind==='lid'&&p.lidDesign!.fit!=='inset'){const oriented=body.rotate([180,0,0]).translate([0,part.inspection.bounds.max[1],0]);body.delete();body=oriented;}
   const position:Point=[...part.position];if(part.kind==='lid'&&p.lidDesign!.fit!=='inset')position[2]-=4.5-lidPlateThickness(p);
   const placed=body.translate(position);body.delete();assert.equal(placed.status(),'NoError');return placed;
  });
  try{
   for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){
    const hit=bodies[i].intersect(bodies[j]);try{assert.ok(Math.abs(hit.volume())<.005,`${parts[i].name}/${parts[j].name} overlap ${hit.volume()}`);}finally{hit.delete();}
   }
   for(let level=0;level<(p.stack?.levels.length??1);level++){
    const lp=levelProject(p,level),{width,height}=lp,cutWidth=lp.cutouts!.front.width;
    const z=tierElevation(p,level),cutTop=Math.max(lp.floorThickness+.8,height-lp.cutouts!.front.depth*Math.sqrt(1-.05**2));
    const probe=w.Manifold.cube([width*.9*cutWidth*.04,lp.wallThickness+3,height-cutTop-.4]).translate([width/2-width*.9*cutWidth*.02,-2,cutTop+.2+z]);
    try{for(let i=0;i<parts.length;i++)if(parts[i].level===level&&(parts[i].kind==='organizer'||parts[i].kind==='shell')){
     const hit=bodies[i].intersect(probe);try{assert.ok(Math.abs(hit.volume())<.001,`${parts[i].name} refills deep notch: ${hit.volume()}`);}finally{hit.delete();}
    }}finally{probe.delete();}
   }
  }finally{bodies.forEach(b=>b.delete());}
}

for(const pattern of ['petals','honeycomb','diamonds','waves','cubes','triangles','slots','cellular'] as const)test(`five tiers with different heights, deep cutouts, ${pattern} sleeve and lid`,async()=>{
 const capsule=pattern==='petals'||pattern==='waves';
 let p:Project={...defaultProject(),width:capsule?23.27:8.33,depth:capsule?9.63:7.17,height:12.37,wallThickness:2,floorThickness:1.2,cornerRadius:capsule?4.815:.25,
  topEdge:{style:'round',size:.35},cutouts:{front:{shape:'square',width:.2,depth:30,position:.5},back:{shape:'smooth',width:.2,depth:30,position:.5}},
  shell:{pattern,gap:.2,thickness:1.2,size:7.37,border:2.13}};
 p=setLevelCount(p,5);p=switchLevel(p,2);p.height=17.13;p=switchLevel(p,0);
 p.lid=true;p.lidDesign={fit:'outer',pattern:'lines',rimHeight:2.37,rimPattern:'rings',handle:'none',patternSpacing:4.13,patternDepth:.43};
 const parts=await buildKit(p);assert.equal(parts.filter(v=>v.kind==='organizer').length,5);assert.equal(parts.filter(v=>v.kind==='shell').length,5);
 checkExports(parts);await checkAssembly(p,parts);
 const switched=await buildKit(switchLevel(p,4));assert.deepEqual(switched.map(v=>[v.name,v.position,v.inspection.volume]),parts.map(v=>[v.name,v.position,v.inspection.volume]));
});
