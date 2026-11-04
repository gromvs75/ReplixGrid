import {useEditor} from '../store.js';
import {useDimensionDraft,dimensionDraftProject,resetDimensionDraft,commitDimensionDraft} from '../dimensionDraft.js';
import {type DimensionAxis,dimensionControl} from '../compartmentDimensions.js';
import {InlineDimension} from './InlineDimension.js';
import {t} from '../i18n.js';

export function DimensionLabel({id,axis,value,control}:{id:string;axis:DimensionAxis;value:number;control:ReturnType<typeof dimensionControl>}){
 const p=useEditor(s=>s.project),session=useDimensionDraft();
 const active=session.id===id&&session.project===p&&session.axis===axis;
 const draft=active?session.draft:null;
 const valid=!!dimensionDraftProject(p,id,axis,draft);
 return <InlineDimension label={t('Размер отсека на модели')} value={value} editable={!!control} editing={active&&session.inline} draft={draft??String(Number(value.toFixed(4)))} min={control?.min??0} max={control?.max??0} valid={valid}
  onStart={()=>useDimensionDraft.setState({id,axis,project:p,draft,inline:true})}
  onDraft={draft=>useDimensionDraft.setState({draft})} onCommit={commitDimensionDraft}
  onCancel={()=>resetDimensionDraft(p,id,axis)}/>;
}
