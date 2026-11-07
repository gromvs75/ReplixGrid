import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Project} from '../src/model.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {decodeSTL,inspectSurface} from '../src/stl.js';

// Oval sleeve with unequal side heights, a wall cutout and a decorative ledge.
function project():Project{return {...defaultProject(),width:120,depth:200,height:36,cornerRadius:0,footprint:'oval',heights:{left:41.4,right:100.4},transitions:['front','back'],shell:{pattern:'petals',gap:.5,thickness:1.6,size:12},baseBand:{height:6,style:'smooth'},cutouts:{left:{shape:'square',width:.5,depth:24.84,position:.5}}};}
for(const pattern of ['petals','honeycomb','diamonds','waves'] as const)test(`oval cutout and trim: ${pattern} remains printable after switching pattern`,async()=>{
 const p=project();p.shell!.pattern=pattern;
 const result=await buildShell(p),inspection=inspectSurface(decodeSTL(result.stl));
 assert.ok(inspection.volume>1000);
 assert.ok(Math.abs(inspection.bounds.max[2]-94.4)<.01);
 assert.ok(Math.abs(inspection.bounds.max[0]-124.2)<.01);
});
test('shell stabilization leaves organizer dimensions unchanged',async()=>{
 const p=project(),result=await buildOrganizer(p);
 assert.ok(Math.abs(result.inspection.bounds.max[2]-100.4)<.001);
 assert.ok(result.inspection.volume>0);
});
