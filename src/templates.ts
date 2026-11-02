import {defaultProject, resolveWalls, type Project} from './model.js';
import {splitCell, regions, cellById, fitDividerEnds} from './editor.js';
export type TemplateShape='rounded'|'capsule'|'circle'|'oval'|'honeycomb';
export type TemplateHeights='flat'|'slope'|'steps';
/** New editable projects, retaining only the user's printer dimensions. */
export function organizerTemplate(shape:TemplateShape, heights:TemplateHeights, current?:Project):Project {
  let p=defaultProject();
  p.width=180;p.depth=90;p.height=36;p.cornerRadius=heights==='steps'&&(shape==='rounded'||shape==='capsule')?1:shape==='capsule'?45:12;
  if(heights==='steps'&&(shape==='rounded'||shape==='capsule'))p.innerCornerRadius=0.5;
  if(shape==='circle'||shape==='oval'||shape==='honeycomb'){p.footprint=shape;p.cornerRadius=0;if(shape==='circle'){p.width=p.depth=140;}if(shape==='honeycomb'){p.width=170;p.depth=176.67;}}
  p.printArea=current?.printArea??(current?.printing?{bedWidth:current.printing.bedWidth,bedDepth:current.printing.bedDepth,bedHeight:current.printing.bedHeight,printerId:current.printing.printerId}:undefined);
  if(shape!=='honeycomb')p=splitCell(p,'root','x',3);
  if(heights==='slope'){
    p.heights={left:22,right:70};p.transitions=['front','back'];
    for(const wall of resolveWalls(p).slice(4))p=fitDividerEnds(p,wall.id);
  }
  if(heights==='steps'){
    p.height=22;
    if(shape!=='honeycomb')p.steppedWalls=true;
    if(shape==='honeycomb')p.honeycombHeights=[38,70,38,22,22,38,70];
    const splits=regions(p).filter(r=>r.cell.split);
    splits.forEach((r,i)=>{cellById(p.root,r.cell.id)!.split!.height=(p.steppedWalls&&i===1)?70:38+i*16;});
    p.heights.right=70;
  }
  resolveWalls(p);return p;
}
