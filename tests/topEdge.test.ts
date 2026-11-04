import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildOrganizer} from '../src/kernel.js';
import {defaultProject,resolveWalls,topEdgeSize} from '../src/model.js';
import {splitCell} from '../src/editor.js';
import {organizerTemplate} from '../src/templates.js';
import {decodeSTL} from '../src/stl.js';

test('a measured bevel reaches both sides of the divider and the inner and outer rim',async()=>{
 const p=splitCell(defaultProject(),'root','x',2),w=resolveWalls(p)[4],r=.6;
 const sharp=await buildOrganizer(p);
 for(const style of ['chamfer','round'] as const){
  const result=await buildOrganizer({...p,topEdge:{style,size:r}});
  const vertices=decodeSTL(result.stl).flat();
  for(const x of [0,p.wallThickness,w.x,w.x+w.thickness,p.width-p.wallThickness,p.width]){
   assert.ok(vertices.some(v=>Math.abs(v[0]-x)<.005&&Math.abs(v[2]-(p.height-r))<.005),'rim at x='+x);
  }
  assert.ok(result.inspection.volume<sharp.inspection.volume);
  assert.deepEqual(result.inspection.bounds,sharp.inspection.bounds);
  const perUnit=(p.width*2+p.depth*2)+(p.width-2*p.wallThickness)*2+(p.depth-2*p.wallThickness)*4-2*p.wallThickness;
  const expected=perUnit*r*r*(style==='chamfer'?.5:1-Math.PI/4);
  assert.ok(Math.abs((sharp.inspection.volume-result.inspection.volume)/expected-1)<.03);
 }
});
test('sloped capsule keeps the full-length inclined rim after finishing',async()=>{
 const p=organizerTemplate('capsule','slope');
 for(const style of ['chamfer','round'] as const){
  const {stl}=await buildOrganizer({...p,topEdge:{style,size:.7}});
  const top=decodeSTL(stl).flat().filter(v=>v[2]>p.floorThickness+.001);
  for(const [x,,z] of top)assert.ok(z<=22+48*x/180+.001);
  assert.ok(top.some(([x,,z])=>Math.abs(z-(22+48*x/180))<.001));
 }
});
test('narrowing a wall limits finishing on both sides',()=>{
 assert.equal(topEdgeSize({...defaultProject(),wallThickness:1,topEdge:{style:'round',size:3}}),.4);
});

test('a 10 mm capsule wall accepts a large radius or chamfer at the sloped divider junctions',async()=>{
 const p={...organizerTemplate('capsule','slope'),wallThickness:10};
 for(const style of ['round','chamfer'] as const){
  const {inspection}=await buildOrganizer({...p,topEdge:{style,size:4.5}});
  assert.ok(inspection.volume>0);
 }
});

test('finishing a long notched rim with inner fillets retains one connected tray',async()=>{
 const p={...defaultProject(),width:268,depth:74,height:35,wallThickness:2,floorThickness:2,
  cornerRadius:1.5,innerCornerRadius:3,heights:{front:21},transitions:['left' as const],
  wallProfiles:{right:{start:20.4,end:35,style:'straight' as const}},
  cutouts:{front:{shape:'smooth' as const,width:.21608623548922054,depth:10,position:.3}}};
 const sharp=await buildOrganizer(p);
 for(const style of ['chamfer','round'] as const){
  const {inspection}=await buildOrganizer({...p,topEdge:{style,size:.4}});
  assert.ok(inspection.volume<sharp.inspection.volume);
  assert.ok(inspection.volume>sharp.inspection.volume*.99);
 }
});
