"use client";

import { createContext, useContext, useState } from "react";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("pt");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  const translations = language === "pt" ? pt : en;

  return (
    <LanguageContext.Provider
      value={{ language, translations, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
