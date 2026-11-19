import {defaultProject} from './model.js';
import {labelLayout} from './lettering.js';
import {gridPitch,hasGridfinityLid,lidDeckTop,type GridfinityProject} from './gridfinity.js';

// One tag size across all footprints, including the shortest 2U tray.
export const tagWidth=30, tagHeight=5.4, tagThickness=1.2;
// Local X follows the rear wall. Local Y climbs towards it; Z is normal to the face.
export function shelfAngle(p:GridfinityProject){
  return p.label?.shelf==='flat'?0:25;
}
export const shelfLength=9;
export function shelfPoint(p:GridfinityProject,x:number,y:number,z:number):[number,number,number] {
  const angle=shelfAngle(p)*Math.PI/180,cos=Math.cos(angle),sin=Math.sin(angle);
  return [x,p.rows*gridPitch(p)[1]-.5-4.8+(y-shelfLength)*cos-z*sin,
    p.heightUnits*7-.55+(y-shelfLength)*sin+z*cos];
}
export function tagOrigin(p:GridfinityProject):[number,number,number] {
  return shelfPoint(p,(p.columns*gridPitch(p)[0]-.5-tagWidth)/2,.8,-tagPocketDepth);
}
// Lid-local placement in print orientation. The tag rests on the pocket floor.
export const labelFront=5, tagPocketDepth=2, tagTravel=1.6;
export function lidTagOrigin(p:GridfinityProject):[number,number,number] {
  return [(p.columns*gridPitch(p)[0]-.5-tagWidth)/2,labelFront,lidDeckTop(p)-tagPocketDepth];
}
export function gridfinityInscription(p:GridfinityProject){
  const label=p.label!;
  const tag=label.mode==='tag';
  const width=tag?tagWidth-2:p.columns*gridPitch(p)[0]-.5-10;
  const height=tag||hasGridfinityLid(p)?tagHeight-1:shelfLength-1.4;
  // Give the organizer's text layout an equivalent flat printable area.
  return labelLayout({...defaultProject(),width:width+6,height:height+6,
    cornerRadius:0,floorThickness:0,heights:{},cutouts:{},
    label:{text:label.text,icon:'',side:'front',mode:'engraved',font:'sans',size:label.size}},false,2);
}
