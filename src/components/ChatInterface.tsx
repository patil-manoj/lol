"use client";

import { useState, useCallback, useEffect } from "react";
import { Message } from "@/types";
import { analyzeEmotion, getMoodEmoji } from "@/lib/emotionAnalysis";
import VoiceRecorder from "@/components/VoiceRecorder";
import MessageList from "@/components/MessageList";
import { useTextToSpeech } from "@/components/TextToSpeech";
import {
  Send,
  Loader2,
  AlertCircle,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Settings,
} from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);

  const { speak, stop, isSpeaking } = useTextToSpeech(selectedVoiceIndex);

  // Load voices and preferences on mount
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    // Try loading immediately
    loadVoices();

    // Set up the event listener for when voices change
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Also try loading after a short delay (Safari workaround)
    setTimeout(loadVoices, 100);

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    // Load auto-speak preference
    const savedAutoSpeak = localStorage.getItem("autoSpeak");
    if (savedAutoSpeak !== null) {
      setAutoSpeak(savedAutoSpeak === "true");
    }

    // Load selected voice
    const savedVoiceIndex = localStorage.getItem("selectedVoiceIndex");
    if (savedVoiceIndex !== null) {
      setSelectedVoiceIndex(parseInt(savedVoiceIndex));
    }
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    const htmlElement = document.documentElement;

    // Force remove any conflicting classes first
    htmlElement.classList.remove("light", "dark");

    // Then add the appropriate class
    if (darkMode) {
      htmlElement.classList.add("dark");
      htmlElement.setAttribute("data-theme", "dark");
    } else {
      htmlElement.setAttribute("data-theme", "light");
    }

    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Save preferences
  useEffect(() => {
    localStorage.setItem("autoSpeak", autoSpeak.toString());
  }, [autoSpeak]);

  useEffect(() => {
    localStorage.setItem("selectedVoiceIndex", selectedVoiceIndex.toString());
  }, [selectedVoiceIndex]);

  // Handle incoming transcript from voice recorder
  const handleTranscript = useCallback((text: string, isFinal: boolean) => {
    if (isFinal && text.trim()) {
      setInputText(text.trim());
      // Auto-send after voice input
      setTimeout(() => {
        handleSendMessage(text.trim());
      }, 500);
    }
  }, []);

  // Send message to AI
  const handleSendMessage = useCallback(
    async (content?: string) => {
      const messageText = content || inputText;
      if (!messageText.trim() || isLoading) return;

      setError(null);
      setInputText("");
      setIsListening(false);

      // Analyze user emotion
      const emotion = analyzeEmotion(messageText);

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: messageText,
        timestamp: new Date(),
        emotion: emotion.dominantEmotion,
        sentiment: emotion.sentiment,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Call chat API
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to get response");
        }

        const data = await response.json();

        // Add AI response
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Speak the response if auto-speak is enabled
        if (autoSpeak && !isSpeaking) {
          speak(data.message);
        }

        // Show crisis alert if detected
        if (data.isCrisis) {
          alert(
            "🆘 Crisis Resources:\n\n" +
              "National Suicide Prevention Lifeline: 988\n" +
              "Crisis Text Line: Text HOME to 741741\n\n" +
              "Please consider reaching out to these professional resources. You matter, and help is available."
          );
        }
      } catch (err: any) {
        console.error("Chat error:", err);
        const errorMessage =
          err.message || "Failed to send message. Please try again.";
        setError(errorMessage);

        // Add a helpful AI message when there's a network error
        if (
          errorMessage.includes("Network error") ||
          errorMessage.includes("connection")
        ) {
          const errorHelpMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content:
              "I'm having trouble connecting to my service right now. This might be a temporary network issue. Please check your internet connection and try again in a moment.",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorHelpMessage]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [inputText, messages, isLoading, autoSpeak, speak, isSpeaking]
  );

  // Handle text input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  // Get current mood
  const currentMood =
    messages.length > 0
      ? messages
          .filter((m) => m.role === "user" && m.sentiment !== undefined)
          .slice(-5) // Last 5 user messages
          .reduce((acc, m) => acc + (m.sentiment || 0), 0) / 5
      : 0;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-warm-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm transition-colors">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Talk to Me
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your voice companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Current mood indicator */}
            {messages.length > 0 && (
              <div className="text-2xl" title={`Current mood`}>
                {getMoodEmoji(currentMood)}
              </div>
            )}

            {/* Auto-speak toggle */}
            <button
              onClick={() => {
                setAutoSpeak(!autoSpeak);
                if (isSpeaking) stop();
              }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={autoSpeak ? "Voice responses ON" : "Voice responses OFF"}
            >
              {autoSpeak ? (
                <Volume2 className="w-5 h-5 text-primary-500" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              )}
            </button>

            {/* Voice settings */}
            <button
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Voice settings"
            >
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={darkMode ? "Switch to Light mode" : "Switch to Dark mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Voice Settings Modal */}
      {showVoiceSettings && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowVoiceSettings(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Voice Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Voice
                </label>
                <select
                  value={selectedVoiceIndex}
                  onChange={(e) =>
                    setSelectedVoiceIndex(parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {voices.length === 0 ? (
                    <option>Loading voices...</option>
                  ) : (
                    voices.map((voice, index) => (
                      <option key={index} value={index}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))
                  )}
                </select>
                {voices.length === 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Voices are loading. Please wait a moment and reopen
                    settings.
                  </p>
                )}
                {voices.length > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {voices.length} voice{voices.length !== 1 ? "s" : ""}{" "}
                    available
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center gap-2">
                <button
                  onClick={() => {
                    if (voices[selectedVoiceIndex]) {
                      speak("Hello! This is how I sound.");
                    }
                  }}
                  disabled={voices.length === 0}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Test Voice
                </button>
                <button
                  onClick={() => {
                    const availableVoices = window.speechSynthesis.getVoices();
                    setVoices(availableVoices);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Reload
                </button>
                <button
                  onClick={() => setShowVoiceSettings(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 max-w-4xl w-full mx-auto flex flex-col overflow-hidden">
        <MessageList messages={messages} />
      </div>

      {/* Error display */}
      {error && (
        <div className="max-w-4xl w-full mx-auto px-4 py-2">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-6 transition-colors">
        <div className="max-w-4xl mx-auto">
          {/* Voice recorder (primary input) */}
          <div className="mb-4">
            <VoiceRecorder
              onTranscript={handleTranscript}
              isListening={isListening}
              onListeningChange={setIsListening}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              or type a message
            </span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600" />
          </div>

          {/* Text input (fallback) */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              disabled={isLoading || isListening}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim() || isListening}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              Send
            </button>
          </form>

          {/* Privacy notice */}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            This is a supportive space. I'm an AI companion, not a licensed
            therapist. For emergencies, call 988.
          </p>
        </div>
      </div>
    </div>
  );
}
