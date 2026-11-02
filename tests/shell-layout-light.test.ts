import {test} from 'node:test';
import assert from 'node:assert/strict';
import {organizerTemplate} from '../src/templates.js';
import {defaultShell,shellLayout} from '../src/shell.js';
for(const shape of ['rounded','circle','oval','honeycomb'] as const)test(`${shape}: lightweight UI layout keeps dimensions and profiles`,()=>{
 const p=organizerTemplate(shape,'slope');p.shell=defaultShell('petals');
 const full=shellLayout(p),light=shellLayout(p,false);
 for(const key of ['width','depth','height','innerWidth','innerDepth','outerRadius','innerRadius'] as const)assert.equal(light[key],full[key]);
 assert.deepEqual(light.panels.map(({holes,...panel})=>panel),full.panels.map(({holes,...panel})=>panel));
 assert.equal(light.holes,0);assert.ok(full.holes>0);
});
