import fs from 'node:fs/promises';
import sharp from 'sharp';
await fs.mkdir('assets/images',{recursive:true});await fs.mkdir('assets/fonts',{recursive:true});
const ref='.local/references/';
await sharp(ref+'landscape.jpg').resize({width:1800}).webp({quality:80}).toFile('assets/images/prontera.webp');
await sharp(ref+'landscape.jpg').resize({width:780}).webp({quality:75}).toFile('assets/images/prontera-mobile.webp');
await sharp(ref+'village.jpg').resize({width:900}).webp({quality:77}).toFile('assets/images/midgard.webp');
await sharp(ref+'guide-1.png').resize({width:650}).webp({quality:85}).toFile('assets/images/valkyrie-statue.webp');
await sharp(ref+'official-1.png').extract({left:810,top:30,width:230,height:280}).resize({width:230}).webp({quality:85}).toFile('assets/images/atk-gold.webp');
// Recortes fiéis dos ícones na captura oficial: nenhuma ilustração inventada.
const icons=[['atk-blue',278,411],['atk-purple',174,305],['def-blue',176,411],['def-purple',280,201],['mix-blue',73,411],['mix-purple',177,201],['def-gold',280,201],['mix-gold',177,201]];
for(const [name,left,top]of icons)await sharp(ref+'inventory.png').extract({left,top,width:47,height:47}).resize({width:94}).webp({quality:90}).toFile(`assets/images/${name}.webp`);
// Ícones DEF/MIX dourados usam o recorte da categoria, com a raridade indicada na moldura.
const css=await(await fetch('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Nunito+Sans:wght@400;600;700;800&display=swap',{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'}})).text();
let out=css;let i=0;
for(const url of new Set([...css.matchAll(/url\(([^)]+)\)/g)].map(x=>x[1]))){const filename=`font-${i++}.woff2`;const r=await fetch(url);await fs.writeFile(`assets/fonts/${filename}`,Buffer.from(await r.arrayBuffer()));out=out.replaceAll(url,`./${filename}`);}
await fs.writeFile('assets/fonts/fonts.css',out);
console.log('Images WebP et polices locales prêtes.');
