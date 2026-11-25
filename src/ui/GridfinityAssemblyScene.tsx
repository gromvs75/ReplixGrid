import {previewEdgeColor} from '../previewAppearance.js';
import {gridfinityDrop} from '../gridfinityPlacement.js';
import {GridfinityCavityEdges,gridfinityVisualGuide,gridfinityWallColor} from './GridfinityVisualGuide.js';
import {GridfinityEditableSolid,GridfinityAccessoryMesh} from './GridfinityScene.js';
import {GRIDFINITY,gridPitch,hasGridfinityLid,gridfinitySize,type GridfinityProject} from '../gridfinity.js';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Canvas,useThree,type ThreeEvent} from '@react-three/fiber';
import {BufferGeometry,Float32BufferAttribute,Plane,Vector3,Vector2,Raycaster,Color} from 'three';
import {Edges} from '@react-three/drei';
import {decodeSTL} from '../stl.js';
import {gridfinityAssemblyItems,moveGridfinityPart,selectedGridfinity,trayFootprint,type GridfinityAssembly,type GridfinitySelection} from '../gridfinityAssembly.js';
import {SceneCamera,SceneOrbitControls,WorkspaceGrid} from './SceneNavigation.js';
import {CellBadge} from './SceneSelection.js';
import {t} from '../i18n.js';
type Props={showLids:boolean;assembly:GridfinityAssembly;selection:GridfinitySelection;onSelect:(s:GridfinitySelection)=>void;onChange:(a:GridfinityAssembly)=>void;view:'3d'|'top';reset:number;showGrid:boolean;selectedCell:string;onSelectCell:(id:string)=>void;onEditTray:(p:GridfinityProject)=>void};
function PartMesh({stl,color,selected,covered=false}:{stl:ArrayBuffer;color:string;selected:boolean;covered?:boolean}){
 const geometry=useMemo(()=>{
   const g=new BufferGeometry().setAttribute('position',new Float32BufferAttribute(decodeSTL(stl).flat(2),3));
   g.computeVertexNormals();
   const positions=g.getAttribute('position'),normals=g.getAttribute('normal'),colors:number[]=[];
   const materialColor=selected?'#dc8a5b':color;
   const base=new Color(materialColor),side=gridfinityWallColor(materialColor),inside=previewEdgeColor(color);
   for(let i=0;i<normals.count;i++){
     const floor=covered&&normals.getZ(i)>.99&&Math.abs(positions.getZ(i)-GRIDFINITY.floorHeight)<.001;
     const c=floor?inside:Math.abs(normals.getZ(i))<.5?side:base;
     colors.push(c.r,c.g,c.b);
   }
   g.setAttribute('color',new Float32BufferAttribute(colors,3));return g;
 },[stl,color,selected,covered]);
 useEffect(()=>()=>geometry.dispose(),[geometry]);
 return <mesh geometry={geometry}><meshStandardMaterial vertexColors roughness={.65}/>{selected&&<Edges color="#b74b14"/>}</mesh>;
}
function AssemblySolid({showLids,assembly:a,selection,onSelect,onChange,view,reset,showGrid,meshes,selectedCell,onSelectCell,onEditTray}:Props&{meshes:{id:string;stl:ArrayBuffer;lid?:ArrayBuffer;tag?:ArrayBuffer}[]}){
 const [editingDivider,setEditingDivider]=useState(false);
 const {camera,gl}=useThree();
 const [preview,setPreview]=useState<{dx:number;dy:number;valid:boolean}|null>(null),[dragging,setDragging]=useState(false);
 const drag=useRef<{base:GridfinityAssembly;next:GridfinityAssembly|null;selection:GridfinitySelection;clientX:number;clientY:number;pointer:number;moved:boolean}|null>(null);
 const end=(cancel=false)=>{const d=drag.current;drag.current=null;setDragging(false);setPreview(null);if(d?.moved&&!cancel&&d.next&&JSON.stringify(d.next)!==JSON.stringify(d.base))onChange(d.next);};
 useEffect(()=>{const cancel=()=>end(true),key=(e:KeyboardEvent)=>{if(e.key==='Escape')cancel();};window.addEventListener('blur',cancel);window.addEventListener('keydown',key);return()=>{window.removeEventListener('blur',cancel);window.removeEventListener('keydown',key);};},[]);
 useEffect(()=>{end(true);},[a]);
 useEffect(()=>{gl.domElement.style.cursor=dragging?'grabbing':'';return()=>{gl.domElement.style.cursor='';};},[dragging,gl]);
 const items=gridfinityAssemblyItems(a);
 const [px,py]=gridPitch(a.plates[0].project);
 const w=Math.max(...a.plates.map(p=>(p.x+p.project.columns)*px)),h=Math.max(...a.plates.map(p=>(p.y+p.project.rows)*py)),scale=4/Math.max(w,h,140);
 const plane=useMemo(()=>new Plane(new Vector3(0,1,0),0),[]),startRay=useMemo(()=>new Raycaster(),[]);
 const start=(e:ThreeEvent<PointerEvent>,s:GridfinitySelection)=>{if(e.button!==0)return;e.stopPropagation();onSelect(s);if(a.drawer&&s.kind==='plate')return;drag.current={base:a,next:a,selection:s,clientX:e.clientX,clientY:e.clientY,pointer:e.pointerId,moved:false};setDragging(true);(e.target as unknown as Element).setPointerCapture(e.pointerId);};
 const move=(e:ThreeEvent<PointerEvent>)=>{const d=drag.current;if(!d||d.pointer!==e.pointerId)return;e.stopPropagation();if(!d.moved&&Math.hypot(e.clientX-d.clientX,e.clientY-d.clientY)<4)return;
  const rect=gl.domElement.getBoundingClientRect();startRay.setFromCamera(new Vector2((d.clientX-rect.left)/rect.width*2-1,1-(d.clientY-rect.top)/rect.height*2),camera);
  const from=startRay.ray.intersectPlane(plane,new Vector3()),at=e.ray.intersectPlane(plane,new Vector3());if(!from||!at)return;
  const dx=(at.x-from.x)/scale/px,dy=(from.z-at.z)/scale/py;d.moved=true;d.next=gridfinityDrop(d.base,d.selection,dx,dy);setPreview({dx,dy,valid:!!d.next});
 };
 const moving=drag.current?.selection;
 const follows=(id:string,kind:string)=>moving&&(id===moving.id||moving.kind==='plate'&&kind==='tray'&&a.trays.find(t=>t.id===id)?.plateId===moving.id);
 const dragged=moving?items.find(i=>i.id===moving.id):undefined;
 const target=drag.current?.next&&moving?gridfinityAssemblyItems(drag.current.next).find(i=>i.id===moving.id):undefined;
 const targetPosition=target?.position??(dragged&&preview?[dragged.position[0]+Math.round(preview.dx)*px,dragged.position[1]+Math.round(preview.dy)*py,dragged.position[2]]:null);
 return <><SceneCamera view={view} reset={reset}/><ambientLight intensity={1.5}/><directionalLight position={[-1,5,3]} intensity={1.3}/><directionalLight position={[4,3,-4]} intensity={.8}/><group rotation={[-Math.PI/2,0,0]} scale={scale}>{showGrid&&<WorkspaceGrid width={w} depth={h} dark={document.documentElement.dataset.theme==='dark'}/>}<group position={[-w/2,-h/2,0]}>
 {items.map(item=>{const mesh=meshes.find(m=>m.id===item.id);if(!mesh)return null;const chosen=item.id===selection.id,position:[number,number,number]=[item.position[0]+(preview&&follows(item.id,item.kind)?preview.dx*px:0)+(item.rotated?gridfinitySize(item.project,item.kind)[1]:0),item.position[1]+(preview&&follows(item.id,item.kind)?preview.dy*py:0),(item.id===dragged?.id&&preview?.valid&&targetPosition?targetPosition[2]:item.position[2])];return <group key={item.id} position={position} rotation={[0,0,item.rotated?Math.PI/2:0]} onPointerDown={e=>start(e,{kind:item.kind,id:item.id})} onPointerMove={move} onPointerUp={e=>{if(drag.current){e.stopPropagation();end();(e.target as unknown as Element).releasePointerCapture(e.pointerId);}}} onPointerCancel={()=>end(true)} onLostPointerCapture={()=>end(true)}>{chosen&&item.kind==='tray'&&!(showLids&&mesh.lid)?<GridfinityEditableSolid project={item.project} part="tray" stl={mesh.stl} selected={selectedCell} busy={false} onSelect={onSelectCell} onChange={onEditTray} onDragging={setEditingDivider}/>:<PartMesh stl={mesh.stl} color={item.color} selected={chosen} covered={showLids&&!!mesh.lid}/>}{mesh.tag&&(showLids||!hasGridfinityLid(item.project))&&item.project.label?.mode==='tag'&&<GridfinityAccessoryMesh tag stl={mesh.tag} project={item.project}/>} {showLids&&mesh.lid&&item.kind==='tray'&&<GridfinityAccessoryMesh stl={mesh.lid} project={item.project}/>} {!chosen&&item.kind==='tray'&&!(showLids&&mesh.lid)&&<GridfinityCavityEdges stl={mesh.stl} project={item.project} color={item.color}/>}<CellBadge onDragStart={e=>start(e,{kind:item.kind,id:item.id})} number={(item.kind==='plate'?'P':gridfinityVisualGuide?'T':'')+((item.kind==='plate'?a.plates:a.trays).findIndex(v=>v.id===item.id)+1)} selected={chosen} size={10} position={[8,showLids&&mesh.lid&&item.project.label?gridfinitySize(item.project,item.kind)[1]-8:8,gridfinitySize(item.project,item.kind)[2]+1]} onClick={()=>onSelect({kind:item.kind,id:item.id})}/></group>;})}
 {preview&&dragged&&targetPosition&&<group position={[targetPosition[0],targetPosition[1],targetPosition[2]+gridfinitySize(dragged.project,dragged.kind)[2]+2]}><mesh position={[(dragged.rotated?dragged.project.rows:dragged.project.columns)*px/2,(dragged.rotated?dragged.project.columns:dragged.project.rows)*py/2,0]} raycast={()=>null}><boxGeometry args={[(dragged.rotated?dragged.project.rows:dragged.project.columns)*px,(dragged.rotated?dragged.project.columns:dragged.project.rows)*py,.1]}/><meshBasicMaterial visible={false}/><Edges color={preview.valid?'#2b9b75':'#ed655a'} depthTest={false} renderOrder={40} raycast={()=>null}/></mesh></group>}
 </group></group><SceneOrbitControls view={view} reset={reset} dragging={dragging||editingDivider}/></>;
}
export function GridfinityAssemblyScene(props:Props){
 const [meshes,setMeshes]=useState<{id:string;stl:ArrayBuffer;lid?:ArrayBuffer;tag?:ArrayBuffer}[]>([]),[error,setError]=useState(''),[busy,setBusy]=useState(true);
 const key=JSON.stringify(gridfinityAssemblyItems(props.assembly).map(({id,kind,project:{colors,...project}})=>({id,kind,project})));
 useEffect(()=>{setBusy(true);setError('');const worker=new Worker('/kernel/worker-gridfinity-plate-mount-v1.js',{type:'module'}),timer=setTimeout(()=>{worker.terminate();setBusy(false);setError('Не удалось построить Gridfinity. Уменьшите размер и повторите.');},120000);worker.onmessage=({data})=>{clearTimeout(timer);setBusy(false);if(data.error)setError(data.error);else setMeshes(data.meshes);};worker.onerror=()=>{clearTimeout(timer);setBusy(false);setError('Не удалось запустить проверку геометрии.');};worker.postMessage({purpose:'assembly-preview',assembly:props.assembly});return()=>{clearTimeout(timer);worker.terminate();};},[key]);
 return <><Canvas frameloop="demand" dpr={[1,2]} orthographic camera={{position:[-6.8,5.2,4.8],zoom:70,near:.01,far:100}}><AssemblySolid {...props} meshes={meshes}/></Canvas>{(busy||error)&&<div className="preview-status" role="status">{t(error||'Обновляем форму…')}</div>}</>;
}
