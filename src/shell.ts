import {cellularOpenings} from './cellularPattern.js';
import {hasCapsuleSlope,capsuleTop} from './model.js';
import {shellGap} from './reliefSize.js';
import {footprintContour,honeyCells,honeyEdgeOwner,offsetContour} from './footprint.js';
import {resolveWalls,type Project,type ShellSettings,type Wall} from './model.js';
import {splitPlan} from './splitting.js';
export type P2=[number,number];
export interface ShellPanel extends Wall { outline:P2[]; holes:P2[][] }
export const defaultShell=(pattern:ShellSettings['pattern']):ShellSettings=>({pattern,gap:.5,thickness:1.6,size:pattern==='cellular'?20:12});
// One sampled profile is shared by preview, cutout clearance and both STL parts.
// Smoothstep makes a gentle S: horizontal tangents, no height overshoot.
function curveSteps(w:Wall){return Math.max(32,Math.ceil(Math.sqrt(Math.abs(w.endHeight-w.startHeight)*.75/.01)));}
function smooth(t:number){return t*t*(3-2*t);}
export function topAt(w:Wall,x:number){
  const t=Math.max(0,Math.min(1,(x-w.cap)/(w.length-2*w.cap)));
  let f=t;
  if(w.transitionStyle==='wavy'&&w.wavelength===undefined){
    const n=curveSteps(w),i=Math.min(n-1,Math.floor(t*n)),u=t*n-i;
    f=smooth(i/n)*(1-u)+smooth((i+1)/n)*u;
  }
  let base=w.stepPoints?w.stepPoints.reduce((h,[at,value])=>x>=at?value:h,w.stepPoints[0][1]):w.startHeight+(w.endHeight-w.startHeight)*f;
  if(w.transitionStyle==='zigzag'||(w.transitionStyle==='wavy'&&w.wavelength!==undefined)){
    const span=Math.max(.001,w.length-2*w.cap),distance=t*span,pitch=w.wavelength??24;
    const phase=(distance/pitch)%1;
    const wave=w.transitionStyle==='zigzag'?1-Math.abs(2*phase-1):(1-Math.cos(2*Math.PI*phase))/2;
    const fade=Math.min(1,distance/(pitch/4),(span-distance)/(pitch/4));
    const depth=Math.min(4,pitch/6,Math.max(0,(Math.min(w.startHeight,w.endHeight)-(w.minTop??.8))*.25));
    base-=depth*wave*Math.max(0,fade);
  }
  const cut=w.cutout;
  if(!cut)return base;
  const span=w.length*.9,width=span*cut.width,lo=w.length*.05+(span-width)*cut.position;
  const u=(x-lo)/width;if(u<=0||u>=1)return base;
  let shape:number;
  if(cut.shape==='round')shape=Math.sqrt(Math.max(0,1-(2*u-1)**2));
  else if(cut.shape==='smooth'){const edge=Math.min(u,1-u);shape=edge>=.3?1:smooth(edge/.3);}
  else {const edge=Math.min(u,1-u),r=.12;shape=edge>=r?1:Math.sqrt(Math.max(0,1-(1-edge/r)**2));}
  return Math.max(w.minTop??.8,base-cut.depth*shape);
}
export function wallOutline(w:Wall):P2[]{
  const {length:l,startHeight:a,endHeight:b,cap}=w;
  if(w.stepPoints&&!w.cutout){
    const top:P2[]=[[0,w.stepPoints[0][1]]];
    for(let i=1;i<w.stepPoints.length;i++){const [x,h]=w.stepPoints[i];top.push([x,w.stepPoints[i-1][1]],[x,h]);}
    top.push([l,w.stepPoints.at(-1)![1]]);
    return [[0,0],[l,0],...top.reverse()];
  }
  if(w.cutout||w.transitionStyle==='zigzag'||(w.transitionStyle==='wavy'&&w.wavelength!==undefined)){const n=Math.max(64,Math.ceil(l/.5));const xs=Array.from({length:n+1},(_,i)=>l*i/n);xs.push(cap,l-cap);if(w.transitionStyle==='zigzag'){const step=(w.wavelength??24)/2;for(let x=cap;x<l-cap;x+=step)xs.push(x);}if(w.stepPoints)xs.push(...w.stepPoints.slice(1).map(([x])=>x));const top=Array.from(new Set(xs)).sort((a,b)=>b-a).flatMap(x=>{const h=topAt(w,x);return w.stepPoints?.slice(1).some(([at])=>Math.abs(at-x)<1e-8)?[[x,h] as P2,[x,topAt(w,x-1e-7)] as P2]:[[x,h] as P2];});return [[0,0],[l,0],...top];}
  if(w.transitionStyle!=='wavy'||a===b)return cap?[[0,0],[l,0],[l,b],[l-cap,b],[cap,a],[0,a]]:[[0,0],[l,0],[l,b],[0,a]];
  const points:P2[]=[[0,0],[l,0],[l,b]];
  if(cap)points.push([l-cap,b]);
  const n=curveSteps(w);
  for(let i=n-1;i>=0;i--){const x=cap+(l-2*cap)*i/n;points.push([x,topAt(w,x)]);}
  if(cap)points.push([0,a]);
  return points;
}
export function holesFor(w:Wall,settings:ShellSettings,border:number,sideMargin=border):P2[][]{
  const result:P2[][]=[],size=settings.size,web=Math.max(1,Math.min(1.2,settings.thickness)),r=size/2;
  const add=(poly:P2[])=>{const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]),lo=Math.min(...xs),hi=Math.max(...xs);
    const epsilon=1e-8;
    if(lo<sideMargin-epsilon||hi>w.length-sideMargin+epsilon||Math.min(...ys)<border-epsilon||Math.max(...ys)>Math.min(topAt(w,lo),topAt(w,hi))-border+epsilon)return;
    // Cutouts clockwise, exterior counterclockwise.
    result.push(poly.reverse());
    if(result.length>12000)throw new Error('Узор слишком мелкий для этой оболочки. Увеличьте крупность.');
  };
  const maxH=Math.max(w.startHeight,w.endHeight);
  if(settings.pattern==='cellular'){
    const cells=cellularOpenings(w.length-2*sideMargin,maxH-2*border,size,false);
    for(const cell of cells)add(cell.reverse().map(([x,y])=>[x+sideMargin,y+border]));
  }else if(settings.pattern==='petals'){
    // Three kite-shaped openings per triangle form a connected six-petal lattice.
    // Adjacent tiles share one narrow rib instead of leaving space around a flower.
    const h=size*Math.sqrt(3)/2;
    const tile=(triangle:P2[])=>{
      const center:P2=[triangle.reduce((s,v)=>s+v[0],0)/3,triangle.reduce((s,v)=>s+v[1],0)/3];
      for(let k=0;k<3;k++){
        const a=triangle[k],b=triangle[(k+1)%3],c=triangle[(k+2)%3];
        add(offsetContour([a,[(a[0]+b[0])/2,(a[1]+b[1])/2],center,[(a[0]+c[0])/2,(a[1]+c[1])/2]],-web/2));
      }
    };
    for(let row=0,y=border;y<maxH-border;row++,y+=h)for(let x=sideMargin-size+(row%2)*size/2;x<w.length-sideMargin;x+=size){
      tile([[x,y],[x+size,y],[x+size/2,y+h]]);
      tile([[x+size,y],[x+size*1.5,y+h],[x+size/2,y+h]]);
    }
  }else if(settings.pattern==='cubes'){
    const dx=1.5*r,dy=Math.sqrt(3)*r;
    let col=0;for(let x=sideMargin+r;x+r<=w.length-sideMargin;x+=dx,col++)for(let y=border+r+(col%2?dy/2:0);y+r<=maxH-border;y+=dy){
      const points=Array.from({length:6},(_,i)=>[x+r*Math.cos(i*Math.PI/3),y+r*Math.sin(i*Math.PI/3)] as P2);
      for(const i of [0,2,4])add(offsetContour([[x,y],points[i],points[(i+1)%6],points[(i+2)%6]],-web/2));
    }
  }else if(settings.pattern==='triangles'){
    const h=size*Math.sqrt(3)/2;
    for(let row=0,y=border;y+h<=maxH-border;row++,y+=h)for(let x=sideMargin-size+(row%2)*size/2;x+size<=w.length-sideMargin;x+=size){
      add(offsetContour([[x,y],[x+size,y],[x+size/2,y+h]],-web/2));
      add(offsetContour([[x+size,y],[x+size*1.5,y+h],[x+size/2,y+h]],-web/2));
    }
  }else if(settings.pattern==='slots'){
    const width=Math.max(.2,size-web),height=Math.max(.2,size*1.7-web);
    for(let row=0,y=border+height/2;y+height/2<=maxH-border;row++,y+=size*1.7)for(let x=sideMargin+width/2+(row%2?size/2:0);x+width/2<=w.length-sideMargin;x+=size){
      const radius=Math.min(width/2,height/2),poly:P2[]=[];
      for(let i=0;i<=8;i++){const a=Math.PI*i/8;poly.push([x+radius*Math.cos(a),y+height/2-radius+radius*Math.sin(a)]);}
      for(let i=0;i<=8;i++){const a=Math.PI+Math.PI*i/8;poly.push([x+radius*Math.cos(a),y-height/2+radius+radius*Math.sin(a)]);}
      add(poly);
    }
  }else if(settings.pattern==='waves'){
    const period=size*2,width=period-web,amp=size*.14,slot=size*.45,pitchY=slot+web;
    for(let x=sideMargin;x+width<=w.length-sideMargin;x+=period)for(let y=border+amp+slot/2;y<maxH-border;y+=pitchY){
      const lower:P2[]=[],upper:P2[]=[];
      for(let i=0;i<=32;i++){const u=i/32,z=y+amp*Math.sin((x+u*width-sideMargin)/period*Math.PI*2);lower.push([x+u*width,z-slot/2]);upper.push([x+u*width,z+slot/2]);}
      add([...lower,...upper.reverse()]);
    }
  }else{
    const hex=settings.pattern==='honeycomb',dx=hex?1.5*r:r,dy=hex?Math.sqrt(3)*r:2*r;
    let col=0;for(let x=sideMargin+r;x+r<=w.length-sideMargin;x+=dx,col++)for(let y=border+r+(col%2?dy/2:0);y<maxH-border;y+=dy){
      const n=hex?6:4;
      add(offsetContour(Array.from({length:n},(_,i)=>[x+r*Math.cos(i*2*Math.PI/n),y+r*Math.sin(i*2*Math.PI/n)] as P2),-web/2));
    }
  }
  return result;
}
export function shellLayout(p:Project,includeHoles=true){
  const outer=resolveWalls(p).slice(0,4),s=p.shell;if(!s)throw new Error('Сначала выберите узор оболочки');
  const offset=shellGap(p)+s.thickness,width=p.width+2*offset,depth=p.depth+2*offset;
  const border=s.border??Math.max(3,s.thickness*2);
  const outerRadius=(p.cornerRadius??0)>0?(p.cornerRadius??0)+offset:0;
  const split=p.printing?splitPlan(p):null;

  const panels:ShellPanel[]=outer.map(w=>{
    const front=w.id==='front',back=w.id==='back',right=w.id==='right';
    const panel:Wall={...w,x:right?p.width+shellGap(p):-offset,y:back?p.depth+shellGap(p):-offset,
      length:front||back?width:depth,thickness:s.thickness,cap:w.cap?offset+w.cap:0,stepPoints:w.stepPoints?.map(([x,h])=>[x===0?0:x+offset,h])};
    const holes=(includeHoles?holesFor(panel,s,border,Math.max(border,outerRadius+border)):[]).filter(poly=>!split||panel.axis!==split.axis||!split.cuts.some(cut=>Math.max(...poly.map(v=>v[0]))>cut+offset-5&&Math.min(...poly.map(v=>v[0]))<cut+offset+20));
    return {...panel,outline:wallOutline(panel),holes:p.footprint?[]:holes};
  });
  const contourPanels:{origin:P2;angle:number;depth:number;holes:P2[][]}[]=[];
  if(p.footprint&&includeHoles){
    const base=footprintContour(p),contour=footprintContour(p,offset),stride=p.footprint==='honeycomb'?1:12;
    for(let i=0;i<contour.length;i+=stride){const j=(i+stride)%contour.length,a=contour[i],b=contour[j],dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);
      const owner=p.footprint==='honeycomb'?honeyEdgeOwner(p,base[i],base[j]):null;
      const h0=owner===null?contourHeight(p,outer,...base[i]):honeyCellHeight(p,outer,owner,...base[i]);
      const h1=owner===null?contourHeight(p,outer,...base[j]):honeyCellHeight(p,outer,owner,...base[j]);
      const wall:Wall={id:'contour',axis:'x',x:0,y:0,length,thickness:s.thickness,startHeight:h0,endHeight:h1,cap:0};
      const sag=p.footprint==='honeycomb'?0:Math.max(...Array.from({length:stride+1},(_,k)=>{const v=contour[(i+k)%contour.length];return Math.abs(dx*(v[1]-a[1])-dy*(v[0]-a[0]))/length;}));
      const depth=s.thickness+sag+2;
      const holes=holesFor(wall,s,border,border);
      contourPanels.push({origin:[a[0]-dy/length*depth,a[1]+dx/length*depth],angle:Math.atan2(dy,dx)*180/Math.PI,depth:depth*2,holes});
    }
  }
  const holes=panels.reduce((n,p)=>n+p.holes.length,0)+contourPanels.reduce((n,p)=>n+p.holes.length,0);
  if(holes>12000)throw new Error('Слишком много отверстий. Увеличьте крупность узора.');
  return {panels,contourPanels,width,depth,height:Math.max(...(p.honeycombHeights??[]).filter((h):h is number=>h!==null),...outer.flatMap(w=>[w.startHeight,w.endHeight,...(w.stepPoints??[]).map(([,h])=>h)])),innerWidth:p.width+2*shellGap(p),innerDepth:p.depth+2*shellGap(p),holes,border,outerRadius,innerRadius:(p.cornerRadius??0)>0?(p.cornerRadius??0)+shellGap(p):0};
}

export function contourHeight(p:Project,walls:Wall[],x:number,y:number){
  if(hasCapsuleSlope(p))return capsuleTop(p,x);
  if(p.footprint==='honeycomb'){
    const cells=honeyCells(p),dist=cells.map(c=>{const cx=c.reduce((v,a)=>v+a[0],0)/6,cy=c.reduce((v,a)=>v+a[1],0)/6;return (x-cx)**2+(y-cy)**2;});
    return honeyCellHeight(p,walls,dist.indexOf(Math.min(...dist)),x,y);
  }
  return baseContourHeight(p,walls,x,y);
}
export function honeyCellHeight(p:Project,walls:Wall[],index:number,x:number,y:number){
  return p.honeycombHeights?.[index]??baseContourHeight(p,walls,x,y);
}
function baseContourHeight(p:Project,walls:Wall[],x:number,y:number){
  // Blend the four editable boundary profiles; exact at each bounding side.
  const t=[Math.max(1e-5,y),Math.max(1e-5,p.depth-y),Math.max(1e-5,x),Math.max(1e-5,p.width-x)].map(d=>1/(d*d));
  const h=walls.slice(0,4).map(w=>topAt(w,w.axis==='x'?x:y));
  return h.reduce((sum,v,i)=>sum+v*t[i],0)/t.reduce((a,b)=>a+b,0);
}
