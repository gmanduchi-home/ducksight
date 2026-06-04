/**
 * Ottimizzazione foto progetti in-place.
 * Resize a max 1600px lato lungo (no upscaling), encode WebP quality 82.
 * Originali alta-res restano in C:\Users\a-MeL\Downloads\ducksight\.
 *
 * Strategia "read-process-write" senza rename per evitare EPERM su Windows
 * (file lock di OneDrive / Explorer / antivirus).
 *
 * Uso:  node tools/optimize-images.mjs
 */
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const TARGETS = [
  "public/projects/alchemist-ale",
  "public/projects/maternity",
  "public/projects/outdoor",
  "public/projects/self-portrait",
  "public/about",
];

const MAX_DIM = 1600;
const QUALITY = 82;

let totalBefore = 0;
let totalAfter = 0;
let totalCount = 0;
let totalSkipped = 0;
let totalFailed = 0;

for (const dir of TARGETS) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    console.warn(`  skip ${dir} (not found)`);
    continue;
  }
  const files = entries
    .filter((e) => e.isFile() && /\.(webp|jpe?g|png)$/i.test(e.name))
    .map((e) => join(dir, e.name));
  if (files.length === 0) continue;

  console.log(`\n[${dir}]`);
  let dirBefore = 0;
  let dirAfter = 0;

  for (const file of files) {
    const before = (await stat(file)).size;
    dirBefore += before;
    totalBefore += before;

    try {
      // Read into buffer first (rilascia lock prima della scrittura)
      const input = await readFile(file);

      const ext = extname(file).toLowerCase();
      const pipeline = sharp(input, { failOn: "none" })
        .rotate()
        .resize({
          width: MAX_DIM,
          height: MAX_DIM,
          fit: "inside",
          withoutEnlargement: true,
        });

      let output;
      if (ext === ".webp" || ext === ".png") {
        output = await pipeline
          .webp({ quality: QUALITY, effort: 4 })
          .toBuffer();
      } else {
        output = await pipeline
          .jpeg({ quality: QUALITY, mozjpeg: true })
          .toBuffer();
      }

      if (output.length < before) {
        await writeFile(file, output);
        dirAfter += output.length;
        totalAfter += output.length;
      } else {
        dirAfter += before;
        totalAfter += before;
        totalSkipped++;
      }
      totalCount++;
    } catch (err) {
      console.error(`  ! failed ${file}: ${err.message}`);
      dirAfter += before;
      totalAfter += before;
      totalFailed++;
    }
  }

  const dirSaved = ((1 - dirAfter / dirBefore) * 100).toFixed(0);
  console.log(
    `  ${files.length} file: ${(dirBefore / 1024).toFixed(0)}KB → ${(dirAfter / 1024).toFixed(0)}KB  (-${dirSaved}%)`,
  );
}

console.log(
  `\n=========================================` +
    `\nTOTALE: ${totalCount} file processati` +
    (totalSkipped ? `, ${totalSkipped} skip (già piccoli)` : "") +
    (totalFailed ? `, ${totalFailed} errori` : "") +
    `\n  prima:  ${(totalBefore / 1024 / 1024).toFixed(2)} MB` +
    `\n  dopo:   ${(totalAfter / 1024 / 1024).toFixed(2)} MB` +
    `\n  saving: ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)}%  (${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB)`,
);
