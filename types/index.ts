export interface Chatbot {
  id: number;
  clerk_user_id: string;
  name: string;
  created_at: string;
  chatbot_characteristics: ChatbotCharacteristics[];
  chat_sessions: ChatSessions[];
}

export interface ChatbotCharacteristics {
  id: number;
  chatbot_id: number;
  content: string;
  created_at: string;
}

export interface Guest {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface ChatSessions {
  id: number;
  chatbot_id: number;
  guest_id: number;
  created_at: string;
  messages: Message[];
  guests: Guest;
}

export interface Message {
  id: number;
  chat_session_id: number;
  content: string;
  created_at: string;
  sender: "ai" | "user";
}

export interface GetChatbotByIdResponse {
  chatbots: Chatbot;
}

export interface GetChatbotByIdVariables {
  id: string;
}

export interface chatbotsByUser {
  clerk_user_id: string;
}

export interface GetChatbotsByUserData {
  chatbotsByUser: Chatbot[];
}

export interface GetChatbotsByUserDataVariables {
  clerk_user_id: string;
}

export interface GetUserChatbotsResponse {
  chatbotsByUser: Chatbot[];
}

export interface GetUserChatbotsVariables {
  userId: string;
}

export interface GetChatSessionMessagesVariables {
  id: number;
}

export interface GetChatSessionMessagesResponse {
  chat_sessions: {
    id: number;
    created_at: string;
    messages: Message[];
    chatbots: { name: string };
    guests: { name: string; email: string };
  };
}

export interface MessagesByChatSessionIdResponse {
  chat_sessions: ChatSessions;
}

export interface MessagesByChatSessionIdVariables {
  chat_session_id: number;
}
