import {t} from '../i18n.js';

/** Translate worker diagnostics without translating the user's tray/part names. */
export function drawerMessage(message:string):string{
 const direct=(text:string)=>{
  const value=t(text);
  if(value!==text)return value;
  for(const prefix of ['Не помещается на стол:','Не удалось разместить деталь:','Некорректные габариты детали:']){
   if(text.startsWith(prefix+' '))return t(prefix)+text.slice(prefix.length);
  }
  return text;
 };
 const translated=direct(message);
 if(translated!==message)return translated;
 // A worker can attach a tray name to a diagnostic, including several fit issues.
 for(let at=message.indexOf(': ');at>=0;at=message.indexOf(': ',at+2)){
  const suffix=message.slice(at+2),parts=suffix.split('; '),values=parts.map(direct);
  if(values.every((value,i)=>value!==parts[i]))return message.slice(0,at+2)+values.join('; ');
 }
 return message;
}
