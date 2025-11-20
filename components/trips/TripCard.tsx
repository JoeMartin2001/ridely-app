import { BorderRadius, Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useLocalizedMoment } from "@/hooks/use-localized-moment";
import { useThemeColor } from "@/hooks/use-theme-color";
import { IRide, RideStatus } from "@/lib/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

type Props = {
  ride: IRide;
};

export const TripCard = ({ ride }: Props) => {
  const { t } = useTranslation();
  const { calendar: formatCalendar } = useLocalizedMoment();
  const cardColor = useThemeColor({}, "card");
  const dividerColor = useThemeColor({}, "divider");
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");

  const getStatusColor = (status: RideStatus) => {
    switch (status) {
      case RideStatus.ACTIVE:
        return "#34C759"; // Green
      case RideStatus.COMPLETED:
        return "#8E8E93"; // Gray
      case RideStatus.CANCELLED:
        return "#FF3B30"; // Red
      default:
        return tintColor;
    }
  };

  return (
    <View
      style={[
        styles.card,
        Shadows.xxxs,
        { backgroundColor: cardColor, borderColor: dividerColor },
      ]}
    >
      <View style={styles.header}>
        <ThemedText style={styles.date}>
          {formatCalendar(ride.departureTime)}
        </ThemedText>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(ride.status) + "20" },
          ]}
        >
          <ThemedText
            style={[styles.statusText, { color: getStatusColor(ride.status) }]}
          >
            {ride.status}
          </ThemedText>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.locationRow}>
          <View style={styles.timeContainer}>
            <ThemedText style={styles.time}>
              {new Date(ride.departureTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </ThemedText>
          </View>
          <View style={styles.timelineContainer}>
            <View style={[styles.dot, { borderColor: iconColor }]} />
            <View style={[styles.line, { backgroundColor: dividerColor }]} />
          </View>
          <View style={styles.addressContainer}>
            <ThemedText style={styles.city}>{ride.departure.city}</ThemedText>
            <ThemedText style={styles.address} numberOfLines={1}>
              {ride.departure.address}
            </ThemedText>
          </View>
        </View>

        <View style={styles.locationRow}>
          <View style={styles.timeContainer}>
            <ThemedText style={styles.time}>
              {new Date(ride.estimatedArrivalTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </ThemedText>
          </View>
          <View style={styles.timelineContainer}>
            <View style={[styles.dot, { borderColor: iconColor }]} />
          </View>
          <View style={styles.addressContainer}>
            <ThemedText style={styles.city}>{ride.destination.city}</ThemedText>
            <ThemedText style={styles.address} numberOfLines={1}>
              {ride.destination.address}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={[styles.footer, { borderTopColor: dividerColor }]}>
        <View style={styles.priceContainer}>
          <ThemedText style={styles.priceLabel}>
            {t("seat_price_title")}
          </ThemedText>
          <ThemedText style={[styles.price, { color: tintColor }]}>
            {t("price_with_currency", {
              price: ride.pricePerSeat.toLocaleString(),
            })}
          </ThemedText>
        </View>

        <View style={styles.driverContainer}>
          {/* Placeholder for driver avatar/name if needed */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.card,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  date: {
    fontSize: 14,
    fontFamily: Fonts.rounded,
    opacity: 0.6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Fonts.rounded,
    textTransform: "capitalize",
  },
  routeContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 4,
  },
  locationRow: {
    flexDirection: "row",
    minHeight: 40,
  },
  timeContainer: {
    width: 60,
    paddingTop: 2,
  },
  time: {
    fontSize: 14,
    fontFamily: Fonts.rounded,
  },
  timelineContainer: {
    width: 20,
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: "transparent",
    marginTop: 6,
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  addressContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  city: {
    fontSize: 16,
    fontFamily: Fonts.rounded,
  },
  address: {
    fontSize: 14,
    opacity: 0.6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  priceContainer: {},
  priceLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  driverContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
