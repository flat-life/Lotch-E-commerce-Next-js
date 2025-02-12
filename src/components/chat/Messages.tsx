import { ConversationParticipant, Message } from "@/lib/chat";

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
  return (
    <div key={msg.id}>
      {conversationId && msg.sender === conversationId ? (
        <div className="chat chat-end snap-end">
          <div className="chat-header">
            <div className="flex gap-3 items-center">
              {isAdmin ? <p>{sender_conversation.phone_number}</p> : <p>You</p>}

              <time className="text-xs opacity-50">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </time>
            </div>
          </div>
          <div className="chat-bubble bg-gray-300 text-black rounded-none">
            {msg.text}
          </div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      ) : (
        <div className="chat chat-start snap-end">
          <div className="chat-header">
            <div className="flex gap-3">
              {isAdmin ? <p>You</p> : <p>Admin</p>}
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
