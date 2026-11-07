import {SVGLoader} from 'three/addons/loaders/SVGLoader.js';
import {SVG_MAX_BYTES,validateSvgAsset,type SvgAsset,type SvgPoint} from './svgPattern.js';
/** Parse off-DOM, accept a deliberately small SVG subset, persist only numeric contours. */
export function importSvg(text:string,name:string):SvgAsset {
 if(new TextEncoder().encode(text).length>SVG_MAX_BYTES)throw new Error('SVG слишком большой. Максимум 200 КБ.');
 if(/<!DOCTYPE|<!ENTITY/i.test(text))throw new Error('Этот SVG содержит неподдерживаемые элементы.');
 const doc=new DOMParser().parseFromString(text,'image/svg+xml');
 if(doc.querySelector('parsererror')||doc.documentElement.localName!=='svg')throw new Error('Не удалось прочитать SVG.');
 const allowed=new Set(['svg','g','path','rect','circle','ellipse','polygon','polyline','defs','title','desc','metadata']);
 const elements=Array.from(doc.querySelectorAll('*'));
 if(elements.length>512)throw new Error('SVG слишком сложный. Упростите контуры.');
 for(const el of elements){
  if(el.closest('metadata'))continue;
  if(el.localName==='image')throw new Error('SVG содержит изображение. Нужны векторные контуры, а не встроенное фото.');
  if(el.localName==='use')throw new Error('Разверните клоны и символы в обычные контуры перед загрузкой SVG.');
  if(['mask','clipPath','filter','linearGradient','radialGradient','style'].includes(el.localName))throw new Error('Уберите маски, обрезку, фильтры, градиенты и стили CSS. Сохраните видимый рисунок заполненными контурами.');
  if(el.localName==='text')throw new Error('Преобразуйте текст в контуры перед загрузкой SVG.');
  if((el.localName==='svg'&&el!==doc.documentElement)||!allowed.has(el.localName))throw new Error('Этот SVG содержит неподдерживаемые элементы.');
  for(const attr of Array.from(el.attributes))if(/^on/i.test(attr.name)||/href$/i.test(attr.name)||/url\s*\(/i.test(attr.value))throw new Error('Этот SVG содержит неподдерживаемые элементы.');
  const style=el.getAttribute('style')??'';
  if(style.split(';').some(s=>s.trim()&&!/^(fill|fill-rule|fill-opacity|opacity|stroke|stroke-width|stroke-opacity|display|visibility)\s*:/i.test(s.trim())))throw new Error('Этот SVG содержит неподдерживаемые элементы.');
  if(['clip-path','mask','filter'].some(k=>el.hasAttribute(k)))throw new Error('Этот SVG содержит неподдерживаемые элементы.');
 }
 // Unreferenced definitions do not paint anything. References remain rejected above.
 doc.querySelectorAll('metadata, defs').forEach(el=>el.remove());
 for(const el of Array.from(doc.querySelectorAll('*')))if(el.getAttribute('display')==='none'||/(?:^|;)\s*display\s*:\s*none\s*(?:;|$)/i.test(el.getAttribute('style')??''))el.remove();
 const parsed=new SVGLoader().parse(new XMLSerializer().serializeToString(doc)),shapes:SvgPoint[][][]=[];
 for(const path of parsed.paths){
  const style=path.userData?.style as Record<string,string|number>|undefined;
  if(Number(style?.opacity??1)===0||style?.display==='none'||style?.visibility==='hidden')continue;
  if(style?.stroke&&style.stroke!=='none'&&Number(style.strokeOpacity??1)>0)throw new Error('Преобразуйте обводки в контуры перед загрузкой SVG.');
  if(style?.fill==='none'||Number(style?.fillOpacity??1)===0)continue;
  for(const shape of path.toShapes()){
   const points=shape.extractPoints(64);
   const loops=[points.shape,...points.holes].map(loop=>{
    const clean=loop.map(v=>[v.x,v.y] as SvgPoint).filter((v,i,a)=>i===0||Math.hypot(v[0]-a[i-1][0],v[1]-a[i-1][1])>1e-8);
    if(clean.length>1&&Math.hypot(clean[0][0]-clean.at(-1)![0],clean[0][1]-clean.at(-1)![1])<1e-8)clean.pop();return clean;
   });
   if(loops[0].length>=3)shapes.push(loops);
  }
 }
 const pts=shapes.flat(2);if(!pts.length)throw new Error('В SVG нет заполненных контуров.');
 let xmin=Infinity,xmax=-Infinity,ymin=Infinity,ymax=-Infinity;
 for(const [x,y] of pts){xmin=Math.min(xmin,x);xmax=Math.max(xmax,x);ymin=Math.min(ymin,y);ymax=Math.max(ymax,y);}
 const width=xmax-xmin;if(!(width>1e-8&&ymax-ymin>1e-8))throw new Error('В SVG нет заполненных контуров.');
 const asset:SvgAsset={version:1,name:(name.replace(/\.svg$/i,'').trim()||'SVG').slice(0,80),aspect:(ymax-ymin)/width,shapes:shapes.map(shape=>shape.map(loop=>loop.map(([x,y])=>[Number(((x-xmin)/width).toFixed(7)),Number(((ymax-y)/width).toFixed(7))])))};
 validateSvgAsset(asset);return asset;
}
