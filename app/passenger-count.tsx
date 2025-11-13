import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  decrementPassengersCount,
  incrementPassengersCount,
} from "@/lib/store/features/find-trip/findTripSlice";

const minPassengers = 1;
const maxPassengers = 8;

export default function PassengerCountScreen() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { passengersCount } = useAppSelector((state) => state.findTrip);

  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const dividerColor = useThemeColor({}, "divider");
  const textOnTint = useThemeColor({}, "textOnTint");

  const handleDecrease = () => {
    if (passengersCount === minPassengers) {
      return;
    }

    dispatch(decrementPassengersCount());
  };

  const handleIncrease = () => {
    if (passengersCount === maxPassengers) {
      return;
    }

    dispatch(incrementPassengersCount());
  };

  const handleConfirm = () => {
    router.back();
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]} applyTopInsets>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("common_close")}
          hitSlop={12}
          onPress={() => router.back()}
        >
          <MaterialIcons name="close" size={28} color={textColor} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <ThemedText style={styles.title}>
          {t("home_passenger_title")}
        </ThemedText>

        <View style={[styles.counterCard]}>
          <Pressable
            style={[
              styles.counterButton,
              {
                borderColor:
                  passengersCount === minPassengers ? dividerColor : tintColor,
              },
              passengersCount === minPassengers && styles.counterButtonDisabled,
            ]}
            onPress={handleDecrease}
            disabled={passengersCount === minPassengers}
            android_ripple={{ color: tintColor }}
          >
            <MaterialIcons
              name="remove"
              size={28}
              color={
                passengersCount === minPassengers ? dividerColor : tintColor
              }
            />
          </Pressable>

          <ThemedText style={styles.counterValue}>{passengersCount}</ThemedText>

          <Pressable
            style={[
              styles.counterButton,
              {
                borderColor:
                  passengersCount === maxPassengers ? dividerColor : tintColor,
              },
              passengersCount === maxPassengers && styles.counterButtonDisabled,
            ]}
            onPress={handleIncrease}
            android_ripple={{ color: tintColor }}
            disabled={passengersCount === maxPassengers}
          >
            <MaterialIcons
              name="add"
              size={28}
              color={
                passengersCount === maxPassengers ? dividerColor : tintColor
              }
            />
          </Pressable>
        </View>
      </View>

      <Pressable
        style={[
          styles.confirmButton,
          { backgroundColor: tintColor },
          Shadows.xxs,
        ]}
        onPress={handleConfirm}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      >
        <ThemedText style={[styles.confirmText, { color: textOnTint }]}>
          {t("home_passenger_confirm")}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 40,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: Fonts.rounded,
  },
  counterCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 32,
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 24,
  },
  counterButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  counterButtonDisabled: {
    opacity: 0.4,
  },
  counterValue: {
    fontSize: 48,
    fontFamily: Fonts.rounded,
  },
  confirmButton: {
    borderRadius: 28,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
