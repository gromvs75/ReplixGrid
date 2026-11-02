// Hidden sliding attachment experiment. No changes to production geometry.
import {mkdir,writeFile} from 'node:fs/promises';
import Module,{type Manifold} from 'manifold-3d';
import {encodeSTL,decodeSTL,inspectSurface,removeCollapsedFaces,weldNearVertices,type Triangle,type Point} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
const w=await Module();w.setup();const owned:Manifold[]=[];
const keep=(s:Manifold)=>{owned.push(s);return s;};
const box=(s:number[],p:number[])=>keep(w.Manifold.cube(s).translate(p));
const dir='public/guides/slide-v5';await mkdir(dir,{recursive:true});
try{
 // Wall front Y=0, Z up. Heads slide down 10 mm from the loading openings.
 let wall=keep(box([60,5.6,40],[0,0,0]).add(box([60,16,2],[0,0,0])));
 const cuts:Manifold[]=[];
 for(const x of [8,52]){
  cuts.push(box([3.1,1.5,16],[x-1.55,-.1,17]));
  cuts.push(box([7.1,2.7,16],[x-3.55,1.3,17]));
  cuts.push(box([7.6,4.2,6],[x-3.8,-.1,27]));
 }
 // Extend only the narrow key channel to the top; retain the proven lower rails.
 for(const x of [8,52]) {
  cuts.push(box([3.1,1.4,8],[x-1.55,-.1,32.9]));
  cuts.push(box([4,.35,1.4],[x-2,5.3,28.2]));
 }
 wall=keep(wall.subtract(keep(w.Manifold.union(cuts))));
 let panel=box([60,2,34],[0,-2.2,2]);
 // Real perforation, with uninterrupted 12 mm side rails hiding the mounts.
 const holes:Manifold[]=[];
 for(let row=0;row<4;row++)for(let col=0;col<4;col++){
  const x=20+col*6+(row%2)*1.5,z=8+row*5;
  const s=w.CrossSection.circle(2.3,6);
  try{holes.push(keep(s.extrude(3).rotate([90,0,0]).translate([x,.5,z])));}finally{s.delete();}
 }
 panel=keep(panel.subtract(keep(w.Manifold.union(holes))));
 for(const x of [8,52]){
  const neck=box([3,2,3],[x-1.5,-.4,17.2]);
  // 45-degree enlargement from neck to head, printable with the face on the bed.
  const sec=new w.CrossSection([[[x-1.5,1.5],[x+1.5,1.5],[x+3.5,3.5],[x+3.5,3.9],[x-3.5,3.9],[x-3.5,3.5]]]);
  try{const head=keep(sec.extrude(3).translate([0,0,17.2]));panel=keep(w.Manifold.union([panel,neck,head]));}finally{sec.delete();}
 }
 // Assembly, entry, and entire slide path must be clear. Side rails must retain heads.
 for(let shift=0;shift<=10;shift+=.1){const moved=keep(panel.translate([0,0,shift]));if(keep(wall.intersect(moved)).volume()>1e-4)throw new Error(`Collision on slide ${shift}`);}
 for(let pull=0;pull<=5;pull+=.1){const moved=keep(panel.translate([0,-pull,10]));if(keep(wall.intersect(moved)).volume()>1e-4)throw new Error(`Collision on entry ${pull}`);}
 const retention=keep(wall.intersect(keep(panel.translate([0,-1,0])))).volume();
 if(retention<.1)throw new Error('No pull-off retention');
 // Removable top keys: front tongue blocks head travel, rear spring catches a recess.
 const makeKey=(x:number)=>{
  const tongue=box([2.9,1.1,21],[x-1.45,.1,20.4]);
  const bridge=box([2.9,6.85,1.4],[x-1.45,.1,40.1]);
  const arm=box([2.9,1.2,13.1],[x-1.45,5.75,28.4]);
  const section=new w.CrossSection([[[5.8,29.5],[5.4,29.1],[5.8,28.4]]]);
  let tooth:Manifold;
  try {tooth=keep(section.extrude(2.9).rotate([90,0,0]).rotate([0,0,90]).translate([x-1.45,0,0]));} finally {section.delete();}
  return keep(w.Manifold.union([tongue,bridge,arm,tooth]));
 };
 const keys=[8,52].map(makeKey);
 for(const key of keys){
  if(keep(wall.intersect(key)).volume()>1e-4)throw new Error('Seated key intersects wall');
  if(keep(panel.intersect(key)).volume()>1e-4)throw new Error('Seated key intersects panel');
 }
 // Only the rear spring tooth may touch the wall during insertion.
 for(let i=0;i<keys.length;i++) {
  const rigid=keep(keys[i].subtract(box([4,.5,2],[[8,52][i]-2,5.3,28])));
  for(let shift=0;shift<=24;shift+=.25) {
   const moved=keep(rigid.translate([0,0,shift]));
   if(keep(wall.intersect(moved)).volume()>1e-4 || keep(panel.intersect(moved)).volume()>1e-4)
    throw new Error(`Key path collision ${i} at ${shift}`);
  }
 }
 const liftBlocked=keep(keep(w.Manifold.union(keys)).intersect(keep(panel.translate([0,0,.5])))).volume();
 if(liftBlocked<.1)throw new Error('Keys do not block lifting');
 // Print clips on their broad side: spring flexes within the printed layers.
 const printedKeys=keys.map((key,i)=>keep(key.rotate([0,-90,0]).translate([41.5,0,-([8,52][i]-1.45)])));
 const printed=keep(panel.rotate([90,0,0]).translate([0,36,2.2]));
 const objects=[wall,printed,...printedKeys].map((body,i)=>{
  const parts=body.decompose();const count=parts.length;parts.forEach(s=>s.delete());
  if(body.status()!=='NoError'||count!==1)throw new Error('Invalid part');
  const mesh=keep(keep(body.asOriginal()).simplify(.0001)).getMesh(),tris:Triangle[]=[];
  for(let k=0;k<mesh.triVerts.length;k+=3)tris.push([0,1,2].map(j=>{const a=mesh.triVerts[k+j]*mesh.numProp;return Array.from(mesh.vertProperties.slice(a,a+3)) as Point;}) as Triangle);
  const stl=encodeSTL(removeCollapsedFaces(weldNearVertices(tris,.000001)));return {name:['A-wall-upright','B-pattern-panel-face-down','C-left-lock-side-down','D-right-lock-side-down'][i],color:i?'#E66A25':'#DDDDDD',stl,inspection:inspectSurface(decodeSTL(stl))};
 });
 for(const o of objects)await writeFile(`${dir}/${o.name}.stl`,new Uint8Array(o.stl));
 await writeFile(`${dir}/ReplixGrid-slide-v5-test.3mf`,new Uint8Array(formatExport(objects,'3mf').data));
 await writeFile(`${dir}/ReplixGrid-slide-v5-upgrade.3mf`,new Uint8Array(formatExport(objects.filter((_,i)=>i!==1),'3mf').data));
 const report={experimental:true,slide:10,wall:5.6,retainingLipWidth:2,retainingLipDepth:1.3,headWidth:7,mouthWidth:3.1,backing:1.6,positiveAntiLiftLatch:true,liftBlocked,clearancePerSide:.05,retention,parts:objects.map(({name,inspection})=>({name,inspection}))};
 await writeFile(`${dir}/inspection.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{owned.reverse().forEach(s=>s.delete());}
