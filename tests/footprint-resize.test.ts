import {test} from 'node:test';
import assert from 'node:assert/strict';
import {resizeFootprint} from '../src/editor.js';
import {organizerTemplate} from '../src/templates.js';
import {useEditor} from '../src/store.js';

test('reducing capsule depth limits its radius and preserves the original project',()=>{
  const p=organizerTemplate('capsule','flat');
  const next=resizeFootprint(p,'depth',60);
  assert.equal(next.depth,60);
  assert.equal(next.cornerRadius,30);
  assert.equal(p.depth,90);
  assert.equal(p.cornerRadius,45);
});
test('resizing preserves a radius that fits and keeps a circle circular',()=>{
  const p=organizerTemplate('rounded','flat');
  assert.equal(resizeFootprint(p,'depth',70).cornerRadius,12);
  const circle=resizeFootprint(organizerTemplate('circle','flat'),'depth',120);
  assert.equal(circle.width,120);
  assert.equal(circle.depth,120);
});
test('failed resize remains visible after selection and a valid edit clears the error',()=>{
  const p=organizerTemplate('rounded','flat');
  useEditor.setState({project:p,past:[],future:[],gesture:null,error:''});
  useEditor.getState().change(p=>resizeFootprint(p,'depth',1));
  const error=useEditor.getState().error;
  assert.ok(error);
  assert.equal(useEditor.getState().project,p);
  useEditor.getState().select({type:'none',id:''});
  assert.equal(useEditor.getState().error,error);
  useEditor.getState().change(p=>resizeFootprint(p,'depth',70));
  assert.equal(useEditor.getState().error,'');
  assert.equal(useEditor.getState().project.depth,70);
});
