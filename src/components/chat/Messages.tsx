import { Message } from "@/lib/chat";

interface MessagesProps {
  conversationId: number | null;
  msg: Message;
}

const Messages = ({ conversationId, msg }: MessagesProps) => {
  return (
    <div>
      {conversationId && msg.sender === conversationId ? (
        <div className="chat chat-end ">
          <div className="chat-header">
            <div className="flex gap-3 items-center">
              <p>You</p>
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
        <div className="chat chat-start">
          <div className="chat-header">
            <div className="flex gap-3">
              <p>Admin</p>
              <time className="text-xs opacity-50">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </time>
            </div>
          </div>
          <div className="chat-bubble bg-black rounded-none">{msg.text}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      )}
    </div>
  );
};

export default Messages;
