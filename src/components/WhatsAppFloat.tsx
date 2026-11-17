"use client";

import { useLang } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function WhatsAppFloat() {
  const { t } = useLang();
  return (
    <a
      href={whatsappLink(t.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.float}
      title={t.whatsapp.float}
      className="group fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-wa text-white shadow-[0_12px_28px_-8px_rgb(18_140_74/0.7)] transition hover:scale-105 sm:right-6 sm:bottom-6 sm:size-15"
    >
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-wa opacity-25 [animation-duration:2.6s]" />
      <WhatsAppIcon className="relative size-7 sm:size-8" />
    </a>
  );
}
