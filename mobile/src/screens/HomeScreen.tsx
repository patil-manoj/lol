import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
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

const { width } = Dimensions.get("window");

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const features = [
    {
      icon: "chatbubble-ellipses",
      title: "Natural Conversations",
      description:
        "Speak naturally and Elena understands context, emotion, and intent through advanced AI.",
      color: "terra",
    },
    {
      icon: "brain",
      title: "Personalized Learning",
      description:
        "With your consent, Elena remembers your preferences and adapts her tone to match your style.",
      color: "olive",
    },
    {
      icon: "shield-checkmark",
      title: "Privacy First",
      description:
        "Your data, your choice. Control what's stored and delete your history anytime.",
      color: "sand",
    },
    {
      icon: "heart",
      title: "Emotional Support",
      description:
        "Elena recognizes emotional cues and responds with empathy and understanding.",
      color: "terra",
    },
    {
      icon: "mic",
      title: "Voice-First Design",
      description:
        "Built for hands-free interaction. Just speak and Elena responds in real-time.",
      color: "olive",
    },
    {
      icon: "sparkles",
      title: "Always Improving",
      description:
        "Continuous updates bring new features and smarter responses to enhance your experience.",
      color: "sand",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Navigation Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={gradients.terraPrimary}
              style={styles.headerIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="sparkles" size={24} color={colors.sand[50]} />
            </LinearGradient>
            <Text style={styles.headerTitle}>Elena</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}
              style={styles.signInButton}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={gradients.terraPrimary}
                style={styles.getStartedButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.getStartedText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>AI-POWERED VOICE COMPANION</Text>
          </View>

          <Text style={styles.heroTitle}>
            Your personal{"\n"}
            <Text style={styles.heroTitleAccent}>voice companion</Text>
          </Text>

          <Text style={styles.heroDescription}>
            Elena listens, understands, and responds with empathy. Experience
            natural conversations powered by AI that adapts to your unique voice
            and needs.
          </Text>

          <View style={styles.heroCTAContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={gradients.terraPrimary}
                style={styles.heroCTAPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.heroCTAPrimaryText}>Start Talking</Text>
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color={colors.sand[50]}
                />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}
              style={styles.heroCTASecondary}
              activeOpacity={0.8}
            >
              <Text style={styles.heroCTASecondaryText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Hero Visual */}
          <View style={styles.heroVisualContainer}>
            <LinearGradient
              colors={gradients.heroBg}
              style={styles.heroVisual}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="mic" size={80} color={colors.sand[50]} />
            </LinearGradient>
            <View style={[styles.heroBlob1, shadows.lg]} />
            <View style={[styles.heroBlob2, shadows.lg]} />
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featuresSectionHeader}>
            <Text style={styles.featuresSectionTitle}>Why choose Elena?</Text>
            <Text style={styles.featuresSectionSubtitle}>
              More than just a chatbot—a companion that grows with you
            </Text>
          </View>

          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <LinearGradient
                  colors={
                    feature.color === "terra"
                      ? gradients.terraPrimary
                      : feature.color === "olive"
                      ? gradients.olivePrimary
                      : gradients.terraSecondary
                  }
                  style={styles.featureIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons
                    name={feature.icon as any}
                    size={28}
                    color={colors.sand[50]}
                  />
                </LinearGradient>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <LinearGradient
            colors={gradients.heroBg}
            style={styles.ctaCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaTitle}>Ready to start your journey?</Text>
            <Text style={styles.ctaDescription}>
              Join thousands who trust Elena for meaningful conversations every
              day.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={styles.ctaButton}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaButtonText}>Create Free Account</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Elena. Built with care for meaningful conversations.
          </Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: colors.olive[600] + "33",
    backgroundColor: colors.sand[100] + "CC",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.lg,
  },
  headerTitle: {
    fontSize: typography.fontSize["2xl"],
    fontWeight: typography.fontWeight.semibold,
    color: colors.olive[900],
    fontStyle: "italic",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  signInButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  signInText: {
    color: colors.olive[800],
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  getStartedButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.organic,
    ...shadows.lg,
  },
  getStartedText: {
    color: colors.sand[50],
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  heroSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.terra[100],
    borderWidth: 2,
    borderColor: colors.terra[500] + "4D",
    borderRadius: borderRadius.round,
    marginBottom: spacing.lg,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.terra[700],
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: typography.fontSize["4xl"],
    fontWeight: typography.fontWeight.bold,
    color: colors.olive[900],
    lineHeight: typography.fontSize["4xl"] * 1.2,
    marginBottom: spacing.lg,
    fontStyle: "italic",
  },
  heroTitleAccent: {
    color: colors.terra[600],
  },
  heroDescription: {
    fontSize: typography.fontSize.lg,
    color: colors.olive[700],
    lineHeight: typography.fontSize.lg * 1.5,
    marginBottom: spacing.xl,
    fontWeight: typography.fontWeight.medium,
  },
  heroCTAContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  heroCTAPrimary: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.organic,
    gap: spacing.sm,
    ...shadows.xl,
  },
  heroCTAPrimaryText: {
    color: colors.sand[50],
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  heroCTASecondary: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.olive[100],
    borderWidth: 2,
    borderColor: colors.olive[600] + "4D",
    borderRadius: borderRadius.organic,
  },
  heroCTASecondaryText: {
    color: colors.olive[900],
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  heroVisualContainer: {
    alignItems: "center",
    marginTop: spacing.xl,
    position: "relative",
  },
  heroVisual: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.xl,
  },
  heroBlob1: {
    position: "absolute",
    top: -spacing.lg,
    right: -spacing.lg,
    width: 96,
    height: 96,
    backgroundColor: colors.olive[500] + "4D",
    borderRadius: 48,
  },
  heroBlob2: {
    position: "absolute",
    bottom: -spacing.xl,
    left: -spacing.xl,
    width: 128,
    height: 128,
    backgroundColor: colors.terra[400] + "33",
    borderRadius: 64,
  },
  featuresSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    backgroundColor: colors.sand[100],
  },
  featuresSectionHeader: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  featuresSectionTitle: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    color: colors.olive[900],
    fontStyle: "italic",
    marginBottom: spacing.sm,
  },
  featuresSectionSubtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.olive[600],
    fontWeight: typography.fontWeight.medium,
    textAlign: "center",
  },
  featuresGrid: {
    gap: spacing.md,
  },
  featureCard: {
    padding: spacing.lg,
    backgroundColor: colors.white + "99",
    borderWidth: 2,
    borderColor: colors.olive[600] + "33",
    borderRadius: borderRadius.organicLg,
    ...shadows.md,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.organic,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  featureTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.olive[900],
    marginBottom: spacing.sm,
    fontStyle: "italic",
  },
  featureDescription: {
    fontSize: typography.fontSize.base,
    color: colors.olive[700],
    lineHeight: typography.fontSize.base * 1.5,
    fontWeight: typography.fontWeight.medium,
  },
  ctaSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  ctaCard: {
    padding: spacing.xl,
    borderRadius: borderRadius.organicLg + spacing.md,
    alignItems: "center",
    ...shadows.xl,
  },
  ctaTitle: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    color: colors.sand[50],
    textAlign: "center",
    marginBottom: spacing.md,
    fontStyle: "italic",
  },
  ctaDescription: {
    fontSize: typography.fontSize.lg,
    color: colors.sand[100],
    textAlign: "center",
    marginBottom: spacing.lg,
    fontWeight: typography.fontWeight.medium,
  },
  ctaButton: {
    paddingHorizontal: spacing.xl + spacing.md,
    paddingVertical: spacing.md + spacing.xs,
    backgroundColor: colors.sand[50],
    borderRadius: borderRadius.organic,
    ...shadows.xl,
  },
  ctaButtonText: {
    color: colors.terra[700],
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderTopWidth: 2,
    borderTopColor: colors.olive[600] + "33",
    backgroundColor: colors.sand[100] + "CC",
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.olive[600],
    textAlign: "center",
    fontWeight: typography.fontWeight.medium,
  },
});
