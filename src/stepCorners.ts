import type {Manifold,ManifoldToplevel} from 'manifold-3d';
import type {Project,Wall} from './model.js';

/** Round exposed convex corners where a stepped rectangular wall meets a divider. */
export function roundStepCorners(wasm:ManifoldToplevel,p:Project,walls:Wall[],body:Manifold,keep:(m:Manifold)=>Manifold){
 const requested=p.cornerRadius??0;
 if(!p.steppedWalls||p.footprint||requested<=0)return body;
 const chamfer=p.cornerStyle==='chamfer';
 const sections:Manifold[]=[],cutters:Manifold[]=[];
 // The small overlap is confined to the inside of an existing wall, avoiding
 // disconnected solids at the start and end of a newly exposed corner.
 const overlap=.01;
 const wedge=(r:number,x:number,y:number,sx:number,sy:number,z0:number,z1:number)=>{
  const square=wasm.CrossSection.square([r,r]),disc=wasm.CrossSection.circle(r,64),shifted=disc.translate([r,r]);
  const local=chamfer?new wasm.CrossSection([[[0,0],[r,0],[0,r]]]):square.subtract(shifted);let transformed=local;
  try{
   if(sx<0){const next=transformed.mirror([1,0]);if(transformed!==local)transformed.delete();transformed=next;}
   if(sy<0){const next=transformed.mirror([0,1]);if(transformed!==local)transformed.delete();transformed=next;}
   const placed=transformed.translate([x,y]);
   try{return keep(keep(placed.extrude(z1-z0)).translate([0,0,z0]));}finally{placed.delete();}
  }finally{if(transformed!==local)transformed.delete();local.delete();shifted.delete();disc.delete();square.delete();}
 };
 for(const side of ['front','back'] as const){
  const wall=walls.find(w=>w.id===side)!,steps=wall.stepPoints;if(!steps)continue;
  for(let i=1;i<steps.length;i++){
   const [x,next]=steps[i],previous=steps[i-1][1];if(Math.abs(next-previous)<.001)continue;
   const higherRight=next>previous,sx=higherRight?1:-1,sy=side==='front'?1:-1;
   const divider=walls.slice(4).find(w=>w.axis==='y'&&Math.abs(w.x+w.thickness/2-x)<.001&&(side==='back'?w.y+w.length>=p.depth-p.wallThickness/2-1e-6:w.y<=p.wallThickness/2+1e-6));if(!divider)continue;
   const boundary=higherRight?divider.x:divider.x+divider.thickness;
   const available=higherRight?(steps[i+1]?.[0]??p.width)-boundary:boundary-(steps[i-1]?.[0]??0);
   const r=Math.min(requested,p.depth/2,available/2);
   if(r<=.05)continue;
   const bottom=Math.min(previous,next),top=Math.max(previous,next);
   const outerY=side==='front'?0:p.depth;
   cutters.push(wedge(r,boundary,outerY,sx,sy,bottom,top+overlap));
   const innerRadius=r-(chamfer?2-Math.SQRT2:1)*p.wallThickness;
   // Reinstate only the inner offset needed to preserve the thickness of this
   // newly exposed corner. The independent compartment radius is added by
   // roundInnerCorners; the outer cutter below keeps both inside the contour.
   if(innerRadius>0){
    const insideX=boundary+sx*p.wallThickness,insideY=outerY+sy*p.wallThickness;
    sections.push(wedge(innerRadius,insideX,insideY,sx,sy,bottom-overlap,top));
   }
  }
 }
 let result=body;
 if(sections.length)result=keep(result.add(keep(wasm.Manifold.union(sections))));
 if(cutters.length)result=keep(result.subtract(keep(wasm.Manifold.union(cutters))));
 return result;
}
