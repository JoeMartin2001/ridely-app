// lib/i18n/moment-setup.ts
import moment from "moment";
import "moment/locale/en-gb";
import "moment/locale/ru";
import "moment/locale/uz";
import "moment/locale/uz-latn";

import { DEFAULT_LANGUAGE, SUPPORTED_LOCALES } from ".";

export const configureMoment = (language: string) => {
  const locale =
    SUPPORTED_LOCALES[language as keyof typeof SUPPORTED_LOCALES] ||
    DEFAULT_LANGUAGE;

  moment.locale(locale === "uz" ? "uz-latn" : locale);
};

// Initialize with default locale
configureMoment(DEFAULT_LANGUAGE);
