import {test} from 'node:test';
import assert from 'node:assert/strict';
import {organizerTemplate} from '../src/templates.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {defaultShell} from '../src/shell.js';
import {parseProject} from '../src/editor.js';
for(const shape of ['rounded','capsule','circle','oval','honeycomb'] as const)for(const heights of ['flat','slope','steps'] as const)test(`${shape} ${heights}: editable template and watertight organizer/sleeve export`,async()=>{
 const p=organizerTemplate(shape,heights);assert.deepEqual(parseProject(JSON.stringify(p)),JSON.parse(JSON.stringify(p)));
 const a=await buildOrganizer(p);assert.ok(a.inspection.volume>0);assert.ok(Math.abs(a.inspection.bounds.max[0]-p.width)<.01);assert.ok(Math.abs(a.inspection.bounds.max[1]-p.depth)<.01);
 p.shell=defaultShell('diamonds');const b=await buildShell(p);assert.ok(b.inspection.volume>0);
});
