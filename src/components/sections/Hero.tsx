"use client";

import Image from "next/image";
import { Clock, Languages, Baby, ArrowDown } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { Chick, ChickHatch, Cloud, Flower, Sparkle, Star, Sun, Wave } from "@/components/decor/Decor";
import { HeroScene } from "@/components/decor/Illustrations";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import type { Photo } from "@/lib/media";

export function Hero({ photo }: { photo: Photo | null }) {
  const { t } = useLang();
  const h = t.hero;

  const facts = [
    { icon: Baby, ...h.facts.age, tone: "bg-sun-soft text-[#8a6200]" },
    { icon: Clock, ...h.facts.hours, tone: "bg-teal-soft text-teal-deep" },
    { icon: Languages, ...h.facts.language, tone: "bg-peach-soft text-orange-deep" },
  ];

  return (
    <section
      id="top"
      data-anchor
      className="relative overflow-hidden bg-[linear-gradient(180deg,#FFF3C4_0%,#FFF8E2_55%,#FFF9EE_100%)] pt-[calc(var(--header-h)+20px)] pb-16 sm:pb-20 lg:pt-[calc(var(--header-h)+40px)] lg:pb-28"
    >
      {/* фон: мягкие пятна и маленькие фигурки */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 size-72 rounded-full bg-sun/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 size-80 rounded-full bg-teal/15 blur-3xl" />
        <Cloud className="absolute top-[calc(var(--header-h)+14px)] right-[4%] w-14 animate-float-slow opacity-90 sm:w-20 lg:top-[calc(var(--header-h)+8px)] lg:right-[44%] lg:w-24" />
        <Star className="absolute top-[calc(var(--header-h)+120px)] left-[2%] hidden w-5 animate-sway sm:block lg:top-auto lg:bottom-24 lg:left-[3%] lg:w-6" color="#FFB48F" />
        <Sparkle className="absolute right-[6%] bottom-20 w-4 lg:w-5" />
      </div>

      <div className="wrap relative grid items-center gap-x-12 gap-y-8 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_auto]">
        {/* Текст */}
        <div className="reveal lg:self-end">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 py-1.5 pr-4 pl-1.5 text-[13px] font-bold text-ink ring-1 ring-line sm:text-sm">
            <span className="grid size-7 place-items-center rounded-full bg-sun">
              <Chick className="size-5" />
            </span>
            {h.badge}
          </p>
          <h1 className="mt-4 text-[29px] leading-[1.15] font-bold tracking-[-0.01em] text-ink min-[390px]:text-[32px] sm:text-[40px] lg:text-[44px] xl:text-[50px]">
            {h.titleStart}{" "}
            <span className="relative inline-block whitespace-nowrap text-teal-deep">
              {h.titleAccent}
              <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-2.5 w-full">
                <path d="M3 8c40-6 90-7 194-2" stroke="#FFD54A" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            {h.titleEnd}
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-soft sm:text-[17px] lg:text-lg">{h.lead}</p>
        </div>

        {/* Визуал */}
        <div className={`reveal relative order-last mx-auto w-full lg:order-none ${photo ? "max-w-[340px] sm:max-w-[400px] lg:max-w-[460px]" : "max-w-[400px] sm:max-w-[500px] lg:max-w-none"} lg:col-start-2 lg:row-span-2 lg:row-start-1`} style={{ ["--delay" as string]: "120ms" }}>
          <Sun className="absolute -top-4 -left-1 z-10 w-12 animate-spin-slow sm:w-16 lg:-top-6 lg:-left-6 lg:w-20" />
          <div
            className={`relative overflow-hidden border-[6px] border-white bg-teal-soft shadow-pop sm:border-8 ${
              photo
                ? "aspect-[4/5] rounded-[36px] sm:rounded-[44px] lg:aspect-[5/6] lg:rounded-[52px]"
                : "aspect-[5/4] blob lg:aspect-[1/1.02]"
            }`}
          >
            {photo ? (
              <Image
                src={photo.src}
                alt={h.imageAlt}
                fill
                preload
                quality={80}
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 400px, 340px"
                className="object-cover object-[50%_47%]"
              />
            ) : (
              <HeroScene className="absolute inset-0 size-full" />
            )}
          </div>

          {/* плашки поверх изображения */}
          <div className="absolute top-[12%] -right-1 rotate-3 rounded-2xl bg-white px-3 py-2 text-[13px] font-extrabold text-ink shadow-soft sm:text-sm lg:-right-4">
            <span className="mr-1.5 inline-block size-2.5 rounded-full bg-orange align-middle" />
            {h.badgeMeals}
          </div>
          <div className={`absolute ${photo ? "bottom-[4%]" : "bottom-[10%]"} -left-1 -rotate-2 rounded-2xl bg-white px-3 py-2 text-[13px] font-extrabold text-ink shadow-soft sm:text-sm lg:-left-5`}>
            <span className="mr-1.5 inline-block size-2.5 rounded-full bg-teal align-middle" />
            {h.badgeClubs}
          </div>
          <div className="absolute right-[14%] -bottom-3 hidden rounded-full bg-sun px-3.5 py-1.5 text-[13px] font-extrabold text-ink shadow-soft sm:block">
            {h.badgeGroups}
          </div>
          <ChickHatch className="absolute -right-2 bottom-[30%] w-10 animate-bob sm:w-12 lg:-right-8" />
          <Flower className="absolute -bottom-3 left-[22%] w-8 animate-sway sm:w-9" />
        </div>

        {/* Факты + кнопки */}
        <div className="reveal lg:self-start" style={{ ["--delay" as string]: "200ms" }}>
          <ul className="grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
            {facts.map(({ icon: Icon, label, value, tone }) => (
              <li key={label} className="rounded-2xl bg-white px-2.5 py-2.5 ring-1 ring-line sm:px-3.5 sm:py-3">
                <span className={`grid size-8 place-items-center rounded-xl ${tone}`}>
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <span className="mt-2 block text-[11.5px] leading-tight font-semibold text-ink-soft sm:text-[13px]">{label}</span>
                <span className="mt-0.5 block text-[13.5px] leading-tight font-extrabold whitespace-nowrap text-ink sm:text-base">{value}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center">
            <a
              href={whatsappLink(t.whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-sun px-6 text-[16px] font-extrabold text-ink shadow-[inset_0_-4px_0_rgb(242_183_5),0_12px_24px_-12px_rgb(242_183_5/0.9)] transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
            >
              <WhatsAppIcon className="size-5 text-wa-deep" />
              {h.cta}
            </a>
            <a
              href="#clubs"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-[16px] font-bold text-ink ring-1 ring-line transition hover:bg-sun-soft"
            >
              {h.secondary}
              <ArrowDown className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <Wave fill="#FFFDF7" className="absolute inset-x-0 -bottom-px h-8 w-full sm:h-12 lg:h-16" />
    </section>
  );
}
