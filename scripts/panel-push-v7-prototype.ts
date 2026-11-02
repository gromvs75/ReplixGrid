// Experimental direct snap coupons: actual 3.2 mm production wall, no local thickening.
import {mkdir,writeFile} from 'node:fs/promises';
import Module,{type Manifold} from 'manifold-3d';
import {encodeSTL,decodeSTL,inspectSurface,removeCollapsedFaces,weldNearVertices,type Triangle,type Point} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
import {PANEL_WALL_MIN} from '../src/panelSettings.js';
const w=await Module();w.setup();const owned:Manifold[]=[];
const keep=(s:Manifold)=>{owned.push(s);return s;};
const box=(s:number[],p:number[])=>keep(w.Manifold.cube(s).translate(p));
const dir='public/guides/push-v7';await mkdir(dir,{recursive:true});
const reports=[];
try {
 for(const [label,tooth] of [['A',.15],['B',.20]] as const){
  let wall=keep(box([32,PANEL_WALL_MIN,24],[0,0,0]).add(box([32,10,2],[0,0,0])));
  let panel=box([32,1.6,20],[0,-2.2,2]);
  const sockets:Manifold[]=[];
  for(const [x,z] of [[8,7],[24,16]]){
   // Narrow entrance, wider blind chamber. Remaining wall = 1.0 mm.
   sockets.push(box([2.1,.85,4.1],[x-1.05,-.1,z-2.05]));
   sockets.push(box([2.6,1.45,4.1],[x-1.3,.75,z-2.05]));
   for(const sign of [-1,1]){
    const points=[[.4,-.7],[1.15,-.7],[1,-.3],[1,.9],[1+tooth,.9],[1+tooth,1.1],[1,2],[.4,2]].map(([a,b])=>[x+sign*a,b]);
    const section=new w.CrossSection([points], 'NonZero');
    try{panel=keep(panel.add(keep(section.extrude(4).translate([0,0,z-2]))));}finally{section.delete();}
   }
  }
  // Four integral contact pads define the seated position and resist rocking.
  for(const x of [0,30])for(const z of [2,20])panel=keep(panel.add(box([2,.7,2],[x,-.7,z])));
  wall=keep(wall.subtract(keep(w.Manifold.union(sockets))));
  const seated=keep(wall.intersect(panel)).volume();
  if(seated>1e-5)throw new Error(`Seated collision ${label}: ${seated}`);
  const retention=keep(wall.intersect(keep(panel.translate([0,-.4,0])))).volume();
  if(retention<.01)throw new Error('No mechanical undercut');
  const printedPanel=keep(panel.rotate([90,0,0]).translate([0,22,2.2]));
  const objects=[wall,printedPanel].map((body,i)=>{
   const components=body.decompose();const count=components.length;components.forEach(s=>s.delete());
   if(body.status()!=='NoError'||count!==1)throw new Error('Invalid solid');
   const mesh=keep(body.simplify(.0001)).getMesh(),tris:Triangle[]=[];
   for(let k=0;k<mesh.triVerts.length;k+=3)tris.push([0,1,2].map(j=>{const a=mesh.triVerts[k+j]*mesh.numProp;return Array.from(mesh.vertProperties.slice(a,a+3)) as Point;}) as Triangle);
   const stl=encodeSTL(removeCollapsedFaces(weldNearVertices(tris,.000001)));
   return {name:`V7-${label}-${i?'panel-face-down':'wall-upright'}`,color:i?'#E66A25':'#DDDDDD',stl,inspection:inspectSurface(decodeSTL(stl))};
  });
  for(const o of objects)await writeFile(`${dir}/${o.name}.stl`,new Uint8Array(o.stl));
  await writeFile(`${dir}/ReplixGrid-V7-${label}.3mf`,new Uint8Array(formatExport(objects,'3mf').data));
  reports.push({variant:label,experimental:true,wall:PANEL_WALL_MIN,socketDepth:2.2,remainingWall:1,armThickness:.6,armWidth:4,panelGap:.6,tooth,deflectionPerArm:tooth-.05,axialFreeTravel:.15,elasticityValidated:false,printValidated:false,seatedIntersection:seated,retentionIntersection:retention,parts:objects.map(({name,inspection})=>({name,inspection}))});
 }
 await writeFile(`${dir}/inspection.json`,JSON.stringify(reports,null,2));console.log(JSON.stringify(reports,null,2));
}finally{owned.reverse().forEach(s=>s.delete());}
