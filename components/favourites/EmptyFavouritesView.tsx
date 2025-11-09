import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "../ui/icon-symbol";

export const EmptyFavouritesView = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { t } = useTranslation();
  const accentColor = useThemeColor(
    { light: "#151718", dark: "#ffffff" },
    "text"
  );
  const buttonBackground = useThemeColor(
    { light: "#151718", dark: "#ffffff" },
    "text"
  );

  const handleGoToMenu = () => {
    navigation.navigate("index");
  };

  return (
    <ThemedView
      style={styles.container}
      darkColor="#151718"
      lightColor="#f5f5f5"
    >
      <View style={styles.content}>
        <ThemedText style={styles.heading} type="subtitle">
          {t("favourites_empty_heading")}
        </ThemedText>

        <View style={[styles.illustration, { borderColor: accentColor }]}>
          <IconSymbol
            name="cup.and.saucer.fill"
            size={88}
            color={accentColor}
          />
        </View>

        <ThemedText style={styles.title} type="title">
          {t("favourites_empty_title")}
        </ThemedText>

        <ThemedText style={styles.description}>
          {t("favourites_empty_description")}
        </ThemedText>
      </View>

      <Pressable
        onPress={handleGoToMenu}
        style={[styles.ctaButton, { backgroundColor: buttonBackground }]}
        accessibilityRole="button"
      >
        <ThemedText
          style={styles.ctaText}
          type="defaultSemiBold"
          darkColor="#151718"
          lightColor="#ffffff"
        >
          {t("favourites_empty_cta")}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  heading: {
    textAlign: "center",
  },
  illustration: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    maxWidth: 280,
    opacity: 0.8,
  },
  ctaButton: {
    borderRadius: 32,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
});
