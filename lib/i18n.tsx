"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "es" | "en";
const LangContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "es",
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  return (
    <LangContext.Provider value={{ lang, toggle: () => setLang(l => l === "es" ? "en" : "es") }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() { return useContext(LangContext); }

export function T({ es, en }: { es: ReactNode; en: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "es" ? es : en}</>;
}
