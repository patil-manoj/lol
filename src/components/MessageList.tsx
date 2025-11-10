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
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <Bot className="w-16 h-16 text-warm-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome to Talk to Me
          </h2>
          <p className="text-gray-600">
            I'm here to listen and support you. Click the microphone below to
            start talking, or type a message. This is a safe, judgment-free
            space.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 ${
            message.role === "user" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Avatar */}
          <div
            className={`
              flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
              ${
                message.role === "user"
                  ? "bg-primary-100 text-primary-700"
                  : "bg-warm-100 text-warm-700"
              }
            `}
          >
            {message.role === "user" ? (
              <User className="w-5 h-5" />
            ) : (
              <Bot className="w-5 h-5" />
            )}
          </div>

          {/* Message bubble */}
          <div
            className={`
              max-w-[70%] rounded-2xl px-4 py-3 shadow-sm
              ${
                message.role === "user"
                  ? "bg-primary-500 text-white rounded-tr-sm"
                  : "bg-white text-gray-800 border border-gray-200 rounded-tl-sm"
              }
            `}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>

            <div
              className={`
              flex items-center gap-2 mt-2 text-xs
              ${message.role === "user" ? "text-primary-100" : "text-gray-500"}
            `}
            >
              <span>
                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
              </span>
              {message.emotion && (
                <span className="opacity-75">· {message.emotion}</span>
              )}
            </div>
          </div>
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}
