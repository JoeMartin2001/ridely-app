import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { BorderRadius, Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function DriverTripDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const [tripStatus, setTripStatus] = useState<
    "pending" | "active" | "completed"
  >("pending");

  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const dividerColor = useThemeColor({}, "divider");
  const textOnTint = useThemeColor({}, "textOnTint");
  const errorColor = useThemeColor({}, "error");
  const successColor = "#34C759";

  // Mock requests
  const [requests, setRequests] = useState([
    { id: "1", name: "Sardor", seats: 1, rating: 4.8, status: "pending" },
    { id: "2", name: "Malika", seats: 2, rating: 5.0, status: "pending" },
  ]);

  const handleAccept = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: "accepted" } : r))
    );
  };

  const handleReject = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: "rejected" } : r))
    );
  };

  const handleTripAction = () => {
    if (tripStatus === "pending") {
      setTripStatus("active");
    } else if (tripStatus === "active") {
      Alert.alert(
        t("end_trip", "End Trip"),
        t("confirm_end_trip", "Are you sure you want to end this trip?"),
        [
          { text: t("cancel", "Cancel"), style: "cancel" },
          { text: t("end", "End"), onPress: () => setTripStatus("completed") },
        ]
      );
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]} applyTopInsets>
      <Header
        title={t("trip_details", "Ride Details")}
        onGoBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Trip Info Summary */}
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <View style={styles.row}>
            <ThemedText style={styles.label}>
              {t("status", "Status")}:
            </ThemedText>
            <ThemedText
              style={[
                styles.value,
                { color: tripStatus === "active" ? successColor : textColor },
              ]}
            >
              {tripStatus.toUpperCase()}
            </ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>
              {t("seats_booked", "Seats booked")}:
            </ThemedText>
            <ThemedText style={styles.value}>0/3</ThemedText>
          </View>
        </View>

        {/* Requests Section */}
        <ThemedText style={styles.sectionTitle}>
          {t("requests", "Requests")}
        </ThemedText>
        <View style={styles.requestsList}>
          {requests.map((req) => (
            <View
              key={req.id}
              style={[styles.card, { backgroundColor: cardColor }]}
            >
              <View style={styles.requestHeader}>
                <View style={styles.passengerInfo}>
                  <MaterialIcons name="person" size={24} color={iconColor} />
                  <View>
                    <ThemedText style={styles.passengerName}>
                      {req.name}
                    </ThemedText>
                    <ThemedText style={styles.passengerRating}>
                      ★ {req.rating}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.seatsRequested}>
                  {req.seats} {t("seats", "seat(s)")}
                </ThemedText>
              </View>

              {req.status === "pending" ? (
                <View style={styles.actionButtons}>
                  <Pressable
                    style={[
                      styles.actionButton,
                      { borderColor: errorColor, borderWidth: 1 },
                    ]}
                    onPress={() => handleReject(req.id)}
                  >
                    <ThemedText style={{ color: errorColor }}>
                      {t("reject", "Reject")}
                    </ThemedText>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.actionButton,
                      { backgroundColor: successColor },
                    ]}
                    onPress={() => handleAccept(req.id)}
                  >
                    <ThemedText style={{ color: "#fff" }}>
                      {t("accept", "Accept")}
                    </ThemedText>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.statusRow}>
                  <ThemedText
                    style={{
                      color:
                        req.status === "accepted" ? successColor : errorColor,
                    }}
                  >
                    {req.status.toUpperCase()}
                  </ThemedText>
                </View>
              )}
            </View>
          ))}
          {requests.length === 0 && (
            <ThemedText style={styles.emptyText}>
              {t("no_requests", "No requests yet")}
            </ThemedText>
          )}
        </View>
      </ScrollView>

      {/* Footer Action */}
      {tripStatus !== "completed" && (
        <View
          style={[
            styles.footer,
            { backgroundColor: cardColor, borderTopColor: dividerColor },
          ]}
        >
          <Pressable
            style={[
              styles.mainButton,
              {
                backgroundColor:
                  tripStatus === "pending" ? tintColor : errorColor,
              },
            ]}
            onPress={handleTripAction}
          >
            <ThemedText style={[styles.mainButtonText, { color: textOnTint }]}>
              {tripStatus === "pending"
                ? t("start_trip", "Start Trip")
                : t("end_trip", "End Trip")}
            </ThemedText>
          </Pressable>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.rounded,
    fontWeight: "600",
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 100,
  },
  card: {
    borderRadius: BorderRadius.card,
    padding: 16,
    ...Shadows.xxs,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    opacity: 0.7,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
    marginTop: 8,
  },
  requestsList: {
    gap: 16,
  },
  requestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passengerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: "600",
  },
  passengerRating: {
    fontSize: 14,
    opacity: 0.7,
  },
  seatsRequested: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  statusRow: {
    alignItems: "flex-end",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    opacity: 0.5,
    marginTop: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  mainButton: {
    height: 56,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
