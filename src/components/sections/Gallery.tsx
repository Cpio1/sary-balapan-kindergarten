"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, ImageIcon, ZoomIn } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Star, Squiggle, Chick, Flower, Sun, Cloud } from "@/components/decor/Decor";
import { Lightbox } from "./Lightbox";

const PAGE = 12;

export function Gallery({ images }: { images: string[] }) {
  const { t } = useLang();
  const g = t.gallery;
  const [current, setCurrent] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? images : images.slice(0, PAGE);
  const alt = (i: number) => `${g.photoAlt} ${i + 1}`;

  return (
    <section id="gallery" data-anchor aria-labelledby="gallery-title" className="relative overflow-hidden bg-white py-14 sm:py-20 lg:py-24">
      <Star className="pointer-events-none absolute top-10 right-[8%] w-5 animate-sway sm:w-6" color="#26B3A6" />
      <Squiggle className="pointer-events-none absolute top-20 left-[3%] hidden w-16 md:block" color="#FFD54A" />

      <div className="wrap">
        <SectionHeading
          id="gallery-title"
          kicker={g.kicker}
          title={g.title}
          lead={g.lead}
          tone="teal"
          icon={<Camera className="size-4" aria-hidden />}
        />

        {images.length > 0 ? (
          <>
            <ul className="mt-9 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
              {visible.map((src, i) => (
                <li key={src} className={`reveal min-w-0 ${i % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""}`} style={{ ["--delay" as string]: `${(i % 4) * 60}ms` }}>
                  <button
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-label={`${g.open}: ${alt(i)}`}
                    className="group relative block aspect-square w-full overflow-hidden rounded-[22px] bg-cream-deep ring-1 ring-line"
                  >
                    <Image
                      src={src}
                      alt={alt(i)}
                      fill
                      sizes={i % 7 === 0 ? "(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 50vw" : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-2.5 bottom-2.5 grid size-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-soft transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <ZoomIn className="size-4" aria-hidden />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {images.length > PAGE && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="inline-flex min-h-12 items-center rounded-full bg-sun px-6 font-extrabold text-ink shadow-[inset_0_-3px_0_rgb(242_183_5)] transition hover:brightness-105"
                >
                  {expanded ? g.showLess : `${g.showMore} (${images.length - PAGE})`}
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyGallery />
        )}
      </div>

      {current !== null && images.length > 0 && (
        <Lightbox
          images={images}
          index={current}
          alt={alt}
          labels={{ close: g.close, prev: g.prev, next: g.next, dialog: g.dialog }}
          onClose={() => setCurrent(null)}
          onIndex={setCurrent}
        />
      )}
    </section>
  );
}

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
