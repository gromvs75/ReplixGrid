import {gridfinityInscription,tagWidth,tagHeight,tagThickness,shelfPoint,shelfAngle,shelfLength,labelFront,tagTravel,tagPocketDepth,lidTagOrigin} from './gridfinityLabel.js';
import {gridfinityCavities} from './gridfinityPreview.js';
import {stackingLipPositions} from './gridfinityLip.js';
import Module,{type Manifold,type Vec3} from 'manifold-3d';
import {GRIDFINITY as G,gridPitch,hasGridfinityLid,lidLocatorDepth,lidDeckBase,lidDeckTop,gridfinityLidDeck,validateGridfinity,gridfinityFloorRadius,gridfinityNotch,gridfinityPairedNotches,gridfinityRadii,gridfinityInnerRadiusLimit,gridfinityRegions,gridfinityPlateFloor,gridfinityPlateScrew,gridfinityMagnet,type GridfinityProject} from './gridfinity.js';
import {cutoutDepthFraction} from './shell.js';
import {roundedContour} from './rounding.js';
import {encodeSTL,decodeSTL,inspectSurface,weldNearVertices,removeCollapsedFaces,type Triangle,type Point} from './stl.js';
let modulePromise:ReturnType<typeof Module>|undefined;

/** Independent solid construction using the MIT reference's mating profile. */
export async function buildGridfinity(input:GridfinityProject,part:'tray'|'plate'|'lid'|'tag'){
  const p=validateGridfinity(input);
  if(part!=='tray'&&part!=='plate'&&!(part==='tag'&&p.label?.mode==='tag')&&!(part==='lid'&&hasGridfinityLid(p)))throw Error('Invalid Gridfinity part');
  const [px,py]=gridPitch(p),w=p.columns*px-.5,d=p.rows*py-.5;
  const wasm=await(modulePromise??=Module());wasm.setup();
  const owned:Manifold[]=[],keep=(m:Manifold)=>{owned.push(m);return m;};
  const contour=(w:number,d:number,r:number,x=0,y=0)=>roundedContour(w,d,r,x,y).map(v=>v.map(n=>Math.round(n*1e8)/1e8) as [number,number]);
  const rounded=(w:number,d:number,r:number,h:number,x=0,y=0,z=0)=>keep(wasm.Manifold.extrude([contour(w,d,r,x,y)],h).translate([0,0,z]));
  // Constant corner centres; both chamfers expand at exactly 45 degrees.
  const foot=(cx:number,cy:number,clearance=0,zOffset=0,pitchX=px,pitchY=py)=>{
    const sections:[[number,number],[number,number],[number,number],[number,number]]=[[0,0],[.8,.8],[2.6,.8],[4.75,2.95]];
    const solids:Manifold[]=[];
    for(let i=1;i<sections.length;i++){
      const points:Vec3[]=sections.slice(i-1,i+1).flatMap(([z,spread])=>{
        const inset=6.4-2*(spread+clearance),sx=pitchX-inset,sy=pitchY-inset,r=.8+spread+clearance;
        return contour(sx,sy,r,cx-sx/2,cy-sy/2).map(([x,y])=>[x,y,z+zOffset] as Vec3);
      });
      solids.push(keep(wasm.Manifold.hull(points)));
    }
    if(clearance)solids.push(rounded(px-.5+2*clearance,py-.5+2*clearance,3.75+clearance,.2,cx-(px-.5)/2-clearance,cy-(py-.5)/2-clearance,zOffset+4.75));
    return keep(wasm.Manifold.union(solids));
  };
  const lip=(w:number,d:number,h:number,onDeck=false)=>{
        const positions=new Float32Array(stackingLipPositions(w,d,h,true,onDeck));
        const mesh=new wasm.Mesh({numProp:3,vertProperties:positions,
          triVerts:Uint32Array.from({length:positions.length/3},(_,i)=>i)});
        mesh.merge();
        return keep(new wasm.Manifold(mesh));
  };
  const box=(x:number,y:number,z:number,w:number,d:number,h:number)=>
    keep(keep(wasm.Manifold.cube([w,d,h])).translate([x,y,z]));
  const cylinder=(x:number,y:number,z:number,radius:number,height:number)=>
    keep(keep(wasm.Manifold.cylinder(height,radius,radius,64)).translate([x,y,z]));
  const magnetRadius=p.magnetClearance===undefined?undefined:(gridfinityMagnet.diameter+p.magnetClearance)/2;
  const magnetCenters=(column:number,row:number,inset=0)=>{
    const edge=gridfinityMagnet.edgeOffset;
    return [edge,px-edge].flatMap(x=>[edge,py-edge].map((y):[number,number]=>[
      column*px+x-inset,row*py+y-inset,
    ]));
  };
  const onShelf=(solid:Manifold)=>keep(keep(solid.rotate([shelfAngle(p),0,0])).translate(shelfPoint(p,0,0,0)));
  function engrave(body:Manifold,surface:'tag'|'shelf'|'lid'){
    const layout=gridfinityInscription(p);
    if(!layout.contours.length)return body;
    const section=new wasm.CrossSection(layout.contours,'NonZero');
    try{
      const cutter=keep(section.extrude(.46));
      const ink=surface==='lid'?keep(cutter.translate([(w-layout.width)/2,labelFront+(tagHeight-layout.height)/2,lidDeckTop(p)-.45])):
        surface==='tag'?keep(cutter.translate([(tagWidth-layout.width)/2,(tagHeight-layout.height)/2,tagThickness-.45])):
        onShelf(keep(cutter.translate([(w-layout.width)/2,(shelfLength-layout.height)/2,-.45])));
      return keep(body.subtract(ink));
    }finally{section.delete();}
  }
  function filletedCavity(points:[number,number][],radius:number,top:number){
    const section=new wasm.CrossSection([points]);
    const cloud:Vec3[]=points.map(([x,y])=>[x,y,top]);
    try{
      for(let step=0;step<=12;step++){
        const angle=Math.PI*step/24;
        const inset=radius*(1-Math.sin(angle)),z=G.floorHeight+radius*(1-Math.cos(angle));
        const ring=inset>1e-6?section.offset(-inset,'Miter'):section;
        try{for(const polygon of ring.toPolygons())for(const [x,y] of polygon)cloud.push([x,y,z]);}
        finally{if(ring!==section)ring.delete();}
      }
      return keep(wasm.Manifold.hull(cloud));
    }finally{section.delete();}
  }
  function frontNotch(){
    const {center,width,depth,shape,top,reach}=gridfinityNotch(p);
    const halfWidth=width/2;
    const arc:[number,number][]=Array.from({length:41},(_,i)=>{
      const angle=Math.PI*i/40;
      const cosine=Math.cos(angle);
      const fraction=shape==='round'?Math.sin(angle):cutoutDepthFraction(shape,(1-cosine)/2);
      return [center-halfWidth*cosine,top-depth*fraction];
    });
    const profile=[...arc,[center+halfWidth,top+1],[center-halfWidth,top+1]] as [number,number][];
    const cutter=keep(wasm.Manifold.extrude([profile],reach+1));
    return keep(keep(cutter.rotate([90,0,0])).translate([0,reach,0]));
  }
  function pairedWallCuts(){
    const {walls,span,width,depth,top}=gridfinityPairedNotches(p);
    const left=(span-width)/2,bottom=top-depth,r=Math.min(5,width/6,depth/3);
    // Two tangent quarter-circles join each vertical edge to the rim and the flat sill.
    const shoulder:[number,number][]=[],heel:[number,number][]=[];
    for(let i=0;i<=12;i++){
      const angle=i*Math.PI/24;
      shoulder.push([left+r*Math.sin(angle),top-r+r*Math.cos(angle)]);
      heel.push([left+2*r-r*Math.cos(angle),bottom+r-r*Math.sin(angle)]);
    }
    const edge=[...shoulder,...heel];
    const profile:[number,number][]=[...edge,...edge.slice().reverse().map(([x,z]):[number,number]=>[span-x,z]),[span-left,top+1],[left,top+1]];
    const reach=Math.max(p.wall+(walls==='left-right'&&p.sideGrips?3:0),p.stackingLip?4:0)+.1;
    const section=keep(wasm.Manifold.extrude([profile],reach+1));
    const front=keep(section.rotate([90,0,0]));
    if(walls==='front-back')return [keep(front.translate([0,reach,0])),keep(front.translate([0,d+1,0]))];
    const side=keep(front.rotate([0,0,90]));
    return [keep(side.translate([-1,0,0])),keep(side.translate([w-reach,0,0]))];
  }
  function sideGrip(w:number,d:number,h:number,right:boolean){
    const z=h-1.5,extent=Math.min(3,(h-G.floorHeight-2)/2);
    const root=p.wall-.4,tip=p.wall+extent;
    // Bevel the underside and round both ends, keeping the grip inside the footprint.
    const cloud:Vec3[]=[];
    for(const [outer,height] of [[root+.6,z-extent-1],[tip,z-1],[tip,z]]){
      for(const [x,y] of contour(outer-root,18,Math.min((outer-root)/2,2),root,(d-18)/2)){
        cloud.push([right?w-x:x,y,height]);
      }
    }
    return keep(wasm.Manifold.hull(cloud));
  }
  try{
    let body:Manifold;
    if(part==='tray'){
      const h=p.heightUnits*7;
      const {outerRadius,innerRadius}=gridfinityRadii(p);
      body=rounded(w,d,outerRadius,h-G.footHeight,0,0,G.footHeight);
      // Clip each cavity to the inset outer contour, preserving the outer wall.
      const cuts:Manifold[]=[];
      if(p.floorRadius){
        for(const cell of gridfinityCavities(p)){
          const radius=gridfinityFloorRadius(p,cell.width,cell.depth);
          cuts.push(filletedCavity(cell.points,radius,h+.1));
        }
      }else{
        const envelope=rounded(w-2*p.wall,d-2*p.wall,Math.max(.2,outerRadius-p.wall),h-G.floorHeight+.1,p.wall,p.wall,G.floorHeight);
        const radius=Math.min(innerRadius,gridfinityInnerRadiusLimit(p));
        for(const r of gridfinityRegions(p).filter(r=>!r.cell.split)){
          const cavity=rounded(r.width,r.depth,radius,h-G.floorHeight+.1,r.x,r.y,G.floorHeight);
          cuts.push(keep(cavity.intersect(envelope)));
        }
      }
      body=keep(body.subtract(keep(wasm.Manifold.union(cuts))));
      const additions=[body];
      for(let x=0;x<p.columns;x++)for(let y=0;y<p.rows;y++)additions.push(foot((x+.5)*px-.25,(y+.5)*py-.25));
      if(p.stackingLip){
        additions.push(lip(w,d,h));
      }
      body=keep(wasm.Manifold.union(additions));
      if(magnetRadius!==undefined){
        const pockets:Manifold[]=[];
        for(let x=0;x<p.columns;x++)for(let y=0;y<p.rows;y++){
          for(const [mx,my] of magnetCenters(x,y,G.gap/2)){
            pockets.push(cylinder(mx,my,-.1,magnetRadius,gridfinityMagnet.pocketDepth+.1));
          }
        }
        body=keep(body.subtract(keep(wasm.Manifold.union(pockets))));
      }
      if(p.sideGrips)body=keep(wasm.Manifold.union([body,sideGrip(w,d,h,false),sideGrip(w,d,h,true)]));
      if(!hasGridfinityLid(p)&&p.label){
        const removable=p.label.mode==='tag';
        const width=removable?tagWidth+2:w-8;
        const left=(w-width)/2;
        const front=shelfPoint(p,left,0,0),back=shelfPoint(p,left,shelfLength,0);
        // A sloping underside grows out of the rear wall without a horizontal span.
        const profile=[front,back,[left,d-.55,back[2]],
          [left,d-.55,Math.max(G.floorHeight-.1,front[2]-2.8-(d-.55-front[1]))],
          [left,front[1],Math.max(G.floorHeight-.1,front[2]-2.8)]];
        const shelf=keep(wasm.Manifold.hull(profile.flatMap(([,y,z])=>
          [[left,y,z],[left+width,y,z]] as Vec3[])));
        body=keep(body.add(shelf));
        // Trim crossing dividers at the face so a single uninterrupted label is visible.
        body=keep(body.subtract(onShelf(box(left,0,0,width,shelfLength,5))));
        if(removable){
          const x=(w-tagWidth)/2,y=.8;
          body=keep(body.subtract(onShelf(box(x-.2,y-.2,-tagPocketDepth,tagWidth+.4,tagHeight+tagTravel+.4,tagPocketDepth+.1))));
          for(const end of [x-.4,x+tagWidth-2]){
            body=keep(body.add(onShelf(box(end,y-.4,-.6,2.4,1.6,.6))));
          }
        }else body=engrave(body,'shelf');
      }
      if(p.frontNotch)body=keep(body.subtract(frontNotch()));
      if(p.pairedNotches)for(const cut of pairedWallCuts())body=keep(body.subtract(cut));
    }else if(part==='tag'){
      body=engrave(rounded(tagWidth,tagHeight,.45,tagThickness),'tag');
    }else if(part==='lid'){
      const pocketDepth=5;
      const recessed=p.flushLidGrip==='recessed';
      const base=lidDeckBase(p),top=lidDeckTop(p);
      const radius=p.stackingLip?G.radius:gridfinityRadii(p).outerRadius;
      const pieces=[rounded(w,d,radius,gridfinityLidDeck(p),0,0,base)];
      if(p.stackingLip){
        // One continuous foot seats on the same shelf as a stacked tray.
        pieces.push(foot(w/2,d/2,0,0,w+G.gap,d+G.gap));
      }else{
        const rise=base-lidLocatorDepth;
        const envelope=rounded(w,d,radius,base+.1);
        for(const cavity of gridfinityCavities(p)){
          const section=new wasm.CrossSection([cavity.points]);
          const pad=section.offset(-.2);
          // A narrow bearing land at rim height, followed by a 45° flare.
          const seat=section.offset(.12,'Round',2,64),wide=section.offset(.12+rise,'Round',2,64);
          try{
            if(pad.isEmpty())continue;
            pieces.push(keep(pad.extrude(lidLocatorDepth)));
            const points:Vec3[]=[];
            for(const [ring,height] of [[seat,lidLocatorDepth],[wide,base]] as const){
              for(const polygon of ring.toPolygons())for(const [x,y] of polygon)points.push([x,y,height]);
            }
            pieces.push(keep(keep(wasm.Manifold.hull(points)).intersect(envelope)));
          }finally{wide.delete();seat.delete();pad.delete();section.delete();}
        }
      }
      if(p.lid==='stackable'){
        // The deck supports the entire shelf, so omit the tray's underside flare.
        pieces.push(lip(w,d,top,true));
      }
      body=keep(wasm.Manifold.union(pieces));
      if(p.label?.mode==='engraved')body=engrave(body,'lid');
      if(p.label?.mode==='tag'){
        const [x,y,z]=lidTagOrigin(p);
        const pocket=box(x-.2,y-.2,z,tagWidth+.4,tagHeight+tagTravel+.4,tagPocketDepth+.1);
        body=keep(body.subtract(pocket));
        // Slide the plate forward beneath the two flush retaining corners.
        for(const left of [x,x+tagWidth-3]){
          // Each tab grows from the front wall. Its underside rises 1:1
          // into the pocket, clearing the installed tag and its removal path.
          const profile=[[y-.5,top-.9],[y-.2,top-.9],[y+.4,top-.3],[y+.4,top],[y-.5,top]];
          const points:Vec3[]=[left,left+3].flatMap(x=>profile.map(([y,z])=>[x,y,z] as Vec3));
          body=keep(body.add(keep(wasm.Manifold.hull(points))));
        }
      }
      if(p.flushLidGrip){
        // Two circular segments leave a continuous 4 mm grip across the deck.
        // Keep the cut inside the perimeter shelf even on a single-cell lid.
        const frontMargin=p.label?labelFront+tagHeight+tagTravel+2:6;
        const radius=Math.min(18,(w-12)/2,(d-frontMargin-6)/2);
        const centerY=Math.max(d/2,frontMargin+radius);
        const startAngle=Math.asin(2/radius);
        const points:[number,number][]=Array.from({length:49},(_,index)=>{
          const angle=startAngle+(Math.PI-2*startAngle)*index/48;
          return [radius*Math.cos(angle),radius*Math.sin(angle)];
        });
        const openings=[1,-1].map(sign=>points.map(([x,y])=>
          [w/2+sign*x,centerY+sign*y] as [number,number]));
        const bottom=recessed?top-pocketDepth:-.1;
        const cutter=keep(wasm.Manifold.extrude(openings,top-bottom+.1));
        body=keep(body.subtract(keep(cutter.translate([0,0,bottom]))));
      }
    }else{
      const floor=gridfinityPlateFloor(p),screw=gridfinityPlateScrew;
      body=rounded(p.columns*px,p.rows*py,4,floor+G.footHeight);
      const cuts:Manifold[]=[];
      for(let x=0;x<p.columns;x++)for(let y=0;y<p.rows;y++){
        const cx=(x+.5)*px,cy=(y+.5)*py;
        const mount=p.plateScrewMount&&(x===0||x===p.columns-1)&&(y===0||y===p.rows-1);
        const centers=magnetRadius===undefined?[]:magnetCenters(x,y);
        cuts.push(foot(cx,cy,p.clearance,floor));
        // Retain a 2 mm bearing ledge beneath the 35.6 mm foot. The opening
        // overlaps the socket without changing its profile or seating height.
        if(p.plateStyle==='lattice'){
          const opening=rounded(px-10.4,py-10.4,.8,floor+.2,x*px+5.2,y*py+5.2,-.1);
          const supports:Manifold[]=[];
          if(mount)supports.push(box(x*px,cy-6,-.2,px,12,floor+.4));
          if(magnetRadius!==undefined){
            for(const [mx,my] of centers){
              supports.push(cylinder(mx,my,-.2,magnetRadius+gridfinityMagnet.backing,floor+.4));
            }
          }
          // Leave material around the pockets and screw while keeping the rest of the cell open.
          cuts.push(supports.length?keep(opening.subtract(keep(wasm.Manifold.union(supports)))):opening);
        }
        if(magnetRadius!==undefined){
          for(const [mx,my] of centers){
            cuts.push(cylinder(mx,my,floor-gridfinityMagnet.pocketDepth,magnetRadius,gridfinityMagnet.pocketDepth+.1));
          }
        }
        if(mount){
          const shaft=screw.shaftDiameter/2,head=screw.headDiameter/2;
          const taperTop=floor-screw.headClearance,taperHeight=head-shaft;
          const profile:[[number,number][]]=[[
            [0,-.1],[shaft,-.1],[shaft,taperTop-taperHeight],
            [head,taperTop],[head,floor+.1],[0,floor+.1],
          ]];
          const hole=keep(wasm.Manifold.revolve(profile,48));
          cuts.push(keep(hole.translate([cx,cy,0])));
        }
      }
      body=keep(body.subtract(keep(wasm.Manifold.union(cuts))));
    }
    body=keep(body.simplify(.001));
    if(body.status()!=='NoError')throw Error('Gridfinity geometry failed');
    const components=body.decompose();components.forEach(keep);
    if(components.length!==1)throw Error('Disconnected Gridfinity solid');
    const mesh=body.getMesh(),triangles:Triangle[]=[];
    for(let i=0;i<mesh.triVerts.length;i+=3)triangles.push([0,1,2].map(j=>{
      const k=mesh.triVerts[i+j]*mesh.numProp;return [mesh.vertProperties[k],mesh.vertProperties[k+1],mesh.vertProperties[k+2]] as Point;
    }) as Triangle);
    const stl=encodeSTL(removeCollapsedFaces(weldNearVertices(triangles,.00001))),inspection=inspectSurface(decodeSTL(stl));
    if(Math.abs(inspection.volume-body.volume())>Math.max(.01,body.volume()*1e-5))throw Error('Gridfinity STL volume mismatch');
    return {stl,inspection};
  }finally{owned.reverse().forEach(m=>m.delete());}
}
