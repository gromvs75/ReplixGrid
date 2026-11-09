import test from 'node:test';
import assert from 'node:assert/strict';
import {isolatedLidLayout} from '../src/lidPreview.js';
import {buildKit} from '../src/accessoryKernel.js';
import {defaultProject} from '../src/model.js';
import {setLevelCount} from '../src/accessories.js';
for(const fit of ['outer','inset'] as const)test(`isolated ${fit} lid framing is independent of tier count`,async()=>{
 const layouts=[];
 for(const tiers of [1,3]){
  const p=setLevelCount({...defaultProject(),width:13.27,depth:9.63,height:24.13,cornerRadius:.2},tiers);
  p.lid=true;p.lidDesign={pattern:'smooth',rimHeight:2,handle:'none',fit,olive:true,motif:'fern',raised:true};
  const parts=await buildKit(p),layout=isolatedLidLayout(parts,fit==='inset')!;
  assert.ok(layout&&Number.isFinite(layout.size));
  const lid=parts.find(x=>x.name==='lid')!;
  layouts.push({size:layout.size,z:lid.position[2]+layout.offset[2]});
 }
 assert.ok(Math.abs(layouts[0].size-layouts[1].size)<1e-5);
 assert.ok(Math.abs(layouts[0].z-layouts[1].z)<1e-5);
});
