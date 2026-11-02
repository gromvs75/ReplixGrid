import {mkdir,writeFile} from 'node:fs/promises';
import {buildOrganizer} from '../src/kernel.js';
import {defaultProject} from '../src/model.js';
await mkdir('artifacts',{recursive:true});
const empty=defaultProject(),sloped=defaultProject();
sloped.heights={front:18,back:60};sloped.transitions=['left','right'];
sloped.root.split={axis:'x',ratio:.45,height:35,first:{id:'leftCell'},second:{id:'rightCell',split:{axis:'y',ratio:.5,height:22,first:{id:'frontCell'},second:{id:'backCell'}}}};
for(const [name,p] of Object.entries({empty,sloped})) {
  const {stl,inspection}=await buildOrganizer(p);
  await writeFile(`artifacts/${name}.stl`,new Uint8Array(stl));
  await writeFile(`artifacts/${name}.formanest.json`,JSON.stringify(p,null,2));
  await writeFile(`artifacts/${name}.inspection.json`,JSON.stringify(inspection,null,2));
  console.log(name,inspection);
}
