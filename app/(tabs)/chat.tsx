import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { PhoneOTPView } from "@/components/auth/PhoneOTPView";
import { EmptyFavouritesView } from "@/components/favourites/EmptyFavouritesView";
import { FavouriteItem } from "@/components/favourites/FavouriteItem";
import { ThemedView } from "@/components/themed-view";
import { Divider } from "@/components/ui/divider";
import { Header } from "@/components/ui/header";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppSelector } from "@/lib/store";
import { Favourite } from "@/lib/types";
import { useTranslation } from "react-i18next";

export default function ChatScreen() {
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");

  const { user } = useAppSelector((state) => state.user);
  const { favourites } = useAppSelector((state) => state.favourites);

  const handlePress = (favourite: Favourite) => {
    console.log("Open favourite", favourite.menuItemId);
  };

  if (!user) return <PhoneOTPView />;

  if (favourites.length === 0) {
    return <EmptyFavouritesView />;
  }

  return (
    <ThemedView
      style={[styles.screen, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <Header title={t("favourites")} />

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FavouriteItem favourite={item} onPress={handlePress} />
        )}
        style={{ backgroundColor }}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider direction="horizontal" />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flatList: {},
  flatListContainer: {
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 10,
    paddingBottom: 48,
  },
});
