"use client";

import { ExternalLink, FileText, FolderOpen, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { documents } from "@/lib/documents";
import { site, whatsappLink } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Pencil, Ring } from "@/components/decor/Decor";

const sourceTone = {
  "google-drive": "bg-teal-soft text-teal-deep",
  "cloud-mail": "bg-sun-soft text-[#8a6200]",
  pdf: "bg-peach-soft text-orange-deep",
  link: "bg-cream-deep text-ink-soft",
} as const;

export function Documents() {
  const { t, lang } = useLang();
  const d = t.documents;

  return (
    <section id="documents" data-anchor aria-labelledby="documents-title" className="relative overflow-hidden bg-cream py-14 sm:py-20 lg:py-24">
      <Pencil className="pointer-events-none absolute bottom-10 -left-2 w-16 rotate-[18deg] sm:w-20" body="#FFD54A" />
      <Ring className="pointer-events-none absolute top-12 right-[6%] w-7 sm:w-8" color="#26B3A6" />

      <div className="wrap">
        <SectionHeading
          id="documents-title"
          kicker={d.kicker}
          title={d.title}
          lead={d.lead}
          icon={<FileText className="size-4" aria-hidden />}
        />

        {documents.length > 0 ? (
          <ul className="mx-auto mt-9 grid max-w-5xl gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {documents.map((doc, i) => (
              <li key={doc.url} className="reveal" style={{ ["--delay" as string]: `${(i % 3) * 70}ms` }}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start gap-4 rounded-3xl bg-white p-4 shadow-card ring-1 ring-line/70 transition hover:-translate-y-1 sm:p-5"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sun-soft text-[#8a6200]">
                    <FileText className="size-6" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[12px] font-extrabold ${sourceTone[doc.source]}`}>
                      {d.sources[doc.source]}
                    </span>
                    <span className="mt-1.5 block font-display text-[16.5px] leading-snug font-semibold text-ink">{doc.title[lang]}</span>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-extrabold text-teal-deep">
                      {d.open}
                      <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="reveal mx-auto mt-9 max-w-3xl sm:mt-12">
            <div className="relative flex flex-col items-center gap-5 rounded-[30px] border-2 border-dashed border-line bg-white/70 p-6 text-center sm:flex-row sm:p-8 sm:text-left">
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-sun-soft text-[#8a6200] blob-2">
                <FolderOpen className="size-8" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[19px] font-bold text-ink sm:text-xl">{d.emptyTitle}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{d.emptyText}</p>
                <div className="mt-4 flex flex-col gap-2.5 min-[420px]:flex-row min-[420px]:justify-center sm:justify-start">
                  <a
                    href={site.phoneHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-[15px] font-extrabold text-ink ring-1 ring-line hover:bg-sun-soft"
                  >
                    <Phone className="size-4" aria-hidden />
                    {site.phoneDisplay}
                  </a>
                  <a
                    href={whatsappLink(t.whatsapp.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-wa-deep px-5 text-[15px] font-extrabold text-white hover:brightness-110"
                  >
                    <WhatsAppIcon className="size-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
