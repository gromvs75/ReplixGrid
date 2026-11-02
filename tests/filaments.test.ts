import test from 'node:test';
import assert from 'node:assert/strict';
import {slotMap} from '../src/filaments.js';
test('matching uses the saved slot order and rejects ambiguous colors',()=>{
 assert.deepEqual(slotMap([{name:'White',color:'#FFFFFF'},{name:'Black',color:'#171a1b'}]),{'#ffffff':1,'#171a1b':2});
 assert.deepEqual(slotMap([{name:'a',color:'#ffffff'},{name:'b',color:'#FFFFFF'},{name:'c',color:'#008ac8'}]),{'#008ac8':3});
});
