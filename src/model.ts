import {PANEL_WALL_MIN} from './panelSettings.js';
import {shellClipIssue} from './shellClips.js';
import {reliefPatterns,type ReliefPattern} from './reliefPatterns.js';
import {validateLabel} from './lettering.js';
import {validateAccessories,type StackSettings,type CupSettings} from './accessories.js';
import {footprintContour,lineSpan,type Footprint} from './footprint.js';
import {maxCornerRadius,roundedContour,clipRectangle,polygonArea} from './rounding.js';
export type TransitionStyle = 'straight' | 'wavy' | 'zigzag';
export interface WallCutout {shape:'smooth'|'round'|'square';width:number;depth:number;position:number}
export interface Relief {pattern:ReliefPattern;spacing:number;depth:number}
export interface WallProfile {start:number;end:number;style:TransitionStyle;wavelength?:number}
export type Side = 'front' | 'back' | 'left' | 'right';
export interface ShellSettings { pattern: 'honeycomb' | 'diamonds' | 'waves' | 'petals' | 'cubes' | 'triangles' | 'slots' | 'cellular'; gap: number; thickness: number; size: number; border?:number; snap?:boolean; mode?:'wrap'|'panels'; sides?:Side[]; margin?:number; mounts?:boolean }
export type Cell = { id: string; split?: {
  axis: 'x' | 'y'; ratio: number; height?: number; profile?:WallProfile; first: Cell; second: Cell;
} };
export interface PrintSettings {parts:2|3;bedWidth:number;bedDepth:number;bedHeight:number;printerId?:string}
export function validatePrintArea(area:Omit<PrintSettings,'parts'>){
  if(!area||typeof area!=='object'||Array.isArray(area))throw new Error('Некорректная область печати.');
  for(const value of [area.bedWidth,area.bedDepth,area.bedHeight])range(value,40,1000,'print area');
}
export interface Project {
  topEdge?:{style:"chamfer"|"round";size:number};
  capsuleSlope?:boolean;
  steppedWalls?:boolean;
  baseBand?:{height:number;style:'smooth'|'rings'|'steps'};
  label?:{text:string;icon:''|'★'|'♥';mode:'raised'|'engraved';side?:Side;font?:'pixel'|'sans'|'bold'|'serif';size?:number;depth?:number;position?:number};
  stack?:StackSettings;
  lid?:boolean;
  lidDesign?:{motif?:import("./lidMotifs.js").LidMotif;olive?:boolean;baseColor?:string;patternColor?:string;fit?:'outer'|'inset';pattern:'smooth'|'lines'|ReliefPattern;rimHeight:number;rimPattern?:'smooth'|'rings';handle:'none'|'round'|'bar';patternSpacing?:number;patternDepth?:number;handleWidth?:number;handleHeight?:number;handleEdge?:'none'|'chamfer'|'round';edgeSize?:number};
  cups?:CupSettings[];
  colors?:{organizer?:string;shell?:string};
  cutouts?:Record<string,WallCutout>;
  relief?:Relief;
  schemaVersion: 1;
  units: 'mm';
  width: number; depth: number; height: number;
  wallThickness: number; floorThickness: number;
  heights: Partial<Record<Side, number>>;
  /** Accepted transitions only. Endpoints are the perpendicular outer walls. */
  transitions: Side[];
  transitionStyles?: Partial<Record<Side, TransitionStyle>>;
  transitionWavelengths?: Partial<Record<Side, number>>;
  wallProfiles?: Partial<Record<Side, WallProfile>>;
  root: Cell;
  shell?: ShellSettings;
  cornerRadius?: number;
  innerCornerRadius?:number;
  cornerStyle?: 'round'|'chamfer';
  footprint?: Footprint;
  honeycombCount?:number;
  tilt?:number;
  honeycombHeights?: (number|null)[];
  printing?: PrintSettings;
  printArea?: Omit<PrintSettings,'parts'>;
}
/** Reserve at least 10% of the wall thickness as a flat crown. */
export const topEdgeLimit=(p:Project)=>Math.floor(p.wallThickness*4.5)/10;
export const topEdgeSize=(p:Project)=>Math.min(topEdgeLimit(p),p.topEdge?.size??0);
/** A square inner corner stays at least one wall thickness from a 45° cut. */
export function steppedChamferLimit(p:Project){return Math.floor((2-Math.SQRT2)*p.wallThickness*10)/10;}
export function limitSteppedChamfer(p:Project):Project{
 if(!p.steppedWalls||p.footprint||p.cornerStyle!=='chamfer')return p;
 const radius=Math.min(p.cornerRadius??0,steppedChamferLimit(p));
 return radius===(p.cornerRadius??0)?p:{...p,cornerRadius:radius};
}
export const defaultProject = (): Project => ({
  schemaVersion: 1, units: 'mm', width: 100, depth: 100, height: 30,
  wallThickness: 2, floorThickness: 2, heights: {}, transitions: [], root: {id: 'root'},
});
export interface Wall {
  id: string; axis: 'x' | 'y'; x: number; y: number;
  length: number; thickness: number; startHeight: number; endHeight: number;
  /** Flat caps extend over supporting walls; slope spans their inner faces. */
  cap: number;
  cutout?:WallCutout;
  /** Horizontal segments, with a vertical step at each x. */
  stepPoints?:[number,number][];
  minTop?:number;
  transitionStyle?: TransitionStyle;
  wavelength?:number;
}
export const LIMITS = { minFeature: 0.4, minCell: 2, maxSize: 1000, maxCells: 128, maxDepth: 32 };
const sides: Side[] = ['front', 'back', 'left', 'right'];
const endpoints: Record<Side, [Side, Side]> = {
  front: ['left', 'right'], back: ['left', 'right'],
  left: ['front', 'back'], right: ['front', 'back'],
};
function range(value: number, min: number, max: number, name: string) {
  if (!Number.isFinite(value) || value < min || value > max) throw new Error(`Invalid ${name}: ${value}`);
}
/** Only the straight, coupled capsule template has a single planar rim.
 * Individually shaped walls still use their editable wall profiles. */
export function hasCapsuleSlope(p:Project){
  return p.capsuleSlope===true && !p.footprint && !p.steppedWalls && (p.cornerRadius??0)>0 &&
    p.transitions.includes('front') && p.transitions.includes('back') &&
    !p.wallProfiles?.left && !p.wallProfiles?.right &&
    (['front','back'] as const).every(s=>(p.transitionStyles?.[s]??'straight')==='straight') &&
    !sides.some(s=>p.cutouts?.[s]);
}
export function capsuleTop(p:Project,x:number,offset=0){
  const lo=p.heights.left??p.height,hi=p.heights.right??p.height;
  return lo+(hi-lo)*(x+offset)/(p.width+2*offset);
}
export function resolveWalls(p: Project): Wall[] {
  if (p.schemaVersion !== 1 || p.units !== 'mm') throw new Error('Unsupported project format');
  range(p.width, 1, LIMITS.maxSize, 'width'); range(p.depth, 1, LIMITS.maxSize, 'depth');
  if(p.topEdge!==undefined){if(!p.topEdge||!["chamfer","round"].includes(p.topEdge.style))throw new Error("Invalid top edge");range(p.topEdge.size,0,LIMITS.maxSize,"top edge size");}
  range(p.innerCornerRadius??0,0,30,'inner corner radius');
  if(p.cornerStyle!==undefined&&!['round','chamfer'].includes(p.cornerStyle))throw new Error('Invalid corner style');
  range(p.cornerRadius??0,0,maxCornerRadius(p.width,p.depth),'corner radius');
  range(p.wallThickness, LIMITS.minFeature, 20, 'wall thickness');
  range(p.floorThickness, LIMITS.minFeature, 20, 'floor thickness');
  if(p.baseBand){
    if(!['smooth','rings','steps'].includes(p.baseBand.style))throw new Error('Неизвестный узор нижнего канта.');
    range(p.baseBand.height,1.2,12,'base band height');
    if(p.tilt||p.printing||p.stack)throw new Error('Нижний кант пока доступен без наклона, разделения и ярусов.');
    if(p.shell&&(p.shell.mode==='panels'||p.shell.snap||p.floorThickness<1.2))throw new Error('Нижний кант с оболочкой пока недоступен для панелей, прежних защёлок и дна тоньше 1,2 мм.');
    const lowest=Math.min(p.height,...Object.values(p.heights),...Object.values(p.wallProfiles??{}).flatMap(v=>[v.start,v.end]),...(p.honeycombHeights??[]).filter((h):h is number=>h!==null));
    if(p.baseBand.height>=lowest)throw new Error('Высота нижнего канта должна быть меньше высоты стенок.');
  }
  if(p.shell){
    if(!['honeycomb','diamonds','waves','petals','cubes','triangles','slots','cellular'].includes(p.shell.pattern))throw new Error('Unknown shell pattern');
    range(p.shell.gap,.2,2,'shell gap');range(p.shell.thickness,1,4,'shell thickness');range(p.shell.size,2,24,'shell size');
    if(p.shell.pattern==='cubes'&&p.shell.size<5)throw new Error('Для узора «Кубы» выберите размер не меньше 5 мм.');
  }
  if(p.shell?.mode!==undefined&&!['wrap','panels'].includes(p.shell.mode))throw new Error('Invalid shell mode');
  if(p.shell?.margin!==undefined)range(p.shell.margin,2,12,'panel margin');
  if(p.shell?.border!==undefined)range(p.shell.border,2,12,'shell border');
  if(p.shell?.sides!==undefined&&(!Array.isArray(p.shell.sides)||!p.shell.sides.length||new Set(p.shell.sides).size!==p.shell.sides.length||p.shell.sides.some(s=>!['front','back','left','right'].includes(s))))throw new Error('Выберите хотя бы одну сторону панели.');
  if(p.shell?.mounts!==undefined&&typeof p.shell.mounts!=='boolean')throw new Error('Invalid panel mounts');
  if(p.shell?.mode==='panels'&&(p.footprint||p.printing||p.shell.snap))throw new Error('Панели доступны на прямоугольной основе без разделения для печати.');
  if(p.shell?.mode==='panels'&&p.shell.mounts&&(p.wallThickness<PANEL_WALL_MIN||p.relief))throw new Error('Для скрытых креплений нужна стенка от 3,2 мм без рельефа. Отключите крепления панели.');
  if(p.shell?.snap!==undefined&&typeof p.shell.snap!=='boolean')throw new Error('Invalid shell snap');
  if(p.shell?.snap){const issue=shellClipIssue(p);if(issue)throw new Error(issue);}
  if(p.printArea!==undefined)validatePrintArea(p.printArea);
  if(p.printing!==undefined){
    validatePrintArea(p.printing);
    if(![2,3].includes(p.printing.parts))throw new Error('Выберите 2 или 3 части.');
  }
  if(p.footprint&&!['circle','oval','honeycomb'].includes(p.footprint))throw new Error('Unknown footprint');
  if(p.footprint==='circle'&&p.width!==p.depth)throw new Error('У круга одинаковые ширина и глубина');
  if(p.steppedWalls!==undefined&&typeof p.steppedWalls!=='boolean')throw new Error('Invalid stepped walls');
  if(p.steppedWalls&&p.footprint==='honeycomb')throw new Error('Для сот используйте высоту ячеек.');
  const t = p.wallThickness;
  if(p.footprint==='oval'&&t>=.9*Math.min(p.width*p.width/(2*p.depth),p.depth*p.depth/(2*p.width)))throw new Error('Овал слишком узкий для такой толщины стенок.');
  if(p.footprint==='honeycomb'&&Math.min(p.width,p.depth)/5<2*t+2)throw new Error('Сотовые ячейки слишком малы для такой толщины стенок.');
  const checkHeight = (h: number) => range(h, p.floorThickness + LIMITS.minFeature, LIMITS.maxSize, 'height');
  const checkProfile=(profile:WallProfile)=>{
    if(!profile||typeof profile!=='object'||Array.isArray(profile)||!['straight','wavy','zigzag'].includes(profile.style))throw new Error('Invalid wall profile');
    if(profile.wavelength!==undefined)range(profile.wavelength,6,200,'wavelength');
    checkHeight(profile.start);checkHeight(profile.end);
  };
  range(p.tilt??0,0,25,'tilt');
  if(p.honeycombCount!==undefined&&(!Number.isInteger(p.honeycombCount)||p.honeycombCount<1||p.honeycombCount>19))throw new Error('Выберите от 1 до 19 ячеек');
  checkHeight(p.height);
  if(p.honeycombHeights){if(p.footprint!=='honeycomb'||p.honeycombHeights.length!==(p.honeycombCount??7))throw new Error('Invalid honeycomb heights');p.honeycombHeights.forEach(h=>{if(h!==null)checkHeight(h);});}
  for (const [side, h] of Object.entries(p.heights)) {
    if (!sides.includes(side as Side)) throw new Error('Unknown outer wall');
    checkHeight(h);
  }
  if (p.width - 2*t < LIMITS.minCell || p.depth - 2*t < LIMITS.minCell) throw new Error('Interior too small');
  if (!Array.isArray(p.transitions) || new Set(p.transitions).size !== p.transitions.length || p.transitions.some(s => !sides.includes(s))) throw new Error('Invalid transitions');
  if (p.transitionStyles !== undefined) {
    if (!p.transitionStyles || typeof p.transitionStyles !== 'object' || Array.isArray(p.transitionStyles)) throw new Error('Invalid transition styles');
    for (const [side, style] of Object.entries(p.transitionStyles)) {
      if (!sides.includes(side as Side) || !['straight','wavy','zigzag'].includes(style as string)) throw new Error('Invalid transition style');
    }
  }
  if(p.transitionWavelengths!==undefined){if(!p.transitionWavelengths||typeof p.transitionWavelengths!=='object'||Array.isArray(p.transitionWavelengths))throw new Error('Invalid wavelengths');for(const [side,value] of Object.entries(p.transitionWavelengths)){if(!sides.includes(side as Side))throw new Error('Invalid wavelength side');range(value,6,200,'wavelength');}}
  if(p.colors!==undefined){if(!p.colors||typeof p.colors!=='object'||Array.isArray(p.colors)||Object.entries(p.colors).some(([key,value])=>!['organizer','shell'].includes(key)||typeof value!=='string'||!/^#[0-9a-f]{6}$/i.test(value)))throw new Error('Invalid colors');}
  if(p.relief){
    if(!reliefPatterns.includes(p.relief.pattern))throw new Error('Invalid relief');
    range(p.relief.spacing,4,16,'relief spacing');range(p.relief.depth,.2,3,'relief depth');
    if(p.wallThickness<.8)throw new Error('Для рельефа нужна стенка от 0,8 мм.');
  }
  if(p.cutouts!==undefined){
    if(!p.cutouts||typeof p.cutouts!=='object'||Array.isArray(p.cutouts)||Object.keys(p.cutouts).length>128)throw new Error('Invalid cutouts');
    if(p.steppedWalls&&(p.footprint==='circle'||p.footprint==='oval')&&Object.keys(p.cutouts).some(id=>sides.includes(id as Side)))throw new Error('Вырезы внешнего контура пока недоступны для ступенчатого круга и овала.');
    if(p.footprint==='honeycomb'&&Object.keys(p.cutouts).length)throw new Error('Вырезы в отдельных рёбрах сот пока не поддерживаются.');
    for(const cut of Object.values(p.cutouts)){
      if(!cut||!['smooth','round','square'].includes(cut.shape))throw new Error('Invalid cutout shape');
      range(cut.width,.1,.8,'cutout width');range(cut.depth,1,1000,'cutout depth');range(cut.position,0,1,'cutout position');
    }
  }
  const height = (s: Side) => p.heights[s] ?? p.height;
  if(p.wallProfiles!==undefined){
    if(!p.wallProfiles||typeof p.wallProfiles!=='object'||Array.isArray(p.wallProfiles))throw new Error('Invalid wall profiles');
    for(const [s,profile] of Object.entries(p.wallProfiles)){
      if(!sides.includes(s as Side)||p.transitions.includes(s as Side))throw new Error('Invalid wall profile dependency');
      checkProfile(profile);
    }
  }
  const sourceEnd=(source:Side,target:Side)=>{
    const profile=p.wallProfiles?.[source];
    return profile?(target==='front'||target==='left'?profile.start:profile.end):height(source);
  };
  const walls: Wall[] = sides.map(s => {
    const axis = s === 'front' || s === 'back' ? 'x' : 'y';
    const [a,b] = endpoints[s];
    const transition = p.transitions.includes(s);
    const profile=p.wallProfiles?.[s];
    if (transition && (p.transitions.includes(a) || p.transitions.includes(b))) throw new Error('Cyclic transition heights');
    return { id: s, axis, x: s === 'right' ? p.width-t : 0, y: s === 'back' ? p.depth-t : 0,
      length: axis === 'x' ? p.width : p.depth, thickness: t,
      transitionStyle: transition ? (p.transitionStyles?.[s] ?? 'straight') : profile?.style??'straight',
      wavelength:transition?p.transitionWavelengths?.[s]:profile?.wavelength,
      startHeight: transition ? sourceEnd(a,s) : profile?.start??height(s), endHeight: transition ? sourceEnd(b,s) : profile?.end??height(s), cap: hasCapsuleSlope(p) ? 0 : transition||profile ? Math.min(Math.max(t,p.cornerRadius??0),(axis === 'x' ? p.width : p.depth)/2-t) : 0 };
  });
  const ids = new Set<string>(); let count = 0;
  const visit = (c: Cell, x: number, y: number, w: number, d: number, depth: number) => {
    if (!c || typeof c.id !== 'string' || !c.id || ids.has(c.id) || sides.includes(c.id as Side)) throw new Error('Invalid or duplicate cell id');
    ids.add(c.id);
    if (++count > 2*LIMITS.maxCells-1 || depth > LIMITS.maxDepth) throw new Error('Project complexity limit');
    if (!c.split) {
      if(p.footprint||(p.cornerRadius??0)>0){
        const interior=footprintContour(p,-t);
        const area=polygonArea(clipRectangle(interior,x,y,w,d));
        if(area<Math.min(w*d*.25,4))throw new Error('Скругление перекрывает маленький угловой отсек. Уменьшите радиус или увеличьте отсек.');
      }
      return;
    }
    const s = c.split;
    if (s.axis !== 'x' && s.axis !== 'y') throw new Error('Invalid split axis');
    range(s.ratio, 0, 1, 'split ratio');
    const h = s.height ?? p.height; checkHeight(h);
    if(s.profile!==undefined)checkProfile(s.profile);
    const start=s.profile?.start??h,end=s.profile?.end??h,style=s.profile?.style??'straight';
    const available = (s.axis === 'x' ? w : d) - t;
    const first = available*s.ratio, second = available-first;
    if (first < LIMITS.minCell || second < LIMITS.minCell) throw new Error('Compartment too small');
    if (s.axis === 'x') {
      walls.push({id: c.id, axis:'y', x:x+first, y:y-t/2, length:d+t, thickness:t, startHeight:start,endHeight:end,transitionStyle:style,wavelength:s.profile?.wavelength,cap:0});
      visit(s.first,x,y,first,d,depth+1); visit(s.second,x+first+t,y,second,d,depth+1);
    } else {
      walls.push({id:c.id,axis:'x',x:x-t/2,y:y+first,length:w+t,thickness:t,startHeight:start,endHeight:end,transitionStyle:style,wavelength:s.profile?.wavelength,cap:0});
      visit(s.first,x,y,w,first,depth+1); visit(s.second,x,y+first+t,w,second,depth+1);
    }
  };
  visit(p.root,t,t,p.width-2*t,p.depth-2*t,0);
  if(p.footprint)for(const w of walls.slice(4)){
    const span=lineSpan(footprintContour(p),w.axis,w.axis==='x'?w.y+t/2:w.x+t/2);
    if(span){const start=w.axis==='x'?w.x:w.y,lo=Math.max(start,span[0]),hi=Math.min(start+w.length,span[1]);if(hi<=lo)throw new Error('Перегородка вне формы');if(w.axis==='x')w.x=lo;else w.y=lo;w.length=hi-lo;}
  }
  if(p.steppedWalls){
    // Follow the transverse partitions that meet each outer wall. Changes of
    // compartment size and partition height therefore move the steps as well.
    for(const [side,atBack] of [['front',false],['back',true]] as const){
      const outer=walls.find(w=>w.id===side)!;
      const edges=walls.slice(4).filter(w=>w.axis==='y'&&(p.footprint==='circle'||p.footprint==='oval'||(atBack?w.y+w.length>=p.depth-t/2-1e-6:w.y<=t/2+1e-6))).sort((a,b)=>a.x-b.x);
      const start=height('left');
      const steps:[number,number][]=[[0,start],...edges.map(w=>[w.x+w.thickness/2,atBack?w.endHeight:w.startHeight] as [number,number])];
      outer.stepPoints=steps;outer.startHeight=start;outer.endHeight=steps.at(-1)![1];outer.cap=0;
    }
  }
  for(const wall of walls){if(p.cutouts?.[wall.id]){wall.cutout=p.cutouts[wall.id];wall.minTop=p.floorThickness+.8;}}
  if(p.baseBand&&walls.slice(0,4).some(w=>w.cutout&&Math.max(p.floorThickness+.8,Math.min(w.startHeight,w.endHeight)-w.cutout.depth)<=p.baseBand!.height))throw new Error('Нижний кант перекрывает вырез. Уменьшите высоту канта или глубину выреза.');
  validateLabel(p);
  validateAccessories(p,walls);
  return walls;
}
