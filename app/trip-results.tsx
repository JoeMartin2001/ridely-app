import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/components/ui/spacing";
import { Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

type Trip = {
  id: string;
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  durationLabel: string;
  arrivalNote?: string;
  price: string;
  priceCurrency: string;
  driverName: string;
  driverRating: string;
  vehicleType: "car" | "bus" | "rideshare";
  status?: "available" | "full";
};

const TRIP_GROUPS: { titleKey: string; trips: Trip[] }[] = [
  {
    titleKey: "trip_results_group_tomorrow",
    trips: [
      {
        id: "trip-1",
        departureTime: "04:00",
        departureCity: "Москва",
        arrivalTime: "22:50",
        arrivalCity: "Краснодар",
        durationLabel: "18 ч 50",
        price: "4 800",
        priceCurrency: "₽",
        driverName: "Валерий",
        driverRating: "5",
        vehicleType: "rideshare",
        status: "available",
      },
      {
        id: "trip-2",
        departureTime: "07:00",
        departureCity: "Москва",
        arrivalTime: "20:50",
        arrivalCity: "Краснодар",
        durationLabel: "13 ч 50",
        price: "—",
        priceCurrency: "",
        driverName: "Vitalii",
        driverRating: "5",
        vehicleType: "rideshare",
        status: "full",
      },
      {
        id: "trip-3",
        departureTime: "07:00",
        departureCity: "Москва",
        arrivalTime: "01:40",
        arrivalCity: "Краснодар",
        durationLabel: "18 ч 40",
        arrivalNote: "+1",
        price: "3 300",
        priceCurrency: "₽",
        driverName: "Зухраев",
        driverRating: "—",
        vehicleType: "rideshare",
        status: "available",
      },
      {
        id: "trip-4",
        departureTime: "09:00",
        departureCity: "Москва",
        arrivalTime: "23:20",
        arrivalCity: "Краснодар",
        durationLabel: "14 ч 20",
        price: "3 900",
        priceCurrency: "₽",
        driverName: "Mellio Bus",
        driverRating: "4.8",
        vehicleType: "bus",
        status: "available",
      },
    ],
  },
];

const TripResultsScreen = () => {
  const { t } = useTranslation();

  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "cardElevated");
  const iconColor = useThemeColor({}, "icon");
  const dividerColor = useThemeColor({}, "divider");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const muteColor = useThemeColor({}, "tagline");
  const cardMuted = useThemeColor({}, "cardMuted");
  const tripLineColor = useThemeColor({}, "tripLine");
  const avatarPlaceholder = useThemeColor({}, "avatarPlaceholder");
  const routeBorder = useThemeColor({}, "accentSurfaceBorder");

  const handleBack = () => router.back();

  return (
    <ThemedView style={[styles.container, { backgroundColor }]} applyTopInsets>
      <View style={[styles.navBar, { borderColor: routeBorder }]}>
        <Pressable
          style={styles.iconButton}
          accessibilityRole="button"
          onPress={handleBack}
        >
          <MaterialIcons name="arrow-back" size={22} color={tintColor} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.routeTextBlock,
            { borderRightColor: routeBorder, opacity: pressed ? 0.5 : 1 },
          ]}
          android_ripple={{ color: dividerColor }}
        >
          <ThemedText numberOfLines={1} style={styles.routeTitle}>
            {t("trip_results_route_title")}
          </ThemedText>

          <ThemedText style={[styles.routeLabel, { color: muteColor }]}>
            {t("trip_results_route_summary")}
          </ThemedText>
        </Pressable>

        <Pressable
          style={styles.filterButton}
          accessibilityRole="button"
          android_ripple={{ color: dividerColor }}
        >
          <ThemedText style={[styles.filterButtonText, { color: tintColor }]}>
            {t("trip_results_filter")}
          </ThemedText>
        </Pressable>
      </View>

      <Spacing vertical={5} />

      <ScrollView
        style={[styles.scrollView, { backgroundColor: cardColor }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.groupList}>
          {TRIP_GROUPS.map((group) => (
            <View key={group.titleKey} style={styles.groupSection}>
              <ThemedText style={styles.groupTitle}>
                {t(group.titleKey)}
              </ThemedText>

              <View style={styles.groupCards}>
                {group.trips.map((trip) => {
                  const isFull = trip.status === "full";

                  return (
                    <View
                      key={trip.id}
                      style={[
                        styles.tripCard,
                        isFull && styles.tripCardDisabled,
                        {
                          backgroundColor: isFull ? cardMuted : backgroundColor,
                          borderColor: isFull ? tripLineColor : "transparent",
                          opacity: isFull ? 0.5 : 1,
                        },
                        Shadows.xxs,
                      ]}
                    >
                      <View style={styles.tripHeader}>
                        <View style={styles.tripTimeline}>
                          <ThemedText style={styles.tripTime}>
                            {trip.departureTime}
                          </ThemedText>
                          <ThemedText
                            style={[styles.tripDuration, { color: muteColor }]}
                          >
                            {trip.durationLabel}
                          </ThemedText>
                          <View
                            style={[
                              styles.tripLine,
                              { backgroundColor: tripLineColor },
                            ]}
                          />
                          <ThemedText style={styles.tripTime}>
                            {trip.arrivalTime}
                          </ThemedText>
                          {trip.arrivalNote ? (
                            <ThemedText
                              style={[
                                styles.tripArrivalNote,
                                { color: muteColor },
                              ]}
                            >
                              {trip.arrivalNote}
                            </ThemedText>
                          ) : null}
                        </View>

                        <View style={styles.tripLocations}>
                          <View style={styles.tripLocationRow}>
                            <View
                              style={[
                                styles.tripLocationBullet,
                                { backgroundColor: tintColor },
                              ]}
                            />
                            <ThemedText style={styles.tripCity}>
                              {trip.departureCity}
                            </ThemedText>
                          </View>

                          <View style={styles.tripLocationRow}>
                            <View
                              style={[
                                styles.tripLocationBullet,
                                { backgroundColor: tintColor },
                              ]}
                            />
                            <ThemedText style={styles.tripCity}>
                              {trip.arrivalCity}
                            </ThemedText>
                          </View>
                        </View>

                        <View style={styles.tripPriceWrapper}>
                          {isFull ? (
                            <ThemedText
                              style={[
                                styles.tripFullLabel,
                                { color: textColor },
                              ]}
                            >
                              {t("trip_results_status_full")}
                            </ThemedText>
                          ) : (
                            <>
                              <ThemedText style={styles.tripPrice}>
                                {trip.price}
                              </ThemedText>
                              <ThemedText
                                style={[
                                  styles.tripCurrency,
                                  { color: muteColor },
                                ]}
                              >
                                {trip.priceCurrency}
                              </ThemedText>
                            </>
                          )}
                        </View>
                      </View>

                      <View
                        style={[
                          styles.cardDivider,
                          { backgroundColor: tripLineColor },
                        ]}
                      />

                      <View style={styles.tripFooter}>
                        <View style={styles.driverInfo}>
                          <View
                            style={[
                              styles.driverAvatar,
                              { backgroundColor: avatarPlaceholder },
                            ]}
                          >
                            <MaterialIcons
                              name={
                                trip.vehicleType === "bus"
                                  ? "directions-bus"
                                  : "person"
                              }
                              size={22}
                              color={textColor}
                            />
                          </View>
                          <View>
                            <ThemedText style={styles.driverName}>
                              {trip.driverName}
                            </ThemedText>
                            <ThemedText
                              style={[
                                styles.driverRating,
                                { color: muteColor },
                              ]}
                            >
                              ★ {trip.driverRating}
                            </ThemedText>
                          </View>
                        </View>

                        <View style={styles.tripMeta}>
                          <MaterialIcons
                            name={
                              trip.vehicleType === "bus"
                                ? "directions-bus"
                                : "directions-car"
                            }
                            size={20}
                            color={isFull ? muteColor : iconColor}
                          />
                          <MaterialIcons
                            name="groups"
                            size={20}
                            color={isFull ? muteColor : iconColor}
                          />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 40,
    gap: 24,
  },
  navBar: {
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 16,
    paddingRight: 10,
    paddingLeft: 5,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  iconButton: {
    padding: 8,
  },
  routeTextBlock: {
    flex: 1,
    gap: 6,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  routeTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
  },
  routeLabel: {
    fontSize: 12,
    fontFamily: Fonts.rounded,
  },
  filterButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "center",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
  },
  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    gap: 4,
  },
  tabLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
  },
  tabCount: {
    fontSize: 13,
  },
  tabIndicator: {
    marginTop: 6,
    height: 2,
    borderRadius: 1,
    alignSelf: "stretch",
  },
  groupList: {
    paddingHorizontal: 16,
    gap: 24,
  },
  groupSection: {
    gap: 16,
  },
  groupTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 20,
  },
  groupCards: {
    gap: 16,
  },
  tripCard: {
    borderRadius: 24,
    padding: 20,
    gap: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
  },
  tripCardDisabled: {},
  tripHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  tripTimeline: {
    alignItems: "center",
    gap: 8,
  },
  tripLine: {
    width: 2,
    height: 36,
    borderRadius: 1,
  },
  tripTime: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
  },
  tripLocations: {
    flex: 1,
    gap: 12,
  },
  tripLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tripLocationBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tripCity: {
    fontSize: 16,
    fontFamily: Fonts.rounded,
  },
  tripDuration: {
    fontSize: 12,
    fontFamily: Fonts.rounded,
  },
  tripArrivalNote: {
    fontSize: 12,
    fontFamily: Fonts.rounded,
  },
  tripPriceWrapper: {
    alignItems: "flex-end",
    gap: 2,
  },
  tripPrice: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: Fonts.rounded,
  },
  tripCurrency: {
    fontSize: 14,
    fontFamily: Fonts.rounded,
  },
  tripFullLabel: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
  },
  tripFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardDivider: {
    height: StyleSheet.hairlineWidth,
    opacity: 0.6,
    marginVertical: 8,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  driverName: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
  },
  driverRating: {
    fontSize: 13,
  },
  tripMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});

export default TripResultsScreen;
