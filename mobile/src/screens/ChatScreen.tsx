import React, { useState, useCallback, useRef, useEffect } from "react";
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
  Modal,
  ScrollView,
  Appearance,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { Message, VoiceSettings } from "../types";
import { MessageList } from "../components/MessageList";
import { chatService } from "../services/chatService";
import { analyzeEmotion } from "../utils/emotionAnalysis";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import * as Speech from "expo-speech";

export const ChatScreen: React.FC = () => {
  const systemColorScheme = useColorScheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [darkMode, setDarkMode] = useState(systemColorScheme === "dark");
  const [showSettings, setShowSettings] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [availableVoices, setAvailableVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);

  const voiceSettings: VoiceSettings = {
    pitch: 1.0,
    rate: 0.9,
    volume: 1.0,
    language: "en-US",
  };

  const { speak, stop, isSpeaking } = useTextToSpeech(voiceSettings);

  useEffect(() => {
    loadVoices();
    requestAudioPermissions();
  }, []);

  const loadVoices = async () => {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      setAvailableVoices(voices);
    } catch (error) {
      console.error("Error loading voices:", error);
    }
  };

  const requestAudioPermissions = async () => {
    try {
      await Audio.requestPermissionsAsync();
    } catch (error) {
      console.error("Error requesting audio permissions:", error);
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Microphone permission is required for voice input."
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
      Alert.alert("Error", "Failed to start recording");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      Alert.alert(
        "Voice Input",
        "Voice-to-text requires integration with a speech recognition service.\n\nPlease use text input for now."
      );
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  const handleVoicePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const speakWithSelectedVoice = (text: string) => {
    const voice = availableVoices[selectedVoiceIndex];
    Speech.speak(text, {
      ...voiceSettings,
      voice: voice?.identifier,
    });
  };

  const handleSendMessage = useCallback(
    async (content?: string) => {
      const messageText = (content || inputText).trim();

      // Validate input
      if (!messageText || isLoading) return;

      if (messageText.length > 500) {
        Alert.alert(
          "Message Too Long",
          "Please keep your message under 500 characters."
        );
        return;
      }

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
          if (availableVoices.length > 0) {
            speakWithSelectedVoice(response.message);
          } else {
            speak(response.message);
          }
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

        // Show user-friendly error
        const errorMessage = error.message || "Failed to send message";
        Alert.alert("Connection Error", errorMessage, [{ text: "OK" }]);

        // Add helpful error message to chat
        if (
          errorMessage.includes("connect") ||
          errorMessage.includes("network")
        ) {
          const errorHelpMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content:
              "I'm having trouble connecting to the server. Please check your internet connection and make sure the backend is running.",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorHelpMessage]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [inputText, messages, isLoading, autoSpeak, speak, isSpeaking]
  );

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            borderBottomColor: theme.border,
            backgroundColor: theme.background,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <LinearGradient
            colors={["#8B5CF6", "#3B82F6"]}
            style={styles.headerIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
          </LinearGradient>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Voice AI
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => setAutoSpeak(!autoSpeak)}
            style={styles.headerButton}
          >
            <Ionicons
              name={autoSpeak ? "volume-high" : "volume-mute"}
              size={22}
              color={autoSpeak ? "#8B5CF6" : theme.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setDarkMode(!darkMode)}
            style={styles.headerButton}
          >
            <Ionicons
              name={darkMode ? "sunny" : "moon"}
              size={22}
              color={theme.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowSettings(true)}
            style={styles.headerButton}
          >
            <Ionicons
              name="settings-outline"
              size={22}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Voice Settings
              </Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Ionicons name="close" size={24} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Voice
              </Text>
              {availableVoices.length === 0 ? (
                <Text
                  style={[styles.settingValue, { color: theme.textSecondary }]}
                >
                  Loading voices...
                </Text>
              ) : (
                availableVoices.map((voice, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.voiceOption,
                      selectedVoiceIndex === index &&
                        styles.voiceOptionSelected,
                      { borderColor: theme.border },
                    ]}
                    onPress={() => setSelectedVoiceIndex(index)}
                  >
                    <View style={styles.voiceOptionContent}>
                      <Text
                        style={[styles.voiceOptionText, { color: theme.text }]}
                      >
                        {voice.name}
                      </Text>
                      <Text
                        style={[
                          styles.voiceOptionLang,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {voice.language}
                      </Text>
                    </View>
                    {selectedVoiceIndex === index && (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#8B5CF6"
                      />
                    )}
                  </TouchableOpacity>
                ))
              )}

              <View style={styles.settingRow}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Auto-speak responses
                </Text>
                <TouchableOpacity
                  onPress={() => setAutoSpeak(!autoSpeak)}
                  style={[styles.toggle, autoSpeak && styles.toggleActive]}
                >
                  <View
                    style={[
                      styles.toggleThumb,
                      autoSpeak && styles.toggleThumbActive,
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.testButton}
                onPress={() => {
                  if (availableVoices[selectedVoiceIndex]) {
                    speakWithSelectedVoice("Hello! This is how I sound.");
                  }
                }}
              >
                <LinearGradient
                  colors={["#8B5CF6", "#3B82F6"]}
                  style={styles.testButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="play" size={20} color="#fff" />
                  <Text style={styles.testButtonText}>Test Voice</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Messages */}
      <MessageList messages={messages} darkMode={darkMode} />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.cardBackground,
            borderTopColor: theme.border,
          },
        ]}
      >
        {/* Voice Button - Large Centered */}
        <View style={styles.voiceButtonContainer}>
          <TouchableOpacity
            disabled={isLoading}
            style={styles.voiceButtonWrapper}
            onPress={handleVoicePress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                isRecording ? ["#EF4444", "#DC2626"] : ["#06B6D4", "#3B82F6"]
              }
              style={[
                styles.voiceButton,
                isRecording && styles.voiceButtonRecording,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons
                name={isRecording ? "stop" : "mic"}
                size={32}
                color="#fff"
              />
            </LinearGradient>
          </TouchableOpacity>
          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Recording...</Text>
            </View>
          )}
        </View>

        {/* Input Bar */}
        <View style={styles.inputRow}>
          <View
            style={[
              styles.textInputContainer,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
              },
            ]}
          >
            <TextInput
              style={[styles.textInput, { color: theme.text }]}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything..."
              placeholderTextColor={theme.placeholder}
              multiline
              maxLength={500}
              editable={!isLoading && !isRecording}
              returnKeyType="send"
              blurOnSubmit={false}
            />
          </View>

          <TouchableOpacity
            onPress={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading || isRecording}
            style={styles.sendButton}
            activeOpacity={0.7}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#8B5CF6" />
            ) : (
              <LinearGradient
                colors={
                  inputText.trim()
                    ? ["#8B5CF6", "#3B82F6"]
                    : ["#D1D5DB", "#9CA3AF"]
                }
                style={styles.sendButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="send" size={20} color="#fff" />
              </LinearGradient>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const lightTheme = {
  background: "#FFFFFF",
  cardBackground: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  inputBackground: "#F9FAFB",
  placeholder: "#9CA3AF",
};

const darkTheme = {
  background: "#111827",
  cardBackground: "#1F2937",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  border: "#374151",
  inputBackground: "#374151",
  placeholder: "#6B7280",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 8,
  },
  settingValue: {
    fontSize: 14,
    marginBottom: 16,
  },
  voiceOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 8,
  },
  voiceOptionSelected: {
    borderColor: "#8B5CF6",
    backgroundColor: "rgba(139, 92, 246, 0.05)",
  },
  voiceOptionContent: {
    flex: 1,
  },
  voiceOptionText: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 2,
  },
  voiceOptionLang: {
    fontSize: 13,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    marginTop: 16,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#D1D5DB",
    padding: 2,
  },
  toggleActive: {
    backgroundColor: "#8B5CF6",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  toggleThumbActive: {
    transform: [{ translateX: 22 }],
  },
  testButton: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  testButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },
  testButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  inputContainer: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
  },
  voiceButtonContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  voiceButtonWrapper: {
    shadowColor: "#06B6D4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  voiceButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  voiceButtonRecording: {
    shadowColor: "#EF4444",
  },
  recordingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  recordingText: {
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "600",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  textInputContainer: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 44,
    maxHeight: 100,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 15,
    lineHeight: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },
  sendButtonGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
