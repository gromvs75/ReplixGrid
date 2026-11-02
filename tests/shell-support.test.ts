import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject} from '../src/model.js';
import {defaultShell} from '../src/shell.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {decodeSTL} from '../src/stl.js';
import {hasShellSupport,shellSupportWidth,SHELL_SUPPORT_HEIGHT} from '../src/shellSupport.js';

for(const style of ['square','round','chamfer'] as const)test(`${style}: sleeve rests on ledge and can lift off without collisions`,async()=>{
 const p=defaultProject();p.shell=defaultShell('diamonds');p.cornerRadius=style==='square'?0:8;p.cornerStyle=style==='chamfer'?'chamfer':'round';
 const tray=await buildOrganizer(p),sleeve=await buildShell(p);assert.equal(shellSupportWidth(p),2.1);
 assert.ok(Math.abs(tray.inspection.bounds.min[0]+2.1)<.001);assert.ok(Math.abs(sleeve.position[2]-SHELL_SUPPORT_HEIGHT)<.001);
 assert.ok(Math.abs(sleeve.position[2]+sleeve.inspection.bounds.max[2]-p.height)<.001);
 const wasm=await Module();wasm.setup();const owned:import('manifold-3d').Manifold[]=[];
 const solid=(stl:ArrayBuffer)=>{const t=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const s=new wasm.Manifold(mesh);owned.push(s);return s;};
 try{const a=solid(tray.stl),b=solid(sleeve.stl);for(const dz of [0,5,35]){const moved=b.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]+dz]);owned.push(moved);const overlap=a.intersect(moved);owned.push(overlap);assert.ok(overlap.volume()<.001);}
 const below=b.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]-.2]);owned.push(below);const blocked=a.intersect(below);owned.push(blocked);assert.ok(blocked.volume()>.1,'ledge must support the sleeve');
 }finally{owned.reverse().forEach(s=>s.delete());}
});
test('ledge tracks sleeve size and is omitted for panels, stacks and unsupported features',()=>{
 const p=defaultProject();p.shell={...defaultShell('waves'),gap:.8,thickness:2};assert.equal(shellSupportWidth(p),2.8);assert.ok(hasShellSupport(p));
 assert.equal(hasShellSupport({...p,tilt:10}),false);assert.equal(hasShellSupport({...p,relief:{pattern:'ribs',spacing:8,depth:1}}),true);
 assert.equal(hasShellSupport({...p,printing:{parts:2,bedWidth:270,bedDepth:270,bedHeight:270}}),false);
 assert.equal(hasShellSupport({...p,shell:{...p.shell,mode:'panels'}}),false);
});

for(const shape of ['rounded','capsule','circle','oval','honeycomb'] as const)for(const profile of ['flat','slope','steps'] as const)test(`${shape} ${profile}: automatic ledge supports the removable sleeve`,async()=>{
 const {organizerTemplate}=await import('../src/templates.js');
 const p=organizerTemplate(shape,profile);p.shell=defaultShell('diamonds');
 assert.ok(hasShellSupport(p));const tray=await buildOrganizer(p),sleeve=await buildShell(p);assert.ok(Math.abs(sleeve.position[2]-SHELL_SUPPORT_HEIGHT)<.002);
 const wasm=await Module();wasm.setup();const owned:import('manifold-3d').Manifold[]=[];
 const keep=(m:import('manifold-3d').Manifold)=>{owned.push(m);return m;};
 const make=(stl:ArrayBuffer)=>{const triangles=decodeSTL(stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(triangles.flat().map((_,i)=>i))});mesh.merge();return keep(new wasm.Manifold(mesh));};
 try{const body=make(tray.stl),shell=make(sleeve.stl);for(const dz of [0,5,80]){const positioned=keep(shell.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]+dz]));assert.ok(Math.abs(keep(body.intersect(positioned)).volume())<.01,`collision at ${dz}`);}const lower=keep(shell.translate([sleeve.position[0],sleeve.position[1],sleeve.position[2]-.2]));assert.ok(keep(body.intersect(lower)).volume()>.1,'ledge must stop sleeve');}finally{owned.reverse().forEach(m=>m.delete());}
});
