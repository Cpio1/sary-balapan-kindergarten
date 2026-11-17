"use client";

import { Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chick, Cloud, Squiggle, Wave } from "@/components/decor/Decor";
import { AikidoArt, ChessArt, DanceArt, EnglishArt, MusicArt, SpeechArt } from "@/components/decor/Illustrations";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

const clubs = [
  { key: "english", Art: EnglishArt, bg: "bg-teal-soft", tag: "bg-teal text-white", shape: "blob" },
  { key: "dance", Art: DanceArt, bg: "bg-peach-soft", tag: "bg-orange text-white", shape: "blob-2" },
  { key: "music", Art: MusicArt, bg: "bg-sun-soft", tag: "bg-sun text-ink", shape: "blob-3" },
  { key: "speech", Art: SpeechArt, bg: "bg-sun-soft", tag: "bg-sun-deep text-ink", shape: "blob-2" },
  { key: "chess", Art: ChessArt, bg: "bg-teal-soft", tag: "bg-teal-deep text-white", shape: "blob-3" },
  { key: "aikido", Art: AikidoArt, bg: "bg-peach-soft", tag: "bg-peach text-ink", shape: "blob" },
] as const;

export function Clubs() {
  const { t } = useLang();
  const c = t.clubs;

  return (
    <section id="clubs" data-anchor aria-labelledby="clubs-title" className="relative overflow-hidden bg-[#FFF6D9] pt-16 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24">
      <Wave fill="#FFF9EE" flip className="absolute inset-x-0 -top-px h-8 w-full sm:h-12" />
      <Cloud className="pointer-events-none absolute top-14 right-[4%] w-16 animate-float-slow sm:top-20 sm:w-24" />
      <Cloud className="pointer-events-none absolute bottom-12 left-[2%] hidden w-20 animate-float lg:block" />
      <Squiggle className="pointer-events-none absolute top-[42%] -left-4 hidden w-20 opacity-60 lg:block" color="#FFB48F" />

      <div className="wrap relative">
        <SectionHeading
          id="clubs-title"
          kicker={c.kicker}
          title={c.title}
          lead={c.lead}
          tone="peach"
          icon={<Sparkles className="size-4" aria-hidden />}
        />

        <ul className="mt-9 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {clubs.map(({ key, Art, bg, tag, shape }, i) => {
            const item = c.items[key];
            return (
              <li
                key={key}
                className="reveal group relative flex items-start gap-3.5 rounded-[28px] bg-white p-4 min-[400px]:items-center min-[400px]:gap-4 shadow-card ring-1 ring-line/70 transition-transform duration-300 hover:-translate-y-1 sm:flex-col sm:items-start sm:p-5 lg:flex-row lg:items-start lg:p-6"
                style={{ ["--delay" as string]: `${(i % 3) * 80}ms` }}
              >
                <div className={`grid size-[68px] shrink-0 place-items-center min-[400px]:size-[84px] sm:size-24 ${bg} ${shape}`}>
                  <Art className="w-[48px] min-[400px]:w-[60px] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 sm:w-[68px]" />
                </div>
                <div className="min-w-0">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[12px] font-extrabold ${tag}`}>{item.tag}</span>
                  <h3 className="mt-1.5 text-[18px] leading-snug font-bold text-ink sm:text-[19px]">{item.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-ink-soft sm:text-[15px]">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="reveal mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
          <Chick className="hidden w-10 animate-bob sm:block" />
          <a
            href={whatsappLink(c.ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[16px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#3a3e46] sm:w-auto"
          >
            <WhatsAppIcon className="size-5 text-wa" />
            {c.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
