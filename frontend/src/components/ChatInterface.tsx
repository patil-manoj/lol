"use client";

import { useState, useCallback, useEffect } from "react";
import { Message } from "@/types";
import { analyzeEmotion } from "@/lib/emotionAnalysis";
import MessageList from "@/components/MessageList";
import { useTextToSpeech } from "@/components/TextToSpeech";
import {
  Send,
  Loader2,
  AlertCircle,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Settings,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [recognition, setRecognition] = useState<any>(null);

  const { speak, stop, isSpeaking } = useTextToSpeech(selectedVoiceIndex);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Web Speech API not supported");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event: any) => {
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + " ";
        }
      }

      if (final) {
        setInputText(final.trim());
      }
    };

    recognitionInstance.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error !== "no-speech") {
        setIsListening(false);
      }
    };

    recognitionInstance.onend = () => {
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

  // Handle listening state changes
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
    }
  }, [isListening, recognition]);

  // Load voices and preferences on mount
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    setTimeout(loadVoices, 100);

    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    }

    const savedAutoSpeak = localStorage.getItem("autoSpeak");
    if (savedAutoSpeak !== null) {
      setAutoSpeak(savedAutoSpeak === "true");
    }

    const savedVoiceIndex = localStorage.getItem("selectedVoiceIndex");
    if (savedVoiceIndex !== null) {
      setSelectedVoiceIndex(parseInt(savedVoiceIndex));
    }
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("autoSpeak", autoSpeak.toString());
  }, [autoSpeak]);

  useEffect(() => {
    localStorage.setItem("selectedVoiceIndex", selectedVoiceIndex.toString());
  }, [selectedVoiceIndex]);

  const handleSendMessage = useCallback(
    async (content?: string) => {
      const messageText = content || inputText;
      if (!messageText.trim() || isLoading) return;

      setError(null);
      setInputText("");
      setIsListening(false);

      const emotion = analyzeEmotion(messageText);

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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api/chat";
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        const response = await fetch(apiUrl, {
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
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Server error' }));
          throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        if (autoSpeak && !isSpeaking) {
          speak(data.message);
        }

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
        
        let errorMessage = "Failed to send message. Please try again.";
        let assistantErrorMessage = "";
        
        if (err.name === 'AbortError') {
          errorMessage = "Request timed out. Please try again.";
          assistantErrorMessage = "The request took too long. Please check your connection and try again.";
        } else if (err.message?.includes('fetch') || err.message?.includes('network') || err.message?.includes('Failed to fetch')) {
          errorMessage = "Network error. Please check your connection.";
          assistantErrorMessage = "I'm having trouble connecting. Please check your internet connection and ensure the backend server is running.";
        } else {
          errorMessage = err.message || errorMessage;
        }
        
        setError(errorMessage);

        if (assistantErrorMessage) {
          const errorHelpMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content: assistantErrorMessage,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Clean Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Voice AI
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={autoSpeak ? "Disable auto-speak" : "Enable auto-speak"}
            >
              {autoSpeak ? (
                <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Voice Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Voice
                </label>
                <select
                  value={selectedVoiceIndex}
                  onChange={(e) =>
                    setSelectedVoiceIndex(parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-600">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Auto-speak responses
                </span>
                <button
                  onClick={() => setAutoSpeak(!autoSpeak)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoSpeak ? "bg-purple-600" : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoSpeak ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    if (voices[selectedVoiceIndex]) {
                      speak("Hello! This is how I sound.");
                    }
                  }}
                  disabled={voices.length === 0}
                  className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Test Voice
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-3">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Voice Recorder - Hidden, using integrated voice button */}

      {/* Input Area */}
      <div className="relative bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <form onSubmit={handleSubmit} className="relative">
            {/* Listening Indicator */}
            {isListening && (
              <div className="mb-3 flex items-center justify-center gap-2 text-sm text-red-600">
                <div className="flex gap-1">
                  <span
                    className="w-1 h-4 bg-red-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1 h-4 bg-red-500 rounded-full animate-pulse"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1 h-4 bg-red-500 rounded-full animate-pulse"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
                <span className="font-medium">Listening...</span>
              </div>
            )}

            {/* Voice Button - Large and Centered */}
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={() => setIsListening(!isListening)}
                disabled={isLoading}
                className={`relative p-6 rounded-full transition-all duration-300 shadow-2xl ${
                  isListening
                    ? "bg-gradient-to-br from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-cyan-500/50 animate-pulse"
                    : "bg-gradient-to-br from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-cyan-500/50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8" strokeWidth={2.5} />
                ) : (
                  <Mic className="w-8 h-8" strokeWidth={2.5} />
                )}
                {/* Ripple effect when listening */}
                {isListening && (
                  <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75"></span>
                )}
              </button>
            </div>

            {/* Input Bar with Icons */}
            <div className="flex items-center gap-3">
              {/* Image/Gallery Icon */}
              <button
                type="button"
                className="flex-shrink-0 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Attach image"
              >
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Ask me anything..."
                  disabled={isLoading || isListening}
                  className="w-full px-4 py-3.5 border-2 border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading || isListening}
                className="flex-shrink-0 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 text-purple-600 dark:text-purple-400 animate-spin" />
                ) : (
                  <Send
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    strokeWidth={2}
                  />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
