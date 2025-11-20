import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { ChatItem } from "@/components/chat/ChatItem";
import { EmptyChatView } from "@/components/chat/EmptyChatView";
import { ThemedView } from "@/components/themed-view";
import { Divider } from "@/components/ui/divider";
import { Header } from "@/components/ui/header";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  ChatRoomStatus,
  IChatRoom,
  IUserAuthProvider,
  IUserType,
} from "@/lib/types";
import { useTranslation } from "react-i18next";

const MOCK_CHAT_ROOMS: IChatRoom[] = [
  {
    id: "1",
    rideId: "ride1",
    senderId: "user1",
    receiverId: "me",
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isRead: true,
    status: ChatRoomStatus.ACTIVE,
    sender: {
      id: "user1",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+1234567890",
      username: "johndoe",
      avatarUrl: "https://via.placeholder.com/150",
      email: "user1@example.com",
      authProvider: IUserAuthProvider.PHONE,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: null,
      emailVerified: false,
      emailVerifiedAt: null,
      type: IUserType.PASSENGER,
    },
  },
];

export default function ChatScreen() {
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");

  const router = useRouter();

  const handlePress = (chat: IChatRoom) => {
    router.push({
      pathname: "/(chat)/chat-room",
      params: { chatRoomId: chat.id },
    });
  };

  if (MOCK_CHAT_ROOMS.length === 0) {
    return <EmptyChatView />;
  }

  return (
    <ThemedView
      style={[styles.screen, { backgroundColor: cardColor }]}
      applyTopInsets
    >
      <Header title={t("favourites")} />

      <FlatList
        data={MOCK_CHAT_ROOMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem chat={item} onPress={handlePress} />
        )}
        style={{ backgroundColor }}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider direction="horizontal" />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flatList: {},
  flatListContainer: {
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 10,
    paddingBottom: 48,
  },
});
