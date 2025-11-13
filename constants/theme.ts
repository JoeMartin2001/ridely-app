/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#0a7ea4";

export const Colors = {
  light: {
    text: "#102028",
    textOnTint: "#FFFFFF",
    textReverse: "#FFFFFF",
    tagline: "rgba(16, 32, 40, 0.68)",
    background: "#F5FBFD",
    tint: tintColorLight,
    icon: "#5E6F76",
    tabIconDefault: "#5E6F76",
    tabIconSelected: tintColorLight,
    card: "#FFFFFF",
    cardElevated: "#E7F2F6",
    cardMuted: "#DCEBF0",
    divider: "rgba(10, 126, 164, 0.15)",
    dividerDark: "rgba(10, 126, 164, 0.4)",
    avatarBackground: "rgba(10, 126, 164, 0.14)",
    surfaceMuted: "rgba(10, 126, 164, 0.08)",
    accentSurface: "rgba(10, 126, 164, 0.12)",
    accentSurfaceBorder: "rgba(10, 126, 164, 0.28)",
    routePill: "#E2F2F8",
    chipIndicator: tintColorLight,
    tripLine: "rgba(10, 126, 164, 0.18)",
    avatarPlaceholder: "rgba(10, 126, 164, 0.18)",
    switchThumb: "#FFFFFF",
    switchTrack: tintColorLight,
    switchTrackInactive: "rgba(10, 126, 164, 0.25)",
  },
  dark: {
    text: "#E4F6FB",
    textOnTint: "#ffffff",
    textReverse: "#0B1820",
    tagline: "rgba(228, 246, 251, 0.72)",
    background: "#08161B",
    tint: tintColorDark,
    icon: "#8FA5AE",
    tabIconDefault: "#8FA5AE",
    tabIconSelected: tintColorDark,
    card: "#102028",
    cardElevated: "#152A33",
    cardMuted: "#18323D",
    divider: "rgba(10, 126, 164, 0.4)",
    dividerDark: "rgba(10, 126, 164, 0.2)",
    avatarBackground: "rgba(10, 126, 164, 0.22)",
    surfaceMuted: "rgba(10, 126, 164, 0.12)",
    accentSurface: "rgba(10, 126, 164, 0.18)",
    accentSurfaceBorder: "rgba(10, 126, 164, 0.32)",
    routePill: "#122832",
    chipIndicator: tintColorDark,
    tripLine: "rgba(10, 126, 164, 0.32)",
    avatarPlaceholder: "rgba(10, 126, 164, 0.22)",
    switchThumb: "#0B1820",
    switchTrack: tintColorDark,
    switchTrackInactive: "rgba(10, 126, 164, 0.3)",
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
