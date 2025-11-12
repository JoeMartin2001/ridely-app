import { PhoneOTPView } from "@/components/auth/PhoneOTPView";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppSelector } from "@/lib/store";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const MyTripsScreen = () => {
  const { t } = useTranslation();

  const cardColor = useThemeColor({}, "card");

  const { user } = useAppSelector((state) => state.user);

  if (!user) return <PhoneOTPView />;

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <Header title={t("my_trips")} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyTripsScreen;
