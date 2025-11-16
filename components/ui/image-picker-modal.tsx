import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BorderRadius, Shadows } from "@/constants/style";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "../themed-text";

const LAUNCH_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images", "videos"],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};

type Props = {
  onImageSelected: (image: string) => void;
  extraOptions?: ImagePicker.ImagePickerOptions;
  children: React.ReactNode;
};

export const ImagePickerModal = (props: Props) => {
  const { onImageSelected, extraOptions = {}, children } = props;

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [statusGallery, requestPermissionGallery] =
    ImagePicker.useMediaLibraryPermissions();

  const [visible, setVisible] = useState(false);
  const [isLaunchingGallery, setIsLaunchingGallery] = useState(false);
  const [isLaunchingCamera, setIsLaunchingCamera] = useState(false);

  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const dividerColor = useThemeColor({}, "divider");
  const tintColor = useThemeColor({}, "tint");
  const textOnTint = useThemeColor({}, "textOnTint");

  const handleClose = () => {
    setVisible(false);
  };

  const handleLaunchGallery = async () => {
    if (!statusGallery?.granted && statusGallery?.status !== "granted") {
      const result = await requestPermissionGallery();

      if (!result?.granted) {
        Alert.alert(
          t("image_picker_permission_denied_title"),
          t("image_picker_permission_denied_message")
        );
        return;
      }
    }

    // No permissions request is necessary for launching the image library
    setIsLaunchingGallery(true);

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        ...LAUNCH_OPTIONS,
        ...extraOptions,
      });

      if (!result.canceled) {
        onImageSelected(result.assets[0].uri);
        setVisible(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLaunchingGallery(false);
    }
  };

  const handleLaunchCamera = async () => {
    if (!status?.granted && status?.status !== "granted") {
      const result = await requestPermission();

      if (!result?.granted) {
        Alert.alert(
          t("image_picker_camera_permission_denied_title"),
          t("image_picker_camera_permission_denied_message")
        );
        return;
      }
    }

    setIsLaunchingCamera(true);

    try {
      let result = await ImagePicker.launchCameraAsync({
        ...LAUNCH_OPTIONS,
        ...extraOptions,
      });

      if (!result.canceled) {
        onImageSelected(result.assets[0].uri);
        setVisible(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLaunchingCamera(false);
    }
  };

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>{children}</Pressable>

      <Modal
        style={styles.modal}
        isVisible={visible}
        onBackButtonPress={handleClose}
        onBackdropPress={handleClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        useNativeDriverForBackdrop
        hideModalContentWhileAnimating
        backdropColor="rgba(0, 0, 0, 0.5)"
      >
        <View style={styles.modalContainer}>
          {/* Content Container */}
          <View
            style={[
              styles.contentContainer,
              {
                backgroundColor: cardColor,
                paddingBottom: insets.bottom + 24,
              },
              Shadows.xl,
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              <ThemedText type="defaultSemiBold" style={styles.title}>
                {t("image_picker_title")}
              </ThemedText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("common_close")}
                hitSlop={12}
                onPress={handleClose}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={28} color={textColor} />
              </Pressable>
            </View>

            {/* Divider */}
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />

            {/* Buttons Container */}
            <View style={styles.buttonsContainer}>
              <Pressable
                style={[
                  styles.button,
                  { backgroundColor: tintColor },
                  Shadows.xs,
                ]}
                onPress={handleLaunchCamera}
                android_ripple={{ color: "rgba(255,255,255,0.2)" }}
                disabled={isLaunchingCamera}
              >
                <MaterialIcons name="camera-alt" size={24} color={textOnTint} />
                <ThemedText style={[styles.buttonText, { color: textOnTint }]}>
                  {t("image_picker_camera")}
                </ThemedText>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  { backgroundColor: tintColor },
                  Shadows.xs,
                ]}
                onPress={handleLaunchGallery}
                android_ripple={{ color: "rgba(255,255,255,0.2)" }}
                disabled={isLaunchingGallery}
              >
                <MaterialIcons
                  name="photo-library"
                  size={24}
                  color={textOnTint}
                />
                <ThemedText style={[styles.buttonText, { color: textOnTint }]}>
                  {t("image_picker_gallery")}
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
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
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 24,
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.md,
    gap: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
