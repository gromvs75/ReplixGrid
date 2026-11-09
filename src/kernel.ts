import {SVG_ISLAND_ERROR} from './svgSurface.js';
import {finishTopEdge} from './topEdge.js';
import {cutPanelSockets} from './decorativePanels.js';
import {hasShellSupport,hasDecorativeShellSupport,shellSupportHeight,shellSupportWidth} from './shellSupport.js';
import {applyBaseBand} from './baseBand.js';
import {applyShellClips} from './shellClips.js';
import {shellGap} from './reliefSize.js';
import {applyLabel} from './lettering.js';
import {roundInnerCorners} from './innerCorners.js';
import {roundStepCorners} from './stepCorners.js';
import {applyRelief,type ReliefBounds} from './relief.js';
import {perforateShell} from './wrappedPattern.js';
import {tiltOnBase} from './tilt.js';
import {contourBody} from './contourKernel.js';
import {footprintContour} from './footprint.js';
import Module, { type Manifold, type Vec2 } from 'manifold-3d';
import { resolveWalls, hasCapsuleSlope, capsuleTop, limitSteppedChamfer, type Project } from './model.js';
import {shellLayout,wallOutline} from './shell.js';
import { encodeSTL,decodeSTL,inspectSurface,removeCollapsedFaces,weldNearVertices,type Point,type Triangle } from './stl.js';
let modulePromise: ReturnType<typeof Module> | undefined;
export async function buildOrganizer(project: Project,shellSupport=true,reliefBounds:ReliefBounds={}) {
  const precisions=project.topEdge?[.002,.00001,0]:[.002];
  for(const [attempt,precision] of precisions.entries())try{
    return await buildPart(project,'organizer',shellSupport,reliefBounds,precision);
  }catch(error){
    // A final-mesh retry cannot undo a fold introduced while cleaning the
    // bevel itself. Rebuild from the same project with finer edge cleanup;
    // every attempt still passes connectivity, STL topology and volume checks.
    if(attempt===precisions.length-1||!(error instanceof Error)||
       !/^(Open or non-manifold oriented edge|Degenerate triangle|Degenerate STL triangle|Disconnected solid|STL volume mismatch|Shell STL volume mismatch|Simplified volume mismatch)/.test(error.message))throw error;
  }
  throw new Error('Geometry failed');
}
export async function buildShell(project:Project,shellSupport=true){if(project.shell?.mode==='panels')throw new Error('Панели экспортируются отдельными деталями комплекта.');return buildPart(project,'shell',shellSupport);}
async function buildPart(project:Project,part:'organizer'|'shell',shellSupport=true,reliefBounds:ReliefBounds={},edgeCleanup=.002) {
  project=limitSteppedChamfer(project);
  const walls=part==='shell'?shellLayout(project).panels:resolveWalls(project);
  const wasm=await (modulePromise ??= Module()); wasm.setup();
  const owned:Manifold[]=[];
  const keep=(s:Manifold)=>{owned.push(s);return s;};
  try {
    const radius=project.cornerRadius??0,rounded=radius>0||!!project.footprint;
    const offset=part==='shell'?shellGap(project)+project.shell!.thickness:0;
    const thickness=part==='shell'?project.shell!.thickness:project.wallThickness;
    const outerRadius=radius+offset;
    const high=Math.max(...walls.flatMap(w=>[w.startHeight,w.endHeight,...(w.stepPoints??[]).map(([,h])=>h)]));
    const outerContour=footprintContour(project,offset);
    const outerSolid=rounded?keep(wasm.Manifold.extrude([outerContour],high)):null;
    const ring=rounded&&!project.footprint?keep(wasm.Manifold.extrude([outerContour,footprintContour(project,offset-thickness).reverse()],high)):null;
    const parts:Manifold[]=part==='organizer'?[keep(rounded?wasm.Manifold.extrude([outerContour],project.floorThickness):wasm.Manifold.cube([project.width,project.depth,project.floorThickness]))]:[];
    const cornerNotches:Manifold[]=[],outerParts:Manifold[]=[];
    const cutExterior=rounded&&!project.footprint&&walls.some((w,i)=>(part==='shell'||i<4)&&w.cutout);
    if(project.footprint)parts.push(contourBody(wasm,project,resolveWalls(project),part==='shell',keep));
    const planar=hasCapsuleSlope(project);
    if(planar && ring)parts.push(keep(ring.warp(v=>{v[2]*=capsuleTop(project,v[0],offset)/high;})));
    for(const [index,source] of walls.entries()) {
      const exterior=part==='shell'||index<4;
      if(planar&&exterior)continue;
      if(project.footprint&&(part==='shell'||index<4))continue;
      const w={...source};
      if(part==='organizer'&&!project.footprint&&index<4&&w.stepPoints){
        // The height change meets the face of the divider, not its centre.
        // Otherwise half a divider is exposed as a notch above the low wall.
        const relief=(project.cornerRadius??0)>0?.01:.0001;
        w.stepPoints=w.stepPoints.map(([x,h],i,steps)=>i===0?[x,h]:[x+(h>steps[i-1][1]?-project.wallThickness/2+relief:h<steps[i-1][1]?project.wallThickness/2-relief:0),h]);
      }
      if(rounded&&exterior){
        // Each broad profile mask intersects the rounded annulus. Corners
        // stay solid; adjacent masks overlap only in the curved corner zones.
        const band=Math.max(outerRadius,thickness);
        w.thickness=band;
        if(w.id==='back')w.y=project.depth+offset-band;
        if(w.id==='right')w.x=project.width+offset-band;
      }
      const profile:Vec2[]=wallOutline(w);
      const sharedNotch=rounded&&exterior&&!!w.cutout;
      const holes:Vec2[][]=[];
      let solid=keep(wasm.Manifold.extrude([sharedNotch?wallOutline({...w,cutout:undefined}):profile,...holes],w.thickness));
      // Exact axis permutation keeps coincident wall/cutter planes coincident.
      // Trigonometric 90-degree rotations leave sub-Float32 slivers at deep cuts.
      const place=(body:Manifold)=>{
        if(!cutExterior){
          let placed=keep(body.rotate([90,0,0]));
          if(w.axis==='y')placed=keep(placed.rotate([0,0,90]));
          return keep(placed.translate([w.x,w.y+(w.axis==='x'?w.thickness:0),0]));
        }
        return keep(body.warp(v=>{
        const [along,height,depth]=v;
        v[0]=w.x+(w.axis==='x'?along:depth);
        v[1]=w.y+(w.axis==='x'?w.thickness-depth:along);
        v[2]=height;
      }));};
      solid=place(solid);
      // Fit the whole top face of a transverse divider, including its thickness.
      const center=w.x+w.thickness/2;
      if(planar && !exterior && w.axis==='y' && !w.cutout && w.transitionStyle==='straight' &&
        Math.abs(w.startHeight-capsuleTop(project,center))<1e-6 && w.endHeight===w.startHeight)
        solid=keep(solid.warp(v=>{v[2]*=capsuleTop(project,v[0])/w.startHeight;}));
      if(rounded)solid=keep(solid.intersect(exterior?ring!:outerSolid!));
      if(sharedNotch){
        // Rounded wall masks overlap at corners (across a whole capsule end).
        // An adjacent uncut mask must not fill this wall's notch back in.
        // Cut the joined exterior walls before adding the floor and dividers.
        // Keeping the cutter as a prism avoids coincident curved Boolean faces.
        const uncut=new wasm.CrossSection([wallOutline({...w,cutout:undefined})]);
        const cut=new wasm.CrossSection([profile]),missing=uncut.subtract(cut);
        try{
          const notch=place(keep(missing.extrude(w.thickness)));
          cornerNotches.push(notch);
        }finally{missing.delete();cut.delete();uncut.delete();}
      }
      (cutExterior&&exterior?outerParts:parts).push(solid);
    }
    if(outerParts.length){
      const exterior=keep(wasm.Manifold.union(outerParts));
      parts.push(cornerNotches.length?keep(exterior.subtract(keep(wasm.Manifold.union(cornerNotches)))):exterior);
    }
    if(part==='shell'&&!project.tilt){const shell=keep(wasm.Manifold.union(parts));parts.splice(0,parts.length,perforateShell(wasm,project,shell,keep));}
    const baseJoined=keep(wasm.Manifold.union(parts));
    const joined=part==='organizer'?roundInnerCorners(wasm,project,resolveWalls(project),baseJoined,keep):baseJoined;
    const stepped=part==='organizer'?roundStepCorners(wasm,project,resolveWalls(project),joined,keep):joined;
    const labeled=part==='organizer'?applyLabel(wasm,project,finishTopEdge(wasm,project,stepped,keep,edgeCleanup),keep):stepped;
    const decorated=part==='organizer'&&!project.tilt?applyRelief(wasm,project,labeled,keep,reliefBounds):labeled;
    const tilted=tiltOnBase(wasm,project,decorated,part==='shell',keep,part==='shell'?body=>perforateShell(wasm,project,body,keep):body=>applyRelief(wasm,project,body,keep,reliefBounds));
    const clipped=applyShellClips(wasm,project,tilted,part==='shell',keep);
    let union=part==='organizer'?cutPanelSockets(wasm,project,clipped,keep):clipped;
    if(part==='organizer'&&project.baseBand)union=applyBaseBand(wasm,project,union,keep);
    if(shellSupport&&(hasShellSupport(project)||hasDecorativeShellSupport(project))){
      if(part==='organizer'&&!project.baseBand){
        const support=keep(wasm.Manifold.extrude([footprintContour(project,shellSupportWidth(project))],shellSupportHeight(project)));
        union=keep(union.add(support));
      }else if(part==='shell'){
        // Trim the sleeve's bottom by the ledge height so its top remains flush.
        const bounds=union.boundingBox(),size=bounds.max.map((n,i)=>n-bounds.min[i]);
        const upper=keep(wasm.Manifold.cube([size[0]+2,size[1]+2,size[2]+1]).translate([bounds.min[0]-1,bounds.min[1]-1,shellSupportHeight(project)]));
        union=keep(union.intersect(upper));
      }
    }
    // Keep organizer accuracy unchanged. Perforated sleeves accumulate Boolean
    // slivers; a 5-micron simplification removes these before Float32 export.
    // Both preview and export use this same solid and strict surface validation.
    const tolerance=Math.max(project.width,project.depth,project.height,...walls.map(w=>Math.max(w.startHeight,w.endHeight)))*1e-6;
    const original=keep(union.asOriginal());
    // Simplification can collapse distinct edges of a fine lattice. Retry from
    // the original solid at finer precision instead of welding the damaged mesh
    // more aggressively. Every candidate still passes serialized STL validation.
    const precisions=part==='shell'?[Math.max(tolerance,.005),tolerance,0]:[tolerance,tolerance/10,0];
    const attempts=[...precisions.map(precision=>({precision,quantize:false})),{precision:0,quantize:true}];
    for(const [attempt,{precision,quantize}] of attempts.entries())try{
    let body=precision===0?original:keep(original.simplify(precision));
    if(quantize){
      // As a last resort, let Manifold retriangulate at the Float32 coordinates
      // used by STL. This removes collapsed Boolean seams, not mesh pieces.
      // Never repair an already disconnected source, and retain volume checks.
      const source=original.decompose();source.forEach(keep);
      if(source.length!==1)throw new Error('Disconnected solid');
      const mesh=body.getMesh();
      body=keep(new wasm.Manifold(new wasm.Mesh({numProp:mesh.numProp,vertProperties:mesh.vertProperties,triVerts:mesh.triVerts})));
      body=keep(body.simplify(tolerance/10));
    }
    if(body.status()!=='NoError') throw new Error(`Geometry error: ${body.status()}`);
    if(part==='organizer'&&Math.abs(body.volume()-original.volume())>Math.max(.001,original.volume()*1e-5))throw new Error('Simplified volume mismatch');
    const components=body.decompose();components.forEach(keep);
    if(components.length!==1) throw new Error(project.shell?.svg&&part==='shell'?SVG_ISLAND_ERROR:'Disconnected solid');
    const mesh=body.getMesh();
    const triangles:Triangle[]=[];
    for(let i=0;i<mesh.triVerts.length;i+=3) triangles.push([0,1,2].map(j=>{
      const start=mesh.triVerts[i+j]*mesh.numProp;
      return [mesh.vertProperties[start],mesh.vertProperties[start+1],mesh.vertProperties[start+2]] as Point;
    }) as Triangle);
    // Preserve exact vertices first: welding close but distinct edges can
    // damage both fine perforations and a chamfer at a deep notch shoulder.
    // Only weld if strict serialized validation fails.
    let cleaned=removeCollapsedFaces(triangles);
    let stl=encodeSTL(cleaned),inspection!:ReturnType<typeof inspectSurface>;
    try{inspection=inspectSurface(decodeSTL(stl));}
    catch(error){
      // Close vertices on fine perforations can be distinct: retry with a
      // smaller weld, retaining the same strict closed-surface inspection.
      // Wrapped SVG strips can also meet at Float32-scale seams.
      if(!(error instanceof Error)||(error.message!=='Open or non-manifold oriented edge'&&error.message!=='Degenerate triangle'))throw error;
      // Boolean seams may need a weld after rounding to Float32. Retain the
      // existing per-part distances; every candidate must still pass exact
      // serialized topology and volume checks below.
      const distances=[tolerance*.002,tolerance*.02,...(part==='shell'?[.001,.0001,.003]:[tolerance*.2,...(project.topEdge||project.relief?.svg?[.000005,.00001,.00002,.00005,.0001,.0005,.001,.003]:[])])];
      let valid=false;
      for(const distance of distances){
        cleaned=removeCollapsedFaces(weldNearVertices(triangles,distance));
        stl=encodeSTL(cleaned);
        try{inspection=inspectSurface(decodeSTL(stl));valid=true;break;}catch{/* Try the next weld distance. */}
      }
      if(!valid)throw error;
    }
    if(part==='shell'||project.tilt){
      // Output sits at origin for slicers; keep project coordinates for preview only.
      const min=inspection.bounds.min;
      const shifted=cleaned.map(tri=>tri.map(p=>p.map((v,i)=>Math.fround(v-min[i])) as Point) as Triangle);
      const output=encodeSTL(removeCollapsedFaces(shifted)),check=inspectSurface(decodeSTL(output));
      if(Math.abs(check.volume-body.volume())>Math.max(.01,body.volume()*1e-4))throw new Error('Shell STL volume mismatch');
      return {stl:output,inspection:check,position:min};
    }
    if(Math.abs(inspection.volume-body.volume())>Math.max(1e-3,body.volume()*1e-5)) throw new Error('STL volume mismatch');
    return {stl,inspection,position:[0,0,0] as Point};
    }catch(error){
      let numerical=error instanceof Error&&/^(Open or non-manifold oriented edge|Degenerate triangle|Degenerate STL triangle|Shell STL volume mismatch|Simplified volume mismatch)/.test(error.message);
      if(error instanceof Error&&error.message==='Disconnected solid'){
        // A simplifier can split a tiny rim fragment off an otherwise connected
        // solid. Retry with finer precision, but never hide a disconnected source.
        const sourceComponents=original.decompose();sourceComponents.forEach(keep);
        numerical=sourceComponents.length===1;
      }
      if(!numerical||attempt===attempts.length-1)throw error;
    }
    throw new Error('Geometry failed');
  } finally { for(const s of owned.reverse()) s.delete(); }
}
