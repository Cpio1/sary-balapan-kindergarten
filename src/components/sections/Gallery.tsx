"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Hand, ImageIcon, ZoomIn } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { photoCaption, type Photo } from "@/lib/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Star, Squiggle, Chick, Flower, Sun, Cloud, Sparkle } from "@/components/decor/Decor";
import { Lightbox } from "./Lightbox";

const ratio = (p: Photo) => p.width / p.height;

/**
 * Делит фото на ряды одинаковой высоты: ширина каждого фото пропорциональна
 * его соотношению сторон, поэтому снимки показываются целиком, без обрезки.
 */
function justifiedRows(photos: Photo[], perRow: number) {
  const rows: { items: { photo: Photo; index: number }[]; sum: number }[] = [];
  photos.forEach((photo, index) => {
    let row = rows[rows.length - 1];
    if (!row || row.items.length >= perRow) {
      row = { items: [], sum: 0 };
      rows.push(row);
    }
    row.items.push({ photo, index });
    row.sum += ratio(photo);
  });
  return rows;
}

export function Gallery({ photos }: { photos: Photo[] }) {
  const { t, lang } = useLang();
  const g = t.gallery;
  const [current, setCurrent] = useState<number | null>(null);
  const label = (i: number) => photoCaption(photos[i], lang) ?? `${g.photoAlt} ${i + 1}`;

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

        {photos.length > 0 ? (
          <>
            <MobileCarousel photos={photos} label={label} onOpen={setCurrent} />
            <DesktopRows photos={photos} label={label} onOpen={setCurrent} perRow={2} className="mt-12 hidden md:flex lg:hidden" />
            <DesktopRows photos={photos} label={label} onOpen={setCurrent} perRow={3} className="mt-14 hidden lg:flex" />
          </>
        ) : (
          <EmptyGallery />
        )}
      </div>

      {current !== null && photos.length > 0 && (
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

type ViewProps = {
  photos: Photo[];
  label: (i: number) => string;
  onOpen: (i: number) => void;
};

/* ---------- Компьютер и планшет: ряды одинаковой высоты ---------- */
function DesktopRows({ photos, label, onOpen, perRow, className }: ViewProps & { perRow: number; className: string }) {
  const { t } = useLang();
  const rows = justifiedRows(photos, perRow);
  // Неполный последний ряд не растягиваем до огромного размера
  const fullSum = Math.max(...rows.filter((r) => r.items.length === perRow).map((r) => r.sum), perRow * 1.33);

  return (
    <div className={`flex-col gap-3 lg:gap-4 ${className}`}>
      {rows.map((row, r) => (
        <ul
          key={r}
          className="flex w-full gap-3 lg:gap-4"
          style={row.items.length < perRow ? { maxWidth: `${Math.min(100, (row.sum / fullSum) * 100)}%` } : undefined}
        >
          {row.items.map(({ photo, index }) => {
            const ar = ratio(photo);
            return (
              <li
                key={photo.src}
                className="reveal min-w-0"
                style={{ flex: `${ar} 1 0%`, ["--delay" as string]: `${(index % perRow) * 80}ms` }}
              >
                <button
                  type="button"
                  onClick={() => onOpen(index)}
                  aria-label={`${t.gallery.open}: ${label(index)}`}
                  className="group relative block w-full overflow-hidden rounded-[24px] bg-cream-deep ring-1 ring-line"
                  style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                >
                  <Image
                    src={photo.src}
                    alt={label(index)}
                    fill
                    quality={70}
                    sizes={perRow === 3 ? "(min-width: 1280px) 480px, 40vw" : "50vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                  <span className="absolute bottom-3 left-3 max-w-[calc(100%-4.5rem)] truncate rounded-full bg-white/95 px-3 py-1.5 text-[13.5px] font-bold text-ink shadow-soft">
                    {label(index)}
                  </span>
                  <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-sun text-ink shadow-soft transition-transform group-hover:scale-110">
                    <ZoomIn className="size-4" aria-hidden />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}

/* ---------- Телефон: карусель со свайпом ---------- */
function MobileCarousel({ photos, label, onOpen }: ViewProps) {
  const { t } = useLang();
  const g = t.gallery;
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    if (!slide) return;
    const step = slide.offsetWidth + 12;
    setActive(Math.max(0, Math.min(photos.length - 1, Math.round(el.scrollLeft / step))));
  };

  const goTo = (i: number) => {
    const el = track.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (el && slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft - 16, behavior: "smooth" });
  };

  return (
    <div className="reveal mt-8 md:hidden">
      <ul
        ref={track}
        onScroll={onScroll}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
        aria-label={g.title}
      >
        {photos.map((photo, i) => (
          <li key={photo.src} className="w-[86%] shrink-0 snap-start min-[480px]:w-[72%] sm:w-[56%]">
            <button
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`${g.open}: ${label(i)}`}
              className="block w-full overflow-hidden rounded-[24px] bg-white text-left shadow-card ring-1 ring-line"
            >
              <span className="relative block aspect-[4/3] w-full overflow-hidden bg-cream-deep">
                {/* размытый фон заполняет поля, само фото показывается целиком */}
                <Image src={photo.src} alt="" aria-hidden fill quality={70} sizes="40px" className="scale-110 object-cover opacity-60 blur-xl" />
                <Image
                  src={photo.src}
                  alt={label(i)}
                  fill
                  quality={70}
                  sizes="(min-width: 640px) 56vw, (min-width: 480px) 72vw, 86vw"
                  className="object-contain"
                />
                <span className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full bg-white/90 text-ink shadow-soft">
                  <ZoomIn className="size-4" aria-hidden />
                </span>
              </span>
              <span className="flex items-center justify-between gap-2 px-4 py-3">
                <span className="truncate text-[14.5px] font-bold text-ink">{label(i)}</span>
                <span className="shrink-0 text-[13px] font-bold text-ink-soft tabular-nums">
                  {i + 1}/{photos.length}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goTo(Math.max(0, active - 1))}
          disabled={active === 0}
          aria-label={g.prev}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink ring-1 ring-line transition disabled:opacity-40"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <div className="flex min-w-0 flex-wrap items-center justify-center gap-1.5">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${g.goTo} ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className="grid h-6 place-items-center px-0.5"
            >
              <span className={`block h-2 rounded-full transition-all ${i === active ? "w-6 bg-teal" : "w-2 bg-ink/20"}`} />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(Math.min(photos.length - 1, active + 1))}
          disabled={active === photos.length - 1}
          aria-label={g.next}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-sun text-ink shadow-[inset_0_-3px_0_rgb(242_183_5)] transition disabled:opacity-40"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
      <p className="mt-2 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-ink-soft">
        <Hand className="size-3.5" aria-hidden />
        {g.swipeHint}
      </p>
    </div>
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
