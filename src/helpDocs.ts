import type {Locale} from './i18n.js';
export type HelpDocument='USER-GUIDE'|'REFERENCE';
/** Published translations use stable English anchor IDs for cross-language links. */
export function helpDocumentUrl(document:HelpDocument,locale:Locale){
 const path=locale==='en'?'':`locales/${locale}/`;
 return `https://github.com/gromvs75/ReplixGrid/blob/main/docs/${path}${document}.md`;
}
