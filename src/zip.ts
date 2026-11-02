/** Small, uncompressed ZIP writer. No service, dependency or multiple-download permission. */
export function zipFiles(files:{name:string;data:ArrayBuffer|Uint8Array|string}[]):ArrayBuffer{
  const encoder=new TextEncoder();const chunks:Uint8Array[]=[],central:Uint8Array[]=[];let offset=0;
  const crc=(bytes:Uint8Array)=>{let n=0xffffffff;for(const byte of bytes){n^=byte;for(let i=0;i<8;i++)n=(n>>>1)^((n&1)?0xedb88320:0);}return(n^0xffffffff)>>>0;};
  for(const file of files){const name=encoder.encode(file.name),data=typeof file.data==='string'?encoder.encode(file.data):new Uint8Array(file.data),sum=crc(data);
    const local=new Uint8Array(30+name.length),v=new DataView(local.buffer);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint32(14,sum,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,name.length,true);local.set(name,30);chunks.push(local,data);
    const record=new Uint8Array(46+name.length),c=new DataView(record.buffer);c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x800,true);c.setUint32(16,sum,true);c.setUint32(20,data.length,true);c.setUint32(24,data.length,true);c.setUint16(28,name.length,true);c.setUint32(42,offset,true);record.set(name,46);central.push(record);offset+=local.length+data.length;
  }
  const size=central.reduce((sum,c)=>sum+c.length,0),end=new Uint8Array(22),e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,size,true);e.setUint32(16,offset,true);
  const output=new Uint8Array(offset+size+22);let pos=0;for(const c of [...chunks,...central,end]){output.set(c,pos);pos+=c.length;}return output.buffer;
}
