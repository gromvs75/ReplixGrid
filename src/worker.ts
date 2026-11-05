import {plateArchive,mountedKit,type MountingRequest} from './mountingKernel.js';
import type {DrawerLayout} from './drawer.js';
import {tierElevation} from './accessories.js';
import {buildKit} from './accessoryKernel.js';
import {inspectPrintParts} from './preflight.js';
import {formatExport,type ExportFormat,type ExportPart} from './exportFormats.js';
import {partColor} from './appearance.js';
import {buildOrganizer,buildShell} from './kernel.js';
import {buildPrintPieces,buildJointPins,jointSampleProject} from './assemblyKernel.js';
import {splitPlan} from './splitting.js';
import {zipFiles} from './zip.js';
import type {Project} from './model.js';
let prepared:ExportPart[]|null=null;
// Relief edits cannot change the sleeve. Keep one completed sleeve in the preview worker.
let previewShellCache:{key:string;value:Awaited<ReturnType<typeof buildShell>>}|null=null;
async function previewShell(project:Project){
 const key=JSON.stringify({...project,relief:project.relief?{depth:project.relief.depth}:undefined,colors:undefined});
 if(previewShellCache?.key!==key)previewShellCache={key,value:await buildShell(project)};
 return {...previewShellCache.value,stl:previewShellCache.value.stl.slice(0)};
}
async function exportParts(project:Project,part?:string):Promise<ExportPart[]>{
 if(project.printing&&project.shell&&part!=='organizer'&&part!=='sample')throw new Error('Оболочка недоступна для печати по частям. Уберите оболочку или верните цельную модель.');
 if(project.printing||part==='sample'){
  const source=part==='sample'?jointSampleProject(project):project;
  const pieces=await buildPrintPieces(source,part==='shell'?'shell':part==='organizer'?'organizer':undefined);
  const pins=part==='shell'?[]:await buildJointPins(source);
  const extras=part==='shell'||part==='sample'||(!project.stack&&!project.lid&&!project.cups?.length)?[]:(await buildKit({...project,printing:undefined})).filter(item=>item.kind!=='organizer'&&item.kind!=='shell').map(item=>({name:item.name,stl:item.stl,color:item.color}));
  return [...pieces.map(piece=>({name:piece.name.replace(/\.stl$/,''),stl:piece.stl,color:partColor(project,piece.kind)})),...pins.map(pin=>({...pin,color:partColor(project,'organizer')})),...extras];
 }
 return (await buildKit(project)).filter(p=>part==='shell'?p.kind==='shell':part==='organizer'?p.kind!=='shell':true);
}
// Requests carry a revision; the future UI must discard stale revisions.
globalThis.onmessage=async (event:MessageEvent<{revision:number;project:Project;part?:'organizer'|'shell'|'kit'|'sample'|'all';format?:ExportFormat;objInstructions?:string;filamentSlots?:Record<string,number>;partSlots?:Array<number|null>;mounting?:MountingRequest;layout?:DrawerLayout;purpose?:'preview'|'check'|'download'|'drawer'|'plate'}>)=>{
  const {revision,project,part,purpose,format,objInstructions,filamentSlots,partSlots,mounting,layout}=event.data;
  try {
    if(purpose==='plate'){if(!layout)throw new Error('Не найден ящик.');const archive=await plateArchive(layout);globalThis.postMessage({revision,ok:true,archive},{transfer:[archive]});return;}
    if(purpose!=='preview'&&purpose!=='download'&&project.printing&&project.shell&&part!=='organizer'&&part!=='sample')throw new Error('Оболочка недоступна для печати по частям. Уберите оболочку или верните цельную модель.');
    if(purpose==='drawer'){
      const parts=await buildKit({...project,printing:undefined});
      const min=[0,1,2].map(i=>Math.min(...parts.map(p=>p.position[i]+p.inspection.bounds.min[i])));
      const max=[0,1,2].map(i=>Math.max(...parts.map(p=>p.position[i]+p.inspection.bounds.max[i])));
      globalThis.postMessage({revision,ok:true,bounds:{width:max[0]-min[0],depth:max[1]-min[1],height:max[2]-min[2]}});return;
    }
    if(purpose==='check'){
      prepared=null;const parts=mounting&&part!=='shell'?(await mountedKit(mounting)).filter(p=>part==='organizer'?p.kind!=='shell':true):await exportParts(project,part),report=inspectPrintParts(mounting?.layout.plate?{...project,printArea:{...(project.printArea??{bedHeight:270}),bedWidth:mounting.layout.plate.bedWidth,bedDepth:mounting.layout.plate.bedDepth}}:part==='sample'?{...project,printing:jointSampleProject(project).printing}:project,parts);
      if(report.ok)prepared=parts;
      globalThis.postMessage({revision,ok:true,report,partColors:parts.map(p=>({name:p.name,color:p.color}))});return;
    }
    if(purpose==='download'){
      if(!prepared)throw new Error('Сначала проверьте детали.');
      const result=formatExport(prepared,format??'3mf',objInstructions,filamentSlots,partSlots);globalThis.postMessage({revision,ok:true,formatted:result.data,extension:result.extension,mime:result.mime,count:prepared.length},{transfer:[result.data]});return;
    }
    if(purpose==='preview'&&project.printing){
      const pieces=await buildPrintPieces(project);
      const extras=project.lid||project.cups?.length?(await buildKit({...project,printing:undefined})).filter(p=>p.kind!=='organizer'&&p.kind!=='shell'):[];
      globalThis.postMessage({revision,ok:true,pieces,extras},{transfer:[...pieces.map(p=>p.stl),...extras.map(p=>p.stl)]});return;
    }
    if(purpose==='preview'&&(project.stack||project.lid||project.cups?.length||project.shell?.mode==='panels')){
      const parts=await buildKit(project),active=project.stack?.active??0;
      const organizer=parts.find(p=>p.kind==='organizer'&&p.level===active)!,shell=project.stack?undefined:parts.find(p=>p.kind==='shell');
      const activeZ=project.stack?tierElevation(project,active):0;
      const extras=parts.filter(p=>p!==organizer&&p!==shell);
      globalThis.postMessage({revision,ok:true,organizer:organizer.stl,organizerPosition:[organizer.position[0],organizer.position[1],organizer.position[2]-activeZ],shell:shell?.stl,shellPosition:shell?.position,extras,activeZ},{transfer:parts.map(p=>p.stl)});return;
    }
    if(project.stack||project.lid||project.cups?.length||project.shell?.mode==='panels'){
      const parts=mounting&&part!=='shell'?(await mountedKit(mounting)).filter(p=>part==='organizer'?p.kind!=='shell':true):await exportParts(project,part),report=inspectPrintParts(project,parts);if(!report.ok)throw new Error('Детали не помещаются в указанную область печати.');
      const result=formatExport(parts,format??'stl',objInstructions);globalThis.postMessage({revision,ok:true,formatted:result.data,extension:result.extension,mime:result.mime,count:parts.length},{transfer:[result.data]});return;
    }
    if(purpose==='preview'){
      const organizer=await buildOrganizer(project);
      const shell=project.shell?await previewShell(project):null;
      globalThis.postMessage({revision,ok:true,organizer:organizer.stl,shell:shell?.stl,organizerPosition:organizer.position,shellPosition:shell?.position},{transfer:shell?[organizer.stl,shell.stl]:[organizer.stl]});return;
    }
    if(format&&(format!=='stl'||part==='all')){
      const parts:ExportPart[]=[];
      if(project.printing||part==='sample'){
        const source=part==='sample'?jointSampleProject(project):project;
        const pieces=await buildPrintPieces(source,part==='shell'?'shell':part==='organizer'?'organizer':undefined);
        for(const piece of pieces)parts.push({name:piece.name.replace(/\.stl$/,''),stl:piece.stl,color:partColor(project,piece.kind)});
        if(part!=='shell')for(const pin of await buildJointPins(source))parts.push({...pin,color:partColor(project,'organizer')});
      }else{
        if(part!=='shell'){const built=await buildOrganizer(project);parts.push({name:'organizer',stl:built.stl,color:partColor(project,'organizer')});}
        if(project.shell&&(part==='shell'||part==='all')){const built=await buildShell(project);parts.push({name:'shell',stl:built.stl,color:partColor(project,'shell')});}
      }
      const result=formatExport(parts,format,objInstructions);globalThis.postMessage({revision,ok:true,formatted:result.data,extension:result.extension,mime:result.mime,count:parts.length},{transfer:[result.data]});return;
    }
    if(project.printing||part==='sample'){
      const source=part==='sample'?jointSampleProject(project):project;
      const pieces=await buildPrintPieces(source,part==='shell'?'shell':part==='organizer'?'organizer':undefined);
      const pins=part==='shell'?[]:await buildJointPins(source);
      const instructions=`ReplixGrid — печать по частям (мм)

Для сборки необходимо склеить половины и штифты. Штифты диаметром 3,2 мм и длиной 8 мм вставляются в отверстия диаметром 3,3 мм; глубина каждого отверстия — 4,5 мм. Расчётный зазор — 0,05 мм на сторону; общий запас по длине штифта — 1 мм. Фактическая посадка зависит от принтера, материала и коррекций XY и Z. Проверьте посадку на образце до нанесения клея. Нанесите клей на стык, направляющий паз и штифты, соберите и зафиксируйте до полного отверждения по инструкции клея.

organizer — органайзер; shell — оболочка; pin — отдельный штифт. Собирайте секции по номерам. Оболочку собирайте отдельно и надевайте на органайзер. Для полной загрузки комплекта используйте печать всех деталей.

Импортируйте STL в миллиметрах, без изменения масштаба. Детали печатайте дном на столе. Размещайте отдельные детали и штифты на столе с промежутками. Проверьте печать отверстий в предпросмотре слайсера.
`;
      const archive=zipFiles([...pieces.map(p=>({name:p.name,data:p.stl})),...pins.map(p=>({name:p.name+'.stl',data:p.stl})),{name:'README.txt',data:instructions},{name:'project.replixgrid.json',data:JSON.stringify(source,null,2)},{name:'assembly.json',data:JSON.stringify({sample:part==='sample',units:'mm',plan:splitPlan(source),pieces:pieces.map(({stl,...p})=>p)},null,2)}]);
      globalThis.postMessage({revision,ok:true,archive,count:pieces.length,sample:part==='sample'},{transfer:[archive]});return;
    }
    const result=await (part==='shell'?buildShell(project):buildOrganizer(project));
    globalThis.postMessage({revision,ok:true,...result},{transfer:[result.stl]});
  } catch(error) {
    const message=error instanceof Error?error.message:'Geometry failed';
    const userMessage=/Open or non-manifold oriented edge|Degenerate (STL )?triangle|Expected one positive-volume connected surface|Geometry failed/.test(message)?'Не удалось построить форму. Измените размеры или упростите узор.':message;
    globalThis.postMessage({revision,ok:false,error:userMessage});
  }
};
