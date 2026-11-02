import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,type ShellSettings} from '../src/model.js';
import {defaultShell,shellLayout,topAt} from '../src/shell.js';
import {buildShell,buildOrganizer} from '../src/kernel.js';
import {parseProject,editProject} from '../src/editor.js';
import {decodeSTL} from '../src/stl.js';
for(const pattern of ['honeycomb','diamonds','waves'] as const){
  test(`${pattern}: actual perforated watertight STL with expected dimensions`,async()=>{
    const p=defaultProject();p.shell=defaultShell(pattern);const layout=shellLayout(p);
    assert.ok(layout.holes>0);
    const result=await buildShell(p);const {min,max}=result.inspection.bounds;
    assert.deepEqual(min,[0,0,0]);assert.ok(Math.abs(max[0]-104.2)<.001);assert.ok(Math.abs(max[1]-104.2)<.001);assert.ok(Math.abs(max[2]-28.8)<.001);assert.ok(Math.abs(result.position[2]-1.2)<.001);
    const solidRing=(layout.width*layout.depth-layout.innerWidth*layout.innerDepth)*30;
    assert.ok(result.inspection.volume<solidRing*.95);assert.ok(result.inspection.volume>solidRing*.2);
  });
}
test('slopes retain solid top/bottom frames; resizing recomputes fit without changing clearance',async()=>{
  const p=defaultProject();p.shell=defaultShell('waves');p.heights={front:15,back:65};p.transitions=['left','right'];
  p.width=160.3;p.depth=87.7;
  const layout=shellLayout(p);assert.equal(layout.innerWidth,p.width+1);assert.equal(layout.innerDepth,p.depth+1);
  for(const panel of layout.panels)for(const hole of panel.holes)for(const [x,y] of hole){assert.ok(x>=layout.border);assert.ok(y>=layout.border);assert.ok(y<=topAt(panel,x)-layout.border+1e-8);}
  const shell=await buildShell(p);assert.ok(Math.abs(shell.inspection.bounds.max[2]+shell.position[2]-65)<.001);
});
test('short walls stay solid rather than creating clipped holes',async()=>{
  const p=defaultProject();p.height=5;p.shell=defaultShell('honeycomb');assert.equal(shellLayout(p).holes,0);
  const {inspection}=await buildShell(p);const l=shellLayout(p);
  assert.ok(Math.abs(inspection.volume-(l.width*l.depth-l.innerWidth*l.innerDepth)*3.8)<.01);
});
test('settings survive JSON; malformed clearance and patterns are rejected',()=>{
  const p=defaultProject();p.shell=defaultShell('diamonds');assert.deepEqual(parseProject(JSON.stringify(p)),p);
  assert.throws(()=>editProject(p,d=>{d.shell!.gap=-1;}));
  assert.throws(()=>editProject(p,d=>{d.shell!.pattern='other' as ShellSettings['pattern'];}));
  assert.throws(()=>editProject(p,d=>{d.shell!.thickness=.1;}));
});
test('printed sleeve has no intersection with organizer, including along vertical extraction',async()=>{
  const p=defaultProject();p.shell=defaultShell('diamonds');p.heights.back=65;p.transitions=['left','right'];
  const wasm=await Module();wasm.setup();const owned:{delete():void}[]=[];
  const fromSTL=(stl:ArrayBuffer)=>{const tris=decodeSTL(stl);const mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(Array.from({length:tris.length*3},(_,i)=>i))});mesh.merge();const body=new wasm.Manifold(mesh);owned.push(body);return body;};
  try{
    const organizer=fromSTL((await buildOrganizer(p)).stl),built=await buildShell(p),shell=fromSTL(built.stl);
    for(const z of [0,15,70]){const aligned=shell.translate([built.position[0],built.position[1],built.position[2]+z]);owned.push(aligned);const overlap=organizer.intersect(aligned);owned.push(overlap);assert.ok(overlap.volume()<1e-6);}
  }finally{for(const o of owned.reverse())o.delete();}
});
