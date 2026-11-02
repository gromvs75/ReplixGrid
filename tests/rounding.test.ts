import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,resolveWalls} from '../src/model.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {defaultShell,shellLayout} from '../src/shell.js';
import {roundedContour,polygonArea,maxCornerRadius} from '../src/rounding.js';
import {decodeSTL} from '../src/stl.js';
import {parseProject,splitCell,editProject} from '../src/editor.js';
for(const radius of [.5,2,12,25])test(`radius ${radius}: floor and annulus volume match the shared polygon definition`,async()=>{
  const p=defaultProject();p.cornerRadius=radius;
  const a=polygonArea(roundedContour(100,100,radius)),b=polygonArea(roundedContour(96,96,Math.max(0,radius-2)));
  const {inspection}=await buildOrganizer(p);
  assert.ok(Math.abs(inspection.volume-(a*30-b*28))<.02);
  assert.deepEqual(inspection.bounds,{min:[0,0,0],max:[100,100,30]});
});
test('zero radius preserves previous export and old files import',async()=>{
  const p=defaultProject(),a=await buildOrganizer(p);p.cornerRadius=0;
  assert.deepEqual((await buildOrganizer(p)).inspection,a.inspection);
  delete p.cornerRadius;assert.equal(parseProject(JSON.stringify(p)).cornerRadius,undefined);
  p.cornerRadius=8;assert.equal(parseProject(JSON.stringify(p)).cornerRadius,8);
  assert.throws(()=>editProject(p,d=>{d.cornerRadius=-1;}));assert.throws(()=>editProject(p,d=>{d.cornerRadius=51;}));
  assert.equal(maxCornerRadius(60,100),30);
});
test('rounding retains sloped walls and clipped internal dividers across all three patterns',async()=>{
  for(const pattern of ['honeycomb','diamonds','waves'] as const){
    let p=defaultProject();p.width=127.3;p.depth=89.1;p.cornerRadius=15;p.heights={front:15,back:65};p.transitions=['left','right'];
    p=splitCell(p,'root','x');p=splitCell(p,p.root.split!.first.id,'y');p.shell=defaultShell(pattern);
    const a=await buildOrganizer(p),b=await buildShell(p);assert.equal(a.inspection.bounds.max[2],65);assert.ok(Math.abs(b.inspection.bounds.max[2]+b.position[2]-65)<.001);
    const layout=shellLayout(p);assert.equal(layout.innerRadius,15.5);assert.equal(layout.outerRadius,17.1);
    for(const wall of layout.panels)for(const hole of wall.holes)for(const [x] of hole){assert.ok(x>=layout.outerRadius+layout.border-1e-8);assert.ok(x<=wall.length-layout.outerRadius-layout.border+1e-8);}
  }
});
test('rounding cannot silently consume tiny corner compartments',()=>{
  let p=defaultProject();p=splitCell(p,'root','x');p.root.split!.ratio=2/94;
  p=splitCell(p,p.root.split!.first.id,'y');p.root.split!.first.split!.ratio=2/94;
  resolveWalls(p);assert.throws(()=>editProject(p,d=>{d.cornerRadius=25;}),/перекрывает/);
});
test('constant corner clearance and collision-free sleeve extraction',async()=>{
  const p=defaultProject();p.cornerRadius=18;p.shell=defaultShell('honeycomb');p.shell.gap=.2;p.heights.back=60;p.transitions=['left','right'];
  const outer=roundedContour(p.width,p.depth,18),inner=roundedContour(p.width+.4,p.depth+.4,18.2,-.2,-.2);
  for(let i=0;i<outer.length;i++){
    assert.ok(Math.abs(Math.hypot(inner[i][0]-outer[i][0],inner[i][1]-outer[i][1])-.2)<1e-8);
    // Distance between chord midpoints: tessellation error well under 0.001 mm.
    const j=(i+1)%outer.length;
    const gap=Math.hypot((inner[i][0]+inner[j][0]-outer[i][0]-outer[j][0])/2,(inner[i][1]+inner[j][1]-outer[i][1]-outer[j][1])/2);
    assert.ok(gap>=.1999&&gap<=.2001);
  }
  const wasm=await Module();wasm.setup();const owned:{delete():void}[]=[];
  const from=(buffer:ArrayBuffer)=>{const triangles=decodeSTL(buffer),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(Array.from({length:triangles.length*3},(_,i)=>i))});mesh.merge();const body=new wasm.Manifold(mesh);owned.push(body);return body;};
  try{const organizer=from((await buildOrganizer(p)).stl),built=await buildShell(p),shell=from(built.stl);
    for(const z of [0,10,70]){const placed=shell.translate([built.position[0],built.position[1],built.position[2]+z]);owned.push(placed);const collision=organizer.intersect(placed);owned.push(collision);assert.ok(collision.volume()<1e-6);}
  }finally{for(const item of owned.reverse())item.delete();}
});
