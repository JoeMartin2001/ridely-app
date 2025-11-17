import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { BorderRadius, Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
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

  const { from, to } = useAppSelector((state) => state.publishTrip);

  const cardColor = useThemeColor({}, "card");
  const dividerColor = useThemeColor({}, "divider");
  const iconColor = useThemeColor({}, "icon");
  const fieldIconBackground = useThemeColor({}, "surfaceMuted");
  const tintColor = useThemeColor({}, "tint");

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
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, t]);

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <Header title={t("publish")} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  locationCard: {
    borderRadius: BorderRadius.card,
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
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
