import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// System prompt for empathetic, therapeutic conversation
const SYSTEM_PROMPT = `You are Kinship, a warm, empathetic AI companion designed to provide emotional support and meaningful conversation to people experiencing loneliness.

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

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Check for crisis keywords
    const lastMessage =
      messages[messages.length - 1]?.content?.toLowerCase() || "";
    const crisisKeywords = [
      "suicide",
      "kill myself",
      "end my life",
      "want to die",
      "self-harm",
      "hurt myself",
      "no reason to live",
    ];

    const isCrisis = crisisKeywords.some((keyword) =>
      lastMessage.includes(keyword)
    );

    // Prepare messages for Groq
    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // If crisis detected, add crisis response guidance
    if (isCrisis) {
      groqMessages.push({
        role: "system",
        content:
          "CRISIS DETECTED: Respond with immediate empathy, then gently but clearly provide crisis resources: National Suicide Prevention Lifeline (988), Crisis Text Line (text HOME to 741741). Emphasize you care but encourage professional help.",
      });
    }

    // Call Groq API with Llama 3.3 70B
    const chatCompletion = await groq.chat.completions.create({
      messages: groqMessages as any,
      model: "llama-3.3-70b-versatile", // Free tier model
      temperature: 0.8, // Balanced creativity and coherence
      max_tokens: 300, // Keep responses concise
      top_p: 0.9,
      stream: false,
    });

    const assistantMessage =
      chatCompletion.choices[0]?.message?.content ||
      "I'm here for you. Could you tell me more about what's on your mind?";

    return NextResponse.json({
      message: assistantMessage,
      isCrisis,
      model: "llama-3.3-70b-versatile",
    });
  } catch (error: any) {
    console.error("Groq API error:", error);

    // Handle specific Groq errors
    if (error.status === 401) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your Groq API configuration." },
        { status: 401 }
      );
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again in a moment." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to generate response. Please try again.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
