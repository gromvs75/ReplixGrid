import {useEffect,useMemo} from 'react';
import {BufferGeometry,EdgesGeometry,Float32BufferAttribute,Color} from 'three';
import {previewEdgeColor,previewWallColor} from '../previewAppearance.js';
/** Derived display geometry: never mutate the kernel mesh used for export or picking. */
export function PreviewSurface({geometry,color,up='z'}:{geometry:BufferGeometry;color:string;up?:'y'|'z'}){
 const shaded=useMemo(()=>{const copy=geometry.clone();if(!copy.getAttribute('normal'))copy.computeVertexNormals();const normals=copy.getAttribute('normal'),base=new Color(color),side=previewWallColor(color),colors:number[]=[];for(let i=0;i<normals.count;i++){const vertical=Math.abs(up==='z'?normals.getZ(i):normals.getY(i)),c=side.clone().lerp(base,vertical);colors.push(c.r,c.g,c.b);}copy.setAttribute('color',new Float32BufferAttribute(colors,3));return copy;},[geometry,color,up]);
 const edges=useMemo(()=>new EdgesGeometry(geometry,25),[geometry]);
 useEffect(()=>()=>shaded.dispose(),[shaded]);useEffect(()=>()=>edges.dispose(),[edges]);
 return <><primitive object={shaded} attach="geometry"/><meshStandardMaterial vertexColors roughness={.65} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1}/><lineSegments geometry={edges} renderOrder={5} raycast={()=>null}><lineBasicMaterial color={previewEdgeColor(color)} toneMapped={false} depthTest depthWrite={false}/></lineSegments></>;
}
