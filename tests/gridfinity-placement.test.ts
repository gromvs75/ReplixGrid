import test from 'node:test';
import assert from 'node:assert/strict';
import {gridfinityDrop} from '../src/gridfinityPlacement.js';
import {defaultGridfinityAssembly,addGridfinityPlate,validateGridfinityAssembly} from '../src/gridfinityAssembly.js';
test('drop snaps fractional motion without changing source or tray settings',()=>{
 const a=defaultGridfinityAssembly(),before=structuredClone(a),s={kind:'tray' as const,id:a.trays[0].id};
 const next=gridfinityDrop(a,s,.6,1.2)!;assert.deepEqual([next.trays[0].x,next.trays[0].y],[1,1]);assert.deepEqual(next.trays[0].project,a.trays[0].project);assert.deepEqual(a,before);
 assert.equal(gridfinityDrop(a,s,-1,0),null);assert.equal(gridfinityDrop(a,s,3,0),null);
});
test('occupied drop is rejected; next free target remains available',()=>{
 const a=defaultGridfinityAssembly(),s={kind:'tray' as const,id:a.trays[0].id};a.trays.push({...structuredClone(a.trays[0]),id:'neighbor',x:2,y:0});validateGridfinityAssembly(a);
 assert.equal(gridfinityDrop(a,s,1,0),null);assert.equal(gridfinityDrop(a,s,2,0),null);
 assert.equal(gridfinityDrop(a,s,0,2)?.trays[0].y,2);assert.equal(a.trays[0].y,0);
});
test('drag transfers between plates and respects rotated footprints',()=>{
 const a=addGridfinityPlate(defaultGridfinityAssembly()).assembly,s={kind:'tray' as const,id:a.trays[0].id};
 a.trays[0].project.columns=1;a.trays[0].project.rows=2;a.trays[0].rotated=true;
 const next=gridfinityDrop(a,s,6,3)!;assert.equal(next.trays[0].plateId,a.plates[1].id);assert.deepEqual([next.trays[0].x,next.trays[0].y],[2,3]);assert.equal(next.trays[0].rotated,true);
 assert.equal(gridfinityDrop(a,s,7,3),null);
});
test('moving a plate preserves child coordinates and rejects plate intersections',()=>{
 const a=addGridfinityPlate(defaultGridfinityAssembly()).assembly,s={kind:'plate' as const,id:a.plates[0].id};
 assert.equal(gridfinityDrop(a,s,1,0),null);const next=gridfinityDrop(a,s,0,4)!;assert.equal(next.plates[0].y,4);assert.deepEqual(next.trays,a.trays);
});
