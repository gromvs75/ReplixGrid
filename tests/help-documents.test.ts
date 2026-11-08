import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {languages} from '../src/i18n.js';
import {helpDocumentUrl} from '../src/helpDocs.js';
const root=resolve(import.meta.dirname,'..');
for(const [locale] of languages)for(const doc of ['USER-GUIDE','REFERENCE'] as const)test(`${locale} ${doc} opens a complete local-language document with valid internal links`,()=>{
 const url=helpDocumentUrl(doc,locale);
 const relative=url.split('/blob/main/')[1];
 assert.ok(relative);assert.ok(url.startsWith('https://github.com/gromvs75/ReplixGrid/blob/main/docs/'));
 const path=resolve(root,relative),text=readFileSync(path,'utf8');
 const source=readFileSync(resolve(root,`docs/${doc}.md`),'utf8');
 assert.equal((text.match(/^#{1,6} /gm)??[]).length,(source.match(/^#{1,6} /gm)??[]).length,'All original sections must remain');
 if(locale!=='en'){
  assert.ok(relative.includes(`/locales/${locale}/`));
  assert.notEqual(text.split('\n').find(l=>l.startsWith('# ')),source.split('\n').find(l=>l.startsWith('# ')));
  assert.ok(text.includes(`https://grid.replixcast.com/?lang=${locale}`));
 }
 for(const [,target] of text.matchAll(/\]\(([^)]+)\)/g)){
  if(/^(https?:|mailto:)/.test(target))continue;
  const [file,hash]=target.split('#');const destination=file?resolve(dirname(path),file):path;
  assert.ok(existsSync(destination),`${locale}: broken link ${target}`);
  if(hash&&destination.endsWith('.md')){
   const linked=readFileSync(destination,'utf8');
   const headings=[...linked.matchAll(/^#+ (.+)$/gm)].map(m=>m[1].toLowerCase().replace(/[^\w\- ]/g,'').replace(/ /g,'-'));
   assert.ok(linked.includes(`id="${hash}"`)||headings.includes(hash),`${locale}: missing anchor ${target}`);
  }
 }
});
