import type {Manifold,ManifoldToplevel} from 'manifold-3d';
import type {Project} from './model.js';
/** First printable clip variant: flat rectangular body, two accessible release tabs. */
export function shellClipIssue(p:Project):string|null{
 if(p.footprint||p.tilt||p.stack||p.printing||p.relief||p.label?.text||p.label?.icon||p.lid)return 'Защёлки пока доступны для прямоугольной формы без наклона, рельефа, крышки, ярусов и разрезания.';
 if(p.transitions.length||Object.keys(p.cutouts??{}).length||Object.values(p.wallProfiles??{}).length||Object.values(p.heights).some(h=>h!==p.height))return 'Для защёлок нужен ровный верх без вырезов и переходов.';
 if(p.height<28||p.width-2*(p.cornerRadius??0)<22||p.depth<30||p.wallThickness<1.2)return 'Для защёлок: высота от 28 мм, стенка от 1,2 мм и прямой участок шириной от 22 мм.';
 return null;
}
export function applyShellClips(wasm:ManifoldToplevel,p:Project,body:Manifold,shell:boolean,keep:(m:Manifold)=>Manifold){
 if(!p.shell?.snap)return body;
 const issue=shellClipIssue(p);if(issue)throw new Error(issue);
 const gap=p.shell.gap,t=p.shell.thickness,h=p.height;
 // Local coordinates: X along the wall, Y outward, Z up. Both tabs release outward.
 const place=(m:Manifold,back:boolean)=>keep(back?m.translate([p.width/2,p.depth,0]):m.rotate([0,0,180]).translate([p.width/2,0,0]));
 const box=(x:number,y:number,z:number,dx:number,dy:number,dz:number)=>keep(wasm.Manifold.cube([dx,dy,dz]).translate([x,y,z]));
 let result=body;
 for(const back of [false,true]){
  if(!shell){
   // A rising lead-in ramp and horizontal retaining shoulder; no inward cuts into the core wall.
   const ramp=keep(wasm.Manifold.extrude([[0,h-9],[gap+.5,h-6.4],[gap+.5,h-6],[-.3,h-6],[-.3,h-9]],5));
   const boss=keep(ramp.rotate([90,0,90]).translate([-2.5,0,0]));
   result=keep(result.add(place(boss,back)));
  }else{
   // Solid frame replaces the perforation locally, retaining a long 1.2 mm flexible tongue.
   result=keep(result.add(place(box(-8,gap,h-22,16,t,22),back)));
   for(const slot of [box(-4.8,gap-.1,h-18,.8,t+.2,18.1),box(4,gap-.1,h-18,.8,t+.2,18.1),box(-4,gap+1.2,h-18,8,Math.max(.01,t-1.2+.1),18.1)]){
    result=keep(result.subtract(place(slot,back)));
   }
   // Window provides clearance around the boss; the top edge is the retaining lip.
   result=keep(result.subtract(place(box(-2.85,gap-.1,h-9.3,5.7,t+.2,3.6),back)));
  }
 }
 return result;
}
