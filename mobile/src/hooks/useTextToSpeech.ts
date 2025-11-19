import { useState, useEffect, useCallback } from "react";
import * as Speech from "expo-speech";
import { VoiceSettings } from "../types";

interface UseTextToSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  availableVoices: Speech.Voice[];
}

export const useTextToSpeech = (
  settings: VoiceSettings = {
    pitch: 1.0,
    rate: 0.9,
    volume: 1.0,
    language: "en-US",
  }
): UseTextToSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<Speech.Voice[]>([]);

  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      setAvailableVoices(voices);
    } catch (error) {
      console.error("Error loading voices:", error);
    }
  };

  const speak = useCallback(
    (text: string) => {
      if (!text) return;

      // Stop any ongoing speech
      Speech.stop();

      setIsSpeaking(true);

      Speech.speak(text, {
        pitch: settings.pitch,
        rate: settings.rate,
        volume: settings.volume,
        language: settings.language,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: (error) => {
          console.error("Speech error:", error);
          setIsSpeaking(false);
        },
      });
    },
    [settings]
  );

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    availableVoices,
  };
};
