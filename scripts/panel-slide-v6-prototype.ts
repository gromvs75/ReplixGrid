// Hidden sliding attachment experiment. No changes to production geometry.
import {mkdir,writeFile} from 'node:fs/promises';
import Module,{type Manifold} from 'manifold-3d';
import {encodeSTL,decodeSTL,inspectSurface,removeCollapsedFaces,weldNearVertices,type Triangle,type Point} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
const w=await Module();w.setup();const owned:Manifold[]=[];
const keep=(s:Manifold)=>{owned.push(s);return s;};
const box=(s:number[],p:number[])=>keep(w.Manifold.cube(s).translate(p));
const dir='public/guides/slide-v6';await mkdir(dir,{recursive:true});
try{
 // Wall front Y=0, Z up. Heads slide down 10 mm from the loading openings.
 let wall=keep(box([24,5.6,40],[0,0,0]).add(box([24,16,2],[0,0,0])));
 const cuts:Manifold[]=[];
 for(const x of [12]){
  cuts.push(box([3.1,1.5,16],[x-1.55,-.1,17]));
  cuts.push(box([7.1,2.7,16],[x-3.55,1.3,17]));
  cuts.push(box([7.6,4.2,6],[x-3.8,-.1,27]));
 }
 cuts.push(box([2,1.5,31],[8.45,-.1,3]));
 wall=keep(wall.subtract(keep(w.Manifold.union(cuts))));
 const fixedWall=wall;
 const beam=box([1.2,1.1,21],[9.25,0,2]);
 // Upper ramp guides insertion; lower shoulder blocks upward travel.
 const toothSection=new w.CrossSection([[[10.4,20.45],[10.85,20.45],[10.4,21.5]]]);
 let tooth:Manifold;
 try {tooth=keep(toothSection.extrude(1.1).rotate([90,0,0]).translate([0,1.1,0]));}finally{toothSection.delete();}
 const latch=keep(beam.add(tooth));
 wall=keep(fixedWall.add(latch));
 // Solid face coupon. No slots or moving parts on the decorative face.
 let panel=box([24,2,20],[0,-2.2,2]);
 for(const x of [12]){
  const neck=box([3,2,3],[x-1.5,-.4,17.2]);
  // 45-degree enlargement from neck to head, printable with the face on the bed.
  const sec=new w.CrossSection([[[x-1.5,1.5],[x+1.5,1.5],[x+3.5,3.5],[x+3.5,3.9],[x-3.5,3.9],[x-3.5,3.5]]]);
  try{const head=keep(sec.extrude(3).translate([0,0,17.2]));panel=keep(w.Manifold.union([panel,neck,head]));}finally{sec.delete();}
 }
 // Assembly, entry, and entire slide path must be clear. Side rails must retain heads.
 for(let shift=0;shift<=10;shift+=.1){const moved=keep(panel.translate([0,0,shift]));if(keep(fixedWall.intersect(moved)).volume()>1e-4)throw new Error(`Rigid collision on slide ${shift}`);}
 for(let pull=0;pull<=5;pull+=.1){const moved=keep(panel.translate([0,-pull,10]));if(keep(wall.intersect(moved)).volume()>1e-4)throw new Error(`Collision on entry ${pull}`);}
 if(keep(wall.intersect(panel)).volume()>1e-4)throw new Error('Seated collision');
 const liftBlocked=keep(wall.intersect(keep(panel.translate([0,0,.6])))).volume();
 if(liftBlocked<.01)throw new Error('No lift blocking');
 // Clearance envelope check, NOT an elasticity simulation.
 const releasedLatch=keep(latch.translate([-.45,0,0]));
 for(let shift=0;shift<=10;shift+=.1) {
  if(keep(releasedLatch.intersect(keep(panel.translate([0,0,shift])))).volume()>1e-4)throw new Error('Release path blocked');
 }
 const retention=keep(wall.intersect(keep(panel.translate([0,-1,0])))).volume();
 if(retention<.1)throw new Error('No pull-off retention');
 const printed=keep(panel.rotate([90,0,0]).translate([0,22,2.2]));
 const objects=[wall,printed].map((body,i)=>{
  const parts=body.decompose();const count=parts.length;parts.forEach(s=>s.delete());
  if(body.status()!=='NoError'||count!==1)throw new Error('Invalid part');
  const mesh=keep(keep(body.asOriginal()).simplify(.0001)).getMesh(),tris:Triangle[]=[];
  for(let k=0;k<mesh.triVerts.length;k+=3)tris.push([0,1,2].map(j=>{const a=mesh.triVerts[k+j]*mesh.numProp;return Array.from(mesh.vertProperties.slice(a,a+3)) as Point;}) as Triangle);
  const stl=encodeSTL(removeCollapsedFaces(weldNearVertices(tris,.000001)));return {name:i?'B-solid-panel-face-down':'A-wall-with-latch-upright',color:i?'#E66A25':'#DDDDDD',stl,inspection:inspectSurface(decodeSTL(stl))};
 });
 for(const o of objects)await writeFile(`${dir}/${o.name}.stl`,new Uint8Array(o.stl));
 await writeFile(`${dir}/ReplixGrid-slide-v6-test.3mf`,new Uint8Array(formatExport(objects,'3mf').data));
 const report={experimental:true,slide:10,wall:5.6,retainingLipWidth:2,retainingLipDepth:1.3,headWidth:7,mouthWidth:3.1,backing:1.6,positiveAntiLiftLatch:true,liftBlocked,requiredLateralRelease:.45,elasticitySimulated:false,clearancePerSide:.05,retention,parts:objects.map(({name,inspection})=>({name,inspection}))};
 await writeFile(`${dir}/inspection.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{owned.reverse().forEach(s=>s.delete());}
