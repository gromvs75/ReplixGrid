import type {Project,Side} from './model.js';
export const panelSides=(p:Project):Side[]=>p.shell?.sides??['front','back'];
export function panelIssue(p:Project):string|null{
 if(p.footprint)return 'Отдельные панели пока доступны для прямоугольной основы со скруглением или фаской.';
 if(p.printing)return 'Для отдельных панелей отключите разделение для печати.';
 return null;
}
export function panelMountsAvailable(p:Project){return p.wallThickness>=PANEL_WALL_MIN&&!p.relief;}

export const PANEL_WALL_MIN=3.2;
export const PANEL_SEATED_GAP=.6;
/** Upgrade legacy projects as well as edits, without reducing thicker walls. */
export function ensurePanelThickness(p:Project){
 if(p.shell?.mode==='panels'&&Number.isFinite(p.wallThickness))p.wallThickness=Math.max(PANEL_WALL_MIN,p.wallThickness);
 for(const level of p.stack?.levels??[]){
  const settings=level.settings;
  if(settings?.shell?.mode==='panels')settings.wallThickness=Math.max(PANEL_WALL_MIN,settings.wallThickness??p.wallThickness);
 }
 return p;
}
