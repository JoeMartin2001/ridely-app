import { Favourite } from "@/lib/types";
import { Image } from "expo-image";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "../ui/icon-symbol";

type Props = {
  favourite: Favourite;
  onPress: (favourite: Favourite) => void;
  onRemove?: (favourite: Favourite) => void;
};

export const FavouriteItem = ({ favourite, onPress, onRemove }: Props) => {
  const item = favourite.menuItem;
  const swipeableRef = useRef<any | null>(null);
  const { t } = useTranslation();

  if (!item) {
    return null;
  }

  const handlePress = () => {
    onPress(favourite);
  };

  const handleRemove = () => {
    swipeableRef.current?.close();
    onRemove?.(favourite);
  };

  const renderRightActions = () => (
    <Pressable
      onPress={handleRemove}
      style={styles.deleteAction}
      android_ripple={{ color: "rgba(255,255,255,0.25)" }}
      accessibilityRole="button"
      accessibilityLabel={t("favourites_remove_accessibility")}
    >
      <IconSymbol name="trash.fill" size={24} color="#ffffff" />
      <ThemedText
        style={styles.deleteText}
        lightColor="#ffffff"
        darkColor="#ffffff"
      >
        {t("favourites_remove")}
      </ThemedText>
    </Pressable>
  );

  const formattedPrice = t("price_with_currency", {
    price: item.price.toLocaleString("ru-RU"),
  });
  const displayName = `${item.name} *`;

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={20}
      overshootRight={false}
    >
      <ThemedView style={styles.wrapper}>
        <Pressable
          onPress={handlePress}
          style={styles.content}
          android_ripple={{ color: "#3a3a3c" }}
        >
          <View style={styles.textContainer}>
            <ThemedText style={styles.title} type="defaultSemiBold">
              {displayName}
            </ThemedText>
            <ThemedText style={styles.price}>{formattedPrice}</ThemedText>
          </View>

          <Image
            source={{ uri: item.image }}
            style={styles.thumbnail}
            contentFit="cover"
            transition={200}
          />
        </Pressable>
      </ThemedView>
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    opacity: 0.75,
  },
  thumbnail: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  deleteAction: {
    width: 96,
    backgroundColor: "#ff3b30",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
