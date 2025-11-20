import React, { useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { ChatInput } from "@/components/chat/ChatInput";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { ThemedView } from "@/components/themed-view";
import { ChatMessageStatus, ChatMessageType, IChatMessage } from "@/lib/types";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock data
const MOCK_MESSAGES: IChatMessage[] = [
  {
    id: "1",
    rideId: "ride1",
    senderId: "user1",
    receiverId: "me",
    message: "Hey, are you arriving soon?",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    updatedAt: new Date(),
    isRead: true,
    type: ChatMessageType.TEXT,
    status: ChatMessageStatus.READ,
    chatRoomId: "room1",
  },
  {
    id: "2",
    rideId: "ride1",
    senderId: "me",
    receiverId: "user1",
    message: "Yes, I'm just around the corner. Traffic is a bit heavy.",
    createdAt: new Date(Date.now() - 1000 * 60 * 4),
    updatedAt: new Date(),
    isRead: true,
    type: ChatMessageType.TEXT,
    status: ChatMessageStatus.READ,
    chatRoomId: "room1",
  },
  {
    id: "3",
    rideId: "ride1",
    senderId: "user1",
    receiverId: "me",
    message: "No worries, take your time!",
    createdAt: new Date(Date.now() - 1000 * 60 * 2),
    updatedAt: new Date(),
    isRead: true,
    type: ChatMessageType.TEXT,
    status: ChatMessageStatus.READ,
    chatRoomId: "room1",
  },
];

export default function ChatRoomScreen() {
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<IChatMessage>>(null);

  const [messages, setMessages] = useState<IChatMessage[]>(MOCK_MESSAGES);

  const handleSend = (text: string) => {
    const newMessage: IChatMessage = {
      id: Date.now().toString(),
      rideId: "ride1",
      senderId: "me",
      receiverId: "user1",
      message: text,
      createdAt: new Date(),
      updatedAt: new Date(),
      isRead: false,
      type: ChatMessageType.TEXT,
      status: ChatMessageStatus.SENT,
      chatRoomId: "room1",
    };

    setMessages((prev) => [newMessage, ...prev]);

    // scroll to bottom (offset 0 with inverted list)
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    });
  };

  return (
    <ThemedView style={[styles.container]}>
      <KeyboardAvoidingView
        behavior={"padding"}
        style={[styles.contentContainer]}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              isOwnMessage={item.senderId === "me"}
            />
          )}
          inverted
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 16 + insets.bottom + 16,
          }}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        />
        <ChatInput onSend={handleSend} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  contentContainer: {
    flex: 1,
  },
});
