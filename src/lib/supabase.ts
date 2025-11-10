import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database tables
export interface DbConversation {
  id: string;
  user_id: string | null;
  title: string | null;
  started_at: string;
  last_message_at: string;
  mood: string | null;
  created_at: string;
}

export interface DbMessage {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  emotion: string | null;
  sentiment: number | null;
  created_at: string;
}

// Database helper functions

export async function saveConversation(conversation: {
  userId?: string;
  title?: string;
  mood?: string;
}) {
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      user_id: conversation.userId || null,
      title: conversation.title || "New conversation",
      started_at: new Date().toISOString(),
      last_message_at: new Date().toISOString(),
      mood: conversation.mood || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveMessage(message: {
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  emotion?: string;
  sentiment?: number;
}) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: message.conversationId,
      role: message.role,
      content: message.content,
      emotion: message.emotion || null,
      sentiment: message.sentiment || null,
    })
    .select()
    .single();

  if (error) throw error;

  // Update conversation last_message_at
  await supabase
    .from("conversations")
    .update({ last_message_at: new Date().toISOString() })
    .eq("id", message.conversationId);

  return data;
}

export async function getConversations(userId?: string) {
  let query = supabase
    .from("conversations")
    .select("*")
    .order("last_message_at", { ascending: false });

  if (userId) {
    query = query.eq("user_id", userId);
  } else {
    query = query.is("user_id", null);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}
