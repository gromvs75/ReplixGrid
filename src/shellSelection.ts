import type {Project,ShellSettings} from './model.js';
import {defaultShell} from './shell.js';

/** Keep the existing panel default for a new tier decoration; wrapped sleeves can be selected explicitly. */
export function shellForPattern(p:Project,pattern:ShellSettings['pattern']):ShellSettings{
 if(p.shell)return {...p.shell,pattern,size:pattern==='cubes'?Math.max(5,p.shell.size):p.shell.size};
 const shell=defaultShell(pattern);
 if(!p.stack)return shell;
 const candidates=(['front','back','left','right'] as const).filter(side=>!p.cutouts?.[side]);
 const sides=candidates.length?candidates.slice(0,2):(['front','back'] as const).slice();
 return {...shell,mode:'panels',sides,margin:4,mounts:!p.relief&&candidates.length>0};
}
