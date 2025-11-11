import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { PhoneOTPView } from "@/components/auth/PhoneOTPView";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AppSwitch } from "@/components/ui/app-switch";
import { Header } from "@/components/ui/header";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppTheme } from "@/lib/providers/ThemeProvider";
import { useAppSelector } from "@/lib/store";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type MenuItem = {
  key: string;
  label: string;
  onPress?: () => void;
  destructive?: boolean;
};

const primaryMenuItems: MenuItem[] = [
  {
    key: "personal_data",
    label: "profile_personal_data",
    onPress: () => router.push("/edit-profile"),
  },
  { key: "orders", label: "profile_orders" },
  { key: "feedback", label: "profile_feedback" },
  { key: "branches", label: "profile_branches" },
  {
    key: "language",
    label: "profile_language",
    onPress: () => router.push("/switch-language"),
  },
  { key: "notifications", label: "profile_notifications" },
];

export default function ProfileScreen() {
  const { t } = useTranslation();

  const cardColor = useThemeColor({}, "card");
  const dividerColor = useThemeColor({}, "dividerDark");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const avatarBackground = useThemeColor({}, "avatarBackground");

  const { user } = useAppSelector((state) => state.user);

  const { colorScheme, setColorScheme } = useAppTheme();

  const isDarkThemeEnabled = colorScheme === "dark";

  const handleChangeTheme = useCallback(
    (value: boolean) => {
      setColorScheme(value ? "dark" : "light");
    },
    [setColorScheme]
  );

  const initials = useMemo(() => {
    if (!user?.name) return "";

    return user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }, [user?.name]);

  if (!user) return <PhoneOTPView />;

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <Header title={t("profile")} />

      <KeyboardAwareScrollView
        style={{ backgroundColor }}
        contentContainerStyle={[styles.contentContainer]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.profileCard]}>
          <View style={[styles.avatar, { backgroundColor: avatarBackground }]}>
            {initials ? (
              <ThemedText style={styles.avatarInitials}>{initials}</ThemedText>
            ) : (
              <MaterialIcons name="person" size={42} color={textColor} />
            )}
          </View>

          <View style={styles.profileInfo}>
            <ThemedText style={styles.profileName}>{user.name}</ThemedText>
            <ThemedText style={styles.profilePhone}>{user.phone}</ThemedText>
          </View>
        </View>

        <View style={[styles.menuSection]}>
          {primaryMenuItems.map((item, index) => {
            return (
              <Pressable
                key={item.key}
                style={[
                  styles.menuItem,
                  styles.menuItemBorder,
                  { borderColor: dividerColor },
                ]}
                android_ripple={{ color: dividerColor }}
                onPress={item.onPress}
              >
                <ThemedText
                  style={[
                    styles.menuItemLabel,
                    item.destructive && styles.destructive,
                  ]}
                >
                  {t(item.label)}
                </ThemedText>
                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color={textColor}
                />
              </Pressable>
            );
          })}

          <View
            style={[
              styles.menuItem,
              styles.themeRow,
              styles.themeRowDivider,
              { borderColor: dividerColor },
            ]}
          >
            <ThemedText style={styles.menuItemLabel}>
              {t("profile_dark_theme")}
            </ThemedText>

            <View style={styles.switchWrapper}>
              <AppSwitch
                value={isDarkThemeEnabled}
                onChange={handleChangeTheme}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 24,
    gap: 24,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    gap: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontSize: 28,
    fontFamily: Fonts.rounded,
    textTransform: "uppercase",
  },
  profileInfo: {
    flex: 1,
    gap: 6,
  },
  profileName: {
    fontSize: 20,
    fontFamily: Fonts.rounded,
  },
  profilePhone: {
    opacity: 0.7,
  },
  menuSection: {},
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    backgroundColor: "transparent",
  },
  menuItemBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderStyle: "dashed",
  },
  menuItemLabel: {
    fontSize: 16,
  },
  themeRow: {
    gap: 16,
  },
  themeRowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderStyle: "dashed",
  },
  switchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  destructive: {
    color: "#FF453A",
  },
});
