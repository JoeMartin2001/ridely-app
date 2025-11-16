import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppSelector } from "@/lib/store";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { LoadingView } from "@/components/ui/loading-view";
import { useSignOutMutation } from "@/lib/services/auth/authApi";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/lib/services/users/usersApi";
import { resolveErrorMessage } from "@/lib/utils/errorUtils";

const EditProfileScreen = () => {
  const { t } = useTranslation();
  const [signOut, { isLoading: isSigningOut }] = useSignOutMutation();

  const { session } = useAppSelector((state) => state.auth);
  const userId = session?.user?.id ?? "";

  const { data: profile, isLoading: isLoadingProfile } = useGetProfileQuery(
    userId,
    {
      skip: !userId,
    }
  );

  const [updateProfile, { isLoading: isUpdating, error: updateError }] =
    useUpdateProfileMutation();

  const cardColor = useThemeColor({}, "card");
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const textReverse = useThemeColor({}, "textReverse");
  const tintColor = useThemeColor({}, "tint");
  const dividerColor = useThemeColor({}, "divider");
  const avatarBackground = useThemeColor({}, "avatarBackground");
  const errorColor = useThemeColor({}, "error");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Initialize form state from profile data
  useEffect(() => {
    if (profile) {
      setName(profile.firstName ?? "");
      setPhone(profile.phoneNumber ?? "+998");
    }
  }, [profile]);

  // Reset errors when user types
  useEffect(() => {
    if (name.trim()) {
      setNameError(null);
    }
  }, [name]);

  useEffect(() => {
    if (phone.trim()) {
      setPhoneError(null);
    }
  }, [phone]);

  const hasChanges = useMemo(() => {
    if (!profile) return false;
    return (
      name.trim() !== (profile.firstName ?? "") ||
      phone.trim() !== (profile.phoneNumber ?? "")
    );
  }, [name, phone, profile]);

  const updateErrorMessage = useMemo(
    () =>
      resolveErrorMessage(
        updateError,
        t("edit_profile_update_error") || "Failed to update profile"
      ),
    [updateError, t]
  );

  const validateForm = (): boolean => {
    let isValid = true;

    if (!name.trim()) {
      setNameError(t("edit_profile_name_required") || "Name is required");
      isValid = false;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim() || phone.trim() === "+998" || phoneDigits.length < 12) {
      setPhoneError(
        t("edit_profile_phone_required") || "Phone number is required"
      );
      isValid = false;
    } else if (!phone.trim().startsWith("+998") || phoneDigits.length !== 12) {
      setPhoneError(
        t("edit_profile_phone_invalid") || "Please enter a valid phone number"
      );
      isValid = false;
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!userId || !profile) return;

    // Clear previous errors
    setNameError(null);
    setPhoneError(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await updateProfile({
        userId,
        updates: {
          firstName: name.trim(),
          phoneNumber: phone.trim(),
        },
      }).unwrap();

      // Show success and navigate back
      router.back();
    } catch (error) {
      // Error is handled by updateErrorMessage
      console.error("Failed to update profile:", error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t("edit_profile_logout_title"),
      t("edit_profile_logout_message"),
      [
        {
          text: t("edit_profile_logout_cancel"),
          style: "cancel",
        },
        {
          text: t("edit_profile_logout_confirm"),
          onPress: () => signOut().then(() => router.back()),
        },
      ]
    );
  };

  if (isLoadingProfile) return <LoadingView />;

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <Header
        title={t("edit_profile_title")}
        onGoBack={() => router.back()}
        rightButton={
          <Pressable onPress={handleLogout} disabled={isSigningOut}>
            {isSigningOut ? (
              <ActivityIndicator size="small" color={textColor} />
            ) : (
              <MaterialIcons name="logout" size={22} color={textColor} />
            )}
          </Pressable>
        }
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.contentContainer, { backgroundColor }]}
      >
        <View style={styles.avatarSection}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: avatarBackground,
              },
            ]}
          >
            <MaterialIcons name="person" size={46} color={textColor} />
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => {}}
            style={[styles.changeAvatarButton, { backgroundColor: cardColor }]}
          >
            <ThemedText
              type="defaultSemiBold"
              style={[
                styles.changeAvatarText,
                { color: textColor, opacity: 0.9 },
              ]}
            >
              {t("edit_profile_change_avatar")}
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.fields}>
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>
              {t("edit_profile_name_label")}
            </ThemedText>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: cardColor,
                  borderColor: nameError ? errorColor : dividerColor,
                  borderWidth: nameError ? 1 : StyleSheet.hairlineWidth,
                },
              ]}
            >
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={t("edit_profile_name_placeholder")}
                placeholderTextColor={dividerColor}
                style={[styles.input, { color: textColor }]}
                editable={!isUpdating}
              />
            </View>
            {nameError && (
              <ThemedText style={[styles.errorText, { color: errorColor }]}>
                {nameError}
              </ThemedText>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>
              {t("edit_profile_phone_label")}
            </ThemedText>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: cardColor,
                  borderColor: phoneError ? errorColor : dividerColor,
                  borderWidth: phoneError ? 1 : StyleSheet.hairlineWidth,
                },
              ]}
            >
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="+998"
                placeholderTextColor={dividerColor}
                style={[styles.input, { color: textColor }]}
                keyboardType="phone-pad"
                editable={!isUpdating}
              />
            </View>
            {phoneError && (
              <ThemedText style={[styles.errorText, { color: errorColor }]}>
                {phoneError}
              </ThemedText>
            )}
            {updateErrorMessage && !phoneError && (
              <ThemedText style={[styles.errorText, { color: errorColor }]}>
                {updateErrorMessage}
              </ThemedText>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          onPress={handleSave}
          disabled={isUpdating || !hasChanges}
          style={[
            styles.saveButton,
            {
              backgroundColor: hasChanges ? tintColor : dividerColor,
              opacity: isUpdating || !hasChanges ? 0.6 : 1,
            },
          ]}
        >
          {isUpdating ? (
            <ActivityIndicator size="small" color={textReverse} />
          ) : (
            <ThemedText
              type="defaultSemiBold"
              style={[styles.saveButtonText, { color: textReverse }]}
            >
              {t("edit_profile_save")}
            </ThemedText>
          )}
        </Pressable>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 120,
    gap: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 12,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    letterSpacing: 0.4,
  },
  avatarSection: {
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  changeAvatarButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
  },
  changeAvatarText: {
    fontSize: 14,
    letterSpacing: 0.4,
  },
  fields: {
    gap: 20,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    opacity: 0.7,
    textTransform: "uppercase",
  },
  inputWrapper: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  input: {
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  saveButton: {
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontSize: 16,
    letterSpacing: 0.6,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default EditProfileScreen;
