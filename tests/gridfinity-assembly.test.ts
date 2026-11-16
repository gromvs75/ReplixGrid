import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultGridfinity} from '../src/gridfinity.js';
import {rotateGridfinityTray,defaultGridfinityAssembly,migrateGridfinity,parseGridfinityAssembly,validateGridfinityAssembly,addGridfinityPlate,addGridfinityTray,moveGridfinityPart,updateGridfinityPart,removeGridfinityPart,gridfinityAssemblyItems} from '../src/gridfinityAssembly.js';
test('new clearance is 0.10; legacy geometry, layouts and clearance survive migration',()=>{
 assert.equal(defaultGridfinity().clearance,.1);
 const old={...defaultGridfinity(),clearance:.15,columns:3,compartmentsX:2,colors:{tray:'#ff0000',plate:'#0000ff'}};
 const a=parseGridfinityAssembly(JSON.stringify(old));assert.deepEqual(a.trays[0].project,old);assert.deepEqual(a.plates[0].project,old);
 assert.deepEqual(parseGridfinityAssembly(JSON.stringify(a)),a);
});
test('different trays are independent and placed in free cells',()=>{
 const a=defaultGridfinityAssembly(),added=addGridfinityTray(a,a.plates[0].id),t=added.assembly.trays.at(-1)!;
 assert.equal(added.assembly.trays.length,2);assert.equal(t.x,2);assert.equal(t.y,0);
 const b=updateGridfinityPart(added.assembly,added.selection,{...t.project,heightUnits:8,colors:{tray:'#ff0000'}});
 assert.deepEqual(b.trays[0],a.trays[0]);assert.equal(b.trays[1].project.heightUnits,8);
 const c=addGridfinityTray(b,a.plates[0].id,b.trays[1]);c.assembly.trays.at(-1)!.project.colors!.tray='#0000ff';assert.equal(b.trays[1].project.colors!.tray,'#ff0000');
});
test('plates carry their trays; transferring preserves dimensions and color',()=>{
 const a=defaultGridfinityAssembly(),added=addGridfinityPlate(a),p=added.assembly.plates[1],s={kind:'tray' as const,id:a.trays[0].id};
 const b=moveGridfinityPart(added.assembly,s,1,1,p.id);assert.deepEqual(b.trays[0].project,a.trays[0].project);
 const before=gridfinityAssemblyItems(b).find(i=>i.id===s.id)!;
 const c=moveGridfinityPart(b,added.selection,10,3),after=gridfinityAssemblyItems(c).find(i=>i.id===s.id)!;
 assert.equal(after.position[0]-before.position[0],(10-p.x)*42);assert.equal(after.position[1]-before.position[1],126);
});
test('collisions, overhangs, invalid transfers and occupied plate deletion are rejected',()=>{
 const a=defaultGridfinityAssembly(),b=addGridfinityTray(a,a.plates[0].id),s=b.selection;
 assert.throws(()=>moveGridfinityPart(b.assembly,s,0,0),/пересекаются/);
 assert.throws(()=>moveGridfinityPart(b.assembly,s,4,0),/границы/);
 assert.throws(()=>moveGridfinityPart(b.assembly,s,0,0,'missing'));
 assert.throws(()=>updateGridfinityPart(b.assembly,{kind:'plate',id:a.plates[0].id},{...a.plates[0].project,columns:1}),/границы/);
 const c=addGridfinityPlate(a);assert.throws(()=>removeGridfinityPart(c.assembly,{kind:'plate',id:a.plates[0].id}),/лотки/);
 assert.throws(()=>moveGridfinityPart(c.assembly,c.selection,0,0),/Плиты пересекаются/);
});
test('rotations change occupied cells and deleting the last plate is impossible',()=>{
 const a=defaultGridfinityAssembly();a.trays[0].project.columns=3;a.trays[0].project.rows=1;a.trays[0].rotated=true;a.trays[0].x=3;
 assert.equal(validateGridfinityAssembly(a),a);a.trays[0].rotated=false;assert.throws(()=>validateGridfinityAssembly(a),/границы/);
 assert.throws(()=>removeGridfinityPart(defaultGridfinityAssembly(),{kind:'plate',id:defaultGridfinityAssembly().plates[0].id}));
});
test('full legacy plate explains why another tray cannot be added',()=>{
 const a=migrateGridfinity(defaultGridfinity());assert.throws(()=>addGridfinityTray(a,a.plates[0].id),/нет места/);
 const b=addGridfinityPlate(a);assert.equal(addGridfinityTray(b.assembly,b.selection.id).assembly.trays.length,2);
});
test('malformed and duplicate IDs cannot enter saved assemblies',()=>{
 const a=defaultGridfinityAssembly();a.trays[0].id=a.plates[0].id;assert.throws(()=>parseGridfinityAssembly(JSON.stringify(a)));
 assert.throws(()=>parseGridfinityAssembly('{}'));assert.throws(()=>parseGridfinityAssembly('null'));
});
test('duplicating a plate copies independent trays and export targets keep relationships',async()=>{
 const {gridfinityExportItems,transferGridfinityTray}=await import('../src/gridfinityAssembly.js');
 const a=defaultGridfinityAssembly(),b=addGridfinityPlate(a,a.plates[0]);
 assert.equal(b.assembly.trays.length,2);assert.notEqual(b.assembly.trays[0].id,b.assembly.trays[1].id);
 assert.notEqual(b.assembly.trays[0].project,b.assembly.trays[1].project);
 assert.equal(gridfinityExportItems(b.assembly,b.selection,'all').length,4);
 assert.equal(gridfinityExportItems(b.assembly,b.selection,'kit').length,2);
 assert.equal(gridfinityExportItems(b.assembly,b.selection,'plate').length,1);
 assert.throws(()=>gridfinityExportItems(b.assembly,b.selection,'tray'));
 const c=transferGridfinityTray(b.assembly,a.trays[0].id,b.selection.id);
 assert.equal(c.trays[0].plateId,b.selection.id);assert.notEqual(c.trays[0].x,c.trays[1].x);
 assert.equal(gridfinityExportItems(c,b.selection,'kit').length,3);
 assert.equal(gridfinityExportItems(c,{kind:'tray',id:c.trays[0].id},'tray').length,1);
});

test('T2 rotates beside T1 by shifting to the nearest free cells, without moving other trays',()=>{
 const a=defaultGridfinityAssembly(),plateId=a.plates[0].id;
 a.plates[0].project={...defaultGridfinity(),columns:6,rows:6};
 const make=(id:string,x:number,y:number,columns:number,rows:number)=>({id,name:id,plateId,x,y,rotated:false,project:{...defaultGridfinity(),columns,rows}});
 a.trays=[make('T1',2,2,3,4),make('T2',4,1,2,1),make('T3',0,3,1,2),make('T4',0,1,2,2),...Array.from({length:4},(_,i)=>make('top'+i,i,0,1,1))];
 validateGridfinityAssembly(a);const snapshot=structuredClone(a),b=rotateGridfinityTray(a,'T2'),tray=b.trays.find(t=>t.id==='T2')!;
 assert.equal(tray.rotated,true);assert.deepEqual([tray.x,tray.y],[4,0]);
 assert.deepEqual(b.trays.filter(t=>t.id!=='T2'),a.trays.filter(t=>t.id!=='T2'));assert.deepEqual(a,snapshot);
 assert.deepEqual(tray.project,a.trays[1].project);
});
test('rotation preserves a free anchor, fits plate edges and rejects a full plate atomically',()=>{
 const a=defaultGridfinityAssembly();a.trays[0].project={...defaultGridfinity(),columns:2,rows:1};
 const id=a.trays[0].id,b=rotateGridfinityTray(a,id);assert.deepEqual([b.trays[0].x,b.trays[0].y],[0,0]);
 assert.deepEqual(rotateGridfinityTray(b,id),a);
 a.trays[0].x=2;a.trays[0].y=3;const c=rotateGridfinityTray(a,id);assert.equal(c.trays[0].y,2);validateGridfinityAssembly(c);
 a.plates[0].project={...defaultGridfinity(),columns:2,rows:1};a.trays[0].x=0;a.trays[0].y=0;const original=structuredClone(a);
 assert.throws(()=>rotateGridfinityTray(a,id),/нет места/);assert.deepEqual(a,original);
});
