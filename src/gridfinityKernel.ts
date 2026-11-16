import Module,{type Manifold,type Vec3} from 'manifold-3d';
import {GRIDFINITY as G,validateGridfinity,gridfinityRadii,gridfinityInnerRadiusLimit,gridfinityRegions,type GridfinityProject} from './gridfinity.js';
import {roundedContour} from './rounding.js';
import {encodeSTL,decodeSTL,inspectSurface,weldNearVertices,removeCollapsedFaces,type Triangle,type Point} from './stl.js';
let modulePromise:ReturnType<typeof Module>|undefined;

/** Independent solid construction using the MIT reference's mating profile. */
export async function buildGridfinity(input:GridfinityProject,part:'tray'|'plate'){
  const p=validateGridfinity(input);
  if(part!=='tray'&&part!=='plate')throw Error('Invalid Gridfinity part');
  const wasm=await(modulePromise??=Module());wasm.setup();
  const owned:Manifold[]=[],keep=(m:Manifold)=>{owned.push(m);return m;};
  const contour=(w:number,d:number,r:number,x=0,y=0)=>roundedContour(w,d,r,x,y).map(v=>v.map(n=>Math.round(n*1e8)/1e8) as [number,number]);
  const rounded=(w:number,d:number,r:number,h:number,x=0,y=0,z=0)=>keep(wasm.Manifold.extrude([contour(w,d,r,x,y)],h).translate([0,0,z]));
  // Constant corner centres; both chamfers expand at exactly 45 degrees.
  const foot=(cx:number,cy:number,clearance=0,zOffset=0)=>{
    const sections:[[number,number],[number,number],[number,number],[number,number]]=[[0,0],[.8,.8],[2.6,.8],[4.75,2.95]];
    const solids:Manifold[]=[];
    for(let i=1;i<sections.length;i++){
      const points:Vec3[]=sections.slice(i-1,i+1).flatMap(([z,spread])=>{
        const size=35.6+2*(spread+clearance),r=.8+spread+clearance;
        return contour(size,size,r,cx-size/2,cy-size/2).map(([x,y])=>[x,y,z+zOffset] as Vec3);
      });
      solids.push(keep(wasm.Manifold.hull(points)));
    }
    if(clearance)solids.push(rounded(41.5+2*clearance,41.5+2*clearance,3.75+clearance,.2,cx-20.75-clearance,cy-20.75-clearance,zOffset+4.75));
    return keep(wasm.Manifold.union(solids));
  };
  try{
    let body:Manifold;
    if(part==='tray'){
      const w=p.columns*42-.5,d=p.rows*42-.5,h=p.heightUnits*7;
      const {outerRadius,innerRadius}=gridfinityRadii(p);
      body=rounded(w,d,outerRadius,h-G.footHeight,0,0,G.footHeight);
      // Clip each cavity to the inset outer contour, preserving the outer wall.
      const envelope=rounded(w-2*p.wall,d-2*p.wall,Math.max(.2,outerRadius-p.wall),h-G.floorHeight+.1,p.wall,p.wall,G.floorHeight);
      const cuts:Manifold[]=[];
      const radius=Math.min(innerRadius,gridfinityInnerRadiusLimit(p));
      for(const r of gridfinityRegions(p).filter(r=>!r.cell.split)){
        const cavity=rounded(r.width,r.depth,radius,h-G.floorHeight+.1,r.x,r.y,G.floorHeight);
        cuts.push(keep(cavity.intersect(envelope)));
      }
      body=keep(body.subtract(keep(wasm.Manifold.union(cuts))));
      const additions=[body];
      for(let x=0;x<p.columns;x++)for(let y=0;y<p.rows;y++)additions.push(foot(20.75+x*42,20.75+y*42));
      body=keep(wasm.Manifold.union(additions));
    }else{
      body=rounded(p.columns*42,p.rows*42,4,G.plateFloor+G.footHeight);
      const cuts:Manifold[]=[];
      for(let x=0;x<p.columns;x++)for(let y=0;y<p.rows;y++)cuts.push(foot(21+x*42,21+y*42,p.clearance,G.plateFloor));
      body=keep(body.subtract(keep(wasm.Manifold.union(cuts))));
    }
    body=keep(body.simplify(.001));
    if(body.status()!=='NoError')throw Error('Gridfinity geometry failed');
    const components=body.decompose();components.forEach(keep);
    if(components.length!==1)throw Error('Disconnected Gridfinity solid');
    const mesh=body.getMesh(),triangles:Triangle[]=[];
    for(let i=0;i<mesh.triVerts.length;i+=3)triangles.push([0,1,2].map(j=>{
      const k=mesh.triVerts[i+j]*mesh.numProp;return [mesh.vertProperties[k],mesh.vertProperties[k+1],mesh.vertProperties[k+2]] as Point;
    }) as Triangle);
    const stl=encodeSTL(removeCollapsedFaces(weldNearVertices(triangles,.00001))),inspection=inspectSurface(decodeSTL(stl));
    if(Math.abs(inspection.volume-body.volume())>Math.max(.01,body.volume()*1e-5))throw Error('Gridfinity STL volume mismatch');
    return {stl,inspection};
  }finally{owned.reverse().forEach(m=>m.delete());}
}
