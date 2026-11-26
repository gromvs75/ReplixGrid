import {useEffect,useMemo,useRef,useState} from 'react';
import {checkCompartmentFit,gridfinityFitSpace,organizerFitSpace,type FitObject,type FitSpace} from '../compartmentFit.js';
import type {GridfinityProject} from '../gridfinity.js';
import {getLocale,t} from '../i18n.js';
import type {Project} from '../model.js';

const fields=[['length','Длина'],['width','Ширина'],['height','Высота'],['gap','Зазор']] as const;
type Props={cellId:string}&({project:Project;gridfinity?:never}|{project?:never;gridfinity:GridfinityProject});

function millimeters(input:string){
 const clean=input.trim();
 if(!/^(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(clean))return NaN;
 const value=Number(clean.replace(',','.'));
 return Number.isFinite(value)&&value<=10_000?value:NaN;
}

function FitDiagram({space,result,gap}:{space:FitSpace;result:ReturnType<typeof checkCompartmentFit>;gap:number}){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const element=canvas.current,context=element?.getContext('2d');
  if(!element||!context)return;
  const {length,width,center,footprint,heightFits}=result;
  const left=center[0]-length/2,top=center[1]-width/2;
  const x=space.outline.map(p=>p[0]),y=space.outline.map(p=>p[1]);
  const minX=Math.min(...x,left-gap),maxX=Math.max(...x,left+length+gap);
  const minY=Math.min(...y,top-gap),maxY=Math.max(...y,top+width+gap);
  const scale=Math.min((element.width-36)/(maxX-minX),(element.height-36)/(maxY-minY));
  const toX=(x:number)=>element.width/2+(x-(minX+maxX)/2)*scale;
  const toY=(y:number)=>element.height/2+(y-(minY+maxY)/2)*scale;
  context.clearRect(0,0,element.width,element.height);
  context.lineWidth=3;
  context.beginPath();
  space.outline.forEach(([x,y],i)=>i?context.lineTo(toX(x),toY(y)):context.moveTo(toX(x),toY(y)));
  context.closePath();
  context.strokeStyle='#74879b';
  context.stroke();
  const color=footprint&&heightFits?'#32805f':'#ba4d49';
  context.strokeStyle=color;
  context.fillStyle=color+'32';
  context.fillRect(toX(left),toY(top),length*scale,width*scale);
  context.strokeRect(toX(left),toY(top),length*scale,width*scale);
  if(gap>0){
   context.setLineDash([7,5]);
   context.strokeRect(toX(left-gap),toY(top-gap),(length+2*gap)*scale,(width+2*gap)*scale);
   context.setLineDash([]);
  }
 },[space,result,gap]);
 return <canvas ref={canvas} width={520} height={280} role="img" aria-label={t('Схема посадки сверху')}/>;
}

export function CompartmentFit({project,gridfinity,cellId}:Props){
 const [open,setOpen]=useState(false);
 const [input,setInput]=useState({length:'',width:'',height:'',gap:'0'});
 const space=useMemo(()=>open?(gridfinity?gridfinityFitSpace(gridfinity,cellId):organizerFitSpace(project!,cellId)):null,
  [open,project,gridfinity,cellId]);
 const object:FitObject={length:millimeters(input.length),width:millimeters(input.width),
  height:millimeters(input.height),gap:millimeters(input.gap)};
 const complete=object.length>0&&object.width>0&&object.height>0&&object.gap>=0;
 const result=space&&complete?checkCompartmentFit(space,object):null;
 const format=new Intl.NumberFormat(getLocale(),{maximumFractionDigits:3});
 return <details className="compartment-fit" onToggle={e=>setOpen(e.currentTarget.open)}>
  <summary>{t('Проверка посадки')}</summary>
  {open&&(!space?<p className="hint">{t('Для этого отсека проверка посадки пока недоступна.')}</p>:<>
   <p className="hint">{t('Укажите габариты предмета. Зазор добавляется с каждой стороны и сверху.')}</p>
   <div className="compartment-fit-fields">
    {fields.map(([key,label])=><label key={key}>{t(label)}<span><input type="text" inputMode="decimal"
     value={input[key]} autoComplete="off" aria-invalid={!!input[key]&&(key==='gap'?!(object.gap>=0):!(object[key]>0))}
     onChange={e=>setInput(previous=>({...previous,[key]:e.target.value}))}/><small>{t('мм')}</small></span></label>)}
   </div>
   {result&&<>
    <div className="compartment-fit-result" data-fit={result.footprint&&result.heightFits} aria-live="polite" aria-atomic="true">
     {result.footprint&&result.heightFits?<strong>{t(result.rotated?'Помещается с поворотом на 90°':'Помещается')}</strong>:<>
      {!result.footprint&&<strong>{t('Не помещается в контур отсека')}</strong>}
      {!result.heightFits&&<strong>{t('Не хватает высоты')}</strong>}
     </>}
     <span>{t('Высота с зазором — {0} из {1} мм.',[format.format(object.height+object.gap),format.format(space.height)])}</span>
    </div>
    <FitDiagram space={space} result={result} gap={object.gap}/>
   </>}
  </>)}
 </details>;
}
