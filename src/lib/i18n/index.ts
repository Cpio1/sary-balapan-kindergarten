"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { kk, type Dictionary } from "./kk";
import { ru } from "./ru";

export type Lang = "kk" | "ru";
export type { Dictionary };

const dictionaries: Record<Lang, Dictionary> = { kk, ru };
const STORAGE_KEY = "sary-balapan-lang";
const listeners = new Set<() => void>();
let memoryLang: Lang | null = null;

function readLang(): Lang {
  if (memoryLang) return memoryLang;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "ru" ? "ru" : "kk";
  } catch {
    return "kk";
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeLang(lang: Lang) {
  memoryLang = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* хранилище недоступно — язык остаётся в памяти */
  }
  listeners.forEach((l) => l());
}

/** Текущий язык интерфейса (по умолчанию — казахский). */
export function useLang() {
  const lang = useSyncExternalStore(subscribe, readLang, () => "kk" as Lang);
  const setLang = useCallback((next: Lang) => writeLang(next), []);
  return { lang, t: dictionaries[lang], setLang };
}

/** Синхронизирует <html lang> и заголовок вкладки с выбранным языком. */
export function useDocumentLang() {
  const { lang, t } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
  }, [lang, t]);
}
