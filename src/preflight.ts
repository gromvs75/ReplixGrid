import type {Project} from './model.js';
import {PIN_FIT_WARNING} from './pinJoint.js';
import {decodeSTL,inspectSurface} from './stl.js';
export function inspectPrintParts(p:Project,parts:{name:string;stl:ArrayBuffer}[]){
 const area=p.printArea??p.printing??{bedWidth:270,bedDepth:270,bedHeight:270};
 const rows=parts.map(part=>{const check=inspectSurface(decodeSTL(part.stl)),size=check.bounds.max.map((v,i)=>v-check.bounds.min[i]);const straight=size[0]<=area.bedWidth-4&&size[1]<=area.bedDepth-4,turned=size[1]<=area.bedWidth-4&&size[0]<=area.bedDepth-4;return {name:part.name,size,volume:check.volume,fits:(straight||turned)&&size[2]<=area.bedHeight,rotate:!straight&&turned};});
 const warnings:string[]=[];
 if(p.wallThickness<1.2||p.floorThickness<1.2||p.shell&&p.shell.thickness<1.2)warnings.push('Есть стенки или дно тоньше 1,2 мм. Проверьте линии в слайсере для своего сопла.');
 if(p.shell?.mounts)warnings.push('Скрытые крепления панелей экспериментальные. Проверьте посадку пробной печатью; мелкие разрезные штифты требуют аккуратного снятия.');
 if(p.stack||p.lid||p.cups?.length)warnings.push('Посадочные зазоры требуют пробной печати вашим пластиком.');
 if(p.printing&&parts.some(part=>/^pin-/.test(part.name))){warnings.push('Для сборки необходимо склеить половины и штифты. Перед склейкой проверьте посадку.');warnings.push(PIN_FIT_WARNING);}
 if(p.tilt)warnings.push('Наклонные стенки: проверьте нависания и поддержки в слайсере.');
 return {area,rows,warnings,ok:rows.every(r=>r.fits)};
}
