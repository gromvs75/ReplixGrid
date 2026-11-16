import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultGridfinity,parseGridfinity,validateGridfinity,gridfinitySize} from '../src/gridfinity.js';
import {buildGridfinity} from '../src/gridfinityKernel.js';
import {decodeSTL} from '../src/stl.js';
import {defaultProject} from '../src/model.js';
import {parseProject} from '../src/editor.js';

test('Gridfinity projects round-trip separately from ordinary projects',()=>{
  const p=defaultGridfinity();assert.deepEqual(parseGridfinity(JSON.stringify(p)),p);
  assert.throws(()=>parseGridfinity(JSON.stringify(defaultProject())));
  assert.throws(()=>parseProject(JSON.stringify(p)));
  assert.deepEqual(parseProject(JSON.stringify(defaultProject())),defaultProject());
  for(const patch of [{columns:0},{rows:1.5},{columns:9},{heightUnits:1},{clearance:NaN},{clearance:.3},{wall:0},{columns:1,wall:3,compartmentsX:8}])assert.throws(()=>validateGridfinity({...p,...patch}));
});
test('watertight tray and plate sizes for small, divided and maximum grids',async()=>{
  for(const p of [ {...defaultGridfinity(),columns:1,rows:1}, {...defaultGridfinity(),columns:3,rows:2,compartmentsX:3,compartmentsY:2,wall:3}, {...defaultGridfinity(),columns:8,rows:8,heightUnits:2} ]){
    for(const part of ['tray','plate'] as const){
      const result=await buildGridfinity(p,part),size=gridfinitySize(p,part);
      assert.ok(result.inspection.volume>0);
      size.forEach((value,i)=>assert.ok(Math.abs(result.inspection.bounds.max[i]-value)<1e-4));
      assert.deepEqual(result.inspection.bounds.min,[0,0,0]);
    }
  }
});
test('reference foot cross sections and virtual mating clearance',async()=>{
  const wasm=await Module();wasm.setup();const p={...defaultGridfinity(),columns:1,rows:1};
  const toSolid=(stl:ArrayBuffer)=>{const tri=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tri.flat(2)),triVerts:new Uint32Array(Array.from({length:tri.length*3},(_,i)=>i))});mesh.merge();return new wasm.Manifold(mesh);};
  const tray=toSolid((await buildGridfinity(p,'tray')).stl);
  try{
    for(const [height,width] of [[.4,36.4],[1.5,37.2],[3.6,39.2],[4.7,41.4]]){
      const slice=tray.slice(height);try{const points=slice.toPolygons().flat();const xs=points.map(v=>v[0]);assert.ok(Math.abs(Math.max(...xs)-Math.min(...xs)-width)<.003);}finally{slice.delete();}
    }
    for(const clearance of [.1,.15,.2]){
      const plate=toSolid((await buildGridfinity({...p,clearance},'plate')).stl),placed=tray.translate([.25,.25,1.2]),collision=plate.intersect(placed);
      try{assert.ok(collision.volume()<.001);}finally{collision.delete();placed.delete();plate.delete();}
    }
  }finally{tray.delete();}
});

test('legacy radius defaults preserve geometry and reject invalid radii',async()=>{
  const {outerRadius,innerRadius,...legacy}=defaultGridfinity();
  assert.deepEqual(parseGridfinity(JSON.stringify(legacy)),legacy);
  assert.deepEqual((await buildGridfinity(legacy,'tray')).stl,(await buildGridfinity(defaultGridfinity(),'tray')).stl);
  for(const patch of [{outerRadius:-1},{outerRadius:3.76},{outerRadius:NaN},{innerRadius:-1},{innerRadius:21},{innerRadius:Infinity}])assert.throws(()=>validateGridfinity({...legacy,...patch}));
});

test('independent radii change tray volume while preserving plate and foot profiles',async()=>{
  const p={...defaultGridfinity(),columns:1,rows:1,compartmentsX:2,compartmentsY:2};
  const base=await buildGridfinity(p,'tray');
  const rounded=await buildGridfinity({...p,innerRadius:5},'tray');
  const square=await buildGridfinity({...p,outerRadius:0},'tray');
  assert.ok(rounded.inspection.volume>base.inspection.volume+10);
  assert.ok(square.inspection.volume>base.inspection.volume);
  const belowFeet=(stl:ArrayBuffer)=>decodeSTL(stl).filter(t=>t.every(v=>v[2]<4.74)).map(t=>t.flat().join(',')).sort();
  assert.deepEqual(belowFeet(rounded.stl),belowFeet(base.stl));
  assert.deepEqual(belowFeet(square.stl),belowFeet(base.stl));
  assert.deepEqual((await buildGridfinity({...p,outerRadius:0,innerRadius:20},'plate')).stl,(await buildGridfinity(p,'plate')).stl);
});

test('large inner radius is limited to the compartment size without breaking the mesh',async()=>{
  const p={...defaultGridfinity(),columns:1,rows:1,compartmentsX:4,compartmentsY:4,innerRadius:20};
  const result=await buildGridfinity(p,'tray');
  assert.ok(result.inspection.volume>0);
  assert.deepEqual(result.inspection.bounds.min,[0,0,0]);
  gridfinitySize(p,'tray').forEach((v,i)=>assert.ok(Math.abs(result.inspection.bounds.max[i]-v)<1e-4));
});

test('legacy grids become editable trees without changing cavity positions',async()=>{
  const {gridfinityEditorProject,gridfinityRegions}=await import('../src/gridfinity.js');
  for(const [compartmentsX,compartmentsY] of [[1,1],[3,2],[8,8]]){
    const p={...defaultGridfinity(),columns:4,rows:4,compartmentsX,compartmentsY};
    const leaves=gridfinityRegions(p).filter(r=>!r.cell.split);
    assert.equal(leaves.length,compartmentsX*compartmentsY);
    const width=(167.5-(compartmentsX+1)*p.wall)/compartmentsX,depth=(167.5-(compartmentsY+1)*p.wall)/compartmentsY;
    leaves.forEach(r=>{assert.ok(Math.abs(r.width-width)<1e-10);assert.ok(Math.abs(r.depth-depth)<1e-10);});
    const converted={...p,root:gridfinityEditorProject(p).root};
    assert.deepEqual(parseGridfinity(JSON.stringify(converted)),converted);
  }
});

test('nested compartments split, move independently, resize exactly, and export a connected solid',async()=>{
  const {gridfinityEditorProject,gridfinityRegions}=await import('../src/gridfinity.js');
  const {splitCell,moveDivider,regions}=await import('../src/editor.js');
  const {resizeCompartment}=await import('../src/compartmentDimensions.js');
  const initial=defaultGridfinity();
  let e=splitCell(gridfinityEditorProject(initial),'root','x');
  const first=e.root.split!.first.id;
  e=splitCell(e,first,'y');
  e=moveDivider(e,first,.35);
  e=resizeCompartment(e,e.root.split!.second.id,'x',25);
  const p={...initial,root:e.root,innerRadius:3};validateGridfinity(p);
  assert.equal(gridfinityRegions(p).filter(r=>!r.cell.split).length,3);
  assert.ok(Math.abs(regions(e).find(r=>r.cell.id===e.root.split!.second.id)!.width-25)<1e-5);
  const result=await buildGridfinity(p,'tray');assert.ok(result.inspection.volume>0);
  assert.deepEqual(result.inspection.bounds.min,[0,0,0]);
  assert.throws(()=>validateGridfinity({...p,root:{id:'root',split:{axis:'x',ratio:0,first:{id:'a'},second:{id:'b'}}}}));
  assert.throws(()=>validateGridfinity({...p,root:{id:'root',split:{axis:'x',ratio:.5,first:{id:'a'},second:{id:'a'}}}}));
});

test('tray and plate colors are independent, validated and passed to 3MF without changing geometry',async()=>{
  const {gridfinityColor}=await import('../src/gridfinity.js');
  const {formatExport}=await import('../src/exportFormats.js');
  const p={...defaultGridfinity(),columns:1,rows:1,colors:{tray:'#E63522',plate:'#096BD8'}};
  assert.deepEqual(parseGridfinity(JSON.stringify(p)),p);
  assert.equal(gridfinityColor(p,'tray'),'#E63522');assert.equal(gridfinityColor(p,'plate'),'#096BD8');
  assert.throws(()=>validateGridfinity({...p,colors:{tray:'red'}}));
  const stl=(await buildGridfinity(p,'tray')).stl;
  assert.deepEqual(stl,(await buildGridfinity({...p,colors:undefined},'tray')).stl);
  const text=new TextDecoder().decode(formatExport([{name:'tray',stl,color:gridfinityColor(p,'tray')}],'3mf').data);
  assert.ok(text.includes('displaycolor="#E63522FF"'));
});

test('3D picking finds nested walls and floor cells; drag preserves valid layouts',async()=>{
  const {gridfinityEditorProject,gridfinityRegions}=await import('../src/gridfinity.js');
  const {splitCell}=await import('../src/editor.js');
  const {gridfinityPick,gridfinityDrag}=await import('../src/gridfinityInteraction.js');
  const base=defaultGridfinity(),editor=splitCell(gridfinityEditorProject(base),'root','x',3),p={...base,root:editor.root};
  const leaves=gridfinityRegions(p).filter(r=>!r.cell.split);
  assert.equal(leaves.length,3);
  const cell=leaves[0];assert.deepEqual(gridfinityPick(p,cell.x+cell.width/2,cell.y+cell.depth/2),{id:cell.cell.id,wall:false});
  assert.deepEqual(gridfinityPick(p,cell.x+cell.width+p.wall/2,cell.y+cell.depth/2),{id:'root',wall:true});
  const secondBefore=gridfinityRegions(p).find(r=>r.cell.id===p.root.split!.second.id)!;
  const next=gridfinityDrag(p,'root',5);
  assert.ok(Math.abs(gridfinityRegions(next).find(r=>r.cell.id===cell.cell.id)!.width-cell.width-5)<1e-8);
  const secondAfter=gridfinityRegions(next).find(r=>r.cell.id===secondBefore.cell.id)!;
  const at=(r:typeof secondBefore)=>r.x+(r.width-p.wall)*r.cell.split!.ratio;
  assert.ok(Math.abs(at(secondBefore)-at(secondAfter))<1e-8);
  assert.throws(()=>gridfinityDrag(p,'root',1000));assert.equal(gridfinityPick(p,-5,-5),null);
});

test('shared printer filament colors map into Gridfinity 3MF',async()=>{
  const {slotMap}=await import('../src/filaments.js');
  const {formatExport}=await import('../src/exportFormats.js');
  const p={...defaultGridfinity(),columns:1,rows:1};
  assert.deepEqual(parseGridfinity(JSON.stringify(p)),p);
  const stl=(await buildGridfinity(p,'tray')).stl;
  const archive=formatExport([{name:'tray',stl,color:'#e63522'}],'3mf',undefined,slotMap([{slot:3,color:'#e63522',name:'PLA'}]));
  assert.ok(new TextDecoder().decode(archive.data).includes('key="extruder" value="3"'));
});
test('interactive cavity contours match exported sections and keep all cell identities while dragging',async()=>{
 const {gridfinityCavities,gridfinityLowerPositions}=await import('../src/gridfinityPreview.js');
 const {gridfinityDrag}=await import('../src/gridfinityInteraction.js');
 const {gridfinityEditorProject}=await import('../src/gridfinity.js');
 const {splitCell}=await import('../src/editor.js');
 const {roundedContour}=await import('../src/rounding.js');
 const area=(points:number[][])=>Math.abs(points.reduce((sum,p,i)=>{const q=points[(i+1)%points.length];return sum+p[0]*q[1]-p[1]*q[0];},0)/2);
 const wasm=await Module();wasm.setup();
 for(const innerRadius of [0,4,20]){
  const base={...defaultGridfinity(),innerRadius};let editor=splitCell(gridfinityEditorProject(base),'root','x',2);editor=splitCell(editor,editor.root.split!.second.id,'y',2);
  const p={...base,root:editor.root},next=gridfinityDrag(p,'root',8),cells=gridfinityCavities(next);
  assert.equal(cells.length,3);assert.deepEqual(cells.map(r=>r.cell.id),gridfinityCavities(p).map(r=>r.cell.id));
  const result=await buildGridfinity(next,'tray'),tri=decodeSTL(result.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tri.flat(2)),triVerts:new Uint32Array(Array.from({length:tri.length*3},(_,i)=>i))});mesh.merge();const solid=new wasm.Manifold(mesh),slice=solid.slice(10);
  try{const [w,d]=gridfinitySize(next,'tray'),expected=area(roundedContour(w,d,next.outerRadius!))-cells.reduce((n,c)=>n+area(c.points),0);assert.ok(Math.abs(slice.area()-expected)<.05);}finally{slice.delete();solid.delete();}
  const lower=gridfinityLowerPositions(result.stl);assert.ok(lower.length>0);for(let i=2;i<lower.length;i+=3)assert.ok(lower[i]<=7);
  // Cavity floors are drawn once by the interactive surface, never by the lower mesh.
  for(let i=0;i<lower.length;i+=9)assert.ok([lower[i+2],lower[i+5],lower[i+8]].some(z=>z<7-1e-6));
 }
});

test('Gridfinity pointer dragging shares organizer centre snapping and end limits',async()=>{
 const {gridfinityEditorProject,gridfinityRegions}=await import('../src/gridfinity.js');
 const {splitCell}=await import('../src/editor.js');
 const {gridfinityDrag}=await import('../src/gridfinityInteraction.js');
 const base=defaultGridfinity(),p={...base,root:splitCell(gridfinityEditorProject(base),'root','x',2).root};
 assert.equal(gridfinityDrag(p,'root',.5).root!.split!.ratio,.5);
 for(const delta of [-1000,1000]){
  const leaves=gridfinityRegions(gridfinityDrag(p,'root',delta)).filter(r=>!r.cell.split);
  assert.ok(Math.min(...leaves.map(r=>r.width))>=2-1e-8);
 }
 assert.equal(p.root.split!.ratio,.5);
});
