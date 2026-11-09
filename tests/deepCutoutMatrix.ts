import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Project,type Side} from '../src/model.js';
import {buildOrganizer} from '../src/kernel.js';
import {footprintContour} from '../src/footprint.js';
import {polygonArea} from '../src/rounding.js';
import {decodeSTL,inspectSurface,type Point,type Triangle} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';

type Form='square'|'rounded'|'chamfered'|'capsule'|'circle'|'oval';
const dimensions=[[6.68,5.58,8.71,.8],[9.5,9.5,10,1],[13.27,9.63,18.37,.8],[51.73,47.19,60.13,2],[140,90.13,120,2]];
const sides:Side[]=['front','back','left','right'];
const baselines=new Map<string,Promise<number>>();
function checkFloor(p:Project,triangles:Triangle[]){
 // Boolean operations and Float32 can leave a nominally flat base a few
 // nanometres above zero; edge cleanup approximates its curved boundary.
 const bottom=triangles.filter(t=>t.every(v=>Math.abs(v[2])<Math.max(p.width,p.depth,p.height)*1e-6));
 const area=bottom.reduce((sum,[a,b,c])=>sum+Math.abs((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]))/2,0);
 const outline=footprintContour(p),expected=polygonArea(outline);
 const perimeter=outline.reduce((n,a,i)=>{const b=outline[(i+1)%outline.length];return n+Math.hypot(b[0]-a[0],b[1]-a[1]);},0);
 assert.ok(Math.abs(area-expected)<perimeter*.004,'bottom area is preserved within the 4-micron contour cleanup tolerance');
}
// Read the actual packaged files, not just the pre-export mesh.
function unzip(data:ArrayBuffer){
 const view=new DataView(data),files=new Map<string,string>();let at=0;
 while(view.getUint32(at,true)===0x04034b50){
  assert.equal(view.getUint16(at+8,true),0);
  const size=view.getUint32(at+18,true),n=view.getUint16(at+26,true),extra=view.getUint16(at+28,true),start=at+30+n+extra;
  files.set(new TextDecoder().decode(data.slice(at+30,at+30+n)),new TextDecoder().decode(data.slice(start,start+size)));at=start+size;
 }return files;
}
function checkFormats(stl:ArrayBuffer){
 const parts=[{name:'organizer',stl,color:'#ff7928'}],source=inspectSurface(decodeSTL(stl));
 const model=unzip(formatExport(parts,'3mf').data).get('3D/3dmodel.model')!;
 const vertices=[...model.matchAll(/<vertex x="([^"]+)" y="([^"]+)" z="([^"]+)"\/>/g)].map(m=>m.slice(1).map(Number) as Point);
 const triangles=[...model.matchAll(/<triangle v1="(\d+)" v2="(\d+)" v3="(\d+)"\/>/g)].map(m=>m.slice(1).map(i=>vertices[Number(i)]) as Triangle);
 const mf=inspectSurface(triangles);assert.equal(mf.triangles,source.triangles);assert.equal(mf.volume,source.volume);
 const obj=unzip(formatExport(parts,'obj').data).get('organizer.obj')!;
 const ov=obj.split('\n').filter(l=>l.startsWith('v ')).map(l=>l.slice(2).split(' ').map(Number) as Point);
 const ot=obj.split('\n').filter(l=>l.startsWith('f ')).map(l=>l.slice(2).split(' ').map(i=>ov[Number(i)-1]) as Triangle);
 const inspected=inspectSurface(ot);assert.equal(inspected.triangles,source.triangles);assert.ok(Math.abs(inspected.volume-source.volume)<source.volume*1e-8);
 assert.equal(formatExport(parts,'stl').data,stl);
}
export function deepCutoutMatrix(forms:readonly Form[]){
for(const form of forms)for(const [width,depth,height,wallThickness] of dimensions)for(const style of ['chamfer','round'] as const)for(const shape of ['smooth','round','square'] as const)for(const [i,side] of sides.entries()){
 test(`deep ${shape} notch: ${form} ${width}×${form==='circle'?width:depth}, ${style}, ${side}`,async()=>{
  const p:Project={...defaultProject(),width,depth:form==='circle'?width:depth,height,wallThickness,floorThickness:wallThickness,
   cornerRadius:form==='capsule'?Math.min(width,depth)/2:['rounded','chamfered'].includes(form)?Math.min(width,depth)/6:0,
   cornerStyle:form==='chamfered'?'chamfer':'round',footprint:form==='circle'||form==='oval'?form:undefined,
   topEdge:{style,size:wallThickness*.35},cutouts:{[side]:{shape,width:i===3?.8:.5,depth:height*(i===0?.6:i===1?.95:1.2),position:i===2?0:i===3?1:.5}}};
  const key=[form,width,depth,style].join('/');
  if(!baselines.has(key))baselines.set(key,buildOrganizer({...p,cutouts:undefined}).then(r=>r.inspection.volume));
  const plainVolume=await baselines.get(key)!;
  const result=await buildOrganizer(p),triangles=decodeSTL(result.stl),surface=inspectSurface(triangles);
  assert.ok(surface.volume<plainVolume-.01,'cutout must remove material');
  assert.ok(Math.abs(surface.bounds.max[2]-height)<1e-4,'uncut rim retains requested height');
  checkFloor(p,triangles);
  if(i===2&&width===13.27)checkFormats(result.stl);
 });
}
}
