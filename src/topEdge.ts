import type {Manifold,ManifoldToplevel,Vec3} from 'manifold-3d';
import {topEdgeSize,type Project} from './model.js';

type Face={a:number;b:number;n:Vec3;other:number};
type Edge={a:number;b:number;dx:number;dy:number;gx:number;gy:number};

// Cut the perimeter of the joined solid, so buried edges at T-junctions
// never create a groove. Vertical corners and the floor are left intact.
export function finishTopEdge(w:ManifoldToplevel,p:Project,solid:Manifold,keep:(v:Manifold)=>Manifold){
 const r=topEdgeSize(p);if(!r)return solid;
 // Avoid sub-micron cutter faces at tightly tessellated inner fillets.
 const original=keep(solid.asOriginal());
 return finish(Math.min(.004,r/100),true);
 function finish(tolerance:number,canRetry:boolean):Manifold{
 const base=keep(original.simplify(tolerance));
 const mesh=base.getMesh();
 const point=(i:number):Vec3=>[0,1,2].map(k=>mesh.vertProperties[i*mesh.numProp+k]) as Vec3;
 const pairs=new Map<string,Face>(),edges:Edge[]=[],incident=new Map<number,Edge[]>();
 for(let i=0;i<mesh.triVerts.length;i+=3){
  const ids=Array.from(mesh.triVerts.subarray(i,i+3)),[a,b,c]=ids.map(point);
  const u=b.map((x,k)=>x-a[k]),v=c.map((x,k)=>x-a[k]);
  const n:Vec3=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
  const len=Math.hypot(...n);if(!len)continue;n.forEach((_,k)=>n[k]/=len);
  for(let k=0;k<3;k++){
   const a=ids[k],b=ids[(k+1)%3],key=a<b?a+':'+b:b+':'+a;
   const f={a,b,n,other:ids[(k+2)%3]},o=pairs.get(key);
   if(!o){pairs.set(key,f);continue;} pairs.delete(key);
   const [side,top]=Math.abs(n[2])<1e-5?[f,o]:[o,f];
   if(Math.abs(side.n[2])>=1e-5||top.n[2]<.001)continue;
   const start=point(a),end=point(b),inside=point(top.other);
   if(Math.max(start[2],end[2])<=p.floorThickness+1e-5 ||
      (inside[0]-start[0])*side.n[0]+(inside[1]-start[1])*side.n[1]>=0)continue;
   const e={a:side.a,b:side.b,dx:-side.n[0],dy:-side.n[1],gx:-top.n[0]/top.n[2],gy:-top.n[1]/top.n[2]};
   edges.push(e);for(const id of [a,b]){const group=incident.get(id)??[];group.push(e);incident.set(id,group);}
  }
 }
 const cuts:Manifold[]=[];
 for(const e of edges){
  const coords:number[]=[],tri:number[]=[];
  const steps=p.topEdge!.style==='round'?8:1;
  for(const id of [e.a,e.b]){
   const q=point(id),adj=incident.get(id)!,neighbor=adj.length===2?adj.find(f=>f!==e):undefined;
   let dx=e.dx,dy=e.dy;
   if(neighbor){const scale=1+dx*neighbor.dx+dy*neighbor.dy;
    if(scale>.1){dx=(dx+neighbor.dx)/scale;dy=(dy+neighbor.dy)/scale;}}
   const opposite=point(id===e.a?e.b:e.a),len=Math.hypot(q[0]-opposite[0],q[1]-opposite[1]);
   if(len<1e-8)throw new Error('Degenerate top edge');
   const tx=(opposite[0]-q[0])/len,ty=(opposite[1]-q[1])/len;
   // A large radius on a short lip can make the two miter planes cross.
   // Clip the miter before that happens; adjacent cuts still overlap.
   const excess=Math.max(0,dx*tx+dy*ty-.48*len/r);
   dx-=excess*tx;dy-=excess*ty;
   for(let k=0;k<3;k++)q[k]+=.002*(q[k]-opposite[k])/len;
   const add=(u:number,z:number)=>coords.push(q[0]+u*dx,q[1]+u*dy,q[2]+u*(dx*e.gx+dy*e.gy)+z);
   add(-.01,-r);add(-.01,.02);
   for(let i=0;i<=steps;i++){const a=i*Math.PI/(2*steps);
    add(r*(1-Math.cos(a)),-r*(1-Math.sin(a)));add(r*(1-Math.cos(a)),.02);}
  }
  const m=2*(steps+2);
  const quad=(a:number,b:number,c:number,d:number)=>tri.push(a,b,c,a,c,d);
  for(let i=0;i<m-2;i+=2){
   quad(i,i+2,i+3,i+1);quad(m+i+1,m+i+3,m+i+2,m+i);
   quad(i,m+i,m+i+2,i+2);quad(i+3,m+i+3,m+i+1,i+1);
  }
  quad(1,m+1,m,0);quad(m-2,2*m-2,2*m-1,m-1);
  const raw=new w.Mesh({numProp:3,vertProperties:new Float32Array(coords),triVerts:new Uint32Array(tri)});
  let cut=keep(new w.Manifold(raw));
  if(cut.volume()<0){for(let i=0;i<tri.length;i+=3)[tri[i],tri[i+1]]=[tri[i+1],tri[i]];
   cut=keep(new w.Manifold(new w.Mesh({numProp:3,vertProperties:raw.vertProperties,triVerts:new Uint32Array(tri)})));}
  cuts.push(cut);
 }
 if(!cuts.length)return solid;
 // The finish must never enter the bottom plate, even on very low walls.
 const cutter=keep(keep(w.Manifold.union(cuts)).trimByPlane([0,0,1],p.floorThickness));
 const result=keep(keep(base.subtract(cutter)).asOriginal());
 const cleaned=keep(result.simplify(.002)),components=cleaned.decompose();components.forEach(keep);
 const substantial=components.filter(c=>Math.abs(c.volume())>1e-7);
 // Simplifying a long, notched rim can tilt a narrow face enough that its
 // bevel cutter detaches a strip. Rebuild from the original joined surface
 // at finer precision; never discard a substantial disconnected piece.
 if(canRetry&&substantial.length>1)return finish(Math.min(tolerance,1e-5),false);
 return substantial.length===1?substantial[0]:cleaned;
 }
}
