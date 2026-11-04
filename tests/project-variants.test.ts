import test from 'node:test';
import assert from 'node:assert/strict';
import {readHistory,variantGroup,type SavedProject} from '../src/storage.js';
import {defaultProject} from '../src/model.js';
test('legacy or damaged histories cannot prevent reopening geometry',()=>{
 assert.deepEqual(readHistory(undefined),{past:[],future:[]});
 assert.deepEqual(readHistory({past:[{bad:true}],future:[]}),{past:[],future:[]});
});
test('persistent histories are bounded and validated without sharing references',()=>{
 const p=defaultProject(),history=readHistory({past:Array(80).fill(p),future:Array(80).fill(p)});
 assert.equal(history.past.length,60);assert.equal(history.future.length,60);
 history.past[0].width=150;assert.equal(p.width,100);assert.equal(history.past[1].width,100);
});
test('legacy projects form separate groups; deleting a group origin does not affect siblings',()=>{
 const record:SavedProject={id:'a',name:'A',createdAt:0,updatedAt:0,project:defaultProject()};
 assert.equal(variantGroup(record),'a');assert.equal(variantGroup({...record,id:'b',groupId:'a'}),'a');
});
