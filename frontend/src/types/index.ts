// Type definitions for Web Speech API (not fully typed in TypeScript by default)
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  emotion?: string;
  sentiment?: number;
}

export interface Conversation {
  id: string;
  userId?: string;
  messages: Message[];
  startedAt: Date;
  lastMessageAt: Date;
  title?: string;
  mood?: string;
}

export interface VoiceSettings {
  voiceIndex: number;
  pitch: number;
  rate: number;
  volume: number;
}

export interface EmotionAnalysis {
  sentiment: number; // -1 to 1 (negative to positive)
  emotions: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    neutral: number;
  };
  dominantEmotion: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  allowChatStorage: boolean;
  allowPersonalization: boolean;
  voiceSettings?: VoiceSettings;
  theme?: "light" | "dark";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
