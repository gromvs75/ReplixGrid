import {levelProject} from './accessories.js';
import {create} from 'zustand';
import {defaultProject,resolveWalls,limitSteppedChamfer,type Project} from './model.js';
import {regions} from './editor.js';
export type Selection={type:'cell'|'wall';id:string}|{type:'none';id:''};
interface EditorState{
  project:Project;selection:Selection;past:Project[];future:Project[];gesture:Project|null;error:string;
  select:(s:Selection)=>void;change:(fn:(p:Project)=>Project)=>void;
  begin:()=>void;end:()=>void;undo:()=>void;redo:()=>void;load:(p:Project)=>void;
}
export const useEditor=create<EditorState>((set,get)=>({
  project:defaultProject(),selection:{type:'cell',id:'root'},past:[],future:[],gesture:null,error:'',
  select:selection=>set({selection}),
  change:fn=>{try{const state=get(),next=limitSteppedChamfer(fn(freezeLegacyLevels(state.project)));resolveWalls(next);if(JSON.stringify(next)===JSON.stringify(state.project))return;set({project:next,past:state.gesture?state.past:[...state.past,state.project].slice(-60),future:[],error:''});}catch(e){set({error:e instanceof Error?e.message:'Не удалось изменить конструкцию'});}},
  begin:()=>{if(!get().gesture)set({gesture:get().project});},
  end:()=>{const s=get();if(s.gesture)set({past:JSON.stringify(s.project)!==JSON.stringify(s.gesture)?[...s.past,s.gesture].slice(-60):s.past,gesture:null});},
  undo:()=>{get().end();const s=get(),p=s.past.at(-1);if(p)set({project:p,past:s.past.slice(0,-1),future:[s.project,...s.future],selection:{type:'cell',id:p.root.id},error:''});},
  redo:()=>{const s=get(),p=s.future[0];if(p)set({project:p,past:[...s.past,s.project],future:s.future.slice(1),selection:{type:'cell',id:p.root.id},error:''});},
  load:p=>{p=limitSteppedChamfer(structuredClone(p));resolveWalls(p);get().change(()=>p);set({selection:{type:'cell',id:regions(p).find(r=>!r.cell.split)!.cell.id}});},
}));

function freezeLegacyLevels(p:Project):Project{
 if(!p.stack||p.stack.levels.every(l=>l.settings))return p;
 const d=structuredClone(p);
 d.stack!.levels=d.stack!.levels.map((l,i)=>{
  if(l.settings)return l;
  const {stack,lid,width,depth,cornerRadius,cornerStyle,footprint,printArea,...settings}=levelProject(p,i);
  return {...l,settings};
 });
 return d;
}
