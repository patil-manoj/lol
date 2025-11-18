"use client";

import { useEffect, useState, useCallback } from "react";
import { Mic, MicOff, Volume2, VolumeX, AlertCircle } from "lucide-react";

interface VoiceRecorderProps {
  onTranscript: (text: string, isFinal: boolean) => void;
  isListening: boolean;
  onListeningChange: (listening: boolean) => void;
}

export default function VoiceRecorder({
  onTranscript,
  isListening,
  onListeningChange,
}: VoiceRecorderProps) {
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [interimTranscript, setInterimTranscript] = useState("");

  useEffect(() => {
    // Check if browser supports Web Speech API
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      console.error("Web Speech API not supported in this browser");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onresult = (event: any) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          final += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      if (interim) {
        setInterimTranscript(interim);
        onTranscript(interim, false);
      }

      if (final) {
        setInterimTranscript("");
        onTranscript(final.trim(), true);
      }
    };

    recognitionInstance.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);

      if (event.error === "no-speech") {
        // User didn't speak, just ignore
        return;
      }

      if (event.error === "not-allowed") {
        alert(
          "Microphone access denied. Please allow microphone access to use voice features."
        );
        onListeningChange(false);
      }

      if (event.error === "network") {
        alert(
          "Network error. Speech recognition requires an internet connection."
        );
        onListeningChange(false);
      }
    };

    recognitionInstance.onend = () => {
      // Auto-restart if still in listening mode
      if (isListening) {
        try {
          recognitionInstance.start();
        } catch (e) {
          console.error("Error restarting recognition:", e);
        }
      }
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!recognition) return;

    if (isListening) {
      try {
        recognition.start();
      } catch (e) {
        console.error("Error starting recognition:", e);
      }
    } else {
      recognition.stop();
      setInterimTranscript("");
    }
  }, [isListening, recognition]);

  const toggleListening = useCallback(() => {
    onListeningChange(!isListening);
  }, [isListening, onListeningChange]);

  if (!isSupported) {
    return (
      <div className="text-center p-6 glass-strong border border-red-300 dark:border-red-700 rounded-2xl shadow-premium animate-fadeInUp">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-700 dark:text-red-300 font-semibold text-lg mb-2">
          Voice recognition is not supported in your browser.
        </p>
        <p className="text-red-600 dark:text-red-400 text-sm">
          Please use Google Chrome or Microsoft Edge for the best experience.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Voice visualizer */}
      {isListening && (
        <div className="flex items-center justify-center gap-2 h-16 animate-fadeInUp">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-gradient-to-t from-primary-500 to-accent-500 rounded-full animate-wave shadow-glow"
              style={{
                animationDelay: `${i * 0.1}s`,
                height: "100%",
              }}
            />
          ))}
        </div>
      )}

      {/* Premium Microphone button */}
      <div className="relative group">
        {isListening && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-ping opacity-30" />
          </>
        )}
        {!isListening && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
        )}
        <button
          onClick={toggleListening}
          className={`
            relative p-8 rounded-full transition-all duration-500 transform hover:scale-110 shadow-glow
            ${
              isListening
                ? "bg-gradient-to-br from-red-500 to-pink-500 animate-glow"
                : "bg-gradient-to-br from-primary-500 to-accent-500 hover:shadow-glow-lg"
            }
          `}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? (
            <MicOff className="w-10 h-10 text-white drop-shadow-lg" />
          ) : (
            <Mic className="w-10 h-10 text-white drop-shadow-lg" />
          )}
        </button>
      </div>

      {/* Status text */}
      <div className="glass rounded-2xl px-6 py-3 shadow-premium">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {isListening ? (
            <span className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary-500 animate-pulse" />
              Listening... speak now
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <VolumeX className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              Click to start talking
            </span>
          )}
        </p>
      </div>

      {/* Interim transcript */}
      {interimTranscript && (
        <div className="glass-strong rounded-2xl px-6 py-4 max-w-md text-center shadow-premium animate-fadeInUp">
          <p className="text-sm text-gray-600 dark:text-gray-300 italic font-medium">
            "{interimTranscript}"
          </p>
        </div>
      )}
    </div>
  );
}
