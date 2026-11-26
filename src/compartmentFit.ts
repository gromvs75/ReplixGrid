import {lidPlateThickness} from './accessories.js';
import {regions,type Region} from './editor.js';
import {footprintContour} from './footprint.js';
import {GRIDFINITY,gridfinityFloorRadius,gridfinityLidBaseZ,gridfinitySize,type GridfinityProject} from './gridfinity.js';
import {stackingLipContours} from './gridfinityLip.js';
import {gridfinityCavities} from './gridfinityPreview.js';
import {INNER_CORNER_OVERLAP,innerCornerPatches} from './innerCornerGeometry.js';
import {resolveWalls,type Project,type Wall} from './model.js';
import {clipRectangle,type XY} from './rounding.js';

export interface FitSpace {outline:XY[];height:number}
export interface FitObject {length:number;width:number;height:number;gap:number}
const tolerance=1e-7;

/** Clip a polygon to the side of an edge facing the cavity. */
function clipEdge(points:XY[],a:XY,b:XY,margin:(nx:number,ny:number)=>number){
 const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);
 if(length<tolerance)return points;
 const nx=-dy/length,ny=dx/length,offset=margin(nx,ny);
 const distance=(p:XY)=>nx*(p[0]-a[0])+ny*(p[1]-a[1])-offset;
 const result:XY[]=[];
 for(let i=0;i<points.length;i++){
  const p=points[i],q=points[(i+1)%points.length],dp=distance(p),dq=distance(q);
  if(dp>=-tolerance)result.push(p);
  if((dp>=-tolerance)!==(dq>=-tolerance)){
   const fraction=Math.max(0,Math.min(1,dp/(dp-dq)));
   result.push([p[0]+fraction*(q[0]-p[0]),p[1]+fraction*(q[1]-p[1])]);
  }
 }
 return result;
}

function clipToOutline(points:XY[],outline:XY[],margin:(nx:number,ny:number)=>number){
 return outline.reduce((remaining,a,i)=>clipEdge(remaining,a,outline[(i+1)%outline.length],margin),points);
}

function boundsWalls(p:Project,r:Region){
 const walls=resolveWalls(p);
 return walls.filter((w,index)=>{
  if(p.footprint&&index<4)return true;
  const [side,along,span]=w.axis==='x'?[r.y,r.x,r.width]:[r.x,r.y,r.depth];
  const gapAxis=w.axis==='x'?r.depth:r.width;
  const [wallSide,wallAlong]=w.axis==='x'?[w.y,w.x]:[w.x,w.y];
  return wallAlong<along+span&&wallAlong+w.length>along&&
   (Math.abs(wallSide+w.thickness-side)<tolerance||Math.abs(wallSide-side-gapAxis)<tolerance);
 });
}

function minimumRim(w:Wall){
 const height=Math.min(w.startHeight,w.endHeight);
 const wave=w.transitionStyle==='zigzag'||w.transitionStyle==='wavy'&&w.wavelength!==undefined;
 return wave?height-Math.min(4,(w.wavelength??24)/6,Math.max(0,(height-(w.minTop??.8))*.25)):height;
}

export function organizerFitSpace(p:Project,id:string):FitSpace|null{
 const r=regions(p).find(({cell})=>cell.id===id&&!cell.split);
 if(!r||p.tilt||p.capsuleSlope||p.steppedWalls||p.stack||p.footprint==='honeycomb'||p.cups?.some(c=>c.cellId===id))return null;
 let outline=clipRectangle(footprintContour(p,-p.wallThickness),r.x,r.y,r.width,r.depth);
 for(const {corner:[x,y],patch} of innerCornerPatches(p)){
  if(x<r.x-tolerance||x>r.x+r.width+tolerance||y<r.y-tolerance||y>r.y+r.depth+tolerance)continue;
  // The exported material patch is the corner followed by a concave arc.
  // Reversing its arc edges yields the limits of the usable convex cavity.
  const arc=patch.slice(0,-1).reverse();
  for(let i=1;i<arc.length;i++)outline=clipEdge(outline,arc[i-1],arc[i],()=>INNER_CORNER_OVERLAP);
 }
 const rim=Math.min(...boundsWalls(p,r).map(minimumRim));
 const lid=p.lid&&p.lidDesign?.fit==='inset'?resolveWalls(p)[0].startHeight-lidPlateThickness(p):Infinity;
 const height=Math.min(rim,lid)-p.floorThickness;
 return outline.length&&Number.isFinite(height)?{outline,height:Math.max(0,height)}:null;
}

export function gridfinityFitSpace(p:GridfinityProject,id:string):FitSpace|null{
 if(p.sideGrips||p.label&&(!p.lid||p.lid==='none'))return null;
 const r=gridfinityCavities(p).find(({cell})=>cell.id===id);
 if(!r)return null;
 const floorRadius=gridfinityFloorRadius(p,r.width,r.depth);
 let outline=floorRadius?clipToOutline(r.points,r.points,()=>floorRadius):r.points;
 if(p.stackingLip){
  const [width,depth]=gridfinitySize(p,'tray');
  for(const section of stackingLipContours(width,depth,p.heightUnits*7)){
   outline=clipToOutline(outline,section.points,()=>0);
  }
 }
 const top=p.lid&&p.lid!=='none'?gridfinityLidBaseZ(p):p.heightUnits*7;
 return outline.length?{outline,height:top-GRIDFINITY.floorHeight}:null;
}

export function checkCompartmentFit(space:FitSpace,object:FitObject){
 const {length,width,height,gap}=object,outline=space.outline;
 const centre=(points:XY[]):XY=>[
  points.reduce((n,p)=>n+p[0],0)/points.length,
  points.reduce((n,p)=>n+p[1],0)/points.length,
 ];
 const position=(length:number,width:number)=>{
  const centres=clipToOutline(outline,outline,(nx,ny)=>Math.abs(nx)*(length/2+gap)+Math.abs(ny)*(width/2+gap));
  return centres.length?centre(centres):null;
 };
 const direct=position(length,width),turned=direct?null:position(width,length);
 const footprint=!!(direct||turned),heightFits=height+gap<=space.height+tolerance;
 return {footprint,heightFits,rotated:!!turned,center:direct??turned??centre(outline),
  length:turned?width:length,width:turned?length:width};
}
