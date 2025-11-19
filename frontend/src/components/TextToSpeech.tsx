"use client";

import { useEffect, useState, useCallback } from "react";

interface TextToSpeechProps {
  text: string;
  onStart?: () => void;
  onEnd?: () => void;
  autoPlay?: boolean;
}

export default function TextToSpeech({
  text,
  onStart,
  onEnd,
  autoPlay = true,
}: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Try to select a pleasant female voice by default
      const preferredVoice =
        availableVoices.find(
          (voice) =>
            voice.name.includes("Female") ||
            voice.name.includes("Samantha") ||
            voice.name.includes("Karen") ||
            voice.name.includes("Zira")
        ) ||
        availableVoices.find((voice) => voice.lang.startsWith("en")) ||
        availableVoices[0];

      setSelectedVoice(preferredVoice);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback(
    (textToSpeak: string) => {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      if (!textToSpeak) return;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Configure voice parameters for warm, empathetic tone
      utterance.pitch = 1.0; // Normal pitch
      utterance.rate = 0.9; // Slightly slower for clarity and warmth
      utterance.volume = 1.0; // Full volume

      utterance.onstart = () => {
        setIsSpeaking(true);
        onStart?.();
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setIsSpeaking(false);
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    },
    [selectedVoice, onStart, onEnd]
  );

  // Auto-play when text changes
  useEffect(() => {
    if (autoPlay && text) {
      speak(text);
    }
  }, [text, autoPlay, speak]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    stopSpeaking,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
  };
}

// Custom hook for TTS
export function useTextToSpeech(voiceIndex: number = 0) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = useCallback(
    (text: string) => {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.0;
      utterance.rate = 0.9;
      utterance.volume = 1.0;

      // Use selected voice
      if (voices[voiceIndex]) {
        utterance.voice = voices[voiceIndex];
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [voices, voiceIndex]
  );

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
