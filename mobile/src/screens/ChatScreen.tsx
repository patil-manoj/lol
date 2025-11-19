import React, { useState, useCallback } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Message, VoiceSettings } from "../types";
import { MessageList } from "../components/MessageList";
import { chatService } from "../services/chatService";
import { analyzeEmotion } from "../utils/emotionAnalysis";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);

  const voiceSettings: VoiceSettings = {
    pitch: 1.0,
    rate: 0.9,
    volume: 1.0,
    language: "en-US",
  };

  const { speak, stop, isSpeaking } = useTextToSpeech(voiceSettings);

  const handleSendMessage = useCallback(
    async (content?: string) => {
      const messageText = content || inputText.trim();
      if (!messageText || isLoading) return;

      setInputText("");

      // Analyze emotion
      const emotion = analyzeEmotion(messageText);

      // Create user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: messageText,
        timestamp: new Date(),
        emotion: emotion.dominantEmotion,
        sentiment: emotion.sentiment,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await chatService.sendMessage([
          ...messages,
          userMessage,
        ]);

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.message,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Auto-speak the response
        if (autoSpeak && !isSpeaking) {
          speak(response.message);
        }

        // Handle crisis detection
        if (response.isCrisis) {
          Alert.alert(
            "🆘 Crisis Resources",
            "National Suicide Prevention Lifeline: 988\n" +
              "Crisis Text Line: Text HOME to 741741\n\n" +
              "Please consider reaching out to these professional resources. You matter, and help is available.",
            [{ text: "OK" }]
          );
        }
      } catch (error: any) {
        console.error("Chat error:", error);
        Alert.alert("Error", error.message || "Failed to send message");
      } finally {
        setIsLoading(false);
      }
    },
    [inputText, messages, isLoading, autoSpeak, speak, isSpeaking]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LinearGradient
            colors={["#8B5CF6", "#3B82F6"]}
            style={styles.headerIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="planet-outline" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.headerTitle}>Voice AI</Text>
        </View>

        <TouchableOpacity
          onPress={() => setAutoSpeak(!autoSpeak)}
          style={styles.headerButton}
        >
          <Ionicons
            name={autoSpeak ? "volume-high" : "volume-mute"}
            size={24}
            color={autoSpeak ? "#8B5CF6" : "#9CA3AF"}
          />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <MessageList messages={messages} />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        {/* Voice Button - Large Centered */}
        <View style={styles.voiceButtonContainer}>
          <TouchableOpacity
            disabled={isLoading}
            style={styles.voiceButtonWrapper}
            onPress={() => {
              // Placeholder for voice recording
              Alert.alert(
                "Voice Input",
                "Voice recording requires speech-to-text service integration.\n\nPlease use text input for now."
              );
            }}
          >
            <LinearGradient
              colors={["#06B6D4", "#3B82F6"]}
              style={styles.voiceButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="mic" size={32} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Input Bar */}
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="image-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything..."
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={500}
              editable={!isLoading}
              onSubmitEditing={() => handleSendMessage()}
            />
          </View>

          <TouchableOpacity
            onPress={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            style={styles.iconButton}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#8B5CF6" />
            ) : (
              <Ionicons
                name="send"
                size={24}
                color={inputText.trim() ? "#8B5CF6" : "#D1D5DB"}
              />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  headerButton: {
    padding: 8,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 12 : 16,
  },
  voiceButtonContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  voiceButtonWrapper: {
    shadowColor: "#06B6D4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  voiceButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 44,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 15,
    color: "#111827",
    maxHeight: 100,
  },
});
