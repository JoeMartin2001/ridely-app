import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CalendarLocales } from "@/constants/calendar";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

type CalendarDate = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

type CalendarMarkedDates = Record<
  string,
  {
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
    disableTouchEvent?: boolean;
  }
>;

type CalendarTheme = Record<string, string | number | undefined>;

LocaleConfig.locales.en = CalendarLocales.en;
LocaleConfig.locales.ru = CalendarLocales.ru;
LocaleConfig.locales.uz = CalendarLocales.uz;

const SelectTripDate = () => {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const localeKey =
      i18n.language in CalendarLocales
        ? (i18n.language as keyof typeof CalendarLocales)
        : "en";

    LocaleConfig.defaultLocale = localeKey;
  }, [i18n.language]);

  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const textReverse = useThemeColor({}, "textReverse");
  const taglineColor = useThemeColor({}, "tagline");

  const markedDates = useMemo<CalendarMarkedDates>(() => {
    if (!selectedDate) {
      return {};
    }

    return {
      [selectedDate]: {
        selected: true,
        selectedColor: tintColor,
        selectedTextColor: textReverse,
      },
    };
  }, [selectedDate, textReverse, tintColor]);

  const calendarTheme = useMemo<CalendarTheme>(
    () => ({
      ...calendarThemeStyles,
      calendarBackground: backgroundColor,
      textSectionTitleColor: textColor,
      selectedDayBackgroundColor: tintColor,
      selectedDayTextColor: textReverse,
      dayTextColor: textColor,
      todayTextColor: tintColor,
      textDisabledColor: taglineColor,
      monthTextColor: textColor,
      arrowColor: tintColor,
      indicatorColor: tintColor,
    }),
    [backgroundColor, taglineColor, textColor, textReverse, tintColor]
  );

  const localeForHeader = useMemo(() => {
    switch (i18n.language) {
      case "ru":
        return "ru-RU";
      case "uz":
        return "uz-UZ";
      default:
        return "en-US";
    }
  }, [i18n.language]);

  const renderMonthHeader = useCallback(
    (date: any) => {
      const baseDate =
        date instanceof Date
          ? date
          : new Date(date.getFullYear(), date.getMonth(), date.getDate());

      const formatter = new Intl.DateTimeFormat(localeForHeader, {
        month: "long",
        year: "numeric",
      });
      const formatted = formatter.format(baseDate);

      return (
        <View style={styles.monthHeader}>
          <ThemedText style={styles.monthHeaderText}>{formatted}</ThemedText>
        </View>
      );
    },
    [localeForHeader]
  );

  const handleDayPress = useCallback((day: CalendarDate) => {
    setSelectedDate(day.dateString);
  }, []);

  return (
    <ThemedView style={[styles.container, { backgroundColor }]} applyTopInsets>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("common_close")}
          hitSlop={12}
          onPress={() => router.back()}
        >
          <MaterialIcons name="close" size={28} color={textColor} />
        </Pressable>
      </View>

      <View style={styles.titleWrapper}>
        <ThemedText style={styles.title}>{t("trip_date_title")}</ThemedText>
      </View>

      <CalendarList
        style={styles.calendarList}
        contentContainerStyle={styles.calendarListContent}
        firstDay={1}
        pastScrollRange={0}
        futureScrollRange={12}
        scrollEnabled
        showScrollIndicator
        hideArrows
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={calendarTheme}
        renderHeader={renderMonthHeader}
      />
    </ThemedView>
  );
};

const calendarThemeStyles: CalendarTheme = {
  textDayFontFamily: Fonts.rounded,
  textDayFontSize: 16,
  textDayFontWeight: "500",
  textMonthFontFamily: Fonts.rounded,
  textMonthFontSize: 22,
  textMonthFontWeight: "700",
  textDayHeaderFontFamily: Fonts.rounded,
  textDayHeaderFontSize: 14,
  textDayHeaderFontWeight: "600",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 32,
  },
  header: {
    alignItems: "flex-start",
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  titleWrapper: {
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: Fonts.rounded,
  },
  calendarList: {},
  calendarListContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  monthHeader: {
    alignItems: "flex-start",
    paddingTop: 24,
    paddingBottom: 12,
    width: "100%",
  },
  monthHeaderText: {
    fontSize: 20,
    textTransform: "capitalize",
  },
});

export default SelectTripDate;
