import axios, { AxiosError } from "axios";
import { Message, ChatResponse } from "../types";

// API Configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";
const API_TIMEOUT = 30000; // 30 seconds
const MAX_MESSAGE_LENGTH = 500;

interface ChatRequest {
  messages: Array<{ role: string; content: string }>;
}

export class ChatService {
  private static instance: ChatService;

  private constructor() {}

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  /**
   * Send messages to the chat API
   * @param messages Array of conversation messages
   * @returns ChatResponse with AI message and crisis detection
   */
  async sendMessage(messages: Message[]): Promise<ChatResponse> {
    // Validate input
    if (!messages || messages.length === 0) {
      throw new Error("Messages array cannot be empty");
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.content.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`);
    }

    try {
      const formattedMessages: ChatRequest = {
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      };

      const response = await axios.post<ChatResponse>(
        `${API_BASE_URL}/api/chat`,
        formattedMessages,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: API_TIMEOUT,
          validateStatus: (status) => status < 500, // Don't throw on 4xx
        }
      );

      // Handle non-2xx responses
      if (response.status >= 400) {
        throw new Error(
          response.data?.error || `Server error: ${response.status}`
        );
      }

      // Validate response
      if (!response.data?.message) {
        throw new Error("Invalid response from server");
      }

      return response.data;
    } catch (error: any) {
      console.error("Chat API error:", error);

      // Timeout error
      if (error.code === 'ECONNABORTED') {
        throw new Error("Request timed out. Please try again.");
      }

      // Network error
      if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK') {
        throw new Error(
          "Cannot connect to server. Please check your internet connection and ensure the backend is running."
        );
      }

      // Server error with response
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data?.error || "Failed to get response from server";
        throw new Error(message);
      }

      // Generic error
      throw new Error(error.message || "Failed to send message. Please try again.");
    }
  }
}

export const chatService = ChatService.getInstance();
