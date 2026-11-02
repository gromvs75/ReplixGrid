import {footprintContour,lineSpan} from './footprint.js';
import type {Project,Wall} from './model.js';

/** Clearance to opposite interior faces along the normal at the divider midpoint. */
export function dividerOuterDistances(p:Project,w:Wall):[number,number]|null{
 if(p.footprint==='honeycomb')return null;
 const axis=w.axis==='y'?'x':'y';
 const midpoint=(w.axis==='y'?w.y:w.x)+w.length/2;
 const span=lineSpan(footprintContour(p,-p.wallThickness),axis,midpoint);
 if(!span)return null;
 const position=w.axis==='y'?w.x:w.y;
 return [Math.max(0,position-span[0]),Math.max(0,span[1]-position-w.thickness)];
}
