import assert from 'node:assert/strict';
import {test} from 'node:test';
import {checkCompartmentFit,gridfinityFitSpace,organizerFitSpace} from '../src/compartmentFit.js';
import {defaultGridfinity} from '../src/gridfinity.js';
import {defaultProject} from '../src/model.js';

test('clearance applies twice horizontally and once above the object',()=>{
 const space=organizerFitSpace({...defaultProject(),width:104,depth:54,height:22},'root')!;
 assert.equal(space.height,20);
 const item={length:98,width:48,height:19,gap:1};
 assert.deepEqual(checkCompartmentFit(space,item),{
  footprint:true,heightFits:true,rotated:false,center:[52,27],length:98,width:48,
 });
 const tooTight=checkCompartmentFit(space,{...item,gap:1.01});
 assert.equal(tooTight.footprint,false);
 assert.equal(tooTight.heightFits,false);
 assert.equal(checkCompartmentFit(space,{...item,length:48,width:98}).rotated,true);
});

test('rounded corners limit a rectangular object even when its sides fit',()=>{
 for(const patch of [{cornerRadius:14},{innerCornerRadius:12}]){
  const space=organizerFitSpace({...defaultProject(),width:104,depth:54,...patch},'root')!;
  const item={length:98,width:48,height:8,gap:0};
  assert.equal(checkCompartmentFit(space,item).footprint,false);
  assert.equal(checkCompartmentFit(space,{...item,length:89,width:39}).footprint,true);
 }
});

test('uses the selected compartment and the ceiling of an inset lid',()=>{
 const base=defaultProject();
 const project={...base,root:{id:'root',split:{axis:'x' as const,ratio:.3,first:{id:'left-cell'},second:{id:'right-cell'}}}};
 const item={length:40,width:40,height:27,gap:0};
 assert.equal(checkCompartmentFit(organizerFitSpace(project,'left-cell')!,item).footprint,false);
 assert.equal(checkCompartmentFit(organizerFitSpace(project,'right-cell')!,item).footprint,true);
 const lid=organizerFitSpace({...base,lid:true,lidDesign:{fit:'inset',pattern:'smooth',rimHeight:2,handle:'none'}},'root')!;
 assert.equal(lid.height,26);
 assert.equal(checkCompartmentFit(lid,item).heightFits,false);
 assert.equal(organizerFitSpace({...base,tilt:5},'root'),null);
});

test('Gridfinity fit accounts for the cavity floor and the lid locator',()=>{
 const p={...defaultGridfinity(),columns:1,rows:1};
 const item={length:36,width:36,height:20.5,gap:0};
 const space=gridfinityFitSpace(p,'root')!;
 const check=checkCompartmentFit(space,item);
 assert.equal(check.footprint,true);
 assert.equal(check.heightFits,true);
 assert.equal(checkCompartmentFit(gridfinityFitSpace({...p,floorRadius:2},'root')!,item).footprint,false);
 assert.equal(checkCompartmentFit(gridfinityFitSpace({...p,lid:'plain'},'root')!,item).heightFits,false);
 assert.equal(checkCompartmentFit(gridfinityFitSpace({...p,stackingLip:true},'root')!,item).footprint,false);
});
