import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";

type MenuItemIngredientProps = {
  label: string;
  priceLabel: string;
  checked: boolean;
  onToggle: () => void;
  showDivider?: boolean;
};

export const MenuItemIngredient = ({
  checked,
  label,
  onToggle,
  priceLabel,
  showDivider = false,
}: MenuItemIngredientProps) => {
  const tintColor = useThemeColor({}, "tint");
  const dividerColor = useThemeColor({}, "divider");
  const darkDividerColor = useThemeColor({}, "dividerDark");
  const textReverse = useThemeColor({}, "textReverse");

  return (
    <View
      style={[
        styles.container,
        showDivider && {
          borderBottomColor: darkDividerColor,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      ]}
    >
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        onPress={onToggle}
        style={styles.row}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: checked ? tintColor : dividerColor,
              backgroundColor: checked ? tintColor : "transparent",
            },
          ]}
        >
          {checked ? (
            <IconSymbol name="checkmark" size={18} color={textReverse} />
          ) : null}
        </View>

        <View style={styles.info}>
          <ThemedText style={styles.label}>{label}</ThemedText>
        </View>

        <ThemedText style={styles.price}>{priceLabel}</ThemedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 15,
  },
  price: {
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
