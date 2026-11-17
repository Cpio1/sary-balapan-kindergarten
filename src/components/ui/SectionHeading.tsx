import type { ReactNode } from "react";

type Props = {
  kicker: string;
  title: string;
  lead?: string;
  icon?: ReactNode;
  align?: "center" | "left";
  /** id заголовка — для aria-labelledby секции */
  id?: string;
  tone?: "sun" | "teal" | "peach";
};

const toneMap = {
  sun: "bg-sun-soft text-[#8a6200] ring-sun/50",
  teal: "bg-teal-soft text-teal-deep ring-teal/30",
  peach: "bg-peach-soft text-orange-deep ring-peach/50",
};

export function SectionHeading({ kicker, title, lead, icon, align = "center", id, tone = "sun" }: Props) {
  const center = align === "center";
  return (
    <div className={`reveal ${center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}`}>
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-bold ring-1 sm:text-sm ${toneMap[tone]}`}
      >
        {icon}
        {kicker}
      </p>
      <h2 id={id} className="mt-3 text-[26px] leading-[1.18] font-bold text-ink sm:text-3xl lg:text-[38px] lg:leading-[1.15]">
        {title}
      </h2>
      {lead ? <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft sm:text-[17px]">{lead}</p> : null}
    </div>
  );
}
