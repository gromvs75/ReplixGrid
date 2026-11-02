import {shellGap,reliefHeight} from './reliefSize.js';
import {resolveWalls,validatePrintArea,type Project,type PrintSettings} from './model.js';
export const SNAP_LENGTH=16, SNAP_CLEARANCE=.25, SEAM_GAP=.2;
export interface SplitPlan {axis:'x'|'y';cuts:number[];anchors:number[][];settings:PrintSettings;maxPartWidth:number;maxPartDepth:number;height:number}
export function splitPlan(p:Project,settings=p.printing):SplitPlan{
  if(p.stack)throw new Error('Разделение ярусов для печати пока недоступно.');
  if(p.tilt)throw new Error('Наклонное основание печатается целиком. Отключите наклон для разделения.');
  if(p.footprint)throw new Error('Для круга, овала и сот печать по частям пока недоступна. Печатайте целиком или уменьшите размеры.');
  if(!settings)throw new Error('Сначала включите печать по частям.');
  const {parts,bedWidth,bedDepth,bedHeight}=settings;
  validatePrintArea(settings);if(parts!==2&&parts!==3)throw new Error('Выберите 2 или 3 части.');
  const walls=resolveWalls(p),offset=p.shell?shellGap(p)+p.shell.thickness:reliefHeight(p);
  const height=Math.max(...walls.flatMap(w=>[w.startHeight,w.endHeight]));
  if(height>bedHeight)throw new Error('Высота больше области печати. Уменьшите высоту: разделение по вертикали пока не поддерживается.');
  if(p.wallThickness<5)throw new Error('Для штифтового соединения нужна толщина стенок от 5 мм.');
  if(p.floorThickness<3)throw new Error('Для направляющего паза нужна толщина дна от 3 мм.');
  const candidates:SplitPlan[]=[];
  for(const axis of ['x','y'] as const){
    const span=axis==='x'?p.width:p.depth,cross=axis==='x'?p.depth:p.width;
    const endMargin=Math.max(p.cornerRadius??0,p.wallThickness)+20;
    if(span/parts<42||cross<30)continue;
    const cuts:number[]=[],anchors:number[][]=[];let failed=false;
    for(let i=1;i<parts;i++){
      let found=false;
      // Prefer balanced cuts, then nudge away from partition walls.
      for(const delta of [0,-4,4,-8,8,-12,12,-16,16]){
        const cut=Math.round((span*i/parts+delta)*10)/10;
        if(cut<endMargin||cut>span-endMargin||(cuts.length&&cut-cuts.at(-1)!<42))continue;
        const safe:number[]=[];
        for(let v=Math.max(10,p.wallThickness+6);v<=cross-Math.max(10,p.wallThickness+6);v+=2){
          const x=axis==='x'?cut-3:v-5,y=axis==='x'?v-5:cut-3;
          const w=axis==='x'?23:10,d=axis==='x'?10:23;
          const blocked=walls.slice(4).some(wall=>{
            const ww=wall.axis==='x'?wall.length:wall.thickness,dd=wall.axis==='x'?wall.thickness:wall.length;
            return x<wall.x+ww&&x+w>wall.x&&y<wall.y+dd&&y+d>wall.y;
          });
          if(!blocked)safe.push(v);
        }
        if(!safe.length)continue;
        const first=safe.reduce((a,b)=>Math.abs(b-cross*.27)<Math.abs(a-cross*.27)?b:a);
        const rest=safe.filter(v=>Math.abs(v-first)>=12);if(!rest.length)rest.push(first);
        const second=rest.reduce((a,b)=>Math.abs(b-cross*.73)<Math.abs(a-cross*.73)?b:a);
        // Sleeve snap fingers need solid, sufficiently tall straight panels.
        const sideWalls=walls.slice(0,4).filter(w=>w.axis===axis);
        if(p.shell&&sideWalls.some(w=>Math.min(w.startHeight,w.endHeight)<12))continue;
        cuts.push(cut);anchors.push([first,second].sort((a,b)=>a-b));found=true;break;
      }
      if(!found){failed=true;break;}
    }
    if(failed)continue;
    const boundaries=[-offset,...cuts,span+offset];
    const along=Math.max(...boundaries.slice(1).map((end,i)=>end-boundaries[i]+(i<parts-1?SNAP_LENGTH:0)));
    const across=cross+2*offset;
    const fits=(along<=bedWidth-4&&across<=bedDepth-4)||(along<=bedDepth-4&&across<=bedWidth-4);
    if(fits)candidates.push({axis,cuts,anchors,settings,maxPartWidth:axis==='x'?along:across,maxPartDepth:axis==='x'?across:along,height});
  }
  candidates.sort((a,b)=>Math.max(a.maxPartWidth,a.maxPartDepth)-Math.max(b.maxPartWidth,b.maxPartDepth));
  if(!candidates.length)throw new Error('Не удалось разместить части с защёлками на столе. Попробуйте 3 части, увеличьте область печати или измените размеры/перегородки.');
  return candidates[0];
}
export function suggestSplit(p:Project,bed:Omit<PrintSettings,'parts'>){
  if(p.tilt)throw new Error('Наклонное основание печатается целиком. Отключите наклон для разделения.');
  if(p.footprint)throw new Error('Для круга, овала и сот доступна печать целиком. Разделение с защёлками добавим отдельно.');
  for(const parts of [2,3] as const){try{return splitPlan(p,{...bed,parts});}catch{}}
  throw new Error('Для этой конструкции разделение на 2–3 части не помещается или нет места для защёлок. Измените размеры или перегородки.');
}
