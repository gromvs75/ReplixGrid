import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultGridfinity,parseGridfinity,validateGridfinity,gridfinitySize,gridfinityPlateFloor,lidDeckBase,lidDeckTop,gridfinityLidBaseZ} from '../src/gridfinity.js';
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
test('custom tray height survives saving and reaches the printable mesh',async()=>{
  const project=parseGridfinity(JSON.stringify({...defaultGridfinity(),heightUnits:50/7}));
  assert.equal(gridfinitySize(project,'tray')[2],50);
  const tray=await buildGridfinity(project,'tray');
  assert.equal(tray.inspection.bounds.max[2],50);
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
    for(const clearance of [.1,.15,.2])for(const plateStyle of ['solid','lattice'] as const){
      const plate=toSolid((await buildGridfinity({...p,clearance,plateStyle},'plate')).stl),placed=tray.translate([.25,.25,1.2]),collision=plate.intersect(placed);
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

test('lattice plates retain seating geometry with real through openings and lower volume',async()=>{
 const wasm=await Module();wasm.setup();
 for(const [columns,rows] of [[1,1],[3,2],[8,8]]){
  const p={...defaultGridfinity(),columns,rows};
  const solid=await buildGridfinity(p,'plate');
  const open=await buildGridfinity({...p,plateStyle:'lattice'},'plate');
  assert.deepEqual(open.inspection.bounds,solid.inspection.bounds);
  assert.ok(open.inspection.volume<solid.inspection.volume*.8);
  const tri=decodeSTL(open.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tri.flat(2)),triVerts:new Uint32Array(Array.from({length:tri.length*3},(_,i)=>i))});mesh.merge();const body=new wasm.Manifold(mesh);
  const probe=wasm.Manifold.cube([1,1,10]).translate([20.5,20.5,-1]),hole=body.intersect(probe);
  const ledge=wasm.Manifold.cube([1,1,.5]).translate([3.5,20.5,.3]),support=body.intersect(ledge);
  try{assert.equal(hole.volume(),0);assert.ok(support.volume()>.49);}finally{support.delete();ledge.delete();hole.delete();probe.delete();body.delete();}
 }
 const p={...defaultGridfinity(),columns:1,rows:1};
 const {plateStyle,...legacy}=p;
 assert.deepEqual((await buildGridfinity(legacy,'plate')).stl,(await buildGridfinity(p,'plate')).stl);
 assert.deepEqual((await buildGridfinity({...p,plateStyle:'lattice'},'tray')).stl,(await buildGridfinity(p,'tray')).stl);
 assert.deepEqual(parseGridfinity(JSON.stringify({...p,plateStyle:'lattice'})),{...p,plateStyle:'lattice'});
 assert.throws(()=>parseGridfinity(JSON.stringify({...p,plateStyle:'unknown'})));
});

test('mountable plates keep countersunk screws and bridges below the tray feet',async()=>{
 const wasm=await Module();wasm.setup();
 const trayProject={...defaultGridfinity(),columns:3,rows:1,pitch:[40,45] as [number,number]};
 const tray=await buildGridfinity(trayProject,'tray');
 const toSolid=(stl:ArrayBuffer)=>{
  const triangles=decodeSTL(stl);
  const mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:Uint32Array.from({length:triangles.length*3},(_,i)=>i)});
  mesh.merge();return new wasm.Manifold(mesh);
 };
 const foot=toSolid(tray.stl);
 const placed=foot.translate([.25,.25,2.8]);
 try{
  for(const plateStyle of ['solid','lattice'] as const){
   const project={...trayProject,plateStyle,plateScrewMount:true};
   assert.deepEqual(parseGridfinity(JSON.stringify(project)),project);
   const plate=await buildGridfinity(project,'plate');
   const body=toSolid(plate.stl);
   const collision=placed.intersect(body);
   const surface=(x:number,y:number)=>body.rayCast([x,y,10],[x,y,-1])[0]?.position[2];
   try{
    assert.ok(Math.abs(plate.inspection.bounds.max[2]-7.55)<1e-4);
    assert.ok(collision.volume()<.001);
    for(const x of [20,100]){
     assert.equal(surface(x,22.5),undefined);
     assert.ok(Math.abs(surface(x+2.5,22.5)!-1.7)<.01);
     assert.ok(Math.abs(surface(x+4,22.5)!-2.8)<1e-4);
    }
    if(plateStyle==='lattice'){
     assert.equal(surface(20,32.5),undefined);
     assert.equal(surface(60,22.5),undefined);
    }else assert.ok(Math.abs(surface(60,22.5)!-2.8)<1e-4);
   }finally{collision.delete();body.delete();}
   assert.deepEqual((await buildGridfinity(project,'tray')).stl,tray.stl);
  }
 }finally{placed.delete();foot.delete();}
 assert.throws(()=>parseGridfinity(JSON.stringify({...trayProject,plateScrewMount:'yes'})));
});

test('magnet pockets match on trays and both plate styles, with separate screw holes',async()=>{
 const wasm=await Module();wasm.setup();
 const toSolid=(stl:ArrayBuffer)=>{
  const triangles=decodeSTL(stl);
  const mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:Uint32Array.from({length:triangles.length*3},(_,i)=>i)});
  mesh.merge();return new wasm.Manifold(mesh);
 };
 const base={...defaultGridfinity(),columns:2,rows:1};
 for(const magnetClearance of [0,.009,.201,NaN])assert.throws(()=>validateGridfinity({...base,magnetClearance}));
 for(const [pitch,magnetClearance] of [[[42,42],.01],[[36,48],.20]] as const){
  const [px,py]=pitch;
  const p={...base,pitch:[px,py] as [number,number],magnetClearance};
  assert.deepEqual(parseGridfinity(JSON.stringify(p)),p);
  const floor=gridfinityPlateFloor(p),radius=(6+magnetClearance)/2;
  const tray=toSolid((await buildGridfinity(p,'tray')).stl);
  const placed=tray.translate([.25,.25,floor]);
  try{
   for(const plateStyle of ['solid','lattice'] as const){
    const plate=toSolid((await buildGridfinity({...p,plateStyle,plateScrewMount:true},'plate')).stl);
    const collision=placed.intersect(plate);
    try{
     assert.ok(collision.volume()<.001);
     for(const x of [8,px-8,px+8,2*px-8])for(const y of [8,py-8]){
      const surface=(s:typeof plate,offset:number,from:number,to:number)=>s.rayCast([x+offset,y,from],[x+offset,y,to])[0]?.position[2];
      for(const offset of [0,radius-.02]){
       assert.ok(Math.abs(surface(plate,offset,10,-1)!-(floor-2.4))<1e-4);
       assert.ok(Math.abs(surface(placed,offset,floor-.1,floor+4)!-(floor+2.4))<1e-4);
      }
      assert.ok(Math.abs(surface(placed,radius+.02,floor-.1,floor+4)!-floor)<1e-4);
      assert.equal(surface(plate,0,-1,10),0);
     }
     assert.equal(plate.rayCast([px/2,py/2,10],[px/2,py/2,-1]).length,0);
     if(plateStyle==='lattice')assert.equal(plate.rayCast([px/2,py/2+9,10],[px/2,py/2+9,-1]).length,0);
    }finally{collision.delete();plate.delete();}
   }
  }finally{placed.delete();tray.delete();}
 }
});

test('exported stacking lip seats matching feet at the nominal height and retains the upper tray', async () => {
  const wasm = await Module();
  wasm.setup();
  const toSolid = (stl:ArrayBuffer) => {
    const positions = new Float32Array(decodeSTL(stl).flat(2));
    const mesh = new wasm.Mesh({numProp:3, vertProperties:positions,
      triVerts:Uint32Array.from({length:positions.length/3}, (_,i)=>i)});
    mesh.merge();
    return new wasm.Manifold(mesh);
  };
  for(const [columns,rows,wall,outerRadius] of [[1,1,1.2,0],[2,3,3,3.75]]) {
    const base = {...defaultGridfinity(),columns,rows,wall,outerRadius,heightUnits:2};
    const project = {...base,stackingLip:true,floorRadius:5,sideGrips:true,frontNotch:true};
    const regular = await buildGridfinity(base,'tray');
    const stackable = await buildGridfinity(project,'tray');
    assert.deepEqual(parseGridfinity(JSON.stringify(project)),project);
    assert.deepEqual((await buildGridfinity({...base,stackingLip:false},'tray')).stl,regular.stl);
    assert.ok(Math.abs(stackable.inspection.bounds.max[2]-gridfinitySize(project,'tray')[2])<.0001);
    const lower = toSolid(stackable.stl), upper = toSolid(regular.stl);
    const overlap = (x:number,y:number,z:number) => {
      const placed = upper.translate([x,y,z]);
      const intersection = lower.intersect(placed);
      try {return intersection.volume();} finally {placed.delete();intersection.delete();}
    };
    try {
      assert.ok(overlap(0,0,14)<.001);
      assert.ok(overlap(0,0,13.9)>1);
      for(const [x,y] of [[.5,0],[-.5,0],[0,.5],[0,-.5]]) assert.ok(overlap(x,y,14)>1);
    } finally {upper.delete();lower.delete();}
  }
  assert.throws(()=>parseGridfinity(JSON.stringify({...defaultGridfinity(),stackingLip:'yes'})));
});

test('both lids seat on divided and lipped trays, and the stacking lid locates an upper tray',async()=>{
 const wasm=await Module();wasm.setup();
 async function solid(p:ReturnType<typeof defaultGridfinity>,kind:'tray'|'lid'){
   const {stl}=await buildGridfinity(p,kind),vertices=new Float32Array(decodeSTL(stl).flat(2));
   const mesh=new wasm.Mesh({numProp:3,vertProperties:vertices,triVerts:Uint32Array.from({length:vertices.length/3},(_,i)=>i)});
   mesh.merge();return new wasm.Manifold(mesh);
 }
 for(const stackingLip of [false,true])for(const lid of ['plain','stackable'] as const){
   const p={...defaultGridfinity(),columns:2,rows:1,compartmentsX:2,innerRadius:6,stackingLip,lid,floorRadius:6,frontNotch:true,sideGrips:true};
   const tray=await solid(p,'tray'),cover=await solid(p,'lid'),z=gridfinityLidBaseZ(p);
   const volume=(a:typeof tray,b:typeof tray,x:number,height:number)=>{
     const placed=b.translate([x,0,height]),intersection=a.intersect(placed);
     try{return intersection.volume();}finally{placed.delete();intersection.delete();}
   };
   try{
     assert.ok(volume(tray,cover,0,z)<.001);
     assert.ok(volume(tray,cover,0,z-.15)>1);
     assert.ok(volume(tray,cover,.6,z)>1);
     if(lid==='stackable'){
       assert.ok(volume(cover,tray,0,lidDeckTop(p))<.001);
       assert.ok(volume(cover,tray,.6,lidDeckTop(p))>1);
     }
   }finally{tray.delete();cover.delete();}
 }
 assert.throws(()=>parseGridfinity(JSON.stringify({...defaultGridfinity(),lid:'invalid'})));
});

test('face-up lid with rim, blind grip and removable tag grows from its supported footprint',async()=>{
 const wasm=await Module();wasm.setup();
 for(const stackingLip of [true,false]){
   const project={...defaultGridfinity(),columns:1,rows:1,compartmentsY:2,stackingLip,lid:'stackable' as const,
     flushLidGrip:'recessed' as const,label:{mode:'tag' as const,text:'M3'}};
   const {stl}=await buildGridfinity(project,'lid');
   const vertices=new Float32Array(decodeSTL(stl).flat(2));
   const mesh=new wasm.Mesh({numProp:3,vertProperties:vertices,triVerts:Uint32Array.from({length:vertices.length/3},(_,i)=>i)});
   mesh.merge();const solid=new wasm.Manifold(mesh);
   try{
     let previous=solid.slice(.1);
     try{
       for(let i=1;i*.2+.1<lidDeckTop(project)+3.8;i++){
         const current=solid.slice(i*.2+.1);
         // One layer of outward growth plus the narrow seating land on a plain rim.
         const allowance=!stackingLip&&i===5?.53:.215;
         const supported=previous.offset(allowance,'Round',2,96);
         const unsupported=current.subtract(supported);
         const area=unsupported.area();
         unsupported.delete();supported.delete();previous.delete();previous=current;
         assert.ok(area<.01,`unsupported area ${area} at layer ${i}, stacking lip ${stackingLip}`);
       }
     }finally{previous.delete();}
   }finally{solid.delete();}
 }
});

test('flush lid grips cut two openings through the locating pads and preserve the centre bar and stacking rim',async()=>{
 const wasm=await Module();wasm.setup();
 for(const lid of ['plain','stackable'] as const)for(const stackingLip of [false,true]){
   const project={...defaultGridfinity(),columns:1,rows:1,lid,stackingLip};
   const plain=await buildGridfinity(project,'lid');
   const grip=await buildGridfinity({...project,flushLidGrip:true},'lid');
   assert.deepEqual(grip.inspection.bounds,plain.inspection.bounds);
   const positions=new Float32Array(decodeSTL(grip.stl).flat(2));
   const mesh=new wasm.Mesh({numProp:3,vertProperties:positions,triVerts:Uint32Array.from({length:positions.length/3},(_,i)=>i)});
   mesh.merge();const solid=new wasm.Manifold(mesh);
   const probe=(y:number)=>{
     const cube=wasm.Manifold.cube([1,1,3]),at=cube.translate([20.25,y,0]),hit=solid.intersect(at);
     try{return hit.volume();}finally{hit.delete();at.delete();cube.delete();}
   };
   try{assert.equal(probe(10),0);assert.equal(probe(30),0);assert.ok(probe(20.25)>2.99);}
   finally{solid.delete();}
 }
});

test('blind lid pockets have a continuous floor above the tray dividers and a flush grip',async()=>{
 const wasm=await Module();wasm.setup();
 for(const lid of ['plain','stackable'] as const)for(const stackingLip of [true,false]){
   const p={...defaultGridfinity(),columns:1,rows:1,compartmentsY:2,stackingLip,lid,flushLidGrip:'recessed' as const};
   const {stl,inspection}=await buildGridfinity(p,'lid');
   assert.ok(Math.abs(inspection.bounds.max[2]-(lidDeckBase(p)+6.2+(lid==='stackable'?3.8:0)))<.0001);
   const positions=new Float32Array(decodeSTL(stl).flat(2));
   const mesh=new wasm.Mesh({numProp:3,vertProperties:positions,triVerts:Uint32Array.from({length:positions.length/3},(_,i)=>i)});
   mesh.merge();const solid=new wasm.Manifold(mesh);
   const volume=(y:number,z:number,h:number)=>{
     const cube=wasm.Manifold.cube([1,1,h]),at=cube.translate([20,y,z]),hit=solid.intersect(at);
     try{return hit.volume();}finally{hit.delete();at.delete();cube.delete();}
   };
   try{
     for(const y of [10,30]){
       assert.ok(volume(y,lidDeckBase(p),1.2)>1.199);
       assert.ok(volume(y,lidDeckBase(p)+1.2,5)<.00001);
     }
     assert.ok(volume(20.25,lidDeckBase(p),6.2)>6.199);
     if(!stackingLip)assert.equal(volume(20.25,0,1),0);
   }finally{solid.delete();}
 }
});

for(const shelf of ['inclined','flat'] as const)test(`1×1 tray engraving and removable tag fit the ${shelf} shelf`,async()=>{
 const wasm=await Module();wasm.setup();
 const base={...defaultGridfinity(),columns:1,rows:1,heightUnits:2,wall:1.2,compartmentsX:2,stackingLip:true};
 const engraved=await buildGridfinity({...base,label:{shelf,mode:'engraved',text:'Гайки'}},'tray');
 assert.ok(engraved.inspection.volume<(await buildGridfinity({...base,label:{shelf,mode:'engraved',text:''}},'tray')).inspection.volume);
 const project={...base,label:{shelf,mode:'tag' as const,text:'M3'}};
 const holder=await buildGridfinity(project,'tray'),tag=await buildGridfinity(project,'tag');
 const other={...project,label:{shelf,mode:'tag' as const,text:'M4'}};
 assert.deepEqual(holder.stl,(await buildGridfinity(other,'tray')).stl);
 assert.notDeepEqual(tag.stl,(await buildGridfinity(other,'tag')).stl);
 function solid(stl:ArrayBuffer){
   const pos=new Float32Array(decodeSTL(stl).flat(2));
   const mesh=new wasm.Mesh({numProp:3,vertProperties:pos,triVerts:Uint32Array.from({length:pos.length/3},(_,i)=>i)});
   mesh.merge();return new wasm.Manifold(mesh);
 }
 const {shelfAngle,tagOrigin}=await import('../src/gridfinityLabel.js');
 assert.equal(shelfAngle(project),shelf==='flat'?0:25);
 const radians=shelfAngle(project)*Math.PI/180,cos=Math.cos(radians),sin=Math.sin(radians);
 const tray=solid(holder.stl),flat=solid(tag.stl),upright=flat.rotate([shelfAngle(project),0,0]);
 const [x,y,z]=tagOrigin(project);
 function collision(slide:number,lift:number){
   const placed=upright.translate([x,y+slide*cos-lift*sin,z+slide*sin+lift*cos]);
   const hit=tray.intersect(placed);
   try{return hit.volume();}finally{hit.delete();placed.delete();}
 }
 try{
   assert.ok(collision(0,0)<.001);
   assert.ok(collision(0,1)>.1);
   for(const lift of [0,.5,1,2,3])assert.ok(collision(1.5,lift)<.001);
 }finally{upright.delete();flat.delete();tray.delete();}
 assert.throws(()=>validateGridfinity({...base,label:{shelf,mode:'tag',text:'⚙'}}));
});

test('a lid carries the label above the drawer, clear of the handle and stacking feet',async()=>{
 const wasm=await Module();wasm.setup();
 const {lidTagOrigin}=await import('../src/gridfinityLabel.js');
 const base={...defaultGridfinity(),columns:1,rows:1,heightUnits:2,stackingLip:true};
 const tray=await buildGridfinity(base,'tray');
 function solid(stl:ArrayBuffer){
   const pos=new Float32Array(decodeSTL(stl).flat(2));
   const mesh=new wasm.Mesh({numProp:3,vertProperties:pos,triVerts:Uint32Array.from({length:pos.length/3},(_,i)=>i)});
   mesh.merge();return new wasm.Manifold(mesh);
 }
 for(const lid of ['plain','stackable'] as const){
   for(const grip of [true,'recessed'] as const){
     const p={...base,lid,flushLidGrip:grip,label:{mode:'tag' as const,text:'M3'}};
     const [x,y,z]=lidTagOrigin(p);
     const body=solid((await buildGridfinity(p,'lid')).stl);
     const tag=solid((await buildGridfinity(p,'tag')).stl);
     const collision=(dy:number,dz:number)=>{
       const placed=tag.translate([x,y+dy,z+dz]),hit=body.intersect(placed);
       try{return hit.volume();}finally{placed.delete();hit.delete();}
     };
     try{
       assert.ok(collision(0,0)<.001);
       assert.ok(collision(0,-.1)>10); // solid pocket floor
       assert.ok(collision(0,1)>.1); // retaining tabs
       for(const lift of [0,.5,1,3])assert.ok(collision(1.5,lift)<.001);
       if(lid==='stackable'){
         const upper=solid(tray.stl),seated=upper.translate([0,0,z+2]),hit=body.intersect(seated);
         try{assert.ok(hit.volume()<.001);}finally{hit.delete();seated.delete();upper.delete();}
       }
     }finally{body.delete();tag.delete();}
     assert.deepEqual((await buildGridfinity(p,'tray')).stl,tray.stl);
   }
   const engraved={...base,lid,label:{mode:'engraved' as const,text:'Винты'}};
   assert.deepEqual((await buildGridfinity(engraved,'tray')).stl,tray.stl);
   assert.ok((await buildGridfinity(engraved,'lid')).inspection.volume<(await buildGridfinity({...base,lid},'lid')).inspection.volume);
 }
});


test('tray access options independently shape the interior and preserve the legacy model when disabled',async()=>{
 const base={...defaultGridfinity(),columns:1,rows:1,heightUnits:2,compartmentsX:2};
 const plain=await buildGridfinity(base,'tray');
 assert.deepEqual((await buildGridfinity({...base,floorRadius:0,frontNotch:false,sideGrips:false},'tray')).stl,plain.stl);
 for(const [option,sign] of [[{floorRadius:12},1],[{frontNotch:true},-1],[{sideGrips:true},1]] as const){
   const next={...base,...option};
   assert.deepEqual(parseGridfinity(JSON.stringify(next)),next);
   const result=await buildGridfinity(next,'tray');
   assert.deepEqual(result.inspection.bounds,plain.inspection.bounds);
   assert.ok(sign*(result.inspection.volume-plain.inspection.volume)>10);
 }
 const all={...base,wall:3,innerRadius:20,compartmentsX:4,floorRadius:12,frontNotch:true,sideGrips:true,label:{mode:'tag' as const,text:'M3'}};
 assert.ok((await buildGridfinity(all,'tray')).inspection.volume>0);
 assert.deepEqual((await buildGridfinity(all,'plate')).stl,(await buildGridfinity(base,'plate')).stl);
 for(const invalid of [{floorRadius:-1},{floorRadius:12.1},{floorRadius:NaN},{sideGrips:1},{frontNotch:'yes'}]){
   assert.throws(()=>parseGridfinity(JSON.stringify({...base,...invalid})));
 }
});

test('front notch shape and dimensions are independent and fit the resized tray',async()=>{
 const {gridfinityNotch}=await import('../src/gridfinity.js');
 const p={...defaultGridfinity(),columns:1,rows:1,heightUnits:3,frontNotch:true};
 const legacy=await buildGridfinity(p,'tray');
 const explicit={...p,notchShape:'round' as const,notchWidth:24,notchDepth:12};
 assert.deepEqual((await buildGridfinity(explicit,'tray')).stl,legacy.stl);
 for(const notchShape of ['round','square','smooth'] as const){
   const next={...p,notchShape,notchWidth:18,notchDepth:8};
   assert.deepEqual(parseGridfinity(JSON.stringify(next)),next);
   const notch=await buildGridfinity(next,'tray');
   assert.ok((await buildGridfinity({...next,notchWidth:12},'tray')).inspection.volume>notch.inspection.volume);
   assert.ok((await buildGridfinity({...next,notchDepth:5},'tray')).inspection.volume>notch.inspection.volume);
   if(notchShape!=='round')assert.notDeepEqual(notch.stl,(await buildGridfinity({...next,notchShape:'round'},'tray')).stl);
 }
 const clamped=gridfinityNotch({...p,heightUnits:2,notchWidth:100,notchDepth:30});
 assert.equal(clamped.width,31.5);assert.equal(clamped.depth,5);
 for(const invalid of [{notchShape:'v'},{notchDepth:-1},{notchWidth:'12'}]){
   assert.throws(()=>parseGridfinity(JSON.stringify({...p,...invalid})));
 }
});

test('paired wall cutouts follow the selected tray axis and meet the interior floor',async()=>{
 const wasm=await Module();wasm.setup();
 for(const walls of ['left-right','front-back'] as const)for(const toFloor of [false,true]){
   const p={...defaultGridfinity(),columns:1,rows:3,stackingLip:true,
     pairedNotches:{walls,width:18,depth:6,toFloor}};
   assert.deepEqual(parseGridfinity(JSON.stringify(p)),p);
   const [w,d,top]=gridfinitySize(p,'tray');
   const {stl}=await buildGridfinity(p,'tray');
   const points=decodeSTL(stl).flat();
   const mesh=new wasm.Mesh({numProp:3,vertProperties:Float32Array.from(points.flat()),triVerts:Uint32Array.from(points,(_,i)=>i)});
   mesh.merge();
   const solid=new wasm.Manifold(mesh);
   try{
     const height=(x:number,y:number)=>solid.rayCast([x,y,top+2],[x,y,-1])[0].position[2];
     const opening=walls==='left-right'?[[.4,d/2],[w-.4,d/2]]:[[w/2,.4],[w/2,d-.4]];
     for(const [x,y] of opening)assert.ok(Math.abs(height(x,y)-(toFloor?7:top-6))<.001);
     const shoulder=walls==='left-right'?height(.4,d/2+10):height(w/2+10,.4);
     assert.ok(Math.abs(shoulder-top)<.001);
     const end=walls==='left-right'?height(w/2,.4):height(.4,d/2);
     assert.ok(Math.abs(end-top)<.001);
   }finally{solid.delete();}
 }
});
