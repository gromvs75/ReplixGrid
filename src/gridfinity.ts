import {gridfinityInscription} from './gridfinityLabel.js';
import {stackingLipHeight} from './gridfinityLip.js';
import {defaultModelColor} from './appearance.js';
import {defaultProject,resolveWalls,type Cell,type WallCutout,type Project} from './model.js';
import {regions} from './editor.js';
/** Gridfinity interface dimensions adapted from gridfinity-rebuilt-openscad.
 * See public/licenses/GRIDFINITY-MIT.txt for both upstream MIT notices. */
export const GRIDFINITY = {pitch:42, gap:0.5, radius:3.75, footHeight:4.75, floorHeight:7, plateFloor:1.2, plateOpening:31.6} as const;
export const gridfinityPlateScrew = {floor:2.8, shaftDiameter:3.5, headDiameter:6.5, headClearance:.35} as const;
export interface GridfinityProject {
  kind:'replixgrid-gridfinity'; schemaVersion:1;
  pitch?:[number,number];
  columns:number; rows:number; heightUnits:number;
  compartmentsX:number; compartmentsY:number; wall:number; clearance:number;
  outerRadius?:number; innerRadius?:number;
  floorRadius?:number; frontNotch?:boolean; sideGrips?:boolean;
  pairedNotches?:{walls:'left-right'|'front-back';width?:number;depth?:number;toFloor?:boolean};
  notchShape?:WallCutout['shape']; notchWidth?:number; notchDepth?:number;
  label?:{mode:'engraved'|'tag';text:string;size?:number;shelf?:'inclined'|'flat'};
  // Saved boolean values select the original through grip (true) or a plain lid (false).
  flushLidGrip?:boolean|'recessed';
  lid?:'none'|'plain'|'stackable';
  stackingLip?:boolean;
  plateStyle?:'solid'|'lattice';
  plateScrewMount?:boolean;
  root?:Cell; colors?:{tray?:string;plate?:string};
}
export const gridPitch=(p:GridfinityProject):[number,number]=>p.pitch??[GRIDFINITY.pitch,GRIDFINITY.pitch];
export const defaultGridfinity = ():GridfinityProject => ({kind:'replixgrid-gridfinity',schemaVersion:1,columns:2,rows:2,heightUnits:4,compartmentsX:1,compartmentsY:1,wall:1.6,clearance:0.10,plateStyle:'solid',outerRadius:3.75,innerRadius:0});
export function validateGridfinity(p:GridfinityProject){
  if(!p||p.kind!=='replixgrid-gridfinity'||p.schemaVersion!==1)throw Error('Некорректный проект Gridfinity.');
  if(p.pitch!==undefined&&(!Array.isArray(p.pitch)||p.pitch.length!==2||!p.pitch.every(n=>Number.isFinite(n)&&n>=36&&n<=84)))throw Error('Некорректные размеры Gridfinity.');
  if(p.floorRadius!==undefined&&(!Number.isFinite(p.floorRadius)||p.floorRadius<0||p.floorRadius>12))throw Error('Некорректные размеры Gridfinity.');
  if([p.frontNotch,p.sideGrips].some(value=>value!==undefined&&typeof value!=='boolean'))throw Error('Некорректный проект Gridfinity.');
  if(p.notchShape!==undefined&&!['round','smooth','square'].includes(p.notchShape))throw Error('Некорректный проект Gridfinity.');
  if(p.notchWidth!==undefined&&(!Number.isFinite(p.notchWidth)||p.notchWidth<1||p.notchWidth>8*84-GRIDFINITY.gap-10))throw Error('Некорректные размеры Gridfinity.');
  if(p.notchDepth!==undefined&&(!Number.isFinite(p.notchDepth)||p.notchDepth<1||p.notchDepth>20*7+stackingLipHeight-GRIDFINITY.floorHeight-2))throw Error('Некорректные размеры Gridfinity.');
  if(p.pairedNotches!==undefined){
    const cuts=p.pairedNotches;
    if(!cuts||!['left-right','front-back'].includes(cuts.walls)||
      (cuts.toFloor!==undefined&&typeof cuts.toFloor!=='boolean')||
      (cuts.width!==undefined&&(!Number.isFinite(cuts.width)||cuts.width<1||cuts.width>8*84-GRIDFINITY.gap-10))||
      (cuts.depth!==undefined&&(!Number.isFinite(cuts.depth)||cuts.depth<1||cuts.depth>20*7+stackingLipHeight-GRIDFINITY.floorHeight)))
      throw Error('Некорректные размеры Gridfinity.');
  }
  if(p.flushLidGrip!==undefined&&typeof p.flushLidGrip!=='boolean'&&p.flushLidGrip!=='recessed')throw Error('Некорректный проект Gridfinity.');
  if(p.lid!==undefined&&!['none','plain','stackable'].includes(p.lid))throw Error('Некорректный проект Gridfinity.');
  if(p.stackingLip!==undefined&&typeof p.stackingLip!=='boolean')throw Error('Некорректный проект Gridfinity.');
  if(p.plateStyle!==undefined&&p.plateStyle!=='solid'&&p.plateStyle!=='lattice')throw Error('Некорректный проект Gridfinity.');
  if(p.plateScrewMount!==undefined&&typeof p.plateScrewMount!=='boolean')throw Error('Некорректный проект Gridfinity.');
  const integer=(n:number,min:number,max:number)=>Number.isInteger(n)&&n>=min&&n<=max;
  if(!integer(p.columns,1,8)||!integer(p.rows,1,8)||!Number.isFinite(p.heightUnits)||p.heightUnits<2||p.heightUnits>20||!integer(p.compartmentsX,1,8)||!integer(p.compartmentsY,1,8)||!Number.isFinite(p.wall)||p.wall<1.2||p.wall>3||!Number.isFinite(p.clearance)||p.clearance<0.1||p.clearance>0.2)throw Error('Некорректные размеры Gridfinity.');
  if(!p.root&&((p.columns*gridPitch(p)[0]-.5-(p.compartmentsX+1)*p.wall)/p.compartmentsX<4||(p.rows*gridPitch(p)[1]-.5-(p.compartmentsY+1)*p.wall)/p.compartmentsY<4))throw Error('Отсек получается слишком узким. Уменьшите число отсеков.');
  if(p.label!==undefined){
    if(!p.label||!['engraved','tag'].includes(p.label.mode)||typeof p.label.text!=='string'||p.label.text.length>18)throw Error('Некорректная подпись.');
    if(p.label.shelf!==undefined&&!['inclined','flat'].includes(p.label.shelf))throw Error('Некорректная подпись.');
    if(p.label.size!==undefined&&(!Number.isFinite(p.label.size)||p.label.size<2||p.label.size>7.6))throw Error('Некорректная подпись.');
    gridfinityInscription(p);
  }
  const {outerRadius,innerRadius}=gridfinityRadii(p);
  if(!Number.isFinite(outerRadius)||outerRadius<0||outerRadius>GRIDFINITY.radius||!Number.isFinite(innerRadius)||innerRadius<0||innerRadius>20)throw Error('Радиус слишком большой для этих размеров. Уменьшите радиус углов.');
  if(p.colors!==undefined&&(!p.colors||typeof p.colors!=='object'||Array.isArray(p.colors)||Object.entries(p.colors).some(([k,v])=>!['tray','plate'].includes(k)||typeof v!=='string'||!/^#[0-9a-f]{6}$/i.test(v))))throw Error('Некорректный проект Gridfinity.');
  try{resolveWalls(gridfinityEditorProject(p));}catch{throw Error('Размер не оставляет достаточно места соседним отсекам.');}
  return p;
}
export function parseGridfinity(text:string){return validateGridfinity(JSON.parse(text));}
export const lidLocatorDepth = 1;
export const lidDeckThickness = 2;
export function gridfinityLidDeck(p:GridfinityProject){
  if(p.flushLidGrip==='recessed')return 6.2;
  return p.label?.mode==='tag'?3.2:lidDeckThickness;
}
// On a plain rim, each locating pad widens above its opening until the pads
// meet over the dividers and support the whole outline, including its corners.
export function lidDeckBase(p:GridfinityProject){
  if(p.stackingLip)return GRIDFINITY.footHeight;
  const radius=Math.max(gridfinityRadii(p).outerRadius,Math.min(gridfinityRadii(p).innerRadius,gridfinityInnerRadiusLimit(p)));
  return lidLocatorDepth+Math.ceil((Math.SQRT2*p.wall+(Math.SQRT2-1)*radius+.2)*10)/10;
}
export function lidDeckTop(p:GridfinityProject){return lidDeckBase(p)+gridfinityLidDeck(p);}
export function hasGridfinityLid(p:GridfinityProject){return p.lid==='plain'||p.lid==='stackable';}
export function gridfinityLidBaseZ(p:GridfinityProject){return p.heightUnits*7-(p.stackingLip?0:lidLocatorDepth);}

export function gridfinityPlateFloor(p:GridfinityProject){
  return p.plateScrewMount?gridfinityPlateScrew.floor:GRIDFINITY.plateFloor;
}
export function gridfinitySize(p:GridfinityProject,part:'tray'|'plate'){
  return part==='tray'?[p.columns*gridPitch(p)[0]-.5,p.rows*gridPitch(p)[1]-.5,p.heightUnits*7+(p.stackingLip?stackingLipHeight:0)]:[p.columns*gridPitch(p)[0],p.rows*gridPitch(p)[1],gridfinityPlateFloor(p)+GRIDFINITY.footHeight];
}

// Leave a flat floor and room for the lid locator, even in narrow or shallow cells.
export function gridfinityFloorRadius(p:GridfinityProject,width:number,depth:number){
  return Math.max(0,Math.min(p.floorRadius??0,(width-2)/2,(depth-2)/2,p.heightUnits*7-GRIDFINITY.floorHeight-1.5));
}
export function gridfinityNotch(p:GridfinityProject){
  const center=(p.columns*gridPitch(p)[0]-.5)/2,top=gridfinitySize(p,'tray')[2];
  const maxWidth=2*center-10,maxDepth=top-GRIDFINITY.floorHeight-2;
  const width=Math.min(p.notchWidth??24,maxWidth),depth=Math.min(p.notchDepth??12,maxDepth);
  return {center,width,depth,maxWidth,maxDepth,shape:p.notchShape??'round',top,reach:p.stackingLip?Math.max(4.1,p.wall+.1):p.wall+.1};
}

export function gridfinityPairedNotches(p:GridfinityProject){
  const [w,d,top]=gridfinitySize(p,'tray');
  const walls=p.pairedNotches?.walls??(d>=w?'left-right':'front-back');
  const span=walls==='left-right'?d:w;
  const maxWidth=span-10,maxDepth=top-GRIDFINITY.floorHeight;
  const width=Math.min(p.pairedNotches?.width??span/3,maxWidth);
  const depth=p.pairedNotches?.toFloor?maxDepth:Math.min(p.pairedNotches?.depth??12,maxDepth);
  return {walls,span,width,depth,top,maxWidth,maxDepth};
}

/** Missing radii keep older projects geometrically unchanged. */
export function gridfinityRadii(p:GridfinityProject){return {outerRadius:p.outerRadius===undefined?GRIDFINITY.radius:p.outerRadius,innerRadius:p.innerRadius===undefined?0:p.innerRadius};}
export function gridfinityInnerRadiusLimit(p:GridfinityProject){return Math.min(20,...gridfinityRegions(p).filter(r=>!r.cell.split).map(r=>Math.min(r.width,r.depth)/2));}
export function gridfinityColor(p:GridfinityProject,part:'tray'|'plate'){return p.colors?.[part]??defaultModelColor;}
/** Adapt the independent project to the existing pure compartment editing tools. */
export function gridfinityEditorProject(p:GridfinityProject):Project{
  const width=p.columns*gridPitch(p)[0]-.5,depth=p.rows*gridPitch(p)[1]-.5;
  const row=(axis:'x'|'y',count:number,span:number,id:string,leaf:(id:string)=>Cell):Cell=>{
    if(count===1)return leaf(id);
    const size=(span-(count-1)*p.wall)/count;
    return {id,split:{axis,ratio:size/(span-p.wall),first:leaf(id+'a'),second:row(axis,count-1,span-size-p.wall,id+'b',leaf)}};
  };
  const root=p.root??row('x',p.compartmentsX,width-2*p.wall,'root',id=>row('y',p.compartmentsY,depth-2*p.wall,id,id=>({id})));
  return {...defaultProject(),width,depth,height:p.heightUnits*7,floorThickness:7,wallThickness:p.wall,root,cornerRadius:gridfinityRadii(p).outerRadius};
}
export function gridfinityRegions(p:GridfinityProject){return regions(gridfinityEditorProject(p));}
