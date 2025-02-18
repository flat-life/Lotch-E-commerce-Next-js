"use client";
import { ConversationParticipant, Message } from "@/lib/chat";
import { useTranslations } from "next-intl";

interface MessagesProps {
  conversationId: number | null;
  msg: Message;
  isAdmin: boolean;
  sender_conversation: ConversationParticipant;
}

const Messages = ({
  conversationId,
  msg,
  isAdmin,
  sender_conversation,
}: MessagesProps) => {
  const t = useTranslations("Messages");

  return (
    <div key={msg.id}>
      {conversationId && msg.sender === conversationId ? (
        <div className="chat chat-end snap-end">
          <div className="chat-header">
            <div className="flex gap-3 items-center">
              {isAdmin ? (
                <p>{sender_conversation.phone_number}</p>
              ) : (
                <p>{t("you")}</p>
              )}
              <time className="text-xs opacity-50">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </time>
            </div>
          </div>
          <div className="chat-bubble bg-gray-300 text-black rounded-none">
            {msg.text}
          </div>
          <div className="chat-footer opacity-50">{t("delivered")}</div>
        </div>
      ) : (
        <div className="chat chat-start snap-end">
          <div className="chat-header">
            <div className="flex gap-3">
              {isAdmin ? <p>{t("you")}</p> : <p>{t("admin")}</p>}
              <time className="text-xs opacity-50">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </time>
            </div>
          </div>
          <div className="chat-bubble bg-black rounded-none">{msg.text}</div>
          <div className="chat-footer opacity-50"></div>
        </div>
      )}
    </div>
  );
};

export default Messages;
