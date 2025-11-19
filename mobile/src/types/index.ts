export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  emotion?: string;
  sentiment?: number;
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

export interface VoiceSettings {
  pitch: number;
  rate: number;
  volume: number;
  language: string;
}

export interface ChatResponse {
  message: string;
  isCrisis?: boolean;
  model?: string;
}
