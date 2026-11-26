import {buildKit,type KitPart} from './accessoryKernel.js';
import {buildPlateTiles,mountedKit} from './mountingKernel.js';
import {MOUNT} from './mountingPlate.js';
import {parseDrawer} from './drawer.js';
import {drawerPreviewOrigin,drawerPreviewPlateKey,type DrawerMesh,type DrawerPreview,type DrawerPreviewTray} from './drawerPreview.js';
import type {Point} from './stl.js';
import type {DrawerLayout} from './drawer.js';

function kitLimits(parts:KitPart[]){
 const axes=[0,1,2] as const;
 const min=axes.map(i=>Math.min(...parts.map(p=>p.position[i]+p.inspection.bounds.min[i]))) as Point;
 const max=axes.map(i=>Math.max(...parts.map(p=>p.position[i]+p.inspection.bounds.max[i]))) as Point;
 return {min,max,bounds:{width:max[0]-min[0],depth:max[1]-min[1],height:max[2]-min[2]}};
}

const mesh=({name,stl,position,color}:DrawerMesh):DrawerMesh=>({name,stl,position,color});
const message=(error:unknown)=>error instanceof Error?error.message:String(error);

export function createDrawerPreviewBuilder(){
 let plateCache:{key:string;meshes:DrawerMesh[]}|undefined;
 let baseCache=new Map<string,KitPart[]>();
 let mountedCache=new Map<string,KitPart[]>();
 return async (input:DrawerLayout):Promise<DrawerPreview>=>{
  const layout=parseDrawer(JSON.stringify(input));
  const plateKey=drawerPreviewPlateKey(layout);
  const preview:DrawerPreview={plate:[],trays:[]};
  const bases=new Map<string,KitPart[]>(),mounts=new Map<string,KitPart[]>();
  if(layout.plate?.enabled){
   try{
    if(plateCache?.key!==plateKey)plateCache={key:plateKey,meshes:(await buildPlateTiles(layout)).map(mesh)};
    preview.plate=plateCache.meshes;
   }catch(error){preview.plateError=message(error);}
  }
  for(const tray of layout.trays){
   const {id,x,y,rotation,project}=tray,projectKey=JSON.stringify(input.trays.find(t=>t.id===id)!.project);
   const item:DrawerPreviewTray={id,projectKey,pose:{x,y,rotation},meshes:[],mounted:false};
   preview.trays.push(item);
   try{
    const assembled=bases.get(projectKey)??baseCache.get(projectKey)??await buildKit({...project,printing:undefined});
    bases.set(projectKey,assembled);
    const original=kitLimits(assembled);
    item.bounds=original.bounds;
    let parts=assembled,baseZ=0;
    if(preview.plate.length){
     try{
      const mountKey=JSON.stringify([projectKey,plateKey,layout.height,x,y,rotation]);
      parts=mounts.get(mountKey)??mountedCache.get(mountKey)??await mountedKit({layout,trayId:id},assembled);
      mounts.set(mountKey,parts);
      item.mounted=true;
      baseZ=MOUNT.plateThickness;
     }catch(error){
      item.mountingError=message(error);
      baseZ=MOUNT.plateThickness+MOUNT.pegHeight+2;
     }
    }
    const {min,max}=item.mounted?kitLimits(parts):original;
    item.origin=drawerPreviewOrigin(item.pose,min,max,baseZ);
    item.meshes=parts.map(mesh);
   }catch(error){item.error=message(error);}
  }
  baseCache=bases;
  mountedCache=mounts;
  return preview;
 };
}
