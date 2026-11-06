import {defaultProject,resolveWalls,type Project,type Relief,type ShellSettings} from './model.js';
import {partColor} from './appearance.js';
import {shellLayout} from './shell.js';
import {splitPlan} from './splitting.js';

type LidDesign=NonNullable<Project['lidDesign']>;
const lidPatternKeys=['pattern','patternSpacing','patternDepth','rimPattern','olive','motif','raised','cutwork','svg','svgMode'] as const;
type LidPattern=Pick<LidDesign,typeof lidPatternKeys[number]>;
export interface VisualStyle {
 version:1;
 organizerColor:string;
 relief:Relief|null;
 shell?:{color:string;pattern:ShellSettings['pattern'];size:number;svg?:ShellSettings['svg']};
 lid?:{baseColor:string;patternColor:string;surface:LidPattern};
}
export interface SavedStyle {id:string;name:string;createdAt:number;style:VisualStyle}
export interface StyleOptions {colors:boolean;patterns:boolean}
export function captureStyle(p:Project):VisualStyle {
 const d=p.lidDesign;
 return {version:1,organizerColor:partColor(p,'organizer'),relief:p.relief?structuredClone(p.relief):null,
  ...(p.shell?{shell:{color:partColor(p,'shell'),pattern:p.shell.pattern,size:p.shell.size,...(p.shell.svg?{svg:structuredClone(p.shell.svg)}:{})}}:{}),
  ...(p.lid?{lid:{baseColor:(d?.svg&&d.svgMode!=='cutout'||d?.olive)?(d.baseColor??'#f7f3e8'):partColor(p,'organizer'),patternColor:(d?.svg&&d.svgMode!=='cutout'||d?.olive)?(d.patternColor??'#687749'):partColor(p,'organizer'),surface:{pattern:d?.pattern??'smooth',patternSpacing:d?.patternSpacing??(d?.pattern==='lines'?6:8),patternDepth:d?.patternDepth??.5,rimPattern:d?.rimPattern??'smooth',olive:d?.olive??false,motif:d?.motif??'olive',raised:d?.raised??false,cutwork:d?.cutwork??false,...(d?.svg?{svg:structuredClone(d.svg),svgMode:d.svgMode??'raised'}:{})}}}:{})};
}
function validate(p:Project){resolveWalls(p);if(p.shell)shellLayout(p);if(p.printing)splitPlan(p);}
/** Validate stored presets and strip every field outside the visual-style contract. */
export function parseStyle(value:unknown):VisualStyle {
 if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Invalid style');
 const s=value as VisualStyle;if(s.version!==1||!/^#[0-9a-f]{6}$/i.test(s.organizerColor))throw new Error('Invalid style');
 const p=defaultProject();p.colors={organizer:s.organizerColor};
 if(s.relief!==null){if(!s.relief||typeof s.relief!=='object')throw new Error('Invalid style');p.relief={pattern:s.relief.pattern,spacing:s.relief.spacing,depth:s.relief.depth,...(s.relief.svg?{svg:structuredClone(s.relief.svg)}:{})};}
 if(s.shell){p.colors.shell=s.shell.color;p.shell={pattern:s.shell.pattern,size:s.shell.size,gap:.4,thickness:1.2,...(s.shell.svg?{svg:structuredClone(s.shell.svg)}:{})};}
 if(s.lid){
  if(!s.lid.surface||typeof s.lid.surface!=='object')throw new Error('Invalid style');
  p.lid=true;p.lidDesign={pattern:'smooth',rimHeight:2,handle:'none',baseColor:s.lid.baseColor,patternColor:s.lid.patternColor};
  for(const key of lidPatternKeys)if(s.lid.surface[key]!==undefined)Object.assign(p.lidDesign,{[key]:s.lid.surface[key]});
 }
 validate(p);return captureStyle(p);
}
/** A snapshot, not a link: only whitelisted visual fields can change. */
export function previewStyle(p:Project,value:VisualStyle,options:StyleOptions={colors:true,patterns:true}) {
 const style=parseStyle(value),warnings:{label?:string;message:string}[]=[],changes:string[]=[];let next=structuredClone(p);
 const attempt=(label:string,edit:(draft:Project)=>void)=>{
  const draft=structuredClone(next);edit(draft);
  try{validate(draft);if(JSON.stringify(draft)!==JSON.stringify(next)){next=draft;changes.push(label);}}
  catch(e){warnings.push({label,message:e instanceof Error?e.message:String(e)});}
 };
 if(options.colors)attempt('Цвет органайзера',d=>{d.colors={...d.colors,organizer:style.organizerColor};});
 // Removing relief first can make the destination's existing panel settings compatible.
 if(options.patterns)attempt('Рельеф органайзера',d=>{if(style.relief)d.relief=structuredClone(style.relief);else delete d.relief;});
 if(style.shell&&(options.colors||options.patterns)){
  if(!p.shell)warnings.push({message:'Оболочка отсутствует — её оформление пропущено.'});
  else{
   const shell=style.shell;
   if(options.colors)attempt('Цвет оболочки',d=>{d.colors={...d.colors,shell:shell.color};});
   if(options.patterns)attempt('Узор оболочки',d=>{d.shell={...d.shell!,pattern:shell.pattern,size:shell.size};if(shell.svg)d.shell.svg=structuredClone(shell.svg);else delete d.shell.svg;});
  }
 }
 if(style.lid&&(options.colors||options.patterns)){
  if(!p.lid)warnings.push({message:'Крышка отсутствует — её оформление пропущено.'});
  else{
   const lid=style.lid;
   if(options.colors)attempt('Цвета крышки',d=>{d.lidDesign={pattern:'smooth',rimHeight:2,handle:'none',...d.lidDesign,baseColor:lid.baseColor,patternColor:lid.patternColor};});
   if(options.patterns)attempt('Узор крышки',d=>{d.lidDesign={...(d.lidDesign??{pattern:'smooth',rimHeight:2,handle:'none'}),...structuredClone(lid.surface)};if(!lid.surface.svg){delete d.lidDesign.svg;delete d.lidDesign.svgMode;}});
  }
 }
 return {project:next,warnings,changes};
}
