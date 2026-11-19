import {HeaderMenu} from './HeaderMenu.js';
import {t,getLocale} from '../i18n.js';

import {helpDocumentUrl} from '../helpDocs.js';

export function HelpMenu({onStartGuide}:{onStartGuide?:()=>void}={}) {
  return <HeaderMenu label={t('Помощь')}>
      {onStartGuide&&<button lang={getLocale()} onClick={onStartGuide}>{t('Помощник: три шага')}</button>}
      <a href={helpDocumentUrl('USER-GUIDE',getLocale())} target="_blank" rel="noopener noreferrer">{t('Быстрый старт')} ↗</a>
      <a href={import.meta.env.BASE_URL + 'guides/quick-start-en.mp4'} target="_blank" rel="noopener noreferrer">{t('Видео: быстрый старт (1:03, на английском)')} ↗</a>
      <a href={helpDocumentUrl('REFERENCE',getLocale())} target="_blank" rel="noopener noreferrer">{t('Руководство пользователя')} ↗</a>
  </HeaderMenu>;
}
