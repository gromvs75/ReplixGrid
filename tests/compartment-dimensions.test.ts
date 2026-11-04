import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,resolveWalls} from '../src/model.js';
import {regions,splitCell,parseProject} from '../src/editor.js';
import {dimensionControl,dimensionChanges,resizeCompartment,supportsDimensions} from '../src/compartmentDimensions.js';
import {useEditor} from '../src/store.js';
import {buildOrganizer} from '../src/kernel.js';
import {decodeSTL,type Triangle} from '../src/stl.js';
import {measureCell} from '../src/compartmentMeasure.js';
test('45 mm on either side and axis preserves thickness and outer dimensions',()=>{
 for(const axis of ['x','y'] as const)for(const first of [true,false]){
  const p=splitCell(defaultProject(),'root',axis),id=(first?p.root.split!.first:p.root.split!.second).id;
  const next=resizeCompartment(p,id,axis,45),r=regions(next).find(r=>r.cell.id===id)!;
  assert.ok(Math.abs((axis==='x'?r.width:r.depth)-45)<1e-9);
  assert.equal(next.width,100);assert.equal(next.depth,100);assert.equal(resolveWalls(next).at(-1)!.thickness,2);
  assert.equal(dimensionChanges(p,next).length,2);assert.equal(p.root.split!.ratio,.5);
  assert.deepEqual(parseProject(JSON.stringify(next)),next);
 }
});
test('nearest matching ancestor moves a shared boundary and protects nested neighbors',()=>{
 let p=splitCell(defaultProject(),'root','x');const left=p.root.split!.first.id,right=p.root.split!.second.id;
 p=splitCell(p,left,'y');p=splitCell(p,right,'x',3);
 const id=p.root.split!.first.split!.second.id,c=dimensionControl(p,id,'x')!;
 assert.equal(c.dividerId,'root');assert.ok(c.max<84&&c.max>83);
 const next=resizeCompartment(p,id,'x',45);assert.equal(dimensionChanges(p,next).length,5);
 assert.throws(()=>resizeCompartment(p,id,'x',85));assert.throws(()=>resizeCompartment(p,id,'x',NaN));
 resolveWalls(resizeCompartment(p,id,'x',83));
 assert.equal(dimensionControl(p,id,'y')!.dividerId,left);
});
test('unsupported shapes and unsplit axes cannot be edited',()=>{
 const p=defaultProject();assert.equal(dimensionControl(p,'root','x'),null);
 for(const change of [{footprint:'oval' as const},{tilt:10}])assert.equal(supportsDimensions({...p,...change}),false);
});
test('both displayed endpoints remain valid for first and second nested branches',()=>{
 const p=splitCell(defaultProject(),'root','x',4);
 for(const r of regions(p).filter(r=>!r.cell.split)){
  const c=dimensionControl(p,r.cell.id,'x')!;
  for(const value of [c.min,c.max]){
   const next=resizeCompartment(p,r.cell.id,'x',value);resolveWalls(next);
   assert.ok(Math.abs(regions(next).find(v=>v.cell.id===r.cell.id)!.width-value)<1e-6);
  }
 }
});
test('one committed size is one undo/redo operation',()=>{
 const p=splitCell(defaultProject(),'root','x'),id=p.root.split!.first.id;
 useEditor.setState({project:p,past:[],future:[],gesture:null});
 useEditor.getState().change(p=>resizeCompartment(p,id,'x',45));const next=useEditor.getState().project;
 assert.equal(useEditor.getState().past.length,1);useEditor.getState().undo();assert.deepEqual(useEditor.getState().project,p);
 useEditor.getState().redo();assert.deepEqual(useEditor.getState().project,next);
});
test('exported STL contains the same inner faces as the 45 mm measurement',async()=>{
 const p=splitCell(defaultProject(),'root','x'),next=resizeCompartment(p,p.root.split!.first.id,'x',45);
 const built=await buildOrganizer(parseProject(JSON.stringify(next))),mesh=decodeSTL(built.stl);
 assert.ok(built.inspection.volume>0);
 // Vertical wall faces must occur at x=2 (outer inner face), 47 and 49 (divider faces).
 const xs=mesh.flat().map(v=>v[0]);
 for(const x of [2,47,49])assert.ok(xs.some(v=>Math.abs(v-x)<1e-5),String(x));
});

function rayHits(triangles:Triangle[],axis:'x'|'y',coord:number,z:number){
 const along=axis==='x'?0:1,across=1-along;
 return triangles.flatMap(([a,b,c])=>{
  const u=[b[across]-a[across],b[2]-a[2]],v=[c[across]-a[across],c[2]-a[2]],q=[coord-a[across],z-a[2]];
  const det=u[0]*v[1]-u[1]*v[0];if(Math.abs(det)<1e-10)return [];
  const s=(q[0]*v[1]-q[1]*v[0])/det,t=(u[0]*q[1]-u[1]*q[0])/det;
  return s>=-1e-7&&t>=-1e-7&&s+t<=1+1e-7?[a[along]+s*(b[along]-a[along])+t*(c[along]-a[along])]:[];
 });
}
for(const inner of [0,5])for(const axis of ['x','y'] as const)test(`rounded corners retain radii and export measured 30 mm: ${axis}, inner ${inner}`,async()=>{
 let p=defaultProject();p.cornerRadius=30;p.innerCornerRadius=inner;
 p=splitCell(p,'root',axis==='x'?'y':'x');p.root.split!.ratio=.12;
 const row=p.root.split!.first.id;p=splitCell(p,row,axis);
 const id=regions(p).find(r=>!r.cell.split)!.cell.id;
 assert.equal(supportsDimensions(p),true);
 const next=resizeCompartment(p,id,axis,30),m=measureCell(next,id,axis)!;
 assert.ok(Math.abs(m.value-30)<1e-6);assert.equal(next.cornerRadius,30);assert.equal(next.innerCornerRadius,inner);
 assert.deepEqual(parseProject(JSON.stringify(next)),next);
 const built=await buildOrganizer(next),hits=rayHits(decodeSTL(built.stl),axis,m.coord,next.floorThickness+.2);
 for(const endpoint of [m.start,m.end])assert.ok(hits.some(v=>Math.abs(v-endpoint)<.0001),JSON.stringify({endpoint,hits}));
});
test('large inner fillets preserve the small overlap used in export',async()=>{
 let p=defaultProject();p.innerCornerRadius=30;p=splitCell(p,'root','x',3);p=splitCell(p,p.root.split!.first.id,'y');
 const id=regions(p).find(r=>!r.cell.split)!.cell.id,next=resizeCompartment(p,id,'y',40),m=measureCell(next,id,'y')!;
 assert.ok(Math.abs(m.value-40)<1e-6);assert.equal(next.innerCornerRadius,30);
 const {stl}=await buildOrganizer(next),hits=rayHits(decodeSTL(stl),'y',m.coord,next.floorThickness+.2);
 for(const endpoint of [m.start,m.end])assert.ok(hits.some(v=>Math.abs(v-endpoint)<.0001),JSON.stringify({endpoint,hits}));
});
test('rounded resize is one reversible operation and does not mutate the original',()=>{
 let p=defaultProject();p.cornerRadius=12;p.innerCornerRadius=4;p=splitCell(p,'root','x',3);const id=regions(p).find(r=>!r.cell.split)!.cell.id;
 useEditor.setState({project:p,past:[],future:[],gesture:null});useEditor.getState().change(p=>resizeCompartment(p,id,'x',25));
 const next=useEditor.getState().project;assert.equal(useEditor.getState().past.length,1);
 useEditor.getState().undo();assert.deepEqual(useEditor.getState().project,p);useEditor.getState().redo();assert.deepEqual(useEditor.getState().project,next);
});
