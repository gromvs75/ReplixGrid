import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProject,resolveWalls} from '../src/model.js';
import {splitCell,parseProject} from '../src/editor.js';
import {useEditor} from '../src/store.js';
import {resetDimensionDraft,useDimensionDraft,commitDimensionDraft,dimensionDraftProject} from '../src/dimensionDraft.js';
import {setWallHeight,wallHeightControls} from '../src/wallDimensions.js';

test('shared draft previews without mutating, commits once, and rejects stale selections',()=>{
 const p=splitCell(defaultProject(),'root','x'),id=p.root.split!.first.id;
 useEditor.setState({project:p,selection:{type:'cell',id},past:[],future:[],error:'',gesture:null});resetDimensionDraft(p,id,'x');
 useDimensionDraft.setState({draft:'40',inline:true});assert.equal(useEditor.getState().project,p);assert.ok(dimensionDraftProject(p,id,'x','40'));
 assert.equal(commitDimensionDraft(),true);assert.equal(useEditor.getState().past.length,1);assert.equal(useDimensionDraft.getState().draft,null);
 useEditor.getState().undo();assert.deepEqual(useEditor.getState().project,p);
 resetDimensionDraft(p,id,'x');useDimensionDraft.setState({draft:'999'});assert.equal(commitDimensionDraft(),false);assert.equal(useEditor.getState().past.length,0);
 useDimensionDraft.setState({draft:'42'});useEditor.getState().select({type:'wall',id:'front'});assert.equal(commitDimensionDraft(),false);
 for(const value of ['', ' ', 'NaN', 'Infinity', '-1'])assert.equal(dimensionDraftProject(p,id,'x',value),null);
});
test('flat and endpoint wall edits share sidebar semantics and serialize',()=>{
 const p=splitCell(defaultProject(),'root','x');let next=setWallHeight(p,'front','flat',42);
 assert.equal(next.heights.front,42);assert.equal(next.heights.back,undefined);
 next=setWallHeight(next,'root','flat',35);assert.equal(next.root.split!.height,35);
 next=setWallHeight(next,'root','start',22);assert.deepEqual(next.root.split!.profile,{start:22,end:35,style:'straight'});
 assert.deepEqual(wallHeightControls(next,'root')!.keys,['start','end']);assert.deepEqual(parseProject(JSON.stringify(next)),next);
 assert.throws(()=>setWallHeight(next,'front','flat',1));assert.throws(()=>setWallHeight(next,'front','flat',NaN));
});
test('linked wall endpoint edits keep their source links',()=>{
 let p=defaultProject();p.transitions=['left','right'];p.wallProfiles={front:{start:12,end:25,style:'wavy'},back:{start:65,end:80,style:'straight'}};
 p=setWallHeight(p,'left','end',70);assert.equal(p.wallProfiles!.back!.start,70);assert.deepEqual(p.transitions,['left','right']);assert.equal(p.wallProfiles!.back!.end,80);
});
test('step height editing preserves stepped-wall connections',()=>{
 let p=splitCell(defaultProject(),'root','x',3);p.steppedWalls=true;
 p=setWallHeight(p,'front@1','flat',40);assert.equal(resolveWalls(p).find(w=>w.id==='back')!.stepPoints![1][1],40);
 p=setWallHeight(p,'left','flat',25);assert.equal(resolveWalls(p).find(w=>w.id==='front')!.stepPoints![0][1],25);
});
