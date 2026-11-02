import {test} from 'node:test';
import assert from 'node:assert/strict';
import {holesFor,defaultShell,shellLayout} from '../src/shell.js';
import {polygonArea} from '../src/rounding.js';
import {defaultProject} from '../src/model.js';
import {parseProject} from '../src/editor.js';
import {buildShell} from '../src/kernel.js';
for(const pattern of ['honeycomb','diamonds','waves','petals'] as const){
 test(`${pattern}: openwork fills the panel rather than isolated ornaments`,()=>{
  const holes=holesFor({id:'test',axis:'x',x:0,y:0,length:200,thickness:1.6,startHeight:200,endHeight:200,cap:0},defaultShell(pattern),3);
  const fraction=holes.reduce((sum,h)=>sum+polygonArea(h),0)/(194*194);
  assert.ok(fraction>.48,`${pattern}: open fraction ${fraction}`);
  assert.ok(fraction<.9);
 });
 for(const thickness of [1,2])test(`${pattern}: ${thickness} mm shell exports and preserves inner clearance`,async()=>{
  const p=defaultProject();p.cornerRadius=12;p.shell={...defaultShell(pattern),thickness};
  assert.deepEqual(parseProject(JSON.stringify(p)),p);
  const layout=shellLayout(p);assert.equal(layout.innerWidth,p.width+2*p.shell.gap);
  const result=await buildShell(p);
  assert.ok(Math.abs(result.inspection.bounds.max[0]-(p.width+2*(thickness+p.shell.gap)))<.001);
  assert.ok(result.inspection.volume>0);
 });
}
