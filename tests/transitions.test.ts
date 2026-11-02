import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,resolveWalls,type TransitionStyle} from '../src/model.js';
import {defaultShell,shellLayout,topAt,wallOutline} from '../src/shell.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {parseProject,editProject,splitCell} from '../src/editor.js';
import {decodeSTL} from '../src/stl.js';

test('wavy transitions preserve endpoints and stay monotonic in either direction',()=>{
  for(const [a,b] of [[12,83],[83,12],[30,30],[2.4,1000]]){
    const p=defaultProject();p.heights={front:a,back:b};p.transitions=['left','right'];p.transitionStyles={left:'wavy'};
    const w=resolveWalls(p).find(w=>w.id==='left')!;
    assert.equal(topAt(w,0),a);assert.equal(topAt(w,w.length),b);
    let previous=a;
    for(let i=0;i<=1000;i++){const h=topAt(w,i*w.length/1000);assert.ok(h>=Math.min(a,b)-1e-8&&h<=Math.max(a,b)+1e-8);assert.ok((h-previous)*(b-a)>=-1e-8);previous=h;}
    const outline=wallOutline(w);for(const [x,y] of outline.slice(2))assert.ok(Math.abs(y-topAt(w,x))<1e-8);
    if(a!==b)assert.notEqual(topAt(w,w.cap+(w.length-2*w.cap)/4),a+(b-a)/4);
  }
});
test('old projects stay straight; style is validated and survives round-trip',async()=>{
  const p=defaultProject();p.heights.back=65;p.transitions=['left','right'];
  const old=await buildOrganizer(p);
  p.transitionStyles={left:'straight',right:'straight'};assert.deepEqual((await buildOrganizer(p)).inspection,old.inspection);
  p.transitionStyles.left='wavy';assert.deepEqual(parseProject(JSON.stringify(p)),p);
  assert.throws(()=>editProject(p,d=>{d.transitionStyles!.left='bad' as TransitionStyle;}));
  assert.throws(()=>parseProject(JSON.stringify({...p,transitionStyles:{front:'wavy',unknown:'straight'}})));
  assert.throws(()=>parseProject(JSON.stringify({...p,transitionStyles:null})));
  assert.throws(()=>editProject(p,d=>{d.transitions.push('front');}));
});
for(const radius of [0,12])for(const pattern of ['honeycomb','diamonds','waves'] as const)test(`wavy STL and matching sleeve: ${pattern}, radius ${radius}`,async()=>{
  let p=defaultProject();p.width=127.3;p.depth=89.1;p.cornerRadius=radius;p.heights={front:12,back:83};p.transitions=['left','right'];p.transitionStyles={left:'wavy',right:'wavy'};p.shell=defaultShell(pattern);p.shell.gap=.2;
  p=splitCell(p,'root','x');
  const layout=shellLayout(p),walls=resolveWalls(p),offset=p.shell!.gap+p.shell!.thickness;
  for(const panel of layout.panels){
    const original=walls.find(w=>w.id===panel.id)!;
    for(let i=0;i<=100;i++){const x=original.length*i/100;assert.ok(Math.abs(topAt(original,x)-topAt(panel,x+offset))<1e-8);}
    for(const hole of panel.holes)for(let i=0;i<hole.length;i++){
      const a=hole[i],b=hole[(i+1)%hole.length];
      for(let j=0;j<=10;j++){const x=a[0]+(b[0]-a[0])*j/10,y=a[1]+(b[1]-a[1])*j/10;assert.ok(y<=topAt(panel,x)-layout.border+1e-8);}
    }
  }
  const organizer=await buildOrganizer(p),shell=await buildShell(p);
  assert.equal(organizer.inspection.bounds.max[2],83);assert.ok(Math.abs(shell.inspection.bounds.max[2]+shell.position[2]-83)<.001);
  assert.ok(organizer.inspection.volume>0&&shell.inspection.volume>0);
  const wasm=await Module();wasm.setup();const owned:{delete():void}[]=[];
  const from=(stl:ArrayBuffer)=>{const triangles=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(Array.from({length:triangles.length*3},(_,i)=>i))});mesh.merge();const solid=new wasm.Manifold(mesh);owned.push(solid);return solid;};
  try{const a=from(organizer.stl),b=from(shell.stl);for(const z of [0,10,90]){const moved=b.translate([shell.position[0],shell.position[1],shell.position[2]+z]);owned.push(moved);const overlap=a.intersect(moved);owned.push(overlap);assert.ok(overlap.volume()<1e-6);}}
  finally{for(const item of owned.reverse())item.delete();}
});
