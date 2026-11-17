"use client";

import Image from "next/image";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  images: string[];
  index: number;
  alt: (i: number) => string;
  labels: { close: string; prev: string; next: string; dialog: string };
  onClose: () => void;
  onIndex: Dispatch<SetStateAction<number | null>>;
};

export function Lightbox({ images, index, alt, labels, onClose, onIndex }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const total = images.length;

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
        <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold text-white tabular-nums" aria-live="polite">
          {index + 1} / {total}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={labels.close} className={btn}>
          <X className="size-6" aria-hidden />
        </button>
      </div>

      <div
        className="relative min-h-0 flex-1 touch-none px-3 select-none sm:px-20"
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
        <div className="relative size-full">
          <Image
            key={images[index]}
            src={images[index]}
            alt={alt(index)}
            fill
            sizes="100vw"
            className="object-contain"
            draggable={false}
            priority
          />
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
