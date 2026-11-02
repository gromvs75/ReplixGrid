import {test} from 'node:test';import assert from 'node:assert/strict';import Module from 'manifold-3d';
import {defaultProject} from '../src/model.js';import {defaultShell,shellLayout} from '../src/shell.js';
import {splitPlan,suggestSplit} from '../src/splitting.js';import {buildPrintPieces,buildJointSample} from '../src/assemblyKernel.js';
import {decodeSTL} from '../src/stl.js';import {editProject,parseProject,splitCell} from '../src/editor.js';import {zipFiles} from '../src/zip.js';
const bed={bedWidth:270,bedDepth:270,bedHeight:270};
for(const axis of ['x','y'] as const)for(const count of [2,3] as const)test(`${axis} ${count} sections: separate watertight parts, fit and no assembled intersections`,async()=>{
  let p=defaultProject();p.wallThickness=5;p.floorThickness=3;p.width=axis==='x'?360:100;p.depth=axis==='y'?360:100;p.cornerRadius=12;p.heights.back=65;p.transitions=['left','right'];p.transitionStyles={left:'wavy',right:'wavy'};p.shell=defaultShell(count===2?'honeycomb':'waves');p.printing={...bed,parts:count};
  p=splitCell(p,'root',axis==='x'?'y':'x');const plan=splitPlan(p);assert.equal(plan.axis,axis);assert.equal(plan.cuts.length,count-1);
  const parts=await buildPrintPieces(p);assert.equal(parts.filter(p=>p.kind==='organizer').length,count);assert.equal(parts.filter(p=>p.kind==='shell').length,count===3?4:2);
  const wasm=await Module();wasm.setup();const owned:{delete():void}[]=[];
  try{const solids=parts.map(p=>{assert.ok(p.inspection.volume>0);assert.ok(p.inspection.bounds.max[0]<=270&&p.inspection.bounds.max[1]<=270);const tris=decodeSTL(p.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(Array.from({length:tris.length*3},(_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh);owned.push(raw);const placed=raw.translate(p.position);owned.push(placed);return placed;});
    for(let i=0;i<solids.length;i++)for(let j=i+1;j<solids.length;j++){const overlap=solids[i].intersect(solids[j]);owned.push(overlap);assert.ok(overlap.volume()<.001,`${parts[i].name}/${parts[j].name}: ${overlap.volume()}`);}
  }finally{for(const s of owned.reverse())s.delete();}
  const layout=shellLayout(p);for(const panel of layout.panels)if(panel.axis===axis)for(const hole of panel.holes)for(const cut of plan.cuts){const xs=hole.map(v=>v[0]-(p.shell!.gap+p.shell!.thickness));assert.ok(Math.max(...xs)<=cut-5||Math.min(...xs)>=cut+20);}
  assert.deepEqual(parseProject(JSON.stringify(p)),p);
});
test('suggestion accounts for snap overhang, bed height and impossible cross section',()=>{
  const p=defaultProject();p.wallThickness=5;p.floorThickness=3;p.width=600;assert.equal(suggestSplit(p,bed).settings.parts,3);
  p.depth=300;assert.throws(()=>suggestSplit(p,bed));p.depth=100;p.height=300;assert.throws(()=>splitPlan(p,{...bed,parts:3}),/Высота/);
  p.height=30;p.floorThickness=.8;assert.throws(()=>splitPlan(p,{...bed,parts:3}),/дна/);
});
test('planner moves seams away from internal walls and leaves room for two latches',()=>{
  let p=defaultProject();p.wallThickness=5;p.floorThickness=3;p.width=240;p=splitCell(p,'root','x');p.printing={...bed,parts:2};const plan=splitPlan(p);assert.notEqual(plan.cuts[0],120);assert.ok(plan.anchors[0][1]-plan.anchors[0][0]>=12);
});
test('sample produces separate insertion and receiving parts',async()=>{
  const p=defaultProject();p.shell=defaultShell('diamonds');const parts=await buildJointSample(p);assert.equal(parts.length,2);for(const r of parts)assert.ok(r.inspection.volume>0);
});
test('tray joint sample works with decorative panels enabled without changing the project',async()=>{
 const p=defaultProject();p.wallThickness=3.2;p.shell={...defaultShell('diamonds'),mode:'panels',sides:['front'],mounts:true,margin:2};
 const original=structuredClone(p),parts=await buildJointSample(p);
 assert.deepEqual(parts.map(part=>part.name),['organizer-1.stl','organizer-2.stl']);
 assert.deepEqual(p,original);
});
test('zip stores UTF-8 names and exact STL bytes',()=>{
  const source=new Uint8Array([0,5,255,40]);const buffer=zipFiles([{name:'part-1.stl',data:source},{name:'Инструкция.txt',data:'Сборка'}]);const view=new DataView(buffer);assert.equal(view.getUint32(0,true),0x04034b50);assert.deepEqual(new Uint8Array(buffer,30+10,4),source);assert.equal(view.getUint32(buffer.byteLength-22,true),0x06054b50);assert.equal(view.getUint16(buffer.byteLength-14,true),2);
});
test('printer settings persist without splitting; malformed area and count are rejected',()=>{
  const p=defaultProject();p.printArea=bed;assert.deepEqual(parseProject(JSON.stringify(p)).printArea,bed);
  for(const printArea of [null,[],{...bed,bedHeight:0},{...bed,bedWidth:'270'}])assert.throws(()=>parseProject(JSON.stringify({...p,printArea})));
  for(const printing of [null,{...bed,parts:4},{...bed,parts:2,bedDepth:0}])assert.throws(()=>parseProject(JSON.stringify({...p,printing})));
});
test('new split projects cannot enable a sleeve and legacy projects remain recoverable',()=>{
 const bed={bedWidth:270,bedDepth:270,bedHeight:270};
 const base=defaultProject();base.width=180;base.depth=90;base.wallThickness=5;base.floorThickness=3;
 const split={...base,printing:{...bed,parts:2 as const}};
 const sleeve={...base,shell:defaultShell('diamonds')};
 assert.throws(()=>editProject(split,d=>{d.shell=defaultShell('diamonds');}),/Оболочка недоступна/);
 assert.throws(()=>editProject(sleeve,d=>{d.printing={...bed,parts:2};}),/Оболочка недоступна/);
 const legacy={...split,shell:defaultShell('diamonds')},restored=parseProject(JSON.stringify(legacy));
 assert.deepEqual(restored,legacy);
 assert.ok(!editProject(restored,d=>{delete d.shell;}).shell);
 assert.ok(!editProject(restored,d=>{delete d.printing;}).printing);
});
