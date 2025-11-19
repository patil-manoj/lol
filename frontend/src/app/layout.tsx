import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talk to Me - Your Voice Companion",
  description:
    "A voice-based AI companion for emotional support and meaningful conversations",
  keywords: [
    "AI companion",
    "emotional support",
    "voice chat",
    "mental wellness",
    "loneliness",
  ],
  authors: [{ name: "Talk to Me" }],
  openGraph: {
    title: "Talk to Me - Your Voice Companion",
    description: "A voice-based AI companion for emotional support",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}
