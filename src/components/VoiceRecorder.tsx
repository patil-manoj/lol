"use client";

import { useEffect, useState, useCallback } from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

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
      <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 font-medium">
          Voice recognition is not supported in your browser.
        </p>
        <p className="text-red-600 text-sm mt-2">
          Please use Google Chrome or Microsoft Edge for the best experience.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Voice visualizer */}
      {isListening && (
        <div className="flex items-center gap-1 h-12">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary-500 rounded-full animate-wave"
              style={{
                animationDelay: `${i * 0.1}s`,
                height: "100%",
              }}
            />
          ))}
        </div>
      )}

      {/* Microphone button */}
      <button
        onClick={toggleListening}
        className={`
          relative p-6 rounded-full transition-all duration-300 transform hover:scale-105
          ${
            isListening
              ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200"
              : "bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-200"
          }
        `}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        {isListening ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}

        {isListening && (
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
        )}
      </button>

      {/* Status text */}
      <p className="text-sm text-gray-600">
        {isListening ? (
          <span className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-primary-500" />
            Listening... speak now
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <VolumeX className="w-4 h-4 text-gray-400" />
            Click to start talking
          </span>
        )}
      </p>

      {/* Interim transcript */}
      {interimTranscript && (
        <div className="text-sm text-gray-500 italic max-w-md text-center">
          {interimTranscript}
        </div>
      )}
    </div>
  );
}
