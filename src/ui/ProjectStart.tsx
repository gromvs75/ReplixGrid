import {t} from '../i18n.js';
import type {TemplateShape} from '../templates.js';
export function ProjectStart({busy,onCreate,onOpen,onLibrary}:{busy:boolean;onCreate:(shape:TemplateShape)=>void;onOpen:()=>void;onLibrary:()=>void}){
 return <main className="project-start"><div className="project-start-card"><p className="eyebrow">{t('НОВЫЙ ПРОЕКТ')}</p><h1>{t('Начните с формы')}</h1><p>{t('Выберите основу. Размеры и отсеки настроите дальше.')}</p>
 <ol className="start-steps"><li aria-current="step"><b>1</b>{t('Выберите форму')}</li><li><b>2</b>{t('Задайте размеры')}</li><li><b>3</b>{t('Добавьте отсеки')}</li></ol>
 <div className="start-shapes" role="group" aria-label={t('Выберите форму')}>{(['rounded','capsule','circle','oval','honeycomb'] as const).map(shape=><button key={shape} disabled={busy} onClick={()=>onCreate(shape)}><svg viewBox="0 0 90 60" aria-hidden="true">{shape==='circle'?<circle cx="45" cy="30" r="22"/>:shape==='oval'?<ellipse cx="45" cy="30" rx="37" ry="22"/>:shape==='honeycomb'?<polygon points="25,8 65,8 78,30 65,52 25,52 12,30"/>:<rect x="8" y="8" width="74" height="44" rx={shape==='capsule'?22:8}/>}</svg><strong>{{rounded:t('Скруглённый'),capsule:t('Капсула'),circle:t('Круг'),oval:t('Овал'),honeycomb:t('Соты')}[shape]}</strong></button>)}</div>
 <div className="start-existing"><span>{t('Уже есть проект?')}</span><button disabled={busy} onClick={onLibrary}>{t('Мои проекты')}</button><button disabled={busy} onClick={onOpen}>{t('Открыть файл')}</button></div></div></main>;
}
