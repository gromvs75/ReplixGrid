import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,resolveWalls} from '../src/model.js';
import {defaultShell} from '../src/shell.js';
import {buildKit} from '../src/accessoryKernel.js';
import {buildDecorativePanels} from '../src/decorativePanels.js';
import {decodeSTL} from '../src/stl.js';
import {parseProject} from '../src/editor.js';
import {inspectPrintParts} from '../src/preflight.js';
const example=()=>{const p=defaultProject();p.wallThickness=3.2;p.width=100;p.depth=70;p.height=45;p.cornerRadius=6;p.shell={...defaultShell('honeycomb'),mode:'panels' as const,margin:4,sides:['front','back','left','right'] as ('front'|'back'|'left'|'right')[],mounts:true};return p;};
test('four separate closed panels, hidden fasteners do not intersect assembled organizer',async()=>{
 const p=example();p.tilt=12;
 const parts=await buildKit(p);assert.equal(parts.length,5);assert.ok(inspectPrintParts(p,parts).ok);
 const wasm=await Module();wasm.setup();const owned:any[]=[];
 const solid=(b:typeof parts[number])=>{const t=decodeSTL(b.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh);owned.push(raw);const m=raw.translate(b.position);owned.push(m);return m;};
 try{const body=solid(parts[0]);for(const part of parts.slice(1)){const panel=solid(part),overlap=body.intersect(panel);owned.push(overlap);assert.ok(overlap.volume()<.001,`${part.name}: collision ${overlap.volume()}`);assert.equal(panel.status(),'NoError');}}
 finally{for(const m of owned.reverse())m.delete();}
 assert.deepEqual(parseProject(JSON.stringify(p)).shell,p.shell);
});
for(const pattern of ['honeycomb','diamonds','waves','petals'] as const)test(`${pattern}: thin panels follow sloped cutout with closed rim`,async()=>{
 const p=example();p.shell={...p.shell!,pattern,thickness:1,mounts:false,sides:['front']};p.heights.left=25;p.heights.right=60;p.transitions=['front'];p.transitionStyles={front:'wavy'};
 p.cutouts={front:{shape:'round',width:.45,depth:12,position:.5}};
 const parts=await buildDecorativePanels(p);assert.equal(parts.length,1);assert.ok(parts[0].inspection.volume>0);assert.ok(parts[0].position[2]>=3.99);
});
test('invalid panel selections and incompatible geometry are rejected',()=>{const p=example();p.shell!.sides=[];assert.throws(()=>resolveWalls(p));p.shell!.sides=['front'];p.footprint='oval';assert.throws(()=>resolveWalls(p));});
test('tier panels clear collars and neighbours and have four mounting points',async()=>{
 const {setLevelCount,switchLevel}=await import('../src/accessories.js');
 const {panelAnchors}=await import('../src/decorativePanels.js');
 let p=setLevelCount(example(),3);p.height=32;p=switchLevel(p,1);p.height=50;
 const parts=await buildKit(p);assert.equal(parts.length,15);
 const wasm=await Module();wasm.setup();const owned:import('manifold-3d').Manifold[]=[];
 assert.equal(panelAnchors(wasm,{...p,stack:undefined},'front').length,4);
 try{
  const bodies=parts.map(part=>{const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),placed=raw.translate(part.position);owned.push(raw,placed);return placed;});
  for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){const overlap=bodies[i].intersect(bodies[j]);owned.push(overlap);assert.ok(Math.abs(overlap.volume())<.001,`${parts[i].name} intersects ${parts[j].name}`);}
  assert.deepEqual([...new Set(parts.filter(p=>p.kind==='shell').map(p=>p.level))],[0,1,2]);
 }finally{owned.reverse().forEach(m=>m.delete());}
});
test('long panels distribute larger mounts at no more than 70 mm spacing',async()=>{
 const {panelAnchors,PANEL_MOUNT}=await import('../src/decorativePanels.js');
 const wasm=await Module();wasm.setup();
 const p=example();p.width=250;p.shell!.sides=['front'];p.wallThickness=3.2;
 const anchors=panelAnchors(wasm,p,'front');assert.equal(anchors.length,8);
 for(let i=2;i<anchors.length;i+=2)assert.ok(anchors[i][0]-anchors[i-2][0]<=70);
 assert.equal(PANEL_MOUNT.tooth,.2);assert.equal(PANEL_MOUNT.gap,.6);
 assert.equal(PANEL_MOUNT.socketDepth,2.2);
 const parts=await buildKit(p);assert.equal(parts.length,2);assert.ok(inspectPrintParts(p,parts).ok);
 const owned:any[]=[];
 const bodies=parts.map(part=>{const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),placed=raw.translate(part.position);owned.push(raw,placed);return placed;});
 try{const overlap=bodies[0].intersect(bodies[1]);owned.push(overlap);assert.ok(overlap.volume()<.001);
 // Pulling the seated panel outward must engage the retaining shoulders.
 const pulled=bodies[1].translate([0,-.4,0]);owned.push(pulled);const retention=bodies[0].intersect(pulled);owned.push(retention);assert.ok(retention.volume()>.1);
 // Socket cavity is blind: its deepest point is 2.2 mm in a 3.2 mm wall.
 const probe=wasm.Manifold.cube([240,.45,30]).translate([5,2.25,5]);owned.push(probe);const missing=probe.subtract(bodies[0]);owned.push(missing);assert.ok(missing.volume()<.001);
 }finally{owned.reverse().forEach(m=>m.delete());}
});
test('mounts preserve the same perforation mask and rim as an unmounted panel',async()=>{
 const {panelAnchors,panelBorder,panelProfile,PANEL_MOUNT}=await import('../src/decorativePanels.js');
 const wasm=await Module();wasm.setup();
 const p=example();p.width=270;p.depth=270;
 const plain=structuredClone(p);plain.shell!.mounts=false;
 assert.equal(panelBorder(p),4);assert.equal(panelBorder(p),panelBorder(plain));
 for(const side of p.shell!.sides!){
  const anchors=panelAnchors(wasm,p,side);assert.equal(anchors.length,10);
  for(let i=2;i<anchors.length;i+=2)assert.ok(anchors[i][0]-anchors[i-2][0]<=PANEL_MOUNT.maxSpacing);
  const owned:import('manifold-3d').CrossSection[]=[],keep=(s:import('manifold-3d').CrossSection)=>{owned.push(s);return s;};
  try{
   const {shape}=panelProfile(wasm,p,side,keep),mask=keep(shape.offset(-panelBorder(p),'Round',2,32));
   for(const [x,y] of anchors){
    const foot=keep(new wasm.CrossSection([[[x-2.4,y-2],[x+2.4,y-2],[x+2.4,y+2],[x-2.4,y+2]]]));
    assert.ok(keep(foot.subtract(shape)).area()<.001);
    assert.ok(keep(foot.intersect(mask)).area()<.001,'foot must not obstruct the pattern');
   }
  }finally{owned.reverse().forEach(s=>s.delete());}
 }
});
test('a sloping rim too narrow for the validated foot is rejected without widening it',async()=>{
 const {panelAnchors,panelBorder}=await import('../src/decorativePanels.js');
 const wasm=await Module();wasm.setup();const p=example();
 p.heights.left=25;p.heights.right=60;p.transitions=['front'];
 assert.equal(panelBorder(p),4);
 assert.throws(()=>panelAnchors(wasm,p,'front'),/не помещается в кант/);
});
for(const style of ['smooth','rings','steps'] as const)for(const mounts of [false,true])test(`${style} base band: ${mounts?'mounted':'2.4 mm glued'} tier panels preserve fit and printable exports`,async()=>{
 const {setLevelCount,switchLevel,levelProject}=await import('../src/accessories.js');
 const {regions,editProject}=await import('../src/editor.js');
 let p=example();p.wallThickness=mounts?3.2:2.4;p.floorThickness=2;p.baseBand={height:12,style};delete p.shell;
 p=setLevelCount(p,2);const before=regions(p);
 p=editProject(p,d=>{d.shell={...example().shell!,mounts,margin:3};});
 assert.deepEqual(regions(p),before);assert.equal(p.wallThickness,mounts?3.2:2.4);
 p=switchLevel(p,1);assert.equal(p.baseBand,undefined);
 p=editProject(p,d=>{d.shell={...example().shell!,mounts,margin:3};});
 assert.equal(levelProject(p,0).baseBand?.height,12);
 const parts=await buildKit(p);assert.equal(parts.length,10);assert.ok(inspectPrintParts(p,parts).ok);
 const wasm=await Module();wasm.setup();const owned:import('manifold-3d').Manifold[]=[];
 try{
  const bodies=parts.map(part=>{assert.ok(part.inspection.volume>0);const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),placed=raw.translate(part.position);owned.push(raw,placed);assert.equal(placed.status(),'NoError');return placed;});
  for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){const overlap=bodies[i].intersect(bodies[j]);owned.push(overlap);assert.ok(Math.abs(overlap.volume())<.001,`${parts[i].name} intersects ${parts[j].name}`);}
  for(const part of parts.filter(part=>part.kind==='shell'&&part.level===0))assert.ok(part.position[2]>=13.9,'panel and feet clear 12 mm band');
  for(const dz of [1,5,50])for(let i=0;i<bodies.length;i++)if(parts[i].level===1){const lifted=bodies[i].translate([0,0,dz]);owned.push(lifted);for(let j=0;j<bodies.length;j++)if(parts[j].level===0){const overlap=lifted.intersect(bodies[j]);owned.push(overlap);assert.ok(Math.abs(overlap.volume())<.001,`tier extracts freely at ${dz} mm: ${parts[i].name}/${parts[j].name}`);}}
 }finally{owned.reverse().forEach(m=>m.delete());}
});
