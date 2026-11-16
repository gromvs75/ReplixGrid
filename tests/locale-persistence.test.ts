import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {restoreLocale,setLocale,getLocale} from '../src/i18n.js';
test('manual language replaces stale URL hint and survives a reload',()=>{
 const dom=new JSDOM('',{url:'https://example.test/?lang=de&project=abc#editor'});
 const oldWindow=Object.getOwnPropertyDescriptor(globalThis,'window'),oldDocument=Object.getOwnPropertyDescriptor(globalThis,'document'),oldStorage=Object.getOwnPropertyDescriptor(globalThis,'localStorage');
 Object.defineProperties(globalThis,{window:{value:dom.window,configurable:true},document:{value:dom.window.document,configurable:true},localStorage:{value:dom.window.localStorage,configurable:true}});
 try{
  restoreLocale();assert.equal(getLocale(),'de');
  for(const language of ['ru','fr','en','uk']){
   setLocale(language);assert.equal(dom.window.localStorage.getItem('replixgrid.locale'),language);assert.equal(dom.window.document.documentElement.lang,language);
   assert.equal(new URL(dom.window.location.href).searchParams.get('lang'),language);
   restoreLocale();assert.equal(getLocale(),language);
  }
  assert.equal(new URL(dom.window.location.href).searchParams.get('project'),'abc');assert.equal(dom.window.location.hash,'#editor');
  setLocale('invalid');assert.equal(getLocale(),'uk');
 }finally{for(const [key,d] of [['window',oldWindow],['document',oldDocument],['localStorage',oldStorage]] as const){if(d)Object.defineProperty(globalThis,key,d);else Reflect.deleteProperty(globalThis,key);}dom.window.close();}
});
