import { Tabs, router } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const { authUser } = useAuthContext();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 8,
          marginTop: 3,
        },
        tabBarIconStyle: {
          width: 28,
          height: 26,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("search"),
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="magnifyingglass" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="publish-trip"
        options={{
          title: t("publish"),
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="plus.circle.fill" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (!authUser) {
              e.preventDefault();

              router.push("/phone-otp");
            }
          },
        }}
      />

      <Tabs.Screen
        name="my-trips"
        options={{
          title: t("my_trips"),
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="car.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: t("chat"),
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="message.fill" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (!authUser) {
              e.preventDefault();

              router.push("/phone-otp");
            }
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: t("profile"),
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="person.fill" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (!authUser) {
              e.preventDefault();

              router.push("/phone-otp");
            }
          },
        }}
      />
    </Tabs>
  );
}
