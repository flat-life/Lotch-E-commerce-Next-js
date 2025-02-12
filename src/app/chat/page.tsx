"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import authClient from "@/services/authClient";
import { ConversationResponse, Message } from "@/lib/chat";
import Messages from "@/components/chat/Messages";
import MessageForm from "@/components/chat/MessageForm";

export default function UserChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initChat = async () => {
      try {
        setIsLoading(true);
        const userRes = await authClient.get<{ id: number }>("/auth/users/me/");
        const userId = userRes.data.id;

        await authClient.post("/conversations/start/", {
          phone_number: "09353220545",
        });

        setConversationId(userId);
        await loadMessages(userId);

        ws.current = new WebSocket(`ws://localhost:8002/ws/chat/${userId}/`);

        ws.current.onmessage = (e) => {
          const newMessage: Message = JSON.parse(e.data);
          setMessages((prev) => [...prev, newMessage]);
        };

        ws.current.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
      } catch (error) {
        if (
          error instanceof Error &&
          "response" in error &&
          (error as any).response?.status === 401
        ) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [router]);

  const loadMessages = async (convoId: number) => {
    try {
      const res = await authClient.get<ConversationResponse>(
        `/conversations/${convoId}/`
      );
      setMessages(res.data.message_set);
    } catch (error) {
      console.error("Error loading messages:", error);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex-col justify-center lg:px-64 md:px-40 sm:px-20 px-10 text-black h-screen">
      <aside className="my-6">
        <h1 className="text-3xl font-bold">Chat With Support</h1>
      </aside>

      <div className="rounded-lg overflow-hidden shadow my-10">
        <div className="">
          <div className="px-4 py-5 chat-box bg-white h-[600px] overflow-y-auto scroll-smooth">
            {messages.map((msg) => (
              <Messages
                key={msg.id}
                conversationId={conversationId}
                msg={msg}
              />
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
  );
}
