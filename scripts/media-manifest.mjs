// Сканирует public/gallery и public/hero и записывает список изображений
// в src/generated/media.json. Запускается автоматически перед `npm run dev`
// и `npm run build` (скрипты predev / prebuild), поэтому достаточно просто
// положить фотографии в папку и пересобрать проект.
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

async function list(dir) {
  try {
    const files = await readdir(path.join(root, "public", dir));
    return files
      .filter((f) => IMAGE.test(f) && !f.startsWith("."))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
      .map((f) => `/${dir}/${f}`);
  } catch {
    return [];
  }
}

const gallery = await list("gallery");
const hero = (await list("hero"))[0] ?? null;

await mkdir(path.join(root, "src", "generated"), { recursive: true });
await writeFile(
  path.join(root, "src", "generated", "media.json"),
  JSON.stringify({ hero, gallery }, null, 2) + "\n",
);

console.log(`[media] hero: ${hero ?? "—"}, gallery: ${gallery.length} фото`);
