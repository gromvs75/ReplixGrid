import {drawerIssues,trayRect,type DrawerLayout,type DrawerTray,type TrayBounds} from './drawer.js';
import {MOUNT} from './mountingPlate.js';

function drawerTrayLimits(layout:DrawerLayout,tray:Pick<DrawerTray,'x'|'y'|'rotation'>,bounds:TrayBounds){
 const rect=trayRect(tray,bounds);
 return {min:layout.gap,x:layout.width-layout.gap-rect.width,y:layout.depth-layout.gap-rect.depth};
}

/** Keep the peg step between the walls and let the tray reach either wall clearance. */
export function drawerDragPosition(layout:DrawerLayout,start:Pick<DrawerTray,'x'|'y'|'rotation'>,dx:number,dy:number,bounds?:TrayBounds,adjustMounting=false){
 const step=layout.plate?.enabled&&!adjustMounting?MOUNT.pitch:.1;
 const limits=bounds&&drawerTrayLimits(layout,start,bounds);
 function axis(origin:number,delta:number,max?:number){
  const snapped=origin+Math.round(delta/step)*step;
  if(max===undefined||max<layout.gap)return snapped;
  const min=layout.gap,wanted=origin+delta;
  if(wanted<=min)return min;
  if(wanted>=max)return max;
  const candidates=[Math.max(min,Math.min(max,snapped)),min,max];
  return candidates.reduce((closest,value)=>Math.abs(value-wanted)<Math.abs(closest-wanted)?value:closest);
 }
 return {x:dx===0?start.x:axis(start.x,dx,limits?.x),y:dy===0?start.y:axis(start.y,dy,limits?.y)};
}
/** Validate the released position against exact assembled bounds, without changing the saved layout. */
export function drawerDrop(layout:DrawerLayout,id:string,x:number,y:number,bounds:Record<string,TrayBounds>):DrawerLayout|null{
 const tray=layout.trays.find(t=>t.id===id);
 if(!tray||!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(x)>4000||Math.abs(y)>4000||layout.trays.some(t=>!bounds[t.id]))return null;
 const limits=drawerTrayLimits(layout,tray,bounds[id]);
 const round=(value:number,max:number)=>value===limits.min||value===max?value:Math.round(value*10)/10;
 const next={...layout,trays:layout.trays.map(t=>t.id===id?{...t,x:round(x,limits.x),y:round(y,limits.y)}:t)};
 return drawerIssues(next,bounds)[id]?.length?null:next;
}
