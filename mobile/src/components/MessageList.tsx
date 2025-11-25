import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Message } from "../types";
import { Ionicons } from "@expo/vector-icons";

interface MessageListProps {
  messages: Message[];
  darkMode?: boolean;
}

const { width } = Dimensions.get("window");

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  darkMode = false,
}) => {
  const theme = darkMode ? darkTheme : lightTheme;
  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: theme.background }]}
      >
        <View style={styles.avatarLarge}>
          <Ionicons name="chatbubble-ellipses" size={48} color="#fff" />
        </View>
        <Text style={[styles.greeting, { color: theme.text }]}>
          Hi, I am Elena.
        </Text>
        <Text style={[styles.subGreeting, { color: theme.textSecondary }]}>
          How can I help you today?
        </Text>

        <View style={styles.suggestionsContainer}>
          {[
            "Sing me a song",
            "Restaurants nearby",
            "Play a game",
            "Sports news",
            "Random fun",
            "Today's Weather",
          ].map((suggestion, index) => (
            <View
              key={index}
              style={[styles.suggestionChip, { borderColor: theme.border }]}
            >
              <Text
                style={[styles.suggestionText, { color: theme.textSecondary }]}
              >
                {suggestion}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      style={[styles.scrollView, { backgroundColor: theme.background }]}
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
                  ? [
                      styles.userBubble,
                      { backgroundColor: darkMode ? "#374151" : "#F3F4F6" },
                    ]
                  : [
                      styles.assistantBubble,
                      {
                        backgroundColor: theme.cardBackground,
                        borderColor: theme.border,
                      },
                    ],
              ]}
            >
              <Text style={[styles.messageText, { color: theme.text }]}>
                {message.content}
              </Text>
            </View>

            {/* Timestamp */}
            <Text
              style={[
                styles.timestamp,
                { color: theme.textSecondary },
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

const lightTheme = {
  background: "#FFFFFF",
  cardBackground: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
};

const darkTheme = {
  background: "#111827",
  cardBackground: "#1F2937",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  border: "#374151",
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
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 20,
    fontWeight: "600",
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
    backgroundColor: "transparent",
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: "500",
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
    alignSelf: "flex-end",
  },
  assistantBubble: {
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  userTimestamp: {
    textAlign: "right",
  },
  assistantTimestamp: {
    textAlign: "left",
  },
});
