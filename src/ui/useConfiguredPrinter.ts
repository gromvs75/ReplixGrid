import {useEffect,useState} from 'react';
import {useEditor} from '../store.js';
import {loadSaved} from '../storage.js';
import type {Project} from '../model.js';
/** Reuse the existing printer configuration, including a direct workspace reload. */
export function useConfiguredPrinter(){
 const current=useEditor(s=>s.project),[saved,setSaved]=useState<Project|null>(null);
 useEffect(()=>{if(current.printing||current.printArea)return;let active=true;void loadSaved().then(p=>{if(active)setSaved(p);}).catch(()=>{});return()=>{active=false;};},[current.printing,current.printArea]);
 return current.printing||current.printArea?current:saved??current;
}
