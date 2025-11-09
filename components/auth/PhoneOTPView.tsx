import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export const PhoneOTPView = () => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("+998");
  const colorScheme = useColorScheme();

  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const placeholderColor =
    colorScheme === "dark"
      ? "rgba(236, 237, 238, 0.5)"
      : "rgba(17, 24, 28, 0.4)";

  return (
    <ThemedView style={[styles.container, { backgroundColor }]} applyTopInsets>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <ThemedView style={styles.brandContainer}>
          <ThemedText style={styles.brand}>{t("auth_phone_title")}</ThemedText>
          <ThemedText style={styles.tagline}>
            {t("auth_phone_tagline")}
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={[styles.formContainer, { backgroundColor: cardColor }]}
        >
          <TextInput
            style={[styles.input, { color: textColor }]}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder={t("auth_phone_input_placeholder")}
            placeholderTextColor={placeholderColor}
            maxLength={17}
          />
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.submitButton, { backgroundColor: tintColor }]}
          >
            <ThemedText
              style={styles.submitText}
              lightColor="#ffffff"
              darkColor="#11181C"
            >
              {t("auth_phone_submit")}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAwareScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  scrollViewContainer: {
    flexGrow: 1,
    gap: 48,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  brandContainer: {
    alignItems: "center",
    gap: 12,
  },
  brand: {
    fontSize: 48,
    fontWeight: "700",
    letterSpacing: 4,
    textTransform: "none",
    textAlign: "center",
    fontFamily: Fonts.rounded,
    lineHeight: 48,
  },
  tagline: {
    fontSize: 16,
    opacity: 0.7,
    textTransform: "uppercase",
    letterSpacing: 2,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    padding: 24,
    borderRadius: 32,
    gap: 24,
  },
  input: {
    height: 56,
    borderRadius: 28,
    paddingHorizontal: 24,
    fontSize: 20,
    letterSpacing: 1,
    backgroundColor: "transparent",
  },
  submitButton: {
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
