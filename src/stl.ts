export type Point = [number, number, number];
export type Triangle = [Point, Point, Point];
const sub = (a: Point,b: Point): Point => [a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const cross = (a: Point,b: Point): Point => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const dot = (a: Point,b: Point) => a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
/** Weld numerical duplicates before float32 export, never relax the final inspector. */
export function weldNearVertices(triangles:Triangle[],tolerance:number):Triangle[]{
  const buckets=new Map<string,Point[]>();
  const weld=(p:Point):Point=>{
    const cell=p.map(v=>Math.floor(v/tolerance));
    for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++){
      for(const q of buckets.get(`${cell[0]+x},${cell[1]+y},${cell[2]+z}`)??[])
        if(Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2])<=tolerance)return q;
    }
    const key=cell.join(','),bucket=buckets.get(key)??[];bucket.push(p);buckets.set(key,bucket);return p;
  };
  return triangles.map(tri=>tri.map(weld) as Triangle);
}
export function removeCollapsedFaces(triangles: Triangle[]): Triangle[] {
  // Float32 output can collapse a zero-width seam. Remove only exactly
  // zero-area faces; inspectSurface MUST validate the resulting topology.
  return triangles.filter(([a,b,c])=>Math.hypot(...cross(sub(b,a),sub(c,a)))!==0);
}
export function encodeSTL(triangles: Triangle[]): ArrayBuffer {
  const buffer = new ArrayBuffer(84+50*triangles.length), view = new DataView(buffer);
  new Uint8Array(buffer,0,80).set(new TextEncoder().encode('ReplixGrid binary STL; coordinate convention: millimeters'));
  view.setUint32(80,triangles.length,true);
  let offset=84;
  for (const [a,b,c] of triangles) {
    const n = cross(sub(b,a),sub(c,a)), size = Math.hypot(...n);
    if (!Number.isFinite(size) || size === 0) throw new Error(`Degenerate STL triangle: ${JSON.stringify([a,b,c])}`);
    for (const v of [...n.map(x=>x/size),...a,...b,...c]) { view.setFloat32(offset,v,true); offset+=4; }
    view.setUint16(offset,0,true); offset+=2;
  }
  return buffer;
}
export function decodeSTL(buffer: ArrayBuffer): Triangle[] {
  if (buffer.byteLength < 84) throw new Error('Truncated STL');
  const view = new DataView(buffer), count=view.getUint32(80,true);
  if (buffer.byteLength !== 84+count*50) throw new Error('STL size mismatch');
  return Array.from({length:count},(_,i)=> Array.from({length:3},(_,j)=>
    Array.from({length:3},(_,k)=>view.getFloat32(84+i*50+12+j*12+k*4,true)) as Point) as Triangle);
}
/** Exact positional weld after float32 serialization. Reject ambiguous shells. */
export function inspectSurface(triangles: Triangle[]) {
  const edges=new Map<string,{directions:number[]; triangles:number[]}>();
  const keys=new Map<string,number>();
  const parent=triangles.map((_,i)=>i);
  const find=(i:number):number=> parent[i]===i ? i : (parent[i]=find(parent[i]));
  const min:Point=[Infinity,Infinity,Infinity],max:Point=[-Infinity,-Infinity,-Infinity];
  let volume=0;
  triangles.forEach(([a,b,c],index)=>{
    for (const p of [a,b,c]) for(let k=0;k<3;k++) {
      if(!Number.isFinite(p[k])) throw new Error('Non-finite vertex');
      min[k]=Math.min(min[k],p[k]); max[k]=Math.max(max[k],p[k]);
    }
    if(Math.hypot(...cross(sub(b,a),sub(c,a))) < 1e-10) throw new Error('Degenerate triangle');
    volume+=dot(a,cross(b,c))/6;
    const ids=[a,b,c].map(p=>{const key=p.join(',');if(!keys.has(key))keys.set(key,keys.size);return keys.get(key)!;});
    for(let k=0;k<3;k++) {
      const u=ids[k],v=ids[(k+1)%3],key=`${Math.min(u,v)}:${Math.max(u,v)}`;
      const edge=edges.get(key)??{directions:[],triangles:[]};
      edge.directions.push(u<v?1:-1);edge.triangles.push(index);edges.set(key,edge);
    }
  });
  for(const e of edges.values()) {
    if(e.directions.length!==2 || e.directions[0]+e.directions[1]!==0) throw new Error('Open or non-manifold oriented edge');
    parent[find(e.triangles[0])]=find(e.triangles[1]);
  }
  if(!(volume>0) || new Set(parent.map((_,i)=>find(i))).size!==1) throw new Error('Expected one positive-volume connected surface');
  return {triangles:triangles.length,vertices:keys.size,volume,bounds:{min,max}};
}
