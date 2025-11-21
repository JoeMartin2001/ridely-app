import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { BorderRadius, Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function DriverSetupScreen() {
  const { t } = useTranslation();
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carYear, setCarYear] = useState("");

  const [preferences, setPreferences] = useState({
    smoking: false,
    music: true,
    pets: false,
    talkative: "normal", // low, normal, high
  });

  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const textOnTint = useThemeColor({}, "textOnTint");
  const dividerColor = useThemeColor({}, "divider");
  const placeholderColor = useThemeColor({}, "tabIconDefault");

  const handleSave = () => {
    if (!carBrand || !carModel || !carColor) {
      Alert.alert(
        t("error"),
        t("fill_required_fields", "Please fill in all required fields")
      );
      return;
    }

    // TODO: Save driver profile to backend
    Alert.alert(
      t("success"),
      t("driver_profile_created", "Driver profile created!"),
      [
        {
          text: "OK",
          onPress: () => {
            router.back();
            // In real app, update global state to isDriver: true
          },
        },
      ]
    );
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === "talkative") return; // Handle separately if needed
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <Header title={t("become_driver", "Become a Driver")} />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <ThemedText style={styles.sectionTitle}>
            {t("car_details", "Car Details")}
          </ThemedText>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>
              {t("car_brand", "Brand")}
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: textColor, borderColor: dividerColor },
              ]}
              placeholder="Chevrolet"
              placeholderTextColor={placeholderColor}
              value={carBrand}
              onChangeText={setCarBrand}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>
              {t("car_model", "Model")}
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: textColor, borderColor: dividerColor },
              ]}
              placeholder="Malibu 2"
              placeholderTextColor={placeholderColor}
              value={carModel}
              onChangeText={setCarModel}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <ThemedText style={styles.label}>
                {t("car_color", "Color")}
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { color: textColor, borderColor: dividerColor },
                ]}
                placeholder="Black"
                placeholderTextColor={placeholderColor}
                value={carColor}
                onChangeText={setCarColor}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <ThemedText style={styles.label}>
                {t("car_year", "Year (Optional)")}
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { color: textColor, borderColor: dividerColor },
                ]}
                placeholder="2023"
                placeholderTextColor={placeholderColor}
                value={carYear}
                onChangeText={setCarYear}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <ThemedText style={styles.sectionTitle}>
            {t("preferences", "Preferences")}
          </ThemedText>

          <Pressable
            style={styles.prefRow}
            onPress={() => togglePreference("smoking")}
          >
            <View style={styles.prefLabelRow}>
              <MaterialIcons name="smoke-free" size={24} color={textColor} />
              <ThemedText style={styles.prefLabel}>
                {t("smoking_allowed", "Smoking allowed")}
              </ThemedText>
            </View>
            <MaterialIcons
              name={
                preferences.smoking ? "check-box" : "check-box-outline-blank"
              }
              size={24}
              color={preferences.smoking ? tintColor : placeholderColor}
            />
          </Pressable>

          <View style={[styles.divider, { backgroundColor: dividerColor }]} />

          <Pressable
            style={styles.prefRow}
            onPress={() => togglePreference("music")}
          >
            <View style={styles.prefLabelRow}>
              <MaterialIcons name="music-note" size={24} color={textColor} />
              <ThemedText style={styles.prefLabel}>
                {t("music_allowed", "Music allowed")}
              </ThemedText>
            </View>
            <MaterialIcons
              name={preferences.music ? "check-box" : "check-box-outline-blank"}
              size={24}
              color={preferences.music ? tintColor : placeholderColor}
            />
          </Pressable>

          <View style={[styles.divider, { backgroundColor: dividerColor }]} />

          <Pressable
            style={styles.prefRow}
            onPress={() => togglePreference("pets")}
          >
            <View style={styles.prefLabelRow}>
              <MaterialIcons name="pets" size={24} color={textColor} />
              <ThemedText style={styles.prefLabel}>
                {t("pets_allowed", "Pets allowed")}
              </ThemedText>
            </View>
            <MaterialIcons
              name={preferences.pets ? "check-box" : "check-box-outline-blank"}
              size={24}
              color={preferences.pets ? tintColor : placeholderColor}
            />
          </Pressable>
        </View>

        <Pressable
          style={[styles.saveButton, { backgroundColor: tintColor }]}
          onPress={handleSave}
        >
          <ThemedText style={[styles.saveButtonText, { color: textOnTint }]}>
            {t("save_driver_profile", "Start Driving")}
          </ThemedText>
        </Pressable>
      </KeyboardAwareScrollView>
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
    gap: 24,
  },
  card: {
    borderRadius: BorderRadius.card,
    padding: 20,
    ...Shadows.xxs,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
    marginBottom: 4,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  prefLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  prefLabel: {
    fontSize: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  saveButton: {
    height: 56,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
