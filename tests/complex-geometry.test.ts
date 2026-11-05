import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {organizerTemplate} from '../src/templates.js';
import {parseProject} from '../src/editor.js';
import {buildOrganizer} from '../src/kernel.js';
import {decodeSTL,inspectSurface,type Triangle,type Point} from '../src/stl.js';
import {formatExport} from '../src/exportFormats.js';
function exported3mf(stl:ArrayBuffer){
 const data=formatExport([{name:'Geometry audit',stl,color:'#8cbaa8'}],'3mf').data,view=new DataView(data);let at=0,xml='';
 while(view.getUint32(at,true)===0x04034b50){const size=view.getUint32(at+18,true),n=view.getUint16(at+26,true),extra=view.getUint16(at+28,true),start=at+30+n+extra,name=new TextDecoder().decode(data.slice(at+30,at+30+n));if(name==='3D/3dmodel.model')xml=new TextDecoder().decode(data.slice(start,start+size));at=start+size;}
 assert.match(xml,/unit="millimeter"/);
 const vertices=[...xml.matchAll(/<vertex x="([^"]+)" y="([^"]+)" z="([^"]+)"/g)].map(m=>m.slice(1).map(Number) as Point);
 const faces=[...xml.matchAll(/<triangle v1="(\d+)" v2="(\d+)" v3="(\d+)"/g)].map(m=>m.slice(1).map(i=>vertices[Number(i)]) as Triangle);
 assert.ok(faces.length);return inspectSurface(faces);
}
for(const shape of ['rounded','capsule','circle','oval','honeycomb'] as const)for(const style of ['chamfer','round'] as const)test(`${shape}/${style}: combined fillets, supported cutouts and maximum lean export consistently`,async()=>{
 const p=organizerTemplate(shape,shape==='circle'||shape==='oval'?'flat':'slope');p.innerCornerRadius=4;p.tilt=25;p.topEdge={style,size:.7};
 if(shape!=='honeycomb')p.cutouts={front:{shape:'smooth',width:.5,depth:12,position:.5}};
 const restored=parseProject(JSON.stringify(p));const built=await buildOrganizer(restored),stl=inspectSurface(decodeSTL(built.stl)),mf=exported3mf(built.stl);
 assert.ok(stl.volume>0);assert.equal(stl.bounds.min[2],0);assert.deepEqual(mf.bounds,stl.bounds);assert.ok(Math.abs(mf.volume-stl.volume)<.001);
 // Lean is a shear: it must retain material volume and vertical dimensions.
 const straight=await buildOrganizer({...restored,tilt:0});assert.ok(Math.abs(stl.volume-straight.inspection.volume)<Math.max(.1,stl.volume*1e-5));
 assert.ok(Math.abs(stl.bounds.max[2]-straight.inspection.bounds.max[2])<.001);
});
test('capsule notch regression retains one closed body without dropping a detached bevel chip',async()=>{
 const p=parseProject(readFileSync(new URL('./fixtures/capsule-notch-fillet-chamfer.json',import.meta.url),'utf8'));
 const sharp=await buildOrganizer({...p,topEdge:undefined}),finished=await buildOrganizer(p);
 assert.ok(finished.inspection.volume<sharp.inspection.volume);assert.ok(finished.inspection.volume>sharp.inspection.volume*.99);
 // Finishing a leaning rim can reduce its horizontal extent, but not its floor or height.
 assert.deepEqual(finished.inspection.bounds.min,sharp.inspection.bounds.min);
 assert.equal(finished.inspection.bounds.max[1],sharp.inspection.bounds.max[1]);
 assert.equal(finished.inspection.bounds.max[2],sharp.inspection.bounds.max[2]);
 const reduction=sharp.inspection.bounds.max[0]-finished.inspection.bounds.max[0];
 assert.ok(reduction>=0&&reduction<1);
});
test('unsupported honeycomb edge cutouts are rejected before geometry building',()=>{
 const p=organizerTemplate('honeycomb','flat');p.cutouts={front:{shape:'smooth',width:.5,depth:12,position:.5}};
 assert.throws(()=>parseProject(JSON.stringify(p)),/Вырезы.*сот/);
});
