import {useEffect, useRef} from 'react';
import {t,getLocale} from '../i18n.js';

import {helpDocumentUrl} from '../helpDocs.js';

export function HelpMenu({onStartGuide}:{onStartGuide?:()=>void}={}) {
  const disclosure = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      const menu = disclosure.current;
      if (menu?.open && !menu.contains(event.target as Node)) menu.open = false;
    }
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);

  return <details className="help-picker" ref={disclosure} lang={getLocale()}
    onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
    }}
    onKeyDown={event => {
      if (event.key === 'Escape' && event.currentTarget.open) {
        event.stopPropagation();
        event.currentTarget.open = false;
        event.currentTarget.querySelector('summary')?.focus();
      }
    }}>
    <summary>{t('Помощь')} <span aria-hidden="true">⌄</span></summary>
    <nav aria-label={t('Помощь')} className="theme-menu help-links">
      {onStartGuide&&<button lang={getLocale()} onClick={()=>{if(disclosure.current)disclosure.current.open=false;onStartGuide();}}>{t('Помощник: три шага')}</button>}
      <a href={helpDocumentUrl('USER-GUIDE',getLocale())} target="_blank" rel="noopener noreferrer">{t('Быстрый старт')} ↗</a>
      <a href={import.meta.env.BASE_URL + 'guides/quick-start-en.mp4'} target="_blank" rel="noopener noreferrer">{t('Видео: быстрый старт (1:03, на английском)')} ↗</a>
      <a href={helpDocumentUrl('REFERENCE',getLocale())} target="_blank" rel="noopener noreferrer">{t('Руководство пользователя')} ↗</a>
    </nav>
  </details>;
}
