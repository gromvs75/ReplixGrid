import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
import {defaultProject,type Project} from '../src/model.js';
import {setLevelCount,switchLevel,tierElevation,levelProject} from '../src/accessories.js';
import {buildKit} from '../src/accessoryKernel.js';
import {decodeSTL} from '../src/stl.js';
import {footprintContour} from '../src/footprint.js';
import {defaultSvgPattern,type SvgAsset} from '../src/svgPattern.js';
import {formatExport} from '../src/exportFormats.js';
import {parseProject} from '../src/editor.js';
const asset:SvgAsset={version:1,name:'Diamond',aspect:1,shapes:[[[[.5,0],[1,.5],[.5,1],[0,.5]]]]};
for(const hidden of [false,true])for(const svg of [false,true])test(`three tiers retain smooth fitting and inner dimensions: hidden=${hidden} svg=${svg}`,async()=>{
 let p:Project={...defaultProject(),width:60,depth:45,height:25,cornerRadius:6};
 if(hidden)p.shell={pattern:'cellular',size:14,gap:.5,thickness:1.6};
 p=setLevelCount(p,3);const plain=await buildKit(p);
 for(let i=0;i<3;i++){p=switchLevel(p,i);p.relief={pattern:'ribs',spacing:8,depth:.6,...(svg?{svg:{...defaultSvgPattern(asset),width:6,mode:'repeat' as const,sides:['front','back','left','right'] as const}}:{})};}
 p=switchLevel(p,0);p=parseProject(JSON.stringify(p));const parts=await buildKit(p);
 const w=await Module();w.setup();
 const make=(part:typeof parts[number],local=false)=>{const t=decodeSTL(part.stl),mesh=new w.Mesh({numProp:3,vertProperties:new Float32Array(t.flat(2)),triVerts:new Uint32Array(t.flat().map((_,i)=>i))});mesh.merge();const raw=new w.Manifold(mesh),placed=raw.translate([part.position[0],part.position[1],part.position[2]-(local?tierElevation(p,part.level!):0)]);raw.delete();assert.equal(placed.status(),'NoError');return placed;};
 for(let i=0;i<3;i++){
  const part=parts.find(v=>v.kind==='organizer'&&v.level===i)!,base=plain.find(v=>v.kind==='organizer'&&v.level===i)!;
  assert.ok(part.inspection.volume>base.inspection.volume,`tier ${i} has relief`);
  const a=make(part,true),b=make(base,true),clip=w.Manifold.extrude([footprintContour(levelProject(p,i),0)],25),ai=a.intersect(clip),bi=b.intersect(clip),missing=bi.subtract(ai),extra=ai.subtract(bi);
  assert.ok(Math.abs(missing.volume())<.02,'inner material not removed');assert.ok(Math.abs(extra.volume())<.02,'inner dimensions unchanged');
  for(const [lo,hi] of [...(i>0?[[hidden?-3:0,hidden?0:2.3]]:[]),...(i<2?[[hidden?24.45:22.4,28]]:[])]){
   // The exterior shell support grows with shell clearance; only the socket inside the footprint is a mating surface.
   const slab=hidden&&hi===0?w.Manifold.extrude([footprintContour(levelProject(p,i),0)],hi-lo).translate([0,0,lo]):w.Manifold.cube([200,200,hi-lo]).translate([-100,-100,lo]),x=a.intersect(slab),y=b.intersect(slab),d=x.subtract(y),e=y.subtract(x);
   assert.ok(Math.abs(d.volume())+Math.abs(e.volume())<.02,'mating surfaces unchanged');for(const m of [slab,x,y,d,e])m.delete();
  }
  for(const m of [a,b,clip,ai,bi,missing,extra])m.delete();
 }
 const assembled=parts.map(v=>make(v));for(let i=0;i<assembled.length;i++)for(let j=i+1;j<assembled.length;j++){const hit=assembled[i].intersect(assembled[j]);assert.ok(Math.abs(hit.volume())<.02,`${parts[i].name}/${parts[j].name} collision ${hit.volume()}`);hit.delete();}assembled.forEach(v=>v.delete());
 const output=formatExport(parts,'3mf').data,view=new DataView(output);let at=0,model='';while(view.getUint32(at,true)===0x04034b50){const size=view.getUint32(at+18,true),n=view.getUint16(at+26,true),start=at+30+n+view.getUint16(at+28,true);if(new TextDecoder().decode(output.slice(at+30,at+30+n))==='3D/3dmodel.model')model=new TextDecoder().decode(output.slice(start,start+size));at=start+size;}
 assert.match(model,/unit="millimeter"/);assert.equal((model.match(/<mesh>/g)||[]).length,parts.length);assert.equal((model.match(/<triangle /g)||[]).length,parts.reduce((n,v)=>n+decodeSTL(v.stl).length,0));
});
