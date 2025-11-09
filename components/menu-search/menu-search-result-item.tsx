import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { MenuItem } from "@/lib/types/MenuItem";
import { useTranslation } from "react-i18next";

type MenuSearchResultItemProps = {
  item: MenuItem;
  onPress: (item: MenuItem) => void;
};

export const MenuSearchResultItem = ({
  item,
  onPress,
}: MenuSearchResultItemProps) => {
  const { t } = useTranslation();

  return (
    <Pressable
      style={styles.container}
      accessibilityRole="button"
      onPress={() => onPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />

      <View style={styles.info}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {item.name}
        </ThemedText>

        <ThemedText style={styles.price}>
          {t("price_with_currency", { price: item.price.toLocaleString() })}
        </ThemedText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 16,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ccc",
  },
  info: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
  },
  price: {
    fontSize: 14,
    opacity: 0.8,
  },
});


