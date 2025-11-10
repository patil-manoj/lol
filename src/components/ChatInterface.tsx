"use client";

import { useState, useCallback, useEffect } from "react";
import { Message } from "@/types";
import { analyzeEmotion, getMoodEmoji } from "@/lib/emotionAnalysis";
import VoiceRecorder from "@/components/VoiceRecorder";
import MessageList from "@/components/MessageList";
import { useTextToSpeech } from "@/components/TextToSpeech";
import { Send, Loader2, AlertCircle, Volume2, VolumeX } from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);

  const { speak, stop, isSpeaking } = useTextToSpeech();

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
        setError(err.message || "Failed to send message. Please try again.");
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
    <div className="flex flex-col h-screen bg-gradient-to-b from-warm-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Kinship</h1>
              <p className="text-sm text-gray-500">Your voice companion</p>
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
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={autoSpeak ? "Voice responses ON" : "Voice responses OFF"}
            >
              {autoSpeak ? (
                <Volume2 className="w-5 h-5 text-primary-500" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 max-w-4xl w-full mx-auto flex flex-col overflow-hidden">
        <MessageList messages={messages} />
      </div>

      {/* Error display */}
      {error && (
        <div className="max-w-4xl w-full mx-auto px-4 py-2">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 px-6 py-6">
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
            <div className="flex-1 border-t border-gray-300" />
            <span className="text-sm text-gray-500">or type a message</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {/* Text input (fallback) */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
          <p className="text-xs text-gray-500 text-center mt-4">
            This is a supportive space. I'm an AI companion, not a licensed
            therapist. For emergencies, call 988.
          </p>
        </div>
      </div>
    </div>
  );
}
