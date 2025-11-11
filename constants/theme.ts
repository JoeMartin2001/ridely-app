/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#0a7ea4";

export const Colors = {
  light: {
    text: "#11181C",
    textReverse: "#fff",
    tagline: "rgba(17, 24, 28, 0.65)",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    card: "#f5f5f5",
    cardElevated: "#ECEEF1",
    cardMuted: "#E7EAEE",
    divider: "rgba(0, 0, 0, 0.2)",
    dividerDark: "rgba(0, 0, 0, 0.9)",
    avatarBackground: "rgba(0, 0, 0, 0.2)",
    surfaceMuted: "rgba(0, 0, 0, 0.05)",
    accentSurface: "rgba(10, 126, 164, 0.08)",
    accentSurfaceBorder: "rgba(10, 126, 164, 0.22)",
    routePill: "#ECEEF1",
    chipIndicator: tintColorLight,
    tripLine: "rgba(0, 0, 0, 0.12)",
    avatarPlaceholder: "rgba(10, 126, 164, 0.12)",
    switchThumb: "#ffffff",
    switchTrack: "#34C759",
    switchTrackInactive: "#000000",
  },
  dark: {
    text: "#ECEDEE",
    textReverse: "#FFFFFF",
    tagline: "rgba(255, 255, 255, 0.72)",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    card: "#2c2c2e",
    cardElevated: "#1F2432",
    cardMuted: "#1B1F27",
    divider: "rgba(255, 255, 255, 0.5)",
    dividerDark: "rgba(255, 255, 255, 0.2)",
    avatarBackground: "#2c2c2e",
    surfaceMuted: "rgba(255, 255, 255, 0.12)",
    accentSurface: "rgba(255, 255, 255, 0.08)",
    accentSurfaceBorder: "rgba(255, 255, 255, 0.18)",
    routePill: "#1F2432",
    chipIndicator: tintColorDark,
    tripLine: "rgba(255, 255, 255, 0.18)",
    avatarPlaceholder: "rgba(255, 255, 255, 0.12)",
    switchThumb: "#ffffff",
    switchTrack: "#34C759",
    switchTrackInactive: "#000000",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
