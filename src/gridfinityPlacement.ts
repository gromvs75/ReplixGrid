import {moveGridfinityPart,trayFootprint,type GridfinityAssembly,type GridfinitySelection} from './gridfinityAssembly.js';
/** Resolve only the drop target; the moving preview can remain between grid cells. */
export function gridfinityDrop(a:GridfinityAssembly,s:GridfinitySelection,dx:number,dy:number):GridfinityAssembly|null{
 const part=(s.kind==='plate'?a.plates:a.trays).find(v=>v.id===s.id);if(!part)return null;
 let x=Math.round(part.x+dx),y=Math.round(part.y+dy),plateId:string|undefined;
 if(s.kind==='tray'){
  const tray=a.trays.find(t=>t.id===s.id)!,old=a.plates.find(p=>p.id===tray.plateId)!,[w,h]=trayFootprint(tray),gx=old.x+x,gy=old.y+y;
  const target=a.plates.find(p=>gx>=p.x&&gy>=p.y&&gx+w<=p.x+p.project.columns&&gy+h<=p.y+p.project.rows);
  if(!target)return null;x=gx-target.x;y=gy-target.y;plateId=target.id;
 }
 try{return moveGridfinityPart(a,s,x,y,plateId);}catch{return null;}
}
