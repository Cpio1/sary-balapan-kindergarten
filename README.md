# «Сары балапан» — лендинг детского сада

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · lucide-react · шрифты Nunito + Rubik (cyrillic-ext: Ә Ғ Қ Ң Ө Ұ Ү Һ І).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Деплой на Vercel: импортируйте репозиторий — настройки по умолчанию подходят.
Необязательно: переменная `NEXT_PUBLIC_SITE_URL` (адрес сайта для SEO-метаданных).

## Где что менять

| Что | Файл |
|---|---|
| Тексты на казахском / русском | `src/lib/i18n/kk.ts`, `src/lib/i18n/ru.ts` |
| Телефон, адрес, WhatsApp, Instagram, 2GIS | `src/lib/site.ts` |
| Официальные документы (ссылки Google Drive, Cloud Mail, PDF) | `src/lib/documents.ts` |
| Цвета, шрифты, анимации | `src/app/globals.css` |

## Фотографии

- **Галерея:** положите фото (`.jpg`, `.png`, `.webp`, `.avif`) в `public/gallery/`. Список собирается автоматически
  скриптом `scripts/media-manifest.mjs` перед `npm run dev` и `npm run build`. Порядок — по имени файла (`01.jpg`, `02.jpg`…).
  Сетка, просмотр во весь экран, стрелки, свайп и закрытие по Esc включаются сами.
- **Главный экран:** положите одно фото в `public/hero/` — оно заменит иллюстрацию.

После добавления фото перезапустите `npm run dev` (или сделайте новый деплой).

## Карта 2GIS

Кнопка ведёт на поиск адреса «Телжан Шонанулы 54А» в 2GIS (город не указан, т.к. не подтверждён).
Чтобы встроить интерактивную карту, укажите ссылку для iframe в `site.twoGisEmbedUrl` (`src/lib/site.ts`).

## Особенности

- Основной язык — казахский, переключатель KZ / RU (выбор запоминается в браузере).
- Тёмная тема отключена полностью (`color-scheme: only light`, вариант `dark:` не используется).
- Якорные ссылки учитывают высоту шапки (`scroll-margin-top`).
