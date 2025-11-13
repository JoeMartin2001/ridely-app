import { useState } from "react";
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

  const taglineColor = useThemeColor({}, "tagline");
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const textOnTint = useThemeColor({}, "textOnTint");
  const tintColor = useThemeColor({}, "tint");
  const placeholderColor = useThemeColor({}, "placeholder");
  const dividerColor = useThemeColor({}, "divider");

  return (
    <ThemedView style={[styles.container, { backgroundColor }]} applyTopInsets>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.header}>
          <ThemedText style={[styles.brandTitle, { color: tintColor }]}>
            Ridely
          </ThemedText>
          <ThemedText style={[styles.tagline, { color: taglineColor }]}>
            {t("auth_phone_tagline")}
          </ThemedText>
        </View>

        <ThemedView
          style={[
            styles.formContainer,
            Shadows.xxxs,
            { backgroundColor: cardColor },
          ]}
        >
          <MaskInput
            style={[
              styles.input,
              { color: textColor, borderColor: dividerColor },
            ]}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(masked) => setPhoneNumber(masked)}
            mask={uzbekPhoneMask}
            placeholder={t("auth_phone_input_placeholder")}
            placeholderTextColor={placeholderColor}
          />
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.submitButton, { backgroundColor: tintColor }]}
          >
            <ThemedText
              style={styles.submitText}
              lightColor={textOnTint}
              darkColor={textOnTint}
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
  formContainer: {
    width: "100%",
    padding: 24,
    borderRadius: BorderRadius.card,
    gap: 24,
  },
  input: {
    height: 56,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 24,
    fontSize: 20,
    letterSpacing: 1,
    backgroundColor: "transparent",
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
});
