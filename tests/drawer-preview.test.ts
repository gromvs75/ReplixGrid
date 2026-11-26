import test from 'node:test';
import assert from 'node:assert/strict';
import {newDrawer,newTray} from '../src/drawer.js';
import {drawerDrop,drawerDragPosition} from '../src/drawerPlacement.js';
import {createDrawerPreviewBuilder} from '../src/drawerPreviewKernel.js';
import {reuseDrawerPreviewMeshes} from '../src/drawerPreview.js';
import {prepareDrawer} from '../src/drawerExport.js';
import {MOUNT,MOUNT_EDGE_ERROR} from '../src/mountingPlate.js';

test('drawer previews seat regular and rotated trays on the exported plate',async()=>{
 const first={...newTray('Tray',80,60,30),x:22,y:22};
 const turned={...newTray('Rotated tray',100,60,39),x:102,y:102,rotation:90 as const};
 const small={...newTray('Too few pegs',20,20,30),x:142,y:22};
 const layout={...newDrawer(),width:180,depth:240,height:70,plate:{enabled:true,bedWidth:130,bedDepth:150},trays:[first,turned,small]};
 const preview=createDrawerPreviewBuilder();
 const mounted=await preview(layout);
 assert.equal(mounted.plateError,undefined);
 assert.equal(mounted.plate.length,4);
 assert.deepEqual(mounted.trays.map(t=>t.mounted),[true,true,false]);
 assert.match(mounted.trays[2].mountingError??'',/Недостаточно опор/);
 for(const tray of mounted.trays.slice(0,2)){
  assert.ok(tray.meshes[0].name.endsWith('-mounted'));
  assert.ok(Math.abs(tray.origin![2]-MOUNT.addedHeight)<1e-6);
 }

 const position=drawerDragPosition(layout,first,18,4);
 assert.deepEqual(position,{x:42,y:22});
 const bounds=Object.fromEntries(mounted.trays.map(t=>[t.id,t.bounds!]));
 const movedLayout=drawerDrop(layout,first.id,position.x,position.y,bounds);
 assert.ok(movedLayout);
 const moved=await preview(movedLayout);
 assert.ok(moved.trays[0].mounted);
 assert.equal(moved.trays[0].origin![0]-mounted.trays[0].origin![0],MOUNT.pitch);
 const received=structuredClone(moved);
 const reused=reuseDrawerPreviewMeshes(received,mounted);
 assert.equal(reused.plate,mounted.plate);
 assert.equal(reused.trays[1].meshes,mounted.trays[1].meshes);
 assert.equal(reused.trays[0].meshes,received.trays[0].meshes);

 const free=await preview({...layout,plate:{...layout.plate,enabled:false}});
 assert.equal(free.plate.length,0);
 assert.deepEqual(free.trays.map(t=>t.origin?.[2]),[0,0,0]);
});

test('a peg straddling the tray wall prevents seating and export until the tray moves',async()=>{
 const tray={...newTray('Tray',80,60,30),x:2,y:92};
 const layout={...newDrawer(),plate:{enabled:true,bedWidth:270,bedDepth:270},trays:[tray]};
 const preview=createDrawerPreviewBuilder();
 const invalid=(await preview(layout)).trays[0];
 assert.equal(invalid.mountingError,MOUNT_EDGE_ERROR);
 assert.equal(invalid.mounted,false);
 assert.equal(invalid.meshes[0].name,'organizer');
 assert.ok(invalid.origin![2]>MOUNT.plateThickness+MOUNT.pegHeight);
 await assert.rejects(prepareDrawer(layout,{length:270,width:270,height:270,gap:3}),{message:'Tray: '+MOUNT_EDGE_ERROR});

 const aligned=drawerDragPosition(layout,tray,0,4,invalid.bounds,true);
 assert.deepEqual(aligned,{x:2,y:96});
 const corrected=await preview({...layout,trays:[{...tray,...aligned}]});
 assert.equal(corrected.trays[0].mounted,true);
});
