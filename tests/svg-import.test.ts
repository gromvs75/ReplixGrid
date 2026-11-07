import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import {importSvg} from '../src/svgImport.js';
import {defaultSvgPattern} from '../src/svgPattern.js';
import {defaultProject,type Project} from '../src/model.js';
import {buildOrganizer,buildShell} from '../src/kernel.js';
import {buildKit} from '../src/accessoryKernel.js';
import {buildDecorativePanels} from '../src/decorativePanels.js';
const dom=new JSDOM('');
Object.assign(globalThis,{DOMParser:dom.window.DOMParser,XMLSerializer:dom.window.XMLSerializer});
const fixture=(name:string)=>readFileSync(new URL(`./fixtures/svg/user-patterns/${name}.svg`,import.meta.url),'utf8');
const wrap=(body:string)=>`<svg xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
test('empty and unused safe definitions do not prevent importing visible filled shapes',()=>{
 const visible='<rect width="20" height="10"/>';
 assert.deepEqual(importSvg(wrap('<defs><path d="M0 0h100v100z"/></defs>'+visible),'test'),importSvg(wrap(visible),'test'));
 assert.equal(importSvg(fixture('3d_print_pattern-v2'),'hexagons').shapes.length,23);
});
test('unsupported references and executable content stay rejected, including inside definitions',()=>{
 for(const body of ['<defs><script>alert(1)</script></defs>','<use href="#a"/>','<image href="a.png"/>','<rect width="10" height="10" mask="url(#a)"/>','<text>Hello</text>','<style>path {fill:red}</style>','<defs><linearGradient id="a"/></defs>'])assert.throws(()=>importSvg(wrap(body),'bad'));
});
test('visible strokes receive preparation advice instead of silently disappearing',()=>{
 assert.throws(()=>importSvg(fixture('3d_print_pattern'),'strokes'),/обводки в контуры/);
 const visible='<rect width="20" height="10"/>';
 assert.deepEqual(importSvg(wrap('<g opacity="0"><path stroke="black" d="M0 0L5 5"/></g>'+visible),'test'),importSvg(wrap(visible),'test'));
});
test('compound leaf respects its actual SVG fill rule, not comments describing an intended hole',()=>{
 const text=fixture('leaf_pattern');
 assert.equal(importSvg(text,'leaf').shapes[0].length,1);
 assert.equal(importSvg(text.replace('<path ','<path fill-rule="evenodd" '),'leaf').shapes[0].length,2);
});
for(const name of ['leaf_pattern','organic_leaf_pattern','3d_print_pattern-v2'])for(const target of ['relief','raised','cutout','shell','panels'] as const)for(const mode of ['single','repeat'] as const)test(`user SVG ${name}: ${target} ${mode} reports actual printable compatibility`,async()=>{
 const asset=importSvg(fixture(name),name),svg={...defaultSvgPattern(asset),mode};
 const p:Project={...defaultProject(),width:100,depth:80,height:40};
 if(target==='relief')p.relief={pattern:'ribs',spacing:8,depth:1,svg};
 else if(target==='shell'||target==='panels')p.shell={pattern:'honeycomb',gap:.5,thickness:1.6,size:12,svg,...target==='panels'?{mode:'panels' as const,sides:['front'],mounts:false}:{}};
 else {p.lid=true;p.lidDesign={pattern:'smooth',rimHeight:2,handle:'none',svg,svgMode:target};}
 const build=()=>target==='relief'?buildOrganizer(p):target==='shell'?buildShell(p):target==='panels'?buildDecorativePanels(p):buildKit(p);
 if(name==='organic_leaf_pattern'&&['cutout','shell','panels'].includes(target))await assert.rejects(build(),/перемычк/);
 else {const result=await build();for(const part of Array.isArray(result)?result:[result])assert.ok(part.inspection.volume>0);}
});
