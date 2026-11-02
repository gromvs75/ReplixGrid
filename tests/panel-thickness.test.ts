import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,resolveWalls} from '../src/model.js';
import {defaultShell} from '../src/shell.js';
import {editProject,parseProject} from '../src/editor.js';
test('panels upgrade thin walls, retain dimensions and cannot be thinned while active',()=>{
 const original=defaultProject();
 const p=editProject(original,d=>{d.shell={...defaultShell('waves'),mode:'panels',mounts:true};});
 assert.equal(original.wallThickness,2);assert.equal(p.wallThickness,3.2);
 assert.equal(p.width,original.width);assert.equal(p.depth,original.depth);
 assert.equal(editProject(p,d=>{d.wallThickness=1;}).wallThickness,3.2);
 assert.equal(editProject(p,d=>{d.wallThickness=4;}).wallThickness,4);
 assert.equal(editProject(p,d=>{delete d.shell;d.wallThickness=2;}).wallThickness,2);
});
test('legacy panel projects are upgraded before validation; direct thin mounted export is rejected',()=>{
 const p=defaultProject();p.shell={...defaultShell('waves'),mode:'panels',mounts:true};
 assert.throws(()=>resolveWalls(p),/3,2/);
 const restored=parseProject(JSON.stringify(p));assert.equal(restored.wallThickness,3.2);assert.equal(restored.shell?.mounts,true);
});
