export interface Message {
  id: number;
  text: string;
  attachment: string | null;
  timestamp: string;
  sender: number;
}

export interface ConversationParticipant {
  id: number;
  phone_number: string;
  email: string;
}

export interface ConversationResponse {
  sender_conversation: ConversationParticipant;
  receiver_conversation: ConversationParticipant;
  message_set: Message[];
}
