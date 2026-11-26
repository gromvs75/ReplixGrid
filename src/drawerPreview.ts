import type {DrawerLayout,DrawerTray,TrayBounds} from './drawer.js';
import type {Point} from './stl.js';

export const drawerPreviewWorkerUrl='/kernel/worker-drawer-preview-v1.js';

export interface DrawerMesh {name:string;stl:ArrayBuffer;position:Point;color?:string}
export interface DrawerPreviewTray {
 id:string;
 projectKey:string;
 bounds?:TrayBounds;
 pose:Pick<DrawerTray,'x'|'y'|'rotation'>;
 origin?:Point;
 meshes:DrawerMesh[];
 mounted:boolean;
 error?:string;
 mountingError?:string;
}
export interface DrawerPreview {plate:DrawerMesh[];plateError?:string;trays:DrawerPreviewTray[]}
export interface DrawerPreviewRequest {revision:number;layout:DrawerLayout}
export interface DrawerPreviewResponse {revision:number;preview?:DrawerPreview;error?:string}

export function drawerPreviewPlateKey(layout:DrawerLayout){
 return JSON.stringify([layout.width,layout.depth,layout.gap,layout.plate]);
}

/** The worker copies its buffers with each response. Keep unchanged meshes on the GPU. */
export function reuseDrawerPreviewMeshes(next:DrawerPreview,previous?:DrawerPreview):DrawerPreview{
 if(!previous)return next;
 return {...next,plate:next.plate.length&&previous.plate.length?previous.plate:next.plate,
  trays:next.trays.map(tray=>{
   const old=previous.trays.find(item=>item.id===tray.id&&item.projectKey===tray.projectKey);
   if(!old?.meshes.length||!tray.meshes.length||old.mounted!==tray.mounted)return tray;
   if(tray.mounted&&(old.pose.x!==tray.pose.x||old.pose.y!==tray.pose.y||old.pose.rotation!==tray.pose.rotation))return tray;
   return {...tray,meshes:old.meshes};
  }),
 };
}

/** Place the lower bounding corner at the requested drawer coordinates after rotation. */
export function drawerPreviewOrigin(tray:DrawerPreviewTray['pose'],min:Point,max:Point,baseZ:number):Point{
 return tray.rotation===90?[tray.x+max[1],tray.y-min[0],baseZ-min[2]]:[tray.x-min[0],tray.y-min[1],baseZ-min[2]];
}
