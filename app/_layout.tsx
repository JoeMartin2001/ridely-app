import "@/lib/i18n";

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { Providers } from "@/lib/providers";
import { StatusBar } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <Providers>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <Stack>
            {/* Tab-based Layouts */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Switch Language */}
            <Stack.Screen
              name="switch-language"
              options={{ headerShown: false }}
            />

            {/* Edit Profile */}
            <Stack.Screen
              name="edit-profile"
              options={{ headerShown: false }}
            />

            {/* Location Search */}
            <Stack.Screen
              name="location-search"
              options={{
                presentation: "fullScreenModal",
                headerShown: false,
              }}
            />

            {/* Select Trip Date */}
            <Stack.Screen
              name="select-trip-date"
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />

            {/* Passenger Count */}
            <Stack.Screen
              name="passenger-count"
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />

            {/* Auth Layouts */}
            <Stack.Screen
              name="(auth)/phone-otp"
              options={{ headerShown: false, presentation: "fullScreenModal" }}
            />

            {/* Seat Price */}
            <Stack.Screen
              name="(publish-trip)/seat-price"
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />

            {/* Trip Results */}
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
