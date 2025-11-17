import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Mask } from "react-native-mask-input";

import { SubmitOTPView } from "@/components/auth/SubmitOTPView";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AppMaskInput } from "@/components/ui/input/app-mask-input";
import { BorderRadius, Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  useSendPhoneOTPMutation,
  useSignInWithTelegramMutation,
} from "@/lib/services/auth/authApi";
import { resolveErrorMessage } from "@/lib/utils/errorUtils";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

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

export default function PhoneOTPScreen() {
  const { t } = useTranslation();
  const [
    sendPhoneOTP,
    {
      isLoading: isSendPhoneOTPLoading,
      error: sendPhoneOTPError,
      isSuccess: isSendPhoneOTPSuccess,
      reset: resetSendPhoneOTPMutation,
    },
  ] = useSendPhoneOTPMutation();

  const [
    signInWithTelegram,
    { isLoading: isTelegramLoading, error: telegramError },
  ] = useSignInWithTelegramMutation();

  const telegramButtonColor = useThemeColor({}, "telegramButton");
  const taglineColor = useThemeColor({}, "tagline");
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const textOnTint = useThemeColor({}, "textOnTint");
  const tintColor = useThemeColor({}, "tint");
  const dividerColor = useThemeColor({}, "divider");
  const errorColor = useThemeColor({}, "error");
  const helperColor = useThemeColor({}, "tagline");

  const [phoneNumber, setPhoneNumber] = useState("+998 ");
  const [rawPhoneNumber, setRawPhoneNumber] = useState("998");
  const [isTouched, setIsTouched] = useState(false);
  const [flowStep, setFlowStep] = useState<"phone" | "otp">("phone");
  const [submittedPhone, setSubmittedPhone] = useState<{
    masked: string;
    raw: string;
  }>({
    masked: "",
    raw: "",
  });

  const isPhoneComplete = useMemo(
    () => rawPhoneNumber.replace(/\D/g, "").length === 9,
    [rawPhoneNumber]
  );
  const showError = isTouched && !isPhoneComplete;

  const sendPhoneErrorMessage = useMemo(
    () => resolveErrorMessage(sendPhoneOTPError, t("auth_phone_submit_error")),
    [sendPhoneOTPError, t]
  );

  const telegramErrorMessage = useMemo(
    () => resolveErrorMessage(telegramError, t("auth_phone_submit_error")),
    [telegramError, t]
  );

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

    sendPhoneOTP({ phoneNumber: rawPhoneNumber });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPhoneComplete, rawPhoneNumber]);

  const handleEditPhone = useCallback(() => {
    resetSendPhoneOTPMutation();
    setFlowStep("phone");
    setIsTouched(false);
    setSubmittedPhone({ masked: "", raw: "" });
  }, [resetSendPhoneOTPMutation]);

  const handleTelegramSignIn = useCallback(() => {
    signInWithTelegram();
  }, [signInWithTelegram]);

  useEffect(() => {
    if (!isSendPhoneOTPSuccess) return;

    setSubmittedPhone({
      masked: phoneNumber,
      raw: rawPhoneNumber,
    });
    setFlowStep("otp");
  }, [isSendPhoneOTPSuccess, phoneNumber, rawPhoneNumber]);

  if (flowStep === "otp" && submittedPhone.raw) {
    return (
      <SubmitOTPView
        key={submittedPhone.raw}
        rawPhoneNumber={submittedPhone.raw}
        onEditPhone={handleEditPhone}
      />
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]} applyTopInsets>
      <View style={styles.pageHeader}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("common_close")}
          hitSlop={12}
          onPress={() => router.back()}
        >
          <MaterialIcons name="close" size={28} color={textColor} />
        </Pressable>
      </View>

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
          <AppMaskInput
            label={t("auth_phone_input_label")}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            mask={uzbekPhoneMask}
            placeholder={t("auth_phone_input_placeholder")}
            error={showError ? t("auth_phone_input_error_invalid") : undefined}
            helperText={!showError ? t("auth_phone_input_helper") : undefined}
          />

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
            disabled={!isPhoneComplete || isSendPhoneOTPLoading}
            accessibilityRole="button"
            accessibilityState={{
              disabled: !isPhoneComplete || isSendPhoneOTPLoading,
            }}
            accessibilityHint={t("auth_phone_submit_accessibility_hint")}
          >
            <ThemedText
              style={styles.submitText}
              lightColor={textOnTint}
              darkColor={textOnTint}
            >
              {isSendPhoneOTPLoading ? (
                <ActivityIndicator size="small" color={textOnTint} />
              ) : (
                t("auth_phone_submit")
              )}
            </ThemedText>
          </TouchableOpacity>

          {sendPhoneErrorMessage ? (
            <ThemedText style={[styles.errorText, { color: errorColor }]}>
              {sendPhoneErrorMessage}
            </ThemedText>
          ) : null}

          {telegramErrorMessage ? (
            <ThemedText style={[styles.errorText, { color: errorColor }]}>
              {telegramErrorMessage}
            </ThemedText>
          ) : null}
        </ThemedView>

        <View style={{ gap: 12, width: "100%" }}>
          <View style={styles.dividerContainer}>
            <View
              style={[styles.dividerLine, { backgroundColor: dividerColor }]}
            />
            <ThemedText style={[styles.dividerText, { color: helperColor }]}>
              {t("auth_phone_divider")}
            </ThemedText>
            <View
              style={[styles.dividerLine, { backgroundColor: dividerColor }]}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.telegramButton,
              {
                backgroundColor: telegramButtonColor,
              },
            ]}
            onPress={handleTelegramSignIn}
            disabled={isTelegramLoading}
            accessibilityRole="button"
            accessibilityState={{
              disabled: isTelegramLoading,
              busy: isTelegramLoading,
            }}
            accessibilityHint={t("auth_telegram_sign_in_accessibility_hint")}
          >
            {isTelegramLoading ? (
              <ActivityIndicator size="small" color={textOnTint} />
            ) : (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <ThemedText style={[styles.submitText, { color: textOnTint }]}>
                  {t("auth_telegram_sign_in")}
                </ThemedText>

                <MaterialIcons name="telegram" size={24} color={textOnTint} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ThemedText style={[styles.termsText, { color: helperColor }]}>
          {t("auth_phone_terms")}
        </ThemedText>
      </KeyboardAwareScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollView: {},
  scrollViewContainer: {
    flexGrow: 1,
    gap: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    paddingTop: 64,
  },
  container: {
    flex: 1,
  },
  pageHeader: {
    alignItems: "flex-start",
    paddingTop: 16,
    paddingHorizontal: 24,
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
  errorText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  termsText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  dividerText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    fontWeight: "500",
  },
  telegramButton: {
    height: 56,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
});
