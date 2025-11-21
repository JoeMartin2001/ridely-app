import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { BorderRadius, Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function TripDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const [seats, setSeats] = useState(1);

  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const dividerColor = useThemeColor({}, "divider");
  const muteColor = useThemeColor({}, "tagline");
  const textOnTint = useThemeColor({}, "textOnTint");

  // Mock data - in real app fetch by ID
  const trip = {
    id,
    from: "Tashkent",
    to: "Samarkand",
    date: "Today, 14:30",
    price: 50000,
    currency: "UZS",
    seatsAvailable: 3,
    driver: {
      name: "Azizbek",
      rating: 4.9,
      trips: 124,
      bio: "I prefer quiet rides, no smoking.",
      image: null,
    },
    car: {
      brand: "Chevrolet",
      model: "Malibu 2",
      color: "Black",
      plate: "01 A 777 AA",
    },
    rules: [
      { icon: "smoke-free", label: "No smoking" },
      { icon: "luggage", label: "Medium luggage" },
      { icon: "music-note", label: "Music OK" },
    ],
    pickup: "North Station (Severniy)",
    dropoff: "Registan Square",
  };

  const handleRequestSeats = () => {
    Alert.alert(
      t("confirm_booking_title", "Confirm Booking") as string,
      t("confirm_booking_message", {
        seats,
        price: (trip.price * seats).toLocaleString(),
        currency: trip.currency,
      } as any) as string,
      [
        { text: t("cancel", "Cancel"), style: "cancel" },
        {
          text: t("confirm", "Confirm"),
          onPress: () => {
            // TODO: Create trip request
            router.push("/(tabs)/chat");
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title={t("trip_details", "Ride Details")} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Route Section */}
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <View style={styles.routeRow}>
            <View style={styles.timeColumn}>
              <ThemedText style={styles.timeText}>14:30</ThemedText>
              <ThemedText style={[styles.durationText, { color: muteColor }]}>
                4h 30m
              </ThemedText>
              <ThemedText style={styles.timeText}>19:00</ThemedText>
            </View>

            <View style={styles.timelineColumn}>
              <View style={[styles.dot, { backgroundColor: tintColor }]} />
              <View style={[styles.line, { backgroundColor: dividerColor }]} />
              <View style={[styles.dot, { backgroundColor: tintColor }]} />
            </View>

            <View style={styles.locationColumn}>
              <View>
                <ThemedText style={styles.cityText}>{trip.from}</ThemedText>
                <ThemedText style={[styles.addressText, { color: muteColor }]}>
                  {trip.pickup}
                </ThemedText>
              </View>
              <View style={{ height: 20 }} />
              <View>
                <ThemedText style={styles.cityText}>{trip.to}</ThemedText>
                <ThemedText style={[styles.addressText, { color: muteColor }]}>
                  {trip.dropoff}
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: dividerColor }]} />

          <View style={styles.priceRow}>
            <ThemedText style={styles.priceLabel}>
              {t("price_per_seat", "Price per seat")}
            </ThemedText>
            <ThemedText style={[styles.priceText, { color: tintColor }]}>
              {trip.price.toLocaleString()} {trip.currency}
            </ThemedText>
          </View>
        </View>

        {/* Driver Section */}
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <View style={styles.driverHeader}>
            <View
              style={[
                styles.avatarPlaceholder,
                { backgroundColor: dividerColor },
              ]}
            >
              <MaterialIcons name="person" size={32} color={iconColor} />
            </View>
            <View style={styles.driverInfo}>
              <ThemedText style={styles.driverName}>
                {trip.driver.name}
              </ThemedText>
              <View style={styles.ratingRow}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
                <ThemedText style={styles.ratingText}>
                  {trip.driver.rating}
                </ThemedText>
                <ThemedText style={[styles.tripsText, { color: muteColor }]}>
                  • {trip.driver.trips} {t("trips", "trips")}
                </ThemedText>
              </View>
            </View>
          </View>
          <ThemedText style={styles.bioText}>{trip.driver.bio}</ThemedText>
        </View>

        {/* Car Section */}
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <ThemedText style={styles.sectionTitle}>
            {t("car_info", "Car")}
          </ThemedText>
          <ThemedText style={styles.carText}>
            {trip.car.brand} {trip.car.model}
          </ThemedText>
          <ThemedText style={[styles.carDetailText, { color: muteColor }]}>
            {trip.car.color}
          </ThemedText>
        </View>

        {/* Rules Section */}
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <ThemedText style={styles.sectionTitle}>
            {t("trip_rules", "Rules")}
          </ThemedText>
          <View style={styles.rulesList}>
            {trip.rules.map((rule, index) => (
              <View key={index} style={styles.ruleItem}>
                <MaterialIcons
                  name={rule.icon as any}
                  size={20}
                  color={iconColor}
                />
                <ThemedText style={styles.ruleText}>{rule.label}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={[
          styles.footer,
          { backgroundColor: cardColor, borderTopColor: dividerColor },
        ]}
      >
        <View style={styles.stepperContainer}>
          <ThemedText style={styles.seatsLabel}>
            {t("seats", "Seats")}
          </ThemedText>
          <View style={styles.stepper}>
            <Pressable
              onPress={() => setSeats(Math.max(1, seats - 1))}
              style={[styles.stepButton, { borderColor: dividerColor }]}
            >
              <MaterialIcons name="remove" size={20} color={iconColor} />
            </Pressable>
            <ThemedText style={styles.seatCount}>{seats}</ThemedText>
            <Pressable
              onPress={() => setSeats(Math.min(trip.seatsAvailable, seats + 1))}
              style={[styles.stepButton, { borderColor: dividerColor }]}
            >
              <MaterialIcons name="add" size={20} color={iconColor} />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={[styles.bookButton, { backgroundColor: tintColor }]}
          onPress={handleRequestSeats}
        >
          <ThemedText style={[styles.bookButtonText, { color: textOnTint }]}>
            {t("request_seats", "Request seats")}
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
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 100,
  },
  card: {
    borderRadius: BorderRadius.card,
    padding: 16,
    ...Shadows.xxs,
  },
  routeRow: {
    flexDirection: "row",
    gap: 12,
  },
  timeColumn: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
  },
  durationText: {
    fontSize: 12,
    marginVertical: 8,
  },
  timelineColumn: {
    alignItems: "center",
    paddingVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  locationColumn: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 0,
  },
  cityText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
  },
  addressText: {
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 14,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: Fonts.rounded,
  },
  driverHeader: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  driverInfo: {
    justifyContent: "center",
  },
  driverName: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tripsText: {
    fontSize: 14,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
    marginBottom: 12,
  },
  carText: {
    fontSize: 16,
    fontWeight: "500",
  },
  carDetailText: {
    fontSize: 14,
    marginTop: 4,
  },
  rulesList: {
    gap: 12,
  },
  ruleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  ruleText: {
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  stepperContainer: {
    alignItems: "center",
    gap: 4,
  },
  seatsLabel: {
    fontSize: 12,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  seatCount: {
    fontSize: 16,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },
  bookButton: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
