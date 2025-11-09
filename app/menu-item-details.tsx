import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { MenuItemIngredient } from "@/components/menu-item-details/MenuItemIngredient";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Divider } from "@/components/ui/divider";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppSelector } from "@/lib/store";

type SizeOption = {
  id: string;
  label: string;
  addon: number;
};

type IngredientOption = {
  id: string;
  label: string;
  price: number;
};

type IngredientGroup = {
  id: string;
  title: string;
  items: IngredientOption[];
};

export default function MenuItemDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { menuItems } = useAppSelector((state) => state.menuItems);

  const { t } = useTranslation();
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");
  const cardColor = useThemeColor({}, "card");
  const backgroundColor = useThemeColor({}, "card");
  const textColorReverse = useThemeColor({}, "textReverse");

  const menuItem = useMemo(
    () => menuItems.find((item) => item.id === id) ?? null,
    [id, menuItems]
  );

  const sizeOptions: SizeOption[] = useMemo(
    () => [
      { id: "medium", label: t("menu_item_size_medium"), addon: 0 },
      { id: "large", label: t("menu_item_size_large"), addon: 6000 },
      { id: "xxl", label: t("menu_item_size_xxl"), addon: 9000 },
    ],
    [t]
  );

  const [selectedSize, setSelectedSize] = useState<string>(
    sizeOptions[1]?.id ?? "medium"
  );

  const ingredientGroups: IngredientGroup[] = useMemo(
    () => [
      {
        id: "syrups",
        title: t("menu_item_group_syrups"),
        items: [
          {
            id: "vanilla-syrup",
            label: t("menu_item_ing_vanilla_syrup"),
            price: 10000,
          },
          {
            id: "macaron-syrup",
            label: t("menu_item_ing_macaron_syrup"),
            price: 10000,
          },
          {
            id: "mint-syrup",
            label: t("menu_item_ing_mint_syrup"),
            price: 6000,
          },
          {
            id: "cookie-syrup",
            label: t("menu_item_ing_cookie_syrup"),
            price: 10000,
          },
          {
            id: "hazelnut-syrup",
            label: t("menu_item_ing_hazelnut_syrup"),
            price: 10000,
          },
          {
            id: "coconut-syrup",
            label: t("menu_item_ing_coconut_syrup"),
            price: 10000,
          },
          {
            id: "caramel-syrup",
            label: t("menu_item_ing_caramel_syrup"),
            price: 10000,
          },
          {
            id: "almond-syrup",
            label: t("menu_item_ing_almond_syrup"),
            price: 10000,
          },
          {
            id: "cinnamon-syrup",
            label: t("menu_item_ing_cinnamon_syrup"),
            price: 10000,
          },
          {
            id: "irish-cream-syrup",
            label: t("menu_item_ing_irish_cream_syrup"),
            price: 6000,
          },
          {
            id: "salted-caramel-syrup",
            label: t("menu_item_ing_salted_caramel_syrup"),
            price: 10000,
          },
        ],
      },
      {
        id: "coffee",
        title: t("menu_item_group_coffee"),
        items: [
          {
            id: "sugar-substitute",
            label: t("menu_item_ing_sugar_substitute"),
            price: 0,
          },
          {
            id: "sugar-medium",
            label: t("menu_item_ing_sugar_medium"),
            price: 0,
          },
          { id: "hot", label: t("menu_item_ing_hot"), price: 0 },
          { id: "cinnamon", label: t("menu_item_ing_cinnamon"), price: 0 },
          { id: "cream", label: t("menu_item_ing_cream"), price: 7500 },
          { id: "milk", label: t("menu_item_ing_milk"), price: 0 },
          { id: "warm", label: t("menu_item_ing_warm"), price: 0 },
        ],
      },
    ],
    [t]
  );

  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const extrasTotal = useMemo(() => {
    return ingredientGroups.reduce((total, group) => {
      return (
        total +
        group.items.reduce((groupTotal, item) => {
          if (selectedExtras.includes(item.id)) {
            return groupTotal + item.price;
          }
          return groupTotal;
        }, 0)
      );
    }, 0);
  }, [ingredientGroups, selectedExtras]);

  if (!menuItem) {
    return (
      <ThemedView style={styles.fallbackContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <ThemedText type="subtitle" style={styles.fallbackTitle}>
          {t("menu_item_not_found")}
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={[styles.fallbackButton, { backgroundColor: tintColor }]}
        >
          <ThemedText style={styles.fallbackButtonText}>
            {t("menu_item_back_to_menu")}
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const selectedSizeOption =
    sizeOptions.find((option) => option.id === selectedSize) ?? sizeOptions[0];
  const totalPrice = menuItem.price + selectedSizeOption.addon + extrasTotal;
  const formattedBasePrice = t("price_with_currency", {
    price: menuItem.price.toLocaleString(),
  });
  const formattedTotalPrice = t("price_with_currency", {
    price: totalPrice.toLocaleString(),
  });

  const formatPlainPrice = (value: number) => {
    return t("price_with_currency", {
      price: value.toLocaleString(),
    });
  };

  const renderAddonLabel = (addon: number) => {
    if (addon === 0) {
      return t("menu_item_size_included");
    }

    const formattedAddon = addon.toLocaleString();
    return t("menu_item_size_addon", { amount: formattedAddon });
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: menuItem.image }}
            contentFit="cover"
            style={styles.heroImage}
            transition={200}
          />

          <View style={styles.heroActions}>
            <Pressable
              accessibilityRole="button"
              style={[styles.heroButton, { backgroundColor: backgroundColor }]}
            >
              <IconSymbol name="heart" size={20} color={iconColor} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.back()}
              style={[styles.heroButton, { backgroundColor: backgroundColor }]}
            >
              <IconSymbol name="xmark" size={20} color={iconColor} />
            </Pressable>
          </View>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.titleRow}>
            <ThemedText type="subtitle" style={styles.itemTitle}>
              {menuItem.name}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.itemPrice}>
              {formattedBasePrice}
            </ThemedText>
          </View>
          <ThemedText style={styles.itemSubtitle}>
            {menuItem.description}
          </ThemedText>
        </View>

        <View style={styles.sectionDivider}>
          <Divider direction="horizontal" />
        </View>

        <View style={styles.sizeSection}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            {t("menu_item_size_label")}
          </ThemedText>

          <View style={styles.sizeOptions}>
            {sizeOptions.map((option) => {
              const isSelected = option.id === selectedSize;

              return (
                <Pressable
                  key={option.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setSelectedSize(option.id)}
                  style={[
                    styles.sizeCard,
                    {
                      borderColor: isSelected ? tintColor : "transparent",
                      backgroundColor: cardColor,
                    },
                    isSelected && { shadowColor: tintColor },
                  ]}
                >
                  <IconSymbol
                    name="cup.and.saucer.fill"
                    size={36}
                    color={isSelected ? tintColor : iconColor}
                  />

                  <ThemedText type="defaultSemiBold" style={styles.sizeLabel}>
                    {option.label}
                  </ThemedText>

                  <ThemedText style={styles.sizeAddon}>
                    {renderAddonLabel(option.addon)}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionDivider}>
          <Divider direction="horizontal" />
        </View>

        <View style={styles.ingredientsSection}>
          <ThemedText type="defaultSemiBold" style={styles.ingredientsTitle}>
            {t("menu_item_ingredients_title")}
          </ThemedText>

          {ingredientGroups.map((group, index) => (
            <View key={group.id} style={styles.ingredientGroup}>
              <ThemedText
                type="defaultSemiBold"
                style={styles.ingredientGroupTitle}
              >
                {group.title}
              </ThemedText>

              {group.items.map((item, index) => {
                const isChecked = selectedExtras.includes(item.id);

                return (
                  <MenuItemIngredient
                    key={item.id}
                    label={item.label}
                    priceLabel={formatPlainPrice(item.price)}
                    checked={isChecked}
                    onToggle={() => toggleExtra(item.id)}
                    showDivider={index !== group.items.length - 1}
                  />
                );
              })}

              {index !== ingredientGroups.length - 1 && (
                <View style={styles.sectionDivider}>
                  <Divider direction="horizontal" />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.ctaContainer, { backgroundColor: cardColor }]}>
        <Pressable
          accessibilityRole="button"
          style={[styles.addButton, { backgroundColor: tintColor }]}
        >
          <ThemedText
            style={[styles.addButtonPrice, { color: textColorReverse }]}
          >
            {formattedTotalPrice}
          </ThemedText>

          <ThemedText
            style={[styles.addButtonLabel, { color: textColorReverse }]}
          >
            {t("home_add_to_cart")}
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  heroContainer: {
    position: "relative",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: 280,
  },
  heroActions: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
  },
  contentSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  itemTitle: {
    fontSize: 26,
    flex: 1,
    lineHeight: 32,
  },
  itemPrice: {
    fontSize: 18,
  },
  itemSubtitle: {
    marginTop: 8,
    opacity: 0.72,
    fontSize: 15,
    lineHeight: 22,
  },
  sectionDivider: {
    marginVertical: 24,
  },
  sizeSection: {
    paddingHorizontal: 24,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    letterSpacing: 0.4,
  },
  sizeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  sizeCard: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  sizeLabel: {
    fontSize: 15,
    textTransform: "capitalize",
  },
  sizeAddon: {
    fontSize: 13,
    opacity: 0.7,
  },
  ingredientsSection: {
    paddingHorizontal: 10,
  },
  ingredientsTitle: {
    fontSize: 22,
    marginBottom: 16,
  },
  ingredientGroup: {},
  ingredientGroupTitle: {
    fontSize: 16,
    letterSpacing: 0.3,
  },
  ctaContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#000",
    shadowRadius: 12,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -6 },
    elevation: 8,
  },
  addButton: {
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  addButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  addButtonPrice: {
    fontSize: 18,
    fontWeight: "700",
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    paddingHorizontal: 32,
  },
  fallbackTitle: {
    textAlign: "center",
  },
  fallbackButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
  },
  fallbackButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
