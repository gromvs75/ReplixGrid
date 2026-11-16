import {dividerDragRatio} from './dividerDrag.js';
import {gridfinityRegions,gridfinityEditorProject,validateGridfinity,type GridfinityProject} from './gridfinity.js';
import {moveDivider} from './editor.js';
/** Coordinates are in the same XY plane used by the solid kernel. */
export function gridfinityPick(p:GridfinityProject,x:number,y:number){
 const all=gridfinityRegions(p);
 const wall=all.filter(r=>r.cell.split).reverse().find(r=>{
  const s=r.cell.split!,at=(s.axis==='x'?r.x:r.y)+((s.axis==='x'?r.width:r.depth)-p.wall)*s.ratio;
  return s.axis==='x'?x>=at-.25&&x<=at+p.wall+.25&&y>=r.y&&y<=r.y+r.depth:y>=at-.25&&y<=at+p.wall+.25&&x>=r.x&&x<=r.x+r.width;
 });
 if(wall)return {id:wall.cell.id,wall:true};
 const leaf=all.find(r=>!r.cell.split&&x>=r.x&&x<=r.x+r.width&&y>=r.y&&y<=r.y+r.depth);
 return leaf?{id:leaf.cell.id,wall:false}:null;
}
export function gridfinityDrag(p:GridfinityProject,id:string,delta:number){
 const r=gridfinityRegions(p).find(r=>r.cell.id===id),s=r?.cell.split;if(!r||!s)throw Error('Выберите перегородку');
 const span=(s.axis==='x'?r.width:r.depth)-p.wall;
 return validateGridfinity({...p,root:moveDivider(gridfinityEditorProject(p),id,dividerDragRatio(s.ratio,delta,span)).root});
}
