import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import { SearchTripCard } from "@/components/home/SearchTripCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function HomeScreen() {
  const { t } = useTranslation();

  const tintColor = useThemeColor({}, "tint");
  const taglineColor = useThemeColor({}, "tagline");

  return (
    <ThemedView style={styles.container} applyTopInsets>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText style={[styles.brandTitle, { color: tintColor }]}>
            Ridely
          </ThemedText>
          <ThemedText style={[styles.tagline, { color: taglineColor }]}>
            {t("home_hero_subtitle")}
          </ThemedText>
        </View>

        <SearchTripCard />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
  contentContainer: {
    flexGrow: 1,
    paddingTop: 64,
    paddingBottom: 40,
    paddingHorizontal: 20,
    gap: 24,
  },
  header: {
    gap: 8,
  },
  brandTitle: {
    fontFamily: Fonts.rounded,
    fontWeight: "bold",
    fontSize: 56,
    lineHeight: 56,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  tagline: {
    fontSize: 24,
    fontFamily: Fonts.rounded,
    letterSpacing: 0.5,
    textAlign: "center",
  },
});
