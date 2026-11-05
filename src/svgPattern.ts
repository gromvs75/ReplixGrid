import type {Side} from './model.js';
export type SvgPoint=[number,number];
/** Normalized filled shapes: outer contour followed by holes; no executable SVG is stored. */
export interface SvgAsset {version:1;name:string;aspect:number;shapes:SvgPoint[][][]}
export interface SvgPattern {asset:SvgAsset;sides:Side[];mode:'single'|'repeat';width:number;rotation:number;offsetX:number;offsetY:number;gap:number}
export const SVG_MAX_BYTES=200_000;
export function validateSvgAsset(a:SvgAsset){
 const fail=()=>{throw new Error('Некорректные контуры SVG.');};
 if(!a||a.version!==1||typeof a.name!=='string'||!a.name.trim()||a.name.length>80||!Number.isFinite(a.aspect)||a.aspect<.02||a.aspect>50||!Array.isArray(a.shapes)||!a.shapes.length||a.shapes.length>128)fail();
 let count=0;
 for(const shape of a.shapes){if(!Array.isArray(shape)||!shape.length||shape.length>64)fail();for(const loop of shape){if(!Array.isArray(loop)||loop.length<3)fail();count+=loop.length;for(const pt of loop){if(!Array.isArray(pt)||pt.length!==2||pt.some(v=>!Number.isFinite(v))||pt[0]<-1e-5||pt[0]>1.00001||pt[1]<-1e-5||pt[1]>a.aspect+1e-5)fail();}}}
 if(count>6000)throw new Error('SVG слишком сложный. Упростите контуры.');
}
export function validateSvgPattern(s:SvgPattern){
 validateSvgAsset(s.asset);
 if(!Array.isArray(s.sides)||!s.sides.length||s.sides.length>4||new Set(s.sides).size!==s.sides.length||s.sides.some(v=>!['front','back','left','right'].includes(v))||!['single','repeat'].includes(s.mode))throw new Error('Некорректное размещение SVG.');
 for(const [n,min,max] of [[s.width,4,200],[s.rotation,-180,180],[s.offsetX,-400,400],[s.offsetY,-200,200],[s.gap,0,50]])if(!Number.isFinite(n)||n<min||n>max)throw new Error('Некорректный размер или положение SVG.');
}
export const defaultSvgPattern=(asset:SvgAsset):SvgPattern=>({asset,sides:['front'],mode:'single',width:Math.max(4,Math.min(30,22/asset.aspect)),rotation:0,offsetX:0,offsetY:0,gap:4});
