import React, { useCallback, useMemo } from "react";
import {
  FlatList,
  FlatListProps,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type CalendarDate = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

type CalendarMarkedDate = {
  selected?: boolean;
  selectedColor?: string;
  selectedTextColor?: string;
  disableTouchEvent?: boolean;
};

type CalendarMarkedDates = Record<string, CalendarMarkedDate>;

type CalendarTheme = Partial<{
  calendarBackground: string;
  textSectionTitleColor: string;
  selectedDayBackgroundColor: string;
  selectedDayTextColor: string;
  dayTextColor: string;
  todayTextColor: string;
  textDisabledColor: string;
  monthTextColor: string;
  textDayFontFamily: string;
  textDayFontSize: number;
  textDayFontWeight: TextStyle["fontWeight"];
  textDayHeaderFontFamily: string;
  textDayHeaderFontSize: number;
  textDayHeaderFontWeight: TextStyle["fontWeight"];
  textMonthFontFamily: string;
  textMonthFontSize: number;
  textMonthFontWeight: TextStyle["fontWeight"];
}>;

type DayCell = {
  key: string;
  label?: string;
  isoDate?: string;
  date?: Date;
  isPlaceholder?: boolean;
  isDisabled?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  selectedColor?: string;
  selectedTextColor?: string;
  disableTouchEvent?: boolean;
};

type CalendarListProps = {
  minDate?: string;
  maxDate?: string;
  firstDay?: number;
  pastScrollRange?: number;
  futureScrollRange?: number;
  markedDates?: CalendarMarkedDates;
  onDayPress?: (date: CalendarDate) => void;
  disableAllTouchEventsForDisabledDays?: boolean;
  renderHeader?: (date: Date) => React.ReactNode;
  theme?: CalendarTheme;
  weekDayNames?: string[];
  locale?: string;
} & Omit<FlatListProps<Date>, "data" | "renderItem" | "keyExtractor">;

const defaultWeekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const defaultTheme: Required<
  Pick<
    CalendarTheme,
    | "calendarBackground"
    | "textSectionTitleColor"
    | "selectedDayBackgroundColor"
    | "selectedDayTextColor"
    | "dayTextColor"
    | "todayTextColor"
    | "textDisabledColor"
    | "monthTextColor"
  >
> = {
  calendarBackground: "transparent",
  textSectionTitleColor: "#8F8F94",
  selectedDayBackgroundColor: "#2563EB",
  selectedDayTextColor: "#FFFFFF",
  dayTextColor: "#1C1C1E",
  todayTextColor: "#2563EB",
  textDisabledColor: "#A1A1AA",
  monthTextColor: "#1C1C1E",
};

const normalizeISODate = (date?: string) => {
  if (!date) {
    return undefined;
  }
  return date.split("T")[0] ?? date;
};

const createUTCDate = (year: number, month: number, day: number) =>
  new Date(Date.UTC(year, month, day));

const parseISODate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return createUTCDate(year, month - 1, day);
};

const formatISODate = (date: Date) => date.toISOString().split("T")[0];

const getStartOfMonth = (date: Date) =>
  createUTCDate(date.getUTCFullYear(), date.getUTCMonth(), 1);

const addMonths = (date: Date, months: number) =>
  getStartOfMonth(
    createUTCDate(date.getUTCFullYear(), date.getUTCMonth() + months, 1)
  );

const chunk = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const buildMonthCells = ({
  monthDate,
  firstDay,
  minDateISO,
  maxDateISO,
  todayISO,
  markedDates,
  disableAllTouchEventsForDisabledDays,
}: {
  monthDate: Date;
  firstDay: number;
  minDateISO?: string;
  maxDateISO?: string;
  todayISO: string;
  markedDates: CalendarMarkedDates;
  disableAllTouchEventsForDisabledDays: boolean;
}): DayCell[] => {
  const year = monthDate.getUTCFullYear();
  const month = monthDate.getUTCMonth();
  const firstOfMonth = createUTCDate(year, month, 1);
  const firstWeekday = (firstOfMonth.getUTCDay() - firstDay + 7) % 7;
  const daysInMonth = createUTCDate(year, month + 1, 0).getUTCDate();

  const cells: DayCell[] = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push({
      key: `placeholder-${month}-${i}`,
      isPlaceholder: true,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const currentDate = createUTCDate(year, month, day);
    const isoDate = formatISODate(currentDate);
    const markedDate = markedDates[isoDate];
    const isBeforeMin = minDateISO ? isoDate < minDateISO : false;
    const isAfterMax = maxDateISO ? isoDate > maxDateISO : false;
    const isOutOfRange = isBeforeMin || isAfterMax;

    const isDisabled = isOutOfRange || Boolean(markedDate?.disableTouchEvent);

    const disableTouchEvent =
      Boolean(markedDate?.disableTouchEvent) ||
      (disableAllTouchEventsForDisabledDays && isOutOfRange);

    cells.push({
      key: isoDate,
      label: String(day),
      isoDate,
      date: currentDate,
      isDisabled,
      isToday: isoDate === todayISO,
      isSelected: Boolean(markedDate?.selected),
      selectedColor: markedDate?.selectedColor,
      selectedTextColor: markedDate?.selectedTextColor,
      disableTouchEvent,
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({
      key: `placeholder-${month}-${cells.length}`,
      isPlaceholder: true,
    });
  }

  return cells;
};

export const CalendarList: React.FC<CalendarListProps> = ({
  minDate,
  maxDate,
  firstDay = 0,
  pastScrollRange = 0,
  futureScrollRange = 0,
  markedDates = {},
  onDayPress,
  disableAllTouchEventsForDisabledDays = false,
  renderHeader,
  theme,
  weekDayNames,
  locale = "en-US",
  style: listStyle,
  contentContainerStyle,
  ...flatListProps
}) => {
  const minDateISO = normalizeISODate(minDate);
  const maxDateISO = normalizeISODate(maxDate);
  const todayISO = useMemo(() => {
    const now = new Date();
    const utcDate = createUTCDate(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );
    return formatISODate(utcDate);
  }, []);

  const effectiveTheme = useMemo(() => {
    const merged: CalendarTheme = { ...defaultTheme, ...theme };
    return merged;
  }, [theme]);

  const {
    calendarBackground = defaultTheme.calendarBackground,
    textSectionTitleColor = defaultTheme.textSectionTitleColor,
    selectedDayBackgroundColor = defaultTheme.selectedDayBackgroundColor,
    selectedDayTextColor = defaultTheme.selectedDayTextColor,
    dayTextColor = defaultTheme.dayTextColor,
    todayTextColor = defaultTheme.todayTextColor,
    textDisabledColor = defaultTheme.textDisabledColor,
    monthTextColor = defaultTheme.monthTextColor,
    textDayFontFamily,
    textDayFontSize,
    textDayFontWeight,
    textDayHeaderFontFamily,
    textDayHeaderFontSize,
    textDayHeaderFontWeight,
    textMonthFontFamily,
    textMonthFontSize,
    textMonthFontWeight,
  } = effectiveTheme;

  const normalizedWeekDayNames = useMemo(() => {
    const names = weekDayNames ?? defaultWeekDayNames;
    const rotated = names.slice(firstDay).concat(names.slice(0, firstDay));
    return rotated;
  }, [weekDayNames, firstDay]);

  const baseDate = useMemo(() => {
    if (minDateISO) {
      return getStartOfMonth(parseISODate(minDateISO));
    }
    return getStartOfMonth(new Date());
  }, [minDateISO]);

  const months = useMemo(() => {
    const data: Date[] = [];
    for (let i = pastScrollRange; i > 0; i -= 1) {
      data.push(addMonths(baseDate, -i));
    }
    data.push(baseDate);
    for (let i = 1; i <= futureScrollRange; i += 1) {
      data.push(addMonths(baseDate, i));
    }
    return data;
  }, [baseDate, pastScrollRange, futureScrollRange]);

  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }),
    [locale]
  );

  const renderMonth = useCallback(
    ({ item: monthDate }: { item: Date }) => {
      const cells = buildMonthCells({
        monthDate,
        firstDay,
        minDateISO,
        maxDateISO,
        todayISO,
        markedDates,
        disableAllTouchEventsForDisabledDays,
      });

      const weeks = chunk(cells, 7);

      return (
        <View style={styles.monthContainer}>
          <View style={styles.monthHeaderContainer}>
            {renderHeader ? (
              renderHeader(monthDate)
            ) : (
              <View style={styles.monthHeader}>
                <Text
                  style={[
                    styles.monthHeaderText,
                    { color: monthTextColor },
                    textMonthFontFamily && { fontFamily: textMonthFontFamily },
                    textMonthFontSize != null
                      ? { fontSize: textMonthFontSize }
                      : undefined,
                    textMonthFontWeight && { fontWeight: textMonthFontWeight },
                  ]}
                >
                  {monthFormatter.format(monthDate)}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.weekDaysRow}>
            {normalizedWeekDayNames.map((name) => (
              <View style={styles.weekDayCell} key={name}>
                <Text
                  style={[
                    styles.weekDayText,
                    { color: textSectionTitleColor },
                    textDayHeaderFontFamily && {
                      fontFamily: textDayHeaderFontFamily,
                    },
                    textDayHeaderFontSize != null
                      ? { fontSize: textDayHeaderFontSize }
                      : undefined,
                    textDayHeaderFontWeight && {
                      fontWeight: textDayHeaderFontWeight,
                    },
                  ]}
                >
                  {name}
                </Text>
              </View>
            ))}
          </View>

          {weeks.map((week, weekIndex) => (
            <View style={styles.weekRow} key={`week-${weekIndex}`}>
              {week.map((day) => {
                if (day.isPlaceholder) {
                  return <View style={styles.dayWrapper} key={day.key} />;
                }

                const isDisabled = Boolean(day.isDisabled);
                const isSelected = Boolean(day.isSelected);
                const textColor = (() => {
                  if (isSelected) {
                    return day.selectedTextColor ?? selectedDayTextColor;
                  }
                  if (isDisabled) {
                    return textDisabledColor;
                  }
                  if (day.isToday) {
                    return todayTextColor;
                  }
                  return dayTextColor;
                })();

                const backgroundColorValue = isSelected
                  ? day.selectedColor ?? selectedDayBackgroundColor
                  : "transparent";

                const handlePress = () => {
                  if (!day.isoDate || !day.date || !onDayPress) {
                    return;
                  }

                  onDayPress({
                    dateString: day.isoDate,
                    day: day.date.getUTCDate(),
                    month: day.date.getUTCMonth() + 1,
                    year: day.date.getUTCFullYear(),
                    timestamp: day.date.getTime(),
                  });
                };

                return (
                  <View style={styles.dayWrapper} key={day.key}>
                    <Pressable
                      style={[
                        styles.dayButton,
                        {
                          backgroundColor: backgroundColorValue,
                          opacity: isDisabled ? 0.5 : 1,
                        },
                      ]}
                      disabled={isDisabled || day.disableTouchEvent}
                      onPress={handlePress}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          {
                            color: textColor,
                            textDecorationLine: isDisabled
                              ? "line-through"
                              : "none",
                          },
                          textDayFontFamily && {
                            fontFamily: textDayFontFamily,
                          },
                          textDayFontSize != null
                            ? { fontSize: textDayFontSize }
                            : undefined,
                          textDayFontWeight && {
                            fontWeight: textDayFontWeight,
                          },
                        ]}
                      >
                        {day.label}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      );
    },
    [
      disableAllTouchEventsForDisabledDays,
      markedDates,
      maxDateISO,
      minDateISO,
      monthFormatter,
      normalizedWeekDayNames,
      onDayPress,
      selectedDayBackgroundColor,
      selectedDayTextColor,
      textDayFontFamily,
      textDayFontSize,
      textDayFontWeight,
      textDayHeaderFontFamily,
      textDayHeaderFontSize,
      textDayHeaderFontWeight,
      textDisabledColor,
      textSectionTitleColor,
      todayTextColor,
      monthTextColor,
      dayTextColor,
      todayISO,
      textMonthFontFamily,
      textMonthFontSize,
      textMonthFontWeight,
      renderHeader,
      firstDay,
    ]
  );

  const combinedListStyle = useMemo(
    () =>
      StyleSheet.flatten([
        { backgroundColor: calendarBackground },
        listStyle,
      ]) as ViewStyle | undefined,
    [calendarBackground, listStyle]
  );

  const combinedContentStyle = useMemo(
    () =>
      StyleSheet.flatten([styles.listContent, contentContainerStyle]) as
        | ViewStyle
        | undefined,
    [contentContainerStyle]
  );

  return (
    <FlatList
      data={months}
      keyExtractor={(item) => `${item.getUTCFullYear()}-${item.getUTCMonth()}`}
      renderItem={renderMonth}
      style={combinedListStyle as StyleProp<ViewStyle>}
      contentContainerStyle={combinedContentStyle}
      showsVerticalScrollIndicator={false}
      {...flatListProps}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  monthContainer: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  monthHeaderContainer: {
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  monthHeader: {
    alignItems: "flex-start",
    paddingTop: 24,
    paddingBottom: 12,
  },
  monthHeaderText: {
    fontSize: 20,
    textTransform: "capitalize",
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekDayCell: {
    flex: 1,
    alignItems: "center",
  },
  weekDayText: {
    fontSize: 12,
    textTransform: "uppercase",
    opacity: 0.8,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dayWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  dayButton: {
    width: 44,
    height: 44,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export type { CalendarDate, CalendarMarkedDates, CalendarTheme };
