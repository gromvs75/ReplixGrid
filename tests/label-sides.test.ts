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

for(const footprint of ['circle','oval'] as const)for(const side of ['front','back','left','right'] as Side[])for(const mode of ['raised','engraved'] as const)test(`${footprint} ${side}: curved ${mode} text and icon export as a solid`,async()=>{
 const p=defaultProject();p.footprint=footprint;p.width=120;p.depth=footprint==='circle'?120:80;p.cornerRadius=0;
 p.label={text:'AB',icon:'★',font:'sans',size:7,depth:.6,mode,side,position:50};
 assert.equal(labelProblem(p,side),'');resolveWalls(p);
 const plain=await buildOrganizer({...p,label:undefined}),part=await buildOrganizer(p);
 const wasm=await Module();wasm.setup();
 const solid=(part:typeof plain)=>{const t=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();return new wasm.Manifold(mesh);};
 const a=solid(plain),b=solid(part);
 try{assert.equal(b.status(),'NoError');const components=b.decompose();try{assert.equal(components.length,1,'no detached letters');}finally{components.forEach(c=>c.delete());}
 assert.ok(mode==='raised'?b.volume()>a.volume()+1:b.volume()<a.volume()-1,'export contains lettering');
 }finally{a.delete();b.delete();}
 assert.deepEqual(parseProject(JSON.stringify(p)).label,p.label);
});

test('curved Cyrillic and heart below a cutout survive 3MF mesh export',async()=>{
 const {formatExport,indexedMesh}=await import('../src/exportFormats.js');
 const p=defaultProject();p.footprint='oval';p.width=160;p.depth=100;p.height=50;p.cornerRadius=0;
 p.cutouts={front:{shape:'round',width:.3,depth:8,position:.5}};
 p.label={text:'Кабели',icon:'♥',font:'sans',mode:'raised',side:'front',size:7,position:100};
 const part=await buildOrganizer(p),indexed=indexedMesh(part.stl);
 assert.equal(indexed.faces.length,decodeSTL(part.stl).length);
 const archive=formatExport([{name:'Curved label',stl:part.stl,color:'#8fb5a5'}],'3mf');
 const data=new DataView(archive.data);let at=0,xml='';
 while(data.getUint32(at,true)===0x04034b50){const size=data.getUint32(at+18,true),n=data.getUint16(at+26,true),extra=data.getUint16(at+28,true),start=at+30+n+extra;
 const name=new TextDecoder().decode(archive.data.slice(at+30,at+30+n));if(name==='3D/3dmodel.model')xml=new TextDecoder().decode(archive.data.slice(start,start+size));at=start+size;}
 assert.equal((xml.match(/<triangle /g)??[]).length,indexed.faces.length);assert.match(xml,/unit="millimeter"/);
});

for(const mode of ['raised','engraved'] as const)test(`curved ${mode} label remains available with linked heights and a front cutout`,async()=>{
 const p=defaultProject();p.footprint='circle';p.width=150;p.depth=150;p.height=36;
 p.heights={front:52.4,back:60};p.transitions=['left','right'];
 p.cutouts={front:{shape:'round',width:.3,depth:8,position:.5}};
 p.label={text:'Кабели',icon:'♥',font:'sans',mode,side:'front',size:7,position:100};
 assert.equal(labelProblem(p),'');assert.ok(labelLayout(p).bottom>28);
 const part=await buildOrganizer(p),wasm=await Module();wasm.setup();
 const triangles=decodeSTL(part.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(triangles.flat().map((_,i)=>i))});mesh.merge();
 const solid=new wasm.Manifold(mesh);
 try{assert.equal(solid.status(),'NoError');const pieces=solid.decompose();try{assert.equal(pieces.length,1);}finally{pieces.forEach(p=>p.delete());}}finally{solid.delete();}
 p.transitions=[];p.wallProfiles={front:{start:32,end:60,style:'straight'}};
 assert.equal(labelProblem(p),'');assert.ok(labelLayout(p).bottom>24);
 await buildOrganizer(p);
});

test('curved label cache follows position, size and text changes in the exported solid',async()=>{
 const p=defaultProject();p.footprint='circle';p.width=150;p.depth=150;p.height=60;
 p.label={text:'AB',icon:'',font:'sans',mode:'raised',side:'front',size:7,position:0};
 const bounds=[];
 for(const [position,size,text] of [[0,7,'AB'],[100,7,'AB'],[50,10,'AB'],[50,10,'CD']] as const){
  p.label={...p.label,position,size,text};const part=await buildOrganizer(p);
  // Vertices beyond the plain circular wall belong to the raised inscription.
  const ink=decodeSTL(part.stl).flat().map(v=>v.map((x,i)=>x+part.position[i])).filter(v=>Math.hypot(v[0]-75,v[1]-75)>75.1);
  assert.ok(ink.length>10);
  const box={min:[0,1,2].map(a=>Math.min(...ink.map(v=>v[a]))),max:[0,1,2].map(a=>Math.max(...ink.map(v=>v[a])))};
  assert.ok(Math.abs(box.max[2]-box.min[2]-size)<.01);
  bounds.push(box);
 }
 assert.ok(bounds[1].min[2]>bounds[0].min[2]+30,'position moves real printed letters');
 assert.notDeepEqual(bounds[2],bounds[3],'text change invalidates cached ink');
});

test('letter size limit accounts for available wall width and cutout height',()=>{
 const p=defaultProject();p.footprint='circle';p.width=120;p.depth=120;p.height=36;
 p.cutouts={front:{shape:'round',width:.3,depth:12,position:.5}};
 p.label={text:'Кабели',icon:'♥',font:'sans',mode:'raised',side:'front',size:30};
 const metrics=labelLayout(p,true);assert.ok(metrics.maxSize<30);
 p.label.size=Math.floor(metrics.maxSize*100)/100;assert.doesNotThrow(()=>resolveWalls(p));
 p.label.size=metrics.maxSize+.1;assert.throws(()=>resolveWalls(p));
});


test('tall front inscription uses local height despite lower walls and a remote cutout',async()=>{
 const p=defaultProject();p.footprint='circle';p.width=250;p.depth=250;p.height=36;
 p.heights={front:52.4,back:24};p.cutouts={front:{shape:'round',width:.3,depth:15,position:.5},back:{shape:'round',width:.3,depth:20,position:.5}};
 p.label={text:'ReplixGrid',icon:'',font:'sans',mode:'raised',side:'front',size:12,position:0};
 assert.ok(labelLayout(p,true).maxSize>15);
 const bottoms=[];
 for(const position of [0,50,100]){
  p.label={...p.label,position};const layout=labelLayout(p);bottoms.push(layout.bottom);
  const part=await buildOrganizer(p);
  const ink=decodeSTL(part.stl).flat().map(v=>v.map((x,i)=>x+part.position[i])).filter(v=>Math.hypot(v[0]-125,v[1]-125)>125.1);
  assert.ok(ink.length>10);
  const low=Math.min(...ink.map(v=>v[2])),high=Math.max(...ink.map(v=>v[2]));
  assert.ok(Math.abs(low-layout.bottom)<.05);assert.ok(Math.abs(high-low-12)<.05);
 }
 assert.ok(bottoms[2]-bottoms[0]>15);
 assert.ok(Math.abs(bottoms[1]-(bottoms[0]+bottoms[2])/2)<.001);
});
