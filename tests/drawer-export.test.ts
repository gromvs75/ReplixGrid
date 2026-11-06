import {test} from 'node:test';
import assert from 'node:assert/strict';
import {prepareDrawer,drawerArchive,bed3mf} from '../src/drawerExport.js';
import {newDrawer,newTray} from '../src/drawer.js';
import {writeFileSync} from 'node:fs';
const settings={length:100,width:100,height:100,gap:5};
function files(raw:ArrayBuffer){const v=new DataView(raw),out:Record<string,string>={};let pos=0;while(v.getUint32(pos,true)===0x04034b50){const size=v.getUint32(pos+18,true),n=v.getUint16(pos+26,true),e=v.getUint16(pos+28,true),name=new TextDecoder().decode(raw.slice(pos+30,pos+30+n));out[name]=new TextDecoder().decode(raw.slice(pos+30+n+e,pos+30+n+e+size));pos+=30+n+e+size;}return out;}
test('whole drawer retains each tray, exports placed named 3MF objects and assembly',async()=>{
 const d=newDrawer();d.width=200;d.depth=100;d.trays=[newTray('A & <B>',50,40,20),newTray('A & <B>',50,40,20)];d.trays[0].x=2;d.trays[0].y=2;d.trays[1].x=60;d.trays[1].y=2;
 const p=await prepareDrawer(d,settings);assert.equal(p.report.items.length,2);assert.equal(p.report.beds.length,1);assert.equal(p.report.partCount,2);
 const mf=bed3mf(p.units,p.report.beds[0]);const model=files(mf)['3D/3dmodel.model'];assert.equal((model.match(/<item /g)||[]).length,2);assert.match(model,/A &amp; &lt;B&gt;/);assert.match(model,/unit="millimeter"/);
 const archive=files(drawerArchive(p));assert.ok(archive['bed-01.3mf']);assert.ok(archive['assembly.svg']);assert.deepEqual(JSON.parse(archive['drawer.replixdrawer.json']),p.layout);
 writeFileSync('/tmp/drawer-bed-check.3mf',new Uint8Array(mf));
});
test('overlapping layouts fail and no empty export is produced',async()=>{
 const d=newDrawer();await assert.rejects(prepareDrawer(d,settings),/пуст/);d.trays=[newTray('a',40,40,20),newTray('b',40,40,20)];for(const t of d.trays){t.x=2;t.y=2;}await assert.rejects(prepareDrawer(d,settings),/Пересечение/);
});
test('plate-only export recalculates sections for the requested printer',async()=>{
 const d=newDrawer();d.width=160;d.depth=80;d.plate={enabled:true,bedWidth:270,bedDepth:270};
 const p=await prepareDrawer(d,settings);assert.ok(p.report.items.length>=2);assert.equal(p.layout.plate?.bedWidth,100);assert.equal(d.plate.bedWidth,270);assert.equal(p.report.beds.flat().length,p.units.length);
});
test('mounted trays and sections form one complete export without changing the source',async()=>{
 const d=newDrawer();d.width=164;d.depth=84;d.height=60;d.plate={enabled:true,bedWidth:100,bedDepth:100};
 const t=newTray('Bridge',100,60,20);t.x=2;t.y=2;d.trays=[t];
 const source=JSON.stringify(d),p=await prepareDrawer(d,{...settings,length:120});
 assert.ok(p.report.items.some(v=>v.name.endsWith('mounted')));assert.ok(p.report.items.some(v=>v.name.startsWith('plate-')));assert.equal(JSON.stringify(d),source);
});
test('multicolour lids stay grouped on the same bed with independent trays',async()=>{
 const d=newDrawer();d.width=150;d.depth=100;d.height=90;const t=newTray('Lid',60,50,25);t.x=5;t.y=5;t.project.lid=true;t.project.lidDesign={fit:'inset',olive:true,pattern:'smooth',handle:'none',rimHeight:2,baseColor:'#ffffff',patternColor:'#557722'};d.trays=[t];
 const p=await prepareDrawer(d,settings),lid=p.units.find(u=>u.parts.length===2);assert.ok(lid);assert.deepEqual(lid.parts.map(x=>x.name),['lid','lid-olive']);assert.equal(p.report.partCount,p.units.length+1);
 const bi=p.report.beds.findIndex(b=>b.some(v=>p.units[v.item]===lid));const model=files(bed3mf(p.units,p.report.beds[bi]))['3D/3dmodel.model'];assert.match(model,/<components><component objectid="\d+"\/><component objectid="\d+"\/><\/components>/);
});
test('rounded mounted tray at an offset exports without collapsed seam triangles',async()=>{
 const d=newDrawer();d.width=500;d.depth=300;d.height=80;d.plate={enabled:true,bedWidth:270,bedDepth:270};const t=newTray('Tools',180,90,30);t.x=110;t.y=2;d.trays=[t];
 const p=await prepareDrawer(d,{length:270,width:270,height:270,gap:5});assert.ok(p.report.items.find(v=>v.name.endsWith('mounted')));assert.equal(p.report.beds.flat().length,p.units.length);
});
