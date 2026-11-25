import {GRIDFINITY} from './gridfinity.js';
import type {BedSettings} from './bedPacking.js';

const minPitch=36;
const maxPitch=84;

export interface DrawerGrid {width:number;depth:number;gap:number;columns:number;rows:number}
function usableDimensions(width:number,depth:number,gap:number){
  const usableWidth=width-2*gap, usableDepth=depth-2*gap;
  if(![width,depth,gap].every(Number.isFinite)||gap<0||usableWidth<minPitch||usableDepth<minPitch||width>3000||depth>3000){
    throw Error('Проверьте размеры ящика и монтажный зазор.');
  }
  return [usableWidth,usableDepth];
}
export function suggestDrawerGrid(width:number,depth:number,gap:number):DrawerGrid{
  const [w,d]=usableDimensions(width,depth,gap);
  let bestScore=Infinity,columns=1,rows=1;
  for(let x=Math.ceil(w/maxPitch);x<=Math.floor(w/minPitch);x++){
    for(let y=Math.ceil(d/maxPitch);y<=Math.floor(d/minPitch);y++){
      const px=w/x, py=d/y;
      // Prefer nearly square cells while keeping the pitch close to the standard.
      const score=(px-GRIDFINITY.pitch)**2+(py-GRIDFINITY.pitch)**2+3*(px-py)**2;
      if(score<bestScore){
        bestScore=score;
        columns=x;
        rows=y;
      }
    }
  }
  return {width,depth,gap,columns,rows};
}
export function drawerPitch(grid:DrawerGrid):[number,number]{
  const [width,depth]=usableDimensions(grid.width,grid.depth,grid.gap);
  const pitch:[number,number]=[width/grid.columns,depth/grid.rows];
  if(![grid.columns,grid.rows].every(n=>Number.isInteger(n)&&n>0)||!pitch.every(n=>n>=minPitch&&n<=maxPitch)){
    throw Error('Размер ячейки должен быть от 36 до 84 мм.');
  }
  return pitch;
}
function balancedSegments(cells:number,parts:number){
  const base=Math.floor(cells/parts), remainder=cells%parts;
  return Array.from({length:parts},(_,i)=>base+(i<remainder?1:0));
}
export function planDrawerPlates(grid:DrawerGrid,bed:BedSettings,plateFloor:number=GRIDFINITY.plateFloor){
  const [px,py]=drawerPitch(grid);
  let best:{cols:number;rows:number}|undefined;
  for(const [width,depth] of [[bed.length,bed.width],[bed.width,bed.length]]){
    // The packer reserves 2 mm at each edge and accepts either orientation.
    const maxCols=Math.min(8,Math.floor((width-4+.000001)/px));
    const maxRows=Math.min(8,Math.floor((depth-4+.000001)/py));
    if(!(maxCols>=1&&maxRows>=1))continue;
    const cols=Math.ceil(grid.columns/maxCols), rows=Math.ceil(grid.rows/maxRows);
    if(!best||cols*rows<best.cols*best.rows)best={cols,rows};
  }
  if(!best||!(bed.height>=GRIDFINITY.footHeight+plateFloor))throw Error('Ячейка не помещается на печатный стол.');
  if(best.cols*best.rows>32)throw Error('Для этого ящика требуется больше 32 плит.');
  const result=[], columnWidths=balancedSegments(grid.columns,best.cols);
  let y=0;
  for(const rows of balancedSegments(grid.rows,best.rows)){
    let x=0;
    for(const columns of columnWidths){
      result.push({x,y,columns,rows});
      x+=columns;
    }
    y+=rows;
  }
  return result;
}
