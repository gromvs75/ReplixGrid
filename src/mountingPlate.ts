import type {DrawerLayout} from './drawer.js';
/** Coupon confirmed by owner: PLA, 0.2 mm layers, 0.25 mm first layer. */
export const MOUNT={pitch:20,pegRadius:3,pegHeight:1.8,plateThickness:2,socketDepth:2.1,clearance:.12,addedHeight:4.1,tabDepth:4,seamGap:.05,jointClearance:.03} as const;
export interface PlateSettings {enabled:boolean;bedWidth:number;bedDepth:number}
export interface PlateTile {row:number;column:number;x:number;y:number;width:number;depth:number}
function cuts(length:number,interiorMax:number,lastMax:number){
 if(length<=lastMax)return [0,length];
 const step=Math.floor(interiorMax/MOUNT.pitch)*MOUNT.pitch;
 for(let n=Math.ceil(length/lastMax);n<=100;n++){
  const points=[0];
  for(let i=1;i<n;i++){
   const low=Math.ceil((length-lastMax-step*(n-i-1))/20)*20;
   points.push(Math.min(points[i-1]+step,Math.max(low,Math.round(i*length/n/20)*20)));
  }
  points.push(length);
  if(points.slice(1).every((v,i)=>v-points[i]>=16&&v-points[i]<=(i===n-1?lastMax:interiorMax)))return points;
 }
 throw new Error('Не удалось разбить пластину под этот стол.');
}

export function platePlan(d:DrawerLayout){
 const settings=d.plate??{enabled:false,bedWidth:270,bedDepth:270};
 const width=d.width-2*d.gap,depth=d.depth-2*d.gap;
 if(width<16||depth<16)throw new Error('Слишком мало места для пластины. Уменьшите зазор.');
 const xs=cuts(width,settings.bedWidth-4-MOUNT.tabDepth,settings.bedWidth-4),ys=cuts(depth,settings.bedDepth-4-MOUNT.tabDepth,settings.bedDepth-4);
 if((xs.length-1)*(ys.length-1)>100)throw new Error('Слишком много секций. Увеличьте область печати.');
 const tiles:PlateTile[]=[];
 for(let row=0;row<ys.length-1;row++)for(let column=0;column<xs.length-1;column++)tiles.push({row,column,x:xs[column]+d.gap,y:ys[row]+d.gap,width:xs[column+1]-xs[column],depth:ys[row+1]-ys[row]});
 const pegs:{x:number;y:number}[]=[];
 for(let x=d.gap+10;x<=d.width-d.gap-3.5;x+=20)for(let y=d.gap+10;y<=d.depth-d.gap-3.5;y+=20)pegs.push({x,y});
 return {width,depth,tiles,pegs,columns:xs.length-1,rows:ys.length-1};
}
