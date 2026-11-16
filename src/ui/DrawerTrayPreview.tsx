import {useMemo} from 'react';
import type {Project} from '../model.js';
import {regions} from '../editor.js';
import {footprintContour,honeyCells,offsetContour} from '../footprint.js';
import {clipRectangle} from '../rounding.js';
import {partColor} from '../appearance.js';
import {previewEdgeColor,previewWallColor} from '../previewAppearance.js';
/** Top-view diagram inside the existing clearance envelope; it does not change collision bounds. */
export function DrawerTrayPreview({project:p,width,depth,rotation}:{project:Project;width:number;depth:number;rotation:number}){
 const outline=useMemo(()=>footprintContour(p),[p]);
 const cells=useMemo(()=>{if(p.footprint==='honeycomb')return honeyCells(p).map(c=>offsetContour(c,-p.wallThickness));const inside=footprintContour(p,-p.wallThickness);return regions(p).filter(r=>!r.cell.split).map(r=>clipRectangle(inside,r.x,r.y,r.width,r.depth));},[p]);
 const color=partColor(p,'organizer'),ink=previewEdgeColor(color).getStyle(),wall=previewWallColor(color).getStyle();
 const points=(v:number[][])=>v.map(point=>point.join(',')).join(' ');
 return <g pointerEvents="none" transform={`translate(${width/2} ${depth/2}) rotate(${rotation}) translate(${-p.width/2} ${-p.depth/2})`}><polygon points={points(outline)} fill={wall} stroke={ink} strokeWidth=".5"/>{cells.filter(c=>c.length>2).map((c,i)=><polygon key={i} points={points(c)} fill={color} stroke={ink} strokeWidth=".45"/>)}</g>;
}
