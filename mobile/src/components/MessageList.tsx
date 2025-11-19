import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Message } from "../types";
import { Ionicons } from "@expo/vector-icons";

interface MessageListProps {
  messages: Message[];
}

const { width } = Dimensions.get("window");

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.avatarLarge}>
          <Ionicons name="planet-outline" size={48} color="#fff" />
        </View>
        <Text style={styles.greeting}>Hi, I am Elena.</Text>
        <Text style={styles.subGreeting}>How can I help you today?</Text>

        <View style={styles.suggestionsContainer}>
          {[
            "Sing me a song",
            "Restaurants nearby",
            "Play a game",
            "Sports news",
            "Random fun",
            "Today's Weather",
          ].map((suggestion, index) => (
            <View key={index} style={styles.suggestionChip}>
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((message) => (
        <View
          key={message.id}
          style={[
            styles.messageContainer,
            message.role === "user"
              ? styles.userMessageContainer
              : styles.assistantMessageContainer,
          ]}
        >
          {/* Avatar */}
          <View
            style={[
              styles.avatar,
              message.role === "user"
                ? styles.userAvatar
                : styles.assistantAvatar,
            ]}
          >
            <Ionicons
              name={message.role === "user" ? "person" : "planet-outline"}
              size={20}
              color="#fff"
            />
          </View>

          {/* Message Bubble */}
          <View style={styles.messageContent}>
            <View
              style={[
                styles.messageBubble,
                message.role === "user"
                  ? styles.userBubble
                  : styles.assistantBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.role === "user"
                    ? styles.userText
                    : styles.assistantText,
                ]}
              >
                {message.content}
              </Text>
            </View>

            {/* Timestamp */}
            <Text
              style={[
                styles.timestamp,
                message.role === "user"
                  ? styles.userTimestamp
                  : styles.assistantTimestamp,
              ]}
            >
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
              {message.emotion && ` • ${message.emotion}`}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 24,
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginTop: 16,
  },
  suggestionChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    backgroundColor: "transparent",
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  userMessageContainer: {
    flexDirection: "row-reverse",
  },
  assistantMessageContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  userAvatar: {
    backgroundColor: "#374151",
  },
  assistantAvatar: {
    backgroundColor: "#8B5CF6",
  },
  messageContent: {
    flex: 1,
    maxWidth: width * 0.75,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: "#F3F4F6",
    alignSelf: "flex-end",
  },
  assistantBubble: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: "#111827",
  },
  assistantText: {
    color: "#111827",
  },
  timestamp: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 4,
  },
  userTimestamp: {
    textAlign: "right",
  },
  assistantTimestamp: {
    textAlign: "left",
  },
});
