import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildOrganizer} from '../src/kernel.js';
import {defaultProject,resolveWalls,type Cell} from '../src/model.js';
import {decodeSTL,inspectSurface} from '../src/stl.js';
const close=(a:number,b:number)=>assert.ok(Math.abs(a-b)<Math.max(0.01,b*1e-5),`${a} != ${b}`);
test('empty organizer: analytic material volume and external dimensions',async()=>{
  const p=defaultProject(),{inspection,stl}=await buildOrganizer(p);
  close(inspection.volume,100*100*2+(100*100-96*96)*28);
  assert.deepEqual(inspection.bounds,{min:[0,0,0],max:[100,100,30]});
  assert.equal(stl.byteLength,84+50*inspection.triangles);
});
test('split respects clear dimensions and analytic volume',async()=>{
  const p=defaultProject();p.root.split={axis:'x',ratio:.5,first:{id:'a'},second:{id:'b'}};
  const wall=resolveWalls(p).find(w=>w.id==='root')!;
  assert.equal(wall.x,49);
  const {inspection}=await buildOrganizer(p);
  close(inspection.volume,100*100*2+(100*100-96*96)*28+2*96*28);
});
test('nested T junctions and independent heights remain one closed surface',async()=>{
  const p=defaultProject();p.heights={front:12,back:70};
  p.root.split={axis:'x',ratio:.35,height:50,first:{id:'a',split:{axis:'y',ratio:.6,height:18,first:{id:'a1'},second:{id:'a2'}}},second:{id:'b'}};
  const result=await buildOrganizer(p);
  assert.equal(result.inspection.bounds.max[2],70);
});
test('straight side transition: analytic wedge volume, follows sources, restores ordinary height',async()=>{
  const p=defaultProject();p.heights={front:50,back:20};p.transitions=['left'];
  const {inspection}=await buildOrganizer(p);
  // Right wall rises 10 mm above the back at their 2x2 mm corner.
  close(inspection.volume,100*100*2+100*2*(50-2)+100*2*(20-2)+96*2*(35-2)+96*2*(30-2)+2*2*10);
  p.heights.front=60;
  assert.equal(resolveWalls(p).find(w=>w.id==='left')!.startHeight,60);
  await buildOrganizer(p);
  p.transitions=[];
  assert.equal(resolveWalls(p).find(w=>w.id==='left')!.startHeight,30);
});
test('both longitudinal and transverse transitions, equal and descending heights',async()=>{
  for(const side of ['front','back','left','right'] as const) {
    const p=defaultProject();p.transitions=[side];
    await buildOrganizer(p);
    p.heights={front:45,back:10,left:15,right:55};
    await buildOrganizer(p);
  }
});
test('rejects cycles, invalid sizes, duplicate identities, collapsed cells and unsupported units',()=>{
  let p=defaultProject();p.transitions=['front','left'];assert.throws(()=>resolveWalls(p),/Cyclic/);
  p=defaultProject();p.width=NaN;assert.throws(()=>resolveWalls(p),/width/);
  p=defaultProject();p.root.split={axis:'x',ratio:.5,first:{id:'a'},second:{id:'a'}};assert.throws(()=>resolveWalls(p),/duplicate/);
  p=defaultProject();p.root.split={axis:'x',ratio:.001,first:{id:'a'},second:{id:'b'}};assert.throws(()=>resolveWalls(p),/small/);
  p=defaultProject();(p as any).units='cm';assert.throws(()=>resolveWalls(p),/format/);
});
test('serialization preserves resolved geometry and export',async()=>{
  const p=defaultProject();p.transitions=['left'];p.heights.back=50;
  const a=await buildOrganizer(p),b=await buildOrganizer(JSON.parse(JSON.stringify(p)));
  assert.deepEqual(a.inspection,b.inspection);
});
test('independent STL reader rejects truncation, missing face and reversed face',async()=>{
  const {stl}=await buildOrganizer(defaultProject());
  assert.throws(()=>decodeSTL(stl.slice(0,-1)),/size/);
  const triangles=decodeSTL(stl);assert.throws(()=>inspectSurface(triangles.slice(1)),/edge/);
  const [a,b,c]=triangles[0];triangles[0]=[a,c,b];assert.throws(()=>inspectSurface(triangles),/edge/);
});
test('deterministic sweep across dimensions, fractional sizes, nested splits and slopes',async()=>{
  for(let i=0;i<20;i++) {
    const p=defaultProject();p.width=32+i*3.17;p.depth=42+i*2.31;p.wallThickness=.8+(i%4)*.4;
    p.floorThickness=.8+(i%3)*.3;p.height=12+i*.7;p.heights.back=25+i;p.transitions=['left','right'];
    let id=0;
    const tree=(depth:number):Cell=>({id:`c${id++}`,...(depth?{split:{axis:depth%2?'x' as const:'y' as const,ratio:.4+(i%3)*.1,first:tree(depth-1),second:tree(depth-1)}}:{})});
    p.root=tree(2);
    const {inspection}=await buildOrganizer(p);
    close(inspection.bounds.max[0],p.width);close(inspection.bounds.max[1],p.depth);
  }
});
