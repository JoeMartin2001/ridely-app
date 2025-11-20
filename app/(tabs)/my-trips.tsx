import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EmptyTripsView } from "@/components/trips/EmptyTripsView";
import { TripCard } from "@/components/trips/TripCard";
import { useThemeColor } from "@/hooks/use-theme-color";
import { IRide } from "@/lib/types";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

type TabType = "booked" | "published";

const MyTripsScreen = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<TabType>("booked");

  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const tabWidth = (width - 48) / 2; // 48 = 32 (horizontal margin) + 16 (container padding)

  const cardColor = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const surfaceColor = useThemeColor({}, "card");

  // Mock data - replace with actual data fetching
  const bookedTrips: IRide[] = [];
  const publishedTrips: IRide[] = [];

  const currentTrips = activeTab === "booked" ? bookedTrips : publishedTrips;

  useEffect(() => {
    Animated.spring(indicatorPosition, {
      toValue: activeTab === "booked" ? 0 : tabWidth,
      useNativeDriver: true,
      tension: 68,
      friction: 12,
    }).start();
  }, [activeTab, tabWidth]);

  const handleTabPress = (type: TabType) => {
    setActiveTab(type);
  };

  const renderTab = (type: TabType, label: string) => {
    const isActive = activeTab === type;
    return (
      <Pressable
        style={[styles.tab, { width: tabWidth }]}
        onPress={() => handleTabPress(type)}
        android_ripple={{
          color: tintColor + "30",
          borderless: false,
        }}
      >
        {({ pressed }) => (
          <ThemedText
            style={[
              styles.tabText,
              {
                color: isActive ? tintColor : textColor,
                opacity: pressed ? 0.7 : isActive ? 1 : 0.6,
              },
            ]}
            type={isActive ? "defaultSemiBold" : "default"}
          >
            {label}
          </ThemedText>
        )}
      </Pressable>
    );
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <View style={styles.content}>
        {/* Material Design 3 Tab Bar */}
        <View
          style={[
            styles.tabBarContainer,
            {
              backgroundColor: surfaceColor,
              shadowColor: "#000",
            },
          ]}
        >
          <View style={styles.tabBar}>
            {renderTab("booked", t("my_trips_tab_booked"))}
            {renderTab("published", t("my_trips_tab_published"))}
          </View>

          {/* Animated Indicator */}
          <Animated.View
            style={[
              styles.indicator,
              {
                backgroundColor: tintColor,
                width: tabWidth,
                transform: [{ translateX: indicatorPosition }],
              },
            ]}
          />
        </View>

        {currentTrips.length > 0 ? (
          <FlatList
            data={currentTrips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TripCard ride={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyTripsView type={activeTab} />
        )}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBarContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: "hidden",
  },
  tabBar: {
    flexDirection: "row",
    height: 48,
    padding: 4,
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 8,
  },
  tabText: {
    fontSize: 14,
    letterSpacing: 0.1,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  listContent: {
    padding: 16,
    paddingTop: 4,
  },
});

export default MyTripsScreen;
