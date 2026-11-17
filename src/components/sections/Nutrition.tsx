"use client";

import { Apple, Clock3, HandHeart, Moon, Scale, Sunrise, Utensils } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sun, Sparkle } from "@/components/decor/Decor";
import { AppleArt, BananaArt, CarrotArt, CupArt, PearArt, PlateArt } from "@/components/decor/Illustrations";

const pointIcons = [Scale, Clock3, HandHeart];
const pointTones = ["bg-teal-soft text-teal-deep", "bg-sun-soft text-[#8a6200]", "bg-peach-soft text-orange-deep"];
const mealDots = ["bg-sun", "bg-peach", "bg-orange", "bg-teal", "bg-teal-deep"];

export function Nutrition() {
  const { t } = useLang();
  const n = t.nutrition;

  return (
    <section id="nutrition" data-anchor aria-labelledby="nutrition-title" className="relative overflow-hidden bg-[#FFFDF7] py-14 sm:py-20 lg:py-24">
      <Sun className="pointer-events-none absolute top-8 right-[4%] w-10 animate-spin-slow sm:w-14" />
      <Sparkle className="pointer-events-none absolute bottom-14 left-[5%] w-4 sm:w-5" color="#FF8A3D" />

      <div className="wrap">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Тарелка с цифрой 5 */}
          <div className="reveal relative mx-auto w-full max-w-[290px] sm:max-w-[360px] lg:order-none lg:max-w-[420px]">
            <div aria-hidden className="absolute inset-[8%] rounded-full bg-sun/35 blur-2xl" />
            <PlateArt className="relative w-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-[6%]">
              <span className="font-display text-[84px] leading-none font-bold text-orange sm:text-[104px] lg:text-[120px]">5</span>
              <span className="mt-1 text-center text-[15px] leading-tight font-extrabold text-ink sm:text-lg">
                {n.bigLabel}
                <span className="block text-[13px] font-bold text-ink-soft sm:text-[15px]">{n.bigCaption}</span>
              </span>
            </div>
            <AppleArt className="absolute top-[6%] left-[8%] w-11 animate-float sm:w-14" />
            <BananaArt className="absolute top-[3%] right-[10%] w-11 animate-float-slow sm:w-14" />
            <PearArt className="absolute bottom-[10%] left-[3%] w-10 animate-float-slow sm:w-12" />
            <CarrotArt className="absolute right-[4%] bottom-[12%] w-11 animate-float sm:w-13" />
            <CupArt className="absolute -bottom-1 left-1/2 w-9 -translate-x-1/2 sm:w-11" />
          </div>

          <div>
            <SectionHeading
              id="nutrition-title"
              align="left"
              kicker={n.kicker}
              title={n.title}
              lead={n.lead}
              tone="peach"
              icon={<Utensils className="size-4" aria-hidden />}
            />
            <ul className="mt-6 grid gap-3">
              {n.points.map((p, i) => {
                const Icon = pointIcons[i];
                return (
                  <li
                    key={p.title}
                    className="reveal flex items-start gap-3.5 rounded-2xl bg-white p-4 ring-1 ring-line"
                    style={{ ["--delay" as string]: `${i * 80}ms` }}
                  >
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${pointTones[i]}`}>
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[16px] leading-snug font-semibold text-ink sm:text-[17px]">{p.title}</h3>
                      <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-soft sm:text-[15px]">{p.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Күн жолы: 5 мезгіл */}
        <div className="reveal mt-10 rounded-[30px] bg-[linear-gradient(90deg,#FFF3C4,#FFEADF_55%,#DFF5F2)] p-5 sm:mt-14 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[18px] font-bold text-ink sm:text-xl">{n.dayTitle}</h3>
            <span className="flex items-center gap-1.5 text-ink-soft" aria-hidden>
              <Sunrise className="size-5 text-orange" />
              <span className="h-0.5 w-6 rounded bg-ink/15" />
              <Moon className="size-5 text-teal-deep" />
            </span>
          </div>
          <ol className="relative mt-5 grid gap-2.5 sm:grid-cols-5 sm:gap-3">
            <span aria-hidden className="absolute top-[22px] right-[10%] left-[10%] hidden border-t-2 border-dashed border-ink/20 sm:block" />
            {n.meals.map((meal, i) => (
              <li key={meal} className="relative flex items-center gap-3 rounded-2xl bg-white/85 px-3 py-2.5 sm:flex-col sm:gap-2 sm:bg-transparent sm:p-0 sm:text-center">
                <span className={`relative grid size-11 shrink-0 place-items-center rounded-full font-display text-[18px] font-bold ring-4 ring-white ${mealDots[i]} ${i > 2 ? "text-white" : "text-ink"}`}>
                  {i + 1}
                </span>
                <span className="text-[15px] leading-tight font-bold text-ink">{meal}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 flex items-start gap-2 text-[14px] text-ink-soft sm:text-[15px]">
            <Apple className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden />
            {n.note}
          </p>
        </div>
      </div>
    </section>
  );
}
