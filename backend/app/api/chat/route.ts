import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Initialize Supabase client (optional - only if configured)
const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
    : null;

// System prompt for empathetic conversation
const SYSTEM_PROMPT = `You are Talk to Me, a warm, empathetic AI companion designed to provide emotional support and meaningful conversation to people experiencing loneliness.

Your core principles:
1. ACTIVE LISTENING: Reflect back what users share, showing you truly hear them
2. VALIDATION: Acknowledge their feelings without judgment
3. EMPATHY: Respond with genuine warmth and understanding
4. GENTLE QUESTIONING: Use open-ended questions to help them explore their thoughts
5. ENCOURAGEMENT: Celebrate small wins and progress
6. NON-DIRECTIVE: Guide, don't prescribe. You're a companion, not a therapist

Your conversation style:
- Keep responses concise (2-4 sentences typically)
- Use warm, conversational language
- Ask one thoughtful question at a time
- Mirror their emotional tone while offering hope
- Be human and authentic, acknowledge your limitations as AI
- If they're in crisis, gently suggest professional resources

Remember: Your goal is to help them feel heard, valued, and less alone. Be present, be kind, be real.`;

// Crisis keywords for detection
const CRISIS_KEYWORDS = [
  "suicide",
  "kill myself",
  "end my life",
  "want to die",
  "self-harm",
  "hurt myself",
  "no reason to live",
];

// Message interface
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

// Request body interface
interface ChatRequest {
  messages: Message[];
  userId?: string; // Optional user ID from frontend
  userName?: string; // Optional user name for personalization
  conversationId?: string; // Optional conversation ID for context
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY not configured");
      return NextResponse.json(
        { error: "API configuration error. Please contact support." },
        { status: 500 }
      );
    }

    // Parse and validate request body
    let body: ChatRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { messages, userId, userName, conversationId } = body;

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required and must not be empty" },
        { status: 400 }
      );
    }

    // Validate message structure
    const invalidMessage = messages.find(
      (msg) => !msg.role || !msg.content || typeof msg.content !== "string"
    );
    if (invalidMessage) {
      return NextResponse.json(
        { error: "Each message must have 'role' and 'content' properties" },
        { status: 400 }
      );
    }

    // Check for crisis keywords in last user message
    const lastMessage = messages[messages.length - 1];
    const lastMessageContent = lastMessage?.content?.toLowerCase() || "";
    const isCrisis = CRISIS_KEYWORDS.some((keyword) =>
      lastMessageContent.includes(keyword)
    );

    // Prepare messages for Groq
    const groqMessages: Message[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Add personalization if user name is provided
    if (userName) {
      groqMessages[0].content += `\n\nThe user's name is ${userName}. Use their name occasionally to create a more personal connection.`;
    }

    // Add crisis response guidance if needed
    if (isCrisis) {
      groqMessages.push({
        role: "system",
        content:
          "CRISIS DETECTED: Respond with immediate empathy, then gently but clearly provide crisis resources: National Suicide Prevention Lifeline (988), Crisis Text Line (text HOME to 741741). Emphasize you care but encourage professional help.",
      });
    }

    // Call Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: groqMessages as any,
      model: "llama-3.3-70b-versatile",
      temperature: 0.8,
      max_tokens: 300,
      top_p: 0.9,
      stream: false,
    });

    // Extract response
    const assistantMessage =
      chatCompletion.choices[0]?.message?.content ||
      "I'm here for you. Could you tell me more about what's on your mind?";

    // Optional: Store conversation in Supabase if configured and user is authenticated
    if (supabase && userId && conversationId) {
      try {
        // Store user message
        await supabase.from("messages").insert({
          conversation_id: conversationId,
          role: "user",
          content: lastMessage.content,
          emotion: null, // Could be added from frontend
          sentiment: null, // Could be added from frontend
        });

        // Store assistant message
        await supabase.from("messages").insert({
          conversation_id: conversationId,
          role: "assistant",
          content: assistantMessage,
        });

        // Update conversation last_message_at
        await supabase
          .from("conversations")
          .update({ last_message_at: new Date().toISOString() })
          .eq("id", conversationId);
      } catch (dbError) {
        // Log but don't fail the request if DB storage fails
        console.error("Failed to store conversation:", dbError);
      }
    }

    // Return response
    return NextResponse.json({
      message: assistantMessage,
      isCrisis,
      model: "llama-3.3-70b-versatile",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);

    // Handle Groq-specific errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: "Invalid API key configuration" },
        { status: 401 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again in a moment." },
        { status: 429 }
      );
    }

    if (error?.status === 400) {
      return NextResponse.json(
        { error: "Invalid request to AI service" },
        { status: 400 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        error: "Failed to generate response. Please try again.",
        ...(process.env.NODE_ENV === "development" && {
          details: error.message,
        }),
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
