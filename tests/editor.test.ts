import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject} from '../src/model.js';
import {editProject,parseProject,regions,splitCell} from '../src/editor.js';
import {useEditor} from '../src/store.js';
test('equal subdivisions account for thickness across 2 to 6 compartments',()=>{
  for(let n=2;n<=6;n++){const p=splitCell(defaultProject(),'root','x',n);const cells=regions(p).filter(r=>!r.cell.split);assert.equal(cells.length,n);for(const c of cells)assert.ok(Math.abs(c.width-(96-(n-1)*2)/n)<1e-9);}
});
test('rejected edits leave original project intact',()=>{
  const p=splitCell(defaultProject(),'root','x',6),before=JSON.stringify(p);assert.throws(()=>editProject(p,d=>{d.width=8;}));assert.equal(JSON.stringify(p),before);
});
test('a continuous gesture creates exactly one undo step and supports redo',()=>{
  useEditor.setState({project:defaultProject(),past:[],future:[],gesture:null});
  const editor=useEditor.getState();editor.begin();for(const width of [110,120,140])editor.change(p=>editProject(p,d=>{d.width=width;}));editor.end();
  assert.equal(useEditor.getState().past.length,1);editor.undo();assert.equal(useEditor.getState().project.width,100);editor.redo();assert.equal(useEditor.getState().project.width,140);
});
test('invalid imported projects do not replace current state',()=>{
  assert.throws(()=>parseProject('{"schemaVersion":2}'));
  assert.throws(()=>parseProject('{"schemaVersion":1,"units":"mm"}'));
  const p=defaultProject();assert.deepEqual(parseProject(JSON.stringify(p)),p);
});
