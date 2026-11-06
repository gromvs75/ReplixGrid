export interface BedSettings {length:number;width:number;height:number;gap:number}
export interface PackItem {name:string;size:number[]}
export interface Placement {item:number;x:number;y:number;width:number;depth:number;rotation:0|90}
export interface BedPlan {settings:BedSettings;beds:Placement[][]}
/** Deterministic largest-first rectangular packing. Counts this arrangement, not a mathematical minimum. */
export function packBeds(items:PackItem[],settings:BedSettings):BedPlan{
 const {length,width,height,gap}=settings;
 if(![length,width,height,gap].every(Number.isFinite)||length<60||width<60||length>1000||width>1000||height<5||height>1000||gap<0||gap>30)throw Error('Проверьте размеры стола и промежуток между деталями.');
 const beds:Placement[][]=[];
 const order=items.map((v,item)=>({v,item})).sort((a,b)=>b.v.size[0]*b.v.size[1]-a.v.size[0]*a.v.size[1]||a.item-b.item);
 for(const {v,item} of order){
  if(v.size.length!==3||!v.size.every(n=>Number.isFinite(n)&&n>0))throw Error('Некорректные габариты детали: '+v.name);
  if(v.size[2]>height+.0001||!((v.size[0]<=length-4+.0001&&v.size[1]<=width-4+.0001)||(v.size[1]<=length-4+.0001&&v.size[0]<=width-4+.0001)))throw Error('Не помещается на стол: '+v.name);
  let placed=false;
  for(let bi=0;bi<=beds.length;bi++){
   const bed=beds[bi]??[],xs=[2,...bed.map(v=>v.x+v.width+gap)],ys=[2,...bed.map(v=>v.y+v.depth+gap)];
   let best:Placement|undefined;
   for(const rotation of [0,90] as const)for(const y of ys)for(const x of xs){
    const w=v.size[rotation?1:0],d=v.size[rotation?0:1];
    if(x+w>length-2+.0001||y+d>width-2+.0001)continue;
    if(bed.some(b=>x<b.x+b.width+gap-.0001&&b.x<x+w+gap-.0001&&y<b.y+b.depth+gap-.0001&&b.y<y+d+gap-.0001))continue;
    if(!best||y<best.y||y===best.y&&x<best.x)best={item,x,y,width:w,depth:d,rotation};
   }
   if(best){if(!beds[bi])beds.push(bed);bed.push(best);placed=true;break;}
  }
  if(!placed)throw Error('Не удалось разместить деталь: '+v.name);
 }
 return {settings,beds};
}
