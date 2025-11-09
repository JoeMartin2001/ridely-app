import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { MenuItem } from "@/lib/types/MenuItem";
import { useTranslation } from "react-i18next";

type MenuItemRowProps = {
  item: MenuItem;
  onPress?: (menuItem: MenuItem) => void;
};

export const MenuItemRow = ({ item, onPress }: MenuItemRowProps) => {
  const { t } = useTranslation();

  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const cardColor = useThemeColor({}, "card");

  const formattedPrice = t("price_with_currency", {
    price: item.price.toLocaleString(),
  });

  return (
    <Pressable onPress={() => onPress?.(item)} style={[styles.container]}>
      <View style={styles.content}>
        <View style={styles.details}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {item.name}
          </ThemedText>
          <ThemedText numberOfLines={2} style={styles.description}>
            {item.description}
          </ThemedText>

          <View style={styles.actionsRow}>
            <ThemedText
              type="defaultSemiBold"
              style={[styles.price, { color: textColor }]}
            >
              {formattedPrice}
            </ThemedText>

            <View
              accessibilityRole="button"
              style={[
                styles.addButton,
                { borderColor: tintColor, backgroundColor: cardColor },
              ]}
            >
              <IconSymbol name="plus" size={16} color={tintColor} />
              <ThemedText style={[styles.addLabel, { color: tintColor }]}>
                {t("home_add_to_cart")}
              </ThemedText>
            </View>
          </View>
        </View>

        <Image
          source={{ uri: item.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  content: {
    flexDirection: "row",
    gap: 16,
  },
  details: {
    flex: 1,
    gap: 10,
  },
  title: {
    fontSize: 18,
  },
  description: {
    opacity: 0.72,
    fontSize: 14,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  price: {
    fontSize: 18,
    letterSpacing: 0.3,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  addLabel: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
});
