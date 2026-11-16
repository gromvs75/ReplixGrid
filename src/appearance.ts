import type {Project} from './model.js';
import {levelProject} from './accessories.js';

/** A retained preview can still contain tiers removed from the current project. */
export function previewLevelProject(current:Project,source:Project|null,level:number):Project {
 if(current.stack?.levels[level])return levelProject(current,level);
 if(source?.stack?.levels[level])return levelProject(source,level);
 return current;
}
export const defaultModelColor='#95B9C6';
export const defaultColors={organizer:defaultModelColor,shell:defaultModelColor};
export const partColor=(p:Project,part:'organizer'|'shell')=>p.colors?.[part]??defaultColors[part];

export const defaultInsertColor=defaultModelColor;
export const insertColor=(p:Project,cellId?:string)=>p.cups?.find(c=>c.cellId===cellId)?.color??defaultInsertColor;

/** Unset handle colors follow the lid base; explicit colors stay independent. */
export function lidBaseColor(p:Project){
 const d=p.lidDesign;
 if(!d?.svg&&!d?.olive)return partColor(p,'organizer');
 return d.baseColor??partColor(p,'organizer');
}
export const lidHandleColor=(p:Project)=>p.lidDesign?.handleColor??lidBaseColor(p);
