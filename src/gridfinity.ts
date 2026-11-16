import {defaultModelColor} from './appearance.js';
import {defaultProject,resolveWalls,type Cell,type Project} from './model.js';
import {regions} from './editor.js';
/** Gridfinity interface dimensions adapted from gridfinity-rebuilt-openscad.
 * See public/licenses/GRIDFINITY-MIT.txt for both upstream MIT notices. */
export const GRIDFINITY = {pitch:42, gap:0.5, radius:3.75, footHeight:4.75, floorHeight:7, plateFloor:1.2} as const;
export interface GridfinityProject {
  kind:'replixgrid-gridfinity'; schemaVersion:1;
  columns:number; rows:number; heightUnits:number;
  compartmentsX:number; compartmentsY:number; wall:number; clearance:number;
  outerRadius?:number; innerRadius?:number;
  root?:Cell; colors?:{tray?:string;plate?:string};
}
export const defaultGridfinity = ():GridfinityProject => ({kind:'replixgrid-gridfinity',schemaVersion:1,columns:2,rows:2,heightUnits:4,compartmentsX:1,compartmentsY:1,wall:1.6,clearance:0.10,outerRadius:3.75,innerRadius:0});
export function validateGridfinity(p:GridfinityProject){
  if(!p||p.kind!=='replixgrid-gridfinity'||p.schemaVersion!==1)throw Error('Некорректный проект Gridfinity.');
  const integer=(n:number,min:number,max:number)=>Number.isInteger(n)&&n>=min&&n<=max;
  if(!integer(p.columns,1,8)||!integer(p.rows,1,8)||!integer(p.heightUnits,2,20)||!integer(p.compartmentsX,1,8)||!integer(p.compartmentsY,1,8)||!Number.isFinite(p.wall)||p.wall<1.2||p.wall>3||!Number.isFinite(p.clearance)||p.clearance<0.1||p.clearance>0.2)throw Error('Некорректные размеры Gridfinity.');
  if(!p.root&&((p.columns*42-.5-(p.compartmentsX+1)*p.wall)/p.compartmentsX<4||(p.rows*42-.5-(p.compartmentsY+1)*p.wall)/p.compartmentsY<4))throw Error('Отсек получается слишком узким. Уменьшите число отсеков.');
  const {outerRadius,innerRadius}=gridfinityRadii(p);
  if(!Number.isFinite(outerRadius)||outerRadius<0||outerRadius>GRIDFINITY.radius||!Number.isFinite(innerRadius)||innerRadius<0||innerRadius>20)throw Error('Радиус слишком большой для этих размеров. Уменьшите радиус углов.');
  if(p.colors!==undefined&&(!p.colors||typeof p.colors!=='object'||Array.isArray(p.colors)||Object.entries(p.colors).some(([k,v])=>!['tray','plate'].includes(k)||typeof v!=='string'||!/^#[0-9a-f]{6}$/i.test(v))))throw Error('Некорректный проект Gridfinity.');
  try{resolveWalls(gridfinityEditorProject(p));}catch{throw Error('Размер не оставляет достаточно места соседним отсекам.');}
  return p;
}
export function parseGridfinity(text:string){return validateGridfinity(JSON.parse(text));}
export function gridfinitySize(p:GridfinityProject,part:'tray'|'plate'){
  return part==='tray'?[p.columns*42-.5,p.rows*42-.5,p.heightUnits*7]:[p.columns*42,p.rows*42,GRIDFINITY.plateFloor+GRIDFINITY.footHeight];
}

/** Missing radii keep older projects geometrically unchanged. */
export function gridfinityRadii(p:GridfinityProject){return {outerRadius:p.outerRadius===undefined?GRIDFINITY.radius:p.outerRadius,innerRadius:p.innerRadius===undefined?0:p.innerRadius};}
export function gridfinityInnerRadiusLimit(p:GridfinityProject){return Math.min(20,...gridfinityRegions(p).filter(r=>!r.cell.split).map(r=>Math.min(r.width,r.depth)/2));}
export function gridfinityColor(p:GridfinityProject,part:'tray'|'plate'){return p.colors?.[part]??defaultModelColor;}
/** Adapt the independent project to the existing pure compartment editing tools. */
export function gridfinityEditorProject(p:GridfinityProject):Project{
  const width=p.columns*42-.5,depth=p.rows*42-.5;
  const row=(axis:'x'|'y',count:number,span:number,id:string,leaf:(id:string)=>Cell):Cell=>{
    if(count===1)return leaf(id);
    const size=(span-(count-1)*p.wall)/count;
    return {id,split:{axis,ratio:size/(span-p.wall),first:leaf(id+'a'),second:row(axis,count-1,span-size-p.wall,id+'b',leaf)}};
  };
  const root=p.root??row('x',p.compartmentsX,width-2*p.wall,'root',id=>row('y',p.compartmentsY,depth-2*p.wall,id,id=>({id})));
  return {...defaultProject(),width,depth,height:p.heightUnits*7,floorThickness:7,wallThickness:p.wall,root,cornerRadius:gridfinityRadii(p).outerRadius};
}
export function gridfinityRegions(p:GridfinityProject){return regions(gridfinityEditorProject(p));}
