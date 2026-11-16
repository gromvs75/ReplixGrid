import {configuredBedSettings} from '../printerBed.js';
import type {DrawerLayout} from '../drawer.js';
import {ExportDialog} from './ExportDialog.js';
import {useConfiguredPrinter} from './useConfiguredPrinter.js';
export function DrawerExportDialog({layout,onClose}:{layout:DrawerLayout;onClose:()=>void}){
 const printer=useConfiguredPrinter();
 const settings=configuredBedSettings(printer,layout.printBed);
 return <ExportDialog initial="all" project={printer} fileName={layout.name||'Drawer'} source={{workerUrl:'/kernel/worker-drawer-export-release-20261116.js',request:{layout,settings},targets:[{value:'all',label:'Весь комплект'}],archive:true,timeout:300000}} onClose={onClose} onDone={onClose}/>;
}
