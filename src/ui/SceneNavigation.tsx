import {createContext,useContext,useEffect,useMemo,useRef,useState,type ReactNode} from 'react';
import {useFrame,useThree} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {BufferGeometry,Float32BufferAttribute,OrthographicCamera,Vector3} from 'three';
import {t} from '../i18n.js';

export type SceneView = 'volume'|'top'|'bottom';

const UndersideContext = createContext(false);
export const useUndersideView=()=>useContext(UndersideContext);

export function SceneInspection({children}:{children:ReactNode}){
 const direction=useMemo(()=>new Vector3(),[]);
 const last=useRef(false),[underneath,setUnderneath]=useState(false);
 useFrame(({camera})=>{
  const next=camera.getWorldDirection(direction).y>.001;
  if(next!==last.current){last.current=next;setUnderneath(next);}
 });
 return <UndersideContext.Provider value={underneath}>{children}</UndersideContext.Provider>;
}

const cameraViews = [
 ['volume','◈ Объем'],['top','▦ Сверху'],['bottom','▦ Снизу'],
] as const;

export function SceneViewButtons({view,onView,showGrid,onToggleGrid}:{view:SceneView;onView:(view:SceneView)=>void;showGrid:boolean;onToggleGrid:()=>void}){
 return <div className="view-tabs" role="group" aria-label={t('Вид')}>
  {cameraViews.map(([value,label])=><button key={value} className={view===value?'active':''} aria-pressed={view===value} onClick={()=>onView(value)}>{t(label)}</button>)}
  <button className={showGrid?'active':''} aria-pressed={showGrid} title={t('Сетка 10 мм · основные линии 50 мм')} onClick={onToggleGrid}>{t('▦ Сетка')}</button>
 </div>;
}
export function WorkspaceGrid({width,depth,dark}:{width:number;depth:number;dark:boolean}){
 const lines=useMemo(()=>{
  const extent=Math.ceil((Math.max(width,depth)+100)/50)*50,minor:number[]=[],major:number[]=[];
  for(let n=-extent;n<=extent;n+=10){const points=n%50===0?major:minor;points.push(n,-extent,-.02,n,extent,-.02,-extent,n,-.02,extent,n,-.02);}
  return [minor,major].map(points=>new BufferGeometry().setAttribute('position',new Float32BufferAttribute(points,3)));
 },[width,depth]);
 useEffect(()=>()=>lines.forEach(g=>g.dispose()),[lines]);
 return <group>{lines.map((g,i)=><lineSegments key={i} geometry={g} raycast={()=>{}}><lineBasicMaterial color={dark?(i?'#91a9c4':'#71869b'):(i?'#586c80':'#708394')} transparent opacity={dark?(i?.48:.22):(i?.68:.43)} toneMapped={false} depthWrite={false}/></lineSegments>)}</group>;
}
export function SceneCamera({view,reset}:{view:SceneView;reset:number}){
 const {camera,size,gl,invalidate}=useThree();
 useEffect(()=>{
  camera.up.set(view==='top'?1:0,view==='top'?0:1,0);
  if(view==='top')camera.position.set(0,8,0);
  else camera.position.set(-6.8,view==='bottom'?-5.2:5.2,4.8);
  camera.lookAt(0,.45,0);
  invalidate();
 },[view,reset,camera,invalidate]);
 useEffect(()=>{
  if(!(camera instanceof OrthographicCamera)||!size.width||!size.height)return;
  const canvas=gl.domElement;
  const stage=canvas.closest('.stage');
  const update=()=>{
   const bounds=canvas.getBoundingClientRect();
   const center=stage?.getBoundingClientRect()??bounds;
   // Frame the model between the panels, while drawing behind them as well.
   const offsetX=(bounds.left+bounds.width/2)-(center.left+center.width/2);
   camera.zoom=Math.min(center.width,size.height)/5.5;
   if(offsetX)camera.setViewOffset(size.width,size.height,offsetX,0,size.width,size.height);
   else camera.clearViewOffset();
   invalidate();
  };
  update();
  if(!stage)return;
  const observer=new ResizeObserver(update);
  observer.observe(stage);
  return()=>observer.disconnect();
 },[view,reset,camera,size.width,size.height,gl,invalidate]);
 return null;
}
export function SceneUndersideLight({view}:{view:SceneView}){
 return <directionalLight position={[-4,-6,5]} intensity={view==='bottom'?1.8:.75}/>;
}

export function SceneOrbitControls({view,reset,dragging}:{view:SceneView;reset:number;dragging:boolean}){
 return <OrbitControls key={`${view}-${reset}`} makeDefault enabled={!dragging} enableRotate={view!=='top'} enablePan target={[0,.45,0]} minZoom={20} maxZoom={1600}/>;
}
