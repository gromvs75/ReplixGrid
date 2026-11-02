// Experimental attachment only; deliberately separate from production fasteners.
import {mkdir,writeFile} from 'node:fs/promises';
import Module,{type Manifold} from 'manifold-3d';
import {encodeSTL,decodeSTL,inspectSurface,type Triangle,type Point} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
const w=await Module();w.setup();
const owned:Manifold[]=[],keep=(s:Manifold)=>{owned.push(s);return s;};
const box=(size:number[],at:number[])=>keep(w.Manifold.cube(size).translate(at));
function prism(x:number,width:number,yz:number[][]){
 const section=new w.CrossSection([yz]);
 try{return keep(section.extrude(width).transform([0,1,0,0,0,0,1,0,1,0,0,0,x,0,0,1]));}finally{section.delete();}
}
const dir='public/guides/latch-v2';await mkdir(dir,{recursive:true});
try{
 // Assembled coordinates: wall front Y=0, up Z. Blind pockets leave 1.7 mm backing.
 let wall=keep(box([40,3.2,36],[0,0,0]).add(box([40,14,2],[0,0,0])));
 const sockets=[8,32].map(x=>prism(x-2.2,4.4,[[-.5,5.8],[1.5,5.8],[1.5,8.8],[0,10.3],[-.5,10.3]]));
 sockets.push(prism(16.8,6.4,[[-.5,27.8],[.5,27.8],[.5,27.2],[1.5,27.2],[1.5,30],[0,31.5],[-.5,31.5]]));
 wall=keep(wall.subtract(keep(w.Manifold.union(sockets))));
 // U-shaped clearance frees an 18 mm cantilever, attached along its lower end.
 let panel=box([40,1.6,34],[0,-1.9,2]);
 panel=keep(panel.subtract(box([8,3,20],[16,-2.5,12])));
 const tongue=box([6,1.2,18.5],[17,-1.9,11.5]);
 const hook=prism(17,6,[[-.8,28],[.6,28],[.6,27.5],[1,27.5],[1,28.5],[-.8,30]]);
 const guides=[8,32].map(x=>prism(x-2,4,[[-.4,6],[1,6],[1,8],[-.4,9.4]]));
 panel=keep(w.Manifold.union([panel,tongue,hook,...guides]));
 const interference=keep(wall.intersect(panel)).volume();
 if(interference>1e-5)throw new Error(`Assembly interference ${interference}`);
 // Pull-off must encounter the retaining ledge (tongue has to be released).
 const withdrawal=keep(wall.intersect(keep(panel.translate([0,-.7,0])))).volume();
 if(withdrawal<.01)throw new Error('No retaining engagement');
 const printedPanel=keep(panel.rotate([90,0,0]).translate([0,36,1.9]));
 const objects=[wall,printedPanel].map((body,i)=>{
  const parts=body.decompose();const count=parts.length;parts.forEach(s=>s.delete());
  if(body.status()!=='NoError'||count!==1)throw new Error('Invalid or disconnected part');
  const mesh=body.getMesh(),triangles:Triangle[]=[];
  for(let k=0;k<mesh.triVerts.length;k+=3)triangles.push([0,1,2].map(j=>{const a=mesh.triVerts[k+j]*mesh.numProp;return Array.from(mesh.vertProperties.slice(a,a+3)) as Point;}) as Triangle);
  const stl=encodeSTL(triangles),inspection=inspectSurface(decodeSTL(stl));
  return {name:i?'B-panel-flat-release-tab':'A-wall-upright-3.2mm',color:i?'#E66A25':'#DDDDDD',stl,inspection};
 });
 for(const o of objects)await writeFile(`${dir}/${o.name}.stl`,new Uint8Array(o.stl));
 await writeFile(`${dir}/ReplixGrid-latch-v2-test.3mf`,new Uint8Array(formatExport(objects,'3mf').data));
 const report={experimental:true,wallThickness:3.2,pocketDepth:1.5,remainingBacking:1.7,tongueThickness:1.2,tongueFreeLength:18,assemblyIntersectionVolume:interference,withdrawalIntersectionVolume:withdrawal,parts:objects.map(({name,inspection})=>({name,inspection}))};
 await writeFile(`${dir}/inspection.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{owned.reverse().forEach(s=>s.delete());}
