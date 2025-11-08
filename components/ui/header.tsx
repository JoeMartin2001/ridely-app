import { useThemeColor } from "@/hooks/use-theme-color";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "./icon-symbol";

type HeaderProps = {
  title: string;
  onGoBack?: () => void;
  rightButton?: React.ReactNode;
};

export const Header = ({ title, onGoBack, rightButton }: HeaderProps) => {
  const color = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");

  return (
    <ThemedView style={styles.header} lightColor={color} darkColor={color}>
      {onGoBack && (
        <Pressable onPress={onGoBack} style={styles.backButton}>
          <IconSymbol name="chevron.backward" size={24} color={textColor} />
        </Pressable>
      )}

      <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
        {title}
      </ThemedText>

      {rightButton && <View style={styles.rightButton}>{rightButton}</View>}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    letterSpacing: 0.5,
  },
  backButton: {
    position: "absolute",
    left: 24,
  },
  rightButton: {
    position: "absolute",
    right: 24,
  },
});
