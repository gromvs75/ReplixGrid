import type {Project,ShellSettings} from './model.js';
import {panelMountsAvailable} from './panelSettings.js';
import {defaultShell} from './shell.js';

/** Bottom trim supports a wrapped sleeve; use panels only for new tier decorations without trim. */
export function shellForPattern(p:Project,pattern:ShellSettings['pattern']):ShellSettings{
 if(p.shell)return {...p.shell,svg:undefined,pattern,size:pattern==='cubes'?Math.max(5,p.shell.size):p.shell.size};
 const shell=defaultShell(pattern);
 if(!p.stack||p.baseBand)return shell;
 const candidates=(['front','back','left','right'] as const).filter(side=>!p.cutouts?.[side]);
 const sides=candidates.length?candidates.slice(0,2):(['front','back'] as const).slice();
 return {...shell,mode:'panels',sides,margin:4,mounts:panelMountsAvailable(p)&&candidates.length>0};
}
