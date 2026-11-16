import {drawerIssues,type DrawerLayout,type TrayBounds} from './drawer.js';
/** Validate the released position against exact assembled bounds, without changing the saved layout. */
export function drawerDrop(layout:DrawerLayout,id:string,x:number,y:number,bounds:Record<string,TrayBounds>):DrawerLayout|null{
 if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(x)>4000||Math.abs(y)>4000||!layout.trays.some(t=>t.id===id)||layout.trays.some(t=>!bounds[t.id]))return null;
 const next={...layout,trays:layout.trays.map(t=>t.id===id?{...t,x:Math.round(x*10)/10,y:Math.round(y*10)/10}:t)};
 return drawerIssues(next,bounds)[id]?.length?null:next;
}
