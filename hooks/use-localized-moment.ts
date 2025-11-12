import { DEFAULT_LANGUAGE } from "@/lib/i18n";
import { configureMoment } from "@/lib/i18n/moment-setup";
import moment from "moment";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useLocalizedMoment = () => {
  const { i18n } = useTranslation();

  // Get current language and configure moment
  const lang = (i18n.language || DEFAULT_LANGUAGE).split("-")[0];
  const currentLanguage = lang === "uz" ? "uz-latn" : lang;

  configureMoment(currentLanguage);

  // console.log(`Current date in Uzbek Latin: ${moment().format("LLLL")}`);

  console.log(`Current language: ${currentLanguage}`);

  // Wrapper functions that automatically use current locale
  const localizedMoment = useCallback(
    (input?: moment.MomentInput) => {
      return moment(input).locale(currentLanguage);
    },
    [currentLanguage]
  );

  const formatDate = useCallback(
    (date: Date | string, format?: string) => {
      return moment(date).locale(currentLanguage).format(format);
    },
    [currentLanguage]
  );

  const fromNow = useCallback(
    (date: Date | string) => {
      return moment(date).locale(currentLanguage).fromNow();
    },
    [currentLanguage]
  );

  const calendar = useCallback(
    (date: Date | string) => {
      return moment(date).locale(currentLanguage).calendar();
    },
    [currentLanguage]
  );

  const isSameDay = useCallback(
    (date1: Date | string, date2: Date | string) => {
      return moment(date1).isSame(moment(date2), "day");
    },
    []
  );

  return {
    moment: localizedMoment,
    formatDate,
    fromNow,
    calendar,
    isSameDay,
    currentLocale: currentLanguage,
  };
};
