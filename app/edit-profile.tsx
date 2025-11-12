import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppSelector } from "@/lib/store";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditProfileScreen = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);

  const cardColor = useThemeColor({}, "card");
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const textReverse = useThemeColor({}, "textReverse");
  const tintColor = useThemeColor({}, "tint");
  const dividerColor = useThemeColor({}, "divider");
  const avatarBackground = useThemeColor({}, "avatarBackground");

  const [name, setName] = useState(user?.firstName ?? "");
  const [phone, setPhone] = useState(user?.phoneNumber ?? "+998");
  const [birthDate, setBirthDate] = useState("26.11.2001");

  const handleSave = () => {
    // TODO: connect to API or store update
    router.back();
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <Header
        title={t("edit_profile_title")}
        onGoBack={() => router.back()}
        rightButton={
          <Pressable onPress={() => {}}>
            <MaterialIcons name="logout" size={22} color={textColor} />
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
                { backgroundColor: cardColor, borderColor: dividerColor },
              ]}
            >
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={t("edit_profile_name_placeholder")}
                placeholderTextColor={dividerColor}
                style={[styles.input, { color: textColor }]}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>
              {t("edit_profile_birthday_label")}
            </ThemedText>
            <View
              style={[
                styles.inputWrapper,
                { backgroundColor: cardColor, borderColor: dividerColor },
              ]}
            >
              <TextInput
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="dd.mm.yyyy"
                placeholderTextColor={dividerColor}
                style={[styles.input, { color: textColor }]}
                keyboardType="numbers-and-punctuation"
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>
              {t("edit_profile_phone_label")}
            </ThemedText>
            <View
              style={[
                styles.inputWrapper,
                { backgroundColor: cardColor, borderColor: dividerColor },
              ]}
            >
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="+998"
                placeholderTextColor={dividerColor}
                style={[styles.input, { color: textColor }]}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: tintColor }]}
        >
          <ThemedText
            type="defaultSemiBold"
            style={[styles.saveButtonText, { color: textReverse }]}
          >
            {t("edit_profile_save")}
          </ThemedText>
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
});

export default EditProfileScreen;
