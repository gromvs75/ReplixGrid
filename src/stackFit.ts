import type {Project} from './model.js';
import {shellGap} from './reliefSize.js';
/** Enclose the upper tray's sleeve and its bottom support, not just its body. */
export function stackFit(upper:Project,gap:number,lower?:Project){
 const sleeve=upper.shell&&upper.shell.mode!=='panels'?shellGap(upper)+upper.shell.thickness:0;
 const refined=sleeve>0||!!(lower?.shell&&lower.shell.mode!=='panels');
 const inner=sleeve+gap,outer=inner+(refined?1.2:1.4);
 return {inner,outer,refined,flare:Math.max(2.25,outer),clearance:.3};
}
