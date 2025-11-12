import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type ListRenderItem,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Divider } from "@/components/ui/divider";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useGetDistrictsByNameQuery } from "@/lib/services/districts/regionsApi";

type LocationSuggestion = {
  id: string;
  title: string;
  subtitle: string;
};

const LocationSearch = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const inputRef = useRef<TextInput>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const { data: districts = [], isLoading: isLoadingDistricts } =
    useGetDistrictsByNameQuery(normalizedQuery, {
      // skip: normalizedQuery.length === 0,
      pollingInterval: 1000,
    });

  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const dividerColor = useThemeColor({}, "divider");
  const placeholderColor = useThemeColor({}, "tagline");

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const suggestions = useMemo(() => {
    return districts.map((item) => ({
      id: item.id,
      title: item.name_uz,
      subtitle: item.region?.name_uz || "",
    }));
  }, [districts]);

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter((item) =>
      `${item.title} ${item.subtitle}`.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery, suggestions]);

  const handleClear = () => {
    if (query.length === 0) {
      router.back();
      return;
    }

    setQuery("");
    inputRef.current?.focus();
  };

  const handleSearchChange = (text: string) => {
    setQuery(text);
  };

  const renderItem: ListRenderItem<LocationSuggestion> = ({ item }) => {
    return (
      <Pressable
        style={styles.resultRow}
        android_ripple={{ color: dividerColor }}
        onPress={() => router.back()}
      >
        <View style={styles.resultTextWrapper}>
          <ThemedText style={styles.resultTitle}>{item.title}</ThemedText>
          <ThemedText style={styles.resultSubtitle}>{item.subtitle}</ThemedText>
        </View>

        <IconSymbol name="chevron.right" size={22} color={iconColor} />
      </Pressable>
    );
  };

  return (
    <ThemedView style={[styles.container]} applyTopInsets>
      <View style={[styles.searchBar, { borderBottomColor: dividerColor }]}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <IconSymbol name="chevron.backward" size={22} color={iconColor} />
        </Pressable>

        <View style={[styles.searchInputWrapper]}>
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={handleSearchChange}
            placeholder={t("location_search_placeholder")}
            placeholderTextColor={placeholderColor}
            style={[styles.searchInput, { color: textColor }]}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
        </View>

        {query.length > 0 && (
          <Pressable
            accessibilityRole="button"
            onPress={handleClear}
            style={styles.closeButton}
          >
            <IconSymbol name="xmark" size={22} color={iconColor} />
          </Pressable>
        )}
      </View>

      <FlatList
        refreshing={isLoadingDistricts}
        data={filteredSuggestions}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={[styles.list]}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { borderColor: dividerColor }]}>
            <Divider direction="horizontal" />
          </View>
        )}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyTitle}>
              {t("location_search_empty_title")}
            </ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              {t("location_search_empty_subtitle")}
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
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  separator: {
    marginVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    gap: 16,
  },
  resultTextWrapper: {
    flex: 1,
    gap: 4,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  resultSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  emptyState: {
    paddingTop: 80,
    alignItems: "center",
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 15,
    opacity: 0.7,
    textAlign: "center",
    paddingHorizontal: 32,
  },
});

export default LocationSearch;
