import {useEffect,useMemo} from 'react';
import {useThree} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {BufferGeometry,Float32BufferAttribute} from 'three';
export function WorkspaceGrid({width,depth,dark}:{width:number;depth:number;dark:boolean}){
 const lines=useMemo(()=>{
  const extent=Math.ceil((Math.max(width,depth)+100)/50)*50,minor:number[]=[],major:number[]=[];
  for(let n=-extent;n<=extent;n+=10){const points=n%50===0?major:minor;points.push(n,-extent,-.02,n,extent,-.02,-extent,n,-.02,extent,n,-.02);}
  return [minor,major].map(points=>new BufferGeometry().setAttribute('position',new Float32BufferAttribute(points,3)));
 },[width,depth]);
 useEffect(()=>()=>lines.forEach(g=>g.dispose()),[lines]);
 return <group>{lines.map((g,i)=><lineSegments key={i} geometry={g} raycast={()=>{}}><lineBasicMaterial color={dark?(i?'#91a9c4':'#71869b'):(i?'#586c80':'#708394')} transparent opacity={dark?(i?.48:.22):(i?.68:.43)} toneMapped={false} depthWrite={false}/></lineSegments>)}</group>;
}
export function SceneCamera({view,reset}:{view:string;reset:number}){const {camera,size}=useThree();useEffect(()=>{camera.up.set(...(view==='top'?[1,0,0]:[0,1,0]) as [number,number,number]);camera.position.set(...(view==='top'?[0,8,0]:view==='bottom'?[-6.8,-5.2,4.8]:[-6.8,5.2,4.8]) as [number,number,number]);camera.lookAt(0,.45,0);if('zoom'in camera)camera.zoom=Math.min(size.width,size.height)/5.5;camera.updateProjectionMatrix();},[view,reset,size.width,size.height,camera]);return null;}
export function SceneOrbitControls({view,reset,dragging}:{view:string;reset:number;dragging:boolean}){
 return <OrbitControls key={`${view}-${reset}`} makeDefault enabled={!dragging} enableRotate={view!=='top'} enablePan target={[0,.45,0]} minZoom={20} maxZoom={1600} maxPolarAngle={view==='bottom'?Math.PI-.05:Math.PI/2-.05}/>;
}
