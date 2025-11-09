import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type Category = {
  id: string;
  label: string;
};

type HomeCategoryTabsProps = {
  categories: Category[];
  activeCategoryId: string;
  onSelect: (categoryId: string) => void;
  onPressFilter?: () => void;
};

export const HomeCategoryTabs = ({
  categories,
  activeCategoryId,
  onPressFilter,
  onSelect,
}: HomeCategoryTabsProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        onPress={onPressFilter}
        style={[styles.filterButton, { backgroundColor: theme.card }]}
      >
        <IconSymbol name="slider.horizontal.3" size={20} color={theme.icon} />
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContent}
      >
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <Pressable
              key={category.id}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              onPress={() => onSelect(category.id)}
              style={[
                styles.tab,
                {
                  backgroundColor: isActive ? theme.tint : theme.card,
                },
              ]}
            >
              <ThemedText
                type="defaultSemiBold"
                style={[
                  styles.tabLabel,
                  {
                    color: isActive ? theme.background : theme.text,
                  },
                ]}
              >
                {category.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 24,
    paddingBottom: 10,
    gap: 12,
  },
  filterButton: {
    width: 48,
    height: 36,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  tabsContent: {
    paddingRight: 24,
    gap: 12,
  },
  tab: {
    borderRadius: 22,
    paddingHorizontal: 16,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
