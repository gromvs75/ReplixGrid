import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,resolveWalls} from '../src/model.js';
import {setLevelCount,switchLevel,levelProject} from '../src/accessories.js';
import {buildKit} from '../src/accessoryKernel.js';
import {inspectPrintParts} from '../src/preflight.js';
import {splitCell,regions,parseProject} from '../src/editor.js';
test('stack: independent levels, connected printable collar, flat bottoms',async()=>{
 let p=setLevelCount({...defaultProject(),cornerRadius:8},3);p.height=40;p=splitCell(p,p.root.id,'x',2);p=switchLevel(p,1);assert.equal(p.height,30);assert.equal(p.root.split,undefined);p.height=25;p=switchLevel(p,0);assert.equal(p.height,40);assert.ok(p.root.split);p.lid=true;
 const kit=await buildKit(p);assert.equal(kit.length,4);assert.deepEqual(kit.filter(p=>p.kind==='organizer').map(p=>p.position[2]),[0,40,65]);assert.ok(kit.every(p=>p.inspection.bounds.min[2]===0));assert.ok(inspectPrintParts(p,kit).ok);
});
test('stack refuses waves, tilt, shell and protruding dividers',()=>{
 const p=defaultProject();assert.throws(()=>setLevelCount({...p,tilt:10},2));assert.throws(()=>setLevelCount({...p,shell:{pattern:'waves',gap:.5,thickness:1.6,size:12}},2));assert.throws(()=>setLevelCount({...p,wallProfiles:{left:{start:30,end:30,style:'wavy',wavelength:20}}},2));let q=splitCell(p,'root','x',2);q.root.split!.height=60;assert.throws(()=>setLevelCount(q,2));
});
test('lid adapts to shell envelope; cups support four shapes and validate missing cells',async()=>{
 const p={...defaultProject(),cornerRadius:6,lid:true,shell:{pattern:'diamonds' as const,gap:.5,thickness:1.6,size:12}};const kit=await buildKit(p);assert.equal(kit.length,3);const lid=kit.find(p=>p.kind==='lid')!;assert.ok(lid.inspection.bounds.max[0]>104);assert.equal(lid.inspection.bounds.max[2],4);
 for(const shape of ['rounded','circle','oval','hexagon'] as const){const q=splitCell(defaultProject(),'root','x',2);q.cups=[{cellId:regions(q).find(r=>!r.cell.split)!.cell.id,shape,height:20}];const parts=await buildKit(q);assert.equal(parts.length,2);assert.ok(parts[1].inspection.bounds.max[0]<48);assert.equal(parts[1].position[2],q.floorThickness);}
 await assert.rejects(buildKit({...defaultProject(),cups:[{cellId:'missing',shape:'circle',height:20}]}));
});
test('preflight actual geometry including collar, rotated bed fit and invalid config',async()=>{
 const p=setLevelCount({...defaultProject(),width:100,depth:60},2);const parts=await buildKit(p);const small={...p,printArea:{bedWidth:104,bedDepth:64,bedHeight:270}};assert.equal(inspectPrintParts(small,parts).ok,false);const rotated=inspectPrintParts({...p,printArea:{bedWidth:80,bedDepth:120,bedHeight:270}},parts);assert.ok(rotated.ok);assert.ok(rotated.rows[0].rotate);
 assert.throws(()=>resolveWalls({...p,stack:{...p.stack!,active:9}}));
});
test('labels: Cyrillic, digits and icons are connected solids, engraving removes volume',async()=>{
 const {buildOrganizer}=await import('../src/kernel.js');const base=await buildOrganizer(defaultProject());
 const raised=await buildOrganizer({...defaultProject(),label:{text:'Кабели 2',icon:'♥',mode:'raised'}});assert.ok(raised.inspection.volume>base.inspection.volume);assert.ok(raised.inspection.bounds.min[0]<0);
 const cut=await buildOrganizer({...defaultProject(),label:{text:'БИТЫ',icon:'★',mode:'engraved'}});assert.ok(cut.inspection.volume<base.inspection.volume);assert.equal(cut.inspection.bounds.min[0],0);
 assert.throws(()=>resolveWalls({...defaultProject(),label:{text:'🙂',icon:'',mode:'raised'}}));
});
test('assembled tiers and seated lid have no material intersections',async()=>{
 const Module=(await import('manifold-3d')).default;const wasm=await Module();wasm.setup();const {decodeSTL}=await import('../src/stl.js');
 for(const shape of ['round','chamfer','circle'] as const){const p=setLevelCount({...defaultProject(),cornerRadius:shape==='circle'?0:12,cornerStyle:shape==='chamfer'?'chamfer':'round',footprint:shape==='circle'?'circle':undefined},2);p.lid=true;const parts=await buildKit(p),owned:import('manifold-3d').Manifold[]=[];const keep=(m:import('manifold-3d').Manifold)=>{owned.push(m);return m;};try{
 const bodies=parts.map(part=>{const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();let m=keep(new wasm.Manifold(mesh));if(part.kind==='lid'){m=keep(m.rotate([180,0,0]));m=keep(m.translate([0,part.inspection.bounds.max[1],-.5]));}return keep(m.translate(part.position));});
 for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++)assert.ok(Math.abs(keep(bodies[i].intersect(bodies[j])).volume())<.001,`${shape} ${i}/${j}`);
 }finally{owned.reverse().forEach(m=>m.delete());}}
});
test('cup stays outside organizer material in curved and hex cells',async()=>{
 const Module=(await import('manifold-3d')).default;const wasm=await Module();wasm.setup();const {decodeSTL}=await import('../src/stl.js');
 for(const footprint of ['circle','oval','honeycomb'] as const){const p={...defaultProject(),footprint,innerCornerRadius:2};const cellId=regions(p).find(r=>!r.cell.split)!.cell.id;const parts=await buildKit({...p,cups:[{cellId,shape:'hexagon',height:20}]});const owned:import('manifold-3d').Manifold[]=[];try{const bodies=parts.map(part=>{const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const m=new wasm.Manifold(mesh),b=m.translate(part.position);owned.push(m,b);return b;});const overlap=bodies[0].intersect(bodies[1]);owned.push(overlap);assert.ok(Math.abs(overlap.volume())<.001,footprint);}finally{owned.reverse().forEach(m=>m.delete());}}
});
test('fitted insert follows stretched honeycomb and real filleted cavity with uniform clearance',async()=>{
 const Module=(await import('manifold-3d')).default;const wasm=await Module();wasm.setup();const {decodeSTL}=await import('../src/stl.js');
 for(const variant of ['hexagon','fitted','chamfer'] as const){
  const p={...defaultProject(),width:180,depth:110,footprint:variant==='chamfer'?undefined:'honeycomb' as const,cornerStyle:'chamfer' as const,cornerRadius:variant==='chamfer'?20:0,innerCornerRadius:3,honeycombHeights:variant==='chamfer'?undefined:[30,85,60,30,30,30,30]};
  const cellId=variant==='chamfer'?'root':'honey-2';const parts=await buildKit({...p,cups:[{cellId,shape:variant==='hexagon'?'hexagon':'fitted',height:24}]});
  const owned: {delete:()=>void}[]=[];const keep=<T extends {delete:()=>void}>(x:T):T=>{owned.push(x);return x;};
  try{const bodies=parts.map(part=>{const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();return keep(keep(new wasm.Manifold(mesh)).translate(part.position));});
   assert.ok(Math.abs(keep(bodies[0].intersect(bodies[1])).volume())<.001);
   const {regions}=await import('../src/editor.js');const {honeyCells,footprintContour}=await import('../src/footprint.js');const r=regions(p).find(r=>r.cell.id===cellId)!;
   const boundary=variant==='chamfer'?footprintContour(p):honeyCells(p)[2];
   const free=keep(keep(new wasm.CrossSection([boundary])).subtract(keep(bodies[0].slice(p.floorThickness+.05))));
   const expected=keep(free.offset(-.5,'Miter',5));
   // At the insert floor, the entire outer cross-section is solid.
   const actual=keep(bodies[1].slice(p.floorThickness+.5));
   assert.ok(Math.abs(keep(expected.subtract(actual)).area())<.02,`${variant}: cavity underfill`);
   assert.ok(Math.abs(keep(actual.subtract(expected)).area())<.02,`${variant}: cavity overflow`);
  }finally{owned.reverse().forEach(x=>x.delete());}
 }
});
test('individual insert colors survive project round trip and reach 3MF/OBJ exports',async()=>{
 const {formatExport}=await import('../src/exportFormats.js');
 const p=splitCell(defaultProject(),'root','x',2),leaves=regions(p).filter(r=>!r.cell.split);
 p.cups=leaves.map((r,i)=>({cellId:r.cell.id,shape:'fitted',height:20,color:i?'#096bd8':'#f8c52c'}));
 const restored=JSON.parse(JSON.stringify(p));resolveWalls(restored);
 const parts=await buildKit(restored),cups=parts.filter(p=>p.kind==='cup');
 assert.deepEqual(cups.map(p=>p.color),['#f8c52c','#096bd8']);assert.deepEqual(cups.map(p=>p.cellId),p.cups.map(c=>c.cellId));
 const xml=new TextDecoder().decode(formatExport(parts,'3mf').data);assert.ok(xml.includes('#F8C52CFF')&&xml.includes('#096BD8FF'));
 const obj=new TextDecoder().decode(formatExport(parts,'obj').data);assert.ok(obj.includes('Kd '+[248,197,44].map(n=>n/255).join(' ')));assert.ok(obj.includes('Kd '+[9,107,216].map(n=>n/255).join(' ')));
 assert.throws(()=>resolveWalls({...p,cups:[{...p.cups![0],color:'red'}]}));
});
test('front cutout tiers preserve cutouts and keep the collar opening clear',async()=>{
 let p=defaultProject();p.cornerRadius=6;p.cutouts={left:{shape:'round',width:.4,depth:14,position:.5}};
 p=setLevelCount(p,2);p=switchLevel(p,1);assert.deepEqual(p.cutouts,p.stack!.levels[0].cutouts);p=switchLevel(p,0);assert.ok(p.cutouts?.left);
 const kit=await buildKit(p);assert.equal(kit.length,2);
 const Module=(await import('manifold-3d')).default,wasm=await Module();wasm.setup();const {decodeSTL}=await import('../src/stl.js');const owned:import('manifold-3d').Manifold[]=[];
 try{
  const bodies=kit.map(part=>{const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),m=raw.translate(part.position);owned.push(raw,m);return m;});
  const overlap=bodies[0].intersect(bodies[1]);owned.push(overlap);assert.ok(Math.abs(overlap.volume())<.001);
  const probe=wasm.Manifold.cube([5,10,4]).translate([-2,p.depth/2-5,p.height-1]),blocked=bodies[0].intersect(probe);owned.push(probe,blocked);assert.ok(Math.abs(blocked.volume())<.001,'collar must not bridge the cutout');
 }finally{owned.reverse().forEach(m=>m.delete());}
 assert.doesNotThrow(()=>setLevelCount({...defaultProject(),cutouts:{right:{shape:'round',width:.4,depth:10,position:.5}}},2));
 assert.throws(()=>setLevelCount({...defaultProject(),cornerRadius:12,cutouts:{left:{shape:'round',width:.8,depth:10,position:0}}},2));
});
test('grid insert with front cutout exports closed geometry',async()=>{
 const p=defaultProject();p.cutouts={left:{shape:'round',width:.4,depth:12,position:.5}};p.cups=[{cellId:'root',shape:'fitted',height:20,content:'grid',rows:2,columns:2}];
 const parts=await buildKit(p);assert.equal(parts.length,2);assert.ok(parts[1].inspection.volume>0);
 const {decodeSTL}=await import('../src/stl.js');const insert=parts[1];
 const tops=decodeSTL(insert.stl).flat().map(v=>v.map((n,k)=>n+insert.position[k])).filter(v=>v[0]>p.width*.25&&v[0]<p.width*.75&&v[1]>p.depth*.25&&v[1]<p.depth*.75&&v[2]>p.height*.6);
 assert.ok(tops.length>0);assert.ok(tops.every(v=>Math.abs(v[2]-(p.height-1))<.001),'internal ribs must remain level despite the front cutout');
});
test('actual flat organizer: remote notch cannot bend insert rims; tiers retain inserts',async()=>{
 const {readFileSync}=await import('node:fs');
 const {insertHeightAt}=await import('../src/accessories.js');
 const p=parseProject(readFileSync(new URL('./fixtures/flat-inserts-panels.json',import.meta.url),'utf8'));
 const walls=resolveWalls(p);
 for(const [index,c] of p.cups!.entries()){
  const r=regions(p).find(r=>r.cell.id===c.cellId)!;
  // The middle insert is bounded by two 35 mm partitions, the end insert
  // follows the 36 mm outer rim. Neither should follow the remote cutout.
  const expected=index===0?33:32;
  for(const fx of [.1,.3,.5,.7,.9])for(const fy of [.1,.3,.5,.7,.9])assert.ok(Math.abs(insertHeightAt(p,c.cellId,r.x+r.width*fx,r.y+r.depth*fy,walls)-expected)<1e-8);
 }
 const stacked=setLevelCount(p,2);resolveWalls(stacked);
 assert.equal(stacked.shell!.margin,3);
 const switched=switchLevel(stacked,1);assert.equal(switched.cups,undefined);
 const parts=await buildKit(stacked);
 assert.equal(parts.filter(x=>x.kind==='cup').length,2);
 assert.ok(parts.every(x=>x.inspection.volume>0));
 const {decodeSTL}=await import('../src/stl.js');
 for(const part of parts.filter(x=>x.kind==='cup'&&x.name.includes('small-items'))){
  const zs=decodeSTL(part.stl).flat().map(v=>v[2]+part.position[2]).filter(z=>z>part.level*36+10);
  // The outer rim is 36 mm high and the adjacent partition is 35 mm.
  // The end insert therefore transitions between the two, one mm below each.
  assert.ok(zs.every(z=>z>=part.level*36+34-.001&&z<=part.level*36+35+.001));
  assert.ok(zs.some(z=>Math.abs(z-(part.level*36+34))<.001));
  assert.ok(zs.some(z=>Math.abs(z-(part.level*36+35))<.001));
 }
});

test('actual stacked assembly: inserts and panels do not collide across tiers',async()=>{
 const {readFileSync}=await import('node:fs'),{decodeSTL}=await import('../src/stl.js');
 const p=setLevelCount(parseProject(readFileSync(new URL('./fixtures/flat-inserts-panels.json',import.meta.url),'utf8')),2);
 const parts=await buildKit(p),Module=(await import('manifold-3d')).default,wasm=await Module();wasm.setup();
 const owned:import('manifold-3d').Manifold[]=[];const keep=(m:import('manifold-3d').Manifold)=>{owned.push(m);return m;};
 try{
  const bodies=parts.map(part=>{const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();return keep(keep(new wasm.Manifold(mesh)).translate(part.position));});
  for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++)assert.ok(Math.abs(keep(bodies[i].intersect(bodies[j])).volume())<.001,parts[i].name+'/'+parts[j].name);
 }finally{owned.reverse().forEach(m=>m.delete());}
});

test('tiers own contents, profiles, panels and colors after switching and JSON roundtrip',()=>{
 const base=splitCell(defaultProject(),'root','x',2);
 base.cups=[{cellId:regions(base).find(r=>!r.cell.split)!.cell.id,shape:'fitted',height:20}];
 base.colors={organizer:'#123456'};
 let p=setLevelCount(base,2),first=structuredClone(levelProject(p,0));
 p=switchLevel(p,1);
 assert.equal(p.root.split,undefined);assert.equal(p.cups,undefined);
 p=splitCell(p,p.root.id,'y',3);
 p.height=45;p.colors={organizer:'#abcdef'};p.innerCornerRadius=3;
 p=switchLevel(p,0);
 assert.deepEqual(p.root,first.root);assert.deepEqual(p.cups,first.cups);
 assert.equal(p.colors!.organizer,'#123456');assert.equal(p.height,30);
 p=JSON.parse(JSON.stringify(p));p=switchLevel(p,1);
 assert.equal(p.height,45);assert.equal(p.root.split!.axis,'y');
 assert.equal(p.colors!.organizer,'#abcdef');assert.equal(p.innerCornerRadius,3);
 assert.equal(p.cups,undefined);
});
test('front label fits below cutout with side panels and remains local to its tier',async()=>{
 const {readFileSync}=await import('node:fs');
 const {labelProblem}=await import('../src/lettering.js');
 const p:import('../src/model.js').Project=parseProject(readFileSync('tests/fixtures/flat-inserts-panels.json','utf8'));
 p.cups=undefined;p.shell!.margin=4;
 p.label={text:'БИТЫ',icon:'',mode:'raised'};
 assert.equal(labelProblem(p),'');resolveWalls(p);
 assert.match(labelProblem({...p,shell:{...p.shell!,sides:['left']}}),/закрыта/);
 assert.match(labelProblem({...p,cutouts:{left:{shape:'square',width:.5,depth:30,position:.5}}}),/недостаточно/);
 for(const mode of ['raised','engraved'] as const){
  const labeled={...p,label:{...p.label,mode}};
  const kit=await buildKit(labeled);assert.ok(kit.length>1);assert.ok(kit.every(part=>part.inspection.volume>0));
 }
 let stacked=setLevelCount(p,2);stacked=switchLevel(stacked,1);delete stacked.label;
 stacked=switchLevel(stacked,0);assert.equal(stacked.label?.text,'БИТЫ');
 const kit=await buildKit(stacked);assert.equal(kit.filter(part=>part.kind==='organizer').length,2);
});
test('outline fonts preserve Cyrillic, size, depth and printable counters',async()=>{
 const {buildOrganizer}=await import('../src/kernel.js');const {labelLayout}=await import('../src/lettering.js');
 for(const font of ['sans','bold','serif'] as const){
  for(const mode of ['raised','engraved'] as const){
   const p={...defaultProject(),depth:140,label:{text:'Replix АБВ ё',icon:'' as const,font,size:10,depth:1,mode}};
   assert.ok(Math.abs(labelLayout(p).height-10)<.001);
   const result=await buildOrganizer(p);assert.ok(result.inspection.volume>0);
   if(mode==='raised')assert.ok(Math.abs(result.inspection.bounds.min[0]+1)<.001);
  }
 }
 assert.throws(()=>resolveWalls({...defaultProject(),label:{text:'LONG LABEL',icon:'',font:'sans',size:30,mode:'raised'}}),/не помещается/);
 assert.throws(()=>resolveWalls({...defaultProject(),label:{text:'Test',icon:'',font:'sans',depth:2,mode:'engraved'}}),/0,6/);
});
