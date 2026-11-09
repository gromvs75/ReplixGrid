import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Project} from '../src/model.js';
import {reliefPatterns} from '../src/reliefPatterns.js';
import {lidMotifs,type LidMotif} from '../src/lidMotifs.js';
import {setLevelCount} from '../src/accessories.js';
import {buildKit} from '../src/accessoryKernel.js';
import {decodeSTL,inspectSurface} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
const designs:NonNullable<Project['lidDesign']>[]=[...['smooth','lines',...reliefPatterns].map(pattern=>({pattern,rimHeight:2.37,handle:'none',patternSpacing:7.13,patternDepth:.63} as NonNullable<Project['lidDesign']>))];
for(const motif of Object.keys(lidMotifs) as LidMotif[])for(const raised of [false,true])designs.push({pattern:'smooth',rimHeight:2.37,handle:'none',olive:true,motif,raised});
for(const motif of ['olive','ginkgo','fern','tide','grain'] as LidMotif[])for(const raised of [false,true])designs.push({pattern:'smooth',rimHeight:2.37,handle:'none',olive:true,motif,cutwork:true,raised});
const cases=[{width:6.68,depth:5.58,wallThickness:.8,fit:'outer' as const},{width:13.27,depth:9.63,wallThickness:2,fit:'inset' as const},{width:53.17,depth:44.83,wallThickness:2,fit:'outer' as const},{width:90,depth:90,wallThickness:2,fit:'inset' as const}];
for(const d of designs)for(const [i,c] of cases.entries())test(`lid ${d.olive?`${d.motif}/${d.cutwork?`cutwork-${d.raised?'raised':'inlay'}`:d.raised?'raised':'inlay'}`:d.pattern}: ${c.width} × ${c.depth} ${c.fit}, cutouts and tiers`,async()=>{
 const {fit,...dimensions}=c;
 const p=setLevelCount({...defaultProject(),...dimensions,height:24.13,floorThickness:.8,cornerRadius:.2,
  cutouts:{front:{shape:'smooth',width:.25,depth:3.17,position:.5},back:{shape:'round',width:.25,depth:2.37,position:.5}},
  shell:i===2?{pattern:'petals',gap:.5,thickness:1.2,size:8.13,border:2}:undefined},i===3?3:2);
 p.lid=true;p.lidDesign={...d,fit,rimPattern:i%2?'rings':'smooth'};
 const parts=await buildKit(p);
 assert.equal(parts.filter(x=>x.kind==='organizer').length,i===3?3:2);
 assert.ok(parts.some(x=>x.kind==='lid'));
 for(const part of parts){const checked=inspectSurface(decodeSTL(part.stl));assert.ok(checked.volume>0,part.name);assert.ok(part.position.every(Number.isFinite));}
 for(const format of ['stl','3mf','obj'] as const)assert.ok(formatExport(parts,format).data.byteLength>100,format);
});
