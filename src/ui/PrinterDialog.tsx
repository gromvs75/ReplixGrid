import {useEffect,useRef} from 'react';
import {createPortal} from 'react-dom';
import {t} from '../i18n.js';
import {printerPresets,matchingPrinter,withPrinter} from '../printers.js';
import {Field,FieldHistoryContext} from './Field.js';
import {FilamentSlots} from './FilamentSlots.js';
import {savePrinterArea,useConfiguredPrinter} from './useConfiguredPrinter.js';

export function PrinterDialog({onClose}:{onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);
 const p=useConfiguredPrinter(),printer=matchingPrinter(p);
 const current=p.printArea??p.printing??{bedWidth:270,bedDepth:270,bedHeight:270};
 useEffect(()=>{const element=dialog.current;element?.showModal();return()=>element?.close();},[]);
 return createPortal(<FieldHistoryContext.Provider value={null}><dialog className="export-dialog printer-dialog" aria-labelledby="printer-heading" ref={dialog} onCancel={onClose}>
  <header><h2 id="printer-heading">{t('Принтер')}</h2><button type="button" aria-label={t('Закрыть')} onClick={onClose}>×</button></header>
  <section className="print-editor print-editor-printer"><div className="print-printer-choice">
    <label className="printer-picker">{t("Принтер")}<select aria-label={t("Принтер")} value={printer?.id??'custom'} onChange={e=>savePrinterArea(withPrinter(p,e.target.value).printArea!)}><option value="custom">{t("Свой размер")}</option>{printerPresets.map(v=><option key={v.id} value={v.id}>{v.name} — {t(v.configuration)} · {v.area.bedWidth} × {v.area.bedDepth} × {v.area.bedHeight} mm</option>)}</select></label>
    <p className="hint">{t("Выбор задаёт только область печати. Проверьте конфигурацию головки и Quick Swap; пластик и режим печати выбираются в слайсере.")}{printer&&<> <a href={printer.source} target="_blank" rel="noreferrer">{t("Размеры производителя ↗")}</a></>}</p>
    </div><div className="print-bed-fields">{([['bedWidth',t("Длина стола")],['bedDepth',t("Ширина стола")],['bedHeight',t("Высота печати")]] as const).map(([key,label])=><Field key={key} label={label} value={current[key]} min={40} max={1000} step={1} manageHistory={false} onChange={n=>savePrinterArea({...current,[key]:n,printerId:undefined})}/>)}</div></section>
  <FilamentSlots/>
 </dialog></FieldHistoryContext.Provider>,document.body);
}
