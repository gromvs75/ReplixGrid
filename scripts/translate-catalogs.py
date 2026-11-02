"""Development-only seed translations. No service is used by the application.
Only generic interface source messages are submitted. Review terminology before release.
Existing entries are retained to preserve human corrections; failed batches never overwrite.
"""
import subprocess
import json, pathlib, urllib.request, urllib.parse, time, re, concurrent.futures
root=pathlib.Path(__file__).resolve().parents[1]/'src'/'locales'
sources=json.loads((root/'ru.json').read_text())
langs=['en','de','fr','es','el','it','uk','cs','pl','zh-CN']
def request(q,lang):
 url='https://translate.googleapis.com/translate_a/single?'+urllib.parse.urlencode(dict(client='gtx',sl='ru',tl=lang,dt='t',q=q))
 for attempt in range(5):
  try:
   response=subprocess.run(['curl','-fsS','--max-time','40',url],capture_output=True,text=True,check=True)
   data=json.loads(response.stdout)
   return ''.join(row[0] or '' for row in data[0])
  except Exception:
   if attempt==4:raise
   time.sleep(3*(attempt+1))
def placeholders(s):return sorted(re.findall(r'\{\d+\}',s))
def translate(lang):
 file=root/(lang+'.json');data=json.loads(file.read_text()) if file.exists() else {}
 missing=[s for s in sources if s not in data];batches=[];batch=[];size=0
 for s in missing:
  if size+len(s)>1200 and batch:batches.append(batch);batch=[];size=0
  batch.append(s);size+=len(s)+12
 if batch:batches.append(batch)
 for number,batch in enumerate(batches):
  q='\n'.join('[[%04d]] %s'%(i,s) for i,s in enumerate(batch))
  raw=request(q,lang);parts=re.split(r'\[{1,2}\s*(\d{3,4})\s*\]{1,2}',raw);found={int(parts[i]):parts[i+1].strip() for i in range(1,len(parts)-1,2)}
  for i,s in enumerate(batch):
   value=found.get(i,'')
   if not value or re.search(r'\[\s*\[?\s*\d{3,4}',value) or placeholders(value)!=placeholders(s):value=request(s,lang).strip()
   # Translators sometimes insert spaces inside numeric placeholders.
   value=re.sub(r'\{\s*(\d+)\s*\}',r'{\1}',value)
   if placeholders(value)!=placeholders(s):raise RuntimeError('Placeholder mismatch '+lang+' '+s)
   data[s]=value
  file.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
  print(lang,number+1,'/',len(batches),flush=True);time.sleep(.3)
 return lang,len(data)
with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
 for result in pool.map(translate,langs):print('DONE',result,flush=True)
(root/'catalogs.json').write_text(json.dumps({l:json.loads((root/(l+'.json')).read_text()) for l in langs},ensure_ascii=False,separators=(',',':'))+'\n')
