"use client";

import { BookOpen, Bike, Lightbulb, MessageCircle, Palette, Users, GraduationCap } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star, Triangle, Ring } from "@/components/decor/Decor";

const items = [
  { icon: MessageCircle, color: "bg-teal text-white", shape: "blob", accent: "border-teal" },
  { icon: Lightbulb, color: "bg-sun text-ink", shape: "blob-2", accent: "border-sun" },
  { icon: Palette, color: "bg-orange text-white", shape: "blob-3", accent: "border-orange" },
  { icon: Bike, color: "bg-peach text-ink", shape: "blob-2", accent: "border-peach" },
  { icon: Users, color: "bg-teal-deep text-white", shape: "blob-3", accent: "border-teal-deep" },
  { icon: GraduationCap, color: "bg-sun-deep text-ink", shape: "blob", accent: "border-sun-deep" },
];

export function Program() {
  const { t } = useLang();
  const p = t.program;

  return (
    <section id="program" data-anchor aria-labelledby="program-title" className="relative overflow-hidden bg-cream py-14 sm:py-20 lg:py-24">
      <Star className="pointer-events-none absolute top-12 left-[6%] w-6 animate-sway sm:w-7" color="#FFD54A" />
      <Triangle className="pointer-events-none absolute top-24 right-[5%] w-6 rotate-12 sm:w-8" color="#26B3A6" />
      <Ring className="pointer-events-none absolute bottom-10 left-[3%] hidden w-8 md:block" color="#FFB48F" />

      <div className="wrap">
        <SectionHeading
          id="program-title"
          kicker={p.kicker}
          title={p.title}
          lead={p.lead}
          tone="teal"
          icon={<BookOpen className="size-4" aria-hidden />}
        />

        <ul className="mt-9 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {p.items.map((item, i) => {
            const s = items[i];
            const Icon = s.icon;
            return (
              <li
                key={item.title}
                className={`reveal group flex items-start gap-4 rounded-3xl border-b-4 bg-white p-4 shadow-card transition-transform duration-300 hover:-translate-y-1 sm:p-5 ${s.accent}`}
                style={{ ["--delay" as string]: `${(i % 3) * 80}ms` }}
              >
                <span className={`grid size-12 shrink-0 place-items-center sm:size-14 ${s.color} ${s.shape}`}>
                  <Icon className="size-6 sm:size-7" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[16.5px] leading-snug font-semibold text-ink sm:text-lg">{item.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-ink-soft sm:text-[15px]">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
