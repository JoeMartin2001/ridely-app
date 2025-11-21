import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AppSwitch from "@/components/ui/app-switch";
import { LoadingView } from "@/components/ui/loading-view";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppTheme } from "@/lib/providers/ThemeProvider";
import { useGetProfileQuery } from "@/lib/services/users/usersApi";
import { useAppSelector } from "@/lib/store";
import { Image } from "expo-image";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const getInitials = (firstName: string) => {
  return firstName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

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
  { key: "feedback", label: "profile_feedback" },
  {
    key: "language",
    label: "profile_language",
    onPress: () => router.push("/switch-language"),
  },
  { key: "notifications", label: "profile_notifications" },
];

export default function ProfileScreen() {
  const { t } = useTranslation();

  const { colorScheme, setColorScheme } = useAppTheme();

  const isDarkThemeEnabled = colorScheme === "dark";

  const cardColor = useThemeColor({}, "card");
  const dividerColor = useThemeColor({}, "dividerDark");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const avatarBackground = useThemeColor({}, "avatarBackground");
  const tintColor = useThemeColor({}, "tint");
  const textOnTint = useThemeColor({}, "textOnTint");

  const { session } = useAppSelector((state) => state.auth);

  const { data: profile, isLoading: isLoadingProfile } = useGetProfileQuery(
    session?.user?.id ?? "",
    {
      skip: !session,
    }
  );

  const handleChangeTheme = useCallback((value: boolean) => {
    setColorScheme(value ? "dark" : "light");
  }, []);

  // Show loading if no session or if profile is loading
  if (!session || !profile || isLoadingProfile) return <LoadingView />;

  const initials = getInitials(profile?.firstName ?? "");

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <KeyboardAwareScrollView
        style={{ backgroundColor }}
        contentContainerStyle={[styles.contentContainer]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.profileCard]}>
          <View style={[styles.avatar, { backgroundColor: avatarBackground }]}>
            {profile?.avatarUrl ? (
              <Image
                source={{ uri: profile.avatarUrl }}
                style={styles.avatar}
              />
            ) : initials ? (
              <ThemedText style={styles.avatarInitials}>{initials}</ThemedText>
            ) : (
              <MaterialIcons name="person" size={42} color={textColor} />
            )}
          </View>

          <View style={styles.profileInfo}>
            <ThemedText style={styles.profileName}>
              {profile?.firstName}
            </ThemedText>
            <ThemedText style={styles.profilePhone}>
              {profile?.phoneNumber || profile?.username}
            </ThemedText>
          </View>
        </View>

        <View style={[styles.menuSection]}>
          <Pressable
            style={[
              styles.menuItem,
              styles.driverItem,
              { backgroundColor: cardColor, borderColor: dividerColor },
            ]}
            onPress={() => router.push("/driver/setup")}
          >
            <View style={styles.driverContent}>
              <View style={[styles.driverIcon, { backgroundColor: tintColor }]}>
                <MaterialIcons
                  name="directions-car"
                  size={24}
                  color={textOnTint}
                />
              </View>
              <View>
                <ThemedText style={styles.driverTitle}>
                  {t("become_driver", "Become a Driver")}
                </ThemedText>
                <ThemedText style={styles.driverSubtitle}>
                  {t("start_earning", "Start earning with Ridely")}
                </ThemedText>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={textColor} />
          </Pressable>
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
    fontWeight: "500",
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
    fontWeight: "500",
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
  driverItem: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  driverContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  driverIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  driverTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
  },
  driverSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
});
