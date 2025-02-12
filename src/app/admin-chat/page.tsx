"use client";
import { useState, useEffect, useRef } from "react";
import authClient from "@/services/authClient";
import { useRouter } from "next/navigation";
import Messages from "@/components/chat/Messages";
import { ConversationListResponse, Message } from "@/lib/chat";
import MessageForm from "@/components/chat/MessageForm";

export default function AdminChat() {
  const [conversations, setConversations] = useState<
    ConversationListResponse[]
  >([]);
  const [activeConvo, setActiveConvo] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const res = await authClient.get("/conversations/");
        setConversations(res.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          router.push("/login");
        }
      }
    };

    loadConversations();
  }, [router]);

  const selectConversation = async (convoId: string) => {
    try {
      if (ws.current) ws.current.close();

      const res = await authClient.get(`/conversations/${convoId}/`);
      setMessages(res.data.message_set);
      setActiveConvo(String(convoId));

      ws.current = new WebSocket(`ws://localhost:8002/ws/chat/${convoId}/`);

      ws.current.onmessage = (e) => {
        const newMessage = JSON.parse(e.data);
        setMessages((prev) => [...prev, newMessage]);
      };
    } catch (error) {
      console.error("Error selecting conversation:", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;
    console.log("sendMessage");
    try {
      await setIsSending(true);
      console.log("setisseding ture");
      const message = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("JWT")}`,
        },
        message: inputMessage,
      };

      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(message));
        setInputMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex-col justify-center lg:px-64 md:px-40 sm:px-20 px-10 text-black h-screen">
      <aside className="my-6">
        <h1 className="text-3xl font-bold">Chat With Support</h1>
      </aside>

      <div className="row rounded-lg overflow-hidden shadow">
        <div className="col-5 px-0">
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              <h5 className="mb-0 py-1">Recent</h5>
            </div>
            <div className="messages-box">
              {conversations.map((convo) => (
                <button
                  key={convo.id}
                  onClick={() => selectConversation(String(convo.id))}
                  className={`list-group-item list-group-item-action ${
                    activeConvo === String(convo.id) ? "active" : ""
                  }`}
                >
                  <div className="media">
                    <div className="media-body ml-4">
                      <h6>{convo.sender_conversation.phone_number}</h6>
                      <p className="text-muted mb-0">
                        {convo.last_message?.text || "No messages yet"}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow my-10">
          <div className="">
            <div className="px-4 py-5 chat-box bg-white h-[600px] overflow-y-auto scroll-smooth">
              {messages.map((msg) => (
                <Messages msg={msg} conversationId={Number(activeConvo)} />
              ))}
            </div>

            <MessageForm
              sendMessage={sendMessage}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              isSending={isSending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
