// Hidden sliding attachment experiment. No changes to production geometry.
import {mkdir,writeFile} from 'node:fs/promises';
import Module,{type Manifold} from 'manifold-3d';
import {encodeSTL,decodeSTL,inspectSurface,removeCollapsedFaces,weldNearVertices,type Triangle,type Point} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
const w=await Module();w.setup();const owned:Manifold[]=[];
const keep=(s:Manifold)=>{owned.push(s);return s;};
const box=(s:number[],p:number[])=>keep(w.Manifold.cube(s).translate(p));
const dir='public/guides/slide-v3';await mkdir(dir,{recursive:true});
try{
 // Wall front Y=0, Z up. Heads slide down 4 mm from the loading openings.
 let wall=keep(box([46,3.8,34],[0,0,0]).add(box([46,14,2],[0,0,0])));
 const cuts:Manifold[]=[];
 for(const x of [5,41]){
  cuts.push(box([2.7,.9,9],[x-1.35,-.1,16.8]));
  cuts.push(box([4.1,1.5,9],[x-2.05,.7,16.8]));
  cuts.push(box([4.6,2.4,5],[x-2.3,-.1,21]));
 }
 wall=keep(wall.subtract(keep(w.Manifold.union(cuts))));
 let panel=box([46,1.6,30],[0,-1.9,2]);
 // Real perforation, with uninterrupted 8 mm side rails hiding the mounts.
 const holes:Manifold[]=[];
 for(let row=0;row<4;row++)for(let col=0;col<4;col++){
  const x=12+col*6+(row%2)*1.5,z=8+row*5;
  const s=w.CrossSection.circle(2.3,6);
  try{holes.push(keep(s.extrude(3).rotate([90,0,0]).translate([x,.5,z])));}finally{s.delete();}
 }
 panel=keep(panel.subtract(keep(w.Manifold.union(holes))));
 for(const x of [5,41]){
  const neck=box([2.6,1.5,2.4],[x-1.3,-.4,17]);
  // 45-degree enlargement from neck to head, printable with the face on the bed.
  const sec=new w.CrossSection([[[x-1.3,.9],[x+1.3,.9],[x+2,1.6],[x+2,1.9],[x-2,1.9],[x-2,1.6]]]);
  try{const head=keep(sec.extrude(2.4).translate([0,0,17]));panel=keep(w.Manifold.union([panel,neck,head]));}finally{sec.delete();}
 }
 // Assembly, entry, and entire slide path must be clear. Side rails must retain heads.
 for(let shift=0;shift<=4;shift+=.1){const moved=keep(panel.translate([0,0,shift]));if(keep(wall.intersect(moved)).volume()>1e-4)throw new Error(`Collision on slide ${shift}`);}
 for(let pull=0;pull<=3;pull+=.1){const moved=keep(panel.translate([0,-pull,4]));if(keep(wall.intersect(moved)).volume()>1e-4)throw new Error(`Collision on entry ${pull}`);}
 const retention=keep(wall.intersect(keep(panel.translate([0,-1,0])))).volume();
 if(retention<.1)throw new Error('No pull-off retention');
 const printed=keep(panel.rotate([90,0,0]).translate([0,32,1.9]));
 const objects=[wall,printed].map((body,i)=>{
  const parts=body.decompose();const count=parts.length;parts.forEach(s=>s.delete());
  if(body.status()!=='NoError'||count!==1)throw new Error('Invalid part');
  const mesh=keep(keep(body.asOriginal()).simplify(.0001)).getMesh(),tris:Triangle[]=[];
  for(let k=0;k<mesh.triVerts.length;k+=3)tris.push([0,1,2].map(j=>{const a=mesh.triVerts[k+j]*mesh.numProp;return Array.from(mesh.vertProperties.slice(a,a+3)) as Point;}) as Triangle);
  const stl=encodeSTL(removeCollapsedFaces(weldNearVertices(tris,.000001)));return {name:i?'B-pattern-panel-face-down':'A-wall-upright',color:i?'#E66A25':'#DDDDDD',stl,inspection:inspectSurface(decodeSTL(stl))};
 });
 for(const o of objects)await writeFile(`${dir}/${o.name}.stl`,new Uint8Array(o.stl));
 await writeFile(`${dir}/ReplixGrid-slide-v3-test.3mf`,new Uint8Array(formatExport(objects,'3mf').data));
 const report={experimental:true,slide:4,wall:3.8,backing:1.6,positiveAntiLiftLatch:false,clearancePerSide:.05,retention,parts:objects.map(({name,inspection})=>({name,inspection}))};
 await writeFile(`${dir}/inspection.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{owned.reverse().forEach(s=>s.delete());}
