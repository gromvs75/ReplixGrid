import {useEffect,useRef,type ReactNode} from 'react';
import {getLocale} from '../i18n.js';

export function HeaderMenu({label,children}:{label:string;children:ReactNode}){
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
    <summary>{label} <span aria-hidden="true">⌄</span></summary>
    <nav aria-label={label} className="theme-menu help-links" onClick={()=>{if(disclosure.current)disclosure.current.open=false;}}>
      {children}
    </nav>
  </details>;
}
