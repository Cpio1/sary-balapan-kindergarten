"use client";

import { Heart as HeartIcon, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Flower, Pencil, Dots } from "@/components/decor/Decor";
import { CareArt, DayArt, NestArt } from "@/components/decor/Illustrations";

const factStyles = [
  "bg-sun text-ink",
  "bg-teal text-white",
  "bg-peach-soft text-orange-deep",
  "bg-white text-ink ring-1 ring-line",
];

const groupStyles = [
  { card: "bg-sun-soft", art: NestArt, num: "bg-sun text-ink", shape: "blob" },
  { card: "bg-teal-soft", art: DayArt, num: "bg-teal text-white", shape: "blob-2" },
  { card: "bg-peach-soft", art: CareArt, num: "bg-orange text-white", shape: "blob-3" },
];

export function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="about" data-anchor aria-labelledby="about-title" className="relative overflow-hidden bg-[#FFFDF7] py-14 sm:py-20 lg:py-24">
      <Pencil className="pointer-events-none absolute top-10 -right-3 w-16 rotate-[-24deg] sm:w-20 lg:top-16 lg:right-6 lg:w-24" body="#FF8A3D" />
      <Dots className="pointer-events-none absolute bottom-16 left-2 hidden w-14 opacity-70 md:block" color="#BDE9E3" />

      <div className="wrap">
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <SectionHeading
              id="about-title"
              align="left"
              kicker={a.kicker}
              title={a.title}
              icon={<HeartIcon className="size-4" aria-hidden />}
            />
            <div className="reveal mt-5 space-y-4 text-[15.5px] leading-relaxed text-ink-soft sm:text-[17px]">
              {a.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:mt-12">
            {a.facts.map((f, i) => (
              <li
                key={f.label}
                className={`reveal relative flex min-h-[112px] flex-col justify-end overflow-hidden rounded-[26px] p-4 sm:min-h-[132px] sm:p-5 ${factStyles[i]} ${i % 2 ? "sm:translate-y-5" : ""}`}
                style={{ ["--delay" as string]: `${i * 80}ms` }}
              >
                <span aria-hidden className="absolute -top-5 -right-5 size-16 rounded-full bg-white/25" />
                <span className="font-display text-[24px] leading-none font-bold break-words sm:text-[30px]">{f.value}</span>
                <span className="mt-1.5 text-[13.5px] leading-snug font-bold opacity-85 sm:text-[15px]">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Топтар */}
        <div className="mt-14 sm:mt-20">
          <div className="reveal flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="max-w-2xl">
              <h3 className="flex items-center gap-2 text-[22px] font-bold text-ink sm:text-[28px]">
                {a.groupsTitle}
                <Flower className="w-7 sm:w-8" />
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft sm:text-base">{a.groupsLead}</p>
            </div>
          </div>

          <ol className="mt-6 grid gap-4 md:grid-cols-3 lg:gap-6">
            {a.groups.map((g, i) => {
              const s = groupStyles[i];
              const Art = s.art;
              return (
                <li
                  key={g.title}
                  className={`reveal group relative flex gap-4 overflow-hidden rounded-[28px] p-5 md:flex-col md:p-6 ${s.card}`}
                  style={{ ["--delay" as string]: `${i * 90}ms` }}
                >
                  <div className={`grid size-[76px] shrink-0 place-items-center bg-white shadow-soft md:size-24 ${s.shape}`}>
                    <Art className="w-14 transition-transform duration-500 group-hover:scale-110 md:w-[70px]" />
                  </div>
                  <div className="min-w-0">
                    <span className={`inline-block rounded-full px-2.5 py-1 text-[12.5px] font-extrabold ${s.num}`}>
                      {i + 1}
                      {a.groupLabel}
                    </span>
                    <h4 className="mt-2 font-display text-[17.5px] leading-snug font-semibold text-ink sm:text-lg">{g.title}</h4>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft sm:text-[15px]">{g.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="reveal mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14.5px] text-ink-soft sm:text-[15px]">
            <MessageCircle className="size-4 shrink-0 text-teal-deep" aria-hidden />
            <span>{a.groupsNote}</span>
            <a
              href={whatsappLink(t.whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold text-teal-deep underline decoration-teal/40 decoration-2 underline-offset-4 hover:decoration-teal"
            >
              WhatsApp →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
