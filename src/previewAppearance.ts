import {Color} from 'three';
/** Preview contrast only; export colors remain untouched. */
export function previewWallColor(color:string){return new Color(color).multiplyScalar(.86);}
export function previewEdgeColor(color:string){const base=new Color(color),luma=.2126*base.r+.7152*base.g+.0722*base.b;return base.lerp(new Color(luma<.12?'#e0e9ef':'#253b48'),luma<.12?.5:.48);}
