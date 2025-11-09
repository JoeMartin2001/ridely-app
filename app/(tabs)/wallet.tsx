import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { PhoneOTPView } from "@/components/auth/PhoneOTPView";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppSelector } from "@/lib/store";

export default function WalletScreen() {
  const { t, i18n } = useTranslation();
  const { user } = useAppSelector((state) => state.user);
  const cardColor = useThemeColor({}, "card");
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const locale = useMemo(
    () => (i18n.language || "ru").replace("_", "-"),
    [i18n.language]
  );

  const walletBalance = user?.walletBalance ?? 0;
  const formattedBalance = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: 0,
      }).format(walletBalance),
    [locale, walletBalance]
  );

  const balanceText = t("wallet_balance_value", {
    amount: formattedBalance,
  });

  const phoneNumber = user?.phone ?? "";

  if (!user) return <PhoneOTPView />;

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <Header title={t("wallet")} />

      <ScrollView style={[styles.scrollView, { backgroundColor }]}>
        <ThemedText style={styles.instruction}>
          {t("wallet_instruction")}
        </ThemedText>
        <View style={[styles.qrWrapper]}>
          {phoneNumber ? (
            <QRCode
              value={phoneNumber}
              size={240}
              backgroundColor={backgroundColor}
              color={textColor}
            />
          ) : (
            <ThemedText style={styles.noPhoneText}>
              {t("wallet_no_phone")}
            </ThemedText>
          )}
        </View>
        <View style={styles.balanceRow}>
          <ThemedText style={styles.balanceLabel}>
            {t("wallet_balance_label")}
          </ThemedText>
          <ThemedText style={styles.balanceValue}>{balanceText}</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
    gap: 20,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontFamily: Fonts.rounded,
    marginTop: 8,
  },
  instruction: {
    textAlign: "center",
    opacity: 0.7,
  },
  qrWrapper: {
    alignSelf: "center",
    padding: 24,
    borderRadius: 16,
  },
  noPhoneText: {
    maxWidth: 200,
    textAlign: "center",
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  balanceLabel: {
    fontFamily: Fonts.sans,
    opacity: 0.7,
  },
  balanceValue: {
    fontFamily: Fonts.rounded,
    fontSize: 20,
  },
});
