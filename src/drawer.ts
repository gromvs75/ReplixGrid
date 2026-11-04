import {parseProject} from './editor.js';
import {defaultProject,type Project} from './model.js';
export interface TrayBounds {width:number;depth:number;height:number}
export interface DrawerTray {id:string;name:string;x:number;y:number;rotation:0|90;project:Project}
export interface DrawerLayout {schemaVersion:1;kind:'replixgrid-drawer';id:string;name:string;width:number;depth:number;height:number;gap:number;viewRotation?:0|90;trays:DrawerTray[]}
export function newDrawer():DrawerLayout{return {schemaVersion:1,kind:'replixgrid-drawer',id:crypto.randomUUID(),name:'',width:180,depth:280,height:80,gap:2,viewRotation:0,trays:[]};}
export function newTray(name:string,width:number,depth:number,height:number):DrawerTray{
 const project={...defaultProject(),width,depth,height,cornerRadius:Math.min(6,width/4,depth/4),root:{id:crypto.randomUUID()}};
 return {id:crypto.randomUUID(),name,x:0,y:0,rotation:0,project:parseProject(JSON.stringify(project))};
}
export function copyTray(project:Project,name:string,x=0,y=0):DrawerTray{return {id:crypto.randomUUID(),name,x,y,rotation:0,project:parseProject(JSON.stringify(project))};}
export function parseDrawer(raw:string):DrawerLayout{
 const d=JSON.parse(raw) as DrawerLayout;
 if(!d||d.kind!=='replixgrid-drawer'||d.schemaVersion!==1||typeof d.id!=='string'||typeof d.name!=='string'||d.name.length>80||!Array.isArray(d.trays)||d.trays.length>24)throw new Error('Некорректный файл ящика.');
 for(const [v,min,max] of [[d.width,20,2000],[d.depth,20,2000],[d.height,5,1000],[d.gap,0,20]])if(!Number.isFinite(v)||v<min||v>max)throw new Error('Проверьте размеры ящика и зазоры.');
 if(d.viewRotation!==undefined&&![0,90].includes(d.viewRotation))throw new Error('Некорректный файл ящика.');
 if(new Set(d.trays.map(t=>t.id)).size!==d.trays.length)throw new Error('Некорректный файл ящика.');
 return {...d,viewRotation:d.viewRotation??(d.width>d.depth?90:0),trays:d.trays.map(t=>{
  if(!t||typeof t.id!=='string'||typeof t.name!=='string'||t.name.length>80||![0,90].includes(t.rotation)||![t.x,t.y].every(v=>Number.isFinite(v)&&Math.abs(v)<=4000))throw new Error('Некорректный файл ящика.');
  return {...t,project:parseProject(JSON.stringify(t.project))};
 })};
}
export function trayRect(t:DrawerTray,b:TrayBounds){return {x:t.x,y:t.y,width:t.rotation===90?b.depth:b.width,depth:t.rotation===90?b.width:b.depth};}
/** Clearance uses assembled outer bounding rectangles, including all accessories. */
export function drawerIssues(d:DrawerLayout,bounds:Record<string,TrayBounds>){
 const issues:Record<string,string[]>={};for(const t of d.trays){const b=bounds[t.id];issues[t.id]=[];if(!b)continue;const r=trayRect(t,b),e=1e-3;
  if(r.x<d.gap-e||r.y<d.gap-e||r.x+r.width>d.width-d.gap+e||r.y+r.depth>d.depth-d.gap+e)issues[t.id].push('Выходит за границы или зазор ящика');
  if(b.height>d.height+e)issues[t.id].push('Выше доступной высоты ящика');
 }
 for(let i=0;i<d.trays.length;i++)for(let j=i+1;j<d.trays.length;j++){
  const a=d.trays[i],b=d.trays[j];if(!bounds[a.id]||!bounds[b.id])continue;const r=trayRect(a,bounds[a.id]),s=trayRect(b,bounds[b.id]),g=d.gap-1e-3;
  if(r.x<s.x+s.width+g&&s.x<r.x+r.width+g&&r.y<s.y+s.depth+g&&s.y<r.y+r.depth+g){issues[a.id].push('Пересечение или недостаточный зазор между лотками');issues[b.id].push('Пересечение или недостаточный зазор между лотками');}
 }return issues;
}

export function drawerViewRect(r:{x:number;y:number;width:number;depth:number},d:DrawerLayout){return d.viewRotation===90?{x:d.depth-r.y-r.depth,y:r.x,width:r.depth,depth:r.width}:r;}
export function drawerViewPoint(x:number,y:number,d:DrawerLayout){return d.viewRotation===90?{x:y,y:d.depth-x}:{x,y};}
