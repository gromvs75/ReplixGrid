import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,resolveWalls,type Side} from '../src/model.js';
import {buildOrganizer} from '../src/kernel.js';
import {decodeSTL} from '../src/stl.js';
import {labelProblem,labelLayout} from '../src/lettering.js';
import {defaultShell} from '../src/shell.js';
import {parseProject} from '../src/editor.js';
import {editProject} from '../src/editor.js';
import {setLevelCount} from '../src/accessories.js';
import {shellForPattern} from '../src/shellSelection.js';
import {buildKit} from '../src/accessoryKernel.js';

for(const side of ['left','right','front','back'] as Side[])for(const mode of ['raised','engraved'] as const)test(`${side}: ${mode} lettering is on the selected wall`,async()=>{
 const p=defaultProject();p.width=140;p.depth=90;p.label={text:'AB',icon:'',mode,side};
 const plain=await buildOrganizer({...p,label:undefined}),part=await buildOrganizer(p),wasm=await Module();wasm.setup();
 const solid=(part:typeof plain)=>{const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const raw=new wasm.Manifold(mesh),placed=raw.translate(part.position);raw.delete();return placed;};
 const original=solid(plain),result=solid(part),difference=mode==='raised'?result.subtract(original):original.subtract(result);
 try{const b=difference.boundingBox();assert.ok(difference.volume()>0.5,'lettering changes real solid');const axis=side==='left'||side==='right'?0:1,expected=side==='left'||side==='front'?0:side==='right'?p.width:p.depth;
  assert.ok(Math.abs((mode==='raised'?(expected===0?b.max[axis]:b.min[axis]):(expected===0?b.min[axis]:b.max[axis]))-expected)<.1,`ink touches wall ${side}`);
 }finally{difference.delete();result.delete();original.delete();}
});

test('label checks selected panel, wall length, and saved legacy side',()=>{
 const p=defaultProject();p.width=180;p.depth=90;p.wallThickness=3.2;p.shell={...defaultShell('diamonds'),mode:'panels',sides:['left'],mounts:false};
 assert.ok(labelProblem(p,'left'));assert.equal(labelProblem(p,'front'),'');
 p.label={text:'CABLE',icon:'',mode:'raised',side:'front'};resolveWalls(p);
 assert.equal(parseProject(JSON.stringify(p)).label?.side,'front');
 assert.ok(labelLayout(p).width>0);
});

test('label on a cutout wall works with tiers and panels on other sides',async()=>{
 let p=defaultProject();p.width=180;p.depth=90;p.height=36;p.cutouts={front:{shape:'round',width:.3,depth:8,position:.5}};
 p=setLevelCount(p,2);p=editProject(p,d=>{d.shell=shellForPattern(d,'diamonds');});
 p=editProject(p,d=>{d.label={text:'TEST',icon:'',mode:'raised',font:'sans',side:'front'};});
 const kit=await buildKit(p);assert.equal(kit.filter(part=>part.kind==='organizer').length,2);assert.equal(kit.filter(part=>part.kind==='shell').length,2);
});
