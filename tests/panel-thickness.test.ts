import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,resolveWalls} from '../src/model.js';
import {defaultShell} from '../src/shell.js';
import {editProject,parseProject,regions} from '../src/editor.js';
import {setLevelCount,switchLevel,levelProject} from '../src/accessories.js';
test('unmounted panels preserve wall thickness and compartment dimensions on edits and import',()=>{
 const original={...defaultProject(),wallThickness:2.4,floorThickness:2};
 let p=editProject(original,d=>{d.shell={...defaultShell('waves'),mode:'panels',mounts:false};});
 assert.deepEqual(regions(p),regions(original));assert.equal(p.wallThickness,2.4);
 p=parseProject(JSON.stringify(p));assert.equal(p.wallThickness,2.4);
 p=setLevelCount(p,2);p=switchLevel(p,1);
 assert.equal(p.wallThickness,2.4);assert.equal(levelProject(p,0).wallThickness,2.4);
 assert.equal(editProject(p,d=>{d.wallThickness=2;}).wallThickness,2);
});
test('hidden mounts require explicit adequate wall thickness without silently resizing compartments',()=>{
 const p=defaultProject();p.shell={...defaultShell('waves'),mode:'panels',mounts:true};
 assert.throws(()=>resolveWalls(p),/3,2/);assert.throws(()=>parseProject(JSON.stringify(p)),/3,2/);
 assert.throws(()=>editProject(p,()=>{}),/3,2/);assert.equal(p.wallThickness,2);
 p.wallThickness=3.2;assert.doesNotThrow(()=>resolveWalls(p));
 assert.throws(()=>editProject(p,d=>{d.wallThickness=2.4;}),/3,2/);
});
test('tier panel offset below collar clearance is rejected on active and stored tiers',()=>{
 let p=defaultProject();p.shell={...defaultShell('waves'),mode:'panels',mounts:false,margin:3};p=setLevelCount(p,2);
 assert.throws(()=>editProject(p,d=>{d.shell!.margin=2;}),/не меньше 3 мм/);
 p.stack!.levels[1].settings!.shell!.margin=2;
 assert.throws(()=>parseProject(JSON.stringify(p)),/не меньше 3 мм/);
});
