import type {Project} from './model.js';
import type {BedSettings} from './bedPacking.js';
/** Both assembly workspaces use the configured printer, with the same fallback. */
export function configuredBedSettings(printer:Project,fallback?:BedSettings):BedSettings{
 const area=printer.printArea??printer.printing;
 return area?{length:area.bedWidth,width:area.bedDepth,height:area.bedHeight,gap:fallback?.gap??5}:fallback??{length:270,width:270,height:270,gap:5};
}
