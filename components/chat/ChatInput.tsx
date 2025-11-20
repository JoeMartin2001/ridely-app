import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "../ui/icon-symbol";

type Props = {
  onSend: (text: string) => void;
};

export const ChatInput = ({ onSend }: Props) => {
  const [text, setText] = useState("");
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const handleSend = () => {
    if (text.trim().length === 0) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <ThemedView style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#F2F2F7" },
        ]}
      >
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Message"
          placeholderTextColor="#8E8E93"
          multiline
          value={text}
          onChangeText={setText}
          maxLength={1000}
        />
      </View>
      <TouchableOpacity
        onPress={handleSend}
        style={[
          styles.sendButton,
          { backgroundColor: text.trim().length > 0 ? theme.tint : "#8E8E93" },
        ]}
        disabled={text.trim().length === 0}
      >
        <IconSymbol name="arrow.up" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(128,128,128,0.2)",
  },
  inputContainer: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 8,
    minHeight: 36,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    maxHeight: 100,
    paddingTop: 0, // Fix for Android multiline alignment
    paddingBottom: 0,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2, // Align with input bottom
  },
});
