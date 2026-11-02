import {shellGap} from './reliefSize.js';
import type {Manifold,ManifoldToplevel} from 'manifold-3d';
import {footprintContour,honeyCells,honeyEdgeOwner,offsetContour} from './footprint.js';
import type {Project,Wall} from './model.js';
import {contourHeight,honeyCellHeight} from './shell.js';
import {roundedCavity} from './innerCorners.js';
import type {XY} from './rounding.js';
export function contourBody(wasm:ManifoldToplevel,p:Project,walls:Wall[],shell:boolean,keep:(m:Manifold)=>Manifold){
  const off=shell?shellGap(p)+p.shell!.thickness:0,thickness=shell?p.shell!.thickness:p.wallThickness;
  const outer=footprintContour(p,off),inner=footprintContour(p,off-thickness);
  const ring=(a:XY[],b:XY[],heights?:number[])=>{
    const verts:number[]=[],faces:number[]=[];
    a.forEach(([x,y])=>verts.push(x,y,0));b.forEach(([x,y])=>verts.push(x,y,0));
    a.forEach(([x,y],i)=>verts.push(x,y,heights?.[i]??contourHeight(p,walls,x,y)));
    b.forEach(([x,y],i)=>verts.push(x,y,heights?.[i]??contourHeight(p,walls,x,y)));
    const n=a.length,quad=(a:number,b:number,c:number,d:number)=>faces.push(a,b,c,a,c,d);
    for(let i=0;i<n;i++){const j=(i+1)%n;quad(i,j,2*n+j,2*n+i);quad(n+j,n+i,3*n+i,3*n+j);quad(2*n+i,2*n+j,3*n+j,3*n+i);quad(j,i,n+i,n+j);}
    return keep(new wasm.Manifold(new wasm.Mesh({numProp:3,vertProperties:new Float32Array(verts),triVerts:new Uint32Array(faces)})));
  };
  if(p.steppedWalls&&(p.footprint==='circle'||p.footprint==='oval')){
    // Intersect a constant-height annulus with vertical bands. This creates
    // actual vertical risers at the partition positions, without interpolating
    // heights between vertices of the curved outline.
    const steps=walls.find(w=>w.id==='front')!.stepPoints!;
    const solids:Manifold[]=[];
    for(let i=0;i<steps.length;i++){
      const lo=i===0?-off-1:steps[i][0],hi=i+1<steps.length?steps[i+1][0]:p.width+off+1;
      const annulus=keep(wasm.Manifold.extrude([outer,inner.slice().reverse()],steps[i][1]));
      const clip=keep(wasm.Manifold.cube([hi-lo,p.depth+2*off+2,steps[i][1]+1]).translate([lo,-off-1,0]));
      solids.push(keep(annulus.intersect(clip)));
    }
    let result=keep(wasm.Manifold.union(solids));
    if(!shell)result=keep(result.add(keep(wasm.Manifold.extrude([outer],p.floorThickness))));
    return result;
  }
  if(p.footprint==='honeycomb'&&!shell){
    // Expand ownership by half a wall: a raised cell owns the entire shared
    // wall, rather than only its half. Subtract all cavities after the union.
    const boundary=new wasm.CrossSection([outer]);
    const interior=new wasm.CrossSection([inner]);
    try{
      const masses:Manifold[]=[],holes:Manifold[]=[];
      const maxHeight=Math.max(p.height,...walls.flatMap(w=>[w.startHeight,w.endHeight]),...(p.honeycombHeights??[]).map(h=>h??0))+1;
      const cells=honeyCells(p);
      for(const [i,cell] of cells.entries()){
        const expanded=new wasm.CrossSection([offsetContour(cell,p.wallThickness/2)]);
        const clipped=expanded.intersect(boundary);
        const inset=new wasm.CrossSection([offsetContour(cell,-p.wallThickness/2)]);
        const cavity=inset.intersect(interior);
        try{
          let mass=keep(keep(clipped.extrude(1)).warp(v=>{v[2]*=honeyCellHeight(p,walls,i,v[0],v[1]);}));
          // Above a three-way junction this becomes an exposed convex corner.
          // Match its outside radius to the cavity radius + wall thickness;
          // retain the full junction below both neighboring wall tops.
          if(p.innerCornerRadius)for(let corner=0;corner<cell.length;corner++){
            const vertex=cell[corner];
            const neighbors=cells.map((poly,index)=>({poly,index})).filter(({poly,index})=>index!==i&&poly.some(v=>Math.hypot(v[0]-vertex[0],v[1]-vertex[1])<1e-5));
            if(neighbors.length!==2)continue;
            const expandedPoly=offsetContour(cell,p.wallThickness/2);
            const rounded=new wasm.CrossSection([roundedCavity(expandedPoly,cell.map((_,k)=>k===corner?p.innerCornerRadius!+p.wallThickness:0))]);
            const wedge=expanded.subtract(rounded);
            try{
              const cutter=keep(keep(wedge.extrude(1)).warp(v=>{
                const low=Math.max(...neighbors.map(n=>honeyCellHeight(p,walls,n.index,v[0],v[1])));
                v[2]=low+v[2]*Math.max(.001,maxHeight-low);
              }));
              mass=keep(mass.subtract(cutter));
            }finally{wedge.delete();rounded.delete();}
          }
          masses.push(mass);
          for(const poly of cavity.toPolygons())holes.push(keep(keep(wasm.Manifold.extrude([roundedCavity(poly,p.innerCornerRadius??0)],maxHeight)).translate([0,0,p.floorThickness])));
        }finally{expanded.delete();clipped.delete();inset.delete();cavity.delete();}
      }
      return keep(keep(wasm.Manifold.union(masses)).subtract(keep(wasm.Manifold.union(holes))));
    }finally{boundary.delete();interior.delete();}
  }
  const base=footprintContour(p);
  // Separate edge prisms allow a vertical step where two cell heights differ.
  // A single annulus interpolates across that step and raises the low neighbor.
  const edgePrism=(i:number)=>{
    const j=(i+1)%base.length,owner=honeyEdgeOwner(p,base[i],base[j]);
    const h0=honeyCellHeight(p,walls,owner,...base[i]),h1=honeyCellHeight(p,walls,owner,...base[j]);
    const points=[outer[i],outer[j],inner[j],inner[i]],heights=[h0,h1,h1,h0];
    const verts=points.flatMap(([x,y])=>[x,y,0]).concat(points.flatMap(([x,y],k)=>[x,y,heights[k]]));
    const faces=[0,2,1,0,3,2,4,5,6,4,6,7];
    for(let k=0;k<4;k++){const l=(k+1)%4;faces.push(k,l,l+4,k,l+4,k+4);}
    return keep(new wasm.Manifold(new wasm.Mesh({numProp:3,vertProperties:new Float32Array(verts),triVerts:new Uint32Array(faces)})));
  };
  let body=p.footprint==='honeycomb'?edgePrism(0):ring(outer,inner,base.map(([x,y])=>contourHeight(p,walls,x,y)));
  if(p.footprint==='honeycomb')for(let i=1;i<base.length;i++)body=keep(body.add(edgePrism(i)));
  if(!shell){
    body=keep(body.add(keep(wasm.Manifold.extrude([outer],p.floorThickness))));
    if(p.footprint==='honeycomb')for(const [i,cell] of honeyCells(p).entries())body=keep(body.add(ring(cell,offsetContour(cell,-p.wallThickness/2),cell.map(([x,y])=>honeyCellHeight(p,walls,i,x,y)))));
  }
  return body;
}
