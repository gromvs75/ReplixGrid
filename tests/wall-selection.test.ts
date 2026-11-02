import {defaultProject} from '../src/model.js';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {STLLoader} from 'three/addons/loaders/STLLoader.js';
import {organizerTemplate} from '../src/templates.js';
import {buildOrganizer} from '../src/kernel.js';
import {boundarySelections,boundarySide} from '../src/wallSelection.js';
for(const shape of ['rounded','capsule','circle','oval'] as const)test(`${shape}: wall selection stays on actual curved surfaces and endpoints`,async()=>{
 const p=organizerTemplate(shape,'slope');p.transitionStyles={front:'wavy',back:'wavy'};
 const built=await buildOrganizer(p),source=new STLLoader().parse(built.stl),surfaces=boundarySelections(p,source);
 try{
  const positions=source.getAttribute('position'),original=new Set<string>();
  for(let i=0;i<positions.count;i++)original.add([positions.getX(i),positions.getY(i),positions.getZ(i)].join(','));
  for(const selection of surfaces){
   const vertices=selection.geometry.getAttribute('position');assert.ok(vertices.count>0,selection.side);
   for(let i=0;i<vertices.count;i++){const point=[vertices.getX(i),vertices.getY(i),vertices.getZ(i)];assert.ok(original.has(point.join(',')),'highlight contains a point outside the real model');}
   if(shape==='rounded'&&selection.side==='front')for(let i=0;i<vertices.count;i+=3)assert.ok((vertices.getY(i)+vertices.getY(i+1)+vertices.getY(i+2))/3<14,'internal divider must not be highlighted as an outer wall');
   for(const end of [selection.start,selection.end])assert.ok(original.has(end.join(',')),'endpoint must be on the actual wall');
   const axis=['front','back'].includes(selection.side)?0:1;
   assert.ok(selection.start[axis]<selection.end[axis],'A and B follow fixed model axes');
  }
 }finally{surfaces.forEach(s=>s.geometry.dispose());source.dispose();}
});
test('capsule end belongs to its whole curved side rather than an imaginary rectangle',()=>{
 const p=organizerTemplate('capsule','flat');
 assert.equal(boundarySide(p,10,10),'left');assert.equal(boundarySide(p,10,80),'left');
 assert.equal(boundarySide(p,170,10),'right');assert.equal(boundarySide(p,170,80),'right');
 assert.equal(boundarySide(p,90,0),'front');assert.equal(boundarySide(p,90,90),'back');
});

test('dense relief selection stays within the perimeter without oversized argument lists',async()=>{
 const p=defaultProject();p.width=180;p.depth=140;p.height=70;p.cornerRadius=20;p.relief={pattern:'waffle',spacing:6,depth:.8};
 const built=await buildOrganizer(p),geometry=new STLLoader().parse(built.stl);
 const selections=boundarySelections(p,geometry);
 try{for(const s of selections){assert.ok(s.geometry.getAttribute('position').count>0);assert.ok(s.start.every(Number.isFinite)&&s.end.every(Number.isFinite));}}
 finally{geometry.dispose();selections.forEach(s=>s.geometry.dispose());}
});

test('leaned outer walls remain selectable on the actual mesh',async()=>{
 const p=organizerTemplate('rounded','slope');p.tilt=25;
 const built=await buildOrganizer(p),source=new STLLoader().parse(built.stl);source.translate(...built.position);
 const selections=boundarySelections(p,source);
 try{for(const s of selections)assert.ok(s.geometry.getAttribute('position').count>0,s.side);}finally{source.dispose();selections.forEach(s=>s.geometry.dispose());}
});
test('honeycomb outside surfaces select their own cells rather than an entire side',async()=>{
 const p=organizerTemplate('honeycomb','steps'),built=await buildOrganizer(p),geometry=new STLLoader().parse(built.stl),selections=boundarySelections(p,geometry);
 try{assert.equal(selections.length,7);assert.deepEqual(selections.map(s=>s.cellId),Array.from({length:7},(_,i)=>`honey-${i}`));assert.ok(selections.filter(s=>s.geometry.getAttribute('position').count>0).length>=6);}
 finally{geometry.dispose();selections.forEach(s=>s.geometry.dispose());}
});
for(const shape of ['rounded','circle','oval'] as const)test(`${shape} stepped contour is selectable by level`,async()=>{
 const p=organizerTemplate(shape,'steps'),built=await buildOrganizer(p),geometry=new STLLoader().parse(built.stl),selections=boundarySelections(p,geometry);
 try{for(const side of ['front','back']){const steps=selections.filter(s=>s.side===side&&s.stepIndex!==undefined);assert.equal(steps.length,3);assert.ok(steps.every(s=>s.geometry.getAttribute('position').count>0));}}
 finally{geometry.dispose();selections.forEach(s=>s.geometry.dispose());}
});
