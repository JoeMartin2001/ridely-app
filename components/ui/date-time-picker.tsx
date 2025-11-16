import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ReactNativeDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BorderRadius, Shadows } from "@/constants/style";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppTheme } from "@/lib/providers/ThemeProvider";

type Props = {
  value: Date;
  mode: "date" | "time" | "datetime";
  display?: "default" | "spinner" | "calendar" | "clock";
  onChange: (date: Date) => void;
  button: React.ReactNode;
  title?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  testID?: string;
};

export const DateTimePicker = (props: Props) => {
  const {
    value,
    mode,
    display = Platform.OS === "ios" ? "spinner" : "default",
    onChange,
    button,
    title,
    minimumDate,
    maximumDate,
    testID,
  } = props;

  const { t } = useTranslation();
  const { colorScheme } = useAppTheme();
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const dividerColor = useThemeColor({}, "divider");
  const tintColor = useThemeColor({}, "tint");

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setVisible(false);
    }

    if (event.type === "set" && selectedDate) {
      onChange(selectedDate);
    } else if (event.type === "dismissed") {
      if (Platform.OS === "android") {
        setVisible(false);
      }
    }
  };

  const handleConfirm = () => {
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  // On Android, show native picker directly (no modal needed)
  if (Platform.OS === "android") {
    return (
      <>
        <Pressable onPress={() => setVisible(true)} testID={testID}>
          {button}
        </Pressable>
        {visible && (
          <ReactNativeDateTimePicker
            value={value}
            mode={mode}
            display={display}
            onChange={handleChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        )}
      </>
    );
  }

  // On iOS, show in a styled modal
  return (
    <>
      <Pressable onPress={() => setVisible(true)} testID={testID}>
        {button}
      </Pressable>

      <Modal
        visible={visible}
        onRequestClose={handleClose}
        transparent
        animationType="slide"
      >
        <ThemedView style={styles.modalContainer}>
          {/* Backdrop */}
          <Pressable
            style={styles.backdrop}
            onPress={handleClose}
            accessible={false}
          />

          {/* Content Container */}
          <ThemedView
            style={[
              styles.contentContainer,
              {
                backgroundColor: cardColor,
                paddingBottom: insets.bottom + 24,
              },
              Shadows.xl,
            ]}
            lightColor={cardColor}
            darkColor={cardColor}
          >
            {/* Header */}
            <View style={styles.header}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("common_close")}
                hitSlop={12}
                onPress={handleClose}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={28} color={textColor} />
              </Pressable>

              {title && <ThemedText style={styles.title}>{title}</ThemedText>}

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("common_confirm") || "Confirm"}
                hitSlop={12}
                onPress={handleConfirm}
                style={styles.confirmButton}
              >
                <ThemedText style={[styles.confirmText, { color: tintColor }]}>
                  {t("common_confirm") || "Done"}
                </ThemedText>
              </Pressable>
            </View>

            {/* Divider */}
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />

            {/* Picker */}
            <View style={styles.pickerContainer}>
              <ReactNativeDateTimePicker
                value={value}
                mode={mode}
                display={display}
                onChange={handleChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                textColor={textColor}
                themeVariant={colorScheme === "dark" ? "dark" : "light"}
              />
            </View>
          </ThemedView>
        </ThemedView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 56,
  },
  closeButton: {
    padding: 4,
  },
  confirmButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
    textAlign: "center",
    marginHorizontal: 16,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 24,
  },
  pickerContainer: {
    paddingVertical: 16,
    alignItems: "center",
  },
});
