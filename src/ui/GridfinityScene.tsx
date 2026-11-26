import {shelfAngle,tagOrigin,lidTagOrigin,tagThickness} from '../gridfinityLabel.js';
import {previewEdgeColor} from '../previewAppearance.js';
import {stackingLipPositions} from '../gridfinityLip.js';
import {GridfinityCavityEdges,gridfinityWallColor} from './GridfinityVisualGuide.js';
import {SceneCamera,SceneInspection,SceneOrbitControls,SceneUndersideLight,WorkspaceGrid,useUndersideView,type SceneView} from './SceneNavigation.js';
import {CellBadge,CellFloor,EndMarker,DividerSurface} from './SceneSelection.js';
import {gridfinityCavities,gridfinityLowerPositions} from '../gridfinityPreview.js';
import {roundedContour} from '../rounding.js';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Canvas,useThree,type ThreeEvent} from '@react-three/fiber';
import {BufferGeometry,Color,Float32BufferAttribute,Group,Plane,Vector3,Shape,Path,ExtrudeGeometry} from 'three';
import {decodeSTL} from '../stl.js';
import {hasGridfinityLid,gridfinityLidBaseZ,lidDeckTop,gridfinityColor,gridfinityRegions,gridfinitySize,gridfinityRadii,type GridfinityProject} from '../gridfinity.js';
import {gridfinityPick,gridfinityDrag} from '../gridfinityInteraction.js';
import {t} from '../i18n.js';
type Props={tag?:ArrayBuffer;lid?:ArrayBuffer;project:GridfinityProject;part:'tray'|'plate';stl:ArrayBuffer;selected:string;view:SceneView;reset:number;showGrid:boolean;busy:boolean;onSelect:(id:string)=>void;onChange:(p:GridfinityProject)=>void};
export function GridfinityEditableSolid({project:p,part,stl,selected,busy,onSelect,onChange,onDragging,covered=false}:{covered?:boolean;project:GridfinityProject;part:'tray'|'plate';stl:ArrayBuffer;selected:string;busy:boolean;onSelect:(id:string)=>void;onChange:(p:GridfinityProject)=>void;onDragging:(value:boolean)=>void}){
 const underneath=useUndersideView();
 const model=useRef<Group>(null);
 const [hovered,setHovered]=useState<string|null>(null);
 const [draft,setDraft]=useState<GridfinityProject|null>(null);
 const drag=useRef<{base:GridfinityProject;next:GridfinityProject;id:string;start:Vector3;axis:'x'|'y';plane:Plane;pointer:number}|null>(null);
 const [w,d]=gridfinitySize(p,part),h=p.heightUnits*7;
 const lip=useMemo(()=>{
   if(part!=='tray'||!p.stackingLip)return null;
   const g=new BufferGeometry().setAttribute('position',new Float32BufferAttribute(stackingLipPositions(w,d,h,false),3));
   g.computeVertexNormals();return g;
 },[part,p.stackingLip,w,d,h]);
 useEffect(()=>()=>lip?.dispose(),[lip]);
 const exact=part==='tray'&&!draft&&(!!p.floorRadius||!!p.frontNotch||!!p.pairedNotches||!!p.sideGrips||!!p.label&&!hasGridfinityLid(p));
 const geometry=useMemo(()=>{const g=new BufferGeometry().setAttribute('position',new Float32BufferAttribute((part==='plate'||(exact&&p.pairedNotches))?decodeSTL(stl).flat(2):exact?decodeSTL(stl).filter(tri=>!tri.every(v=>Math.abs(v[2]-7)<1e-6)).flat(2):gridfinityLowerPositions(stl),3));g.computeVertexNormals();return g;},[stl,part,exact,p.pairedNotches]);
 useEffect(()=>()=>geometry.dispose(),[geometry]);
 const finish=(cancel=false)=>{const state=drag.current;drag.current=null;onDragging(false);setDraft(null);if(state&&!cancel&&state.next!==state.base)onChange(state.next);};
 useEffect(()=>{drag.current=null;onDragging(false);setDraft(null);},[p,part]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')finish(true);};window.addEventListener('keydown',key);const blur=()=>finish(true);window.addEventListener('blur',blur);return()=>{window.removeEventListener('keydown',key);window.removeEventListener('blur',blur);};},[]);
 const shown=draft??p,all=part==='tray'?gridfinityRegions(shown):[];
 const cavities=useMemo(()=>part==='tray'?gridfinityCavities(shown):[],[shown,part]);
 const outer=useMemo(()=>roundedContour(w,d,gridfinityRadii(p).outerRadius),[w,d,p.outerRadius]);
 const upper=useMemo(()=>{if(part!=='tray')return null;const shape=new Shape();outer.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();for(const r of cavities){const hole=new Path();r.points.forEach(([x,y],i)=>i?hole.lineTo(x,y):hole.moveTo(x,y));hole.closePath();shape.holes.push(hole);}return new ExtrudeGeometry(shape,{depth:h-7,bevelEnabled:false,steps:1});},[part,outer,cavities,h]);
 useEffect(()=>()=>upper?.dispose(),[upper]);
 const start=(e:ThreeEvent<PointerEvent>)=>{
  if(underneath||covered||part!=='tray'||busy||e.button!==0)return;
  if(!model.current)return;const local=model.current.worldToLocal(e.point.clone());const pick=gridfinityPick(p,local.x,local.y);if(!pick)return;e.stopPropagation();onSelect(pick.id);
  if(!pick.wall||pick.id!==selected)return;
  const split=all.find(r=>r.cell.id===pick.id)!.cell.split!,plane=new Plane().setFromNormalAndCoplanarPoint(new Vector3(0,0,1).transformDirection(model.current.matrixWorld),model.current.localToWorld(new Vector3(0,0,7))),at=e.ray.intersectPlane(plane,new Vector3());if(!at)return;
  drag.current={base:p,next:p,id:pick.id,start:model.current.worldToLocal(at),axis:split.axis,plane,pointer:e.pointerId};onDragging(true);(e.target as unknown as Element).setPointerCapture(e.pointerId);
 };
 const move=(e:ThreeEvent<PointerEvent>)=>{const state=drag.current;if(!state||state.pointer!==e.pointerId)return;e.stopPropagation();const at=e.ray.intersectPlane(state.plane,new Vector3());if(!at||!model.current)return;model.current.worldToLocal(at);try{const next=gridfinityDrag(state.base,state.id,state.axis==='x'?at.x-state.start.x:at.y-state.start.y);state.next=next;setDraft(next);}catch{/* Keep the last valid layout at the neighboring compartment limit. */}};
 return <group ref={model}>
   <group onPointerDown={start} onPointerMove={move} onPointerUp={e=>{if(drag.current){e.stopPropagation();finish();(e.target as unknown as Element).releasePointerCapture(e.pointerId);}}} onPointerCancel={()=>finish(true)} onLostPointerCapture={()=>finish(true)}>
    <mesh geometry={geometry}><meshStandardMaterial color={gridfinityColor(p,part)} roughness={.65}/></mesh>
    {!exact&&lip&&<mesh geometry={lip}><meshStandardMaterial color={gridfinityColor(p,part)} roughness={.65}/></mesh>}
    {!exact&&upper&&<mesh geometry={upper} position={[0,0,7]}><meshStandardMaterial attach="material-0" color={gridfinityColor(p,part)} roughness={.65}/><meshStandardMaterial attach="material-1" color={gridfinityWallColor(gridfinityColor(p,part))} roughness={.65}/></mesh>}
    {!covered&&all.filter(r=>r.cell.split).map(r=>{const split=r.cell.split!,wx=r.x+(split.axis==='x'?(r.width-p.wall)*split.ratio:0),wy=r.y+(split.axis==='y'?(r.depth-p.wall)*split.ratio:0),ww=split.axis==='x'?p.wall:r.width,wd=split.axis==='y'?p.wall:r.depth,chosen=selected===r.cell.id;return <group key={r.cell.id}>
     <mesh position={[wx+ww/2,wy+wd/2,(h+7)/2]} renderOrder={chosen?20:0} onPointerOver={e=>{e.stopPropagation();setHovered(r.cell.id);}} onPointerOut={()=>setHovered(null)}>
      <boxGeometry args={[ww,wd,h-7]}/><DividerSurface selected={chosen} hovered={hovered===r.cell.id} color={gridfinityColor(p,part)} invisible overlay/>
     </mesh>
     {chosen&&<><EndMarker label={t('А')} position={[wx,wy,h]}/><EndMarker label={t('Б')} position={[wx+ww,wy+wd,h]}/></>}
    </group>;})}
   </group>
   {part==='tray'&&!covered&&<GridfinityCavityEdges stl={draft?undefined:stl} project={shown} color={gridfinityColor(p,part)}/>}
   {cavities.map((r,i)=><group key={r.cell.id}><CellFloor color={covered?previewEdgeColor(gridfinityColor(p,part)).getStyle():gridfinityColor(p,part)} points={r.points} z={7} overlay={exact&&!!p.pairedNotches} selected={!covered&&selected===r.cell.id} onSelect={()=>{if(!covered)onSelect(r.cell.id);}}/>{!covered&&<CellBadge number={i+1} selected={selected===r.cell.id} position={[r.x+r.width/2,r.y+r.depth/2,8]} onClick={()=>onSelect(r.cell.id)}/>}</group>)}
  </group>;
}
export function GridfinityAccessoryMesh({stl,project,tag=false}:{stl:ArrayBuffer;project:GridfinityProject;tag?:boolean}){
 const color=gridfinityColor(project,'tray');
 const faceZ=tag?tagThickness:lidDeckTop(project);
 const {geometry,rims}=useMemo(()=>{
   const triangles=decodeSTL(stl);
   const geometry=new BufferGeometry().setAttribute('position',new Float32BufferAttribute(triangles.flat(2),3));
   geometry.computeVertexNormals();
   const normals=geometry.getAttribute('normal'),base=new Color(color),shadow=previewEdgeColor(color);
   const lightness=.2126*base.r+.7152*base.g+.0722*base.b;
   const engraving=new Color(lightness<.12?'#c6d4db':'#304553');
   const colors:number[]=[],edges:number[]=[];
   triangles.forEach((tri,index)=>{
     const depth=faceZ-tri[0][2];
     // Horizontal cut floors otherwise receive exactly the same light as the deck in plan view.
     const recessed=normals.getZ(index*3)>.99&&depth>.01;
     const tint=recessed?(depth<.5?engraving:shadow):base;
     for(let i=0;i<3;i++)colors.push(tint.r,tint.g,tint.b);
     // Trace only the upper lip of deep cuts, including a grip that opens onto a same-colour tray.
     if(Math.abs(normals.getZ(index*3))>.01||!tri.some(p=>p[2]<faceZ-.5))return;
     const rim=tri.filter(p=>Math.abs(p[2]-faceZ)<.001);
     if(rim.length===2)for(const [x,y,z] of rim)edges.push(x,y,z+.015);
   });
   geometry.setAttribute('color',new Float32BufferAttribute(colors,3));
   const rims=new BufferGeometry().setAttribute('position',new Float32BufferAttribute(edges,3));
   return {geometry,rims};
 },[stl,color,faceZ]);
 useEffect(()=>()=>{geometry.dispose();rims.dispose();},[geometry,rims]);
 const onShelf=tag&&!hasGridfinityLid(project);
 const position:[number,number,number]=tag?(onShelf?tagOrigin(project):lidTagOrigin(project)):[0,0,0];
 if(!onShelf)position[2]+=gridfinityLidBaseZ(project);
 return <mesh geometry={geometry} position={position} rotation={[onShelf?shelfAngle(project)*Math.PI/180:0,0,0]}>
   <meshStandardMaterial vertexColors roughness={.65}/>
   <lineSegments geometry={rims} renderOrder={5} raycast={()=>null}><lineBasicMaterial color={previewEdgeColor(color)} toneMapped={false} depthWrite={false}/></lineSegments>
 </mesh>;
}
function Solid(props:Props){
 const [dragging,setDragging]=useState(false),[w,d,h]=gridfinitySize(props.project,props.part),scale=4/Math.max(w,d,h);
 return <><SceneCamera view={props.view} reset={props.reset}/><SceneUndersideLight view={props.view}/><ambientLight intensity={1.5}/><directionalLight position={[-1,5,3]} intensity={1.3}/><directionalLight position={[4,3,-4]} intensity={.8}/><group rotation={[-Math.PI/2,0,0]} scale={scale}>{props.showGrid&&<WorkspaceGrid width={w} depth={d} dark={document.documentElement.dataset.theme==='dark'}/>}<group position={[-w/2,-d/2,0]}>{props.tag&&<GridfinityAccessoryMesh tag stl={props.tag} project={props.project}/>} {props.lid&&<GridfinityAccessoryMesh stl={props.lid} project={props.project}/>}<GridfinityEditableSolid {...props} covered={!!props.lid} onDragging={setDragging}/></group></group><SceneOrbitControls view={props.view} reset={props.reset} dragging={dragging}/></>;
}
export function GridfinityScene(props:Props){return <Canvas frameloop="demand" dpr={[1,2]} gl={{antialias:true}} orthographic camera={{position:[-6.8,5.2,4.8],zoom:70,near:.01,far:100}} onPointerMissed={e=>{if(e.type==='click'&&e.button===0)props.onSelect('');}}><SceneInspection><Solid {...props}/></SceneInspection></Canvas>;}
