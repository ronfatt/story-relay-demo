"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Language } from "@/lib/i18n";

const STORAGE_KEY = "storybah_lang";
const SUPPORTED_LANGS: Language[] = ["en", "ms", "zh"];

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  hydrated: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored && SUPPORTED_LANGS.includes(stored)) {
        setLanguageState(stored);
      }
    } finally {
      setHydrated(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // no-op
    }
  };

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // no-op
    }
  }, [hydrated, language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      hydrated
    }),
    [language, hydrated]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

