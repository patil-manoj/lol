import { EmotionAnalysis } from "../types";

// Simple sentiment analysis using keyword matching
const EMOTION_KEYWORDS = {
  joy: [
    "happy",
    "great",
    "wonderful",
    "excited",
    "joy",
    "love",
    "amazing",
    "fantastic",
    "good",
    "better",
    "glad",
    "grateful",
    "thankful",
  ],
  sadness: [
    "sad",
    "down",
    "depressed",
    "lonely",
    "alone",
    "crying",
    "tears",
    "miss",
    "lost",
    "empty",
    "hopeless",
    "hurt",
  ],
  anger: [
    "angry",
    "mad",
    "furious",
    "annoyed",
    "frustrated",
    "hate",
    "irritated",
    "upset",
    "rage",
  ],
  fear: [
    "afraid",
    "scared",
    "anxious",
    "worried",
    "nervous",
    "panic",
    "terrified",
    "fear",
    "overwhelmed",
    "stress",
  ],
  neutral: ["okay", "fine", "normal", "alright"],
};

const POSITIVE_WORDS = [...EMOTION_KEYWORDS.joy];
const NEGATIVE_WORDS = [
  ...EMOTION_KEYWORDS.sadness,
  ...EMOTION_KEYWORDS.anger,
  ...EMOTION_KEYWORDS.fear,
];

export function analyzeEmotion(text: string): EmotionAnalysis {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);

  // Count emotion keywords
  const emotionScores = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    neutral: 0,
  };

  words.forEach((word) => {
    Object.entries(EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
      if (keywords.some((keyword) => word.includes(keyword))) {
        emotionScores[emotion as keyof typeof emotionScores]++;
      }
    });
  });

  // Calculate sentiment score (-1 to 1)
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach((word) => {
    if (POSITIVE_WORDS.some((pos) => word.includes(pos))) {
      positiveCount++;
    }
    if (NEGATIVE_WORDS.some((neg) => word.includes(neg))) {
      negativeCount++;
    }
  });

  const totalEmotionalWords = positiveCount + negativeCount;
  const sentiment =
    totalEmotionalWords > 0
      ? (positiveCount - negativeCount) / totalEmotionalWords
      : 0;

  // Normalize emotion scores
  const totalEmotions = Object.values(emotionScores).reduce((a, b) => a + b, 0);
  const normalizedEmotions =
    totalEmotions > 0
      ? Object.fromEntries(
          Object.entries(emotionScores).map(([key, value]) => [
            key,
            value / totalEmotions,
          ])
        )
      : { joy: 0, sadness: 0, anger: 0, fear: 0, neutral: 1 };

  // Find dominant emotion
  const dominantEmotion = Object.entries(normalizedEmotions).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  return {
    sentiment,
    emotions: normalizedEmotions as EmotionAnalysis["emotions"],
    dominantEmotion,
  };
}

export function getMoodEmoji(sentiment: number): string {
  if (sentiment > 0.5) return "😊";
  if (sentiment > 0.2) return "🙂";
  if (sentiment > -0.2) return "😐";
  if (sentiment > -0.5) return "😔";
  return "😢";
}

export function getMoodLabel(sentiment: number): string {
  if (sentiment > 0.5) return "Very Positive";
  if (sentiment > 0.2) return "Positive";
  if (sentiment > -0.2) return "Neutral";
  if (sentiment > -0.5) return "Negative";
  return "Very Negative";
}
