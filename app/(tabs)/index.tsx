import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type GestureResponderEvent,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BorderRadius, Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useLocalizedMoment } from "@/hooks/use-localized-moment";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setFromDistrict,
  setToDistrict,
} from "@/lib/store/features/find-trip/findTripSlice";
import { setSearchQuery } from "@/lib/store/features/location-search/locationSearchSlice";
import { router } from "expo-router";
import { useMemo } from "react";

type SearchField = {
  key: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  value?: string;
  onPress?: (event: GestureResponderEvent) => void;
  showSwapButton?: boolean;
  onSwapButtonPress?: (event: GestureResponderEvent) => void;
};

export default function HomeScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { calendar: formatCalendar } = useLocalizedMoment();

  const { from, to, date, passengersCount } = useAppSelector(
    (state) => state.findTrip
  );

  const cardColor = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const textOnTint = useThemeColor({}, "textOnTint");
  const dividerColor = useThemeColor({}, "divider");
  const iconColor = useThemeColor({}, "icon");
  const taglineColor = useThemeColor({}, "tagline");
  const fieldIconBackground = useThemeColor({}, "surfaceMuted");

  const fields: SearchField[] = useMemo(() => {
    const passengersValue =
      passengersCount.toString() ?? t("home_field_passengers_value");

    return [
      {
        key: "from",
        icon: "my-location",
        label: t("home_field_from"),
        value: from.name ?? undefined,
        onPress: () => {
          dispatch(setSearchQuery(from.name ?? ""));
          router.push("/location-search?type=from");
        },
        showSwapButton: from.id !== "" || to.id !== "",
        onSwapButtonPress: () => {
          dispatch(setFromDistrict({ id: to.id, name: to.name }));
          dispatch(setToDistrict({ id: from.id, name: from.name }));
        },
      },
      {
        key: "to",
        icon: "location-on",
        label: t("home_field_to"),
        value: to.name ?? undefined,
        onPress: () => {
          dispatch(setSearchQuery(to.name ?? ""));
          router.push("/location-search?type=to");
        },
      },
      {
        key: "date",
        icon: "event",
        label: t("home_field_date"),
        value: formatCalendar(date),
        onPress: () => router.push("/select-trip-date"),
      },
      {
        key: "passengers",
        icon: "people",
        label: t("home_field_passengers"),
        value: passengersValue,
        onPress: () => router.push("/passenger-count"),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, date, passengersCount, formatCalendar, t]);

  const handleSearch = () => {
    router.push("/trip-results");
  };

  return (
    <ThemedView style={styles.container} applyTopInsets>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText style={[styles.brandTitle, { color: tintColor }]}>
            Ridely
          </ThemedText>
          <ThemedText style={[styles.tagline, { color: taglineColor }]}>
            {t("home_hero_subtitle")}
          </ThemedText>
        </View>

        <View
          style={[
            styles.searchCard,
            Shadows.xxxs,
            { backgroundColor: cardColor, borderColor: dividerColor },
          ]}
        >
          {fields.map((field, index) => {
            const isLast = index === fields.length - 1;

            return (
              <Pressable
                key={field.key}
                android_ripple={{ color: dividerColor }}
                style={[
                  styles.fieldRow,
                  !isLast && {
                    borderBottomColor: dividerColor,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  },
                ]}
                onPress={field.onPress}
              >
                <View
                  style={[
                    styles.fieldIconWrapper,
                    { backgroundColor: fieldIconBackground },
                  ]}
                >
                  <MaterialIcons
                    name={field.icon}
                    size={22}
                    color={iconColor}
                  />
                </View>

                <View style={styles.fieldContent}>
                  <ThemedText style={styles.fieldLabel}>
                    {field.label}
                  </ThemedText>

                  {field.value ? (
                    <ThemedText
                      style={[styles.fieldValue, { color: iconColor }]}
                    >
                      {field.value}
                    </ThemedText>
                  ) : null}
                </View>

                {field.showSwapButton ? (
                  <Pressable onPress={field.onSwapButtonPress}>
                    <MaterialIcons
                      name="swap-vert"
                      size={30}
                      color={tintColor}
                    />
                  </Pressable>
                ) : (
                  <MaterialIcons
                    name="chevron-right"
                    size={22}
                    color={iconColor}
                  />
                )}
              </Pressable>
            );
          })}

          <Pressable
            style={[styles.searchButton, { backgroundColor: tintColor }]}
            android_ripple={{ color: "rgba(255,255,255,0.2)" }}
            onPress={handleSearch}
          >
            <ThemedText
              style={[styles.searchButtonText, { color: textOnTint }]}
            >
              {t("home_primary_cta")}
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
  contentContainer: {
    flexGrow: 1,
    paddingTop: 64,
    paddingBottom: 40,
    paddingHorizontal: 20,
    gap: 24,
  },
  header: {
    gap: 8,
  },
  brandTitle: {
    fontFamily: Fonts.rounded,
    fontWeight: "bold",
    fontSize: 56,
    lineHeight: 56,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  tagline: {
    fontSize: 24,
    fontFamily: Fonts.rounded,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  searchCard: {
    borderRadius: BorderRadius.card,
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
    paddingHorizontal: 20,
  },
  fieldIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.card,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContent: {
    flex: 1,
    gap: 2,
  },
  fieldLabel: {
    fontSize: 16,
    fontFamily: Fonts.rounded,
  },
  fieldValue: {
    fontSize: 14,
  },
  searchButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: BorderRadius.card,
    borderBottomRightRadius: BorderRadius.card,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
