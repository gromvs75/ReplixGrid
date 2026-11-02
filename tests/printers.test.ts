import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,validatePrintArea} from '../src/model.js';
import {matchingPrinter,printerPresets,withPrinter} from '../src/printers.js';
import {parseProject} from '../src/editor.js';
test('printer configurations have unique IDs and valid working volumes',()=>{
 assert.equal(new Set(printerPresets.map(p=>p.id)).size,printerPresets.length);
 for(const p of printerPresets){validatePrintArea(p.area);assert.match(p.source,/^https:\/\//);}
 assert.deepEqual(printerPresets.find(p=>p.id==='u1')!.area,{bedWidth:270,bedDepth:270,bedHeight:270});
});
test('preset survives project roundtrip, leaves geometry and source untouched',()=>{
 const p=defaultProject(),before=structuredClone(p),next=withPrinter(p,'artisan-dual');
 assert.deepEqual(p,before);assert.equal(next.width,p.width);assert.deepEqual(next.root,p.root);
 assert.equal(matchingPrinter(parseProject(JSON.stringify(next)))?.id,'artisan-dual');
});
test('manual area does not claim a printer model; choosing custom keeps dimensions',()=>{
 const p=withPrinter(defaultProject(),'u1');p.printArea!.bedWidth=271;
 assert.equal(matchingPrinter(p),undefined);
 const custom=withPrinter(p,'custom');assert.equal(custom.printArea!.bedWidth,271);assert.equal(matchingPrinter(custom),undefined);
});
test('preset updates both split settings and export working volume',()=>{
 const p=defaultProject();p.printing={parts:2,bedWidth:270,bedDepth:270,bedHeight:270};
 const next=withPrinter(p,'a150');assert.equal(next.printing?.parts,2);assert.equal(next.printing?.bedWidth,160);assert.equal(next.printArea?.bedHeight,145);
});
