import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "../ui/icon-symbol";

export const EmptyChatView = () => {
  const { t } = useTranslation();
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");

  return (
    <ThemedView
      style={styles.container}
      lightColor={cardColor}
      darkColor={cardColor}
    >
      <View style={styles.content}>
        <View style={[styles.illustration, { borderColor: textColor }]}>
          <IconSymbol name="message.fill" size={88} color={textColor} />
        </View>

        <ThemedText style={styles.title} type="title">
          {t("chat_empty_title")}
        </ThemedText>

        <ThemedText style={styles.description}>
          {t("chat_empty_description")}
        </ThemedText>
      </View>
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
