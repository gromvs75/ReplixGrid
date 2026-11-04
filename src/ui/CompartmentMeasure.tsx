import {Html,Line} from '@react-three/drei';
import {useEditor} from '../store.js';
import {regions} from '../editor.js';
import {dimensionControl,supportsDimensions} from '../compartmentDimensions.js';
import {useDimensionDraft,dimensionDraftProject} from '../dimensionDraft.js';
import {DimensionLabel} from './DimensionLabel.js';
import {compartmentMeasure} from '../compartmentMeasure.js';
import {footprintContour,lineSpan} from '../footprint.js';

export function CompartmentMeasure(){
 const p=useEditor(s=>s.project),selection=useEditor(s=>s.selection),preview=useDimensionDraft();
 if(selection.type!=='cell'||!supportsDimensions(p))return null;
 const axis=preview.id===selection.id?preview.axis:'x';
 const c=dimensionControl(p,selection.id,axis);
 const r=regions(p).find(r=>r.cell.id===selection.id);if(!r||r.cell.split)return null;
 const active=preview.id===selection.id&&preview.project===p;
 const next=(active?dimensionDraftProject(p,selection.id,axis,preview.draft):p)??p;
 const target=regions(next).find(v=>v.cell.id===r.cell.id)!,z=p.floorThickness+.2;
 const measured=compartmentMeasure(next,target,axis);if(!measured)return null;
 const {start,end,coord}=measured;
 const anchor=active&&preview.inline?(compartmentMeasure(p,r,axis)??measured):measured;
 const points:[number,number,number][]=axis==='x'?[[start,coord,z],[end,coord,z]]:[[coord,start,z],[coord,end,z]];
 const ticks=points.map(([a,b,c])=>axis==='x'?[[a,b-2,c],[a,b+2,c]]:[[a-2,b,c],[a+2,b,c]]) as [number,number,number][][];
 const divider=(project:typeof p)=>{
  const parent=regions(project).find(v=>v.cell.id===c?.dividerId);if(!parent?.cell.split)return null;
  const s=parent.cell.split,t=project.wallThickness;
  const coordinate=(axis==='x'?parent.x:parent.y)+((axis==='x'?parent.width:parent.depth)-t)*s.ratio+t/2;
  const boundary=lineSpan(footprintContour(project),axis==='x'?'y':'x',coordinate);if(!boundary)return null;
  const lo=Math.max(boundary[0],axis==='x'?parent.y:parent.x),hi=Math.min(boundary[1],axis==='x'?parent.y+parent.depth:parent.x+parent.width);
  if(hi<=lo)return null;
  return (axis==='x'?[[coordinate,lo,z],[coordinate,hi,z]]:[[lo,coordinate,z],[hi,coordinate,z]]) as [number,number,number][];
 };
 const original=divider(p),proposed=next!==p?divider(next):null;
 return <group><Line points={points} color="#147bba" lineWidth={2} depthTest={false} renderOrder={50}/>{ticks.map((points,i)=><Line key={i} points={points} color="#147bba" lineWidth={2} depthTest={false} renderOrder={50}/>)}
  {original&&<Line points={original} color="#d77c35" lineWidth={4} depthTest={false} renderOrder={49}/>}
  {proposed&&<Line points={proposed} color="#147bba" dashed dashSize={3} gapSize={2} lineWidth={3} depthTest={false} renderOrder={51}/>}
  <Html position={axis==='x'?[anchor.start+(anchor.end-anchor.start)*.25,anchor.coord,z]:[anchor.coord,anchor.start+(anchor.end-anchor.start)*.25,z]} center style={{pointerEvents:'auto'}}><DimensionLabel key={selection.id+axis} id={selection.id} axis={axis} value={measured.value} control={c}/></Html>
 </group>;
}
