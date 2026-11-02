import type {Manifold,ManifoldToplevel} from 'manifold-3d';
import type {Project} from './model.js';
/** Positive angles lean toward the front (-X) without rotating horizontal surfaces or adding volume. */
export function tiltSlope(p:Pick<Project,'tilt'>):number { return -Math.tan((p.tilt??0)*Math.PI/180); }
export function tiltOnBase(_wasm:ManifoldToplevel,p:Project,body:Manifold,_shell:boolean,keep:(m:Manifold)=>Manifold,decorate?:(body:Manifold)=>Manifold){
 const angle=p.tilt??0;if(!angle)return body;
 const patterned=decorate?decorate(body):body;
 const lean=tiltSlope(p);
 // x' = x - z*tan(angle), y'=y, z'=z. Determinant 1: no wedge,
 // no extra material; both faces of the floor stay horizontal.
 // Apply the same map to the sleeve, including its perforations.
 return keep(patterned.transform([1,0,0,0, 0,1,0,0, lean,0,1,0, 0,0,0,1]));
}
