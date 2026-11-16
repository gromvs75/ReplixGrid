import {defaultGridfinity,validateGridfinity,gridfinityColor,type GridfinityProject} from './gridfinity.js';
export interface GridfinityPlate {id:string;name:string;x:number;y:number;project:GridfinityProject}
export interface GridfinityTray {id:string;name:string;plateId:string;x:number;y:number;rotated:boolean;project:GridfinityProject}
export interface GridfinityAssembly {kind:'replixgrid-gridfinity-assembly';schemaVersion:1;plates:GridfinityPlate[];trays:GridfinityTray[]}
export type GridfinitySelection={kind:'plate'|'tray';id:string};
const uid=()=>crypto.randomUUID();
export function migrateGridfinity(project:GridfinityProject):GridfinityAssembly{
 validateGridfinity(project);const plateId=uid();return {kind:'replixgrid-gridfinity-assembly',schemaVersion:1,plates:[{id:plateId,name:'',x:0,y:0,project:structuredClone(project)}],trays:[{id:uid(),name:'',plateId,x:0,y:0,rotated:false,project:structuredClone(project)}]};
}
export function defaultGridfinityAssembly(){const a=migrateGridfinity(defaultGridfinity());a.plates[0].project={...a.plates[0].project,columns:4,rows:4};return a;}
export function trayFootprint(t:GridfinityTray){return t.rotated?[t.project.rows,t.project.columns]:[t.project.columns,t.project.rows];}
const overlap=(a:{x:number;y:number},aw:number,ah:number,b:{x:number;y:number},bw:number,bh:number)=>a.x<b.x+bw&&a.x+aw>b.x&&a.y<b.y+bh&&a.y+ah>b.y;
export function validateGridfinityAssembly(a:GridfinityAssembly){
 if(!a||a.kind!=='replixgrid-gridfinity-assembly'||a.schemaVersion!==1||!Array.isArray(a.plates)||!Array.isArray(a.trays)||a.plates.length<1||a.plates.length>32||a.trays.length>128)throw Error('Некорректный комплект Gridfinity.');
 const ids=new Set<string>();
 for(const item of [...a.plates,...a.trays]){if(typeof item.id!=='string'||!item.id||ids.has(item.id)||typeof item.name!=='string'||item.name.length>80||![item.x,item.y].every(v=>Number.isInteger(v)&&v>=0&&v<=200))throw Error('Некорректный комплект Gridfinity.');ids.add(item.id);validateGridfinity(item.project);}
 for(let i=0;i<a.plates.length;i++){const p=a.plates[i];for(const q of a.plates.slice(i+1))if(overlap(p,p.project.columns,p.project.rows,q,q.project.columns,q.project.rows))throw Error('Плиты пересекаются.');}
 for(let i=0;i<a.trays.length;i++){
  const t=a.trays[i],p=a.plates.find(p=>p.id===t.plateId),[w,h]=trayFootprint(t);
  if(typeof t.rotated!=='boolean'||!p)throw Error('Некорректный комплект Gridfinity.');
  if(t.x+w>p.project.columns||t.y+h>p.project.rows)throw Error('Лоток выходит за границы плиты. Увеличьте плиту или перенесите лоток.');
  for(const q of a.trays.slice(i+1).filter(q=>q.plateId===t.plateId)){const [qw,qh]=trayFootprint(q);if(overlap(t,w,h,q,qw,qh))throw Error('Лотки пересекаются. Выберите свободные ячейки.');}
 }
 return a;
}
export function parseGridfinityAssembly(text:string){const p=JSON.parse(text);return p?.kind==='replixgrid-gridfinity'?migrateGridfinity(p):validateGridfinityAssembly(p);}
export function selectedGridfinity(a:GridfinityAssembly,s:GridfinitySelection){return (s.kind==='plate'?a.plates:a.trays).find(v=>v.id===s.id);}
export function updateGridfinityPart(a:GridfinityAssembly,s:GridfinitySelection,project:GridfinityProject){if(s.kind==='plate')project={...project,root:undefined,compartmentsX:1,compartmentsY:1};return validateGridfinityAssembly({...a,[s.kind==='plate'?'plates':'trays']:(s.kind==='plate'?a.plates:a.trays).map(v=>v.id===s.id?{...v,project}:v)});}
export function addGridfinityPlate(a:GridfinityAssembly,source?:GridfinityPlate){
 const project=source?structuredClone(source.project):{...defaultGridfinity(),columns:4,rows:4};
 const plate={id:uid(),name:'',x:Math.max(...a.plates.map(p=>p.x+p.project.columns)),y:0,project};
 return {assembly:validateGridfinityAssembly({...a,plates:[...a.plates,plate],trays:[...a.trays,...(source?a.trays.filter(t=>t.plateId===source.id).map(t=>({...structuredClone(t),id:uid(),plateId:plate.id})):[])]}),selection:{kind:'plate',id:plate.id} as GridfinitySelection};
}
export function addGridfinityTray(a:GridfinityAssembly,plateId:string,source?:GridfinityTray){
 const p=a.plates.find(p=>p.id===plateId);if(!p)throw Error('Выберите плиту.');
 const tray:GridfinityTray={id:uid(),name:'',plateId,x:0,y:0,rotated:source?.rotated??false,project:source?structuredClone(source.project):{...defaultGridfinity(),columns:1,rows:1}};
 const [w,h]=trayFootprint(tray);
 for(let y=0;y<=p.project.rows-h;y++)for(let x=0;x<=p.project.columns-w;x++){
  const candidate={...tray,x,y};if(a.trays.filter(v=>v.plateId===plateId).every(v=>{const [vw,vh]=trayFootprint(v);return !overlap(candidate,w,h,v,vw,vh);})){return {assembly:validateGridfinityAssembly({...a,trays:[...a.trays,candidate]}),selection:{kind:'tray',id:tray.id} as GridfinitySelection};}
 }
 throw Error('На плите нет места. Увеличьте её или добавьте плиту.');
}
export function moveGridfinityPart(a:GridfinityAssembly,s:GridfinitySelection,x:number,y:number,plateId?:string){
 const key=s.kind==='plate'?'plates':'trays';
 return validateGridfinityAssembly({...a,[key]:a[key].map(v=>v.id===s.id?{...v,x:Math.round(x),y:Math.round(y),...(s.kind==='tray'&&plateId?{plateId}:{})}:v)});
}
/** Rotate on the same plate, preserving the anchor when possible, otherwise using the nearest free position. */
export function rotateGridfinityTray(a:GridfinityAssembly,id:string){
 validateGridfinityAssembly(a);
 const tray=a.trays.find(t=>t.id===id);if(!tray)throw Error('Некорректный комплект Gridfinity.');
 const plate=a.plates.find(p=>p.id===tray.plateId)!,rotated={...tray,rotated:!tray.rotated},[w,h]=trayFootprint(rotated),[oldW,oldH]=trayFootprint(tray);
 const others=a.trays.filter(t=>t.id!==id&&t.plateId===tray.plateId);
 const fits=(x:number,y:number)=>x>=0&&y>=0&&x+w<=plate.project.columns&&y+h<=plate.project.rows&&others.every(t=>{const [tw,th]=trayFootprint(t);return !overlap({x,y},w,h,t,tw,th);});
 let position={x:tray.x,y:tray.y};
 if(!fits(position.x,position.y)){
  const candidates:{x:number;y:number;distance:number}[]=[];
  for(let y=0;y<=plate.project.rows-h;y++)for(let x=0;x<=plate.project.columns-w;x++)if(fits(x,y))candidates.push({x,y,distance:(x+w/2-tray.x-oldW/2)**2+(y+h/2-tray.y-oldH/2)**2});
  candidates.sort((a,b)=>a.distance-b.distance||a.y-b.y||a.x-b.x);
  if(!candidates.length)throw Error('На плите нет места. Увеличьте её или добавьте плиту.');
  position=candidates[0];
 }
 return validateGridfinityAssembly({...a,trays:a.trays.map(t=>t.id===id?{...rotated,x:position.x,y:position.y}:t)});
}
export function removeGridfinityPart(a:GridfinityAssembly,s:GridfinitySelection){
 if(s.kind==='plate'){if(a.plates.length===1)throw Error('В комплекте должна остаться хотя бы одна плита.');if(a.trays.some(t=>t.plateId===s.id))throw Error('Сначала перенесите или удалите лотки этой плиты.');return {...a,plates:a.plates.filter(v=>v.id!==s.id)};}
 return {...a,trays:a.trays.filter(v=>v.id!==s.id)};
}
export function gridfinityAssemblyItems(a:GridfinityAssembly){
 return a.plates.flatMap((p,i)=>[
  {id:p.id,kind:'plate' as const,name:`plate-${i+1}`,project:p.project,color:gridfinityColor(p.project,'plate'),position:[p.x*42,p.y*42,0] as [number,number,number],rotated:false},
  ...a.trays.filter(t=>t.plateId===p.id).map(t=>({id:t.id,kind:'tray' as const,name:`plate-${i+1}-tray-${a.trays.indexOf(t)+1}`,project:t.project,color:gridfinityColor(t.project,'tray'),position:[(p.x+t.x)*42+.25,(p.y+t.y)*42+.25,1.2] as [number,number,number],rotated:t.rotated}))
 ]);
}

export function transferGridfinityTray(a:GridfinityAssembly,id:string,plateId:string){
 const tray=a.trays.find(t=>t.id===id);if(!tray)throw Error('Некорректный комплект Gridfinity.');
 try{return moveGridfinityPart(a,{kind:'tray',id},tray.x,tray.y,plateId);}catch{
  const without={...a,trays:a.trays.filter(t=>t.id!==id)},added=addGridfinityTray(without,plateId,tray),placed=added.assembly.trays.at(-1)!;
  return validateGridfinityAssembly({...a,trays:a.trays.map(t=>t.id===id?{...t,x:placed.x,y:placed.y,plateId}:t)});
 }
}
export function gridfinityExportItems(a:GridfinityAssembly,selection:GridfinitySelection,target:string){
 validateGridfinityAssembly(a);
 const plateId=selection.kind==='plate'?selection.id:a.trays.find(t=>t.id===selection.id)?.plateId;
 const items=gridfinityAssemblyItems(a);
 const result=target==='all'?items:target==='kit'?items.filter(item=>item.id===plateId||a.trays.some(t=>t.id===item.id&&t.plateId===plateId)):target==='plate'?items.filter(v=>v.id===plateId&&v.kind==='plate'):target==='tray'?items.filter(v=>v.kind==='tray'&&v.id===selection.id):[];
 if(!result.length)throw Error('Нет деталей для экспорта');return result;
}
