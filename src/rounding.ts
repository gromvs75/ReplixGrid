export type XY=[number,number];
// 32 segments per quadrant: same angles for all concentric contours.
// At the UI maximum radius, radial chord error stays below 0.02 mm.
export const ARC_SEGMENTS=32;
export function maxCornerRadius(width:number,depth:number){return Math.min(width,depth)/2;}
export function roundedContour(width:number,depth:number,radius:number,x=0,y=0):XY[]{
  const r=Math.max(0,Math.min(radius,width/2,depth/2));
  if(r===0)return [[x,y],[x+width,y],[x+width,y+depth],[x,y+depth]];
  const result:XY[]=[];
  const centers:XY[]=[[x+width-r,y+r],[x+width-r,y+depth-r],[x+r,y+depth-r],[x+r,y+r]];
  centers.forEach(([cx,cy],corner)=>{for(let i=0;i<=ARC_SEGMENTS;i++){const a=(-90+corner*90+i*90/ARC_SEGMENTS)*Math.PI/180;result.push([cx+r*Math.cos(a),cy+r*Math.sin(a)]);}});
  return result.filter((point,i)=>Math.hypot(point[0]-result[(i+result.length-1)%result.length][0],point[1]-result[(i+result.length-1)%result.length][1])>1e-8);
}
export function clipRectangle(polygon:XY[],x:number,y:number,width:number,depth:number):XY[]{
  let points=polygon;
  for(const [axis,bound,sign] of [[0,x,1],[0,x+width,-1],[1,y,1],[1,y+depth,-1]]){
    const output:XY[]=[];for(let i=0;i<points.length;i++){
      const a=points[i],b=points[(i+1)%points.length],insideA=(a[axis]-bound)*sign>=-1e-9,insideB=(b[axis]-bound)*sign>=-1e-9;
      if(insideA)output.push(a);
      if(insideA!==insideB){const fraction=(bound-a[axis])/(b[axis]-a[axis]);output.push([a[0]+fraction*(b[0]-a[0]),a[1]+fraction*(b[1]-a[1])]);}
    }points=output;
  }return points;
}
export function polygonArea(points:XY[]){return Math.abs(points.reduce((n,a,i)=>{const b=points[(i+1)%points.length];return n+a[0]*b[1]-b[0]*a[1];},0))/2;}

/** Corner cut measured along each adjoining side; parallel offsets preserve clearance. */
export function chamferedContour(width:number,depth:number,size:number,x=0,y=0):XY[]{
 const c=Math.max(0,Math.min(size,width/2,depth/2));
 if(c===0)return [[x,y],[x+width,y],[x+width,y+depth],[x,y+depth]];
 const pts:XY[]=[[x+c,y],[x+width-c,y],[x+width,y+c],[x+width,y+depth-c],[x+width-c,y+depth],[x+c,y+depth],[x,y+depth-c],[x,y+c]];
 return pts.filter((v,i)=>Math.hypot(v[0]-pts[(i+pts.length-1)%pts.length][0],v[1]-pts[(i+pts.length-1)%pts.length][1])>1e-8);
}
