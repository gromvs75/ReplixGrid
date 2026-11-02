import {mkdir,writeFile} from 'node:fs/promises';
import Module from 'manifold-3d';
import {defaultProject} from '../src/model.js';
import {defaultShell} from '../src/shell.js';
import {buildDecorativePanels,panelFastener,panelAnchors} from '../src/decorativePanels.js';
import {labelLayout} from '../src/lettering.js';
import {encodeSTL,decodeSTL,inspectSurface,type Triangle,type Point} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
const dir='public/guides/panel-test-v2';await mkdir(dir,{recursive:true});
const p=defaultProject();Object.assign(p,{width:60,depth:40,height:40,cornerRadius:4,wallThickness:2,floorThickness:2});
p.shell={...defaultShell('honeycomb'),mode:'panels',margin:4,sides:['front'],mounts:true,thickness:1.6,size:10};
const wasm=await Module();wasm.setup();const owned:any[]=[];const keep=(m:any)=>{owned.push(m);return m;};
function toSTL(m:any){const mesh=m.getMesh(),t:Triangle[]=[];for(let i=0;i<mesh.triVerts.length;i+=3)t.push([0,1,2].map(j=>{const k=mesh.triVerts[i+j]*mesh.numProp;return [mesh.vertProperties[k],mesh.vertProperties[k+1],mesh.vertProperties[k+2]] as Point;}) as Triangle);return encodeSTL(t);}
function fromSTL(stl:ArrayBuffer){const t=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();return keep(new wasm.Manifold(mesh));}
try{
 const sockets=panelFastener(wasm,p,'front',true,keep);
 let wall=keep(keep(wasm.Manifold.cube([90,40,2]).translate([0,0,-2])).subtract(sockets));
 for(const [mode,y] of [['raised',23],['engraved',10]] as const){
  const l=labelLayout({...p,label:{text:'PLA',icon:'',font:'bold',size:5,depth:.6,mode}});
  const s=new wasm.CrossSection(l.contours,'NonZero');const ink=keep(s.extrude(.62).translate([65,y,mode==='raised'?-.02:-.6]));s.delete();
  wall=keep(mode==='raised'?wall.add(ink):wall.subtract(ink));
 }
 const part=(await buildDecorativePanels(p))[0];
 const assembled=keep(keep(fromSTL(part.stl).translate(part.position)).rotate([-90,0,0]));
 const overlap=keep(wall.intersect(assembled));if(overlap.volume()>.001)throw new Error('Assembly collision');
 const panel=keep(assembled.rotate([180,0,0]));const bounds=panel.boundingBox();
 const flatPanel=keep(panel.translate([-bounds.min[0],-bounds.min[1],-bounds.min[2]]));
 const objects=[{name:'01-wall-sockets-up',stl:toSTL(keep(wall.translate([0,0,2]))),color:'#EEEEEE'},{name:'02-panel-studs-up',stl:toSTL(flatPanel),color:'#EEEEEE'}];
 const inspections=objects.map(o=>({name:o.name,...inspectSurface(decodeSTL(o.stl))}));
 for(const o of objects)await writeFile(`${dir}/${o.name}.stl`,new Uint8Array(o.stl));
 const file=formatExport(objects,'3mf');await writeFile(`${dir}/ReplixGrid-panel-fit-test.3mf`,new Uint8Array(file.data));
 await writeFile(`${dir}/inspection.json`,JSON.stringify({anchors:panelAnchors(wasm,p,'front'),assemblyOverlap:overlap.volume(),diametralClearance:.1,inspections},null,2));
 await writeFile(`${dir}/sample.replixgrid.json`,JSON.stringify(p,null,2));
 console.log(JSON.stringify(inspections,null,2));
}finally{owned.reverse().forEach(m=>m.delete());}
