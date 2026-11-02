import {test} from 'node:test';
import assert from 'node:assert/strict';
import {PIN_JOINT,pinJointHeights} from '../src/pinJoint.js';

test('tested pin and socket dimensions preserve radial and axial assembly clearance',()=>{
  assert.equal(PIN_JOINT.wallThickness,5);
  assert.equal(PIN_JOINT.pinDiameter,3.2);
  assert.equal(PIN_JOINT.pinLength,8);
  assert.equal(PIN_JOINT.holeDiameter,3.3);
  assert.equal(PIN_JOINT.holeDepth,4.5);
  assert.ok(PIN_JOINT.holeDiameter>PIN_JOINT.pinDiameter);
  assert.ok(PIN_JOINT.holeDepth*2>PIN_JOINT.pinLength);
});

test('pin count increases with usable height and stays away from floor and upper edge',()=>{
  assert.deepEqual(pinJointHeights(3,18),[6,13]);
  assert.deepEqual(pinJointHeights(3,11),[6]);
  assert.deepEqual(pinJointHeights(3,8),[]);
  for(const z of pinJointHeights(3,50)){
    assert.ok(z-PIN_JOINT.holeDiameter/2>=3+PIN_JOINT.minimumBottomMaterial);
    assert.ok(z+PIN_JOINT.holeRoofHeight+PIN_JOINT.minimumTopMaterial<=50);
  }
});

test('preflight warns about tolerances for exported pins but not shell-only exports',async()=>{
  const {defaultProject}=await import('../src/model.js');
  const {buildJointPins}=await import('../src/assemblyKernel.js');
  const {inspectPrintParts}=await import('../src/preflight.js');
  const p=defaultProject();p.width=100;p.depth=32;p.height=18;p.wallThickness=5;p.floorThickness=3;
  p.printing={parts:2,bedWidth:270,bedDepth:270,bedHeight:270};
  const pins=await buildJointPins(p);
  const warning=inspectPrintParts(p,pins).warnings.join(' ');
  assert.match(warning,/0,05 мм на сторону/);
  assert.match(warning,/1 мм общего запаса/);
  assert.match(warning,/XY и Z/);
  assert.doesNotMatch(inspectPrintParts(p,[]).warnings.join(' '),/штифт/);
});
