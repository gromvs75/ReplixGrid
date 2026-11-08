import {validateSvgPattern} from './svgPattern.js';
import {stackFit,SOCKET_BASE} from './stackFit.js';
import {resolveWalls,type Project,type Cell,type Wall} from './model.js';
import {regions} from './editor.js';
import {honeyCellHeight,contourHeight,topAt} from './shell.js';
import {lidMotifs} from './lidMotifs.js';
import {reliefPatterns} from './reliefPatterns.js';

/** Legacy saved height is ignored: inserts follow their own compartment. */
export function insertHeight(p:Project,cellId:string,walls=resolveWalls({...p,cups:undefined})):number {
 const r=regions(p).find(r=>r.cell.id===cellId&&!r.cell.split);
 if(!r)throw new Error('Отсек вставки не найден.');
 const x=r.x+r.width/2,y=r.y+r.depth/2;
 return insertHeightAt(p,cellId,x,y,walls);
}
export function insertHeightAt(p:Project,cellId:string,x:number,y:number,walls:Wall[],insertBounds?:{minX:number;maxX:number;minY:number;maxY:number},followOuterWaves=false):number {
 // A notch belongs only to compartments touching that exterior wall.
 const r=regions(p).find(r=>r.cell.id===cellId&&!r.cell.split);
 // When a compartment is bounded by two internal partitions, its insert top
 // follows those actual partitions, not a blend of distant outer walls.
 if(r&&p.footprint!=='honeycomb'){
  const internal=walls.slice(4),eps=.02,spanTolerance=p.wallThickness+.02;
  const left=internal.find(w=>w.axis==='y'&&Math.abs(w.x+w.thickness-r.x)<eps&&w.y<=r.y+spanTolerance&&w.y+w.length>=r.y+r.depth-spanTolerance);
  const right=internal.find(w=>w.axis==='y'&&Math.abs(w.x-(r.x+r.width))<eps&&w.y<=r.y+spanTolerance&&w.y+w.length>=r.y+r.depth-spanTolerance);
  const front=internal.find(w=>w.axis==='x'&&Math.abs(w.y+w.thickness-r.y)<eps&&w.x<=r.x+spanTolerance&&w.x+w.length>=r.x+r.width-spanTolerance);
  const back=internal.find(w=>w.axis==='x'&&Math.abs(w.y-(r.y+r.depth))<eps&&w.x<=r.x+spanTolerance&&w.x+w.length>=r.x+r.width-spanTolerance);
  const height=(w:Wall,at:number)=>topAt({...w,cutout:undefined,transitionStyle:'straight',wavelength:undefined},at);
  if(p.steppedWalls){
   // A step is a level compartment, not a ramp between its two dividers.
   // Use the lowest enclosing wall at the compartment centre, keeping the
   // same one-millimetre clearance as the other insert types.
   const cx=r.x+r.width/2,cy=r.y+r.depth/2;
   const enclosing=[left,right,front,back].filter((w):w is Wall=>!!w);
   if(r.y<=p.wallThickness+eps)enclosing.push(walls[0]);
   if(r.y+r.depth>=p.depth-p.wallThickness-eps)enclosing.push(walls[1]);
   if(!p.footprint&&r.x<=p.wallThickness+eps)enclosing.push(walls[2]);
   if(!p.footprint&&r.x+r.width>=p.width-p.wallThickness-eps)enclosing.push(walls[3]);
   if(enclosing.length)return Math.min(...enclosing.map(w=>height(w,w.axis==='x'?cx-w.x:cy-w.y)))-p.floorThickness-1;
  }
  const plain=followOuterWaves?walls.map(w=>({...w,transitionStyle:'straight' as const,wavelength:undefined,cutout:undefined})):walls;
  const wave=(a:number,b:number)=>followOuterWaves?contourHeight(p,walls,a,b)-contourHeight(p,plain,a,b):0;
  if(left&&right){const lo=insertBounds?.minX??r.x,hi=insertBounds?.maxX??r.x+r.width,u=Math.max(0,Math.min(1,(x-lo)/(hi-lo)));return height(left,y-left.y)*(1-u)+height(right,y-right.y)*u+wave(x,y)-wave(lo,y)*(1-u)-wave(hi,y)*u-p.floorThickness-1;}
  if(front&&back){const lo=insertBounds?.minY??r.y,hi=insertBounds?.maxY??r.y+r.depth,u=Math.max(0,Math.min(1,(y-lo)/(hi-lo)));return height(front,x-front.x)*(1-u)+height(back,x-back.x)*u+wave(x,y)-wave(x,lo)*(1-u)-wave(x,hi)*u-p.floorThickness-1;}
  // End compartments have only one internal partition. Keep the outer
  // contour profile while matching the insert edge to that partition.
  if(insertBounds&&(left||right)){
   const lo=insertBounds.minX,hi=insertBounds.maxX,u=Math.max(0,Math.min(1,(x-lo)/(hi-lo))),edge=left?lo:hi,w=left??right!;
   return contourHeight(p,walls,x,y)+(height(w,y-w.y)-contourHeight(p,walls,edge,y))*(left?1-u:u)-p.floorThickness-1;
  }
  if(insertBounds&&(front||back)){
   const lo=insertBounds.minY,hi=insertBounds.maxY,u=Math.max(0,Math.min(1,(y-lo)/(hi-lo))),edge=front?lo:hi,w=front??back!;
   return contourHeight(p,walls,x,y)+(height(w,x-w.x)-contourHeight(p,walls,x,edge))*(front?1-u:u)-p.floorThickness-1;
  }
 }
 if(r&&p.footprint!=='honeycomb')walls=walls.map(w=>{
  const touches=w.id==='left'?r.x<=p.wallThickness+.01:w.id==='right'?r.x+r.width>=p.width-p.wallThickness-.01:w.id==='front'?r.y<=p.wallThickness+.01:w.id==='back'?r.y+r.depth>=p.depth-p.wallThickness-.01:true;
  return touches?w:{...w,cutout:undefined};
 });
 const rim=p.footprint==='honeycomb'?honeyCellHeight(p,walls,Number(cellId.slice(6)),x,y):contourHeight(p,walls,x,y);
 return rim-p.floorThickness-1;
}
export interface StackLevel {height:number;root:Cell;cutouts?:Project['cutouts'];cups?:CupSettings[];settings?:Partial<Project>}
export interface StackSettings {active:number;levels:StackLevel[];gap:number}
// height remains in saved projects for compatibility; geometry uses insertHeight().
export interface CupSettings {cellId:string;shape:'fitted'|'rounded'|'circle'|'oval'|'hexagon';height:number;content?:'empty'|'grid'|'pens';rows?:number;columns?:number;holeDiameter?:number;color?:string}
export function rimProblem(p:Project,walls=resolveWalls({...p,stack:undefined,lid:undefined,cups:undefined})):string {
 if(p.tilt)return 'Сначала уберите наклон: посадка рассчитана для вертикальных стенок.';
 if(p.printing)return 'Сначала отключите разделение для печати.';
 if(p.footprint==='honeycomb')return 'Ярусы и крышка пока доступны для единого контура, без сот.';
 const rim=walls.slice(0,4),h=rim[0].startHeight;
 if(rim.some(w=>(w.transitionStyle??'straight')!=='straight'||Math.abs(w.startHeight-h)>.001||Math.abs(w.endHeight-h)>.001))return 'Нужен ровный прямой верх: одинаковая высота внешних стенок, без волн и зигзага.';
 if(walls.slice(4).some(w=>Math.max(w.startHeight,w.endHeight)>h+.001))return 'Перегородки должны быть не выше внешних стенок.';
 return '';
}
export function stackRimProblem(p:Project):string {
 const walls=resolveWalls({...p,stack:undefined,lid:undefined,cups:undefined});
 if(walls.slice(4).some(w=>w.cutout))return 'Для ярусов вырезы перегородок пока недоступны.';
 for(const wall of walls.slice(0,4))if(wall.cutout){
  if(p.footprint)return 'Ярусы с передним вырезом пока доступны для прямоугольной основы.';
  const span=wall.length*.9,width=span*wall.cutout.width,lo=wall.length*.05+(span-width)*wall.cutout.position;
  if(Math.min(lo,wall.length-lo-width)<(p.cornerRadius??0)+8)return 'По бокам выреза оставьте опору: угол плюс не менее 8 мм прямой стенки.';
 }
 return rimProblem(p,walls.map(w=>({...w,cutout:undefined})));
}
export function stackProblem(p:Project):string {
 return stackRimProblem(p)||(p.shell?.snap?'Защёлки пока доступны для прямоугольной формы без наклона, рельефа, крышки, ярусов и разрезания.':p.stack&&p.shell?.mode==='panels'&&(p.shell.margin??4)<3?'Для ярусов нужен отступ панелей от краёв не меньше 3 мм.':'');
}
export const lidPlateThickness=(p:Project)=>p.lidDesign?.svg?(p.lidDesign.svgThickness??(p.lidDesign.svgMode!=='cutout'?3.2:2)):p.lidDesign?.olive?3.2:2;
export function validateAccessories(p:Project,walls:Wall[]) {
 if(p.lid!==undefined&&typeof p.lid!=='boolean')throw new Error('Некорректная крышка.');
 if(p.lidDesign){const d=p.lidDesign;if(d.svg)validateSvgPattern(d.svg);if(d.svgMode!==undefined&&!['raised','cutout'].includes(d.svgMode))throw new Error('Некорректный режим SVG крышки.');if((d.motif!==undefined&&!Object.prototype.hasOwnProperty.call(lidMotifs,d.motif))||(d.cutwork!==undefined&&typeof d.cutwork!=='boolean')||(d.raised!==undefined&&typeof d.raised!=='boolean')||(d.olive!==undefined&&typeof d.olive!=='boolean')||[d.baseColor,d.patternColor].some(c=>c!==undefined&&(typeof c!=='string'||!/^#[0-9a-f]{6}$/i.test(c)))||(d.fit!==undefined&&!['outer','inset'].includes(d.fit))||!['smooth','lines',...reliefPatterns].includes(d.pattern)||!['none','round','bar'].includes(d.handle)||(d.rimPattern!==undefined&&!['smooth','rings'].includes(d.rimPattern))||!Number.isFinite(d.rimHeight)||d.rimHeight<2||d.rimHeight>8||(d.handleEdge!==undefined&&!['none','chamfer','round'].includes(d.handleEdge))||[[d.svgThickness,1.2,6],[d.patternSpacing,4,16],[d.patternDepth,.2,1],[d.handleWidth,6,40],[d.handleHeight,3,20],[d.edgeSize,0,4]].some(([v,lo,hi])=>v!==undefined&&(!Number.isFinite(v)||v<lo!||v>hi!)))throw new Error('Некорректные настройки крышки.');}
 if(p.lid){const problem=rimProblem(p,walls);if(problem)throw new Error(problem);}
 if(p.lid&&p.lidDesign?.fit==='inset'){
  const top=p.stack?levelProject(p,p.stack.levels.length-1):p;
  const rim=p.stack?resolveWalls(top)[0].startHeight:walls[0].startHeight;
  if(!p.lidDesign.svg&&p.lidDesign.olive&&rim-top.floorThickness<5.2)throw new Error('Для двухцветной внутренней крышки нужна глубина от 5,2 мм.');
  if(p.lidDesign.svg&&rim-top.floorThickness<lidPlateThickness(p)+2)throw new Error('Для внутренней SVG-крышки нужна глубина не меньше толщины крышки плюс 2 мм.');
  if(top.wallThickness<2||rim-top.floorThickness<4)throw new Error('Для внутренней крышки нужна стенка от 2 мм и глубина от 4 мм.');
 }
 if(p.stack){
  const s=p.stack;
  if(!Array.isArray(s.levels)||s.levels.length<2||s.levels.length>5||!Number.isInteger(s.active)||s.active<0||s.active>=s.levels.length||!Number.isFinite(s.gap)||s.gap<.2||s.gap>1)throw new Error('Некорректные параметры ярусов.');
  if(s.levels.some((l,i)=>i>0&&i!==s.active&&l.settings?.baseBand))throw new Error('Нижний кант доступен только на первом ярусе.');
  for(let i=0;i<s.levels.length;i++){const lp=levelProject(p,i);if(lp.shell?.mode==='panels'&&(lp.shell.margin??4)<3)throw new Error('Для ярусов нужен отступ панелей от краёв не меньше 3 мм.');}
  const problem=stackProblem({...p,stack:undefined});if(problem)throw new Error(problem);
  for(const [i,level] of s.levels.entries())if(i!==s.active){const lp=levelProject(p,i);resolveWalls(lp);const why=stackProblem(lp);if(why)throw new Error(`Ярус ${i+1}: ${why}`);}
  for(let i=0;i<s.levels.length-1;i++){const lower=levelProject(p,i),fit=stackFit(levelProject(p,i+1),s.gap,lower);if(fit.hidden&&lower.wallThickness<s.gap+1.4)throw new Error('Уменьшите зазор посадки: гребень должен помещаться в толщине стенки.');}
 }
 if(p.cups){
  if(!Array.isArray(p.cups)||p.cups.length>16||new Set(p.cups.map(c=>c.cellId)).size!==p.cups.length)throw new Error('Не больше 16 стаканчиков: один на отсек.');
  if(p.cups.length&&p.printing)throw new Error('Вставки пока доступны без разделения для печати.');
  for(const c of p.cups)if(typeof c.cellId!=='string'||!['fitted','rounded','circle','oval','hexagon'].includes(c.shape)||!Number.isFinite(c.height)||c.height<8||c.height>150)throw new Error('Некорректный стаканчик.');
  for(const c of p.cups){
   if(c.color!==undefined&&(typeof c.color!=='string'||!/^#[0-9a-f]{6}$/i.test(c.color)))throw new Error('Некорректный цвет вставки.');
   if(c.content!==undefined&&!['empty','grid','pens'].includes(c.content))throw new Error('Неизвестный тип вставки.');
   for(const n of [c.rows,c.columns])if(n!==undefined&&(!Number.isInteger(n)||n<1||n>6))throw new Error('Выберите от 1 до 6 рядов и столбцов.');
   if(c.holeDiameter!==undefined&&(!Number.isFinite(c.holeDiameter)||c.holeDiameter<6||c.holeDiameter>30))throw new Error('Диаметр гнезда: от 6 до 30 мм.');
  }
  if(p.lid&&p.cups.some(c=>insertHeight(p,c.cellId,walls)+p.floorThickness>walls[0].startHeight-.5))throw new Error('Вставка слишком высокая для крышки.');
 }
}

// Dimensions and outer footprint are shared for mating; contents and appearance are per tier.
const localKeys=['height','root','heights','wallProfiles','transitions','transitionStyles','transitionWavelengths','cutouts','cups','colors','shell','innerCornerRadius','wallThickness','floorThickness','relief','label','baseBand'] as const;
function snapshot(p:Project):StackLevel {
 const settings:Partial<Project>={};
 for(const key of localKeys)(settings as Record<string,unknown>)[key]=structuredClone(p[key]);
 return {height:p.height,root:structuredClone(p.root),cutouts:structuredClone(p.cutouts),cups:structuredClone(p.cups),settings};
}
export function levelProject(p:Project,index:number):Project {
 const l=p.stack?.levels[index],current=!p.stack||index===p.stack.active;
 if(current)return {...p,stack:undefined,lid:undefined};
 const legacy={baseBand:index===0?p.baseBand:undefined,height:l!.height,root:structuredClone(l!.root),heights:{},wallProfiles:undefined,transitions:[],cutouts:l!.cutouts,cups:l!.cups};
 const settings=l!.settings?Object.fromEntries(localKeys.map(key=>[key,l!.settings![key]])):legacy;
 return {...p,...settings,stack:undefined,lid:undefined};
}
export function switchLevel(p:Project,index:number):Project {
 if(!p.stack||index===p.stack.active)return p;
 const d=structuredClone(p),s=d.stack!;
 // Freeze legacy tiers before any local edits can leak through inherited settings.
 s.levels=s.levels.map((l,i)=>i===s.active?snapshot(p):l.settings?l:snapshot(levelProject(p,i)));
 const target=levelProject(d,index);if(!s.levels[index])throw new Error('Ярус не найден.');
 for(const key of localKeys)(d as unknown as Record<string,unknown>)[key]=structuredClone(target[key]);
 s.active=index;return d;
}
export function setLevelCount(p:Project,count:number):Project {
 if(count===1){const d=structuredClone(p);delete d.stack;return d;}
 if(!Number.isInteger(count)||count<2||count>5)throw new Error('Выберите от 2 до 5 ярусов.');
 const why=stackProblem(p);if(why)throw new Error(why);
 let d=structuredClone(p);
 if(d.shell?.mode==='panels')d.shell.margin=Math.max(3,d.shell.margin??4);
 if(!d.stack)d.stack={active:0,gap:.5,levels:[snapshot(d)]};
 else {
  d.stack.levels=d.stack.levels.map((l,i)=>i===d.stack!.active?snapshot(d):l.settings?l:snapshot(levelProject(d,i)));
 }
 if(d.stack.active>=count)d=switchLevel(d,count-1);
 d.stack!.levels=d.stack!.levels.slice(0,count);
 while(d.stack!.levels.length<count){
  const empty={...d,baseBand:undefined,height:resolveWalls({...d,stack:undefined})[0].startHeight,root:{id:crypto.randomUUID()},cups:undefined,heights:{},wallProfiles:undefined,transitions:[]};
  d.stack!.levels.push(snapshot(empty));
 }
 return d;
}

export function hasAnyShell(p:Project):boolean {return !!p.shell||!!p.stack?.levels.some((level,i)=>i!==p.stack!.active&&!!level.settings?.shell);}

export function tierElevation(p:Project,index:number){let z=0;for(let i=0;i<index;i++){const lower=levelProject(p,i),upper=levelProject(p,i+1);z+=resolveWalls(lower)[0].startHeight+(stackFit(upper,p.stack!.gap,lower).hidden?SOCKET_BASE:0);}return z;}
