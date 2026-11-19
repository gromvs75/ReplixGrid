import {previewEdgeColor,previewWallColor} from '../previewAppearance.js';
import {useEffect,useMemo} from 'react';
import {BufferGeometry,Float32BufferAttribute,Color} from 'three';
import {decodeSTL} from '../stl.js';
import {gridfinityCavities} from '../gridfinityPreview.js';
import type {GridfinityProject} from '../gridfinity.js';

// Preview-only trial. Disable this flag to restore the previous presentation.
export const gridfinityVisualGuide=true;
export function gridfinityWallColor(color:string){return gridfinityVisualGuide?previewWallColor(color):new Color(color);}
/** Cavity rims remain visible from above, with depth testing to hide occluded edges. */
export function GridfinityCavityEdges({project,color,stl}:{project:GridfinityProject;color:string;stl?:ArrayBuffer}){
 const geometry=useMemo(()=>{
  const vertices:number[]=[];
  if((project.frontNotch||project.pairedNotches)&&stl){
   // Follow the physical edge through the notch rather than drawing across its opening.
   const top=project.heightUnits*7;
   for(const tri of decodeSTL(stl)){
    const rim=tri.filter(v=>Math.abs(v[2]-top)<.001);
    if(rim.length===2&&tri.some(v=>v[2]<top-.001))for(const [x,y,z] of rim)vertices.push(x,y,z+.035);
   }
  }else for(const cavity of gridfinityCavities(project))for(let i=0;i<cavity.points.length;i++){
   const a=cavity.points[i],b=cavity.points[(i+1)%cavity.points.length];
   vertices.push(a[0],a[1],project.heightUnits*7+.035,b[0],b[1],project.heightUnits*7+.035);
  }
  return new BufferGeometry().setAttribute('position',new Float32BufferAttribute(vertices,3));
 },[project,stl]);
 useEffect(()=>()=>geometry.dispose(),[geometry]);
 const ink=useMemo(()=>previewEdgeColor(color),[color]);
 if(!gridfinityVisualGuide)return null;
 return <lineSegments geometry={geometry} renderOrder={5} raycast={()=>null}><lineBasicMaterial color={ink} toneMapped={false} depthTest depthWrite={false}/></lineSegments>;
}
