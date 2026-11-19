import {useEffect,useMemo} from 'react';
import {create} from 'zustand';
import {useEditor} from '../store.js';
import {loadSaved} from '../storage.js';
import {validatePrintArea,type Project,type PrintSettings} from '../model.js';

type Area=Omit<PrintSettings,'parts'>;
const key='replixgrid.printer';
function readArea():Area|undefined{
 try{
  const area=JSON.parse(localStorage.getItem(key)??'null');
  validatePrintArea(area);
  return area;
 }catch{return undefined;}
}
const usePrinterArea=create<{area?:Area}>(()=>({area:readArea()}));
export function savePrinterArea({bedWidth,bedDepth,bedHeight,printerId}:Area){
 const area={bedWidth,bedDepth,bedHeight,printerId};
 validatePrintArea(area);
 usePrinterArea.setState({area});
 try{localStorage.setItem(key,JSON.stringify(area));}catch{/* Session-only settings. */}
}
if(typeof window!=='undefined')window.addEventListener('storage',event=>{
 if(event.key===key||event.key===null)usePrinterArea.setState({area:readArea()});
});

let restore:Promise<void>|undefined;
export function useConfiguredPrinter(source?:Project){
 const current=useEditor(s=>s.project),project=source??current,area=usePrinterArea(s=>s.area);
 useEffect(()=>{
  if(area)return;
  restore??=loadSaved().then(saved=>{
   const legacy=saved?.printing??saved?.printArea;
   if(legacy&&!usePrinterArea.getState().area)savePrinterArea(legacy);
  }).catch(()=>{});
 },[area]);
 return useMemo(()=>area?{...project,printArea:area,printing:project.printing?{...project.printing,...area,printerId:area.printerId}:undefined}:project,[project,area]);
}
