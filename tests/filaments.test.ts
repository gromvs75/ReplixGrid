import test from 'node:test';
import assert from 'node:assert/strict';
import {slotMap} from '../src/filaments.js';
test('matching uses the saved slot order and rejects ambiguous colors',()=>{
 assert.deepEqual(slotMap([{name:'White',color:'#FFFFFF'},{name:'Black',color:'#171a1b'}]),{'#ffffff':1,'#171a1b':2});
 assert.deepEqual(slotMap([{name:'a',color:'#ffffff'},{name:'b',color:'#FFFFFF'},{name:'c',color:'#008ac8'}]),{'#008ac8':3});
});

test('removing any filament preserves slot numbers across save and reload',async()=>{
 const {normalizeSlots,removeFilament,nextFilamentSlot,resolveFilamentAssignment}=await import('../src/filaments.js');
 const original=Array.from({length:16},(_,i)=>({name:`Filament ${i+1}`,color:`#${(i+1).toString(16).padStart(6,'0')}`}));
 const removed=removeFilament(original,6);
 const restored=normalizeSlots(JSON.parse(JSON.stringify(removed)));
 assert.deepEqual(restored.map(s=>s.slot),[1,2,3,4,5,7,8,9,10,11,12,13,14,15,16]);
 assert.equal(slotMap(restored)['#000007'],7);
 assert.equal(slotMap(restored)['#000006'],undefined);
 assert.equal(nextFilamentSlot(restored),6);
 assert.equal(resolveFilamentAssignment(restored,6),null);
 assert.equal(resolveFilamentAssignment(restored,7),7);
 assert.equal(nextFilamentSlot(normalizeSlots(original)),undefined);
 assert.equal(nextFilamentSlot([]),1);
 assert.deepEqual(removeFilament([{color:'#ffffff',name:'last',slot:16}],16),[]);
 assert.equal(removeFilament(original,1)[0].slot,2);
 assert.equal(removeFilament(original,16).at(-1)?.slot,15);
});
test('legacy and malformed palettes keep valid original slot identities',async()=>{
 const {normalizeSlots}=await import('../src/filaments.js');
 assert.deepEqual(normalizeSlots([{color:'#ffffff',name:'one'},null,{color:'#000000',name:'three'}]).map(s=>s.slot),[1,3]);
 assert.deepEqual(normalizeSlots([{slot:16,color:'#ffffff',name:'sixteen'},{slot:16,color:'#000000',name:'duplicate'},{slot:17,color:'#000000',name:'outside'}]).map(s=>s.slot),[16]);
});
