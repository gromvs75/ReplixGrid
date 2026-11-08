import {useEffect, useRef} from 'react';
import {t,getLocale} from '../i18n.js';

const guideRoot = 'https://github.com/gromvs75/ReplixGrid/blob/main/docs/';

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

  return <details className="help-picker" ref={disclosure} lang="en"
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
    <summary>Help <span aria-hidden="true">⌄</span></summary>
    <nav aria-label="Help" className="theme-menu help-links">
      {onStartGuide&&<button lang={getLocale()} onClick={()=>{if(disclosure.current)disclosure.current.open=false;onStartGuide();}}>{t('Помощник: три шага')}</button>}
      <a href={guideRoot + 'USER-GUIDE.md'} target="_blank" rel="noopener noreferrer">Quick Start ↗</a>
      <a href={import.meta.env.BASE_URL + 'guides/quick-start-en.mp4'} target="_blank" rel="noopener noreferrer">Watch Quick Start (1:03) ↗</a>
      <a href={guideRoot + 'REFERENCE.md'} target="_blank" rel="noopener noreferrer">User Guide ↗</a>
    </nav>
  </details>;
}
