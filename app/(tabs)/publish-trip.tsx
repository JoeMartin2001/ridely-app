import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const PublishTrip = () => {
  const { t } = useTranslation();

  const cardColor = useThemeColor({}, "card");

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <Header title={t("publish")} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PublishTrip;
