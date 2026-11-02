import type {Side} from './model.js';
// Model axes/IDs stay stable for saved projects and exports. The user looks
// from -X towards +X: the low end of the slope template is the front.
export const sideNames:Record<Side,string>={left:'Передняя',right:'Задняя',back:'Левая',front:'Правая'};
export const sideOrder:Side[]=['left','right','back','front'];
export const endLabels=(axis:'x'|'y')=>axis==='x'
 ?['А · Высота спереди','Б · Высота сзади']
 :['А · Высота справа','Б · Высота слева'];
export const transitionNeighbors=(side:Side)=>side==='front'||side==='back'?'передней и задней':'левой и правой';
