import type {Project} from './model.js';
import {levelProject} from './accessories.js';

/** A retained preview can still contain tiers removed from the current project. */
export function previewLevelProject(current:Project,source:Project|null,level:number):Project {
 if(current.stack?.levels[level])return levelProject(current,level);
 if(source?.stack?.levels[level])return levelProject(source,level);
 return current;
}
export const defaultColors={organizer:'#8cbaa8',shell:'#c58d62'};
export const partColor=(p:Project,part:'organizer'|'shell')=>p.colors?.[part]??defaultColors[part];

export const defaultInsertColor='#c0cdb5';
export const insertColor=(p:Project,cellId?:string)=>p.cups?.find(c=>c.cellId===cellId)?.color??defaultInsertColor;

/** Unset handle colors follow the lid base; explicit colors stay independent. */
export function lidBaseColor(p:Project){
 const d=p.lidDesign;
 if(!d?.svg&&!d?.olive)return partColor(p,'organizer');
 return d.baseColor??((d.svg?d.svgMode!=='cutout':d.olive)?'#f7f3e8':partColor(p,'organizer'));
}
export const lidHandleColor=(p:Project)=>p.lidDesign?.handleColor??lidBaseColor(p);
