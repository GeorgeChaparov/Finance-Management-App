import { readdir, writeFile } from 'fs/promises';
import { join } from 'path';

async function generate() {
  const categoryIconsPath = join(process.cwd(), 'public/category_icons');
  const fileNames = await readdir(categoryIconsPath);
  const outputPath = join(process.cwd(), 'public/file-list.json');

  await writeFile(outputPath, JSON.stringify(fileNames, null, 2));
  console.log(`Saved ${fileNames.length} image names to file-list.json`);
}

generate().catch(console.error);