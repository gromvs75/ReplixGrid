/** Original periodic height fields. Values describe outward height, not colour. */
export const reliefNames={ribs:'Рёбра',diagonal:'Косые рёбра',waffle:'Вафля',weave:'Плетёнка',herringbone:'Ёлочка',waves:'Мягкие волны',scales:'Чешуя',pebbles:'Галька',diamonds:'Ромбы',flutes:'Каннелюры',braid:'Косичка',dots:'Горошек',linen:'Лён',facets:'Грани',chevron:'Шеврон'} as const;
export type ReliefPattern=keyof typeof reliefNames;
export const reliefPatterns=Object.keys(reliefNames) as ReliefPattern[];
const tau=Math.PI*2;
const wave=(t:number)=>(1-Math.cos(tau*t))/2;
const frac=(t:number)=>t-Math.floor(t);
const bump=(x:number,y:number,r:number)=>Math.max(0,1-(x*x+y*y)/(r*r))**2;
export function reliefValue(pattern:ReliefPattern,u:number,v:number):number{
 switch(pattern){
  case 'ribs':return wave(u)**2;
  case 'diagonal':return wave(u+.55*v)**2;
  case 'waffle':return Math.max(wave(u),wave(v));
  case 'waves':return wave(u+.22*Math.sin(tau*v));
  case 'herringbone':{const phase=frac(v-Math.abs(frac(u)-.5));const d=Math.min(phase,1-phase);return Math.max(0,1-d/.24);}
  case 'weave':{const x=frac(2*u),y=frac(2*v),horizontal=(Math.floor(2*u)+Math.floor(2*v))%2===0;
   const along=horizontal?x:y,across=horizontal?y:x;
   return 1-Math.sin(Math.PI*along)*Math.sin(Math.PI*across)**3;}
  case 'scales':{let peak=0;for(let row=Math.floor(v)-1;row<=Math.floor(v)+1;row++){
   const x=frac(u-row*.5)-.5,y=v-row;peak=Math.max(peak,bump(x,y,.66));}return peak;}
  case 'pebbles':{let peak=0;for(let row=Math.floor(v)-1;row<=Math.floor(v)+1;row++){
   const x=frac(u-.5*(row%2))-.5,y=v-row-.5;
   peak=Math.max(peak,bump(x/.9,y/1.05,.58));}return peak;}
  case 'diamonds':return Math.max(wave(u+v),wave(u-v));
  case 'flutes':return Math.sqrt(wave(u));
  case 'braid':return Math.min(wave(u+.24*Math.sin(tau*v)),wave(u-.24*Math.sin(tau*v)+.5));
  case 'dots':return bump(frac(u)-.5,frac(v)-.5,.37);
  case 'linen':return .55*wave(u)*wave(v)+.225*wave(3*u)+.225*wave(3*v);
  case 'facets':return Math.max(0,1-2*Math.max(Math.abs(frac(u)-.5),Math.abs(frac(v)-.5)));
  case 'chevron':{const t=frac(v+Math.abs(frac(u)-.5)),d=Math.min(t,1-t);return Math.max(0,1-d/.16);}
 }
}
