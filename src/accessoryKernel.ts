import {buildDecorativePanels} from './decorativePanels.js';
import {oliveFace} from './oliveLid.js';
import {shellGap} from './reliefSize.js';
import Module,{type Manifold,type CrossSection} from 'manifold-3d';
import {tiltOnBase,tiltSlope} from './tilt.js';
import {buildOrganizer,buildShell} from './kernel.js';
import {resolveWalls,type Project} from './model.js';
import {levelProject,lidPlateThickness,insertHeight,insertHeightAt} from './accessories.js';
import {footprintContour,honeyCells} from './footprint.js';
import {clipRectangle,roundedContour,type XY} from './rounding.js';
import {regions} from './editor.js';
import {partColor,insertColor} from './appearance.js';
import {encodeSTL,decodeSTL,inspectSurface,removeCollapsedFaces,weldNearVertices,type Point,type Triangle} from './stl.js';
import {reliefValue} from './reliefPatterns.js';
export interface KitPart {name:string;cellId?:string;kind:'organizer'|'shell'|'lid'|'lid-handle'|'cup';level:number;stl:ArrayBuffer;position:Point;inspection:ReturnType<typeof inspectSurface>;color:string}
let modulePromise:ReturnType<typeof Module>|undefined;
const kitCache=new Map<string,KitPart[]>();
export async function buildKit(p:Project):Promise<KitPart[]> {
 const key=JSON.stringify(p.stack?{...levelProject(p,0),lid:p.lid,lidDesign:p.lidDesign,stack:{gap:p.stack.gap,levels:p.stack.levels.map((_,i)=>levelProject(p,i))}}:p);
 const hit=kitCache.get(key);
 if(hit)return structuredClone(hit);
 const result=await buildKitUncached(p);
 kitCache.set(key,structuredClone(result));
 while(kitCache.size>8)kitCache.delete(kitCache.keys().next().value!);
 return result;
}
const organizerCache=new Map<string,Awaited<ReturnType<typeof buildOrganizer>>>();
const panelCache=new Map<string,Awaited<ReturnType<typeof buildDecorativePanels>>>();
async function cachedOrganizer(p:Project){
 const key=JSON.stringify(p);let result=organizerCache.get(key);
 if(!result){result=await buildOrganizer(p);organizerCache.set(key,result);while(organizerCache.size>8)organizerCache.delete(organizerCache.keys().next().value!);}
 return structuredClone(result);
}
async function cachedPanels(p:Project){
 const key=JSON.stringify(p);let result=panelCache.get(key);
 if(!result){result=await buildDecorativePanels(p);panelCache.set(key,result);while(panelCache.size>8)panelCache.delete(panelCache.keys().next().value!);}
 return structuredClone(result);
}
async function buildKitUncached(p:Project):Promise<KitPart[]> {
 resolveWalls(p);
 const wasm=await(modulePromise??=Module());wasm.setup();
 const owned:Manifold[]=[],keep=(m:Manifold)=>{owned.push(m);return m;},parts:KitPart[]=[];
 const sections:CrossSection[]=[],keepSection=(s:CrossSection)=>{sections.push(s);return s;};
 const solid=(stl:ArrayBuffer)=>{const t=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();return keep(new wasm.Manifold(mesh));};
 const emit=(body:Manifold,name:string,kind:KitPart['kind'],level:number,position:Point=[0,0,0])=>{
  if(body.status()!=='NoError')throw new Error(`${name}: ошибка геометрии`);
  const tolerance=Math.max(p.width,p.depth,p.height)*1e-6;
  body=keep(keep(body.asOriginal()).simplify(tolerance));
  const mesh=body.getMesh();let triangles:Triangle[]=[];
  for(let i=0;i<mesh.triVerts.length;i+=3)triangles.push([0,1,2].map(j=>{const k=mesh.triVerts[i+j]*mesh.numProp;return [mesh.vertProperties[k],mesh.vertProperties[k+1],mesh.vertProperties[k+2]] as Point;}) as Triangle);
  const original=triangles;triangles=removeCollapsedFaces(weldNearVertices(original,tolerance*.2));
  let raw:ReturnType<typeof inspectSurface>;
  try{raw=inspectSurface(decodeSTL(encodeSTL(triangles)));}catch(error){if(kind!=='lid-handle'||!(error instanceof Error)||!error.message.includes('non-manifold'))throw error;triangles=removeCollapsedFaces(weldNearVertices(original,tolerance*.02));raw=inspectSurface(decodeSTL(encodeSTL(triangles)));}
  const min=raw.bounds.min;
  const stl=encodeSTL(triangles.map(t=>t.map(v=>v.map((n,k)=>n-min[k]) as Point) as Triangle));
  parts.push({name,kind,level,stl,inspection:inspectSurface(decodeSTL(stl)),position:position.map((n,k)=>n+min[k]) as Point,color:kind==='cup'?'#c0cdb5':partColor(p,kind==='shell'?'shell':'organizer')});
 };
 const ring=(source:Project,outer:number,inner:number,height:number,z:number)=>keep(keep(wasm.Manifold.extrude([footprintContour(source,outer),footprintContour(source,inner).reverse()],height)).translate([0,0,z]));
 try{
  const count=p.stack?.levels.length??1;let baseZ=0;
  for(let i=0;i<count;i++){
   const lp=p.stack?levelProject(p,i):{...p,lid:undefined,cups:undefined};
   // Keep lid presence when deciding whether a sleeve ledge is supported.
   const built=await cachedOrganizer({...lp,lid:p.stack?undefined:p.lid,cups:undefined});let body:Manifold|null=null;
   const h=resolveWalls(lp)[0].startHeight;
   if(p.stack&&i<count-1){
    body=keep(solid(built.stl).translate(built.position));
    const gap=p.stack.gap,out=gap+1.4;
    // Collar belongs to the LOWER tray: the next tray still prints on its entire flat bottom.
    // Short stepped flare supports the outward lip without a bridge across the tray floor.
    const additions:Manifold[]=[];
    for(let step=1;step<=5;step++)additions.push(ring(lp,out*step/5,-lp.wallThickness, .45,h-2.25+(step-1)*.45));
    additions.push(ring(lp,out,gap,2.4,h-.4));
    let collar=keep(wasm.Manifold.union(additions));
    for(const side of ['left','right','front','back'] as const){
     const cut=lp.cutouts?.[side];if(!cut)continue;
     const length=side==='left'||side==='right'?lp.depth:lp.width,span=length*.9,width=span*cut.width,lo=length*.05+(span-width)*cut.position;
     const size=out+lp.wallThickness+2;
     const dims:[number,number,number]=side==='left'||side==='right'?[size,width+.4,8]:[width+.4,size,8];
     const pos:[number,number,number]=side==='left'?[-out-1,lo-.2,h-3]:side==='right'?[lp.width-lp.wallThickness-1,lo-.2,h-3]:side==='front'?[lo-.2,-out-1,h-3]:[lo-.2,lp.depth-lp.wallThickness-1,h-3];
     const opening=keep(wasm.Manifold.cube(dims).translate(pos));
     collar=keep(collar.subtract(opening));
    }
    body=keep(body.add(collar));
   }
   const inset=i===count-1&&p.lid&&p.lidDesign?.fit==='inset';
   const seatOffset=-lp.wallThickness/2;
   const plateThickness=lidPlateThickness(p);
   if(inset){
    // Cut the seat from the finished tray, including any full-height dividers.
    const pocket=keep(wasm.Manifold.extrude([footprintContour(lp,seatOffset)],h+1));
    const cutter=keep(pocket.translate([0,0,h-plateThickness]));
    body=keep(keep(solid(built.stl).translate(built.position)).subtract(cutter));
   }
   if(body)emit(body,count>1?`tray-${i+1}`:'organizer','organizer',i,[0,0,baseZ]);
   else parts.push({name:count>1?`tray-${i+1}`:'organizer',kind:'organizer',level:i,...built,position:[built.position[0],built.position[1],built.position[2]+baseZ],color:partColor(lp,'organizer')});
   parts[parts.length-1].color=partColor(lp,'organizer');
   if(i===count-1&&p.lid){
    const offset=p.shell?shellGap(p)+p.shell.thickness:(p.relief?.depth??0),gap=.5,outer=inset?seatOffset-.35:offset+gap+1.4;
    let plate=keep(wasm.Manifold.extrude([footprintContour(lp,outer)],plateThickness));
    const design=p.lidDesign,lipHeight=design?.rimHeight??2;
    let lip=inset?null:ring(lp,outer,offset+gap,lipHeight,plateThickness);
    if(lip&&design?.rimPattern==='rings'){
     const grooves:Manifold[]=[];
     for(let z=plateThickness+.65;z<plateThickness+lipHeight-.3;z+=1.2)grooves.push(ring(lp,outer+.1,outer-.35,.4,z));
     if(grooves.length)lip=keep(lip.subtract(keep(wasm.Manifold.union(grooves))));
    }
    // Engraved decoration is on the face printed against the build plate.
    // Clip to an inset so the edge and the existing mating lip remain intact.
    let accent:Manifold|undefined;
    if(design?.olive){
     const motif=oliveFace(wasm,footprintContour(lp,outer),keepSection);
     accent=keep(motif.extrude(plateThickness/2));
     plate=keep(plate.subtract(accent));
    }else if(design&&design.pattern==='lines'){
     const mask=keep(wasm.Manifold.extrude([footprintContour(lp,inset?outer-2:-3)],1));
     const grooves:Manifold[]=[];
     for(let y=4;y<lp.depth;y+=design.patternSpacing??6)grooves.push(keep(keep(wasm.Manifold.cube([lp.width+2*outer,1.2,(design.patternDepth??.5)+.01])).translate([-outer,y-.6,-.01])));
     if(grooves.length)plate=keep(plate.subtract(keep(keep(wasm.Manifold.union(grooves)).intersect(mask))));
    }else if(design&&design.pattern!=='smooth'&&design.pattern!=='lines'){
     const polygon=footprintContour(lp,outer),spacing=design.patternSpacing??8,depth=design.patternDepth??.5;
     const edgeDistance=(x:number,y:number)=>Math.min(...polygon.map((a,i)=>{const b=polygon[(i+1)%polygon.length],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy);}));
     const pattern=design.pattern;
     // Sample narrow peaks and grooves more finely than the visible period.
     // Cap refinement for very large lids to keep geometry generation bounded.
     const meshStep=lp.footprint==='oval'?Math.max(1,spacing/5,Math.max(lp.width,lp.depth)/200):Math.max(.4,spacing/10,Math.max(lp.width,lp.depth)/350);
     plate=keep(keep(plate.refineToLength(meshStep)).warp(v=>{if(Math.abs(v[2])<1e-7)v[2]=depth*reliefValue(pattern,v[0]/spacing,v[1]/spacing)*Math.min(1,edgeDistance(v[0],v[1])/3);}));
    }
    // Print broad face down; invert for assembled preview only (see preview worker).
    const lidZ=baseZ+h+(inset?0:4.5);
    emit(lip?keep(plate.add(lip)):plate,'lid','lid',i,[0,0,lidZ]);
    if(accent){
     parts[parts.length-1].color=design?.baseColor??'#f7f3e8';
     emit(accent,'lid-olive','lid',i,[0,0,lidZ]);
     parts[parts.length-1].color=design?.patternColor??'#687749';
    }
    if(design?.handle&&design.handle!=='none'){
     const width=Math.min(design.handleWidth??(design.handle==='round'?10:26),lp.width-8),depth=Math.min(design.handle==='round'?width:Math.min(8,width),lp.depth-8),height=design.handleHeight??5;
     const radius=design.handle==='round'?Math.min(width,depth)/2:0,edge=Math.min(design.edgeSize??1,height/2,depth/3),edgeMode=design.handleEdge??'none';
     const outline=design.handle==='round'?Array.from({length:48},(_,j)=>[radius*Math.cos(j*Math.PI/24),radius*Math.sin(j*Math.PI/24)] as XY):roundedContour(width,depth,Math.min(depth/3,2),0,0);
     const centerX=design.handle==='bar'?width/2:0,centerY=design.handle==='bar'?depth/2:0;
     let handle:Manifold;
     if(edgeMode==='none'||edge===0)handle=keep(wasm.Manifold.extrude([outline],height));
     else{
      const steps=edgeMode==='round'?6:1,levels:[[number,number],...Array<[number,number]>]=[[0,0],[height-edge,0]];
      for(let j=1;j<=steps;j++){const dz=edge*j/steps,shrink=edgeMode==='round'?edge*(1-Math.sqrt(Math.max(0,1-(dz/edge)**2))):dz;levels.push([height-edge+dz,shrink]);}
      const points=levels.flatMap(([z,shrink])=>outline.map(([x,y])=>[centerX+(x-centerX)*(1-2*shrink/width),centerY+(y-centerY)*(1-2*shrink/depth),z] as [number,number,number]));
      handle=keep(wasm.Manifold.hull(points));
     }
     const b=handle.boundingBox();emit(handle,'lid-handle','lid-handle',i,[lp.width/2-(b.max[0]+b.min[0])/2,lp.depth/2-(b.max[1]+b.min[1])/2,lidZ]);
    }
   }
   if(lp.shell?.mode==='panels')for(const b of await cachedPanels({...lp,cups:undefined}))parts.push({...b,name:count>1?`tier-${i+1}-${b.name}`:b.name,position:[b.position[0],b.position[1],b.position[2]+baseZ],kind:'shell',level:i,color:partColor(lp,'shell')});
   baseZ+=h;
  }
  if(p.shell&&p.shell.mode!=='panels'){const b=await buildShell(p);parts.push({name:'shell',kind:'shell',level:0,...b,color:partColor(p,'shell')});}
  if(p.stack){
   let elevation=0;
   for(let level=0;level<count;level++){
    const lp=levelProject(p,level);
    if(lp.cups?.length){
     const local=await buildKit({...lp,shell:undefined,lid:level===count-1&&p.lid&&p.lidDesign?.fit==='inset',lidDesign:p.lidDesign});
     for(const part of local.filter(part=>part.kind==='cup'))parts.push({...part,name:`tier-${level+1}-${part.name}`,level,position:[part.position[0],part.position[1],part.position[2]+elevation]});
    }
    elevation+=resolveWalls(lp)[0].startHeight;
   }
  }
  for(const [i,c] of (p.stack?[]:p.cups??[]).entries()){
   const height=insertHeight(p,c.cellId);
   if(height<=1.2)throw new Error('Отсек слишком низкий для вставки с дном 1,2 мм. Увеличьте высоту отсека.');
   const r=regions(p).find(r=>r.cell.id===c.cellId&&!r.cell.split);if(!r)throw new Error('Отсек стаканчика изменился. Уберите стаканчик и выберите новый отсек.');
   const regionContour=p.footprint==='honeycomb'?honeyCells(p)[Number(c.cellId.slice(6))]:clipRectangle(footprintContour(p),r.x,r.y,r.width,r.depth);
   // Sample the actual cavity above its floor: this includes shared/exterior wall
   // thickness, chamfers and the exact internal fillets used by the organizer.
   const organizer=parts.find(part=>part.kind==='organizer')!;
   let body=keep(solid(organizer.stl).translate(organizer.position));
   const lean=tiltSlope(p);
   // Recover the unsheared cavity before fitting. Later transform the insert
   // at its assembled floor elevation so both parts share exactly one map.
   if(lean)body=keep(body.transform([1,0,0,0,0,1,0,0,-lean,0,1,0,0,0,0,1]));
   const occupied=keepSection(body.slice(p.floorThickness+.05));
   const regionSection=keepSection(new wasm.CrossSection([regionContour]));
   const free=keepSection(regionSection.subtract(occupied));
   const inset=keepSection(keepSection(free.offset(-.5/Math.cos((p.tilt??0)*Math.PI/180),'Miter',5)).simplify(.0001));
   const contours=inset.toPolygons();
   if(contours.length!==1||inset.area()<16)throw new Error('Для вставки мало места. Увеличьте отсек.');
   const poly=contours[0];
   const xs=poly.map(v=>v[0]),ys=poly.map(v=>v[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),cx=(x0+x1)/2,cy=(y0+y1)/2;
   const inside=(v:XY)=>poly.every((a,j)=>{const b=poly[(j+1)%poly.length];return (b[0]-a[0])*(v[1]-a[1])-(b[1]-a[1])*(v[0]-a[0])>=-1e-7;});
   const shape=(scale:number):XY[]=>{let w=(x1-x0)*scale,d=(y1-y0)*scale;if(c.shape==='circle')w=d=Math.min(w,d);if(c.shape==='rounded')return roundedContour(w,d,Math.min(4,w/4,d/4),cx-w/2,cy-d/2);const n=c.shape==='hexagon'?6:96;return Array.from({length:n},(_,j)=>[cx+w/2*Math.cos(2*Math.PI*j/n),cy+d/2*Math.sin(2*Math.PI*j/n)]);};
   let lo=0,hi=1;for(let k=0;k<30;k++){const m=(lo+hi)/2;if(shape(m).every(inside))lo=m;else hi=m;}
   const fitted=c.shape==='fitted'||(c.shape==='hexagon'&&p.footprint==='honeycomb');
   const outline=fitted?poly:shape(lo);if((x1-x0)*(fitted?1:lo)<8||(y1-y0)*(fitted?1:lo)<8)throw new Error('Для стаканчика мало места. Увеличьте отсек или уменьшите внутренний радиус.');
   const outerSection=keepSection(new wasm.CrossSection([outline]));
   const innerSection=keepSection(outerSection.offset(-1.2,'Miter',5));
   if(innerSection.toPolygons().length!==1||innerSection.area()<4)throw new Error('Для полости вставки мало места. Увеличьте отсек.');
   const outer=keep(outerSection.extrude(height)),cavity=keep(keep(innerSection.extrude(height)).translate([0,0,1.2]));
   // Pen inserts are solid, with holes cut later; other inserts remain hollow.
   let insert=c.content==='pens'?outer:keep(outer.subtract(cavity));
   const bounds=innerSection.bounds(),min=bounds.min,max=bounds.max;
   // Preserve the flat 1.2 mm floor; map all upper walls and dividers to
   // the local rim instead of using the height at the cell centre everywhere.
   // Match the partition heights at the actual insert edges, not at the
   // compartment boundaries beyond the installation clearance.
   const insertBounds=fitted?{minX:Math.min(...outline.map(v=>v[0])),maxX:Math.max(...outline.map(v=>v[0])),minY:Math.min(...outline.map(v=>v[1])),maxY:Math.max(...outline.map(v=>v[1]))}:undefined;
   const walls=resolveWalls(p),normalAt=(x:number,y:number)=>insertHeightAt(p,c.cellId,x,y,walls,insertBounds);
   const waveAt=(x:number,y:number)=>insertHeightAt(p,c.cellId,x,y,walls,insertBounds,true);
   const sharedWarp=!!insertBounds&&c.content==='grid'&&outline.some(([x,y])=>Math.abs(waveAt(x,y)-normalAt(x,y))>.01);
   const at=sharedWarp?waveAt:normalAt;
   const samples=outline.map(v=>at(...v));
   if(!sharedWarp&&samples.some(h=>Math.abs(h-height)>.001)){
    if(Math.min(...samples)<=1.2)throw new Error('Край отсека слишком низкий для вставки. Поднимите его.');
    insert=keep(keep(insert.refineToLength(4)).warp(v=>{
     if(v[2]>1.2)v[2]=1.2+(v[2]-1.2)/(height-1.2)*(at(v[0],v[1])-1.2);
    }));
   }
   if(c.content==='grid'){
    const rows=c.rows??2,columns=c.columns??2,web=1.2;
    if((max[0]-min[0]-(columns-1)*web)/columns<6||(max[1]-min[1]-(rows-1)*web)/rows<6)throw new Error('Ячейки слишком мелкие. Уменьшите число рядов или столбцов.');
    const dividers:Manifold[]=[];
    for(let j=1;j<columns;j++)dividers.push(keep(keep(wasm.Manifold.cube([web,max[1]-min[1],height])).translate([min[0]+(max[0]-min[0])*j/columns-web/2,min[1],0])));
    for(let j=1;j<rows;j++)dividers.push(keep(keep(wasm.Manifold.cube([max[0]-min[0],web,height])).translate([min[0],min[1]+(max[1]-min[1])*j/rows-web/2,0])));
    // Functional ribs have straight tops; decorative cutouts/waves affect the rim only.
    const plain=walls.map(w=>({...w,cutout:undefined,transitionStyle:'straight' as const,wavelength:undefined}));
    const z00=insertHeightAt(p,c.cellId,min[0],min[1],plain,insertBounds),z10=insertHeightAt(p,c.cellId,max[0],min[1],plain,insertBounds),z01=insertHeightAt(p,c.cellId,min[0],max[1],plain,insertBounds),z11=insertHeightAt(p,c.cellId,max[0],max[1],plain,insertBounds);
    if(dividers.length){
     let ribs=keep(keep(wasm.Manifold.union(dividers)).intersect(outer));
     if(!sharedWarp&&[z00,z10,z01,z11].some(z=>Math.abs(z-height)>.001))ribs=keep(keep(ribs.refineToLength(4)).warp(v=>{const u=(v[0]-min[0])/(max[0]-min[0]),t=(v[1]-min[1])/(max[1]-min[1]),h=(1-t)*(z00*(1-u)+z10*u)+t*(z01*(1-u)+z11*u);if(v[2]>1.2)v[2]=1.2+(v[2]-1.2)/(height-1.2)*(h-1.2);}));
     insert=keep(insert.add(ribs));
    }
   }
   if(sharedWarp){
    if(Math.min(...samples)<=1.2)throw new Error('Край отсека слишком низкий для вставки. Поднимите его.');
    insert=keep(keep(insert.refineToLength(2)).warp(v=>{if(v[2]>1.2)v[2]=1.2+(v[2]-1.2)/(height-1.2)*(at(v[0],v[1])-1.2);}));
   }
   if(c.content==='pens'){
    // The solid insert needs one wall thickness at its perimeter, not an
    // additional inset on top of the hollow insert's inner wall.
    const diameter=c.holeDiameter??12,wall=1.2,radius=diameter/2+wall,pitch=diameter+wall;
    const {min:outerMin,max:outerMax}=outerSection.bounds();
    let columns=Math.max(1,Math.floor((outerMax[0]-outerMin[0]-wall)/pitch)),rows=Math.max(1,Math.floor((outerMax[1]-outerMin[1]-wall)/pitch));
    // Keep large compartments usable within the existing geometry budget.
    while(columns*rows>100){if(columns>=rows)columns--;else rows--;}
    const holes:Manifold[]=[];
    const cutterHeight=Math.max(height,...walls.flatMap(w=>[w.startHeight,w.endHeight]))+2;
    for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){
     const x=(outerMin[0]+outerMax[0])/2+(col-(columns-1)/2)*pitch,y=(outerMin[1]+outerMax[1])/2+(row-(rows-1)/2)*pitch;
     const circle=keepSection(new wasm.CrossSection([Array.from({length:64},(_,k)=>[x+radius*Math.cos(k*Math.PI/32),y+radius*Math.sin(k*Math.PI/32)] as XY)]));
     const outside=keepSection(circle.subtract(outerSection));
     if(outside.area()>.0001)continue;
     if(holes.length>=100)throw new Error('Слишком много гнёзд. Увеличьте диаметр или уменьшите отсек.');
     holes.push(keep(keep(wasm.Manifold.cylinder(cutterHeight,diameter/2,diameter/2,64)).translate([x,y,1.2])));
    }
    if(!holes.length)throw new Error('Гнездо не помещается. Уменьшите диаметр или увеличьте отсек.');
    insert=keep(insert.subtract(keep(wasm.Manifold.union(holes))));
   }
   if(p.lid&&p.lidDesign?.fit==='inset'){
    const ceiling=walls[0].startHeight-p.floorThickness-lidPlateThickness(p)-.25;
    insert=keep(insert.trimByPlane([0,0,-1],-ceiling));
   }
   insert=tiltOnBase(wasm,p,insert,false,keep);
   emit(insert,`${c.content==='pens'?'pens':c.content==='grid'?'small-items':'cup'}-${i+1}`,'cup',0,[p.floorThickness*lean,0,p.floorThickness]);
   parts[parts.length-1].cellId=c.cellId;
   parts[parts.length-1].color=insertColor(p,c.cellId);
  }
  return parts;
 }finally{for(const section of sections.reverse())section.delete();for(const body of owned.reverse())body.delete();}
}
