import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";

type MenuSectionHeaderProps = {
  title: string;
  iconName?: Parameters<typeof IconSymbol>[0]["name"];
};

export const MenuSectionHeader = ({
  iconName,
  title,
}: MenuSectionHeaderProps) => {
  const iconColor = useThemeColor({}, "icon");

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      {iconName ? <IconSymbol name={iconName} size={20} color={iconColor} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
  },
});


