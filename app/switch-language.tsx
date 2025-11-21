import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { useThemeColor } from "@/hooks/use-theme-color";
import { DEFAULT_LANGUAGE, type Language } from "@/lib/i18n";
import { router } from "expo-router";

type LanguageOption = {
  code: Language;
  labelKey: string;
  nativeKey: string;
  flag: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: "en",
    labelKey: "language_option_en_label",
    nativeKey: "language_option_en_native",
    flag: "🇺🇸",
  },
  {
    code: "uz",
    labelKey: "language_option_uz_label",
    nativeKey: "language_option_uz_native",
    flag: "🇺🇿",
  },
  {
    code: "ru",
    labelKey: "language_option_ru_label",
    nativeKey: "language_option_ru_native",
    flag: "🇷🇺",
  },
];

const hexToRgba = (hexColor: string, alpha: number) => {
  const hex = hexColor.replace("#", "");
  if (!(hex.length === 3 || hex.length === 6)) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  const normalized =
    hex.length === 3
      ? hex
          .split("")
          .map((char) => char + char)
          .join("")
      : hex;

  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SwitchLanguageScreen = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.language || DEFAULT_LANGUAGE).split(
    "-"
  )[0] as Language;

  const cardColor = useThemeColor({}, "card");
  const backgroundColor = useThemeColor({}, "background");
  const dividerColor = useThemeColor({}, "divider");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  const options = useMemo(
    () =>
      LANGUAGE_OPTIONS.map((option) => ({
        ...option,
        label: t(option.labelKey),
        nativeLabel: t(option.nativeKey),
      })),
    [t]
  );

  const activeBackground = useMemo(
    () =>
      typeof tintColor === "string"
        ? hexToRgba(tintColor, 0.12)
        : "rgba(0,0,0,0.12)",
    [tintColor]
  );

  const handleSelect = useCallback(
    async (code: Language) => {
      if (code === currentLanguage) return;
      try {
        await i18n.changeLanguage(code);
      } catch (error) {
        console.warn("Failed to change language", error);
      }
    },
    [currentLanguage, i18n]
  );

  const renderOption = useCallback(
    (option: (typeof options)[number], index: number) => {
      const isActive = option.code === currentLanguage;

      const onPress = (event: GestureResponderEvent) => {
        event.preventDefault();
        console.log(`Selecting language: ${option.code}`);
        handleSelect(option.code);
      };

      return (
        <View key={option.code}>
          <Pressable
            onPress={onPress}
            style={({ pressed }) => [
              styles.row,
              {
                backgroundColor: isActive ? activeBackground : cardColor,
              },
              pressed && styles.rowPressed,
            ]}
            android_ripple={{ color: dividerColor }}
          >
            <View style={styles.labels}>
              <ThemedText style={[styles.label, { color: textColor }]}>
                {option.flag} {option.label}
              </ThemedText>
              <ThemedText style={styles.nativeLabel}>
                {option.nativeLabel}
              </ThemedText>
            </View>
            {isActive && (
              <MaterialIcons name="check" size={22} color={tintColor} />
            )}
          </Pressable>
          {index < options.length - 1 && (
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />
          )}
        </View>
      );
    },
    [
      activeBackground,
      cardColor,
      currentLanguage,
      dividerColor,
      handleSelect,
      options,
      textColor,
      tintColor,
    ]
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardColor }]}>
      <Header title={t("profile_language")} onGoBack={() => router.back()} />

      <ScrollView
        contentContainerStyle={[styles.contentContainer, { backgroundColor }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <ThemedText style={styles.sectionHeading}>
            {t("language_interface_heading")}
          </ThemedText>
          <View
            style={[
              styles.optionList,
              { backgroundColor: cardColor, borderColor: dividerColor },
            ]}
          >
            {options.map((option, index) => renderOption(option, index))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 24,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionHeading: {
    fontSize: 13,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    opacity: 0.7,
  },
  optionList: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  rowPressed: {
    opacity: 0.85,
  },
  labels: {
    gap: 4,
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
  },
  nativeLabel: {
    fontSize: 15,
    opacity: 0.6,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },
});

export default SwitchLanguageScreen;
