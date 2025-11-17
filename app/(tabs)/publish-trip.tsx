import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BorderRadius, Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useLocalizedMoment } from "@/hooks/use-localized-moment";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setSearchQuery } from "@/lib/store/features/location-search/locationSearchSlice";
import {
  setFromDistrict,
  setToDistrict,
} from "@/lib/store/features/publish-trip/publishTripSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type GestureResponderEvent,
} from "react-native";

type LocationField = {
  key: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  value?: string;
  onPress?: (event: GestureResponderEvent) => void;
  showSwapButton?: boolean;
  onSwapButtonPress?: (event: GestureResponderEvent) => void;
};

const PublishTrip = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { calendar: formatCalendar } = useLocalizedMoment();

  const { from, to, date, passengersCount, seatPrice } = useAppSelector(
    (state) => state.publishTrip
  );

  const cardColor = useThemeColor({}, "card");
  const dividerColor = useThemeColor({}, "divider");
  const iconColor = useThemeColor({}, "icon");
  const fieldIconBackground = useThemeColor({}, "surfaceMuted");
  const tintColor = useThemeColor({}, "tint");
  const textOnTint = useThemeColor({}, "textOnTint");
  const taglineColor = useThemeColor({}, "tagline");

  const fields: LocationField[] = useMemo(() => {
    return [
      {
        key: "from",
        icon: "my-location",
        label: t("home_field_from"),
        value: from.name || undefined,
        onPress: () => {
          dispatch(setSearchQuery(from.name || ""));
          router.push("/location-search?type=from&context=publish");
        },
        showSwapButton: from.id !== "" || to.id !== "",
        onSwapButtonPress: () => {
          dispatch(setFromDistrict({ id: to.id, name: to.name }));
          dispatch(setToDistrict({ id: from.id, name: from.name }));
        },
      },
      {
        key: "to",
        icon: "location-on",
        label: t("home_field_to"),
        value: to.name || undefined,
        onPress: () => {
          dispatch(setSearchQuery(to.name || ""));
          router.push("/location-search?type=to&context=publish");
        },
      },
      {
        key: "date",
        icon: "event",
        label: t("home_field_date"),
        value: formatCalendar(date),
        onPress: () => router.push("/select-trip-date?context=publish"),
      },
      {
        key: "passengers",
        icon: "people",
        label: t("home_field_passengers"),
        value: passengersCount.toString(),
        onPress: () => router.push("/passenger-count?context=publish"),
      },
      {
        key: "price",
        icon: "attach-money",
        label: t("seat_price_title"),
        value: t("price_with_currency", { price: seatPrice.toLocaleString() }),
        onPress: () => router.push("/(publish-trip)/seat-price"),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, date, passengersCount, seatPrice, formatCalendar, t]);

  const handlePublish = () => {
    // TODO: Implement publish trip logic
    console.log("Publishing trip:", {
      from,
      to,
      date,
      passengersCount,
      seatPrice,
    });
  };

  return (
    <ThemedView style={styles.container} applyTopInsets>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText style={[styles.brandTitle, { color: tintColor }]}>
            {t("brand_title")}
          </ThemedText>
          <ThemedText style={[styles.tagline, { color: taglineColor }]}>
            {t("publish_trip_title")}
          </ThemedText>
        </View>

        <View
          style={[
            styles.locationCard,
            Shadows.xxxs,
            { backgroundColor: cardColor, borderColor: dividerColor },
          ]}
        >
          {fields.map((field, index) => {
            const isLast = index === fields.length - 1;

            return (
              <FieldRow
                key={field.key}
                field={field}
                isLast={isLast}
                dividerColor={dividerColor}
                iconColor={iconColor}
                fieldIconBackground={fieldIconBackground}
                tintColor={tintColor}
              />
            );
          })}

          <Pressable
            style={[styles.publishButton, { backgroundColor: tintColor }]}
            android_ripple={{ color: "rgba(255,255,255,0.2)" }}
            onPress={handlePublish}
          >
            <ThemedText
              style={[styles.publishButtonText, { color: textOnTint }]}
            >
              {t("publish")}
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const FieldRow = (props: {
  field: LocationField;
  isLast: boolean;
  dividerColor: string;
  iconColor: string;
  fieldIconBackground: string;
  tintColor: string;
}) => {
  const {
    field,
    isLast,
    dividerColor,
    iconColor,
    fieldIconBackground,
    tintColor,
  } = props;

  return (
    <Pressable
      android_ripple={{ color: dividerColor }}
      style={[
        styles.fieldRow,
        !isLast && {
          borderBottomColor: dividerColor,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      ]}
      onPress={field.onPress}
    >
      <View
        style={[
          styles.fieldIconWrapper,
          { backgroundColor: fieldIconBackground },
        ]}
      >
        <MaterialIcons name={field.icon} size={22} color={iconColor} />
      </View>

      <View style={styles.fieldContent}>
        <ThemedText style={styles.fieldLabel}>{field.label}</ThemedText>

        {field.value ? (
          <ThemedText style={[styles.fieldValue, { color: iconColor }]}>
            {field.value}
          </ThemedText>
        ) : null}
      </View>

      {field.showSwapButton ? (
        <Pressable onPress={field.onSwapButtonPress}>
          <MaterialIcons name="swap-vert" size={30} color={tintColor} />
        </Pressable>
      ) : (
        <MaterialIcons name="chevron-right" size={22} color={iconColor} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
  contentContainer: {
    flexGrow: 1,
    paddingTop: 64,
    paddingBottom: 40,
    paddingHorizontal: 20,
    gap: 24,
  },
  header: {
    gap: 8,
  },
  brandTitle: {
    fontFamily: Fonts.rounded,
    fontWeight: "bold",
    fontSize: 56,
    lineHeight: 56,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  tagline: {
    fontSize: 24,
    fontFamily: Fonts.rounded,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  locationCard: {
    borderRadius: BorderRadius.card,
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  publishButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: BorderRadius.card,
    borderBottomRightRadius: BorderRadius.card,
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
    paddingHorizontal: 20,
  },
  fieldIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.card,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContent: {
    flex: 1,
    gap: 2,
  },
  fieldLabel: {
    fontSize: 16,
    fontFamily: Fonts.rounded,
  },
  fieldValue: {
    fontSize: 14,
  },
});

export default PublishTrip;
