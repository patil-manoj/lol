"use client";

import { Message } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { User, Bot } from "lucide-react";
import { useEffect, useRef } from "react";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Avatar Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-xl">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Hi, I am Elena.
            </h2>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              How can I help you today?
            </h3>
          </div>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap gap-3 justify-center pt-6">
            {[
              "Sing me a song",
              "Restaurants nearby",
              "Play a game",
              "Sports news",
              "Random fun",
              "Today's Weather",
            ].map((suggestion, i) => (
              <button
                key={i}
                className="px-5 py-2.5 bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-lg"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 ${
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  message.role === "user"
                    ? "bg-gray-700"
                    : "bg-gradient-to-br from-purple-500 to-blue-500"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-5 h-5 text-white" strokeWidth={2} />
                ) : (
                  <Bot className="w-5 h-5 text-white" strokeWidth={2} />
                )}
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div
                className={`inline-block max-w-full px-4 py-3 rounded-2xl ${
                  message.role === "user"
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                }`}
              >
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>

              {/* Timestamp & Metadata */}
              <div
                className={`mt-1 text-xs text-gray-500 dark:text-gray-400 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                {message.emotion && (
                  <span className="ml-2">• {message.emotion}</span>
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
