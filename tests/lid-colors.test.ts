import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,type Project} from '../src/model.js';
import {parseProject} from '../src/editor.js';
import {buildKit} from '../src/accessoryKernel.js';
import {lidBaseColor,lidHandleColor} from '../src/appearance.js';
import {captureStyle,parseStyle,previewStyle} from '../src/visualStyles.js';
import {setLevelCount} from '../src/accessories.js';
import {formatExport} from '../src/exportFormats.js';
import {slotMap} from '../src/filaments.js';

const project=():Project=>({...defaultProject(),width:50,depth:40,cornerRadius:3,lid:true,colors:{organizer:'#171a1b'},lidDesign:{pattern:'smooth',rimHeight:2,handle:'round',olive:true,raised:true,baseColor:'#f7f3e8',patternColor:'#687749'}});
test('unset handle follows lid base, explicit color survives organizer/base edits and project/style round trips',()=>{
 const p=project();assert.equal(lidHandleColor(p),'#f7f3e8');
 p.lidDesign!.baseColor='#ffffff';assert.equal(lidHandleColor(p),'#ffffff');
 p.lidDesign!.handleColor='#008ac8';p.colors!.organizer='#e63522';p.lidDesign!.baseColor='#c5c6c5';
 assert.equal(lidHandleColor(parseProject(JSON.stringify(p))),'#008ac8');
 const style=parseStyle(captureStyle(p));assert.equal(style.lid?.handleColor,'#008ac8');
 assert.equal(previewStyle(project(),style).project.lidDesign?.handleColor,'#008ac8');
 assert.equal(previewStyle(p,captureStyle(project())).project.lidDesign?.handleColor,undefined);
 assert.equal(previewStyle(p,style,{colors:false,patterns:true}).project.lidDesign?.handleColor,'#008ac8');
 for(const bad of ['red','#123',42,null])assert.throws(()=>parseProject(JSON.stringify({...p,lidDesign:{...p.lidDesign,handleColor:bad}})));
});
test('plain and two-tone lid defaults match actual base colors',()=>{
 const p=project();delete p.lidDesign!.baseColor;
 assert.equal(lidBaseColor(p),'#f7f3e8');assert.equal(lidHandleColor(p),lidBaseColor(p));
 p.lidDesign!.olive=false;assert.equal(lidHandleColor(p),'#171a1b');
});
for(const handle of ['round','bar'] as const)test(`${handle} handle keeps independent color in tiered geometry, 3MF filament mapping and OBJ materials`,async()=>{
 const p=setLevelCount(project(),2);p.lidDesign!.handle=handle;p.lidDesign!.handleColor='#008ac8';
 const parts=await buildKit(parseProject(JSON.stringify(p))),handlePart=parts.find(part=>part.kind==='lid-handle')!;
 assert.equal(handlePart.color,'#008ac8');assert.ok(handlePart.inspection.volume>0);
 assert.equal(parts.find(part=>part.name==='lid')?.color,'#f7f3e8');
 assert.equal(parts.find(part=>part.name==='lid-olive')?.color,'#687749');
 assert.equal(parts.find(part=>part.kind==='organizer')?.color,'#171a1b');
 const mapping=slotMap([{slot:2,color:'#f7f3e8',name:'Base'},{slot:7,color:'#687749',name:'Pattern'},{slot:16,color:'#008ac8',name:'Handle'}]);
 const threeMF=new TextDecoder().decode(formatExport(parts,'3mf',undefined,mapping).data);
 assert.match(threeMF,/#008AC8FF/);assert.match(threeMF,/value="lid-handle"[^]*?key="extruder" value="16"/);
 const obj=new TextDecoder().decode(formatExport([handlePart],'obj').data);
 const rgb=obj.match(/Kd ([\d.]+) ([\d.]+) ([\d.]+)/)!.slice(1).map(Number);
 assert.deepEqual(rgb,[0,138/255,200/255]);
 const before=handlePart.stl;p.lidDesign!.handleColor='#ffffff';
 const recolored=(await buildKit(p)).find(part=>part.kind==='lid-handle')!;
 assert.equal(recolored.color,'#ffffff');assert.deepEqual(new Uint8Array(recolored.stl),new Uint8Array(before));
});
