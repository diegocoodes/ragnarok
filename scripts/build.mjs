import fs from 'node:fs/promises';
await fs.mkdir('dist',{recursive:true});
await fs.copyFile('index.html','dist/index.html');
await fs.cp('src','dist/src',{recursive:true});
await fs.cp('assets','dist/assets',{recursive:true});
console.log('Site estático pronto em dist/.');
