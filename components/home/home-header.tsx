import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTranslation } from "react-i18next";

type HomeHeaderProps = {
  onPressFulfillment?: () => void;
  onPressSearch?: () => void;
};

export const HomeHeader = ({
  onPressFulfillment,
  onPressSearch,
}: HomeHeaderProps) => {
  const cardColor = useThemeColor({}, "card");
  const iconColor = useThemeColor({}, "icon");
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        onPress={onPressFulfillment}
        style={styles.fulfillmentButton}
      >
        <ThemedText type="defaultSemiBold" style={styles.fulfillmentLabel}>
          {t("home_pickup")}
        </ThemedText>
        <IconSymbol name="chevron.down" size={16} color={iconColor} />
      </Pressable>

      <Pressable
        accessibilityLabel={t("home_search_accessibility")}
        accessibilityRole="button"
        onPress={onPressSearch}
        style={[styles.actionButton, { backgroundColor: cardColor }]}
      >
        <IconSymbol name="magnifyingglass" size={20} color={iconColor} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 12,
  },
  fulfillmentButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  fulfillmentLabel: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  branchButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  branchIcon: {
    marginRight: 8,
  },
  branchLabel: {
    flex: 1,
    fontSize: 15,
  },
  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
});
