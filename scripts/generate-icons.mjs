import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const source = path.resolve('src/assets/placeholder.png');
const outDir = path.resolve('public');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

await sharp(source).resize(192, 192).png().toFile(path.join(outDir, 'logo192.png'));
await sharp(source).resize(512, 512).png().toFile(path.join(outDir, 'logo512.png'));

console.log('Icons generated: public/logo192.png, public/logo512.png');
