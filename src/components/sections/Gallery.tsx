"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, ChevronDown, ChevronUp, ImageIcon, ZoomIn } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { photoCaption, type Photo } from "@/lib/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Star, Squiggle, Chick, Flower, Sun, Cloud, Sparkle } from "@/components/decor/Decor";
import { Lightbox } from "./Lightbox";

/**
 * Сколько фото показывать сразу на каждой ширине (2 ряда сетки):
 * телефон — 2 колонки × 2 ряда, планшет — 3 × 2, компьютер — 4 × 2.
 * Остальные открываются кнопкой «Показать ещё» такими же порциями.
 */
const BATCH = { base: 4, md: 6, lg: 8 } as const;
type Bp = keyof typeof BATCH;
const bps: Bp[] = ["base", "md", "lg"];

/**
 * Классы видимости для каждой ширины экрана. Строки записаны целиком,
 * чтобы Tailwind нашёл их при сборке.
 */
const displayClasses = {
  block: { base: ["hidden", "block"], md: ["md:hidden", "md:block"], lg: ["lg:hidden", "lg:block"] },
  inline: { base: ["hidden", "inline"], md: ["md:hidden", "md:inline"], lg: ["lg:hidden", "lg:inline"] },
  "inline-flex": {
    base: ["hidden", "inline-flex"],
    md: ["md:hidden", "md:inline-flex"],
    lg: ["lg:hidden", "lg:inline-flex"],
  },
} as const;

function visibility(show: Record<Bp, boolean>, display: keyof typeof displayClasses = "block") {
  const c = displayClasses[display];
  return bps.map((bp) => c[bp][show[bp] ? 1 : 0]).join(" ");
}

export function Gallery({ photos }: { photos: Photo[] }) {
  const { t, lang } = useLang();
  const g = t.gallery;
  const [current, setCurrent] = useState<number | null>(null);
  const [pages, setPages] = useState(1);
  const total = photos.length;
  const label = (i: number) => photoCaption(photos[i], lang) ?? `${g.photoAlt} ${i + 1}`;

  const limit = (bp: Bp) => Math.min(total, BATCH[bp] * pages);
  const hasMore = (bp: Bp) => limit(bp) < total;
  const canCollapse = (bp: Bp) => pages > 1 && !hasMore(bp);

  const collapse = () => {
    setPages(1);
    document.getElementById("gallery-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="gallery" data-anchor aria-labelledby="gallery-title" className="relative overflow-hidden bg-white py-14 sm:py-20 lg:py-24">
      <Star className="pointer-events-none absolute top-10 right-[8%] w-5 animate-sway sm:w-6" color="#26B3A6" />
      <Squiggle className="pointer-events-none absolute top-20 left-[3%] hidden w-16 md:block" color="#FFD54A" />
      <Sparkle className="pointer-events-none absolute bottom-10 left-[6%] hidden w-5 md:block" color="#FFB48F" />

      <div className="wrap">
        <SectionHeading
          id="gallery-title"
          kicker={g.kicker}
          title={g.title}
          lead={g.lead}
          tone="teal"
          icon={<Camera className="size-4" aria-hidden />}
        />

        {total > 0 ? (
          <div className="mx-auto mt-8 max-w-6xl sm:mt-10 lg:mt-12">
            {/* flex-wrap вместо grid: неполный последний ряд выравнивается по центру */}
            <ul className="flex flex-wrap justify-center gap-2.5 sm:gap-3 md:gap-4 lg:gap-5">
              {photos.map((photo, i) => (
                <li
                  key={photo.src}
                  className={`min-w-0 w-[calc((100%-0.625rem)/2)] sm:w-[calc((100%-0.75rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3.75rem)/4)] ${visibility({ base: i < limit("base"), md: i < limit("md"), lg: i < limit("lg") })}`}
                >
                  <PhotoCard photo={photo} title={label(i)} openLabel={g.open} onOpen={() => setCurrent(i)} />
                </li>
              ))}
            </ul>

            {/* Счётчик и кнопки «Показать ещё / Свернуть» — отдельно для каждой ширины */}
            <div className="mt-5 flex flex-col items-center gap-3 sm:mt-7 md:flex-row md:justify-between">
              <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5 text-center text-[13px] font-semibold text-ink-soft sm:text-sm">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <ZoomIn className="size-4 text-teal-deep" aria-hidden />
                  {g.tapHint}
                </span>
                {bps.map((bp) => (
                  <span key={bp} className={`whitespace-nowrap tabular-nums ${visibility({ base: bp === "base", md: bp === "md", lg: bp === "lg" }, "inline")}`}>
                    · {g.shown} {limit(bp)}/{total}
                  </span>
                ))}
              </p>

              {bps.map((bp) => {
                const only = { base: bp === "base", md: bp === "md", lg: bp === "lg" };
                if (hasMore(bp)) {
                  return (
                    <button
                      key={bp}
                      type="button"
                      onClick={() => setPages((p) => p + 1)}
                      className={`${visibility(only, "inline-flex")} min-h-12 w-full items-center justify-center gap-2 rounded-full bg-sun px-6 text-[15.5px] font-extrabold text-ink shadow-[inset_0_-3px_0_rgb(242_183_5)] transition hover:brightness-105 min-[420px]:w-auto`}
                    >
                      {g.showMore} ({total - limit(bp)})
                      <ChevronDown className="size-4" aria-hidden />
                    </button>
                  );
                }
                if (canCollapse(bp)) {
                  return (
                    <button
                      key={bp}
                      type="button"
                      onClick={collapse}
                      className={`${visibility(only, "inline-flex")} min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-[15.5px] font-bold text-ink ring-1 ring-line transition hover:bg-sun-soft min-[420px]:w-auto`}
                    >
                      {g.showLess}
                      <ChevronUp className="size-4" aria-hidden />
                    </button>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ) : (
          <EmptyGallery />
        )}
      </div>

      {current !== null && total > 0 && (
        <Lightbox
          photos={photos}
          index={current}
          label={label}
          labels={{ close: g.close, prev: g.prev, next: g.next, dialog: g.dialog }}
          onClose={() => setCurrent(null)}
          onIndex={setCurrent}
        />
      )}
    </section>
  );
}

/**
 * Компактная карточка одинакового размера (4:3). Фото вписывается целиком
 * (object-contain) — без обрезки; свободные поля заполняет размытая копия снимка.
 */
function PhotoCard({ photo, title, openLabel, onOpen }: { photo: Photo; title: string; openLabel: string; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${openLabel}: ${title}`}
      className="group block w-full overflow-hidden rounded-2xl bg-white text-left shadow-card ring-1 ring-line transition-transform duration-300 hover:-translate-y-1 sm:rounded-[20px]"
    >
      <span className="relative block aspect-[4/3] w-full overflow-hidden bg-cream-deep">
        <Image src={photo.src} alt="" aria-hidden fill quality={70} sizes="96px" className="scale-110 object-cover opacity-70 blur-lg" />
        <Image
          src={photo.src}
          alt={title}
          fill
          quality={70}
          sizes="(min-width: 1280px) 280px, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, 47vw"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition group-hover:bg-sun sm:size-8">
          <ZoomIn className="size-3.5 sm:size-4" aria-hidden />
        </span>
      </span>
      <span className="block px-2.5 py-2 text-[12.5px] leading-tight font-bold text-ink sm:px-3.5 sm:py-2.5 sm:text-[14px]">
        <span className="line-clamp-2 min-h-[2.5em] md:line-clamp-1 md:min-h-0">{title}</span>
      </span>
    </button>
  );
}

/* ---------- Пустое состояние ---------- */
const placeholders = [
  { bg: "bg-sun-soft", Decor: Sun, span: "col-span-2 row-span-2 md:col-span-2" },
  { bg: "bg-teal-soft", Decor: Cloud, span: "" },
  { bg: "bg-peach-soft", Decor: Flower, span: "" },
  { bg: "bg-teal-soft", Decor: Star, span: "" },
  { bg: "bg-sun-soft", Decor: Chick, span: "" },
];

function EmptyGallery() {
  const { t } = useLang();
  const g = t.gallery;
  return (
    <div className="mt-9 grid items-center gap-6 sm:mt-12 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
      <ul aria-hidden className="reveal grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
        {placeholders.map(({ bg, Decor, span }, i) => (
          <li
            key={i}
            className={`relative grid aspect-square place-items-center overflow-hidden rounded-[22px] border-2 border-dashed border-line ${bg} ${span}`}
          >
            <Decor className={i === 0 ? "w-20 opacity-90 sm:w-24" : "w-10 opacity-80 sm:w-12"} />
            <ImageIcon className="absolute right-3 bottom-3 size-4 text-ink/25" />
          </li>
        ))}
      </ul>
      <div className="reveal rounded-[28px] bg-cream p-6 text-center ring-1 ring-line sm:p-8 lg:text-left">
        <Camera className="mx-auto size-9 text-teal-deep lg:mx-0" aria-hidden />
        <h3 className="mt-3 text-xl font-bold text-ink sm:text-2xl">{g.emptyTitle}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft sm:text-base">{g.emptyText}</p>
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-[linear-gradient(90deg,#FF8A3D,#E1306C)] px-6 font-extrabold text-white transition hover:-translate-y-0.5"
        >
          <InstagramIcon className="size-5" />
          {g.emptyCta}
        </a>
      </div>
    </div>
  );
}
