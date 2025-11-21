const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.sardorbek2001.ridely.dev";
  }

  if (IS_PREVIEW) {
    return "com.sardorbek2001.ridely.preview";
  }

  return "com.sardorbek2001.ridely";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Ridely (Dev)";
  }

  if (IS_PREVIEW) {
    return "Ridely (Preview)";
  }

  return "Ridely";
};

export default {
  expo: {
    name: getAppName(),
    slug: "ridely",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "ridelyapp",
    deepLinks: ["ridelyapp://"],
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: getUniqueIdentifier(),
      appleTeamId: "DB4HH72ZTJ",
      infoPlist: {
        NSPhotoLibraryUsageDescription:
          "The app accesses your photos to let you share them with your friends.",
        NSCameraUsageDescription:
          "The app accesses your camera to let you take photos of your car.",
        UIDesignRequiresCompatibility: true,
      },
    },
    android: {
      icon: "./assets/images/icon.png",
      backgroundColor: "#F5FBFD",
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.sardorbek2001.ridely",
      permissions: [
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.CAMERA",
      ],
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#F5FBFD",
          dark: {
            backgroundColor: "#F5FBFD",
          },
        },
      ],
      "expo-localization",
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
          cameraPermission:
            "The app accesses your camera to let you take photos of your car.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "78efa26d-dca0-4ea5-b956-ec4dcb4c0e23",
      },
      telegramBot: "RidelyLoginBot",
    },
  },
};
