import {HeaderMenu} from './HeaderMenu.js';
import {PrinterDialog} from './PrinterDialog.js';
import {useEffect,useState,type ReactNode} from 'react';
import {SlidingSegments} from './SlidingSegments.js';
import {ThemePicker,type Theme} from './ThemePicker.js';
import {LanguagePicker} from './LanguagePicker.js';
import {HelpMenu} from './HelpMenu.js';
import {t,getLocale} from '../i18n.js';
export type WorkspaceMode='organizer'|'drawer'|'gridfinity';
export function WorkspaceModes({mode,onChange}:{mode:WorkspaceMode;onChange:(mode:WorkspaceMode)=>void}){
 return <SlidingSegments navigation className="mode-switch" label={t('Режим работы')}>{(['organizer','drawer','gridfinity'] as const).map(value=><button key={value} aria-pressed={mode===value} onClick={()=>onChange(value)}>{t(value==='organizer'?'Органайзер':value==='drawer'?'Ящик':'Gridfinity')}</button>)}</SlidingSegments>;
}
export function WorkspaceHeader({navigation,status,actions,children}:{navigation:ReactNode;status:string;actions:ReactNode;children?:ReactNode}){
 const [printerOpen,setPrinterOpen]=useState(false);
 return <header className="workspace-header"><a className="brand" href="#" aria-label="ReplixGrid"><img className="brand-mark" src="/replixgrid-mark.svg" alt=""/>Replix<span>Grid</span><small>{t('МАСТЕРСКАЯ')}</small></a>{navigation}<div className="header-middle"><span className="save-dot"/>{t(status)}</div><div className="header-actions"><button className="quiet" aria-haspopup="dialog" onClick={()=>setPrinterOpen(true)}>{t('Принтер')}</button>{actions}</div>{children}{printerOpen&&<PrinterDialog onClose={()=>setPrinterOpen(false)}/>}</header>;
}
export function ProjectMenu({onNew,onProjects,newDisabled=false}:{onNew:()=>void;onProjects:()=>void;newDisabled?:boolean}){
 return <HeaderMenu label={t('Проекты')}>
  <button disabled={newDisabled} onClick={onNew}>{t('Новый проект')}</button>
  <button onClick={onProjects}>{t('Мои проекты')}</button>
 </HeaderMenu>;
}
export function WorkspaceActions({onNew,onProjects,onOpen,onSave,onDownload,disabled=false}:{onNew:()=>void;onProjects:()=>void;onOpen:()=>void;onSave:()=>void;onDownload:()=>void;disabled?:boolean}){
 const [theme,setTheme]=useState<Theme>(()=>{try{const value=localStorage.getItem('replixgrid.theme');return value==='dark'||value==='system'?value:'light';}catch{return 'light';}});
 useEffect(()=>{const media=matchMedia('(prefers-color-scheme: dark)'),apply=()=>{document.documentElement.dataset.theme=theme==='dark'||theme==='system'&&media.matches?'dark':'light';};apply();media.addEventListener('change',apply);try{localStorage.setItem('replixgrid.theme',theme);}catch{}return()=>media.removeEventListener('change',apply);},[theme]);
 const labels:Record<string,[string,string,string,string]>={ru:['Тема','Светлая','Тёмная','Как в системе'],en:['Theme','Light','Dark','System'],de:['Design','Hell','Dunkel','System'],fr:['Thème','Clair','Sombre','Système'],es:['Tema','Claro','Oscuro','Sistema'],it:['Tema','Chiaro','Scuro','Sistema'],uk:['Тема','Світла','Темна','Як у системі'],pl:['Motyw','Jasny','Ciemny','System'],cs:['Motiv','Světlý','Tmavý','Systém'],el:['Θέμα','Ανοιχτό','Σκούρο','Συστήματος'],'zh-CN':['主题','浅色','深色','跟随系统']};
 return <><ThemePicker theme={theme} onChange={setTheme} labels={labels[getLocale()]??labels.en}/><LanguagePicker/><HelpMenu/><ProjectMenu onNew={onNew} onProjects={onProjects}/><button className="quiet" onClick={onOpen}>{t('Открыть')}</button><button className="quiet" disabled={disabled} onClick={onSave}>{t('Сохранить проект')}</button><button className="primary" disabled={disabled} onClick={onDownload}>{t('↓ Скачать')}</button></>;
}
