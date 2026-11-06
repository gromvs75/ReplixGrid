import type {CrossSection,ManifoldToplevel} from 'manifold-3d';
import type {SvgPattern} from './svgPattern.js';
/** Place complete motifs inside a printable face. The caller owns returned sections. */
export function svgSurface(w:ManifoldToplevel,s:SvgPattern,mask:CrossSection,keep:(s:CrossSection)=>CrossSection){
 const raw=keep(w.CrossSection.union(s.asset.shapes.map(shape=>keep(new w.CrossSection(shape,'EvenOdd')))));
 const motif=keep(keep(keep(raw.translate([-.5,-s.asset.aspect/2])).scale(s.width)).rotate(s.rotation));
 const box=motif.bounds(),area=mask.bounds(),mw=box.max[0]-box.min[0],mh=box.max[1]-box.min[1];
 const cx=(area.min[0]+area.max[0])/2+s.offsetX,cy=(area.min[1]+area.max[1])/2+s.offsetY,px=mw+s.gap,py=mh+s.gap;
 const range=(axis:number,c:number,pitch:number)=>s.mode==='single'?[0,0]:[Math.ceil((area.min[axis]-box.min[axis]-c)/pitch),Math.floor((area.max[axis]-box.max[axis]-c)/pitch)];
 const [x0,x1]=range(0,cx,px),[y0,y1]=range(1,cy,py),points=s.asset.shapes.flat().reduce((n,l)=>n+l.length,0);
 if((x1-x0+1)*(y1-y0+1)>300||(x1-x0+1)*(y1-y0+1)*points>120000)throw new Error('Слишком много повторений SVG. Увеличьте размер или интервал.');
 const copies:CrossSection[]=[];
 for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++){
  const candidate=motif.translate([cx+x*px,cy+y*py]),outside=candidate.subtract(mask),fits=outside.area()<1e-8;outside.delete();
  if(fits)copies.push(keep(candidate));else candidate.delete();
 }
 if(!copies.length)throw new Error('SVG не помещается внутри рамки. Уменьшите размер или смещение.');
 return keep(w.CrossSection.union(copies));
}
export const SVG_ISLAND_ERROR='Прорези SVG оставляют отдельные кусочки. Добавьте перемычки в рисунок или увеличьте интервал.';
