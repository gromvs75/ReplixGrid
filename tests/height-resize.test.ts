import {test} from 'node:test';
import assert from 'node:assert/strict';
import {organizerTemplate} from '../src/templates.js';
import {resizeHeight} from '../src/editor.js';
import {resolveWalls} from '../src/model.js';
for(const shape of ['rounded','capsule','circle','oval','honeycomb'] as const)test(`${shape}: global height resizes explicit profiles without flattening`,()=>{
 const p=organizerTemplate(shape,'slope'),next=resizeHeight(p,p.floorThickness+(p.height-p.floorThickness)*2);
 assert.equal(next.height-p.floorThickness,2*(p.height-p.floorThickness));
 const before=resolveWalls(p),after=resolveWalls(next);
 before.forEach((w,i)=>{for(const end of ['startHeight','endHeight'] as const)assert.ok(Math.abs(after[i][end]-p.floorThickness-2*(w[end]-p.floorThickness))<1e-6);});
 p.honeycombHeights?.forEach((h,i)=>{if(h!==null)assert.equal(next.honeycombHeights![i]!-p.floorThickness,2*(h-p.floorThickness));});
 assert.deepEqual(resizeHeight(next,p.height),p);
});
