import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";

export const SettingsScreen: React.FC = () => {
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState("Default");
  const [pitch, setPitch] = useState(1.0);
  const [rate, setRate] = useState(0.9);

  const testVoice = async () => {
    await Speech.speak("Hello! This is how I sound.", {
      pitch,
      rate,
      language: "en-US",
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Voice Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Settings</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Auto-speak responses</Text>
            <Switch
              value={autoSpeak}
              onValueChange={setAutoSpeak}
              trackColor={{ false: "#D1D5DB", true: "#A78BFA" }}
              thumbColor={autoSpeak ? "#8B5CF6" : "#F3F4F6"}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Voice</Text>
            <Text style={styles.settingValue}>{selectedVoice}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={testVoice}>
            <Ionicons name="volume-high" size={20} color="#8B5CF6" />
            <Text style={styles.buttonText}>Test Voice</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>

          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Model</Text>
            <Text style={styles.aboutValue}>Llama 3.3 70B</Text>
          </View>

          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Provider</Text>
            <Text style={styles.aboutValue}>Groq API</Text>
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <Text style={styles.privacyText}>
            Your conversations are processed securely and not stored on our
            servers unless you explicitly enable conversation history.
          </Text>
        </View>

        {/* Crisis Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crisis Resources</Text>
          <Text style={styles.resourceText}>
            🆘 National Suicide Prevention Lifeline: 988
          </Text>
          <Text style={styles.resourceText}>
            💬 Crisis Text Line: Text HOME to 741741
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: "#374151",
  },
  settingValue: {
    fontSize: 16,
    color: "#6B7280",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B5CF6",
  },
  aboutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  aboutLabel: {
    fontSize: 15,
    color: "#6B7280",
  },
  aboutValue: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  privacyText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  resourceText: {
    fontSize: 14,
    color: "#374151",
    paddingVertical: 6,
    lineHeight: 20,
  },
});
