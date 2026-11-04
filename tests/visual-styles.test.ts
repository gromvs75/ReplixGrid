import test from 'node:test';
import assert from 'node:assert/strict';
import {captureStyle,parseStyle,previewStyle} from '../src/visualStyles.js';
import {defaultProject,resolveWalls,type Project} from '../src/model.js';
import {splitCell,parseProject} from '../src/editor.js';
import {useEditor} from '../src/store.js';
import {buildKit} from '../src/accessoryKernel.js';
import {formatExport} from '../src/exportFormats.js';
const source=():Project=>({...defaultProject(),colors:{organizer:'#123456',shell:'#654321'},relief:{pattern:'ribs',spacing:8,depth:.6},shell:{pattern:'cellular',size:12,gap:.5,thickness:1.4},lid:true,lidDesign:{pattern:'smooth',rimHeight:3,handle:'round',fit:'outer',olive:true,motif:'ginkgo',raised:true,cutwork:true,baseColor:'#f0dfd2',patternColor:'#335f3d'}});
const preserved=(p:Project)=>{
 const q=structuredClone(p);delete q.colors;delete q.relief;
 if(q.shell){delete (q.shell as Partial<typeof q.shell>).pattern;delete (q.shell as Partial<typeof q.shell>).size;}
 if(q.lidDesign)for(const key of ['pattern','patternSpacing','patternDepth','rimPattern','olive','motif','raised','cutwork','baseColor','patternColor'])delete (q.lidDesign as Record<string,unknown>)[key];
 return q;
};
test('style applies whitelisted appearance while retaining geometry, fit, handle and inserts',()=>{
 const src=source();const style=captureStyle(src),before=structuredClone(src);
 let target=splitCell({...defaultProject(),width:160,depth:80,cornerRadius:15,innerCornerRadius:5},'root','x',3);
 target={...target,shell:{pattern:'diamonds',size:7,gap:1.2,thickness:2.2,border:5},lid:true,lidDesign:{pattern:'lines',fit:'inset',rimHeight:7,handle:'bar',handleWidth:22,handleHeight:6},cups:[{cellId:target.root.split!.first.id,shape:'fitted',height:15,color:'#ff0000'}]};
 const result=previewStyle(target,style);
 assert.deepEqual(result.warnings,[]);assert.deepEqual(preserved(result.project),preserved(target));assert.equal(result.project.lidDesign!.motif,'ginkgo');assert.equal(result.project.shell!.pattern,'cellular');assert.equal(result.project.colors!.organizer,'#123456');assert.deepEqual(src,before);assert.equal(target.shell!.pattern,'diamonds');
 assert.deepEqual(parseProject(JSON.stringify(result.project)),result.project);
});
test('missing accessories are reported without creating geometry or copying latent settings',()=>{
 const p=defaultProject(),r=previewStyle(p,captureStyle(source()));
 assert.equal(r.warnings.length,2);assert.equal(r.project.lid,undefined);assert.equal(r.project.lidDesign,undefined);assert.equal(r.project.shell,undefined);assert.deepEqual(r.project.colors,{organizer:'#123456'});
 const plain=captureStyle({...source(),lid:false,shell:undefined});assert.equal(plain.lid,undefined);assert.equal(plain.shell,undefined);
});
test('colors only preserves every pattern; patterns only preserves colors and assignments',()=>{
 const p=source(),style=captureStyle({...source(),colors:{organizer:'#ffffff',shell:'#000000'},relief:undefined,lidDesign:{...p.lidDesign!,motif:'fern',baseColor:'#00ff00'}});
 const colors=previewStyle(p,style,{colors:true,patterns:false}).project;
 assert.deepEqual(colors.relief,p.relief);assert.equal(colors.lidDesign!.motif,'ginkgo');assert.equal(colors.lidDesign!.baseColor,'#00ff00');
 const patterns=previewStyle(p,style,{colors:false,patterns:true}).project;
 assert.deepEqual(patterns.colors,p.colors);assert.equal(patterns.lidDesign!.baseColor,p.lidDesign!.baseColor);assert.equal(patterns.relief,undefined);assert.equal(patterns.lidDesign!.motif,'fern');
 assert.deepEqual(previewStyle(p,style,{colors:false,patterns:false}).project,p);
});
test('an incompatible inset two-tone lid is skipped without altering its depth or fit',()=>{
 const p:Project={...defaultProject(),height:6.5,lid:true,lidDesign:{pattern:'lines',rimHeight:2,fit:'inset',handle:'none'}};resolveWalls(p);
 const result=previewStyle(p,captureStyle(source()));
 assert.ok(result.warnings.some(w=>w.label==='Узор крышки'));assert.equal(result.project.lidDesign!.olive,undefined);assert.equal(result.project.height,6.5);assert.equal(result.project.lidDesign!.fit,'inset');assert.equal(result.project.colors!.organizer,'#123456');
});
test('relief is skipped for thin walls and mounted panels without thickening or detaching them',()=>{
 for(const p of [{...defaultProject(),wallThickness:.6},{...defaultProject(),wallThickness:3.2,shell:{pattern:'diamonds' as const,size:8,gap:.6,thickness:1.6,mode:'panels' as const,mounts:true}}]){
  const result=previewStyle(p,captureStyle(source()));assert.ok(result.warnings.some(w=>w.label==='Рельеф органайзера'));assert.equal(result.project.relief,undefined);assert.equal(result.project.wallThickness,p.wallThickness);assert.equal(result.project.shell?.mounts,p.shell?.mounts);
 }
});
test('validated presets cannot carry layout or arbitrary lid geometry settings',()=>{
 const s=captureStyle(source());const value={...s,width:10,root:{id:'wrong'},lid:{...s.lid!,surface:{...s.lid!.surface,rimHeight:8,fit:'inset',handle:'bar'}}};
 assert.deepEqual(parseStyle(value),s);assert.throws(()=>parseStyle({...s,version:2}));assert.throws(()=>parseStyle({...s,organizerColor:'red'}));assert.throws(()=>parseStyle({...s,shell:{...s.shell,pattern:'bad'}}));
});
test('applying a style is a single independent undo step and a second application is a no-op',()=>{
 const p=defaultProject(),style=captureStyle(source());useEditor.setState({project:p,past:[],future:[],gesture:null,error:''});
 useEditor.getState().change(p=>previewStyle(p,style).project);assert.equal(useEditor.getState().past.length,1);const styled=useEditor.getState().project;
 assert.equal(previewStyle(styled,style).changes.length,0);useEditor.getState().undo();assert.deepEqual(useEditor.getState().project,p);useEditor.getState().redo();assert.deepEqual(useEditor.getState().project,styled);
 style.organizerColor='#ffffff';assert.equal(styled.colors!.organizer,'#123456');
});
test('style remains usable on circular and capsule destinations',()=>{
 for(const p of [{...defaultProject(),footprint:'circle' as const},{...defaultProject(),width:180,depth:80,cornerRadius:40}]){
  const result=previewStyle(p,captureStyle(source()));assert.equal(result.project.width,p.width);assert.equal(result.project.depth,p.depth);assert.equal(result.project.cornerRadius,p.cornerRadius);resolveWalls(result.project);
 }
});
test('styled rounded lid exports its two colors while retaining destination dimensions',async()=>{
 const p:Project={...defaultProject(),width:80,depth:60,cornerRadius:8,lid:true};
 const s=captureStyle({...source(),shell:undefined,relief:undefined});const styled=previewStyle(p,s).project;
 const parts=await buildKit(styled);const colors=parts.filter(p=>p.kind==='lid').map(p=>p.color);
 assert.ok(colors.includes('#f0dfd2'));assert.ok(colors.includes('#335f3d'));assert.equal(parts.find(p=>p.kind==='organizer')!.inspection.bounds.max[0],80);
 const data=formatExport(parts.map(part=>({name:part.name,stl:part.stl,color:part.color??'#123456'})),'3mf').data;
 const text=new TextDecoder().decode(data);assert.match(text,/#F0DFD2FF/);assert.match(text,/#335F3DFF/);
});
