import type {Project} from './model.js';
import type {ExportPart} from './exportFormats.js';
import {buildKit} from './accessoryKernel.js';
import {buildPrintPieces,buildJointPins,jointSampleProject} from './assemblyKernel.js';
import {partColor} from './appearance.js';
export async function exportParts(project:Project,part?:string):Promise<ExportPart[]>{
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
