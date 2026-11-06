import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Project} from '../src/model.js';
import {defaultSvgPattern,type SvgAsset} from '../src/svgPattern.js';
import {buildKit} from '../src/accessoryKernel.js';
import {buildShell} from '../src/kernel.js';
import {buildDecorativePanels} from '../src/decorativePanels.js';
import {parseProject} from '../src/editor.js';
import {captureStyle,parseStyle,previewStyle} from '../src/visualStyles.js';
const asset:SvgAsset={version:1,name:'Diamond',aspect:1,shapes:[[[[.5,0],[1,.5],[.5,1],[0,.5]]]]};
const svg={...defaultSvgPattern(asset),width:8,mode:'repeat' as const,sides:['front','back','left','right'] as const};
const pattern=()=>({...svg,sides:[...svg.sides]});
const lid=(mode:'raised'|'cutout',patch:Partial<Project>={}):Project=>({...defaultProject(),width:60,depth:45,height:30,lid:true,lidDesign:{pattern:'smooth',rimHeight:2,handle:'none',svg:pattern(),svgMode:mode},...patch});
for(const mode of ['raised','cutout'] as const)for(const fit of ['outer','inset'] as const)test(`SVG lid ${mode} ${fit} produces printable parts`,async()=>{
 const p=lid(mode,{cornerRadius:8});p.lidDesign!.fit=fit;
 const parts=await buildKit(p),lids=parts.filter(p=>p.kind==='lid');assert.equal(lids.length,1);
 for(const part of lids)assert.ok(part.inspection.volume>0);
 const plain=await buildKit({...p,lidDesign:{...p.lidDesign!,svg:undefined}});
 if(mode==='cutout')assert.ok(lids[0].inspection.volume<plain.find(p=>p.name==='lid')!.inspection.volume);
});
for(const patch of [{},{cornerRadius:8},{footprint:'oval' as const},{cornerRadius:8,tilt:15},{cornerRadius:8,cutouts:{front:{shape:'round' as const,width:.4,depth:8,position:.5}}}])test(`SVG sleeve closed ${JSON.stringify(patch)}`,async()=>{
 const p:Project={...defaultProject(),width:60,depth:45,height:30,...patch,shell:{pattern:'honeycomb',gap:.5,thickness:1.6,size:12,svg:pattern()}};
 const b=await buildShell(p);assert.ok(b.inspection.volume>0);
});
test('SVG decorative panels retain connected frames and mounts',async()=>{
 const p:Project={...defaultProject(),width:100,depth:70,height:45,wallThickness:3.2,shell:{pattern:'honeycomb',gap:.5,thickness:1.6,size:12,mode:'panels',sides:['front','back'],mounts:true,svg:pattern()}};
 assert.equal((await buildDecorativePanels(p)).length,2);
});
test('SVG cutouts reject loose internal islands instead of exporting fragments',async()=>{
 const p=lid('cutout');p.lidDesign!.svg!.asset={version:1,name:'Ring',aspect:1,shapes:[[[[0,0],[1,0],[1,1],[0,1]],[[.3,.3],[.3,.7],[.7,.7],[.7,.3]]]]};
 await assert.rejects(buildKit(p),/перемычки/);
 p.shell={pattern:'honeycomb',gap:.5,thickness:1.6,size:12,svg:p.lidDesign!.svg};
 await assert.rejects(buildShell({...p,lid:false}),/перемычки/);
});
test('accessory SVGs survive projects and style transfer without sharing references',()=>{
 const p=lid('raised');p.shell={pattern:'honeycomb',gap:.5,thickness:1.6,size:12,svg:pattern()};
 const loaded=parseProject(JSON.stringify(p));assert.deepEqual(loaded.lidDesign,p.lidDesign);assert.deepEqual(loaded.shell,p.shell);
 const style=parseStyle(captureStyle(p)),destination=lid('cutout');destination.shell={...p.shell,svg:undefined};
 const result=previewStyle(destination,style).project;assert.deepEqual(result.lidDesign?.svg,p.lidDesign?.svg);assert.deepEqual(result.shell?.svg,p.shell.svg);
 result.shell!.svg!.asset.name='changed';assert.equal(p.shell.svg!.asset.name,'Diamond');
 const builtin=captureStyle({...p,lidDesign:{...p.lidDesign!,svg:undefined},shell:{...p.shell,svg:undefined}});
 const cleared=previewStyle(p,builtin).project;assert.equal(cleared.shell?.svg,undefined);assert.equal(cleared.lidDesign?.svg,undefined);
});
test('invalid accessory SVG settings are rejected on import',()=>{
 const p=lid('raised');p.lidDesign!.svg!.width=0;assert.throws(()=>parseProject(JSON.stringify(p)));
 const s=lid('raised');s.shell={pattern:'honeycomb',gap:.5,thickness:1.6,size:12,svg:{...pattern(),rotation:NaN}};assert.throws(()=>parseProject(JSON.stringify(s)));
});
test('whole drawer export includes current SVG lid and shell geometry',async()=>{
 const {prepareDrawer,drawerArchive}=await import('../src/drawerExport.js'),{newDrawer,newTray}=await import('../src/drawer.js');
 const d=newDrawer();d.width=150;d.depth=100;d.height=90;const t=newTray('SVG kit',60,45,30);t.x=10;t.y=10;t.project=lid('raised');t.project.shell={pattern:'honeycomb',gap:.5,thickness:1.6,size:12,svg:pattern()};d.trays=[t];
 const built=await prepareDrawer(d,{length:150,width:150,height:100,gap:5});
 assert.equal(built.report.partCount,3);assert.ok(built.units.some(u=>u.name.endsWith('-lid')));assert.ok(built.units.some(u=>u.name.endsWith('-shell')));
 assert.ok(drawerArchive(built).byteLength>1000);
 const {writeFileSync}=await import('node:fs');const {bed3mf}=await import('../src/drawerExport.js');writeFileSync('/tmp/svg-accessories-bed.3mf',new Uint8Array(bed3mf(built.units,built.report.beds[0])));
});
test('small rotated SVG on rounded lids retains inset fit and handle landing',async()=>{
 const p=lid('cutout',{cornerRadius:12});p.lidDesign!.svg!.width=5;p.lidDesign!.svg!.rotation=25;p.lidDesign!.handle='round';p.lidDesign!.fit='inset';
 const parts=await buildKit(p);assert.ok(parts.find(v=>v.kind==='lid-handle'));assert.ok(parts.find(v=>v.kind==='lid')!.inspection.volume>0);
});
