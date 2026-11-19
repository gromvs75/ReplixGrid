// Cross sections of the perimeter lip, measured inward from the tray outline
// and upward from the nominal stacking plane. The foot seats on the flat shelf.
import {roundedContour} from './rounding.js';

export const stackingLipHeight = 3.8;
const lipSections = [
  [.05, 0], [.05, stackingLipHeight], [.85, stackingLipHeight],
  [2.05, 2.6], [2.05, .8], [2.85, 0], [4, 0], [1, -3],
] as const;

export function stackingLipContours(width:number, depth:number, height:number, onDeck=false) {
  const sections=onDeck?[...lipSections.slice(0,5),[2.95,-.1]]:lipSections;
  return sections.map(([inset, dz]) => ({
    z: height + dz,
    points: roundedContour(width - 2*inset, depth - 2*inset,
      Math.max(.2, 3.75 - inset), inset, inset),
  }));
}

// The last section joins the inside of the wall below its top. The two closing
// faces are buried in the shell and are only needed for the solid union.
export function stackingLipPositions(width:number, depth:number, height:number, closed:boolean, onDeck=false) {
  const rings = stackingLipContours(width, depth, height, onDeck);
  if (closed) rings.push({z:rings[rings.length-1].z, points:rings[0].points});
  const vertices:number[] = [];
  const faces = closed ? rings.length : rings.length - 1;
  for (let i = 0; i < faces; i++) {
    const a = rings[i], b = rings[(i+1) % rings.length];
    for (let j = 0; j < a.points.length; j++) {
      const k = (j+1) % a.points.length;
      vertices.push(...a.points[j],a.z, ...a.points[k],a.z, ...b.points[k],b.z,
                    ...a.points[j],a.z, ...b.points[k],b.z, ...b.points[j],b.z);
    }
  }
  return vertices;
}
