import {cellById,editProject,setStepHeight} from './editor.js';
import {resolveWalls,type Project,type Side} from './model.js';
const sides=['front','back','left','right'];
const sources:Record<Side,[Side,Side]>={front:['left','right'],back:['left','right'],left:['front','back'],right:['front','back']};
export type WallHeightKey='flat'|'start'|'end';
export function wallHeightControls(p:Project,id:string){
 const [wallId,step]=id.split('@'),wall=resolveWalls(p).find(w=>w.id===wallId);if(!wall)return null;
 const outer=sides.includes(wallId),side=wallId as Side;
 const linked=outer&&p.transitions.includes(side),profile=outer?p.wallProfiles?.[side]:cellById(p.root,wallId)?.split?.profile;
 const stepIndex=step===undefined?undefined:Number(step);
 const stepped=outer&&p.steppedWalls;
 const height=stepIndex!==undefined?wall.stepPoints?.[stepIndex]?.[1]:wall.startHeight;
 if(height===undefined)return null;
 const keys:WallHeightKey[]=stepped?['flat']:linked||profile?['start','end']:['flat'];
 return {wall,outer,linked,stepIndex,keys,min:p.floorThickness+.4,max:stepped?200:Math.max(200,wall.startHeight,wall.endHeight),height};
}
export function setWallHeight(p:Project,id:string,key:WallHeightKey,value:number):Project{
 const c=wallHeightControls(p,id);if(!c||!Number.isFinite(value)||value<c.min||value>c.max)throw new Error('Проверьте размер и ограничения модели.');
 const {wall,outer,linked,stepIndex}=c,side=wall.id as Side;
 if(outer&&p.steppedWalls){
  if(side==='left'||side==='right')return setStepHeight(p,'front',side==='left'?0:resolveWalls(p).find(w=>w.id==='front')!.stepPoints!.length-1,value);
  if(stepIndex!==undefined)return setStepHeight(p,side as 'front'|'back',stepIndex,value);
 }
 return editProject(p,d=>{
  if(key==='flat'){
   if(outer){d.transitions=d.transitions.filter(s=>s!==side);if(d.wallProfiles)delete d.wallProfiles[side];d.heights[side]=value;}
   else {const split=cellById(d.root,wall.id)!.split!;delete split.profile;split.height=value;}
  }else if(linked){
   const source=sources[side][key==='start'?0:1],profile=d.wallProfiles?.[source];
   if(profile)profile[side==='front'||side==='left'?'start':'end']=value;else d.heights[source]=value;
  }else{
   const profile=outer?(d.wallProfiles??={})[side]??= {start:wall.startHeight,end:wall.endHeight,style:'straight'}:cellById(d.root,wall.id)!.split!.profile??={start:wall.startHeight,end:wall.endHeight,style:'straight'};
   profile[key]=value;
  }
 });
}
