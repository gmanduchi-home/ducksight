/**
 * Ottimizza le cover dei video: legge C:\Users\a-MeL\Downloads\ducksight-covers,
 * scrive public/covers/<name>.webp (max 1600px lato lungo, WebP quality 82).
 */
import { readdir, stat, mkdir, readFile, writeFile } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const SRC = "C:\\Users\\a-MeL\\Downloads\\ducksight-covers";
const DST = "public/covers";
const MAX_DIM = 1600;
const QUALITY = 82;

await mkdir(DST, { recursive: true });

const entries = (await readdir(SRC, { withFileTypes: true }))
  .filter((e) => e.isFile() && /\.(webp|jpe?g|png)$/i.test(e.name));

let totalBefore = 0, totalAfter = 0;

for (const e of entries) {
  const src = join(SRC, e.name);
  const outName = basename(e.name, extname(e.name)) + ".webp";
  const dst = join(DST, outName);

  const before = (await stat(src)).size;
  const input = await readFile(src);
  const output = await sharp(input, { failOn: "none" })
    .rotate()
    .resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 4 })
    .toBuffer();

  await writeFile(dst, output);
  totalBefore += before;
  totalAfter += output.length;
  console.log(`  ${e.name} → ${outName}  ${(before/1024).toFixed(0)}KB → ${(output.length/1024).toFixed(0)}KB`);
}

const saved = (1 - totalAfter/totalBefore) * 100;
console.log(`\nTOTALE: ${(totalBefore/1024/1024).toFixed(2)}MB → ${(totalAfter/1024/1024).toFixed(2)}MB  (-${saved.toFixed(0)}%)`);
