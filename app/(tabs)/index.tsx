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
import { Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { router } from "expo-router";

type SearchField = {
  key: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  value?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function HomeScreen() {
  const { t } = useTranslation();

  const cardColor = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const textOnTint = useThemeColor({}, "textReverse");
  const dividerColor = useThemeColor({}, "divider");
  const iconColor = useThemeColor({}, "icon");
  const taglineColor = useThemeColor({}, "tagline");
  const chipBackground = useThemeColor({}, "accentSurface");
  const chipBorder = useThemeColor({}, "accentSurfaceBorder");
  const fieldIconBackground = useThemeColor({}, "surfaceMuted");

  const fields: SearchField[] = [
    {
      key: "from",
      icon: "radio-button-unchecked",
      label: t("home_field_from"),
      onPress: () => router.push("/location-search"),
    },
    {
      key: "to",
      icon: "radio-button-unchecked",
      label: t("home_field_to"),
      onPress: () => router.push("/location-search"),
    },
    {
      key: "date",
      icon: "calendar-today",
      label: t("home_field_date"),
      value: t("home_field_date_value"),
    },
    {
      key: "passengers",
      icon: "person",
      label: t("home_field_passengers"),
      value: t("home_field_passengers_value"),
      onPress: () => router.push("/passenger-count"),
    },
  ];

  const quickRoutes = [
    "Tashkent → Samarkand",
    "Samarkand → Bukhara",
    "Fergana → Tashkent",
  ];

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

        <View style={styles.quickRoutesSection}>
          <ThemedText style={styles.quickRoutesHeading}>
            {t("home_quick_shortcuts")}
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickRoutesList}
          >
            {quickRoutes.map((route) => (
              <Pressable
                key={route}
                style={[
                  styles.quickRouteChip,
                  { backgroundColor: chipBackground, borderColor: chipBorder },
                ]}
                android_ripple={{ color: "rgba(10,126,164,0.12)" }}
              >
                <ThemedText style={styles.quickRouteText}>{route}</ThemedText>
              </Pressable>
            ))}
          </ScrollView>
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

                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color={iconColor}
                />
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
    paddingVertical: 24,
    // paddingHorizontal: 16,
    gap: 24,
  },
  header: {
    gap: 8,
    paddingHorizontal: 16,
  },
  brandTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 40,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 16,
    lineHeight: 24,
  },
  quickRoutesSection: {
    gap: 12,
  },
  quickRoutesHeading: {
    fontFamily: Fonts.rounded,
    fontSize: 18,
    paddingHorizontal: 16,
  },
  quickRoutesList: {
    gap: 12,
    paddingHorizontal: 16,
  },
  quickRouteChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 12,
  },
  quickRouteText: {
    fontSize: 14,
    fontWeight: "600",
  },
  searchCard: {
    marginHorizontal: 16,
    borderRadius: 28,
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
  },
  fieldIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
