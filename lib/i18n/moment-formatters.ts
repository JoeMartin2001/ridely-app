// lib/i18n/moment-formatters.ts
import moment from "moment";

// Custom function to format dates as "Fr 14th Nov"
export const formatDayDate = (date: Date | string, locale: string): string => {
  const m = moment(date).locale(locale);

  // Get the day abbreviation (Fr, Sat, Sun, etc.)
  const dayAbbr = m.format("ddd");

  // Get the date with ordinal (14th, 1st, 2nd, 3rd, etc.)
  const dateWithOrdinal = m.format("Do");

  // Get the month abbreviation (Nov, Dec, Jan, etc.)
  const monthAbbr = m.format("MMM");

  return `${dayAbbr} ${dateWithOrdinal} ${monthAbbr}`;
};

// For dates with year: "Fr 14th Nov 2024"
export const formatDayDateWithYear = (
  date: Date | string,
  locale: string
): string => {
  const m = moment(date).locale(locale);
  return `${m.format("ddd")} ${m.format("Do")} ${m.format("MMM YYYY")}`;
};
