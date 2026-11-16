import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject} from '../src/model.js';
import {defaultGridfinity,gridfinityColor} from '../src/gridfinity.js';
import {defaultModelColor,partColor,insertColor,lidBaseColor} from '../src/appearance.js';
test('generated parts share the initial color without replacing explicit colors',()=>{
 const p=defaultProject();
 assert.equal(defaultModelColor,'#95B9C6');
 for(const color of [partColor(p,'organizer'),partColor(p,'shell'),insertColor(p),lidBaseColor(p),gridfinityColor(defaultGridfinity(),'tray'),gridfinityColor(defaultGridfinity(),'plate')])assert.equal(color,defaultModelColor);
 p.colors={organizer:'#123456',shell:'#abcdef'};
 assert.equal(partColor(p,'organizer'),'#123456');assert.equal(partColor(p,'shell'),'#abcdef');
 assert.equal(gridfinityColor({...defaultGridfinity(),colors:{tray:'#123456'}},'tray'),'#123456');
});
