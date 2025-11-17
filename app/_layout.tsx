import "@/lib/i18n";

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { Providers } from "@/lib/providers";
import { useTranslation } from "react-i18next";
import { StatusBar } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { t } = useTranslation();

  return (
    <Providers>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(auth)/phone-otp"
              options={{ headerShown: false, presentation: "fullScreenModal" }}
            />

            <Stack.Screen
              name="menu-item-details"
              options={{
                presentation: "modal",
                title: t("menu_item_details"),
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="switch-language"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="menu-search" options={{ headerShown: false }} />
            <Stack.Screen
              name="edit-profile"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="location-search"
              options={{
                presentation: "fullScreenModal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="select-trip-date"
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />
            <Stack.Screen
              name="passenger-count"
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />
            <Stack.Screen
              name="(publish-trip)/seat-price"
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />

            <Stack.Screen
              name="trip-results"
              options={{ headerShown: false }}
            />
          </Stack>
        </SafeAreaProvider>
      </GestureHandlerRootView>

      <StatusBar />
    </Providers>
  );
}
