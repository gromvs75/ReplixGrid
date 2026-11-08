import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import {importSvg} from '../src/svgImport.js';
import {defaultSvgPattern} from '../src/svgPattern.js';
import {defaultProject,resolveWalls} from '../src/model.js';
import {buildKit} from '../src/accessoryKernel.js';
import {buildShell} from '../src/kernel.js';
import {buildDecorativePanels} from '../src/decorativePanels.js';
import {lidPlateThickness} from '../src/accessories.js';
const dom=new JSDOM('');Object.assign(globalThis,{DOMParser:dom.window.DOMParser,XMLSerializer:dom.window.XMLSerializer});
const asset=(name:string)=>importSvg(readFileSync(new URL(`./fixtures/svg/user-patterns/${name}-stencil.svg`,import.meta.url),'utf8'),name);
for(const name of ['organic_leaf_pattern','3d_print_pattern'])for(const mode of ['single','repeat'] as const)for(const target of ['lid','shell','panels'] as const)test(`corrected stencil ${name} builds connected ${target} ${mode}`,async()=>{
 const svg={...defaultSvgPattern(asset(name)),mode,width:20},p={...defaultProject(),width:100,depth:80,height:50};
 const parts=target==='lid'?await buildKit({...p,lid:true,lidDesign:{pattern:'smooth',rimHeight:2,handle:'none',svg,svgMode:'cutout'}}):target==='shell'?[await buildShell({...p,shell:{pattern:'honeycomb',gap:.5,thickness:1.6,size:12,svg}})]:await buildDecorativePanels({...p,shell:{pattern:'honeycomb',gap:.5,thickness:1.6,size:12,svg,mode:'panels',sides:['front'],mounts:false}});
 for(const part of parts)assert.ok(part.inspection.volume>0);
});
for(const mode of ['raised','cutout'] as const)test(`SVG ${mode} thickness changes exported height and volume`,async()=>{
 const p={...defaultProject(),lid:true,lidDesign:{pattern:'smooth' as const,rimHeight:2,handle:'none' as const,svg:defaultSvgPattern(asset('3d_print_pattern')),svgMode:mode}};
 const make=async(thickness:number)=>{const project={...p,lidDesign:{...p.lidDesign,svgThickness:thickness}};resolveWalls(project);return (await buildKit(project)).find(x=>x.name==='lid')!;};
 const thin=await make(1.2),thick=await make(4);
 assert.ok(Math.abs((thick.inspection.bounds.max[2]-thin.inspection.bounds.max[2])-2.8)<.01);assert.ok(thick.inspection.volume>thin.inspection.volume);
 assert.equal(lidPlateThickness(p),mode==='raised'?3.2:2);
 for(const thickness of [0,1,7,NaN])assert.throws(()=>resolveWalls({...p,lidDesign:{...p.lidDesign,svgThickness:thickness}}));
});
test('inset SVG lid thickness respects available depth',()=>{
 const p={...defaultProject(),height:8,lid:true,lidDesign:{pattern:'smooth' as const,rimHeight:2,handle:'none' as const,fit:'inset' as const,svg:defaultSvgPattern(asset('3d_print_pattern')),svgMode:'cutout' as const,svgThickness:6}};
 assert.throws(()=>resolveWalls(p),/толщины крышки/);
});
