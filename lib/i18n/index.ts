// src/i18n/index.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import uz from "./locales/uz.json";

export type Language = "en" | "uz" | "ru";

export const DEFAULT_LANGUAGE = "ru";

// Configure available locales
export const SUPPORTED_LOCALES = {
  ru: "ru",
  uz: "uz",
  en: "en-gb", // or 'en' depending on your needs
} as const;

const resources: Record<Language, { translation: Record<string, string> }> = {
  en: { translation: en },
  uz: { translation: uz },
  ru: { translation: ru },
};

const i18n = createInstance();

i18n
  .use({
    type: "languageDetector",
    async: true,
    init: () => {},
    detect: async (callback: (language: string) => void) => {
      try {
        const storedLanguage = await AsyncStorage.getItem("user-language");
        if (storedLanguage) {
          return callback(storedLanguage);
        }
        // const deviceLanguage = Localization.getLocales()[0]?.languageCode;
        callback(DEFAULT_LANGUAGE); // Fallback to English
      } catch (error) {
        console.error("Error detecting language:", error);
        callback(DEFAULT_LANGUAGE);
      }
    },
    cacheUserLanguage: async (language: string) => {
      try {
        await AsyncStorage.setItem("user-language", language);
      } catch (error) {
        console.error("Error caching language:", error);
      }
    },
  })
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE, // Fallback language if detection fails
    debug: true, // Set to false in production
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
