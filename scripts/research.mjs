import fs from 'node:fs/promises';
await fs.mkdir('.local/references', {recursive:true});
const urls=JSON.parse(await fs.readFile('research-images.json','utf8'));
await Promise.all([1,3,5,6,7].map(async i=>{const r=await fetch(urls[i]);if(r.ok) await fs.writeFile(`.local/references/guide-${i}.png`,Buffer.from(await r.arrayBuffer()));}));
const assets={landscape:'https://ro-cdn-sea-cf.roglobal.com/ro-official-sea/prd/resource/2023-03/VVHxrFIDnB_2.jpg',village:'https://ro-cdn-sea-cf.roglobal.com/ro-official-sea/prd/resource/2023-03/dPqeuVjTCn_6.jpg'};
await Promise.all(Object.entries(assets).map(async([name,url])=>{const r=await fetch(url);if(!r.ok)throw Error(url);await fs.writeFile(`.local/references/${name}.jpg`,Buffer.from(await r.arrayBuffer()));}));
console.log('Referências oficiais baixadas.');
