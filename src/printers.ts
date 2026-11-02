import type {Project,PrintSettings} from './model.js';

type Area=Omit<PrintSettings,'parts'>;
export interface PrinterPreset {id:string;name:string;configuration:string;area:Area;source:string}
const make=(id:string,name:string,configuration:string,size:[number,number,number],source:string):PrinterPreset=>({id,name,configuration,area:{bedWidth:size[0],bedDepth:size[1],bedHeight:size[2]},source});
const series='https://us.snapmaker.com/pages/snapmaker-3d-printer';
const quick='https://shop.snapmaker.com/products/snapmaker-2-0-modular-3-in-1-3d-printer-a350t-a250t';
// Published working volumes, not physical bed dimensions. Sources checked 2026-10-26.
export const printerPresets:PrinterPreset[]=[
 make('u1','Snapmaker U1','Стандартный',[270,270,270],'https://wiki.snapmaker.com/en/FAQ/u1'),
 make('artisan-dual','Snapmaker Artisan','Две насадки',[350,400,400],'https://www.snapmaker.com/en-US/snapmaker-artisan/specs/'),
 make('artisan-left','Snapmaker Artisan','Только левая насадка',[375,400,400],'https://www.snapmaker.com/en-US/snapmaker-artisan/specs/'),
 make('artisan-right','Snapmaker Artisan','Только правая насадка',[400,400,400],'https://www.snapmaker.com/en-US/snapmaker-artisan/specs/'),
 ...['J1','J1s'].map(model=>make(model.toLowerCase(),`Snapmaker ${model}`,'Обычный / резервный режим',[300,200,200],'https://www.snapmaker.com/en-US/j1s-idex-3d-printer/specs')),
 make('a150','Snapmaker 2.0 A150','Одна насадка',[160,160,145],'https://s3-us-west-2.amazonaws.com/snapmaker.com/download/manual/Snapmaker2_A250_EN_V1.3.0.pdf'),
 ...(['A250','A250T','A350','A350T'] as const).map(model=>make(model.toLowerCase(),`Snapmaker 2.0 ${model}`,'Одна насадка · без Quick Swap',model.startsWith('A250')?[230,250,235]:[320,350,330],series)),
 ...(['A250T','A350T'] as const).flatMap(model=>[
 make(model.toLowerCase()+'-quick-single',`Snapmaker 2.0 ${model}`,'Quick Swap · одна насадка',model==='A250T'?[230,235,215]:[320,335,310],quick),
 make(model.toLowerCase()+'-quick-dual',`Snapmaker 2.0 ${model}`,'Quick Swap · две насадки',model==='A250T'?[230,225,175]:[320,315,270],quick),
 ]),
];
export function matchingPrinter(p:Project):PrinterPreset|undefined{
 const a=p.printing??p.printArea;
 return a&&printerPresets.find(v=>v.id===a.printerId&&v.area.bedWidth===a.bedWidth&&v.area.bedDepth===a.bedDepth&&v.area.bedHeight===a.bedHeight);
}
export function withPrinter(p:Project,id:string):Project{
 const preset=printerPresets.find(v=>v.id===id);
 const area=preset?{...preset.area,printerId:preset.id}:{...(p.printing??p.printArea??{bedWidth:270,bedDepth:270,bedHeight:270}),printerId:undefined};
 return {...p,printArea:area,printing:p.printing?{...p.printing,...area}:undefined};
}
