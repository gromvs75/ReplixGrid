import {maxCornerRadius} from './rounding.js';
import {footprintContour,honeyCells,honeyBounds} from './footprint.js';
import {defaultProject,resolveWalls,limitSteppedChamfer,type Project,type Cell} from './model.js';
import {splitPlan} from './splitting.js';
import {shellLayout,topAt,contourHeight} from './shell.js';
export interface Region {cell:Cell;x:number;y:number;width:number;depth:number}
export function regions(p:Project):Region[]{
  if(p.footprint==='honeycomb')return honeyCells(p).map((poly,i)=>{const xs=poly.map(v=>v[0]),ys=poly.map(v=>v[1]);return {cell:{id:'honey-'+i},x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),depth:Math.max(...ys)-Math.min(...ys)};});
  const result:Region[]=[];
  const walk=(cell:Cell,x:number,y:number,width:number,depth:number)=>{
    result.push({cell,x,y,width,depth});
    const s=cell.split,t=p.wallThickness;if(!s)return;
    if(s.axis==='x'){const a=(width-t)*s.ratio;walk(s.first,x,y,a,depth);walk(s.second,x+a+t,y,width-t-a,depth);}
    else{const a=(depth-t)*s.ratio;walk(s.first,x,y,width,a);walk(s.second,x,y+a+t,width,depth-t-a);}
  };walk(p.root,p.wallThickness,p.wallThickness,p.width-2*p.wallThickness,p.depth-2*p.wallThickness);return result;
}
export function cellById(root:Cell,id:string):Cell|undefined{return root.id===id?root:root.split?(cellById(root.split.first,id)??cellById(root.split.second,id)):undefined;}
export function editProject(p:Project,edit:(draft:Project)=>void):Project{let draft=structuredClone(p);edit(draft);if(draft.printing&&draft.shell&&!(p.printing&&p.shell))throw new Error('Оболочка недоступна для печати по частям. Уберите оболочку или верните цельную модель.');draft=limitSteppedChamfer(draft);resolveWalls(draft);if(draft.shell)shellLayout(draft);if(draft.printing)splitPlan(draft);return draft;}
/** Move one divider while retaining the absolute positions of all other dividers. */
export function moveDivider(p:Project,id:string,ratio:number):Project {
  if(!Number.isFinite(ratio))throw new Error('Invalid split ratio');
  const before=regions(p),selected=before.find(r=>r.cell.id===id);
  if(!selected?.cell.split)throw new Error('Выберите перегородку');
  const positions=new Map(before.filter(r=>r.cell.split).map(r=>{
    const axis=r.cell.split!.axis;
    return [r.cell.id,(axis==='x'?r.x:r.y)+((axis==='x'?r.width:r.depth)-p.wallThickness)*r.cell.split!.ratio];
  }));
  const axis=selected.cell.split.axis;
  positions.set(id,(axis==='x'?selected.x:selected.y)+((axis==='x'?selected.width:selected.depth)-p.wallThickness)*ratio);
  return editProject(p,d=>{
    const walk=(cell:Cell,x:number,y:number,width:number,depth:number)=>{
      const split=cell.split;if(!split)return;
      const available=(split.axis==='x'?width:depth)-d.wallThickness;
      const first=positions.get(cell.id)!-(split.axis==='x'?x:y);
      split.ratio=first/available;
      if(split.axis==='x'){
        walk(split.first,x,y,first,depth);
        walk(split.second,x+first+d.wallThickness,y,available-first,depth);
      }else{
        walk(split.first,x,y,width,first);
        walk(split.second,x,y+first+d.wallThickness,width,available-first);
      }
    };
    walk(d.root,d.wallThickness,d.wallThickness,d.width-2*d.wallThickness,d.depth-2*d.wallThickness);
  });
}
export function resizeFootprint(p:Project,key:'width'|'depth',value:number):Project{
  return editProject(p,d=>{
    d[key]=value;
    if(d.footprint==='circle'){d.width=value;d.depth=value;}
    if(d.cornerRadius!==undefined)d.cornerRadius=Math.min(d.cornerRadius,maxCornerRadius(d.width,d.depth));
  });
}
export function splitCell(p:Project,id:string,axis:'x'|'y',count=2):Project{
  if(p.footprint==='honeycomb')throw new Error('Сотовые ячейки формируются автоматически. Меняйте размеры всей формы.');
  if(!Number.isInteger(count)||count<2||count>6)throw new Error('Выберите от 2 до 6 отсеков');
  return editProject(p,d=>{
    const region=regions(d).find(r=>r.cell.id===id);if(!region||region.cell.split)throw new Error('Сначала выберите свободный отсек');
    let c=region.cell,span=axis==='x'?region.width:region.depth;
    const size=(span-(count-1)*d.wallThickness)/count;
    for(let n=count;n>1;n--){c.split={axis,ratio:size/(span-d.wallThickness),first:{id:crypto.randomUUID()},second:{id:crypto.randomUUID()}};c=c.split.second;span-=size+d.wallThickness;}
  });
}
export function preset(name:string):Project{
  let p=defaultProject();
  if(name==='grid'){p=splitCell(p,'root','x');const leaves=regions(p).filter(r=>!r.cell.split);for(const r of leaves)p=splitCell(p,r.cell.id,'y');}
  if(name==='desk'){p.width=160;p.depth=110;p.height=32;p.heights={front:22,back:65};p.transitions=['left','right'];p=splitCell(p,'root','x');p=splitCell(p,p.root.split!.second.id,'y');}
  return p;
}
export function parseProject(text:string):Project{
  if(text.length>2_000_000)throw new Error('Файл проекта слишком большой');
  let value=JSON.parse(text);value=limitSteppedChamfer(value);resolveWalls(value);if(value.shell)shellLayout(value);if(value.printing)splitPlan(value);return value;
}

/** Match the ends to the perpendicular walls they physically touch. */
export function fitDividerEnds(p:Project,id:string):Project {
  return editProject(p,d=>{
    const walls=resolveWalls(d),wall=walls.find(w=>w.id===id),split=cellById(d.root,id)?.split;
    if(!wall||!split)throw new Error('Выберите перегородку');
    const heights=[0,wall.length].map(offset=>{
      const x=wall.x+(wall.axis==='x'?offset:wall.thickness/2);
      const y=wall.y+(wall.axis==='y'?offset:wall.thickness/2);
      const supports=walls.filter(w=>w.id!==id&&w.axis!==wall.axis&&
        x>=w.x-1e-6&&x<=w.x+(w.axis==='x'?w.length:w.thickness)+1e-6&&
        y>=w.y-1e-6&&y<=w.y+(w.axis==='y'?w.length:w.thickness)+1e-6);
      if(!supports.length&&d.footprint)return contourHeight(d,walls,x,y);
      if(!supports.length)throw new Error('Не удалось найти примыкающую стенку');
      return Math.min(...supports.map(w=>topAt(w,w.axis==='x'?x-w.x:y-w.y)));
    });
    split.profile={start:heights[0],end:heights[1],style:split.profile?.style??'straight'};
  });
}

export function changeCompartmentCount(p:Project,delta:1|-1):Project{
 if(p.footprint==='honeycomb')return editProject(p,d=>{const old=d.honeycombCount??7,n=old+delta;if(n<1||n>19)throw new Error('Доступно от 1 до 19 ячеек');const a=honeyBounds(old),b=honeyBounds(n);d.width=d.width*b.width/a.width;d.depth=d.depth*b.depth/a.depth;d.honeycombCount=n;if(d.honeycombHeights){d.honeycombHeights=Array.from({length:n},(_,i)=>d.honeycombHeights![i]??null);}});
 const leaves=regions(p).filter(r=>!r.cell.split);
 if(delta===1){const largest=leaves.reduce((a,b)=>a.width*a.depth>b.width*b.depth?a:b);return splitCell(p,largest.cell.id,largest.width>largest.depth?'x':'y');}
 const removable=regions(p).filter(r=>r.cell.split&&!r.cell.split.first.split&&!r.cell.split.second.split).at(-1);
 if(!removable)throw new Error('Оставьте хотя бы один отсек');return editProject(p,d=>{delete cellById(d.root,removable.cell.id)!.split;});
}

/** Resize every explicit height together while preserving the shape above the floor. */
export function resizeHeight(p:Project,height:number):Project{
 return editProject(p,d=>{
  const scale=(height-p.floorThickness)/(p.height-p.floorThickness);
  const resize=(h:number)=>p.floorThickness+(h-p.floorThickness)*scale;
  d.height=height;
  for(const cut of Object.values(d.cutouts??{}))cut.depth*=scale;
  for(const side of Object.keys(d.heights) as (keyof typeof d.heights)[])d.heights[side]=resize(d.heights[side]!);
  for(const profile of Object.values(d.wallProfiles??{})){profile.start=resize(profile.start);profile.end=resize(profile.end);}
  if(d.honeycombHeights)d.honeycombHeights=d.honeycombHeights.map(h=>h===null?null:resize(h));
  const walk=(cell:Cell)=>{const s=cell.split;if(!s)return;if(s.height!==undefined)s.height=resize(s.height);if(s.profile){s.profile.start=resize(s.profile.start);s.profile.end=resize(s.profile.end);}walk(s.first);walk(s.second);};
  walk(d.root);
 });
}

/** Change one horizontal level of a stepped contour and its supporting divider. */
export function setStepHeight(p:Project,side:'front'|'back',index:number,height:number):Project{
 return editProject(p,d=>{
  const t=d.wallThickness;
  const all=resolveWalls(d).slice(4).filter(w=>w.axis==='y'&&(d.footprint==='circle'||d.footprint==='oval'||(side==='back'?w.y+w.length>=d.depth-t/2-1e-6:w.y<=t/2+1e-6))).sort((a,b)=>a.x-b.x);
  if(index===0){d.height=height;d.heights.left=height;return;}
  const wall=all[index-1];if(!wall)throw new Error('Invalid step');
  const split=cellById(d.root,wall.id)!.split!;
  if(split.profile){split.profile.start=height;split.profile.end=height;}else split.height=height;
  if(index===all.length)d.heights.right=height;
 });
}
