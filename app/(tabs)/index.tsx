import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";

import { HomeCategoryTabs } from "@/components/home/home-category-tabs";
import { HomeHeader } from "@/components/home/home-header";
import { MenuItemRow } from "@/components/home/menu-item-row";
import { MenuSectionHeader } from "@/components/home/menu-section-header";
import { ThemedView } from "@/components/themed-view";
import { Divider } from "@/components/ui/divider";
import { useAppSelector } from "@/lib/store";
import { MenuItem } from "@/lib/types/MenuItem";
import { router } from "expo-router";

export default function HomeScreen() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("best-sellers");
  const { menuItems } = useAppSelector((state) => state.menuItems);

  const categories = useMemo(
    () => [
      { id: "best-sellers", label: t("home_category_best_sellers") },
      { id: "coffee", label: t("home_category_coffee") },
      { id: "other-coffee", label: t("home_category_other_coffee") },
      { id: "offers", label: t("home_category_offers") },
    ],
    [t]
  );

  const handlePressMenuItem = (menuItem: MenuItem) => {
    router.push({
      pathname: "/menu-item-details",
      params: { id: menuItem.id },
    });
  };

  const handlePressSearch = () => {
    router.push("/menu-search");
  };

  return (
    <ThemedView style={styles.container} applyTopInsets>
      <HomeHeader onPressSearch={handlePressSearch} />

      <HomeCategoryTabs
        categories={categories}
        activeCategoryId={activeCategory}
        onSelect={setActiveCategory}
      />

      <FlatList
        keyExtractor={(item) => item.id}
        data={menuItems}
        renderItem={({ item }) => (
          <MenuItemRow item={item} onPress={handlePressMenuItem} />
        )}
        ItemSeparatorComponent={() => <Divider direction="horizontal" />}
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={() => (
          <MenuSectionHeader
            iconName="star"
            title={t("home_section_best_sellers")}
          />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    paddingBottom: 120,
  },
});
