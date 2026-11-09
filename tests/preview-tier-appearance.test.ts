import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject} from '../src/model.js';
import {setLevelCount,switchLevel} from '../src/accessories.js';
import {previewLevelProject,partColor,insertColor} from '../src/appearance.js';

test('retained preview uses its source for a tier removed by opening a smaller stack',()=>{
 let previous=setLevelCount(defaultProject(),3);
 previous=switchLevel(previous,2);
 previous.colors={organizer:'#123456',shell:'#abcdef'};
 const cellId=previous.root.id;
 previous.cups=[{cellId,shape:'fitted',height:5,color:'#654321'}];
 previous=switchLevel(previous,0);
 const current=setLevelCount(defaultProject(),2);
 const resolved=previewLevelProject(current,previous,2);
 assert.equal(partColor(resolved,'shell'),'#abcdef');
 assert.equal(insertColor(resolved,cellId),'#654321');
});
test('existing preview tiers still follow current color edits immediately',()=>{
 const previous=setLevelCount(defaultProject(),2),current=structuredClone(previous);
 current.colors={organizer:'#112233'};
 assert.equal(partColor(previewLevelProject(current,previous,0),'organizer'),'#112233');
});
test('opening a single tray or starting without a preview is safe',()=>{
 const previous=setLevelCount(defaultProject(),3),current=defaultProject();
 assert.equal(previewLevelProject(current,previous,2).stack,undefined);
 assert.equal(previewLevelProject(current,null,0),current);
});
