import {useEffect,useEffectEvent,useMemo,useRef,useState} from 'react';
import {Canvas,useThree,type ThreeEvent} from '@react-three/fiber';
import {Edges} from '@react-three/drei';
import {BoxGeometry,BufferGeometry,DoubleSide,EdgesGeometry,Float32BufferAttribute,FrontSide,Plane,Raycaster,Vector2,Vector3} from 'three';
import {defaultModelColor} from '../appearance.js';
import {drawerDrop,drawerDragPosition} from '../drawerPlacement.js';
import {MOUNT,MOUNT_EDGE_ERROR} from '../mountingPlate.js';
import {trayRect,type DrawerLayout,type DrawerTray,type TrayBounds} from '../drawer.js';
import type {DrawerMesh,DrawerPreview} from '../drawerPreview.js';
import {decodeSTL,type Point} from '../stl.js';
import {SceneCamera,SceneInspection,SceneOrbitControls,SceneUndersideLight,useUndersideView,WorkspaceGrid,type SceneView} from './SceneNavigation.js';
import {CellBadge} from './SceneSelection.js';

export type DrawerSceneLayer='assembly'|'plate'|'empty';

interface Props {
 layout:DrawerLayout;
 preview?:DrawerPreview;
 bounds:Record<string,TrayBounds>;
 issues:Record<string,string[]>;
 view:SceneView;
 layer:DrawerSceneLayer;
 reset:number;
 showGrid:boolean;
 selected:string;
 onSelect:(id:string)=>void;
 onEdit:(id:string)=>void;
 onMove:(layout:DrawerLayout)=>void;
}

function DrawerPart({part,fallback,invalid,selected}:{part:DrawerMesh;fallback:string;invalid?:boolean;selected?:boolean}){
 const geometry=useMemo(()=>{
  const mesh=new BufferGeometry().setAttribute('position',new Float32BufferAttribute(decodeSTL(part.stl).flat(2),3));
  mesh.computeVertexNormals();
  return mesh;
 },[part.stl]);
 useEffect(()=>()=>geometry.dispose(),[geometry]);
 return <mesh position={part.position} geometry={geometry}>
  <meshStandardMaterial color={invalid?'#c87567':selected?'#dc8a5b':part.color??fallback} roughness={.72}/>
  {selected&&<Edges color={invalid?'#b14d3f':'#b74b14'} raycast={()=>null}/>}
 </mesh>;
}

function DrawerOutline({width,depth,height,showWalls}:{width:number;depth:number;height:number;showWalls:boolean}){
 const frame=useMemo(()=>{
  const box=new BoxGeometry(width,depth,height);
  const edges=new EdgesGeometry(box);
  box.dispose();
  return edges;
 },[width,depth,height]);
 useEffect(()=>()=>frame.dispose(),[frame]);
 return <>
  <mesh position={[width/2,depth/2,-.035]} raycast={()=>{}}>
   <planeGeometry args={[width,depth]}/><meshStandardMaterial color="#d7dfe7" roughness={.9} side={showWalls?DoubleSide:FrontSide}/>
  </mesh>
  {showWalls&&[0,depth].map(y=><mesh key={y} position={[width/2,y,height/2]} raycast={()=>{}}>
   <boxGeometry args={[width,1,height]}/><meshStandardMaterial color="#91a5b8" transparent opacity={.2} depthWrite={false}/>
  </mesh>)}
  {showWalls&&[0,width].map(x=><mesh key={x} position={[x,depth/2,height/2]} raycast={()=>{}}>
   <boxGeometry args={[1,depth,height]}/><meshStandardMaterial color="#91a5b8" transparent opacity={.2} depthWrite={false}/>
  </mesh>)}
  <lineSegments position={[width/2,depth/2,height/2]} geometry={frame} raycast={()=>{}}>
   <lineBasicMaterial color="#8295a7" transparent opacity={.48}/>
  </lineSegments>
 </>;
}

interface Drag extends Pick<DrawerTray,'id'|'x'|'y'|'rotation'> {
 pointer:number;screenX:number;screenY:number;adjustMounting:boolean;moved:boolean;
 start:Vector3;next:DrawerLayout|null;
}

function DrawerSolid({layout,preview,bounds,issues,view,layer,reset,showGrid,selected,onSelect,onEdit,onMove}:Props){
 const {width,depth,height}=layout,underneath=useUndersideView();
 const {camera,gl}=useThree(),canvas=gl.domElement;
 const scale=4.8/Math.max(width,depth,height,100);
 const floor=useMemo(()=>new Plane(new Vector3(0,1,0),0),[]);
 const raycaster=useMemo(()=>new Raycaster(),[]);
 const drag=useRef<Drag|null>(null),[dragging,setDragging]=useState(false);
 const [target,setTarget]=useState<{id:string;x:number;y:number;valid:boolean}|null>(null);
 function finish(cancel=false){
  const active=drag.current;
  drag.current=null;
  setTarget(null);
  setDragging(false);
  if(active&&canvas.hasPointerCapture(active.pointer))canvas.releasePointerCapture(active.pointer);
  if(!cancel&&active?.next)onMove(active.next);
 }
 useEffect(()=>{finish(true);},[layout,view,layer]);
 useEffect(()=>{gl.domElement.style.cursor=dragging?'grabbing':'';return()=>{gl.domElement.style.cursor='';};},[dragging,gl]);
 function start(e:ThreeEvent<PointerEvent>,tray:DrawerTray,adjustMounting:boolean){
  if(e.button!==0||underneath)return;
  const point=e.ray.intersectPlane(floor,new Vector3());
  const {id,x,y,rotation}=tray;
  onSelect(id);
  if(!point)return;
  e.stopPropagation();
  drag.current={id,x,y,rotation,adjustMounting,start:point,pointer:e.pointerId,screenX:e.clientX,screenY:e.clientY,next:null,moved:false};
  setDragging(true);
  canvas.setPointerCapture(e.pointerId);
 }
 function move(e:PointerEvent){
  const active=drag.current;
  if(!active||active.pointer!==e.pointerId)return;
  if(!active.moved&&Math.hypot(e.clientX-active.screenX,e.clientY-active.screenY)<4)return;
  const rect=canvas.getBoundingClientRect();
  raycaster.setFromCamera(new Vector2((e.clientX-rect.left)/rect.width*2-1,1-(e.clientY-rect.top)/rect.height*2),camera);
  const point=raycaster.ray.intersectPlane(floor,new Vector3());
  if(!point)return;
  active.moved=true;
  const dx=(point.x-active.start.x)/scale,dy=(active.start.z-point.z)/scale;
  const b=bounds[active.id];
  const {x,y}=drawerDragPosition(layout,active,dx,dy,b,active.adjustMounting);
  const next=x===active.x&&y===active.y?layout:drawerDrop(layout,active.id,x,y,bounds);
  active.next=next===layout?null:next;
  setTarget({id:active.id,...drawerDragPosition(layout,active,dx,dy,b,true),valid:!!next});
 }
 const pointerMove=useEffectEvent(move);
 const pointerUp=useEffectEvent((e:PointerEvent)=>{
  if(drag.current?.pointer!==e.pointerId)return;
  move(e);
  finish();
 });
 const cancel=useEffectEvent(()=>finish(true));
 useEffect(()=>{
  const movePointer=(e:PointerEvent)=>pointerMove(e);
  const releasePointer=(e:PointerEvent)=>pointerUp(e);
  const cancelPointer=(e:PointerEvent)=>{if(drag.current?.pointer===e.pointerId)cancel();};
  const cancelDrag=()=>cancel();
  const cancelOnEscape=(e:KeyboardEvent)=>{if(e.key==='Escape')cancel();};
  window.addEventListener('pointermove',movePointer,true);
  window.addEventListener('pointerup',releasePointer,true);
  window.addEventListener('pointercancel',cancelPointer,true);
  canvas.addEventListener('lostpointercapture',cancelPointer);
  window.addEventListener('blur',cancelDrag);
  window.addEventListener('keydown',cancelOnEscape);
  return()=>{
   window.removeEventListener('pointermove',movePointer,true);
   window.removeEventListener('pointerup',releasePointer,true);
   window.removeEventListener('pointercancel',cancelPointer,true);
   canvas.removeEventListener('lostpointercapture',cancelPointer);
   window.removeEventListener('blur',cancelDrag);
   window.removeEventListener('keydown',cancelOnEscape);
  };
 },[canvas]);
 return <>
  <SceneCamera view={view} reset={reset}/><SceneUndersideLight view={view}/>
  <ambientLight intensity={1.25}/><directionalLight position={[-3,6,4]} intensity={1.55}/>
  <directionalLight position={[4,3,-4]} intensity={.7}/>
  <group rotation={[-Math.PI/2,0,0]} scale={scale}>
   {showGrid&&<WorkspaceGrid width={width} depth={depth} dark={document.documentElement.dataset.theme==='dark'}/>}
   <group position={[-width/2,-depth/2,0]}>
    <DrawerOutline width={width} depth={depth} height={height} showWalls={layer==='empty'}/>
    {layer!=='empty'&&preview?.plate.map(part=><DrawerPart key={part.name} part={part} fallback="#617e9a"/>)}
    {layer==='assembly'&&layout.trays.map((tray,index)=>{
     const item=preview?.trays.find(item=>item.id===tray.id),b=bounds[tray.id];
     if(!item?.origin||!b||item.pose.rotation!==tray.rotation)return null;
     const moving=target?.id===tray.id?target:null;
     const chosen=selected===tray.id;
     const invalid=moving?!moving.valid:!!(item.mountingError||issues[tray.id]?.length);
     const x=moving?.x??tray.x,y=moving?.y??tray.y,dx=x-item.pose.x,dy=y-item.pose.y;
     // Old sockets may no longer line up when a wall stop is off the former peg grid.
     const shiftedOffGrid=[dx,dy].some(offset=>Math.abs(offset-Math.round(offset/MOUNT.pitch)*MOUNT.pitch)>.001);
     const lift=item.mounted&&(moving||shiftedOffGrid)?5:0;
     const origin:Point=[item.origin[0]+dx,item.origin[1]+dy,item.origin[2]+lift];
     const rect=trayRect({...tray,x,y},b);
     const adjustMounting=item.mountingError===MOUNT_EDGE_ERROR;
     return <group key={tray.id} onPointerDown={e=>start(e,tray,adjustMounting)}
      onClick={e=>{e.stopPropagation();onSelect(tray.id);}} onDoubleClick={e=>{e.stopPropagation();onEdit(tray.id);}}>
      <group position={origin} rotation={[0,0,tray.rotation*Math.PI/180]}>
       {item.meshes.map(part=><DrawerPart key={part.name} part={part} fallback={defaultModelColor} invalid={invalid} selected={chosen}/>)}
      </group>
      <CellBadge number={index+1} selected={chosen} size={Math.max(7,Math.min(width,depth)/20)}
       position={[x+rect.width/2,y+rect.depth/2,b.height+10+lift]} onClick={()=>onSelect(tray.id)}
       onDragStart={e=>start(e,tray,adjustMounting)}/>
     </group>;
    })}
   </group>
  </group>
  <SceneOrbitControls view={view} reset={reset} dragging={dragging}/>
 </>;
}

export function DrawerScene(props:Props){
 return <Canvas orthographic frameloop="demand" dpr={[1,2]} camera={{position:[-6.8,5.2,4.8],zoom:70,near:.01,far:100}}>
  <SceneInspection><DrawerSolid {...props}/></SceneInspection>
 </Canvas>;
}
