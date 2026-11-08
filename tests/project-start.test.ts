import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyOrganizer} from '../src/projectStart.js';
import {defaultProject} from '../src/model.js';
import {parseProject} from '../src/editor.js';
for(const shape of ['rounded','capsule','circle','oval','honeycomb'] as const)test(`new ${shape} starts without partitions or inherited decoration`,()=>{
 const old=defaultProject();old.printArea={bedWidth:220,bedDepth:220,bedHeight:250,printerId:'custom'};old.colors={organizer:'#123456'};
 const snapshot=JSON.stringify(old),p=emptyOrganizer(shape,old);
 assert.equal(p.root.split,undefined);assert.equal(p.lid,undefined);assert.equal(p.shell,undefined);assert.equal(p.stack,undefined);
 assert.deepEqual(p.printArea,old.printArea);assert.equal(JSON.stringify(old),snapshot);assert.doesNotThrow(()=>parseProject(JSON.stringify(p)));
});
