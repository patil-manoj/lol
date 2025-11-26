import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  colors,
  gradients,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "../theme/colors";
import { NavigationProp } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

interface OnboardingScreenProps {
  navigation: NavigationProp<any>;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  navigation,
}) => {
  const [allowChatStorage, setAllowChatStorage] = useState(false);
  const [allowPersonalization, setAllowPersonalization] = useState(false);
  const { updatePreferences } = useAuth();

  const handleContinue = async () => {
    await updatePreferences({
      allowChatStorage,
      allowPersonalization,
    });
    navigation.navigate("Chat");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={gradients.terraPrimary}
              style={styles.icon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons
                name="shield-checkmark"
                size={40}
                color={colors.sand[50]}
              />
            </LinearGradient>
            <Text style={styles.title}>Your Privacy Matters</Text>
            <Text style={styles.subtitle}>
              Before we begin, let's set up how Elena works for you. You can
              change these preferences anytime.
            </Text>
          </View>

          {/* Consent Options */}
          <View style={styles.options}>
            {/* Chat Storage */}
            <TouchableOpacity
              onPress={() => setAllowChatStorage(!allowChatStorage)}
              activeOpacity={0.7}
              style={[styles.option, allowChatStorage && styles.optionSelected]}
            >
              <LinearGradient
                colors={
                  allowChatStorage
                    ? gradients.terraPrimary
                    : [colors.olive[400], colors.olive[400]]
                }
                style={styles.optionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="server" size={24} color={colors.sand[50]} />
              </LinearGradient>
              <View style={styles.optionContent}>
                <View style={styles.optionHeader}>
                  <Text style={styles.optionTitle}>Save Chat History</Text>
                  <View
                    style={[
                      styles.checkbox,
                      allowChatStorage && styles.checkboxActive,
                    ]}
                  >
                    {allowChatStorage && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={colors.sand[50]}
                      />
                    )}
                  </View>
                </View>
                <Text style={styles.optionDescription}>
                  Store your conversations securely so you can review past chats
                  and maintain context across sessions.
                </Text>
                {allowChatStorage && (
                  <Text style={styles.optionNote}>
                    ✓ Your chats will be saved locally on your device
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            {/* Personalization */}
            <TouchableOpacity
              onPress={() => setAllowPersonalization(!allowPersonalization)}
              activeOpacity={0.7}
              style={[
                styles.option,
                allowPersonalization && styles.optionSelected,
              ]}
            >
              <LinearGradient
                colors={
                  allowPersonalization
                    ? gradients.terraPrimary
                    : [colors.olive[400], colors.olive[400]]
                }
                style={styles.optionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="bulb" size={24} color={colors.sand[50]} />
              </LinearGradient>
              <View style={styles.optionContent}>
                <View style={styles.optionHeader}>
                  <Text style={styles.optionTitle}>Enable Personalization</Text>
                  <View
                    style={[
                      styles.checkbox,
                      allowPersonalization && styles.checkboxActive,
                    ]}
                  >
                    {allowPersonalization && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={colors.sand[50]}
                      />
                    )}
                  </View>
                </View>
                <Text style={styles.optionDescription}>
                  Let Elena learn your preferences and communication style to
                  provide more tailored, empathetic responses.
                </Text>
                {allowPersonalization && (
                  <Text style={styles.optionNote}>
                    ✓ Elena will adapt her tone and suggestions based on your
                    conversations
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Privacy Note */}
          <View style={styles.privacyNote}>
            <Ionicons
              name="shield-checkmark"
              size={16}
              color={colors.olive[600]}
              style={{ marginRight: spacing.xs }}
            />
            <Text style={styles.privacyNoteText}>
              Your data is stored locally on your device. You can delete your
              history or change these settings anytime from the settings menu.
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity onPress={handleContinue} activeOpacity={0.8}>
            <LinearGradient
              colors={gradients.terraPrimary}
              style={styles.continueButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.continueButtonText}>
                {allowChatStorage || allowPersonalization
                  ? "Continue with Selected Preferences"
                  : "Continue Without Saving"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sand[50],
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.white + "CC",
    borderWidth: 2,
    borderColor: colors.olive[600] + "33",
    borderRadius: borderRadius.organicLg + spacing.md,
    padding: spacing.xl,
    ...shadows.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.organicLg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  title: {
    fontSize: typography.fontSize["4xl"],
    fontWeight: typography.fontWeight.bold,
    color: colors.olive[900],
    fontStyle: "italic",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.olive[600],
    fontWeight: typography.fontWeight.medium,
    textAlign: "center",
    lineHeight: typography.fontSize.lg * 1.5,
  },
  options: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  option: {
    flexDirection: "row",
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.olive[600] + "4D",
    borderRadius: borderRadius.organic,
    gap: spacing.md,
    backgroundColor: colors.olive[50] + "80",
  },
  optionSelected: {
    backgroundColor: colors.terra[50] + "CC",
    borderColor: colors.terra[500],
    ...shadows.lg,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  optionContent: {
    flex: 1,
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  optionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.olive[900],
    fontStyle: "italic",
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    borderWidth: 2,
    borderColor: colors.olive[400],
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: colors.terra[500],
    borderColor: colors.terra[500],
  },
  optionDescription: {
    fontSize: typography.fontSize.base,
    color: colors.olive[700],
    lineHeight: typography.fontSize.base * 1.5,
    fontWeight: typography.fontWeight.medium,
  },
  optionNote: {
    marginTop: spacing.sm,
    fontSize: typography.fontSize.sm,
    color: colors.terra[700],
    fontWeight: typography.fontWeight.semibold,
  },
  privacyNote: {
    flexDirection: "row",
    padding: spacing.md,
    backgroundColor: colors.olive[100] + "80",
    borderWidth: 2,
    borderColor: colors.olive[600] + "33",
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
  },
  privacyNoteText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.olive[800],
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.sm * 1.5,
  },
  continueButton: {
    paddingVertical: spacing.md + spacing.xs,
    borderRadius: borderRadius.organic,
    alignItems: "center",
    ...shadows.lg,
  },
  continueButtonText: {
    color: colors.sand[50],
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
});
