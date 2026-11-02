import type {Manifold,ManifoldToplevel,Mat4} from 'manifold-3d';
import type {Project,Side} from './model.js';
import {letterFonts} from './fonts/letterContours.js';
import {panelSides} from './panelSettings.js';
// Original 5 × 7 block lettering: no external font assets, includes Cyrillic.
const rows:Record<string,string>={
 А:'01110/10001/10001/11111/10001/10001/10001',Б:'11111/10000/10000/11110/10001/10001/11110',В:'11110/10001/10001/11110/10001/10001/11110',Г:'11111/10000/10000/10000/10000/10000/10000',Д:'01110/01010/01010/01010/01010/11111/10001',Е:'11111/10000/10000/11110/10000/10000/11111',Ж:'10101/10101/01110/00100/01110/10101/10101',З:'11110/00001/00001/01110/00001/00001/11110',И:'10001/10001/10011/10101/11001/10001/10001',Й:'01010/00100/10001/10011/10101/11001/10001',К:'10001/10010/10100/11000/10100/10010/10001',Л:'00111/01001/01001/01001/01001/10001/10001',М:'10001/11011/10101/10101/10001/10001/10001',Н:'10001/10001/10001/11111/10001/10001/10001',О:'01110/10001/10001/10001/10001/10001/01110',П:'11111/10001/10001/10001/10001/10001/10001',Р:'11110/10001/10001/11110/10000/10000/10000',С:'01111/10000/10000/10000/10000/10000/01111',Т:'11111/00100/00100/00100/00100/00100/00100',У:'10001/10001/10001/01111/00001/00001/11110',Ф:'00100/01110/10101/10101/01110/00100/00100',Х:'10001/10001/01010/00100/01010/10001/10001',Ц:'10010/10010/10010/10010/10010/11111/00001',Ч:'10001/10001/10001/01111/00001/00001/00001',Ш:'10101/10101/10101/10101/10101/10101/11111',Щ:'10101/10101/10101/10101/10101/11111/00001',Ъ:'11000/01000/01000/01110/01001/01001/01110',Ы:'10001/10001/10001/11101/10011/10011/11101',Ь:'10000/10000/10000/11110/10001/10001/11110',Э:'11110/00001/00001/01111/00001/00001/11110',Ю:'10010/10101/10101/11101/10101/10101/10010',Я:'01111/10001/10001/01111/00101/01001/10001',
 '0':'01110/10001/10011/10101/11001/10001/01110','1':'00100/01100/00100/00100/00100/00100/01110','2':'01110/10001/00001/00010/00100/01000/11111','3':'11110/00001/00001/01110/00001/00001/11110','4':'00010/00110/01010/10010/11111/00010/00010','5':'11111/10000/10000/11110/00001/00001/11110','6':'01110/10000/10000/11110/10001/10001/01110','7':'11111/00001/00010/00100/01000/01000/01000','8':'01110/10001/10001/01110/10001/10001/01110','9':'01110/10001/10001/01111/00001/00001/01110',
 ' ':'00000/00000/00000/00000/00000/00000/00000','-':'00000/00000/00000/11111/00000/00000/00000',
 '★':'00100/00100/11111/01110/01110/11011/10001','♥':'01010/11111/11111/11111/01110/00100/00000',
 D:'11110/10001/10001/10001/10001/10001/11110',F:'11111/10000/10000/11110/10000/10000/10000',G:'01111/10000/10000/10111/10001/10001/01111',J:'00111/00010/00010/00010/10010/10010/01100',L:'10000/10000/10000/10000/10000/10000/11111',N:'10001/11001/11001/10101/10011/10011/10001',Q:'01110/10001/10001/10001/10101/10010/01101',R:'11110/10001/10001/11110/10100/10010/10001',S:'01111/10000/10000/01110/00001/00001/11110',U:'10001/10001/10001/10001/10001/10001/01110',V:'10001/10001/10001/10001/10001/01010/00100',W:'10001/10001/10001/10101/10101/11011/10001',Y:'10001/10001/01010/00100/00100/00100/00100',Z:'11111/00001/00010/00100/01000/10000/11111',I:'01110/00100/00100/00100/00100/00100/01110'
};
for(const [latin,cyrillic] of Object.entries({A:'А',B:'В',C:'С',E:'Е',H:'Н',K:'К',M:'М',O:'О',P:'Р',T:'Т',X:'Х'}))rows[latin]=rows[cyrillic];rows['Ё']=rows['Е'];
export function labelText(p:Project){return `${p.label?.icon??''}${p.label?.icon&&p.label?.text?' ':''}${p.label?.text??''}`.toUpperCase();}
// Keep lettering below the lowest point of the opening and clear of the tier collar.
function labelAvailableHeight(p:Project,side:Side){return (p.heights[side]??p.height)-(p.cutouts?.[side]?.depth??0)-p.floorThickness-6;}
export function labelProblem(p:Project,side:Side=p.label?.side??'left'):string {
 if(p.footprint)return 'Подпись пока доступна на прямой передней стенке.';
 if(p.shell&&(p.shell.mode!=='panels'||panelSides(p).includes(side)))return 'Выбранная стенка закрыта оболочкой. Уберите панель с этой стороны, чтобы добавить подпись.';
 if(p.transitions.includes(side)||p.wallProfiles?.[side]||(p.steppedWalls&&(side==='front'||side==='back')))return 'Для подписи нужна стенка с постоянной высотой.';
 if(labelAvailableHeight(p,side)<3.85)return 'Под вырезом недостаточно места для подписи. Уменьшите вырез или увеличьте высоту стенки.';
 if(p.relief)return 'Для подписи выберите гладкую поверхность.';
 if(p.wallThickness<1)return 'Для подписи нужна стенка от 1 мм.';
 return '';
}
type Polygon=[number,number][];
export function labelLayout(p:Project){
 const l=p.label!;const font=l.font??'pixel';
 const text=font==='pixel'?labelText(p):`${l.icon}${l.icon&&l.text?' ':''}${l.text}`;
 let cursor=0;const contours:Polygon[]=[];
 for(const c of text){
  const glyph=letterFonts[font]?.[c];
  if(glyph){contours.push(...glyph.contours.map(r=>r.map(([x,y])=>[x+cursor,y] as [number,number])));cursor+=glyph.advance;}
  else if(rows[c.toUpperCase()]){rows[c.toUpperCase()].split('/').forEach((row,y)=>{for(let x=0;x<5;x++)if(row[x]==='1'){const a=cursor+x/7,b=(6-y)/7,d=1/7+.00015;contours.push([[a,b],[a+d,b],[a+d,b+d],[a,b+d]]);}});cursor+=6/7;}
  else throw new Error('Этот символ не поддерживается выбранным шрифтом.');
 }
 if(!contours.length)return {contours:[] as Polygon[],height:0,width:0,bottom:p.floorThickness+3};
 const points=contours.flat(),minX=Math.min(...points.map(p=>p[0])),maxX=Math.max(...points.map(p=>p[0])),minY=Math.min(...points.map(p=>p[1])),maxY=Math.max(...points.map(p=>p[1]));
 const side=l.side??'left',available=(side==='left'||side==='right'?p.depth:p.width)-2*(p.cornerRadius??0)-6,availableHeight=labelAvailableHeight(p,side);
 const scale=l.size!==undefined?l.size/(maxY-minY):Math.min((font==='pixel'?7.7:10)/(maxY-minY),available/(maxX-minX),availableHeight/(maxY-minY));
 const width=(maxX-minX)*scale,height=(maxY-minY)*scale;
 if(height<3.85||width>available+.001||height>availableHeight+.001)throw new Error('Подпись не помещается. Уменьшите высоту букв или сократите текст.');
 const bottom=p.floorThickness+3+Math.max(0,availableHeight-height)*(l.position??0)/100;
 return {width,height,bottom,contours:contours.map(r=>r.map(([x,y])=>[(x-minX)*scale,(y-minY)*scale] as [number,number]))};
}
export function validateLabel(p:Project){
 if(!p.label)return;const l=p.label,why=labelProblem(p);if(why)throw new Error(why);
 if(typeof l.text!=='string'||l.text.length>18||!['raised','engraved'].includes(l.mode)||!['','★','♥'].includes(l.icon))throw new Error('Некорректная подпись.');
 if(l.side!==undefined&&!['left','right','front','back'].includes(l.side))throw new Error('Некорректная сторона подписи.');
 if(l.font!==undefined&&!['pixel','sans','bold','serif'].includes(l.font))throw new Error('Неизвестный шрифт.');
 if(l.size!==undefined&&(!Number.isFinite(l.size)||l.size<4||l.size>30))throw new Error('Высота букв — от 4 до 30 мм.');
 if(l.depth!==undefined&&(!Number.isFinite(l.depth)||l.depth<.2||l.depth>2||l.mode==='engraved'&&l.depth>p.wallThickness-.6))throw new Error('Глубина гравировки должна оставлять не менее 0,6 мм стенки.');
 if(l.position!==undefined&&(!Number.isFinite(l.position)||l.position<0||l.position>100))throw new Error('Положение надписи — от 0 до 100%.');
 labelLayout(p);
}
export function applyLabel(wasm:ManifoldToplevel,p:Project,body:Manifold,keep:(m:Manifold)=>Manifold){
 if(!p.label)return body;
 const {contours,width,bottom}=labelLayout(p);if(!contours.length)return body;
 const depth=p.label.depth??(p.label.mode==='raised'?.6:.4);
 // Font contours carry opposite winding for counters; union overlapping legacy pixels.
 const section=new wasm.CrossSection(contours,'NonZero');
 try{
  const raw=keep(section.extrude(depth+.02));
  // Font X runs towards -Y when looking at the front; font Y is world Z.
  const inset=p.label.mode==='raised'?.02:depth,side=p.label.side??'left';
  const transform:Mat4=side==='left'?[0,-1,0,0, 0,0,1,0, -1,0,0,0, inset,(p.depth+width)/2,bottom,1]:side==='right'?[0,1,0,0, 0,0,1,0, 1,0,0,0, p.width-inset,(p.depth-width)/2,bottom,1]:side==='front'?[1,0,0,0, 0,0,1,0, 0,-1,0,0, (p.width-width)/2,inset,bottom,1]:[-1,0,0,0, 0,0,1,0, 0,1,0,0, (p.width+width)/2,p.depth-inset,bottom,1];
  const ink=keep(raw.transform(transform));
  return keep(p.label.mode==='raised'?body.add(ink):body.subtract(ink));
 }finally{section.delete();}
}
