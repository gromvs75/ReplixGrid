import {shellGap,reliefHeight} from './reliefSize.js';
import Module,{type Manifold,type Vec2} from 'manifold-3d';
import {buildOrganizer,buildShell} from './kernel.js';
import {defaultProject,type Project} from './model.js';
import {splitPlan} from './splitting.js';
import {PIN_JOINT,pinJointHeights} from './pinJoint.js';
import {resolveWalls} from './model.js';
import {topAt} from './shell.js';
const SEAM_GAP=0;
import {decodeSTL,encodeSTL,inspectSurface,removeCollapsedFaces,weldNearVertices,type Triangle,type Point} from './stl.js';
export interface PrintPiece {name:string;stl:ArrayBuffer;inspection:ReturnType<typeof inspectSurface>;position:Point;section:number;kind:'organizer'|'shell'}
let modulePromise:ReturnType<typeof Module>|undefined;
// Two spring fingers with ramped heads. Experimental FDM fit, print coupon first.
const tongue:Vec2[]=[[-3,-2],[12,-2],[12,-2.8],[16,-1.4],[16,1.4],[12,2.8],[12,2],[-3,2]];
const socket:Vec2[]=[[-1,-2.25],[11.75,-2.25],[11.75,-3.05],[16.25,-1.65],[16.25,1.65],[11.75,3.05],[11.75,2.25],[-1,2.25]];
export async function buildPrintPieces(p:Project,only?:'organizer'|'shell'):Promise<PrintPiece[]>{
  const plan=splitPlan(p),wasm=await(modulePromise??=Module());wasm.setup();
  const owned:Manifold[]=[],keep=(m:Manifold)=>{owned.push(m);return m;};
  const results:PrintPiece[]=[];
  try{
    for(const kind of (only?[only]:p.shell?['organizer','shell']:['organizer']) as ('organizer'|'shell')[]){
      const built=await(kind==='shell'?buildShell(p):buildOrganizer(p));
      const triangles=decodeSTL(built.stl),mesh=new wasm.Mesh({numProp:3,vertProperties:new Float32Array(triangles.flat(2)),triVerts:new Uint32Array(Array.from({length:triangles.length*3},(_,i)=>i))});mesh.merge();
      let original=keep(new wasm.Manifold(mesh));
      const offset=kind==='shell'?shellGap(p)+p.shell!.thickness:reliefHeight(p);
      original=keep(original.translate(built.position));
      const span=plan.axis==='x'?p.width:p.depth,cross=plan.axis==='x'?p.depth:p.width;
      const boundaries=[-offset,...plan.cuts,span+offset];
      const joint=(poly:Vec2[],cut:number,anchor:number,thickness:number,wallSide?:number,through=0)=>{
        let solid=keep(wasm.Manifold.extrude([poly],thickness+2*through));
        if(wallSide!==undefined){solid=keep(solid.rotate([90,0,0]));solid=keep(solid.translate([cut,wallSide+thickness+through,anchor]));}
        else solid=keep(solid.translate([cut,anchor,0]));
        if(plan.axis==='y')solid=keep(solid.mirror([1,-1,0]));
        return solid;
      };
      for(let section=0;section<plan.settings.parts;section++){
        const lo=boundaries[section]+(section?SEAM_GAP/2:0),hi=boundaries[section+1]-(section<plan.settings.parts-1?SEAM_GAP/2:0);
        const box=keep(wasm.Manifold.cube(plan.axis==='x'?[hi-lo,cross+2*offset+2,plan.height+2]:[cross+2*offset+2,hi-lo,plan.height+2]));
        const clip=keep(box.translate(plan.axis==='x'?[lo,-offset-1,-1]:[-offset-1,lo,-1]));
        let body=keep(original.intersect(clip));
        const thickness=kind==='shell'?p.shell!.thickness:p.floorThickness;
        for(const outgoing of [false,true]){
          const seam=outgoing?section:section-1;if(seam<0||seam>=plan.cuts.length)continue;
          const cut=plan.cuts[seam];
          const locations=kind==='organizer'?[]:[{anchor:6,side:-offset},{anchor:6,side:cross+shellGap(p)}];
          for(const {anchor,side} of locations){
            if(outgoing){
              body=keep(body.add(joint(tongue,cut,anchor,thickness,side)));
              const slit:Vec2[]=[[0,-.8],[17,-.8],[17,.8],[0,.8]];
              body=keep(body.subtract(joint(slit,cut,anchor,thickness,side,.05)));
            }else body=keep(body.subtract(joint(socket,cut,anchor,thickness,side,.05)));
          }
        }
        if(kind==='organizer') for(const outgoing of [false,true]){
          const seam=outgoing?section:section-1;
          if(seam<0||seam>=plan.cuts.length)continue;
          const cut=plan.cuts[seam];
          // The tested continuous floor V-guide aligns the halves while keeping the inside flat.
          const profile:Vec2[]=outgoing?[[-.1,.6],[.8,1.5],[-.1,2.4]]:[[-.1,.57],[.83,1.5],[-.1,2.43]];
          const yStart=p.wallThickness+(outgoing?.15:0),width=cross-2*p.wallThickness-(outgoing?.3:0);
          let guide=keep(wasm.Manifold.extrude([profile],width));
          guide=keep(guide.rotate([90,0,0]));
          guide=keep(guide.translate([cut,yStart+width,0]));
          if(plan.axis==='y')guide=keep(guide.mirror([1,-1,0]));
          body=keep(outgoing?body.add(guide):body.subtract(guide));
          for(const {side,z} of jointPinLocations(p,plan,seam)){
            const circular=keep(wasm.Manifold.cylinder(PIN_JOINT.holeDepth*2,PIN_JOINT.holeDiameter/2,PIN_JOINT.holeDiameter/2,48));
            let hole=keep(keep(circular.rotate([0,90,0])).translate([cut-PIN_JOINT.holeDepth,side,z]));
            const roof:Vec2[]=[[0,-1.65],[0,1.65],[-2.2,0]];
            let peak=keep(keep(keep(wasm.Manifold.extrude([roof],PIN_JOINT.holeDepth*2)).rotate([0,90,0])).translate([cut-PIN_JOINT.holeDepth,side,z]));
            if(plan.axis==='y'){hole=keep(hole.mirror([1,-1,0]));peak=keep(peak.mirror([1,-1,0]));}
            body=keep(keep(body.subtract(hole)).subtract(peak));
          }
        }
        const parts=body.decompose();parts.forEach(keep);
        if(kind==='organizer'&&parts.length!==1)throw new Error('Разрез отделяет часть перегородки. Измените размеры или раскладку.');
        if(!parts.length||parts.length>(kind==='shell'?2:1))throw new Error('Не удалось получить связные детали для печати.');
        parts.sort((a,b)=>{const aa=a.boundingBox().min,bb=b.boundingBox().min;return aa[0]-bb[0]||aa[1]-bb[1];});
        for(let index=0;index<parts.length;index++){
          const solid=parts[index];if(solid.status()!=='NoError')throw new Error('Ошибка геометрии соединения.');
          const min=solid.boundingBox().min as Point;
          const normalized=keep(solid.translate(min.map(v=>-v) as Point));
          const normalizedMesh=normalized.getMesh(),faces:Triangle[]=[];
          for(let i=0;i<normalizedMesh.triVerts.length;i+=3)faces.push([0,1,2].map(j=>{const k=normalizedMesh.triVerts[i+j]*normalizedMesh.numProp;return [normalizedMesh.vertProperties[k],normalizedMesh.vertProperties[k+1],normalizedMesh.vertProperties[k+2]] as Point;}) as Triangle);
          const stl=encodeSTL(removeCollapsedFaces(weldNearVertices(faces,Math.max(p.width,p.depth,plan.height)*2e-7))),inspection=inspectSurface(decodeSTL(stl));
          if(Math.abs(inspection.volume-solid.volume())>Math.max(.02,solid.volume()*1e-4))throw new Error('Не совпал объем STL части.');
          const [w,d,h]=inspection.bounds.max,{bedWidth:bw,bedDepth:bd,bedHeight:bh}=plan.settings;
          if(!((w<=bw-4&&d<=bd-4)||(w<=bd-4&&d<=bw-4))||h>bh)throw new Error('Деталь с защёлкой не помещается в область печати.');
          results.push({name:`${kind}-${section+1}${parts.length>1?'-'+(index+1):''}.stl`,stl,inspection,position:min,section,kind});
        }
      }
    }
    return results;
  }finally{for(const solid of owned.reverse())solid.delete();}
}
export function jointSampleProject(p:Project):Project{
  const sample=defaultProject();sample.width=100;sample.depth=32;sample.height=12;sample.floorThickness=Math.max(3,p.floorThickness);sample.wallThickness=Math.max(5,p.wallThickness);
  sample.width=Math.max(100,2*p.wallThickness+90);sample.depth=Math.max(32,2*p.wallThickness+28);sample.height=Math.max(18,sample.floorThickness+8);
  sample.printing={parts:2,bedWidth:270,bedDepth:270,bedHeight:270};
  // Decorative panels cannot be combined with a split tray; the sample still
  // needs to test the tray joint without changing the user's original project.
  return sample;
}
export async function buildJointSample(p:Project){return buildPrintPieces(jointSampleProject(p));}

/** Each hole is bounded by the lowest wall profile across its 4.5 mm depth. */
export function jointPinLocations(p:Project,plan:ReturnType<typeof splitPlan>,seam:number){
 const cross=plan.axis==='x'?p.depth:p.width,cut=plan.cuts[seam];
 const walls=resolveWalls(p).slice(0,4).filter(w=>w.axis===plan.axis);
 if(walls.length!==2)throw new Error('Не удалось определить стенки для штифтов.');
 return walls.flatMap(w=>{
   const start=plan.axis==='x'?w.x:w.y;
   const height=Math.min(...Array.from({length:19},(_,i)=>topAt(w,cut-start-4.5+i*.5)));
   const heights=pinJointHeights(p.floorThickness,height);
   if(!heights.length)throw new Error('Стенка слишком низкая для отверстий под штифты. Увеличьте её высоту или измените вырез.');
   const side=(plan.axis==='x'?w.y:w.x)<cross/2?p.wallThickness/2:cross-p.wallThickness/2;
   return heights.map(z=>({side,z}));
 });
}
export async function buildJointPins(p:Project){
 const plan=splitPlan(p),count=plan.cuts.reduce((n,_,i)=>n+jointPinLocations(p,plan,i).length,0);
 const wasm=await(modulePromise??=Module());wasm.setup();
 const pin=wasm.Manifold.cylinder(PIN_JOINT.pinLength,PIN_JOINT.pinDiameter/2,PIN_JOINT.pinDiameter/2,48);
 try{
   const m=pin.getMesh(),triangles:Triangle[]=[];
   for(let i=0;i<m.triVerts.length;i+=3)triangles.push([0,1,2].map(j=>{const k=m.triVerts[i+j]*m.numProp;return [m.vertProperties[k]+PIN_JOINT.pinDiameter/2,m.vertProperties[k+1]+PIN_JOINT.pinDiameter/2,m.vertProperties[k+2]] as Point;}) as Triangle);
   const stl=encodeSTL(triangles);inspectSurface(decodeSTL(stl));
   return Array.from({length:count},(_,i)=>({name:`pin-${i+1}`,stl:stl.slice(0)}));
 }finally{pin.delete();}
}
