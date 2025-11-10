import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kinship - Your Voice Companion",
  description:
    "A voice-based AI companion for emotional support and meaningful conversations",
  keywords: [
    "AI companion",
    "emotional support",
    "voice chat",
    "mental wellness",
    "loneliness",
  ],
  authors: [{ name: "Kinship" }],
  openGraph: {
    title: "Kinship - Your Voice Companion",
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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
