import axios from "axios";
import { Message, ChatResponse } from "../types";

// Update this with your backend URL
// For local development: http://localhost:3000/api/chat
// For production: your deployed Next.js URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export class ChatService {
  private static instance: ChatService;

  private constructor() {}

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  async sendMessage(messages: Message[]): Promise<ChatResponse> {
    try {
      const formattedMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await axios.post<ChatResponse>(
        `${API_BASE_URL}/api/chat`,
        { messages: formattedMessages },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000, // 30 second timeout
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("Chat API error:", error);

      if (error.response) {
        // Server responded with error
        throw new Error(
          error.response.data.error || "Failed to get response from server"
        );
      } else if (error.request) {
        // Request made but no response
        throw new Error(
          "No response from server. Please check your connection."
        );
      } else {
        // Error setting up request
        throw new Error("Failed to send message. Please try again.");
      }
    }
  }
}

export const chatService = ChatService.getInstance();
