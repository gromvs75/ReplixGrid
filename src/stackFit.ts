import type {Project} from './model.js';
import {shellGap} from './reliefSize.js';
/** Enclose the upper tray's sleeve and its bottom support, not just its body. */
export function stackFit(upper:Project,gap:number){
 const sleeve=upper.shell&&upper.shell.mode!=='panels'?shellGap(upper)+upper.shell.thickness:0;
 const inner=sleeve+gap,outer=inner+1.4;
 return {inner,outer,flare:Math.max(2.25,outer),clearance:.3};
}
