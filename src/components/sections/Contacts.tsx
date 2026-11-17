"use client";

import { useState } from "react";
import { Building2, Check, Clock, Copy, MapPin, Phone, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon, TwoGisIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Chick, Flower, Cloud, Wave } from "@/components/decor/Decor";
import { MapArt } from "@/components/decor/Illustrations";

export function Contacts() {
  const { t } = useLang();
  const c = t.contacts;
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(site.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* буфер обмена недоступен */
    }
  };

  const rows = [
    { icon: Building2, label: c.org, value: t.legalName, tone: "bg-sun-soft text-[#8a6200]" },
    { icon: MapPin, label: c.address, value: site.address, tone: "bg-peach-soft text-orange-deep", copy: true },
    { icon: Phone, label: c.phone, value: site.phoneDisplay, href: site.phoneHref, tone: "bg-teal-soft text-teal-deep" },
    { icon: Clock, label: c.hours, value: site.hours, tone: "bg-sun-soft text-[#8a6200]" },
  ];

  return (
    <section id="contacts" data-anchor aria-labelledby="contacts-title" className="relative overflow-hidden bg-teal-soft pt-16 pb-16 sm:pt-24 sm:pb-24">
      <Wave fill="#FFF9EE" flip className="absolute inset-x-0 -top-px h-8 w-full sm:h-12" />
      <Cloud className="pointer-events-none absolute top-16 left-[3%] hidden w-20 animate-float-slow md:block" />
      <Flower className="pointer-events-none absolute right-[4%] bottom-8 w-8 animate-sway sm:w-10" petal="#26B3A6" center="#FFD54A" />

      <div className="wrap relative">
        <SectionHeading
          id="contacts-title"
          kicker={c.kicker}
          title={c.title}
          lead={c.lead}
          tone="teal"
          icon={<Send className="size-4" aria-hidden />}
        />

        <div className="mt-9 grid gap-4 sm:mt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
          {/* Контактная карточка */}
          <div className="reveal relative rounded-[30px] bg-white p-5 shadow-card sm:p-7">
            <Chick className="absolute -top-7 right-6 w-12 animate-bob sm:w-14" />
            <ul className="divide-y divide-line">
              {rows.map(({ icon: Icon, label, value, href, tone, copy }) => (
                <li key={label} className="flex items-center gap-3.5 py-3.5 first:pt-0">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tone}`}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold text-ink-soft">{label}</span>
                    {href ? (
                      <a href={href} className="block text-[17px] font-extrabold text-ink hover:text-teal-deep sm:text-lg">
                        {value}
                      </a>
                    ) : (
                      <span className="block text-[16.5px] font-extrabold break-words text-ink sm:text-lg">{value}</span>
                    )}
                  </div>
                  {copy && (
                    <button
                      type="button"
                      onClick={copyAddress}
                      aria-label={copied ? c.copied : c.copy}
                      title={copied ? c.copied : c.copy}
                      className="grid size-11 shrink-0 place-items-center rounded-full text-ink-soft ring-1 ring-line transition hover:bg-cream"
                    >
                      {copied ? <Check className="size-4 text-teal-deep" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <span className="sr-only" aria-live="polite">{copied ? c.copied : ""}</span>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <a
                href={whatsappLink(t.whatsapp.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-wa-deep px-4 text-[15.5px] font-extrabold text-white transition hover:brightness-110"
              >
                <WhatsAppIcon className="size-5" />
                {c.whatsapp}
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-sun px-4 text-[15.5px] font-extrabold text-ink shadow-[inset_0_-3px_0_rgb(242_183_5)] transition hover:brightness-105"
              >
                <Phone className="size-[18px]" aria-hidden />
                {c.call}
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-4 text-[15.5px] font-extrabold text-ink ring-1 ring-line transition hover:bg-peach-soft sm:col-span-2"
              >
                <InstagramIcon className="size-5 text-[#E1306C]" />
                {c.instagram}
              </a>
            </div>
          </div>

          {/* Карта 2GIS */}
          <div className="reveal flex flex-col overflow-hidden rounded-[30px] bg-white shadow-card" style={{ ["--delay" as string]: "120ms" }}>
            <div className="relative aspect-[16/10] w-full min-h-[200px] flex-1 bg-teal-soft lg:aspect-auto lg:min-h-[280px]">
              {site.twoGisEmbedUrl ? (
                <iframe
                  src={site.twoGisEmbedUrl}
                  title={c.mapTitle}
                  loading="lazy"
                  className="absolute inset-0 size-full border-0"
                />
              ) : (
                <a
                  href={site.twoGisSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.mapButton}: ${site.address}`}
                  className="group absolute inset-0 block"
                >
                  <MapArt className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-2xl bg-white/95 px-3.5 py-2 text-[14px] font-extrabold text-ink shadow-soft">
                    <MapPin className="mr-1 inline size-4 align-[-2px] text-orange" aria-hidden />
                    {site.address}
                  </span>
                </a>
              )}
            </div>
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="min-w-0">
                <h3 className="text-[18px] font-bold text-ink">{c.mapTitle}</h3>
                <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-soft">{c.mapText}</p>
              </div>
              <a
                href={site.twoGisSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#1BA136] px-5 text-[15.5px] font-extrabold text-white transition hover:brightness-110"
              >
                <TwoGisIcon className="size-5" />
                {c.mapButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
