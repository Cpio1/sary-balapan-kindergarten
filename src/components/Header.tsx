"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { Chick } from "@/components/decor/Decor";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export const sectionIds = ["about", "program", "clubs", "nutrition", "gallery", "documents", "contacts"] as const;
export type SectionId = (typeof sectionIds)[number];

export function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-sun shadow-[inset_0_-3px_0_rgb(242_183_5/0.6)] lg:size-11">
        <Chick className="size-8 translate-y-0.5 lg:size-9" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[19px] font-bold tracking-[-0.01em] text-ink lg:text-[21px]">
          Сары балапан
        </span>
        {!compact && (
          <span className="mt-1 block text-[12px] font-semibold text-ink-soft">{t.kindLabel}</span>
        )}
      </span>
    </span>
  );
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  const options: { value: Lang; label: string }[] = [
    { value: "kk", label: "KZ" },
    { value: "ru", label: "RU" },
  ];
  return (
    <div role="group" aria-label={t.header.language} className={`rounded-full bg-white p-1 ring-1 ring-line ${className || "flex"}`}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={lang === o.value}
          onClick={() => setLang(o.value)}
          className={`min-h-9 min-w-10 rounded-full px-2.5 text-[13px] font-extrabold transition-colors ${
            lang === o.value ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  // Тень шапки при прокрутке
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Подсветка текущего раздела
  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const top = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, []);

  // Мобильное меню: блокировка прокрутки, Escape, закрытие на десктопе
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid ? "bg-cream/95 shadow-[0_6px_24px_-14px_rgb(45_48_54/0.35)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-[var(--header-h)] max-w-[90rem] items-center justify-between gap-3">
        <a href="#top" aria-label={t.header.home} onClick={() => setOpen(false)} className="shrink-0 rounded-full">
          <Logo />
        </a>

        <nav aria-label={t.header.navLabel} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`block rounded-full px-2.5 py-2 text-[14.5px] whitespace-nowrap font-bold transition-colors xl:px-3.5 xl:text-[15px] ${
                    active === id ? "bg-sun text-ink" : "text-ink-soft hover:bg-sun-soft hover:text-ink"
                  }`}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch className="hidden min-[370px]:flex" />
          <a
            href={whatsappLink(t.whatsapp.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-sun px-4 py-2.5 text-[14.5px] font-extrabold text-ink shadow-[inset_0_-3px_0_rgb(242_183_5/0.9)] whitespace-nowrap transition hover:brightness-105 min-[1400px]:inline-flex"
          >
            <WhatsAppIcon className="size-[18px] text-wa-deep" />
            {t.header.contact}
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-white text-ink ring-1 ring-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

    </header>

      {/* Мобильное меню (вне <header>: backdrop-filter шапки ломает position: fixed) */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-50 lg:hidden"
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          className="absolute inset-0 bg-ink/25"
          onClick={() => setOpen(false)}
        />
        <nav
          aria-label={t.header.navLabel}
          className="relative max-h-full overflow-y-auto rounded-b-[28px] bg-cream px-4 pt-2 pb-6 shadow-pop"
        >
          <ul className="mx-auto grid max-w-md gap-1.5 sm:grid-cols-2">
            {sectionIds.map((id, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-[16px] font-bold ring-1 ${
                    active === id ? "bg-sun ring-sun-deep/40" : "bg-white ring-line"
                  }`}
                >
                  <span
                    aria-hidden
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ background: ["#FFD54A", "#26B3A6", "#FF8A3D", "#FFB48F", "#26B3A6", "#FFD54A", "#FF8A3D"][i] }}
                  />
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-4 flex max-w-md items-center justify-between gap-3 rounded-2xl bg-white px-4 py-2 ring-1 ring-line min-[370px]:hidden">
            <span className="text-[14px] font-bold text-ink-soft">{t.header.language}</span>
            <LangSwitch />
          </div>
          <a
            href={whatsappLink(t.whatsapp.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-4 flex min-h-12 max-w-md items-center justify-center gap-2 rounded-2xl bg-wa-deep px-5 text-[16px] font-extrabold text-white"
          >
            <WhatsAppIcon className="size-5" />
            {t.header.contact}
          </a>
        </nav>
      </div>
    </>
  );
}
