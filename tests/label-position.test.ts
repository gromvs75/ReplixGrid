import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject} from '../src/model.js';
import {labelLayout,validateLabel} from '../src/lettering.js';

test('label position preserves legacy placement and spans usable wall height',()=>{
 const p=defaultProject();p.label={text:'TEST',icon:'',mode:'raised',font:'sans',size:6};
 const legacy=labelLayout(p);
 p.label.position=0;assert.deepEqual(labelLayout(p),legacy);
 p.label.position=100;const top=labelLayout(p);
 p.label.position=50;const middle=labelLayout(p);
 assert.ok(Math.abs(middle.bottom-(legacy.bottom+top.bottom)/2)<1e-8);
 assert.equal(top.height,legacy.height);
 assert.ok(top.bottom>legacy.bottom);
 p.cutouts={left:{shape:'round',width:20,depth:5,position:50}};
 const cut=labelLayout(p);assert.ok(cut.bottom<middle.bottom);
});

test('invalid label positions are rejected',()=>{
 const p=defaultProject();p.label={text:'TEST',icon:'',mode:'raised',font:'sans',size:6};
 for(const position of [-1,101,NaN,Infinity]){
  p.label.position=position;assert.throws(()=>validateLabel(p),/0 до 100/);
 }
});
