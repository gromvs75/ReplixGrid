import type {Project} from './model.js';
import {shellGap} from './reliefSize.js';

/** The original flat tray geometry is retained for already printed sleeves. */
export function hasLegacyShellSupport(p:Project){
 return !!p.shell&&p.shell.mode!=='panels'&&!p.shell.snap&&!p.stack&&!p.printing&&!p.tilt&&!p.footprint&&!p.relief&&!p.lid&&p.floorThickness>=1.2&&!p.transitions.length&&!Object.keys(p.cutouts??{}).length&&!Object.keys(p.wallProfiles??{}).length&&Object.values(p.heights).every(height=>height===p.height);
}
export function hasShellSupport(p:Project){
 return !!p.shell&&p.shell.mode!=='panels'&&!p.shell.snap&&!p.stack&&!p.printing&&!p.tilt&&p.floorThickness>=1.2;
}
/** Extended support is opt-in through the decorative rim; old projects remain unchanged. */
export function hasDecorativeShellSupport(p:Project){
 return !!p.baseBand&&!!p.shell&&p.shell.mode!=='panels'&&!p.shell.snap&&!p.stack&&!p.printing&&!p.tilt&&p.floorThickness>=1.2;
}
export const SHELL_SUPPORT_HEIGHT=1.2;
export function shellSupportHeight(p:Project){return p.baseBand?.height??SHELL_SUPPORT_HEIGHT;}
export function shellSupportWidth(p:Project){return p.shell?shellGap(p)+p.shell.thickness:0;}
