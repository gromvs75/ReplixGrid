import type {Manifold,ManifoldToplevel} from 'manifold-3d';
import type {Project} from './model.js';
import {footprintContour} from './footprint.js';
import {hasShellSupport,hasDecorativeShellSupport,shellSupportWidth} from './shellSupport.js';

/** A decorative external rim. Its inner edge overlaps the existing wall. */
export function applyBaseBand(wasm:ManifoldToplevel,p:Project,body:Manifold,keep:(m:Manifold)=>Manifold){
 const settings=p.baseBand;if(!settings)return body;
 const width=(hasShellSupport(p)||hasDecorativeShellSupport(p))?shellSupportWidth(p):1.2;
 const inner=footprintContour(p,-Math.min(.2,p.wallThickness/3)).reverse();
 const pieces:Manifold[]=[];
 const count=settings.style==='smooth'?1:Math.max(2,Math.ceil(settings.height/1));
 for(let i=0;i<count;i++){
  const z0=settings.height*i/count,z1=settings.height*(i+1)/count;
  let amount=width;
  if(settings.style==='rings'&&i%2===1&&i<count-1)amount=width-Math.min(.6,width*.5);
  if(settings.style==='steps'&&i>0&&i<count-1)amount=width-Math.min(.6,width*.5)*Math.floor(i*3/count)/2;
  const ring=keep(wasm.Manifold.extrude([footprintContour(p,amount),inner],z1-z0));
  pieces.push(keep(ring.translate([0,0,z0])));
 }
 return keep(body.add(keep(wasm.Manifold.union(pieces))));
}
