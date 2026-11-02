import {test} from 'node:test';
import assert from 'node:assert/strict';
import {organizerTemplate} from '../src/templates.js';
import {changeCompartmentCount,regions,parseProject} from '../src/editor.js';
import {honeyCells} from '../src/footprint.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {defaultShell,shellLayout} from '../src/shell.js';
for(const shape of ['rounded','capsule','circle','oval','honeycomb'] as const)test(`${shape}: add/remove, petals, tilt on flat base export`,async()=>{
 let p=organizerTemplate(shape,'slope');const n=regions(p).filter(r=>!r.cell.split).length;p=changeCompartmentCount(p,1);assert.equal(regions(p).filter(r=>!r.cell.split).length,n+1);p=changeCompartmentCount(p,-1);assert.equal(regions(p).filter(r=>!r.cell.split).length,n);
 p.shell=defaultShell('petals');p.tilt=18;assert.deepEqual(parseProject(JSON.stringify(p)),JSON.parse(JSON.stringify(p)));
 const a=await buildOrganizer(p),b=await buildShell(p);assert.equal(a.inspection.bounds.min[2],0);assert.equal(b.inspection.bounds.min[2],0);assert.ok(a.inspection.volume>0&&b.inspection.volume>0);
});
test('honeycomb 1 to 19 preserves cell size and exports each boundary',async()=>{
 let p=organizerTemplate('honeycomb','flat');while((p.honeycombCount??7)>1)p=changeCompartmentCount(p,-1);
 const size=()=>{const cell=honeyCells(p)[0];return Math.hypot(cell[0][0]-cell[1][0],cell[0][1]-cell[1][1]);};const initial=size();
 for(let n=1;n<=19;n++){assert.equal(honeyCells(p).length,n);assert.ok(Math.abs(size()-initial)<1e-6);assert.ok((await buildOrganizer(p)).inspection.volume>0);if(n<19)p=changeCompartmentCount(p,1);}
 assert.throws(()=>changeCompartmentCount(p,1));
});
test('pattern reaches above low neighbor on tall honeycomb panels',async()=>{
 const p=organizerTemplate('honeycomb','flat');p.honeycombHeights=[30,120,30,30,30,30,30];p.shell=defaultShell('waves');const layout=shellLayout(p);assert.ok(layout.contourPanels.some(panel=>panel.holes.some(h=>h.some(v=>v[1]>60))));assert.ok((await buildShell(p)).inspection.volume>0);
});
test('tilted insert and sleeve bases do not collide in assembly',async()=>{
 const {default:Module}=await import('manifold-3d');const {decodeSTL}=await import('../src/stl.js');const wasm=await Module();wasm.setup();
 for(const shape of ['rounded','oval','honeycomb'] as const){const p=organizerTemplate(shape,'slope');p.shell=defaultShell('petals');p.tilt=25;const owned:{delete():void}[]=[];
 const from=(built:Awaited<ReturnType<typeof buildOrganizer>>)=>{const triangles=decodeSTL(built.stl),m=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(Array.from({length:triangles.length*3},(_,i)=>i))});m.merge();const body=new wasm.Manifold(m);owned.push(body);const placed=body.translate(built.position);owned.push(placed);return placed;};
 try{const a=from(await buildOrganizer(p)),b=from(await buildShell(p)),overlap=a.intersect(b);owned.push(overlap);assert.ok(overlap.volume()<.01,`${shape}: ${overlap.volume()}`);for(const distance of [1,10,100]){const lifted=a.translate([-Math.sin(25*Math.PI/180)*distance,0,Math.cos(25*Math.PI/180)*distance]);owned.push(lifted);const collision=lifted.intersect(b);owned.push(collision);assert.ok(collision.volume()<.01,`${shape} extraction ${distance}: ${collision.volume()}`);}}finally{owned.reverse().forEach(v=>v.delete());}}
});
