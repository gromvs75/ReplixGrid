import {PANEL_SEATED_GAP,panelMountsAvailable} from './panelSettings.js';
import type {Project} from './model.js';
export const reliefHeight=(p:Project)=>p.relief?.depth??0;
/** Sleeve clears the tallest peaks. Compensate shear so the normal gap cannot shrink. */
export const shellGap=(p:Project)=>p.shell?.mode==='panels'&&p.shell.mounts&&panelMountsAvailable(p) ? PANEL_SEATED_GAP : (p.shell?.gap??0)/Math.cos((p.tilt??0)*Math.PI/180)+reliefHeight(p);
