import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Divider } from "@/components/ui/divider";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppSelector } from "@/lib/store";
import { MenuItem } from "@/lib/types/MenuItem";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import { MenuSearchResultItem } from "../components/menu-search/menu-search-result-item";

const MenuSearch = () => {
  const { t } = useTranslation();
  const { menuItems } = useAppSelector((state) => state.menuItems);
  const [query, setQuery] = useState("");
  const inputRef = useRef<TextInput>(null);

  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");

  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => clearTimeout(focusTimeout);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    if (!normalizedQuery) {
      return menuItems;
    }

    return menuItems.filter((item) =>
      item.name.toLowerCase().includes(normalizedQuery)
    );
  }, [menuItems, normalizedQuery]);

  const handleSelectItem = (item: MenuItem) => {
    router.push({
      pathname: "/menu-item-details",
      params: { id: item.id },
    });
  };

  const handlePressClose = () => {
    if (query.length === 0) {
      router.back();
      return;
    }

    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <View style={[styles.searchBar, { backgroundColor: cardColor }]}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <IconSymbol name="chevron.backward" size={22} color={iconColor} />
        </Pressable>

        <View
          style={[styles.searchInputWrapper, { backgroundColor: cardColor }]}
        >
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            placeholder={t("menu_search_placeholder")}
            placeholderTextColor={iconColor}
            style={[styles.searchInput, { color: textColor }]}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
        </View>

        {query.length > 0 && (
          <Pressable
            accessibilityRole="button"
            onPress={handlePressClose}
            style={styles.closeButton}
          >
            <IconSymbol name="xmark" size={22} color={iconColor} />
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={[styles.flatList, { backgroundColor }]}
        contentContainerStyle={styles.resultsContentContainer}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparator}>
            <Divider direction="horizontal" />
          </View>
        )}
        renderItem={({ item }) => (
          <MenuSearchResultItem item={item} onPress={handleSelectItem} />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <ThemedText type="defaultSemiBold" style={styles.emptyStateTitle}>
              {t("menu_search_empty_title")}
            </ThemedText>
            <ThemedText style={styles.emptyStateSubtitle}>
              {t("menu_search_empty_subtitle")}
            </ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  closeButton: {
    padding: 8,
  },
  flatList: {},
  resultsContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  itemSeparator: {
    marginHorizontal: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyStateTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  emptyStateSubtitle: {
    fontSize: 15,
    opacity: 0.7,
    textAlign: "center",
    paddingHorizontal: 24,
  },
});

export default MenuSearch;
