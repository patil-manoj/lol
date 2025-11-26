import { useState, useCallback, useEffect } from "react";
import { Message } from "@/types";
import { analyzeEmotion } from "@/lib/emotionAnalysis";
import MessageList from "@/components/MessageList";
import { useTextToSpeech } from "@/components/TextToSpeech";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
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
  LogOut,
  Trash2,
} from "lucide-react";

export default function ChatInterface() {
  const { user, signOut, updatePreferences } = useAuth();
  const router = useRouter();
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

  // Load messages from localStorage if user has consented
  useEffect(() => {
    if (user?.preferences.allowChatStorage) {
      const storedMessages = localStorage.getItem(`chat_${user.id}`);
      if (storedMessages) {
        try {
          const parsed = JSON.parse(storedMessages);
          setMessages(
            parsed.map((m: any) => ({
              ...m,
              timestamp: new Date(m.timestamp),
            }))
          );
        } catch (error) {
          console.error("Failed to load chat history:", error);
        }
      }
    }
  }, [user]);

  // Save messages when they change (if consented)
  useEffect(() => {
    if (user?.preferences.allowChatStorage && messages.length > 0) {
      localStorage.setItem(`chat_${user.id}`, JSON.stringify(messages));
    }
  }, [messages, user]);

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
          const errorData = await response
            .json()
            .catch(() => ({ error: "Server error" }));
          throw new Error(
            errorData.error || `Server error: ${response.status}`
          );
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

        if (err.name === "AbortError") {
          errorMessage = "Request timed out. Please try again.";
          assistantErrorMessage =
            "The request took too long. Please check your connection and try again.";
        } else if (
          err.message?.includes("fetch") ||
          err.message?.includes("network") ||
          err.message?.includes("Failed to fetch")
        ) {
          errorMessage = "Network error. Please check your connection.";
          assistantErrorMessage =
            "I'm having trouble connecting. Please check your internet connection and ensure the backend server is running.";
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
    <div className="relative flex flex-col h-screen bg-sand-50 dark:bg-gray-900 overflow-hidden">
      {/* Decorative organic shapes in background */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute -top-32 -left-32 w-96 h-96 bg-terra-200/20 dark:bg-terra-800/10 organic-blob float-particle"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-1/4 -right-48 w-80 h-80 bg-olive-200/20 dark:bg-olive-800/10 organic-blob-2 float-particle"
          style={{ animationDelay: "5s" }}
        />
        <div
          className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-sand-300/10 dark:bg-sand-800/5 organic-blob float-particle"
          style={{ animationDelay: "10s" }}
        />
      </div>

      {/* Main content */}
      <div className="relative flex flex-col h-full" style={{ zIndex: 2 }}>
        {/* Asymmetric Header */}
        <header className="border-b-2 border-olive-600/20 dark:border-olive-400/20 bg-sand-100/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-terra-500 to-terra-700 organic-blob flex items-center justify-center shadow-lg">
                  <Sparkles
                    className="w-6 h-6 text-sand-50"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-olive-500 rounded-full border-2 border-sand-100 dark:border-gray-900" />
              </div>
              <div>
                <h1 className="text-2xl font-serif italic text-olive-900 dark:text-sand-100 leading-none">
                  Elena
                </h1>
                <p className="text-xs text-olive-600 dark:text-olive-400 mt-0.5 font-medium tracking-wide">
                  Your Voice Companion
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoSpeak(!autoSpeak)}
                className="p-2.5 rounded-2xl hover:bg-olive-100 dark:hover:bg-olive-900/30 transition-all duration-300"
                title={autoSpeak ? "Disable auto-speak" : "Enable auto-speak"}
              >
                {autoSpeak ? (
                  <Volume2
                    className="w-5 h-5 text-terra-600 dark:text-terra-400"
                    strokeWidth={2.5}
                  />
                ) : (
                  <VolumeX
                    className="w-5 h-5 text-olive-400"
                    strokeWidth={2.5}
                  />
                )}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-2xl hover:bg-olive-100 dark:hover:bg-olive-900/30 transition-all duration-300"
                title="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-sand-300" strokeWidth={2.5} />
                ) : (
                  <Moon className="w-5 h-5 text-olive-700" strokeWidth={2.5} />
                )}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2.5 rounded-2xl hover:bg-olive-100 dark:hover:bg-olive-900/30 transition-all duration-300"
                title="Settings"
              >
                <Settings
                  className="w-5 h-5 text-olive-700 dark:text-sand-300"
                  strokeWidth={2.5}
                />
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to sign out?")) {
                    signOut();
                    router.push("/");
                  }
                }}
                className="p-2.5 rounded-2xl hover:bg-terra-100 dark:hover:bg-terra-900/30 transition-all duration-300"
                title="Sign out"
              >
                <LogOut
                  className="w-5 h-5 text-terra-600 dark:text-terra-400"
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </div>
        </header>

        {/* Settings Panel */}
        {showSettings && (
          <div
            className="fixed inset-0 bg-olive-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowSettings(false)}
          >
            <div
              className="bg-sand-50 dark:bg-gray-800 rounded-[32px] shadow-2xl p-8 max-w-md w-full border-2 border-olive-600/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-serif italic text-olive-900 dark:text-sand-100 mb-8">
                Settings
              </h2>

              <div className="space-y-6">
                {/* User Info */}
                {user && (
                  <div className="pb-6 border-b-2 border-olive-600/20">
                    <p className="text-sm font-semibold text-olive-800 dark:text-olive-300 mb-1 tracking-wide uppercase">
                      Signed in as
                    </p>
                    <p className="text-lg font-medium text-olive-900 dark:text-sand-100">
                      {user.name}
                    </p>
                    <p className="text-sm text-olive-600 dark:text-olive-400">
                      {user.email}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-olive-800 dark:text-olive-300 mb-3 tracking-wide uppercase">
                    Voice Selection
                  </label>
                  <select
                    value={selectedVoiceIndex}
                    onChange={(e) =>
                      setSelectedVoiceIndex(parseInt(e.target.value))
                    }
                    className="w-full px-5 py-3.5 border-2 border-olive-600/30 dark:border-olive-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-terra-500 focus:border-transparent bg-white dark:bg-gray-700 text-olive-900 dark:text-sand-100 font-medium"
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

                <div className="flex items-center justify-between py-4 border-t-2 border-olive-600/20">
                  <span className="text-sm font-semibold text-olive-800 dark:text-olive-300 tracking-wide uppercase">
                    Auto-speak
                  </span>
                  <button
                    onClick={() => setAutoSpeak(!autoSpeak)}
                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${
                      autoSpeak
                        ? "bg-terra-600"
                        : "bg-olive-300 dark:bg-olive-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-sand-50 transition-transform duration-300 shadow-lg ${
                        autoSpeak ? "translate-x-9" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Privacy Settings */}
                {user && (
                  <>
                    <div className="flex items-center justify-between py-4 border-t-2 border-olive-600/20">
                      <span className="text-sm font-semibold text-olive-800 dark:text-olive-300 tracking-wide uppercase">
                        Save Chat History
                      </span>
                      <button
                        onClick={() =>
                          updatePreferences({
                            allowChatStorage:
                              !user.preferences.allowChatStorage,
                          })
                        }
                        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${
                          user.preferences.allowChatStorage
                            ? "bg-terra-600"
                            : "bg-olive-300 dark:bg-olive-700"
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-sand-50 transition-transform duration-300 shadow-lg ${
                            user.preferences.allowChatStorage
                              ? "translate-x-9"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-4 border-t-2 border-olive-600/20">
                      <span className="text-sm font-semibold text-olive-800 dark:text-olive-300 tracking-wide uppercase">
                        Personalization
                      </span>
                      <button
                        onClick={() =>
                          updatePreferences({
                            allowPersonalization:
                              !user.preferences.allowPersonalization,
                          })
                        }
                        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${
                          user.preferences.allowPersonalization
                            ? "bg-terra-600"
                            : "bg-olive-300 dark:bg-olive-700"
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-sand-50 transition-transform duration-300 shadow-lg ${
                            user.preferences.allowPersonalization
                              ? "translate-x-9"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Delete Chat History */}
                    {user.preferences.allowChatStorage &&
                      messages.length > 0 && (
                        <div className="pt-4 border-t-2 border-olive-600/20">
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete all chat history? This cannot be undone."
                                )
                              ) {
                                localStorage.removeItem(`chat_${user.id}`);
                                setMessages([]);
                              }
                            }}
                            className="w-full px-6 py-3.5 bg-terra-100 dark:bg-terra-900/30 hover:bg-terra-200 dark:hover:bg-terra-900/50 text-terra-800 dark:text-terra-300 border-2 border-terra-500/40 rounded-3xl transition-all duration-300 font-semibold tracking-wide flex items-center justify-center gap-2"
                          >
                            <Trash2 className="w-5 h-5" strokeWidth={2.5} />
                            Delete Chat History
                          </button>
                        </div>
                      )}
                  </>
                )}

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => {
                      if (voices[selectedVoiceIndex]) {
                        speak("Hello! This is how I sound.");
                      }
                    }}
                    disabled={voices.length === 0}
                    className="flex-1 px-6 py-3.5 bg-terra-600 hover:bg-terra-700 text-sand-50 rounded-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold tracking-wide shadow-lg hover:shadow-xl"
                  >
                    Test Voice
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-6 py-3.5 bg-olive-100 dark:bg-olive-800 hover:bg-olive-200 dark:hover:bg-olive-700 text-olive-900 dark:text-sand-100 rounded-3xl transition-all duration-300 font-semibold tracking-wide"
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
          <div className="max-w-4xl w-full mx-auto px-6 py-4">
            <div className="bg-terra-100 dark:bg-terra-900/30 border-2 border-terra-500/40 rounded-3xl p-5 flex items-start gap-4 shadow-lg">
              <AlertCircle
                className="w-6 h-6 text-terra-700 dark:text-terra-400 flex-shrink-0 mt-0.5"
                strokeWidth={2.5}
              />
              <p className="text-sm font-medium text-terra-900 dark:text-terra-300 leading-relaxed">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Input Area - Asymmetric Design */}
        <div className="relative bg-gradient-to-t from-sand-100 to-sand-50/50 dark:from-gray-900 dark:to-gray-900/50 pt-8 pb-8">
          <div className="max-w-4xl mx-auto px-6">
            {/* Listening Indicator */}
            {isListening && (
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="flex gap-1.5">
                  <span
                    className="w-1.5 h-8 bg-terra-600 rounded-full animate-pulse"
                    style={{ animationDelay: "0ms", animationDuration: "1s" }}
                  />
                  <span
                    className="w-1.5 h-10 bg-terra-600 rounded-full animate-pulse"
                    style={{ animationDelay: "150ms", animationDuration: "1s" }}
                  />
                  <span
                    className="w-1.5 h-6 bg-terra-600 rounded-full animate-pulse"
                    style={{ animationDelay: "300ms", animationDuration: "1s" }}
                  />
                  <span
                    className="w-1.5 h-9 bg-terra-600 rounded-full animate-pulse"
                    style={{ animationDelay: "450ms", animationDuration: "1s" }}
                  />
                </div>
                <span className="font-semibold text-terra-700 dark:text-terra-400 tracking-wide uppercase text-sm">
                  Listening...
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Voice Button - Prominent Central Feature */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsListening(!isListening)}
                  disabled={isLoading}
                  className={`group relative p-8 rounded-full transition-all duration-500 shadow-2xl ${
                    isListening
                      ? "bg-gradient-to-br from-terra-400 via-terra-500 to-terra-600 scale-110 shadow-terra-500/50"
                      : "bg-gradient-to-br from-olive-500 via-olive-600 to-olive-700 hover:scale-105 shadow-olive-600/40"
                  } disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-3xl`}
                >
                  {isListening ? (
                    <MicOff
                      className="w-10 h-10 text-sand-50"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <Mic className="w-10 h-10 text-sand-50" strokeWidth={2.5} />
                  )}
                  {/* Ripple effect when listening */}
                  {isListening && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-terra-400 animate-ping opacity-40"></span>
                      <span className="absolute inset-0 rounded-full bg-terra-500/30 animate-pulse"></span>
                    </>
                  )}
                </button>
              </div>

              {/* Input Row - Asymmetric Layout */}
              <div className="flex items-stretch gap-3">
                {/* Image Icon */}
                <button
                  type="button"
                  className="flex-shrink-0 p-4 rounded-3xl hover:bg-olive-100 dark:hover:bg-olive-900/30 transition-all duration-300 group"
                  title="Attach image"
                >
                  <svg
                    className="w-7 h-7 text-olive-600 dark:text-olive-400 group-hover:text-terra-600 dark:group-hover:text-terra-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </button>

                {/* Text Input - Organic Shape */}
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
                    placeholder="Share your thoughts..."
                    disabled={isLoading || isListening}
                    className="w-full px-7 py-4 border-2 border-olive-600/30 dark:border-olive-600/50 rounded-[28px] focus:outline-none focus:ring-2 focus:ring-terra-500 focus:border-terra-500 bg-white/90 dark:bg-gray-800/90 text-olive-900 dark:text-sand-100 placeholder-olive-400 dark:placeholder-olive-500 disabled:bg-sand-100 dark:disabled:bg-gray-800 disabled:text-olive-400 font-medium text-[15px] shadow-lg backdrop-blur-sm transition-all duration-300"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading || isListening}
                  className="flex-shrink-0 p-4 rounded-3xl hover:bg-terra-100 dark:hover:bg-terra-900/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
                >
                  {isLoading ? (
                    <Loader2
                      className="w-7 h-7 text-terra-600 dark:text-terra-400 animate-spin"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <Send
                      className="w-7 h-7 text-terra-600 dark:text-terra-400 group-hover:scale-110 transition-transform"
                      strokeWidth={2.5}
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
