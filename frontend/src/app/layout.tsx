import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Elena - Your Voice Companion",
  description:
    "A voice-based AI companion for emotional support and meaningful conversations",
  keywords: [
    "AI companion",
    "emotional support",
    "voice chat",
    "mental wellness",
    "loneliness",
  ],
  authors: [{ name: "Elena" }],
  openGraph: {
    title: "Elena - Your Voice Companion",
    description: "A voice-based AI companion for emotional support",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleClientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "dummy-client-id";

  // Warn developers if Google Client ID is not configured
  if (typeof window !== "undefined" && googleClientId === "dummy-client-id") {
    console.warn(
      "⚠️ Google OAuth is not configured!\n" +
        "To enable Google Sign-In:\n" +
        "1. Get your Client ID from https://console.cloud.google.com/apis/credentials\n" +
        "2. Add it to frontend/.env.local\n" +
        "3. Restart the dev server\n" +
        "See GOOGLE_SETUP_QUICK.md for detailed instructions."
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-sand-50 dark:bg-gray-900">
        <GoogleOAuthProvider clientId={googleClientId}>
          <AuthProvider>{children}</AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
