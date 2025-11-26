"use client";

import { Message } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { User, Bot, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="max-w-3xl w-full text-center space-y-10 px-6">
          {/* Artistic Avatar */}
          <div className="flex justify-center mb-8 relative">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-terra-400 via-terra-500 to-olive-600 organic-blob flex items-center justify-center shadow-2xl">
                <Sparkles className="w-16 h-16 text-sand-50" strokeWidth={2} />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-olive-500/30 organic-blob-2 blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-terra-400/20 organic-blob blur-md" />
            </div>
          </div>

          {/* Welcome Message - Serif Typography */}
          <div className="space-y-4">
            <h2 className="text-5xl font-serif italic text-olive-900 dark:text-sand-100 leading-tight">
              Hi{user ? `, ${user.name.split(" ")[0]}` : ""}, I'm Elena.
            </h2>
            <h3 className="text-xl font-medium text-olive-700 dark:text-olive-300 leading-relaxed max-w-lg mx-auto">
              {user?.preferences.allowPersonalization
                ? "I'm learning about you to provide better support. Let's have a meaningful conversation."
                : "Your personal voice companion, here to listen and support you."}
            </h3>
          </div>

          {/* Suggestion Chips with Staggered Animation */}
          <div className="flex flex-wrap gap-3 justify-center pt-8 max-w-2xl mx-auto">
            {[
              { text: "Sing me a song", emoji: "🎵" },
              { text: "Find restaurants", emoji: "🍽️" },
              { text: "Play a game", emoji: "🎮" },
              { text: "Sports news", emoji: "⚽" },
              { text: "Random fun", emoji: "✨" },
              { text: "Today's weather", emoji: "☀️" },
            ].map((suggestion, i) => (
              <button
                key={i}
                className="stagger-item px-6 py-3 bg-transparent border-2 border-olive-600/30 dark:border-olive-500/40 hover:border-terra-500 dark:hover:border-terra-400 hover:bg-terra-50 dark:hover:bg-terra-900/20 text-olive-800 dark:text-olive-200 hover:text-terra-700 dark:hover:text-terra-300 rounded-[20px] text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <span className="mr-2">{suggestion.emoji}</span>
                {suggestion.text}
              </button>
            ))}
          </div>

          {/* Subtle hint text */}
          <p className="text-sm text-olive-500 dark:text-olive-400 pt-6 font-medium">
            Tap the microphone to start speaking or type your message below
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex gap-5 ${
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            } group`}
            style={{
              animation:
                "staggerFadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
              opacity: 0,
              animationDelay: `${Math.min(index * 0.1, 0.5)}s`,
            }}
          >
            {/* Avatar with Organic Shape */}
            <div className="flex-shrink-0 relative">
              <div
                className={`w-11 h-11 flex items-center justify-center shadow-lg transition-all duration-300 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-olive-600 to-olive-800 organic-blob"
                    : "bg-gradient-to-br from-terra-500 to-terra-700 organic-blob-2"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-5 h-5 text-sand-50" strokeWidth={2.5} />
                ) : (
                  <Bot className="w-5 h-5 text-sand-50" strokeWidth={2.5} />
                )}
              </div>
              {/* Status indicator dot */}
              {message.role === "assistant" && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-terra-400 rounded-full border-2 border-sand-50 dark:border-gray-900" />
              )}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0 max-w-2xl">
              <div
                className={`inline-block max-w-full px-6 py-4 shadow-lg transition-all duration-300 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-olive-50 to-olive-100 dark:from-olive-900/40 dark:to-olive-800/40 text-olive-900 dark:text-sand-100 rounded-[28px] rounded-tr-md"
                    : "bg-gradient-to-br from-sand-100 to-sand-200 dark:from-gray-800 dark:to-gray-700 border-2 border-terra-500/20 dark:border-terra-600/30 text-olive-900 dark:text-sand-100 rounded-[28px] rounded-tl-md"
                } hover:shadow-xl group-hover:scale-[1.01]`}
              >
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">
                  {message.content}
                </p>
              </div>

              {/* Timestamp & Metadata */}
              <div
                className={`mt-2 text-xs font-semibold text-olive-500 dark:text-olive-400 flex items-center gap-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <span className="uppercase tracking-wider">
                  {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                </span>
                {message.emotion && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-olive-400" />
                    <span className="capitalize">{message.emotion}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
