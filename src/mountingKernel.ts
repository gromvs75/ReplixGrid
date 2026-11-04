import Module,{type Manifold,type Vec2} from 'manifold-3d';
import {MOUNT,platePlan} from './mountingPlate.js';
import {parseDrawer,trayRect,type DrawerLayout} from './drawer.js';
import {buildKit,type KitPart} from './accessoryKernel.js';
import {encodeSTL,decodeSTL,inspectSurface,type Point,type Triangle} from './stl.js';
import {formatExport} from './exportFormats.js';
import {zipFiles} from './zip.js';
let modulePromise:ReturnType<typeof Module>|undefined;
function serialize(body:Manifold){
 if(body.status()!=='NoError')throw new Error('Не удалось построить крепление.');
 const mesh=body.getMesh(),triangles:Triangle[]=[];
 for(let i=0;i<mesh.triVerts.length;i+=3)triangles.push([0,1,2].map(j=>{const k=mesh.triVerts[i+j]*mesh.numProp;return [mesh.vertProperties[k],mesh.vertProperties[k+1],mesh.vertProperties[k+2]] as Point;}) as Triangle);
 const stl=encodeSTL(triangles);return {stl,inspection:inspectSurface(decodeSTL(stl))};
}
export async function buildPlateTiles(input:DrawerLayout){
 const d=parseDrawer(JSON.stringify(input)),plan=platePlan(d),wasm=await(modulePromise??=Module());wasm.setup();
 const result:({name:string;position:Point}&ReturnType<typeof serialize>)[]=[];
 for(const tile of plan.tiles){
  const owned:Manifold[]=[],keep=(m:Manifold)=>{owned.push(m);return m;};
  try{
   const left=tile.column>0?MOUNT.seamGap/2:0,top=tile.row>0?MOUNT.seamGap/2:0;
   const right=tile.column<plan.columns-1?MOUNT.seamGap/2:0,bottom=tile.row<plan.rows-1?MOUNT.seamGap/2:0;
   let body=keep(wasm.Manifold.cube([tile.width-left-right,tile.depth-top-bottom,2]).translate([left,top,0]));
   // Dovetails lie between peg rows, preserve the global 20 mm grid.
   for(const axis of ['x','y'] as const)for(const outgoing of [false,true]){
    const index=axis==='x'?tile.column:tile.row,total=axis==='x'?plan.columns:plan.rows;
    if(outgoing?index===total-1:index===0)continue;
    const span=axis==='x'?tile.depth:tile.width,seam=outgoing?(axis==='x'?tile.width:tile.depth):0;
    const anchors:number[]=[];for(let a=20;a<=span-10;a+=60)anchors.push(a);if(!anchors.length)anchors.push(span/2);
    for(const anchor of anchors){
     const g=outgoing?0:.2;
     const polygon:Vec2[]=[[-1,-3-g],[4+g,-5-g],[4+g,5+g],[-1,3+g]];
     let joint=keep(wasm.Manifold.extrude([polygon],2+(outgoing?0:.2)));
     joint=keep(joint.translate([seam,anchor,outgoing?0:-.1]));
     if(axis==='y')joint=keep(joint.mirror([1,-1,0]));
     body=keep(outgoing?body.add(joint):body.subtract(joint));
    }
   }
   const pegs=plan.pegs.filter(p=>p.x>=tile.x&&p.x<tile.x+tile.width&&p.y>=tile.y&&p.y<tile.y+tile.depth);
   const parts=[body];
   for(const p of pegs){parts.push(keep(wasm.Manifold.cylinder(1.41,3,3,64).translate([p.x-tile.x,p.y-tile.y,1.99])));parts.push(keep(wasm.Manifold.cylinder(.4,3,2.6,64).translate([p.x-tile.x,p.y-tile.y,3.4])));}
   body=keep(wasm.Manifold.union(parts));const built=serialize(body),b=built.inspection.bounds;
   if(b.max[0]-b.min[0]>d.plate!.bedWidth-4+1e-4||b.max[1]-b.min[1]>d.plate!.bedDepth-4+1e-4)throw new Error('Секция не помещается на стол.');
   result.push({name:`plate-R${tile.row+1}-C${tile.column+1}`,position:[tile.x,tile.y,0],...built});
  }finally{owned.reverse().forEach(m=>m.delete());}
 }
 return result;
}
export async function plateArchive(d:DrawerLayout){
 const tiles=await buildPlateTiles(d),plan=platePlan(d);
 const map=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -20 ${d.width+20} ${d.depth+30}"><rect x="-10" y="-20" width="${d.width+20}" height="${d.depth+30}" fill="white"/><text x="0" y="-7" font-size="8">${d.width} × ${d.depth} mm — ReplixGrid</text>${plan.tiles.map(t=>`<rect x="${t.x}" y="${t.y}" width="${t.width}" height="${t.depth}" fill="#e3edf8" stroke="#526477" stroke-width=".5"/><text x="${t.x+t.width/2}" y="${t.y+t.depth/2}" text-anchor="middle" font-size="8">R${t.row+1} C${t.column+1}</text>`).join('')}</svg>`;
 const files=tiles.map(p=>({name:p.name+'.3mf',data:formatExport([{name:p.name,stl:p.stl,color:'#a6bcb1'}],'3mf').data}));
 return zipFiles([...files,{name:'assembly.svg',data:map},{name:'assembly.json',data:JSON.stringify({units:'mm',drawer:[d.width,d.depth],gap:d.gap,tiles:tiles.map(({name,position,inspection})=>({name,position,bounds:inspection.bounds}))},null,2)},{name:'README.txt',data:'ReplixGrid mounting plate — millimetres, scale 100%.\nEach numbered 3MF contains one section for a separate print job. R = row (top to bottom), C = column (left to right) in original drawer coordinates. Assemble dovetails by lowering neighbouring sections from above. The 20 mm peg grid continues across seams.\nPeg/socket radial clearance 0.12 mm was tested in PLA, layers 0.2 mm / first layer 0.25 mm. Section dovetails are experimental: test two adjoining sections before printing the entire drawer. No slicer profiles are included.\nMounted trays gain an external socket base; export them from this drawer with plate mode enabled. Existing flat-bottom trays will not engage the pegs.\n'}]);
}
export interface MountingRequest {layout:DrawerLayout;trayId:string}
export async function mountedKit(request:MountingRequest):Promise<KitPart[]>{
 const d=parseDrawer(JSON.stringify(request.layout)),tray=d.trays.find(t=>t.id===request.trayId);
 if(!tray||!d.plate?.enabled)throw new Error('Выберите лоток на пластине.');
 if(tray.project.tilt||tray.project.printing)throw new Error('Крепление пока доступно для цельного лотка без наклона.');
 const parts=await buildKit(tray.project),base=parts.find(p=>p.kind==='organizer'&&p.level===0);
 if(!base)throw new Error('Не найдено дно лотка.');
 const min=[0,1,2].map(i=>Math.min(...parts.map(p=>p.position[i]+p.inspection.bounds.min[i]))),max=[0,1,2].map(i=>Math.max(...parts.map(p=>p.position[i]+p.inspection.bounds.max[i])));
 const r=trayRect(tray,{width:max[0]-min[0],depth:max[1]-min[1],height:max[2]-min[2]});
 if(r.x<d.gap||r.y<d.gap||r.x+r.width>d.width-d.gap+.001||r.y+r.depth>d.depth-d.gap+.001||max[2]-min[2]+MOUNT.addedHeight>d.height+.001)throw new Error('Лоток с креплением не помещается в ящик.');
 const wasm=await(modulePromise??=Module());wasm.setup();const owned:Manifold[]=[],keep=(m:Manifold)=>{owned.push(m);return m;};
 try{
  const triangles=decodeSTL(base.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(Array.from({length:triangles.length*3},(_,i)=>i))});mesh.merge();
  const original=keep(new wasm.Manifold(mesh)),floor=original.slice(.05);let body:Manifold;
  try{body=keep(original.add(keep(floor.extrude(MOUNT.socketDepth+.05).translate([0,0,-MOUNT.socketDepth]))));}finally{floor.delete();}
  let sockets=0;
  for(const peg of platePlan(d).pegs){
   const dx=peg.x-tray.x,dy=peg.y-tray.y;
   const x=(tray.rotation===0?dx:dy)+min[0]-base.position[0];
   const y=(tray.rotation===0?dy:max[1]-min[1]-dx)+min[1]-base.position[1];
   const b=base.inspection.bounds;if(x<b.min[0]-3.6||x>b.max[0]+3.6||y<b.min[1]-3.6||y>b.max[1]+3.6)continue;
   const hole=keep(wasm.Manifold.cylinder(2.11,3.12,3.12,64).translate([x,y,-2.11]));
   // Count fully supported sockets, including lead-in, for stable lateral retention.
   const probe=keep(wasm.Manifold.cylinder(.1,3.55,3.55,64).translate([x,y,-1]));
   if(keep(body.intersect(probe)).volume()>=probe.volume()-.001)sockets++;
   const mouth=keep(wasm.Manifold.cylinder(.41,3.52,3.12,64).translate([x,y,-2.11]));
   body=keep(body.subtract(hole));body=keep(body.subtract(mouth));
  }
  if(sockets<3)throw new Error('Недостаточно опор крепления. Сместите лоток на пластине или увеличьте его размер.');
  const built=serialize(keep(body.translate([0,0,2.1])));
  return parts.map(p=>p===base?{...p,...built,name:p.name+'-mounted',position:[p.position[0],p.position[1],p.position[2]-2.1]}:p);
 }finally{owned.reverse().forEach(m=>m.delete());}
}
