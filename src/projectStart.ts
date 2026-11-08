import {organizerTemplate,type TemplateShape} from './templates.js';
import type {Project} from './model.js';
/** A fresh body with no partitions or decorations; keep only printer selection. */
export function emptyOrganizer(shape:TemplateShape,current?:Project):Project{
 const project=organizerTemplate(shape,'flat',current);
 delete project.root.split;
 return project;
}
const startKey='replixgrid.empty-start';
export function isEmptyStart(){try{return sessionStorage.getItem(startKey)==='1';}catch{return false;}}
export function rememberEmptyStart(empty:boolean){try{if(empty)sessionStorage.setItem(startKey,'1');else sessionStorage.removeItem(startKey);}catch{/* The current page still works without storage. */}}
