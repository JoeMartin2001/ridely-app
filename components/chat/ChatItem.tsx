import { IChatRoom } from "@/lib/types";
import { Image } from "expo-image";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "../ui/icon-symbol";

type Props = {
  chat: IChatRoom;
  onPress: (chat: IChatRoom) => void;
  onRemove?: (chat: IChatRoom) => void;
};

export const ChatItem = ({ chat, onPress, onRemove }: Props) => {
  const swipeableRef = useRef<any | null>(null);
  const { t } = useTranslation();

  const handlePress = () => {
    onPress(chat);
  };

  const handleRemove = () => {
    swipeableRef.current?.close();
    onRemove?.(chat);
  };

  const renderRightActions = () => (
    <Pressable
      onPress={handleRemove}
      style={styles.deleteAction}
      android_ripple={{ color: "rgba(255,255,255,0.25)" }}
      accessibilityRole="button"
      accessibilityLabel={t("delete")}
    >
      <IconSymbol name="trash.fill" size={24} color="#ffffff" />
      <ThemedText
        style={styles.deleteText}
        lightColor="#ffffff"
        darkColor="#ffffff"
      >
        {t("delete")}
      </ThemedText>
    </Pressable>
  );

  const sender = chat.sender;

  if (!sender) {
    return null;
  }

  const displayName = `${sender.firstName} ${sender.lastName}`;
  const initials = sender.firstName.charAt(0).toUpperCase();
  const lastMessage = chat.messages?.[0]?.message || t("no_messages");
  const time = chat.messages?.[0]?.createdAt
    ? new Date(chat.messages[0].createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={20}
      overshootRight={false}
    >
      <ThemedView style={styles.wrapper}>
        <Pressable
          onPress={handlePress}
          style={styles.content}
          android_ripple={{ color: "#3a3a3c" }}
        >
          {sender.avatarUrl ? (
            <Image
              source={{ uri: sender.avatarUrl }}
              style={styles.thumbnail}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View style={styles.initialsContainer}>
              <ThemedText style={styles.initials}>{initials}</ThemedText>
            </View>
          )}

          <View style={styles.textContainer}>
            <View style={styles.header}>
              <ThemedText style={styles.title} type="defaultSemiBold">
                {displayName}
              </ThemedText>
              <ThemedText style={styles.time}>{time}</ThemedText>
            </View>
            <ThemedText
              style={styles.message}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {lastMessage}
            </ThemedText>
          </View>
        </Pressable>
      </ThemedView>
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    opacity: 0.6,
  },
  message: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e1e1e1",
  },
  deleteAction: {
    width: 80,
    backgroundColor: "#ff3b30",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    marginTop: 4,
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e1e1e1",
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
  },
});
