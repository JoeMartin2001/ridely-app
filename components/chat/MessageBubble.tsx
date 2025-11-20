import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ChatMessageStatus, IChatMessage } from "@/lib/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "../ui/icon-symbol";

type Props = {
  message: IChatMessage;
  isOwnMessage: boolean;
};

export const MessageBubble = ({ message, isOwnMessage }: Props) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: ChatMessageStatus) => {
    switch (status) {
      case ChatMessageStatus.PENDING:
        return "clock";
      case ChatMessageStatus.SENT:
        return "checkmark";
      case ChatMessageStatus.DELIVERED:
        return "checkmark.circle";
      case ChatMessageStatus.READ:
        return "checkmark.circle.fill"; // Assuming SF Symbols names, might need adjustment based on IconSymbol implementation
      default:
        return "clock";
    }
  };

  return (
    <View
      style={[
        styles.container,
        isOwnMessage ? styles.ownContainer : styles.otherContainer,
      ]}
    >
      <ThemedView
        style={[
          styles.bubble,
          isOwnMessage
            ? { backgroundColor: theme.tint }
            : { backgroundColor: theme.card }, // Using card color for other messages
        ]}
      >
        <ThemedText
          style={[
            styles.text,
            isOwnMessage ? { color: "#fff" } : undefined, // White text for own message if tint is dark
          ]}
        >
          {message.message}
        </ThemedText>
        <View style={styles.footer}>
          <ThemedText
            style={[
              styles.time,
              isOwnMessage ? { color: "rgba(255,255,255,0.7)" } : undefined,
            ]}
          >
            {formatTime(message.createdAt)}
          </ThemedText>
          {isOwnMessage && (
            <IconSymbol
              name={getStatusIcon(message.status) as any}
              size={12}
              color="rgba(255,255,255,0.7)"
            />
          )}
        </View>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 12,
    flexDirection: "row",
  },
  ownContainer: {
    justifyContent: "flex-end",
  },
  otherContainer: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderBottomRightRadius: 4, // Default for own, overridden below
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 4,
    gap: 4,
  },
  time: {
    fontSize: 11,
    opacity: 0.7,
  },
});
