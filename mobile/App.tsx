import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { HomeScreen } from "./src/screens/HomeScreen";
import { SignInScreen } from "./src/screens/SignInScreen";
import { SignUpScreen } from "./src/screens/SignUpScreen";
import { OnboardingScreen } from "./src/screens/OnboardingScreen";
import { ChatScreen } from "./src/screens/ChatScreen";
import { ActivityIndicator, View } from "react-native";
import { colors } from "./src/theme/colors";

const Stack = createStackNavigator();

function AppNavigator() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.sand[50],
        }}
      >
        <ActivityIndicator size="large" color={colors.terra[600]} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Chat" : "Home"}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.sand[50] },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
        <StatusBar style="dark" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
