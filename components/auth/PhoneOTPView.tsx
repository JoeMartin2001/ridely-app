import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaskInput, { Mask } from "react-native-mask-input";

import { BorderRadius, Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

const uzbekPhoneMask: Mask = [
  "+",
  "9",
  "9",
  "8",
  " ",
  "(",
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

export const PhoneOTPView = () => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("+998 ");
  const [rawPhoneNumber, setRawPhoneNumber] = useState("998");
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const taglineColor = useThemeColor({}, "tagline");
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const textOnTint = useThemeColor({}, "textOnTint");
  const tintColor = useThemeColor({}, "tint");
  const placeholderColor = useThemeColor({}, "placeholder");
  const dividerColor = useThemeColor({}, "divider");
  const errorColor = useThemeColor({}, "error");
  const helperColor = useThemeColor({}, "tagline");

  const isPhoneComplete = useMemo(
    () => rawPhoneNumber.replace(/\D/g, "").length === 9,
    [rawPhoneNumber]
  );
  const showError = isTouched && !isPhoneComplete;

  const inputBorderColor = showError
    ? errorColor
    : isFocused
    ? tintColor
    : dividerColor;

  const handlePhoneChange = useCallback((masked: string, unmasked?: string) => {
    setPhoneNumber(masked);
    if (typeof unmasked === "string") {
      setRawPhoneNumber(unmasked);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isPhoneComplete) {
      setIsTouched(true);
      return;
    }

    // TODO: hook up submission logic (e.g., request OTP)
  }, [isPhoneComplete]);

  return (
    <ThemedView style={[styles.container, { backgroundColor }]} applyTopInsets>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.header}>
          <ThemedText style={[styles.brandTitle, { color: tintColor }]}>
            {t("auth_phone_title")}
          </ThemedText>
          <ThemedText style={[styles.tagline, { color: taglineColor }]}>
            {t("auth_phone_tagline")}
          </ThemedText>
        </View>

        <ThemedView
          style={[styles.formContainer, { backgroundColor: cardColor }]}
        >
          <View style={styles.field}>
            <ThemedText style={[styles.label, { color: helperColor }]}>
              {t("auth_phone_input_label")}
            </ThemedText>

            <MaskInput
              style={[
                styles.input,
                {
                  color: textColor,
                  borderColor: inputBorderColor,
                },
              ]}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              mask={uzbekPhoneMask}
              placeholder={t("auth_phone_input_placeholder")}
              placeholderTextColor={placeholderColor}
              textContentType="telephoneNumber"
              autoComplete="tel"
              returnKeyType="done"
              selectionColor={tintColor}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                setIsTouched(true);
              }}
              accessibilityLabel={t("auth_phone_input_label")}
              accessibilityHint={t("auth_phone_input_accessibility_hint")}
            />
            <ThemedText
              style={[
                styles.helperText,
                { color: showError ? errorColor : helperColor },
              ]}
            >
              {showError
                ? t("auth_phone_input_error_invalid")
                : t("auth_phone_input_helper")}
            </ThemedText>
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.submitButton,
              {
                backgroundColor: tintColor,
                opacity: isPhoneComplete ? 1 : 0.5,
              },
            ]}
            onPress={handleSubmit}
            disabled={!isPhoneComplete}
            accessibilityRole="button"
            accessibilityState={{ disabled: !isPhoneComplete }}
            accessibilityHint={t("auth_phone_submit_accessibility_hint")}
          >
            <ThemedText
              style={styles.submitText}
              lightColor={textOnTint}
              darkColor={textOnTint}
            >
              {t("auth_phone_submit")}
            </ThemedText>
          </TouchableOpacity>
          <ThemedText style={[styles.termsText, { color: helperColor }]}>
            {t("auth_phone_terms")}
          </ThemedText>
        </ThemedView>
      </KeyboardAwareScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  scrollViewContainer: {
    flexGrow: 1,
    gap: 24,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  header: {
    gap: 8,
    alignItems: "center",
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
  description: {
    marginTop: 8,
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    padding: 24,
    borderRadius: BorderRadius.card,
    gap: 20,
    ...Shadows.xxs,
  },
  field: {
    gap: 8,
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  input: {
    height: 56,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 24,
    fontSize: 20,
    letterSpacing: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  submitButton: {
    height: 56,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
  helperText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  termsText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
});
