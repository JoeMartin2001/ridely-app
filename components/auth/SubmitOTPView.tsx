import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { BorderRadius, Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  useSendPhoneOTPMutation,
  useVerifyPhoneAndLoginMutation,
} from "@/lib/services/auth/authApi";
import { resolveErrorMessage } from "@/lib/utils/errorUtils";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type SubmitOTPViewProps = {
  rawPhoneNumber: string;
  onEditPhone?: () => void;
  initialCountdown?: number;
};

const OTP_LENGTH = 6;
const DEFAULT_COUNTDOWN_SECONDS = 60;

export const SubmitOTPView = ({
  rawPhoneNumber,
  onEditPhone,
  initialCountdown = DEFAULT_COUNTDOWN_SECONDS,
}: SubmitOTPViewProps) => {
  const { t } = useTranslation();

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

  const [otpCode, setOtpCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [countdown, setCountdown] = useState(initialCountdown);

  const [
    verifyPhoneAndLogin,
    { isLoading: isVerifyLoading, error: verifyError, reset: resetVerify },
  ] = useVerifyPhoneAndLoginMutation();

  const [
    resendPhoneOTP,
    { isLoading: isResendLoading, error: resendError, reset: resetResend },
  ] = useSendPhoneOTPMutation();

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    return () => {
      resetVerify();
      resetResend();
    };
  }, [resetResend, resetVerify]);

  const handleCodeChange = useCallback(
    (value: string) => {
      const sanitized = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
      setOtpCode(sanitized);

      if (sanitized.length < OTP_LENGTH) {
        setIsTouched(false);
      }

      if (verifyError) {
        resetVerify();
      }
    },
    [resetVerify, verifyError]
  );

  const isCodeComplete = otpCode.length === OTP_LENGTH;
  const showInputError = isTouched && !isCodeComplete;

  const verifyErrorMessage = useMemo(
    () => resolveErrorMessage(verifyError, t("auth_otp_error_generic")),
    [verifyError, t]
  );

  const resendErrorMessage = useMemo(
    () => resolveErrorMessage(resendError, t("auth_phone_submit_error")),
    [resendError, t]
  );

  const handleSubmit = useCallback(() => {
    if (!isCodeComplete) {
      setIsTouched(true);
      return;
    }

    verifyPhoneAndLogin({ phoneNumber: rawPhoneNumber, otpCode }).then(
      (session) => {
        if (session) {
          router.back();
        } else {
          console.error("Failed to verify phone and login");
        }
      }
    );
  }, [isCodeComplete, otpCode, rawPhoneNumber, verifyPhoneAndLogin]);

  const handleResend = useCallback(() => {
    if (countdown > 0 || isResendLoading) {
      return;
    }

    resendPhoneOTP({ phoneNumber: rawPhoneNumber });
    setCountdown(initialCountdown);
    setIsTouched(false);
    resetVerify();
  }, [
    countdown,
    initialCountdown,
    isResendLoading,
    resetVerify,
    rawPhoneNumber,
    resendPhoneOTP,
  ]);

  const handleEditPhonePress = useCallback(() => {
    resetVerify();
    resetResend();
    setOtpCode("");
    setIsTouched(false);
    setCountdown(initialCountdown);
    onEditPhone?.();
  }, [initialCountdown, onEditPhone, resetResend, resetVerify]);

  const inputHasError = showInputError || Boolean(verifyErrorMessage);
  const inputBorderColor = inputHasError
    ? errorColor
    : isFocused
    ? tintColor
    : dividerColor;

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
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <ThemedText style={[styles.brandTitle, { color: tintColor }]}>
            {t("auth_phone_title")}
          </ThemedText>
          <ThemedText style={[styles.tagline, { color: taglineColor }]}>
            {t("auth_otp_tagline")}
          </ThemedText>
        </View>

        <ThemedView
          style={[styles.formContainer, { backgroundColor: cardColor }]}
        >
          <View style={styles.field}>
            <ThemedText style={[styles.label, { color: helperColor }]}>
              {t("auth_otp_input_label")}
            </ThemedText>

            <TextInput
              style={[
                styles.input,
                {
                  color: textColor,
                  borderColor: inputBorderColor,
                },
              ]}
              value={otpCode}
              onChangeText={handleCodeChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={t("auth_otp_input_placeholder")}
              placeholderTextColor={placeholderColor}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              returnKeyType="done"
              maxLength={OTP_LENGTH}
              selectionColor={tintColor}
              accessible
              accessibilityLabel={t("auth_otp_input_label")}
              accessibilityHint={t("auth_otp_input_helper")}
            />
          </View>

          {verifyErrorMessage ? (
            <ThemedText style={[styles.errorText, { color: errorColor }]}>
              {verifyErrorMessage}
            </ThemedText>
          ) : null}

          {resendErrorMessage ? (
            <ThemedText style={[styles.errorText, { color: errorColor }]}>
              {resendErrorMessage}
            </ThemedText>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.submitButton,
              {
                backgroundColor: tintColor,
                opacity: isCodeComplete ? 1 : 0.5,
              },
            ]}
            onPress={handleSubmit}
            disabled={!isCodeComplete || isVerifyLoading}
            accessibilityRole="button"
            accessibilityState={{
              disabled: !isCodeComplete || isVerifyLoading,
              busy: isVerifyLoading,
            }}
            accessibilityHint={t("auth_otp_submit_accessibility_hint")}
          >
            <ThemedText
              style={styles.submitText}
              lightColor={textOnTint}
              darkColor={textOnTint}
            >
              {isVerifyLoading ? (
                <ActivityIndicator size="small" color={textOnTint} />
              ) : (
                t("auth_phone_submit")
              )}
            </ThemedText>
          </TouchableOpacity>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={handleResend}
              disabled={countdown > 0 || isResendLoading}
              accessibilityRole="button"
              accessibilityHint={t("auth_otp_resend_accessibility_hint")}
              accessibilityState={{
                disabled: countdown > 0 || isResendLoading,
                busy: isResendLoading,
              }}
            >
              <ThemedText
                style={[
                  styles.linkText,
                  {
                    color:
                      countdown > 0 || isResendLoading
                        ? helperColor
                        : tintColor,
                  },
                ]}
              >
                {countdown > 0
                  ? t("auth_otp_resend_in", { seconds: countdown })
                  : t("auth_otp_resend")}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={handleEditPhonePress}
              accessibilityRole="button"
              accessibilityHint={t("auth_otp_change_phone_accessibility_hint")}
            >
              <ThemedText style={[styles.linkText, { color: tintColor }]}>
                {t("auth_otp_change_phone")}
              </ThemedText>
            </TouchableOpacity>
          </View>
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
    height: 72,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 24,
    fontSize: 28,
    letterSpacing: 12,
    backgroundColor: "transparent",
    borderWidth: 1,
    textAlign: "center",
    fontFamily: Fonts.rounded,
  },
  helperText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  errorText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  infoText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
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
  actions: {
    gap: 12,
    alignItems: "center",
  },
  linkButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  linkText: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
