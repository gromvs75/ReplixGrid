import {create} from 'zustand';
import type {Project} from './model.js';

export type FilamentSlot={color:string;name:string};
const key='replixgrid.filament-slots.v1';
type Palettes=Record<string,FilamentSlot[]>;
function restore():Palettes{try{const value=JSON.parse(localStorage.getItem(key)??'{}');if(!value||typeof value!=='object'||Array.isArray(value))return {};return Object.fromEntries(Object.entries(value).filter(([,slots])=>Array.isArray(slots)).map(([id,slots])=>[id,(slots as unknown[]).slice(0,16).filter((s):s is FilamentSlot=>!!s&&typeof s==='object'&&typeof (s as FilamentSlot).color==='string'&&/^#[0-9a-f]{6}$/i.test((s as FilamentSlot).color)&&typeof (s as FilamentSlot).name==='string')]));}catch{return {};}}
export const useFilaments=create<{palettes:Palettes;save:(id:string,slots:FilamentSlot[])=>void}>(set=>({palettes:restore(),save:(id,slots)=>set(state=>{const palettes={...state.palettes,[id]:slots};try{localStorage.setItem(key,JSON.stringify(palettes));}catch{/* Storage can be unavailable. */}return {palettes};})}));
export function filamentPrinterKey(p:Project){return (p.printing??p.printArea)?.printerId??'custom';}
export function slotMap(slots:FilamentSlot[]):Record<string,number>{
 const counts=new Map<string,number>();for(const s of slots)if(/^#[0-9a-f]{6}$/i.test(s.color))counts.set(s.color.toLowerCase(),(counts.get(s.color.toLowerCase())??0)+1);
 const result:Record<string,number>={};slots.forEach((s,i)=>{const c=s.color.toLowerCase();if(counts.get(c)===1)result[c]=i+1;});return result;
}
