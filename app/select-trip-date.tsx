import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  CalendarDate,
  CalendarList,
  CalendarMarkedDates,
  CalendarTheme,
} from "@/components/ui/calendar-list";
import { CalendarLocales } from "@/constants/calendar";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setDate } from "@/lib/store/features/find-trip/findTripSlice";
import {
  setDate as setPublishDate,
} from "@/lib/store/features/publish-trip/publishTripSlice";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";

const todayISO = moment().format("YYYY-MM-DD");

const SelectTripDate = () => {
  const { t, i18n } = useTranslation();
  const { context = "find" } = useLocalSearchParams();

  const findTripDate = useAppSelector((state) => state.findTrip.date);
  const publishTripDate = useAppSelector((state) => state.publishTrip.date);
  const selectedDate =
    context === "publish" ? publishTripDate : findTripDate;

  const dispatch = useAppDispatch();

  const localeKey = useMemo(
    () =>
      i18n.language in CalendarLocales
        ? (i18n.language as keyof typeof CalendarLocales)
        : "en",
    [i18n.language]
  );

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
    }),
    [backgroundColor, taglineColor, textColor, textReverse, tintColor]
  );

  const localeForHeader = useMemo(() => {
    switch (i18n.language) {
      case "ru":
        return "ru-RU";
      case "uz":
        return "uz-latn-UZ";
      default:
        return "en-US";
    }
  }, [i18n.language]);

  const renderMonthHeader = useCallback(
    (date: Date) => {
      const formatter = new Intl.DateTimeFormat(localeForHeader, {
        month: "long",
        year: "numeric",
      });
      const formatted = formatter.format(date);

      return (
        <View style={styles.monthHeader}>
          <ThemedText style={styles.monthHeaderText}>{formatted}</ThemedText>
        </View>
      );
    },
    [localeForHeader]
  );

  const handleDayPress = useCallback(
    (day: CalendarDate) => {
      if (context === "publish") {
        dispatch(setPublishDate(day.dateString));
      } else {
        dispatch(setDate(day.dateString));
      }
      router.back();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context]
  );

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
        minDate={todayISO}
        style={styles.calendarList}
        contentContainerStyle={styles.calendarListContent}
        firstDay={1}
        weekDayNames={[...CalendarLocales[localeKey].dayNamesShort]}
        pastScrollRange={0}
        futureScrollRange={1}
        scrollEnabled
        locale={localeForHeader}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={calendarTheme}
        renderHeader={renderMonthHeader}
        disableAllTouchEventsForDisabledDays
        removeClippedSubviews={true}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        windowSize={3}
      />
    </ThemedView>
  );
};

const calendarThemeStyles: CalendarTheme = {
  textDayFontFamily: Fonts.rounded,
  textDayFontSize: 14,
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
    paddingTop: 16,
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
