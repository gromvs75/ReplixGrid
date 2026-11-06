import {test} from 'node:test';
import assert from 'node:assert/strict';
import {packBeds} from '../src/bedPacking.js';
const settings={length:100,width:80,height:50,gap:5};
test('packing uses real bed sizes, rotates and adds beds without losing objects',()=>{
 const items=[{name:'rotated',size:[70,90,20]},...Array.from({length:8},(_,i)=>({name:String(i),size:[30,30,20]}))];
 const p=packBeds(items,settings),all=p.beds.flat();assert.equal(all.length,9);assert.equal(new Set(all.map(x=>x.item)).size,9);assert.equal(all[0].rotation,90);assert.equal(p.beds.length,3);
 for(const bed of p.beds)for(const a of bed){assert.ok(a.x>=2&&a.y>=2&&a.x+a.width<=98&&a.y+a.depth<=78);for(const b of bed)if(a!==b)assert.ok(a.x+a.width+5<=b.x||b.x+b.width+5<=a.x||a.y+a.depth+5<=b.y||b.y+b.depth+5<=a.y);}
 assert.deepEqual(packBeds(items,settings),p);
});
test('oversized height or footprint fails explicitly, including invalid settings',()=>{
 for(const size of [[97,77,20],[20,20,51],[NaN,20,20]])assert.throws(()=>packBeds([{name:'bad',size}],settings));
 assert.throws(()=>packBeds([],{...settings,length:NaN}));
});
test('more bed area fits more parts and gap changes counts',()=>{
 const items=Array.from({length:4},()=>({name:'tray',size:[45,35,20]}));
 assert.equal(packBeds(items,{...settings,gap:0}).beds.length,1);
 assert.equal(packBeds(items,{...settings,gap:10}).beds.length,2);
});
