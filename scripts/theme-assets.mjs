import fs from 'node:fs/promises';
import sharp from 'sharp';
const catalog=JSON.parse(await fs.readFile('docs/theme-assets.json','utf8'));
await fs.mkdir('.local/references',{recursive:true});
const names=['knight','paladin','archbishop','wizard'];
const manifest=[];
for(const name of names){
 const url=catalog.find(asset=>asset.name===name)?.url;
 if(!url)throw Error(`Arte oficial não encontrada: ${name}`);
 const response=await fetch(url);if(!response.ok)throw Error(url);
 const buffer=Buffer.from(await response.arrayBuffer());
 await fs.writeFile(`.local/references/${name}.png`,buffer);
 const image=sharp(buffer);const metadata=await image.metadata();
 await image.trim().resize({width:700,withoutEnlargement:true}).webp({quality:86}).toFile(`assets/images/${name}.webp`);
 manifest.push({name,url,originalWidth:metadata.width,originalHeight:metadata.height});
}
const css=await(await fetch('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&display=swap',{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'}})).text();
let localCSS=css,index=0;
for(const url of new Set([...css.matchAll(/url\(([^)]+)\)/g)].map(m=>m[1]))){const filename=`barlow-${index++}.woff2`;const r=await fetch(url);await fs.writeFile(`assets/fonts/${filename}`,Buffer.from(await r.arrayBuffer()));localCSS=localCSS.replaceAll(url,`./${filename}`);}
await fs.writeFile('assets/fonts/display.css',localCSS);
const license=await fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/OFL.txt');if(!license.ok)throw Error('Licença da fonte indisponível');
await fs.writeFile('assets/fonts/barlow-condensed-OFL.txt',await license.text());
await fs.writeFile('docs/theme-assets.json',JSON.stringify(manifest,null,2)+'\n');
console.log('Artes oficiais e fonte de destaque preparadas.');
