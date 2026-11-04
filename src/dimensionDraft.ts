import {create} from 'zustand';
import type {Project} from './model.js';
import {resizeCompartment,type DimensionAxis} from './compartmentDimensions.js';
import {useEditor} from './store.js';

export const useDimensionDraft=create<{
 id:string;axis:DimensionAxis;project:Project|null;draft:string|null;inline:boolean;
}>(()=>({id:'',axis:'x',project:null,draft:null,inline:false}));

export function resetDimensionDraft(project:Project|null,id:string,axis=useDimensionDraft.getState().axis){
 useDimensionDraft.setState({project,id,axis,draft:null,inline:false});
}
export function dimensionDraftProject(p:Project,id:string,axis:DimensionAxis,draft:string|null){
 if(draft===null)return p;
 if(!draft.trim())return null;
 try{return resizeCompartment(p,id,axis,Number(draft));}catch{return null;}
}
/** Both input surfaces share one draft, and only this explicit commit mutates geometry. */
export function commitDimensionDraft(){
 const d=useDimensionDraft.getState(),s=useEditor.getState();
 if(d.project!==s.project||s.selection.type!=='cell'||s.selection.id!==d.id)return false;
 const next=dimensionDraftProject(s.project,d.id,d.axis,d.draft);if(!next)return false;
 s.change(()=>next);
 if(useEditor.getState().error)return false;
 resetDimensionDraft(useEditor.getState().project,d.id,d.axis);return true;
}
