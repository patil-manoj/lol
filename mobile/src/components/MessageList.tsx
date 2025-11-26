import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Message } from "../types";
import {
  colors,
  gradients,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "../theme/colors";
import { useAuth } from "../context/AuthContext";

const { width } = Dimensions.get("window");

interface MessageListProps {
  messages: Message[];
  darkMode?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  darkMode = false,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.emptyContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Avatar */}
        <View style={styles.emptyAvatarContainer}>
          <LinearGradient
            colors={gradients.heroBg}
            style={styles.emptyAvatar}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="sparkles" size={64} color={colors.sand[50]} />
          </LinearGradient>
          <View style={[styles.emptyBlob1, shadows.lg]} />
          <View style={[styles.emptyBlob2, shadows.lg]} />
        </View>

        {/* Welcome Text */}
        <Text style={styles.emptyTitle}>
          Hi{user ? `, ${user.name.split(" ")[0]}` : ""}, I'm Elena.
        </Text>
        <Text style={styles.emptySubtitle}>
          {user?.preferences.allowPersonalization
            ? "I'm learning about you to provide better support. Let's have a meaningful conversation."
            : "Your personal voice companion, here to listen and support you."}
        </Text>

        {/* Suggestion Chips */}
        <View style={styles.suggestions}>
          {[
            { text: "Sing me a song", emoji: "🎵" },
            { text: "Find restaurants", emoji: "🍽️" },
            { text: "Play a game", emoji: "🎮" },
            { text: "Sports news", emoji: "⚽" },
            { text: "Random fun", emoji: "✨" },
            { text: "Today's weather", emoji: "☀️" },
          ].map((suggestion, i) => (
            <View key={i} style={styles.suggestionChip}>
              <Text style={styles.suggestionText}>
                {suggestion.emoji} {suggestion.text}
              </Text>
            </View>
          ))}
        </View>

        {/* Hint */}
        <Text style={styles.emptyHint}>
          Tap the microphone to start speaking or type your message below
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((message) => (
        <View
          key={message.id}
          style={[
            styles.messageRow,
            message.role === "user" && styles.userMessageRow,
          ]}
        >
          {/* Avatar */}
          <LinearGradient
            colors={
              message.role === "user"
                ? gradients.olivePrimary
                : gradients.terraPrimary
            }
            style={[
              styles.avatar,
              message.role === "user"
                ? styles.avatarUser
                : styles.avatarAssistant,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons
              name={message.role === "user" ? "person" : "chatbubble-ellipses"}
              size={20}
              color={colors.sand[50]}
            />
          </LinearGradient>

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
              <Text style={styles.messageText}>{message.content}</Text>
            </View>

            {/* Metadata */}
            <View
              style={[
                styles.metadata,
                message.role === "user" && styles.metadataUser,
              ]}
            >
              <Text style={styles.metadataText}>
                {formatDistanceToNow(message.timestamp, {
                  addSuffix: true,
                }).toUpperCase()}
              </Text>
              {message.emotion && (
                <>
                  <View style={styles.metadataDot} />
                  <Text
                    style={[
                      styles.metadataText,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    {message.emotion}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  contentContainer: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  emptyAvatarContainer: {
    position: "relative",
    marginBottom: spacing.xl,
  },
  emptyAvatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.xl,
  },
  emptyBlob1: {
    position: "absolute",
    top: -spacing.sm,
    right: -spacing.sm,
    width: 48,
    height: 48,
    backgroundColor: colors.olive[500] + "4D",
    borderRadius: 24,
  },
  emptyBlob2: {
    position: "absolute",
    bottom: -spacing.md,
    left: -spacing.md,
    width: 64,
    height: 64,
    backgroundColor: colors.terra[400] + "33",
    borderRadius: 32,
  },
  emptyTitle: {
    fontSize: typography.fontSize["4xl"],
    fontWeight: typography.fontWeight.bold,
    color: colors.olive[900],
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: spacing.md,
  },
  emptySubtitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.medium,
    color: colors.olive[700],
    textAlign: "center",
    lineHeight: typography.fontSize.xl * 1.5,
    marginBottom: spacing.xl,
    maxWidth: width * 0.8,
  },
  suggestions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
    maxWidth: width * 0.9,
  },
  suggestionChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.olive[600] + "4D",
    borderRadius: borderRadius.xl,
  },
  suggestionText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.olive[800],
  },
  emptyHint: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.olive[500],
    textAlign: "center",
  },
  messageRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  userMessageRow: {
    flexDirection: "row-reverse",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.lg,
  },
  avatarUser: {
    borderRadius: borderRadius.organic,
  },
  avatarAssistant: {
    borderRadius: borderRadius.organic + spacing.xs,
  },
  messageContent: {
    flex: 1,
    maxWidth: "75%",
  },
  messageBubble: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.lg,
  },
  userBubble: {
    backgroundColor: colors.olive[50],
    borderWidth: 0,
    borderTopRightRadius: spacing.xs,
    borderTopLeftRadius: borderRadius.organic,
    borderBottomLeftRadius: borderRadius.organic,
    borderBottomRightRadius: borderRadius.organic,
  },
  assistantBubble: {
    backgroundColor: colors.sand[100],
    borderWidth: 2,
    borderColor: colors.terra[500] + "33",
    borderTopLeftRadius: spacing.xs,
    borderTopRightRadius: borderRadius.organic,
    borderBottomLeftRadius: borderRadius.organic,
    borderBottomRightRadius: borderRadius.organic,
  },
  messageText: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.fontSize.base * 1.5,
    color: colors.olive[900],
    fontWeight: typography.fontWeight.medium,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  metadataUser: {
    justifyContent: "flex-end",
  },
  metadataText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.olive[500],
    letterSpacing: 0.5,
  },
  metadataDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.olive[400],
  },
});
