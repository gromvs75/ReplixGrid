import type {Project} from './model.js';
export const defaultColors={organizer:'#8cbaa8',shell:'#c58d62'};
export const partColor=(p:Project,part:'organizer'|'shell')=>p.colors?.[part]??defaultColors[part];

export const defaultInsertColor='#c0cdb5';
export const insertColor=(p:Project,cellId?:string)=>p.cups?.find(c=>c.cellId===cellId)?.color??defaultInsertColor;
