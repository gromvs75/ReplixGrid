import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Project} from '../src/model.js';
import {buildKit} from '../src/accessoryKernel.js';
import {decodeSTL,inspectSurface} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
for(const form of ['square','rounded','chamfered','capsule','circle','oval'] as const)for(const style of ['chamfer','round'] as const){
 test(`deep notch kit: fractional ${form}, ${style}, patterned sleeve`,async()=>{
  const p:Project={...defaultProject(),width:13.27,depth:form==='circle'?13.27:9.63,height:18.37,wallThickness:.8,floorThickness:.8,
   cornerRadius:form==='capsule'?4.815:['rounded','chamfered'].includes(form)?1.605:0,
   cornerStyle:form==='chamfered'?'chamfer':'round',footprint:form==='circle'||form==='oval'?form:undefined,
   topEdge:{style,size:.28},cutouts:{left:{shape:'square',width:.5,depth:22.044,position:0}},
   shell:{pattern:'petals',size:8.13,gap:.2,thickness:1.2,border:2.13}};
  const parts=await buildKit(p);
  assert.equal(parts.filter(p=>p.kind==='organizer').length,1);assert.equal(parts.filter(p=>p.kind==='shell').length,1);
  for(const part of parts){const s=inspectSurface(decodeSTL(part.stl));assert.ok(s.volume>0,part.name);assert.equal(s.bounds.min[2],0,part.name);}
  for(const format of ['stl','3mf','obj'] as const)assert.ok(formatExport(parts,format).data.byteLength>1000);
 });
}
