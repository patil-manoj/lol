import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
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

interface SignInScreenProps {
  navigation: NavigationProp<any>;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      navigation.navigate("Chat");
    } catch (error: any) {
      Alert.alert("Sign In Failed", error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={gradients.terraPrimary}
            style={styles.logoIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="sparkles" size={28} color={colors.sand[50]} />
          </LinearGradient>
          <Text style={styles.logoText}>Elena</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your conversations
          </Text>

          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail"
                  size={20}
                  color={colors.olive[500]}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.olive[400]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color={colors.olive[500]}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.inputPassword]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={colors.olive[400]}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color={colors.olive[500]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={gradients.terraPrimary}
                style={[
                  styles.submitButton,
                  isLoading && styles.submitButtonDisabled,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.sand[50]} />
                ) : (
                  <Text style={styles.submitButtonText}>Sign In</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Sign In */}
            <TouchableOpacity
              style={styles.googleButton}
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(
                  "Google Sign-In",
                  "Google OAuth not configured in mobile app yet. Please use email/password."
                )
              }
            >
              <Ionicons
                name="logo-google"
                size={20}
                color={colors.olive[900]}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.footerLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Back to Home */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back to home</Text>
        </TouchableOpacity>
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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  logoIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.organic,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.lg,
  },
  logoText: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.semibold,
    color: colors.olive[900],
    fontStyle: "italic",
  },
  card: {
    backgroundColor: colors.white + "CC",
    borderWidth: 2,
    borderColor: colors.olive[600] + "33",
    borderRadius: borderRadius.organicLg,
    padding: spacing.xl,
    ...shadows.xl,
  },
  title: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    color: colors.olive[900],
    fontStyle: "italic",
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.olive[600],
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xl,
  },
  form: {
    gap: spacing.lg,
  },
  inputGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.olive[800],
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.olive[600] + "4D",
    borderRadius: borderRadius.organic,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.olive[900],
    fontWeight: typography.fontWeight.medium,
  },
  inputPassword: {
    paddingRight: spacing.xl + spacing.sm,
  },
  eyeIcon: {
    position: "absolute",
    right: spacing.md,
    padding: spacing.xs,
  },
  submitButton: {
    paddingVertical: spacing.md + spacing.xs,
    borderRadius: borderRadius.organic,
    alignItems: "center",
    ...shadows.lg,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.sand[50],
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.olive[600] + "33",
  },
  dividerText: {
    fontSize: typography.fontSize.sm,
    color: colors.olive[600],
    fontWeight: typography.fontWeight.semibold,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md + spacing.xs,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.olive[600] + "4D",
    borderRadius: borderRadius.organic,
    ...shadows.lg,
  },
  googleButtonText: {
    color: colors.olive[900],
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.lg,
  },
  footerText: {
    fontSize: typography.fontSize.base,
    color: colors.olive[600],
    fontWeight: typography.fontWeight.medium,
  },
  footerLink: {
    fontSize: typography.fontSize.base,
    color: colors.terra[600],
    fontWeight: typography.fontWeight.semibold,
  },
  backButton: {
    marginTop: spacing.lg,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.olive[600],
    fontWeight: typography.fontWeight.semibold,
  },
});
