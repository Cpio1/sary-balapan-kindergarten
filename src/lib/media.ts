import manifest from "@/generated/media.json";
import type { Lang } from "@/lib/i18n";

export type Photo = { name: string; src: string; width: number; height: number };

export const heroPhoto = manifest.hero as Photo | null;
export const galleryPhotos = manifest.gallery as Photo[];

/**
 * Подписи к фотографиям (по имени файла). Для новых фото без подписи
 * используется общий текст «… фото N».
 */
const captions: Record<string, Record<Lang, string>> = {
  "main-page.jpeg": { kk: "«Сары балапан» балабақшасының ғимараты", ru: "Здание детского сада «Сары балапан»" },
  "image1.jpeg": { kk: "Топ бөлмесі", ru: "Групповая комната" },
  "image2.jpeg": { kk: "Ертегі әлемі бейнеленген топ бөлмесі", ru: "Групповая комната со сказочной стеной" },
  "image3.jpeg": { kk: "Ұйықтайтын бөлме", ru: "Спальня" },
  "image4.jpeg": { kk: "Жарық ұйықтайтын бөлме", ru: "Светлая спальня" },
  "image5.jpeg": { kk: "Ұлттық нақыштағы топ бөлмесі", ru: "Группа с национальным декором" },
  "image6.jpeg": { kk: "Киім шешетін бөлме", ru: "Раздевалка" },
};

export function photoCaption(photo: Photo, lang: Lang): string | null {
  return captions[photo.name]?.[lang] ?? null;
}
