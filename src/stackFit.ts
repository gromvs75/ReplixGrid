import type {Project} from './model.js';
export const SOCKET_BASE=2.2;
export const SHELL_SEAM=.8;
/** Hidden tongue stays within the lower wall; the socket is added below the upper floor. */
export function stackFit(upper:Project,gap:number,lower?:Project){
 const hidden=!!(upper.shell&&upper.shell.mode!=='panels'||lower?.shell&&lower.shell.mode!=='panels');
 return {hidden,outer:gap+1.4,inner:gap,flare:2.25,tongueOuter:-gap-.6,tongueInner:-gap-1.4,tongueHeight:1.6,socketDepth:1.8,base:SOCKET_BASE};
}
