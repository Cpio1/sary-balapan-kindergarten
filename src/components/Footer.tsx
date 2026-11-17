"use client";

import { ArrowUp, Clock, MapPin, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";
import { Logo, sectionIds } from "@/components/Header";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Star, Wave } from "@/components/decor/Decor";

export function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="relative overflow-hidden bg-sun-soft pt-14 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pt-16">
      <Wave fill="#DFF5F2" flip className="absolute inset-x-0 -top-px h-6 w-full sm:h-10" />
      <Star className="pointer-events-none absolute top-14 right-[6%] w-6 animate-sway" color="#FF8A3D" />

      <div className="wrap relative">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-12">
          <div>
            <a href="#top" aria-label={t.header.home} className="inline-block rounded-full">
              <Logo />
            </a>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink-soft">{f.tagline}</p>
            <div className="mt-5 flex gap-2.5">
              <a
                href={whatsappLink(t.whatsapp.message)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-11 place-items-center rounded-full bg-white text-wa-deep ring-1 ring-line transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="size-5" />
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-full bg-white text-[#E1306C] ring-1 ring-line transition hover:-translate-y-0.5"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={site.phoneHref}
                aria-label={site.phoneDisplay}
                className="grid size-11 place-items-center rounded-full bg-white text-teal-deep ring-1 ring-line transition hover:-translate-y-0.5"
              >
                <Phone className="size-5" aria-hidden />
              </a>
            </div>
          </div>

          <nav aria-label={f.sections}>
            <h2 className="text-[15px] font-bold text-ink">{f.sections}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
              {sectionIds.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-block py-1.5 text-[15px] font-semibold text-ink-soft hover:text-ink">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[15px] font-bold text-ink">{f.contacts}</h2>
            <ul className="mt-3 space-y-2.5 text-[15px] text-ink-soft">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden />
                {site.address}
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-teal-deep" aria-hidden />
                <a href={site.phoneHref} className="font-bold text-ink hover:text-teal-deep">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-[#8a6200]" aria-hidden />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-sun/60 pt-5 text-[13.5px] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {t.legalName}. {f.rights}
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 self-start font-bold text-ink hover:text-teal-deep sm:self-auto">
            <ArrowUp className="size-4" aria-hidden />
            {f.toTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
