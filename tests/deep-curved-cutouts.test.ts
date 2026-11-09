import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Project} from '../src/model.js';
import {splitCell} from '../src/editor.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {decodeSTL,inspectSurface} from '../src/stl.js';
import {formatExport,indexedMesh} from '../src/exportFormats.js';

function project(width:number,footprint:'circle'|'oval',style:'round'|'chamfer'):Project{
 const p=splitCell({...defaultProject(),width,depth:footprint==='circle'?width:width*.73,height:120,cornerRadius:0,wallThickness:2,floorThickness:2,footprint},'root','y');
 p.shell={pattern:'cellular',gap:.2,thickness:1.6,size:12,border:2};
 p.topEdge={style,size:.5};
 p.cutouts={front:{shape:'smooth',width:.5,depth:72,position:.5}};
 return p;
}
function assertConnected(stl:ArrayBuffer){
 const {vertices,faces}=indexedMesh(stl),parent=vertices.map((_,i)=>i);
 const root=(i:number):number=>parent[i]===i?i:(parent[i]=root(parent[i]));
 for(const [a,b,c] of faces){parent[root(b)]=root(a);parent[root(c)]=root(a);}
 assert.equal(new Set(vertices.map((_,i)=>root(i))).size,1,'serialized mesh is one connected component');
 inspectSurface(decodeSTL(stl));
}
for(const footprint of ['circle','oval'] as const)for(const style of ['round','chamfer'] as const)for(const width of [140,140.13]){
 test(`${footprint} ${width} mm: deep cutout with ${style} edge remains connected in exported STL`,async()=>{
  const p=project(width,footprint,style),plain=await buildOrganizer({...p,topEdge:undefined}),finished=await buildOrganizer(p);
  assertConnected(finished.stl);
  assert.ok(finished.inspection.volume<plain.inspection.volume,'edge finishing removes material');
  assert.ok(finished.inspection.volume>plain.inspection.volume*.99,'does not lose a wall or floor');
  assert.equal(finished.inspection.bounds.min[2],0);
  assert.equal(finished.inspection.bounds.max[2],120);
 });
}
test('reported round tray exports with its cellular sleeve in STL, 3MF and OBJ',async()=>{
 const p=project(140,'circle','round');
 const organizer=await buildOrganizer(p),shell=await buildShell(p);assertConnected(shell.stl);
 const parts=[{name:'organizer',stl:organizer.stl,color:'#ff7928'},{name:'shell',stl:shell.stl,color:'#f7f7f7'}];
 for(const format of ['stl','3mf','obj'] as const){const file=formatExport(parts,format);assert.ok(file.data.byteLength>1000);}
 const model=new TextDecoder().decode(formatExport(parts,'3mf').data);
 assert.match(model,/name="organizer"/);assert.match(model,/name="shell"/);
});
