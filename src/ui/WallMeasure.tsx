import {useEffect,useMemo,useState} from 'react';
import {Html,Line} from '@react-three/drei';
import {useEditor} from '../store.js';
import {type Project} from '../model.js';
import {setWallHeight,wallHeightControls,type WallHeightKey} from '../wallDimensions.js';
import {tiltSlope} from '../tilt.js';
import {InlineDimension} from './InlineDimension.js';
import {t} from '../i18n.js';

function WallHeightLabel({p,id,kind,c}:{p:Project;id:string;kind:WallHeightKey;c:NonNullable<ReturnType<typeof wallHeightControls>>}){
 const [editing,setEditing]=useState(false),[draft,setDraft]=useState<string|null>(null);
 useEffect(()=>{setEditing(false);setDraft(null);},[p,id,kind]);
 const value=kind==='flat'?c.height:kind==='start'?c.wall.startHeight:c.wall.endHeight;
 const next=useMemo(()=>{if(draft===null)return p;if(!draft.trim())return null;try{return setWallHeight(p,id,kind,Number(draft));}catch{return null;}},[p,id,kind,draft]);
 const cancel=()=>{setEditing(false);setDraft(null);};
 const commit=()=>{
  const state=useEditor.getState();if(!next||state.project!==p||state.selection.type!=='wall'||state.selection.id!==id)return false;
  state.change(()=>next);if(useEditor.getState().error)return false;cancel();return true;
 };
 const {wall,stepIndex}=c;
 let from=0,to=wall.length;
 if(stepIndex!==undefined&&wall.stepPoints){from=wall.stepPoints[stepIndex][0];to=wall.stepPoints[stepIndex+1]?.[0]??wall.length;}
 const at=from+(to-from)*(kind==='flat'?.5:kind==='start'?.08:.92);
 const x=wall.x+(wall.axis==='x'?at:wall.thickness/2),y=wall.y+(wall.axis==='y'?at:wall.thickness/2),lean=tiltSlope(p);
 const height=editing&&next&&draft!==null?Number(draft):value;
 return <group><Line points={[[x,y,0],[x+height*lean,y,height]]} color="#147bba" lineWidth={2} depthTest={false} renderOrder={50} dashed={editing} dashSize={2} gapSize={1}/>
  <Html position={[x+value*lean,y,value+3]} center style={{pointerEvents:'auto'}}><InlineDimension label={t(kind==='flat'?'Высота стенки на модели':kind==='start'?'Высота А на модели':'Высота Б на модели')} prefix={kind==='flat'?'':t(kind==='start'?'А':'Б')+' · '} value={value} editing={editing} draft={draft??String(Number(value.toFixed(4)))} min={c.min} max={c.max} valid={!!next} onStart={()=>setEditing(true)} onDraft={setDraft} onCommit={commit} onCancel={cancel}/></Html>
 </group>;
}
export function WallMeasure(){
 const p=useEditor(s=>s.project),selection=useEditor(s=>s.selection);
 const c=useMemo(()=>selection.type==='wall'?wallHeightControls(p,selection.id):null,[p,selection]);
 if(!c)return null;
 return <>{c.keys.map(kind=><WallHeightLabel key={selection.id+kind} p={p} id={selection.id} kind={kind} c={c}/>)}</>;
}
