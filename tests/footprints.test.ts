import {test} from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {organizerTemplate} from '../src/templates.js';
import {footprintContour} from '../src/footprint.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {defaultShell} from '../src/shell.js';
import {decodeSTL} from '../src/stl.js';
import {parseProject,splitCell,regions} from '../src/editor.js';
for(const shape of ['circle','oval','honeycomb'] as const)test(`${shape}: constant normal clearance, all patterns and collision-free assembly`,async()=>{
 const p=organizerTemplate(shape,'slope');p.shell=defaultShell('waves');p.shell.gap=.2;
 const base=footprintContour(p),inside=footprintContour(p,.2);
 for(let i=0;i<base.length;i++){const j=(i+1)%base.length,dx=base[j][0]-base[i][0],dy=base[j][1]-base[i][1];const distance=Math.abs(dx*(inside[i][1]-base[i][1])-dy*(inside[i][0]-base[i][0]))/Math.hypot(dx,dy);assert.ok(Math.abs(distance-.2)<1e-7);}
 const wasm=await Module();wasm.setup();const owned:{delete():void}[]=[];
 const body=(stl:ArrayBuffer)=>{const triangles=decodeSTL(stl),m=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(Array.from({length:triangles.length*3},(_,i)=>i))});m.merge();const result=new wasm.Manifold(m);owned.push(result);return result;};
 try{const insert=body((await buildOrganizer(p)).stl);for(const pattern of ['honeycomb','diamonds','waves'] as const){p.shell.pattern=pattern;const built=await buildShell(p),sleeve=body(built.stl);const placed=sleeve.translate(built.position);owned.push(placed);const overlap=insert.intersect(placed);owned.push(overlap);assert.ok(overlap.volume()<.001);}}
 finally{owned.reverse().forEach(a=>a.delete());}
});
test('curved projects remain editable, round-trip and reject unsupported shape data',async()=>{
 let p=organizerTemplate('oval','flat');p=splitCell(p,regions(p).find(r=>!r.cell.split)!.cell.id,'y');p.width=220;p.depth=120;
 assert.deepEqual(parseProject(JSON.stringify(p)),JSON.parse(JSON.stringify(p)));assert.ok((await buildOrganizer(p)).inspection.volume>0);
 assert.throws(()=>parseProject(JSON.stringify({...p,footprint:'triangle'})));
 const honey=organizerTemplate('honeycomb','flat');honey.honeycombHeights=[90,30,40,50,60,70,80];assert.equal((await buildOrganizer(honey)).inspection.bounds.max[2],90);
});
