import { DEFAULT_LANGUAGE } from "@/lib/i18n";
import {
  formatDayDate,
  formatDayDateWithYear,
} from "@/lib/i18n/moment-formatters";
import { configureMoment } from "@/lib/i18n/moment-setup";
import moment from "moment";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useLocalizedMoment = () => {
  const { t, i18n } = useTranslation();

  // Get current language and configure moment
  const lang = (i18n.language || DEFAULT_LANGUAGE).split("-")[0];
  const currentLanguage = lang === "uz" ? "uz-latn" : lang;

  configureMoment(currentLanguage);

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

  const smartCalendar = useCallback(
    (
      date: Date | string,
      options?: { showTime?: boolean; showYear?: boolean }
    ) => {
      const { showTime = false, showYear = false } = options || {};
      const m = moment(date).locale(currentLanguage);
      const now = moment().locale(currentLanguage);

      const diffDays = m.diff(now, "days");

      // Today
      if (m.isSame(now, "day")) {
        return showTime
          ? `[${t("common_today")}] ${m.format("LT")}`
          : t("common_today");
      }

      // Tomorrow
      if (diffDays === 1 && m.isSame(now.clone().add(1, "day"), "day")) {
        return showTime
          ? `[${t("common_tomorrow")}] ${m.format("LT")}`
          : t("common_tomorrow");
      }

      // Yesterday
      if (diffDays === -1 && m.isSame(now.clone().subtract(1, "day"), "day")) {
        return showTime
          ? `[${t("common_yesterday")}] ${m.format("LT")}`
          : t("common_yesterday");
      }

      // Within the same week
      if (Math.abs(diffDays) <= 6) {
        if (showYear) {
          return formatDayDateWithYear(date, currentLanguage);
        }

        return formatDayDate(date, currentLanguage);
      }

      // Future dates beyond a week
      if (showYear) {
        return formatDayDateWithYear(date, currentLanguage);
      }

      return formatDayDate(date, currentLanguage);
    },
    [currentLanguage, t]
  );

  // Original calendar function for backward compatibility
  const calendarFormats = useMemo(() => {
    return {
      sameDay: `[${t("common_today")}]`,
      nextDay: `[${t("common_tomorrow")}]`,
      lastDay: `[${t("common_yesterday")}]`,
      nextWeek: "ddd Do MMM",
      lastWeek: "ddd Do MMM",
      sameElse: "ddd Do MMM YYYY",
    };
  }, [t]);

  const calendar = useCallback(
    (date: Date | string) => {
      return moment(date)
        .locale(currentLanguage)
        .calendar(null, calendarFormats);
    },
    [currentLanguage, calendarFormats]
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
    smartCalendar,
    calendar,
    isSameDay,
    currentLocale: currentLanguage,
  };
};
