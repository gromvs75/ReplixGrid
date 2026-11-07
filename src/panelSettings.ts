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
