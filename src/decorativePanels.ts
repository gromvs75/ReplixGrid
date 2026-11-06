import {svgSurface,SVG_ISLAND_ERROR} from './svgSurface.js';
import {PANEL_SEATED_GAP,panelSides,panelIssue,panelMountsAvailable} from './panelSettings.js';
import Module,{type Manifold,type ManifoldToplevel,type CrossSection} from 'manifold-3d';
import {resolveWalls,type Project,type Side} from './model.js';
import {wallOutline,holesFor} from './shell.js';
import {shellGap} from './reliefSize.js';
import {tiltSlope} from './tilt.js';
import {encodeSTL,decodeSTL,inspectSurface,removeCollapsedFaces,weldNearVertices,type Point,type Triangle} from './stl.js';
// V7-B dimensions validated on an upright 3.2 mm wall and a four-mount panel.
export const PANEL_MOUNT={tooth:.2,gap:PANEL_SEATED_GAP,socketDepth:2.2,footWidth:4.8,footHeight:4,maxSpacing:70};
export function panelBorder(p:Project){return Math.max(4,(p.shell?.thickness??1.6)*2);}
// Local coordinates: X along the face, Y up, Z outward. Side IDs are model IDs.
export function placePanel(wasm:ManifoldToplevel,p:Project,side:Side,m:Manifold,keep:(m:Manifold)=>Manifold){
 let placed:Manifold;
 if(side==='front')placed=keep(m.rotate([90,0,0]));
 else if(side==='back')placed=keep(m.rotate([90,0,0]).mirror([0,1,0]).translate([0,p.depth,0]));
 else if(side==='left')placed=keep(m.rotate([90,0,90]).mirror([1,0,0]));
 else placed=keep(m.rotate([90,0,90]).translate([p.width,0,0]));
 const lean=tiltSlope(p);
 return lean?keep(placed.transform([1,0,0,0,0,1,0,0,lean,0,1,0,0,0,0,1])):placed;
}
export function panelProfile(wasm:ManifoldToplevel,p:Project,side:Side,keep:(s:CrossSection)=>CrossSection){
 const wall=resolveWalls(p).find(w=>w.id===side)!;
 const margin=p.shell?.margin??4,r=p.cornerRadius??0;
 const profile=keep(new wasm.CrossSection([wallOutline(wall)]));
 // Stay on the straight portion of the face; rounded organizer corners remain visible.
 const box=keep(new wasm.CrossSection([[[r,0],[wall.length-r,0],[wall.length-r,Math.max(wall.startHeight,wall.endHeight)+1],[r,Math.max(wall.startHeight,wall.endHeight)+1]]]));
 const clipped=keep(profile.intersect(box));
 const inset=keep(clipped.offset(-margin,'Round',2,32));
 const inner=keep(inset.offset(-2,'Round',2,32));
 if(inner.isEmpty())throw new Error('Для панели мало места. Уменьшите отступ или увеличьте стенку.');
 return {wall,shape:keep(inner.offset(2,'Round',2,32))};
}
export function panelAnchors(wasm:ManifoldToplevel,p:Project,side:Side){
 const owned:CrossSection[]=[],keep=(s:CrossSection)=>{owned.push(s);return s;};
 try{
  const {shape}=panelProfile(wasm,p,side,keep);
  const centre=keep(shape.offset(-panelBorder(p)/2,'Round',2,32));
  const mask=keep(shape.offset(-panelBorder(p),'Round',2,32));
  const bounds=centre.bounds(),polys=centre.toPolygons(),anchors:[number,number][]=[];
  const width=bounds.max[0]-bounds.min[0];
  const endInset=Math.min(12,width*.2),span=width-2*endInset;
  const columns=Math.max(2,Math.ceil(span/PANEL_MOUNT.maxSpacing)+1);
  for(let column=0;column<columns;column++){
   const x=bounds.min[0]+endInset+span*column/(columns-1),ys:number[]=[];
   for(const poly of polys)for(let i=0;i<poly.length;i++){
    const a=poly[i],b=poly[(i+1)%poly.length];
    if((a[0]<=x&&b[0]>x)||(b[0]<=x&&a[0]>x))ys.push(a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0]));
   }
   ys.sort((a,b)=>a-b);
   if(ys.length<2||ys[ys.length-1]-ys[0]<PANEL_MOUNT.footHeight+1)throw new Error('Недостаточно места для креплений панели. Увеличьте высоту или отключите крепления.');
   anchors.push([x,ys[0]],[x,ys[ys.length-1]]);
  }
  // The tested foot is a 4.8 × 4 mm rectangle, not a 6.4 mm circle.
  // Validate here so both the socket cutter and panel use identical valid sites.
  for(const [x,y] of anchors){
   const w=PANEL_MOUNT.footWidth/2,h=PANEL_MOUNT.footHeight/2;
   const foot=keep(new wasm.CrossSection([[[x-w,y-h],[x+w,y-h],[x+w,y+h],[x-w,y+h]]]));
   if(keep(foot.subtract(shape)).area()>.001||keep(foot.intersect(mask)).area()>.001)
    throw new Error('Крепление не помещается в кант этой панели. Сделайте край ровным или отключите крепления: кант и узор не расширяются автоматически.');
  }
  return anchors;
 }finally{owned.reverse().forEach(s=>s.delete());}
}
// Local X along face, Y up, Z outward. V7 prototype depth is -Z here.
export function panelFastener(wasm:ManifoldToplevel,p:Project,side:Side,socket:boolean,keep:(s:Manifold)=>Manifold){
 const parts:Manifold[]=[];
 const box=(size:[number,number,number],pos:[number,number,number])=>keep(wasm.Manifold.cube(size).translate(pos));
 for(const [x,y] of panelAnchors(wasm,p,side)){
  if(socket){
   parts.push(box([2.1,4.1,.86],[x-1.05,y-2.05,-.76]));
   parts.push(box([2.6,4.1,1.45],[x-1.3,y-2.05,-2.2]));
  }else{
   for(const sign of [-1,1]){
    const points=[[.4,-.7],[1.15,-.7],[1,-.3],[1,.9],[1.2,.9],[1.2,1.1],[1,2],[.4,2]].map(([a,b]):[number,number]=>[x+sign*a,b]);
    const section=new wasm.CrossSection([points],'NonZero');
    try{parts.push(keep(section.extrude(4).rotate([-90,0,0]).translate([0,y-2,0])));}finally{section.delete();}
   }
   // Stops beside each socket establish the tested 0.6 mm seated gap.
   // They remain hidden behind the solid rim and do not cover the socket mouth.
   for(const dx of [-2.4,1.6])parts.push(box([.8,4,.7],[x+dx,y-2,0]));
  }
 }
 return keep(wasm.Manifold.union(parts));
}
export function cutPanelSockets(wasm:ManifoldToplevel,p:Project,body:Manifold,keep:(s:Manifold)=>Manifold){
 if(p.shell?.mode!=='panels'||!p.shell.mounts||!panelMountsAvailable(p))return body;
 let result=body;
 for(const side of panelSides(p))result=keep(result.subtract(placePanel(wasm,p,side,panelFastener(wasm,p,side,true,keep),keep)));
 return result;
}
let ready:ReturnType<typeof Module>|undefined;
export async function buildDecorativePanels(p:Project){
 const issue=panelIssue(p);if(issue)throw new Error(issue);
 const wasm=await(ready??=Module());wasm.setup();
 const solids:Manifold[]=[],sections:CrossSection[]=[],keep=(s:Manifold)=>{solids.push(s);return s;},section=(s:CrossSection)=>{sections.push(s);return s;};
 const result=[];
 try{for(const side of panelSides(p)){
  const {wall,shape}=panelProfile(wasm,p,side,section),s=p.shell!,border=panelBorder(p);
  const mask=section(shape.offset(-border,'Round',2,32));
  const anchors=p.shell?.mounts&&panelMountsAvailable(p)?panelAnchors(wasm,p,side):[];
  // Tile beyond every edge, center the pattern, then clip to a constant-distance
  // inset. Never leave an unfilled remainder from a whole-tile-only layout.
  const bounds=mask.bounds(),padding=s.size*4;
  const height=bounds.max[1]-bounds.min[1]+padding*2;
  const holes=holesFor({...wall,length:bounds.max[0]-bounds.min[0]+padding*2,cutout:undefined,transitionStyle:undefined,startHeight:height,endHeight:height},s,0,0);
  if(holes.length){
   let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
   for(const hole of holes)for(const [x,y] of hole){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}
   const dx=(bounds.min[0]+bounds.max[0]-minX-maxX)/2;
   const dy=(bounds.min[1]+bounds.max[1]-minY-maxY)/2;
   for(const hole of holes)for(const point of hole){point[0]+=dx;point[1]+=dy;}
  }
  let perforated=shape;
  if(s.svg){
   perforated=section(shape.subtract(svgSurface(wasm,s.svg,mask,section)));
   const islands=perforated.decompose();islands.forEach(section);if(islands.length!==1)throw new Error(SVG_ISLAND_ERROR);
  }
  if(holes.length){const all=section(new wasm.CrossSection(holes.map(h=>h.slice().reverse()),'NonZero'));perforated=section(shape.subtract(section(all.intersect(mask))));}
  let local=keep(perforated.extrude(s.thickness).translate([0,0,shellGap(p)]));
  if(anchors.length)local=keep(local.add(panelFastener(wasm,p,side,false,keep)));
  const placed=placePanel(wasm,p,side,local,keep),body=keep(keep(placed.asOriginal()).simplify(.001)),parts=body.decompose();parts.forEach(keep);
  if(parts.length!==1||body.status()!=='NoError')throw new Error('Панель получилась разорванной. Уменьшите отступ или вырез.');
  const mesh=body.getMesh();let tris:Triangle[]=[];
  for(let i=0;i<mesh.triVerts.length;i+=3)tris.push([0,1,2].map(j=>{const k=mesh.triVerts[i+j]*mesh.numProp;return [mesh.vertProperties[k],mesh.vertProperties[k+1],mesh.vertProperties[k+2]] as Point;}) as Triangle);
  tris=removeCollapsedFaces(weldNearVertices(tris,.000001));
  const raw=inspectSurface(decodeSTL(encodeSTL(tris))),position=raw.bounds.min;
  const stl=encodeSTL(tris.map(t=>t.map(v=>v.map((n,k)=>n-position[k]) as Point) as Triangle));
  result.push({name:`panel-${side}`,stl,position,inspection:inspectSurface(decodeSTL(stl))});
 }}finally{for(const s of sections.reverse())s.delete();for(const s of solids.reverse())s.delete();}
 return result;
}
