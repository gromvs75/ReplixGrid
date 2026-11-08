import {create} from 'zustand';
import type {Project} from './model.js';

export type FilamentSlot={color:string;name:string;slot?:number};
const key='replixgrid.filament-slots.v1';
type Palettes=Record<string,FilamentSlot[]>;
export function slotNumber(slot:FilamentSlot,index:number){return slot.slot??index+1;}
export function normalizeSlots(value:unknown):FilamentSlot[]{
 if(!Array.isArray(value))return [];
 const seen=new Set<number>();
 return value.slice(0,16).flatMap((s,i)=>{
  if(!s||typeof s!=='object'||typeof s.color!=='string'||!/^#[0-9a-f]{6}$/i.test(s.color)||typeof s.name!=='string')return [];
  const slot=s.slot??i+1;
  if(!Number.isInteger(slot)||slot<1||slot>16||seen.has(slot))return [];
  seen.add(slot);return [{slot,color:s.color,name:s.name.slice(0,60)}];
 }).sort((a,b)=>a.slot-b.slot);
}
export function removeFilament(slots:FilamentSlot[],number:number){return normalizeSlots(slots).filter(s=>s.slot!==number);}
export function nextFilamentSlot(slots:FilamentSlot[]){const used=new Set(slots.map(slotNumber));return Array.from({length:16},(_,i)=>i+1).find(n=>!used.has(n));}
export function resolveFilamentAssignment(slots:FilamentSlot[],number:number|null){return number!==null&&slots.some((s,i)=>slotNumber(s,i)===number)?number:null;}
function restore():Palettes{try{const value=JSON.parse(localStorage.getItem(key)??'{}');if(!value||typeof value!=='object'||Array.isArray(value))return {};return Object.fromEntries(Object.entries(value).map(([id,slots])=>[id,normalizeSlots(slots)]));}catch{return {};}}
export const useFilaments=create<{palettes:Palettes;save:(id:string,slots:FilamentSlot[])=>void}>(set=>({palettes:restore(),save:(id,slots)=>set(state=>{const palettes={...state.palettes,[id]:normalizeSlots(slots)};try{localStorage.setItem(key,JSON.stringify(palettes));}catch{/* Storage can be unavailable. */}return {palettes};})}));
export function filamentPrinterKey(p:Project){return (p.printing??p.printArea)?.printerId??'custom';}
export function slotMap(slots:FilamentSlot[]):Record<string,number>{
 const counts=new Map<string,number>();for(const s of slots)if(/^#[0-9a-f]{6}$/i.test(s.color))counts.set(s.color.toLowerCase(),(counts.get(s.color.toLowerCase())??0)+1);
 const result:Record<string,number>={};slots.forEach((s,i)=>{const c=s.color.toLowerCase();if(counts.get(c)===1)result[c]=slotNumber(s,i);});return result;
}
