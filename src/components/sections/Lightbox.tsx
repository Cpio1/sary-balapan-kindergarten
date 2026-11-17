"use client";

import Image from "next/image";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/media";

type Props = {
  photos: Photo[];
  index: number;
  label: (i: number) => string;
  labels: { close: string; prev: string; next: string; dialog: string };
  onClose: () => void;
  onIndex: Dispatch<SetStateAction<number | null>>;
};

export function Lightbox({ photos, index, label, labels, onClose, onIndex }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const total = photos.length;
  const photo = photos[index];
  const neighbours = total > 1 ? [photos[(index + 1) % total], photos[(index - 1 + total) % total]] : [];

  const go = (dir: 1 | -1) => onIndex((i) => ((i ?? 0) + dir + total) % total);
  const goRef = useRef(go);
  const closeFn = useRef(onClose);
  useEffect(() => {
    goRef.current = go;
    closeFn.current = onClose;
  });

  // Клавиатура, блокировка прокрутки, фокус
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFn.current();
      else if (e.key === "ArrowRight") goRef.current(1);
      else if (e.key === "ArrowLeft") goRef.current(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);

  // Свайп на сенсорных экранах
  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    swiped.current = Math.abs(dx) > 10 || Math.abs(dy) > 10;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
  };

  const btn =
    "grid size-12 shrink-0 place-items-center rounded-full bg-white text-ink shadow-soft transition hover:bg-sun focus-visible:outline-sun";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={labels.dialog}
      className="fixed inset-0 z-[100] flex h-[100dvh] w-full flex-col overflow-hidden bg-[#24211c] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-5">
        <p className="flex min-w-0 items-center gap-2.5 text-white" aria-live="polite">
          <span className="shrink-0 rounded-full bg-sun px-3 py-1.5 text-sm font-extrabold text-ink tabular-nums">
            {index + 1} / {total}
          </span>
          <span className="truncate text-[15px] font-bold">{label(index)}</span>
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={labels.close} className={btn}>
          <X className="size-6" aria-hidden />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 touch-none items-center justify-center px-[2.5vw] select-none [--lb-maxw:95vw] sm:[--lb-maxw:calc(100vw-136px)]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (start.current = null)}
        onClick={(e) => {
          // Нажатие на пустое место вокруг фото закрывает просмотр
          if (swiped.current) return;
          const el = e.target as HTMLElement;
          if (el.tagName !== "IMG" && !el.closest("button")) onClose();
        }}
      >
        {/*
          Размер блока считается по пропорциям фото: не шире 95vw и не выше
          85dvh (и не выше места, оставшегося после панелей управления).
        */}
        <div
          className="relative overflow-hidden rounded-2xl bg-black/20 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.6)]"
          style={{
            aspectRatio: `${photo.width} / ${photo.height}`,
            width: `min(var(--lb-maxw), calc(min(85dvh, 100dvh - 168px) * ${(photo.width / photo.height).toFixed(4)}))`,
            maxWidth: "95vw",
            maxHeight: "85dvh",
          }}
        >
          <Image
            key={photo.src}
            src={photo.src}
            alt={label(index)}
            fill
            quality={80}
            sizes="95vw"
            className="object-contain"
            draggable={false}
            loading="eager"
            fetchPriority="high"
          />
          {/* Соседние фото загружаются заранее — перелистывание без задержки */}
          {neighbours.map((p) => (
            <Image
              key={`pre-${p.src}`}
              src={p.src}
              alt=""
              aria-hidden
              fill
              quality={80}
              sizes="95vw"
              className="pointer-events-none invisible object-contain"
              loading="eager"
            />
          ))}
        </div>

        {total > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={`${btn} absolute top-1/2 left-4 hidden -translate-y-1/2 sm:grid`}>
              <ChevronLeft className="size-7" aria-hidden />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={labels.next} className={`${btn} absolute top-1/2 right-4 hidden -translate-y-1/2 sm:grid`}>
              <ChevronRight className="size-7" aria-hidden />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <ul className="mx-auto hidden max-w-[95vw] gap-2 overflow-x-auto px-2 py-4 [scrollbar-width:none] sm:flex">
          {photos.map((p, i) => (
            <li key={p.src} className="shrink-0">
              <button
                type="button"
                onClick={() => onIndex(i)}
                aria-label={label(i)}
                aria-current={i === index ? "true" : undefined}
                className={`relative block h-14 w-20 overflow-hidden rounded-xl transition ${
                  i === index ? "opacity-100 ring-3 ring-sun" : "opacity-55 hover:opacity-90"
                }`}
              >
                <Image src={p.src} alt="" fill quality={70} sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {total > 1 && (
        <div className="flex items-center justify-center gap-6 px-3 py-4 sm:hidden">
          <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={btn}>
            <ChevronLeft className="size-7" aria-hidden />
          </button>
          <button type="button" onClick={() => go(1)} aria-label={labels.next} className={btn}>
            <ChevronRight className="size-7" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
