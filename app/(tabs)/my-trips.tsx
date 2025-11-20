import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EmptyTripsView } from "@/components/trips/EmptyTripsView";
import { TripCard } from "@/components/trips/TripCard";
import { Header } from "@/components/ui/header";
import { useThemeColor } from "@/hooks/use-theme-color";
import { IRide } from "@/lib/types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

type TabType = "booked" | "published";

const MyTripsScreen = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<TabType>("booked");

  const cardColor = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  // Mock data - replace with actual data fetching
  const bookedTrips: IRide[] = [];
  const publishedTrips: IRide[] = [];

  const currentTrips = activeTab === "booked" ? bookedTrips : publishedTrips;

  const renderTab = (type: TabType, label: string) => {
    const isActive = activeTab === type;
    return (
      <TouchableOpacity
        style={[
          styles.tab,
          isActive && { backgroundColor: cardColor },
          { width: (width - 32 - 4) / 2 }, // Subtract padding and gap
        ]}
        onPress={() => setActiveTab(type)}
        activeOpacity={0.7}
      >
        <ThemedText
          style={[
            styles.tabText,
            { color: isActive ? textColor : textColor + "80" },
          ]}
          type={isActive ? "defaultSemiBold" : "default"}
        >
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <Header title={t("my_trips")} />

      <View style={styles.content}>
        <View
          style={[styles.tabContainer, { backgroundColor: cardColor + "80" }]}
        >
          {renderTab("booked", t("my_trips_tab_booked"))}
          {renderTab("published", t("my_trips_tab_published"))}
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
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 2,
    borderRadius: 12,
    height: 44,
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: "100%",
  },
  tabText: {
    fontSize: 14,
  },
  listContent: {
    padding: 16,
    paddingTop: 4,
  },
});

export default MyTripsScreen;
