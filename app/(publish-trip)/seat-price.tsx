import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  decrementSeatPrice,
  incrementSeatPrice,
} from "@/lib/store/features/publish-trip/publishTripSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const minPrice = 10000;
const maxPrice = 1000000;

export default function SeatPriceScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const { seatPrice } = useAppSelector((state) => state.publishTrip);

  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const dividerColor = useThemeColor({}, "divider");
  const textOnTint = useThemeColor({}, "textOnTint");

  const handleDecrease = () => {
    if (seatPrice <= minPrice) {
      return;
    }

    dispatch(decrementSeatPrice());
  };

  const handleIncrease = () => {
    if (seatPrice >= maxPrice) {
      return;
    }

    dispatch(incrementSeatPrice());
  };

  const handleConfirm = () => {
    router.back();
  };

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor, paddingBottom: insets.bottom + 32 },
      ]}
    >
      <Header title={t("seat_price_title")} onGoBack={() => router.back()} />

      <View style={styles.content}>
        <ThemedText style={styles.title}>{t("seat_price_title")}</ThemedText>

        <View style={[styles.counterCard]}>
          <Pressable
            style={[
              styles.counterButton,
              {
                borderColor: seatPrice <= minPrice ? dividerColor : tintColor,
              },
              seatPrice <= minPrice && styles.counterButtonDisabled,
            ]}
            onPress={handleDecrease}
            disabled={seatPrice <= minPrice}
            android_ripple={{ color: tintColor }}
          >
            <MaterialIcons
              name="remove"
              size={28}
              color={seatPrice <= minPrice ? dividerColor : tintColor}
            />
          </Pressable>

          <View style={styles.priceContainer}>
            <ThemedText
              style={styles.priceValue}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.5}
            >
              {seatPrice.toLocaleString()}
            </ThemedText>
            <ThemedText
              style={styles.currencyLabel}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {t("currency_uzs")}
            </ThemedText>
          </View>

          <Pressable
            style={[
              styles.counterButton,
              {
                borderColor: seatPrice >= maxPrice ? dividerColor : tintColor,
              },
              seatPrice >= maxPrice && styles.counterButtonDisabled,
            ]}
            onPress={handleIncrease}
            android_ripple={{ color: tintColor }}
          >
            <MaterialIcons name="add" size={28} color={tintColor} />
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
  },
  header: {
    alignItems: "flex-start",
    paddingTop: 16,
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
    paddingHorizontal: 16,
    gap: 12,
  },
  counterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  counterButtonDisabled: {
    opacity: 0.4,
  },
  priceContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 4,
    minWidth: 0,
    maxWidth: "100%",
  },
  priceValue: {
    fontSize: 32,
    fontFamily: Fonts.rounded,
    textAlign: "center",
    flexShrink: 1,
    maxWidth: "100%",
  },
  currencyLabel: {
    fontSize: 16,
    opacity: 0.7,
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
