/** Shared pointer movement: snap to centre, keep at least 2 mm on each side. */
export function dividerDragRatio(start:number,delta:number,span:number){
 let ratio=start+delta/span;
 if(Math.abs(ratio-.5)<.015)ratio=.5;
 return Math.max(2/span,Math.min(1-2/span,ratio));
}
