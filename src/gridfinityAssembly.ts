import type {BedSettings} from './bedPacking.js';
import {drawerPitch,planDrawerPlates,type DrawerGrid} from './gridfinityDrawer.js';
import {gridPitch,hasGridfinityLid,defaultGridfinity,validateGridfinity,gridfinityColor,type GridfinityProject} from './gridfinity.js';
export interface GridfinityPlate {id:string;name:string;x:number;y:number;project:GridfinityProject}
export interface GridfinityTray {id:string;name:string;plateId:string;x:number;y:number;rotated:boolean;project:GridfinityProject}
export interface GridfinityAssembly {kind:'replixgrid-gridfinity-assembly';schemaVersion:1;drawer?:DrawerGrid;plates:GridfinityPlate[];trays:GridfinityTray[]}
export type GridfinitySelection={kind:'plate'|'tray';id:string};
const uid=()=>crypto.randomUUID();
export function migrateGridfinity(project:GridfinityProject):GridfinityAssembly{
 validateGridfinity(project);const plateId=uid();return {kind:'replixgrid-gridfinity-assembly',schemaVersion:1,plates:[{id:plateId,name:'',x:0,y:0,project:structuredClone(project)}],trays:[{id:uid(),name:'',plateId,x:0,y:0,rotated:false,project:structuredClone(project)}]};
}
export function fitDrawerGrid(grid:DrawerGrid,bed:BedSettings,previous?:GridfinityAssembly):GridfinityAssembly{
  const pitch=drawerPitch(grid);
  const plates:GridfinityPlate[]=planDrawerPlates(grid,bed).map(({x,y,columns,rows},i)=>{
    const old=previous?.plates[i];
    return {id:old?.id??crypto.randomUUID(),name:old?.name??'',x,y,project:{...(old?.project??defaultGridfinity()),pitch,columns,rows}};
  });
  const a:GridfinityAssembly={kind:'replixgrid-gridfinity-assembly',schemaVersion:1,drawer:{...grid},plates,trays:[]};
  if(previous){
    for(const tray of previous.trays){
      const {x,y}=trayOrigin(previous,tray),plate=plateAt(a,x,y);
      if(!plate)throw Error('Лоток выходит за границы ящика.');
      a.trays.push({...tray,plateId:plate.id,x:x-plate.x,y:y-plate.y,project:{...tray.project,pitch:tray.rotated?[pitch[1],pitch[0]]:pitch}});
    }
  }else{
    a.trays.push({id:crypto.randomUUID(),name:'',plateId:plates[0].id,x:0,y:0,rotated:false,project:{...defaultGridfinity(),pitch,columns:Math.min(2,grid.columns),rows:Math.min(2,grid.rows)}});
  }
  return validateGridfinityAssembly(a);
}

export function defaultGridfinityAssembly(){const a=migrateGridfinity(defaultGridfinity());a.plates[0].project={...a.plates[0].project,columns:4,rows:4};return a;}
export function trayFootprint(t:GridfinityTray){return t.rotated?[t.project.rows,t.project.columns]:[t.project.columns,t.project.rows];}
const overlap=(a:{x:number;y:number},aw:number,ah:number,b:{x:number;y:number},bw:number,bh:number)=>a.x<b.x+bw&&a.x+aw>b.x&&a.y<b.y+bh&&a.y+ah>b.y;
export function plateAt(a:GridfinityAssembly,x:number,y:number){
 return a.plates.find(p=>x>=p.x&&y>=p.y&&x<p.x+p.project.columns&&y<p.y+p.project.rows);
}
export function trayOrigin(a:GridfinityAssembly,t:GridfinityTray){
 const plate=a.plates.find(p=>p.id===t.plateId);
 if(!plate)throw Error('Некорректный комплект Gridfinity.');
 return {x:plate.x+t.x,y:plate.y+t.y};
}
export function gridBounds(a:GridfinityAssembly){
 return [Math.max(...a.plates.map(p=>p.x+p.project.columns)),Math.max(...a.plates.map(p=>p.y+p.project.rows))];
}
function trayPlacementError(a:GridfinityAssembly,t:GridfinityTray){
 const origin=trayOrigin(a,t),[w,h]=trayFootprint(t);
 const outside=a.drawer?'Лоток выходит за границы ящика.':'Лоток выходит за границы плиты. Увеличьте плиту или перенесите лоток.';
 if(plateAt(a,origin.x,origin.y)?.id!==t.plateId)return outside;
 for(let y=origin.y;y<origin.y+h;y++)for(let x=origin.x;x<origin.x+w;x++)if(!plateAt(a,x,y))return outside;
 for(const q of a.trays)if(q.id!==t.id){
   const [qw,qh]=trayFootprint(q);
   if(overlap(origin,w,h,trayOrigin(a,q),qw,qh))return 'Лотки пересекаются. Выберите свободные ячейки.';
 }
 return '';
}
export function validateGridfinityAssembly(a:GridfinityAssembly){
 if(!a||a.kind!=='replixgrid-gridfinity-assembly'||a.schemaVersion!==1||!Array.isArray(a.plates)||!Array.isArray(a.trays)||a.plates.length<1||a.plates.length>32||a.trays.length>128)throw Error('Некорректный комплект Gridfinity.');
 const ids=new Set<string>();
 for(const item of [...a.plates,...a.trays]){if(typeof item.id!=='string'||!item.id||ids.has(item.id)||typeof item.name!=='string'||item.name.length>80||![item.x,item.y].every(v=>Number.isInteger(v)&&v>=0&&v<=200))throw Error('Некорректный комплект Gridfinity.');ids.add(item.id);validateGridfinity(item.project);}
 for(let i=0;i<a.plates.length;i++){const p=a.plates[i];for(const q of a.plates.slice(i+1))if(overlap(p,p.project.columns,p.project.rows,q,q.project.columns,q.project.rows))throw Error('Плиты пересекаются.');}
 const pitch=a.drawer?drawerPitch(a.drawer):gridPitch(a.plates[0].project);
 const matches=(p:GridfinityProject,rotated=false)=>gridPitch(p).every((v,i)=>Math.abs(v-pitch[rotated?1-i:i])<1e-8);
 if(a.plates.some(p=>!matches(p.project)))throw Error('Некорректный комплект Gridfinity.');
 if(a.drawer){
   const {columns,rows}=a.drawer;
   if(a.plates.some(p=>p.x+p.project.columns>columns||p.y+p.project.rows>rows)||a.plates.reduce((sum,p)=>sum+p.project.columns*p.project.rows,0)!==columns*rows)throw Error('Некорректный комплект Gridfinity.');
 }
 for(const t of a.trays){
  if(typeof t.rotated!=='boolean'||!matches(t.project,t.rotated))throw Error('Некорректный комплект Gridfinity.');
  const error=trayPlacementError(a,t);if(error)throw Error(error);
 }
 return a;
}
export function parseGridfinityAssembly(text:string){const p=JSON.parse(text);return p?.kind==='replixgrid-gridfinity'?migrateGridfinity(p):validateGridfinityAssembly(p);}
export function selectedGridfinity(a:GridfinityAssembly,s:GridfinitySelection){return (s.kind==='plate'?a.plates:a.trays).find(v=>v.id===s.id);}
export function updateGridfinityPart(a:GridfinityAssembly,s:GridfinitySelection,project:GridfinityProject){if(s.kind==='plate')project={...project,root:undefined,compartmentsX:1,compartmentsY:1};return validateGridfinityAssembly({...a,[s.kind==='plate'?'plates':'trays']:(s.kind==='plate'?a.plates:a.trays).map(v=>v.id===s.id?{...v,project}:v)});}
export function addGridfinityPlate(a:GridfinityAssembly,source?:GridfinityPlate){
 if(a.drawer)throw Error('Размеры плит определяются размерами ящика.');
 const project=source?structuredClone(source.project):{...defaultGridfinity(),columns:4,rows:4};
 const plate={id:uid(),name:'',x:Math.max(...a.plates.map(p=>p.x+p.project.columns)),y:0,project};
 return {assembly:validateGridfinityAssembly({...a,plates:[...a.plates,plate],trays:[...a.trays,...(source?a.trays.filter(t=>t.plateId===source.id).map(t=>({...structuredClone(t),id:uid(),plateId:plate.id})):[])]}),selection:{kind:'plate',id:plate.id} as GridfinitySelection};
}
export function addGridfinityTray(a:GridfinityAssembly,plateId:string,source?:GridfinityTray){
 const p=a.plates.find(p=>p.id===plateId);if(!p)throw Error('Выберите плиту.');
 const tray:GridfinityTray={id:uid(),name:'',plateId,x:0,y:0,rotated:source?.rotated??false,project:source?structuredClone(source.project):{...defaultGridfinity(),columns:1,rows:1}};
 if(!source&&p.project.pitch)tray.project.pitch=[...p.project.pitch];
 const candidates=a.drawer?[p,...a.plates.filter(q=>q.id!==p.id)]:[p];
 for(const plate of candidates)for(let y=0;y<plate.project.rows;y++)for(let x=0;x<plate.project.columns;x++){
   const candidate={...tray,plateId:plate.id,x,y};
   if(!trayPlacementError(a,candidate))return {assembly:validateGridfinityAssembly({...a,trays:[...a.trays,candidate]}),selection:{kind:'tray',id:tray.id} as GridfinitySelection};
 }
 throw Error('На плите нет места. Увеличьте её или добавьте плиту.');
}
export function moveGridfinityPart(a:GridfinityAssembly,s:GridfinitySelection,x:number,y:number,plateId?:string){
 if(s.kind==='plate'&&a.drawer)throw Error('Размеры плит определяются размерами ящика.');
 const key=s.kind==='plate'?'plates':'trays';
 return validateGridfinityAssembly({...a,[key]:a[key].map(v=>v.id===s.id?{...v,x:Math.round(x),y:Math.round(y),...(s.kind==='tray'&&plateId?{plateId}:{})}:v)});
}
/** Keep the anchor if possible; find the closest supported footprint around the old centre otherwise. */
export function rotateGridfinityTray(a:GridfinityAssembly,id:string){
 validateGridfinityAssembly(a);
 const tray=a.trays.find(t=>t.id===id);if(!tray)throw Error('Некорректный комплект Gridfinity.');
 const rotated={...tray,rotated:!tray.rotated,project:tray.project.pitch?{...tray.project,pitch:[tray.project.pitch[1],tray.project.pitch[0]] as [number,number]}:tray.project};
 const origin=trayOrigin(a,tray),[w,h]=trayFootprint(rotated),[oldW,oldH]=trayFootprint(tray);
 let best:GridfinityTray|undefined,distance=Infinity;
 if(!trayPlacementError(a,rotated))best=rotated;
 else for(const plate of (a.drawer?a.plates:a.plates.filter(p=>p.id===tray.plateId)))for(let y=0;y<plate.project.rows;y++)for(let x=0;x<plate.project.columns;x++){
   const d=(plate.x+x-origin.x+(w-oldW)/2)**2+(plate.y+y-origin.y+(h-oldH)/2)**2;
   if(d>=distance)continue;
   const candidate={...rotated,plateId:plate.id,x,y};
   if(!trayPlacementError(a,candidate)){best=candidate;distance=d;}
 }
 if(!best)throw Error('На плите нет места. Увеличьте её или добавьте плиту.');
 return validateGridfinityAssembly({...a,trays:a.trays.map(t=>t.id===id?best!:t)});

}
export function removeGridfinityPart(a:GridfinityAssembly,s:GridfinitySelection){
 if(s.kind==='plate'){if(a.drawer)throw Error('Размеры плит определяются размерами ящика.');if(a.plates.length===1)throw Error('В комплекте должна остаться хотя бы одна плита.');if(a.trays.some(t=>t.plateId===s.id))throw Error('Сначала перенесите или удалите лотки этой плиты.');return validateGridfinityAssembly({...a,plates:a.plates.filter(v=>v.id!==s.id)});}
 return {...a,trays:a.trays.filter(v=>v.id!==s.id)};
}
export function gridfinityAssemblyItems(a:GridfinityAssembly){
 const [px,py]=gridPitch(a.plates[0].project);
 return a.plates.flatMap((p,i)=>[
  {id:p.id,kind:'plate' as const,name:`plate-${i+1}`,project:p.project,color:gridfinityColor(p.project,'plate'),position:[p.x*px,p.y*py,0] as [number,number,number],rotated:false},
  ...a.trays.filter(t=>t.plateId===p.id).map(t=>({id:t.id,kind:'tray' as const,name:`plate-${i+1}-tray-${a.trays.indexOf(t)+1}`,project:t.project,color:gridfinityColor(t.project,'tray'),position:[(p.x+t.x)*px+.25,(p.y+t.y)*py+.25,1.2] as [number,number,number],rotated:t.rotated}))
 ]);
}

export function transferGridfinityTray(a:GridfinityAssembly,id:string,plateId:string){
 const tray=a.trays.find(t=>t.id===id);if(!tray)throw Error('Некорректный комплект Gridfinity.');
 try{return moveGridfinityPart(a,{kind:'tray',id},tray.x,tray.y,plateId);}catch{
  const without={...a,trays:a.trays.filter(t=>t.id!==id)},added=addGridfinityTray(without,plateId,tray),placed=added.assembly.trays.at(-1)!;
  return validateGridfinityAssembly({...a,trays:a.trays.map(t=>t.id===id?{...t,x:placed.x,y:placed.y,plateId:placed.plateId}:t)});
 }
}
export function gridfinityExportItems(a:GridfinityAssembly,selection:GridfinitySelection,target:string){
 validateGridfinityAssembly(a);
 const plateId=selection.kind==='plate'?selection.id:a.trays.find(t=>t.id===selection.id)?.plateId;
 const items=gridfinityAssemblyItems(a);
 const plate=a.plates.find(p=>p.id===plateId);
 const result=target==='all'?items:target==='kit'?items.filter(item=>item.id===plateId||a.trays.some(t=>t.id===item.id&&plate&&overlap(trayOrigin(a,t),trayFootprint(t)[0],trayFootprint(t)[1],plate,plate.project.columns,plate.project.rows))):target==='plate'?items.filter(v=>v.id===plateId&&v.kind==='plate'):(target==='tray'||target==='lid'||target==='tag')?items.filter(v=>v.kind==='tray'&&v.id===selection.id):[];
 const parts=result.flatMap((item)=>{
   const candidates:Array<Omit<typeof item,'kind'>&{kind:'lid'|'plate'|'tray'|'tag'}>=[item];
   if(item.kind==='tray'){
     if(hasGridfinityLid(item.project))candidates.push({...item,kind:'lid',name:item.name+'-lid'});
     if(item.project.label?.mode==='tag')candidates.push({...item,kind:'tag',name:item.name+'-tag'});
   }
   return target==='all'||target==='kit'?candidates:candidates.filter(v=>v.kind===target);
 });
 if(!parts.length)throw Error('Нет деталей для экспорта');
 return parts;
}
