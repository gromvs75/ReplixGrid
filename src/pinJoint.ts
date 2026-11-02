/** Dimensions of the physically tested glued wall joint, in millimetres. */
export const PIN_JOINT = Object.freeze({
  wallThickness: 5,
  pinDiameter: 3.2,
  pinLength: 8,
  holeDiameter: 3.3,
  holeDepth: 4.5,
  holeRoofHeight: 2.2,
  minimumSpacing: 7,
  minimumTopMaterial: 0.8,
  minimumBottomMaterial: 0.8,
});

/** Centers of printable horizontal holes, measured from the outside of the floor.
 * The placement respects the solid floor and the local height of the seam. */
export function pinJointHeights(floorThickness:number, wallHeight:number):number[] {
  const low=Math.max(6,floorThickness+PIN_JOINT.holeDiameter/2+PIN_JOINT.minimumBottomMaterial);
  const high=wallHeight-PIN_JOINT.holeRoofHeight-PIN_JOINT.minimumTopMaterial;
  if(high<low) return [];
  const count=Math.floor((high-low)/PIN_JOINT.minimumSpacing)+1;
  return Array.from({length:count},(_,i)=>low+i*PIN_JOINT.minimumSpacing);
}

/** Displayed both in print preparation and before exporting the joint. */
export const PIN_FIT_WARNING='Внимание: штифт Ø 3,2 мм, отверстие Ø 3,3 мм — зазор 0,05 мм на сторону. Два отверстия по 4,5 мм при длине штифта 8 мм дают 1 мм общего запаса по длине. Фактическая посадка зависит от принтера, материала и коррекций XY и Z. Перед склейкой проверьте посадку на образце.';
