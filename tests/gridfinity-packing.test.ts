import test from 'node:test';
import assert from 'node:assert/strict';
import {buildGridfinity} from '../src/gridfinityKernel.js';
import {defaultGridfinity} from '../src/gridfinity.js';
import {preparePrintBeds,packedBedFiles,bed3mf} from '../src/printBeds.js';
import {bed3mf as drawerBed3mf} from '../src/drawerExport.js';
import {configuredBedSettings} from '../src/printerBed.js';
import {defaultProject} from '../src/model.js';
function unzip(raw:ArrayBuffer){const v=new DataView(raw),out:Record<string,string>={};let p=0;while(v.getUint32(p,true)===0x04034b50){const size=v.getUint32(p+18,true),n=v.getUint16(p+26,true),extra=v.getUint16(p+28,true),start=p+30+n+extra;out[new TextDecoder().decode(raw.slice(p+30,p+30+n))]=new TextDecoder().decode(raw.slice(start,start+size));p=start+size;}return out;}
test('Gridfinity uses drawer bed serialization with the existing printer and per-part slots',async()=>{
 assert.equal(bed3mf,drawerBed3mf);
 const project={...defaultProject(),printArea:{bedWidth:100,bedDepth:100,bedHeight:100}},settings=configuredBedSettings(project);
 assert.deepEqual(settings,{length:100,width:100,height:100,gap:5});
 const p=defaultGridfinity(),plate=await buildGridfinity(p,'plate'),tray=await buildGridfinity(p,'tray');
 const parts=[{name:'plate-1',stl:plate.stl,color:'#ffffff'},{name:'tray-1',stl:tray.stl,color:'#008ac8'},{name:'tray-2',stl:tray.stl,color:'#f8c52c'}],prepared=preparePrintBeds(parts,settings);
 assert.equal(prepared.report.beds.length,3);assert.equal(prepared.report.beds.flat().length,3);
 const files=packedBedFiles(prepared.units,prepared.report,'3mf',[2,4,5]);assert.equal(files.filter(f=>f.name.endsWith('.3mf')).length,3);
 for(const [i,bed] of prepared.report.beds.entries()){
  const place=bed[0],source=parts[place.item];assert.ok(place.x>=2&&place.y>=2&&place.x+place.width<=98.001&&place.y+place.depth<=98.001);
  const model=unzip(files.find(f=>f.name===`bed-${String(i+1).padStart(2,'0')}.3mf`)!.data as ArrayBuffer);
  assert.match(model['3D/3dmodel.model'],new RegExp(source.name));assert.ok(model['3D/3dmodel.model'].includes(source.color.toUpperCase()+'FF'));
  assert.ok(model['Metadata/model_settings.config'].includes(`value="${[2,4,5][place.item]}"`));
  const vertices=[...model['3D/3dmodel.model'].matchAll(/<vertex x="([^"]+)" y="([^"]+)" z="([^"]+)"/g)].map(m=>m.slice(1).map(Number));assert.equal(Math.min(...vertices.map(v=>v[2])),0);assert.ok(vertices.every(v=>v[0]>=2-1e-5&&v[0]<=98+1e-5&&v[1]>=2-1e-5&&v[1]<=98+1e-5));
 }
 assert.throws(()=>preparePrintBeds(parts,{...settings,height:10}),/Не помещается/);
 assert.ok(packedBedFiles(prepared.units,prepared.report,'stl').some(f=>f.name==='models.zip'));
 assert.ok(packedBedFiles(prepared.units,prepared.report,'obj').some(f=>f.name==='unit-1-obj.zip'));
});
