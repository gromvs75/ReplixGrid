// Diagnostic coupon from the user's actual slicer mesh. No production geometry changes.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import Module,{type Manifold} from 'manifold-3d';
import {encodeSTL,decodeSTL,inspectSurface,type Triangle,type Point} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
const data=JSON.parse(await readFile('work/print-diagnostics/printed-organizer.json','utf8'));
const wasm=await Module();wasm.setup();
const owned:Manifold[]=[],keep=(m:Manifold)=>{owned.push(m);return m;};
const dir='public/guides/vertical-sockets';await mkdir(dir,{recursive:true});
try{
 const source=keep(new wasm.Manifold(new wasm.Mesh({numProp:3,vertProperties:new Float32Array(data.vertices.flat()),triVerts:new Uint32Array(data.triangles.flat())})));
 if(source.status()!=='NoError')throw new Error(source.status());
 // Crop the flat face containing four original sockets; preserve their exact shape.
 const crop=keep(wasm.Manifold.cube([80,2,36]).translate([-40,-45,-18]));
 const wall=keep(source.intersect(crop));
 const foot=keep(wasm.Manifold.cube([80,14,2]).translate([-40,-45,-18]));
 const a=keep(wall.add(foot));
 // Thicken behind the sockets only for this controlled thickness experiment.
 // This is NOT the proposed final external reinforcement under the panel.
 const backing=keep(wasm.Manifold.cube([80,1.21,36]).translate([-40,-43.01,-18]));
 const b=keep(a.add(backing));
 const objects=[a,b].map((body,i)=>{
  const placed=keep(body.translate([40,45,18])),mesh=placed.getMesh(),tris:Triangle[]=[];
  for(let k=0;k<mesh.triVerts.length;k+=3)tris.push([0,1,2].map(j=>{const v=mesh.triVerts[k+j]*mesh.numProp;return Array.from(mesh.vertProperties.slice(v,v+3)) as Point;}) as Triangle);
  const stl=encodeSTL(tris);inspectSurface(decodeSTL(stl));
  return {name:i?'B-wall-3.2mm-upright':'A-wall-2mm-upright',color:'#EEEEEE',stl};
 });
 // Same exterior cavities in both samples; backing must not fill any cavity.
 const outerProbe=keep(wasm.Manifold.cube([80,2,34]).translate([-40,-45,-16]));
 const ca=keep(a.intersect(outerProbe)),cb=keep(b.intersect(outerProbe));
 const change=keep(cb.subtract(ca));if(change.volume()>.001)throw new Error('Socket geometry changed');
 for(const o of objects)await writeFile(`${dir}/${o.name}.stl`,new Uint8Array(o.stl));
 await writeFile(`${dir}/ReplixGrid-vertical-socket-test.3mf`,new Uint8Array(formatExport(objects,'3mf').data));
 const report={sourceStatus:source.status(),unchangedCavities:true,remainingWall:[.9,2.1],parts:objects.map(o=>({name:o.name,...inspectSurface(decodeSTL(o.stl))}))};
 await writeFile(`${dir}/inspection.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{owned.reverse().forEach(m=>m.delete());}
