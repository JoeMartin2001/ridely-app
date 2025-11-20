import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "../ui/icon-symbol";

type Props = {
  type: "booked" | "published";
};

export const EmptyTripsView = ({ type }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  const handlePress = () => {
    if (type === "booked") {
      router.push("/"); // Go to search
    } else {
      router.push("/publish-trip"); // Go to publish
    }
  };

  return (
    <ThemedView
      style={styles.container}
      lightColor={cardColor}
      darkColor={cardColor}
    >
      <View style={styles.content}>
        <View
          style={[styles.illustration, { backgroundColor: textColor + "10" }]}
        >
          <IconSymbol
            name={type === "booked" ? "car.fill" : "steeringwheel"}
            size={64}
            color={textColor}
          />
        </View>

        <View style={styles.textContainer}>
          <ThemedText style={styles.title} type="title">
            {t(
              type === "booked"
                ? "my_trips_empty_booked_title"
                : "my_trips_empty_published_title"
            )}
          </ThemedText>

          <ThemedText style={styles.description}>
            {t(
              type === "booked"
                ? "my_trips_empty_booked_description"
                : "my_trips_empty_published_description"
            )}
          </ThemedText>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.ctaButton, { backgroundColor: tintColor }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <ThemedText
          style={styles.ctaText}
          type="defaultSemiBold"
          lightColor="#FFFFFF"
          darkColor="#FFFFFF"
        >
          {t(
            type === "booked"
              ? "my_trips_empty_booked_cta"
              : "my_trips_empty_published_cta"
          )}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: "30%",
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    gap: 24,
  },
  illustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  textContainer: {
    gap: 8,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
  },
  description: {
    textAlign: "center",
    maxWidth: 280,
    opacity: 0.6,
    lineHeight: 22,
  },
  ctaButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaText: {
    fontSize: 16,
  },
});
