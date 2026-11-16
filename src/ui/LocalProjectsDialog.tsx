import {useEffect,useRef,type ReactNode} from 'react';
import {t} from '../i18n.js';
export function LocalProjectsDialog({children,onClose}:{children:ReactNode;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{dialog.current?.showModal();return()=>dialog.current?.close();},[]);
 return <dialog ref={dialog} className="export-dialog" onCancel={onClose} aria-label={t('Мои проекты')}><header><h2>{t('Мои проекты')}</h2><button autoFocus aria-label={t('Закрыть')} onClick={onClose}>×</button></header><div className="local-project-list">{children}</div></dialog>;
}
