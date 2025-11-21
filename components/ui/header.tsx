import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { router } from "expo-router";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../themed-text";
import { IconSymbol } from "./icon-symbol";

type HeaderProps = {
  title?: string;
  onGoBack?: () => void;
  showBackButton?: boolean;
  rightView?: React.ReactNode;
  leftView?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  transparent?: boolean;
  backgroundColor?: string;
};

export const Header = ({
  title,
  onGoBack,
  showBackButton = true,
  rightView,
  leftView,
  style,
  titleStyle,
  transparent = false,
  backgroundColor: customBackgroundColor,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const themeBackgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const dividerColor = useThemeColor({}, "divider");

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  const backgroundColor = transparent
    ? "transparent"
    : customBackgroundColor || themeBackgroundColor;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor,
          borderBottomColor: transparent ? "transparent" : dividerColor,
          borderBottomWidth: transparent ? 0 : StyleSheet.hairlineWidth,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <Pressable
              onPress={handleGoBack}
              style={({ pressed }) => [
                styles.backButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              hitSlop={10}
            >
              <IconSymbol name="arrow.left" size={24} color={textColor} />
            </Pressable>
          )}
          {leftView}
        </View>

        <View style={styles.titleContainer}>
          {title && (
            <ThemedText
              style={[styles.title, titleStyle]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </ThemedText>
          )}
        </View>

        <View style={styles.rightContainer}>{rightView}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  content: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  backButton: {
    padding: 4,
    marginLeft: -4, // Align icon visually with padding
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.rounded,
    fontWeight: "600",
    textAlign: "center",
  },
});
