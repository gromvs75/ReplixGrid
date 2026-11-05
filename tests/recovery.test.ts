import test from 'node:test';
import assert from 'node:assert/strict';
import {writeRecovery,readRecovery,clearRecovery} from '../src/recovery.js';
test('an earlier successful save cannot clear a newer pending snapshot',()=>{
 const values=new Map<string,string>();
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>values.set(k,v),removeItem:(k:string)=>values.delete(k)}});
 try{const old=writeRecovery('test',{width:100}),latest=writeRecovery('test',{width:120});clearRecovery('test',old);assert.deepEqual(readRecovery('test'),{width:120});clearRecovery('test',latest);assert.equal(readRecovery('test'),null);}finally{Reflect.deleteProperty(globalThis,'localStorage');}
});
test('blocked recovery storage and malformed copies do not stop normal database saving',()=>{
 Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw Error('Storage unavailable');}});
 try{assert.equal(writeRecovery('test',{}),null);assert.equal(readRecovery('test'),null);assert.doesNotThrow(()=>clearRecovery('test','old'));}finally{Reflect.deleteProperty(globalThis,'localStorage');}
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:()=>'{broken'}});
 try{assert.equal(readRecovery('test'),null);}finally{Reflect.deleteProperty(globalThis,'localStorage');}
});
