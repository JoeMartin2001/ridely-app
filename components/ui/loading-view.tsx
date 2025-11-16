import { useThemeColor } from "@/hooks/use-theme-color";
import { ActivityIndicator, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type LoadingViewProps = {
  message?: string;
  size?: "small" | "large";
};

export const LoadingView = ({ message, size = "large" }: LoadingViewProps) => {
  const tintColor = useThemeColor({}, "tint");

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size={size} color={tintColor} />
      {message && (
        <ThemedText style={styles.message} type="default">
          {message}
        </ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  message: {
    marginTop: 8,
  },
});
