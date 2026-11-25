import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {suggestDrawerGrid,drawerPitch,planDrawerPlates} from '../src/gridfinityDrawer.js';
import {fitDrawerGrid,addGridfinityPlate,addGridfinityTray,defaultGridfinityAssembly,gridfinityAssemblyItems,gridfinityExportItems,parseGridfinityAssembly,rotateGridfinityTray,trayOrigin,updateGridfinityPart,removeGridfinityPart} from '../src/gridfinityAssembly.js';
import {gridfinityDrop} from '../src/gridfinityPlacement.js';
import {buildGridfinity} from '../src/gridfinityKernel.js';
import {decodeSTL} from '../src/stl.js';

const bed={length:270,width:270,height:270,gap:5};
test('mounting keeps fitted plates level across seams and replanning',()=>{
 const grid=suggestDrawerGrid(280,480,0),original=fitDrawerGrid(grid,bed);
 const plate=original.plates[1],selection={kind:'plate' as const,id:plate.id};
 const mounted=updateGridfinityPart(original,selection,{...plate.project,plateScrewMount:true});
 assert.ok(mounted.plates.every(item=>item.project.plateScrewMount));
 assert.ok(original.plates.every(item=>!item.project.plateScrewMount));
 assert.equal(gridfinityAssemblyItems(mounted).find(item=>item.kind==='tray')?.position[2],2.8);
 const restored=parseGridfinityAssembly(JSON.stringify(mounted));
 const replanned=fitDrawerGrid(grid,{...bed,length:190,width:190},restored);
 assert.ok(replanned.plates.length>mounted.plates.length);
 assert.ok(replanned.plates.every(item=>item.project.plateScrewMount));
 const mixed=structuredClone(restored);
 mixed.plates[0].project.plateScrewMount=false;
 assert.throws(()=>parseGridfinityAssembly(JSON.stringify(mixed)));
 const unmounted=updateGridfinityPart(mounted,selection,{...plate.project,plateScrewMount:false});
 assert.ok(unmounted.plates.every(item=>!item.project.plateScrewMount));
 assert.equal(gridfinityAssemblyItems(unmounted).find(item=>item.kind==='tray')?.position[2],1.2);
});
test('drawer dimensions and per-side gap determine the physical pitch and balanced printable tiles',()=>{
 for(const [width,depth,cols,rows,tiles] of [[280,480,7,12,4],[255,572,6,14,3]]){
  const grid=suggestDrawerGrid(width,depth,0),a=fitDrawerGrid(grid,bed);
  assert.deepEqual([grid.columns,grid.rows,a.plates.length],[cols,rows,tiles]);
  const [px,py]=drawerPitch(grid);
  assert.equal(px*cols,width);assert.equal(py*rows,depth);
  assert.ok(a.plates.every(p=>p.project.columns*px<=266&&p.project.rows*py<=266));
  assert.deepEqual(parseGridfinityAssembly(JSON.stringify(a)),a);
 }
 const custom={width:255,depth:572,gap:.5,columns:6,rows:14};
 assert.deepEqual(drawerPitch(custom),[254/6,571/14]);
 assert.throws(()=>planDrawerPlates(custom,{...bed,length:35,width:35}));
 const original=fitDrawerGrid(custom,bed);
 const moved=gridfinityDrop(original,{kind:'tray',id:original.trays[0].id},2,4)!;
 const replanned=fitDrawerGrid(custom,{...bed,length:190,width:190},moved);
 assert.deepEqual(trayOrigin(replanned,replanned.trays[0]),{x:2,y:4});
 assert.equal(replanned.trays[0].id,moved.trays[0].id);
});
test('standard trays also cross supported seams, never holes, overlaps or unsupported edges',()=>{
 const a=addGridfinityPlate(defaultGridfinityAssembly()).assembly,s={kind:'tray' as const,id:a.trays[0].id};
 const span=gridfinityDrop(a,s,3,0)!;
 assert.deepEqual(trayOrigin(span,span.trays[0]),{x:3,y:0});
 const second={kind:'plate' as const,id:a.plates[1].id};
 const mountable={...a.plates[1].project,plateScrewMount:true};
 assert.throws(()=>updateGridfinityPart(span,second,mountable),/одной высоты/);
 assert.equal(gridfinityDrop(updateGridfinityPart(a,second,mountable),s,3,0),null);
 assert.throws(()=>removeGridfinityPart(span,{kind:'plate',id:a.plates[1].id}));
 const other=addGridfinityTray(span,a.plates[1].id);
 assert.equal(other.assembly.trays[1].x,1);
 assert.equal(gridfinityDrop(other.assembly,other.selection,-1,0),null);
 assert.equal(gridfinityDrop({...a,plates:[a.plates[0],{...a.plates[1],x:5}]},s,3,0),null);
});
test('rectangular feet straddle a seam and match both exported plate sockets after a turn',async()=>{
 const a=fitDrawerGrid(suggestDrawerGrid(255,572,0),bed),s={kind:'tray' as const,id:a.trays[0].id};
 const resized=updateGridfinityPart(a,s,{...a.trays[0].project,columns:2,rows:1});
 const turned=rotateGridfinityTray(resized,s.id),placed=gridfinityDrop(turned,s,1,4)!;
 assert.deepEqual(placed.trays[0].project.pitch,drawerPitch(a.drawer!).reverse());
 const items=gridfinityAssemblyItems(placed);
 assert.equal(gridfinityExportItems(placed,{kind:'plate',id:a.plates[1].id},'kit').filter(p=>p.kind==='tray').length,1);
 const wasm=await Module();wasm.setup();
 const solid=async(item:typeof items[number])=>{
  const result=await buildGridfinity(item.project,item.kind),positions=new Float32Array(decodeSTL(result.stl).flat(2));
  const mesh=new wasm.Mesh({numProp:3,vertProperties:positions,triVerts:Uint32Array.from({length:positions.length/3},(_,i)=>i)});mesh.merge();
  const raw=new wasm.Manifold(mesh),rotation=raw.rotate([0,0,item.rotated?90:0]);
  const at:[number,number,number]=[...item.position];if(item.rotated)at[0]+=result.inspection.bounds.max[1];
  const world=rotation.translate(at);rotation.delete();raw.delete();return world;
 };
 const tray=await solid(items.find(i=>i.kind==='tray')!),offset=tray.translate([.4,0,0]);
 try{for(const plate of items.filter(i=>i.kind==='plate').slice(0,2)){
  const base=await solid(plate),fit=tray.intersect(base),shift=offset.intersect(base);
  try{assert.ok(fit.volume()<.002);assert.ok(shift.volume()>1);}finally{shift.delete();fit.delete();base.delete();}
 }}finally{offset.delete();tray.delete();}
});
