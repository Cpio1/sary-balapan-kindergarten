/**
 * Официальные документы детского сада.
 *
 * Чтобы добавить документ, допишите объект в массив `documents`:
 *
 *   {
 *     title: { kk: "Жарғы", ru: "Устав" },
 *     url: "https://drive.google.com/file/d/.../view",
 *     source: "google-drive",
 *   },
 *
 * source: "google-drive" | "cloud-mail" | "pdf" | "link".
 * Для PDF-файла положите его в public/documents/ и укажите url "/documents/file.pdf".
 */
export type DocumentSource = "google-drive" | "cloud-mail" | "pdf" | "link";

export type DocumentLink = {
  title: { kk: string; ru: string };
  url: string;
  source: DocumentSource;
};

export const documents: DocumentLink[] = [];
