import {type ThreeEvent,useFrame} from '@react-three/fiber';
import {useEffect,useMemo,useRef} from 'react';
import {Edges} from '@react-three/drei';
import {CanvasTexture,Shape,DoubleSide,Sprite,Vector3} from 'three';
import {useUndersideView} from './SceneNavigation.js';
export function EndMarker({label,position}:{label:string;position:[number,number,number]}){
 const underneath=useUndersideView();
 const sprite=useRef<Sprite>(null),world=useMemo(()=>new Vector3(),[]),parentScale=useMemo(()=>new Vector3(),[]);
 const texture=useMemo(()=>{const canvas=document.createElement('canvas');canvas.width=80;canvas.height=220;const c=canvas.getContext('2d')!;c.strokeStyle='#b86b29';c.fillStyle='#b86b29';c.lineWidth=3;c.beginPath();c.moveTo(40,207);c.lineTo(40,98);c.stroke();c.beginPath();c.arc(40,207,9,0,Math.PI*2);c.fill();c.fillStyle='#fff8ed';c.fillRect(7,9,66,66);c.strokeStyle='#bd834c';c.strokeRect(7,9,66,66);c.fillStyle='#8d501d';c.font='38px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(label,40,43);return new CanvasTexture(canvas);},[label]);
 useEffect(()=>()=>texture.dispose(),[texture]);
 useFrame(state=>{const node=sprite.current;if(!node)return;node.getWorldPosition(world);node.parent?.getWorldScale(parentScale);const view=state.viewport.getCurrentViewport(state.camera,world);node.scale.set(view.width*24/state.size.width/parentScale.x,view.height*66/state.size.height/parentScale.y,1);});
 return underneath?null:<sprite ref={sprite} position={position} center={[.5,0]} renderOrder={31} raycast={()=>null}><spriteMaterial map={texture} depthTest={false} depthWrite={false}/></sprite>;
}
export function CellBadge({number,selected,position,onClick,size=7,onDragStart}:{number:number|string;selected:boolean;position:[number,number,number];onClick:()=>void;size?:number;onDragStart?:(e:ThreeEvent<PointerEvent>)=>void}){
  const underneath=useUndersideView();
  const texture=useMemo(()=>{const canvas=document.createElement('canvas');canvas.width=canvas.height=96;const c=canvas.getContext('2d')!;c.fillStyle=selected?'#fff3d9':'#ecf3e7';c.strokeStyle=selected?'#c38b50':'#a0b79c';c.lineWidth=3;c.beginPath();c.arc(48,48,42,0,Math.PI*2);c.fill();c.stroke();c.fillStyle=selected?'#97622f':'#5b795e';c.font='500 38px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(String(number),48,49);return new CanvasTexture(canvas);},[number,selected]);
  useEffect(()=>()=>texture.dispose(),[texture]);
  return underneath?null:<sprite renderOrder={30} position={position} scale={[size,size,1]} onPointerDown={e=>{e.stopPropagation();onDragStart?.(e);}} onClick={e=>{e.stopPropagation();onClick();}}><spriteMaterial map={texture} depthTest={false} depthWrite={false}/></sprite>;
}
export function CellFloor({points,z,selected,onSelect,color,overlay=false}:{overlay?:boolean;color:string;points:[number,number][];z:number;selected:boolean;onSelect:()=>void}){
  const shape=useMemo(()=>{const s=new Shape();points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();return s;},[points]);
  return <mesh position={[0,0,z]} onPointerDown={e=>{e.stopPropagation();onSelect();}} onClick={e=>e.stopPropagation()}><shapeGeometry args={[shape]}/><meshStandardMaterial color={selected?'#dcebd3':color} roughness={1} polygonOffset={overlay} polygonOffsetFactor={-1} polygonOffsetUnits={-1}/></mesh>;
}

export function DividerSurface({selected,hovered,color,invisible=false,overlay=false}:{selected:boolean;hovered:boolean;color:string;invisible?:boolean;overlay?:boolean}){
 const underneath=useUndersideView();
 return <><meshStandardMaterial side={DoubleSide} transparent={invisible} opacity={invisible?(selected?.38:hovered?.16:0):1} depthTest={underneath||!selected} depthWrite={!invisible&&!selected} color={selected||hovered?'#dc8a5b':color} roughness={.4} metalness={.03} polygonOffset={overlay} polygonOffsetFactor={-2} polygonOffsetUnits={-2}/>{selected&&!underneath&&<Edges color="#b74b14" renderOrder={21} depthTest={false}/>}</>;
}
