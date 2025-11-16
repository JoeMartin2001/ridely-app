import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
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
import { useGetRegionsByNameQuery } from "@/lib/services/regions/regionsApi";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setFromDistrict,
  setToDistrict,
} from "@/lib/store/features/find-trip/findTripSlice";
import { setSearchQuery } from "@/lib/store/features/location-search/locationSearchSlice";

type LocationSuggestion = {
  id: string;
  title: string;
  subtitle: string;
};

const LocationSearch = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { type } = useLocalSearchParams();

  const inputRef = useRef<TextInput>(null);

  const { searchQuery } = useAppSelector((state) => state.locationSearch);

  const { data: regions = [], isFetching: isFetchingRegions } =
    useGetRegionsByNameQuery(searchQuery.trim().toLowerCase(), {
      pollingInterval: 1000,
    });

  const { data: districts = [], isFetching: isFetchingDistricts } =
    useGetDistrictsByNameQuery(searchQuery.trim().toLowerCase(), {
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
    return [
      ...regions.map((item) => ({
        id: item.id,
        title: item.nameUz,
        subtitle: "",
      })),
      ...districts.map((item) => ({
        id: item.id,
        title: item.nameUz,
        subtitle: item.region?.nameUz || "",
      })),
    ];
  }, [districts, regions]);

  const handleClear = () => {
    if (searchQuery.length === 0) {
      router.back();
      return;
    }

    if (type === "from") {
      dispatch(setFromDistrict({ id: "", name: "" }));
    } else {
      dispatch(setToDistrict({ id: "", name: "" }));
    }

    dispatch(setSearchQuery(""));
    inputRef.current?.focus();
  };

  const handleSearchChange = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  const handlePressItem = (item: LocationSuggestion) => {
    if (type === "from") {
      dispatch(setFromDistrict({ id: item.id, name: item.title }));
    } else {
      dispatch(setToDistrict({ id: item.id, name: item.title }));
    }

    dispatch(setSearchQuery(""));

    router.back();
  };

  const renderItem: ListRenderItem<LocationSuggestion> = ({ item }) => {
    return (
      <Pressable
        style={styles.resultRow}
        android_ripple={{ color: dividerColor }}
        onPress={() => handlePressItem(item)}
      >
        <View style={styles.resultTextWrapper}>
          <ThemedText style={styles.resultTitle}>{item.title}</ThemedText>
          {item.subtitle && (
            <ThemedText style={styles.resultSubtitle}>
              {item.subtitle}
            </ThemedText>
          )}
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
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder={t("location_search_placeholder")}
            placeholderTextColor={placeholderColor}
            style={[styles.searchInput, { color: textColor }]}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
        </View>

        {searchQuery.length > 0 && (
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
        refreshing={isFetchingDistricts || isFetchingRegions}
        data={suggestions}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={[styles.list]}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <Divider direction="horizontal" />}
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
    paddingVertical: 24,
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
