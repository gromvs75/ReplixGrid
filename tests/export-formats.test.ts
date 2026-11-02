import test from 'node:test';
import assert from 'node:assert/strict';
import {formatExport,indexedMesh} from '../src/exportFormats.js';
import {encodeSTL,type Triangle} from '../src/stl.js';
const triangles:Triangle[]=[[[2,3,4],[12,3,4],[2,8,4]],[[2,3,4],[2,3,10],[12,3,4]],[[2,3,4],[2,8,4],[2,3,10]],[[12,3,4],[2,3,10],[2,8,4]]];
const stl=encodeSTL(triangles),parts=[{name:'body & tray',stl,color:'#ff0000'},{name:'shell',stl,color:'#00ff00'}];
function unzip(data:ArrayBuffer){const view=new DataView(data),files=new Map<string,string>();let at=0;while(view.getUint32(at,true)===0x04034b50){assert.equal(view.getUint16(at+8,true),0);const size=view.getUint32(at+18,true),n=view.getUint16(at+26,true),extra=view.getUint16(at+28,true),start=at+30+n+extra;files.set(new TextDecoder().decode(data.slice(at+30,at+30+n)),new TextDecoder().decode(data.slice(start,start+size)));at=start+size;}return files;}
test('indexed export preserves triangle winding and shared vertices',()=>{const mesh=indexedMesh(stl);assert.equal(mesh.vertices.length,4);assert.deepEqual(mesh.faces.map(f=>f.map(i=>mesh.vertices[i])),triangles);});
test('3MF has millimeter units, escaped names, separate objects, colors and laid-flat transforms',()=>{const result=formatExport(parts,'3mf'),files=unzip(result.data),model=files.get('3D/3dmodel.model')!;assert.equal(result.extension,'3mf');assert.equal(files.size,3);assert.match(model,/unit="millimeter"/);assert.match(model,/body &amp; tray/);assert.match(model,/displaycolor="#FF0000FF"/);assert.match(model,/displaycolor="#00FF00FF"/);assert.equal((model.match(/<object /g)||[]).length,2);assert.equal((model.match(/<triangle /g)||[]).length,8);assert.match(model,/transform="1 0 0 0 1 0 0 0 1 -2 -3 -4"/);assert.match(model,/transform="1 0 0 0 1 0 0 0 1 18 -3 -4"/);});
test('OBJ packages materials and uses separate globally indexed objects',()=>{const files=unzip(formatExport(parts,'obj').data),obj=files.get('organizer.obj')!,mtl=files.get('materials.mtl')!;assert.match(obj,/mtllib materials.mtl/);assert.match(mtl,/Kd 1 0 0/);assert.match(mtl,/Kd 0 1 0/);const vertices=obj.split('\n').filter(s=>s.startsWith('v ')).map(s=>s.slice(2).split(' ').map(Number));assert.equal(vertices.length,8);assert.equal(Math.min(...vertices.map(v=>v[2])),0);assert.equal(Math.min(...vertices.slice(4).map(v=>v[0]))-Math.max(...vertices.slice(0,4).map(v=>v[0])),10);const faces=obj.split('\n').filter(s=>s.startsWith('f ')).map(s=>s.slice(2).split(' ').map(Number));assert.equal(faces.length,8);assert.ok(faces.slice(4).flat().every(i=>i>=5&&i<=8));});
test('STL remains unchanged; multiple STL parts are packaged separately',()=>{assert.equal(formatExport(parts.slice(0,1),'stl').data,stl);assert.equal(unzip(formatExport(parts,'stl').data).size,2);assert.throws(()=>formatExport([],'3mf'));assert.throws(()=>formatExport([{...parts[0],color:'red'}],'obj'));});
test('OBJ includes supplied localized instructions without changing file names',()=>{
 const files=unzip(formatExport(parts,'obj','毫米；Z 轴向上。').data);
 assert.equal(files.get('README.txt'),'毫米；Z 轴向上。');assert.ok(files.has('organizer.obj'));
});
test('3MF assigns only explicitly mapped slicer slots without including printer profiles',()=>{
 const files=unzip(formatExport(parts,'3mf',undefined,{'#ff0000':2,'#00ff00':1}).data);
 const settings=files.get('Metadata/model_settings.config')!;
 assert.match(settings,/<object id="2"><metadata key="name" value="body &amp; tray"\/><metadata key="extruder" value="2"\/>/);
 assert.match(settings,/<object id="3"><metadata key="name" value="shell"\/><metadata key="extruder" value="1"\/>/);
 assert.equal(files.has('Metadata/project_settings.config'),false);
 assert.equal(files.size,4);
 const partial=unzip(formatExport(parts,'3mf',undefined,{'#ff0000':2}).data).get('Metadata/model_settings.config')!;
 assert.doesNotMatch(partial,/<object id="3"/);
 assert.equal(unzip(formatExport(parts,'3mf',undefined,{'#ff0000':0}).data).size,3);
});
test('per-part filament choices override preview color matches, including duplicate colors and no assignment',()=>{
 const duplicate=[parts[0],{...parts[1],color:parts[0].color}];
 const files=unzip(formatExport(duplicate,'3mf',undefined,{'#ff0000':1},[4,3]).data);
 const settings=files.get('Metadata/model_settings.config')!;
 assert.match(settings,/<object id="2">.*?key="extruder" value="4"/);
 assert.match(settings,/<object id="3">.*?key="extruder" value="3"/);
 const partial=unzip(formatExport(duplicate,'3mf',undefined,{'#ff0000':1},[null,2]).data).get('Metadata/model_settings.config')!;
 assert.doesNotMatch(partial,/<object id="2"/);
 assert.match(partial,/<object id="3">.*?key="extruder" value="2"/);
});
