import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject} from '../src/model.js';
import {parseProject} from '../src/editor.js';
import {defaultShell,shellLayout} from '../src/shell.js';
import {buildShell} from '../src/kernel.js';
import Module from 'manifold-3d';
import {decodeSTL} from '../src/stl.js';

for(const pattern of ['cubes','triangles','slots'] as const)test(`${pattern} produces a connected printable shell`,async()=>{
 const p=defaultProject();p.width=80;p.depth=60;p.height=30;p.cornerRadius=6;p.shell={...defaultShell(pattern),border:5};
 assert.equal(parseProject(JSON.stringify(p)).shell?.border,5);
 const layout=shellLayout(p);assert.equal(layout.border,5);assert.ok(layout.holes>0);
 const built=await buildShell(p);assert.ok(built.inspection.volume>0);
 const wasm=await Module();wasm.setup();const tris=decodeSTL(built.stl);
 const mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(tris.flat(2)),triVerts:new Uint32Array(tris.flat().map((_,i)=>i))});mesh.merge();
 const solid=new wasm.Manifold(mesh),pieces=solid.decompose();
 try{assert.equal(pieces.length,1,'shell must remain a single connected piece');}finally{pieces.forEach(v=>v.delete());solid.delete();}
});

test('adjusting the shell border reduces the available patterned area',()=>{
 const p=defaultProject();p.width=100;p.depth=80;p.height=50;p.shell={...defaultShell('diamonds'),border:2};
 const narrow=shellLayout(p);p.shell.border=10;const wide=shellLayout(p);
 assert.equal(narrow.border,2);assert.equal(wide.border,10);assert.ok(wide.holes<narrow.holes);
});
