import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("menu"),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="fork.knife" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favourites"
        options={{
          title: t("favourites"),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="heart.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: t("wallet"),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="qrcode.viewfinder" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: t("profile"),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
