"use client";
import { useState, useEffect, useRef, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import authClient from "@/services/authClient";
import { ConversationResponse, Message } from "@/lib/chat";
import Messages from "@/components/chat/Messages";
import MessageForm from "@/components/chat/MessageForm";

export default function UserChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  // const [sender_conversation, setSender_conversation] = useState<string>("");
  // const [receiver_conversation, setReceiver_conversation] = useState<string>();
  const [inputMessage, setInputMessage] = useState("");
  const [conversationId, setConversationId] = useState<number | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initChat = async () => {
      try {
        const userRes = await authClient.get<{ id: number }>("/auth/users/me/");
        const userId = userRes.data.id;

        await authClient.post("/conversations/start/", {
          phone_number: "09353220545",
        });

        setConversationId(userId);
        loadMessages(userId);
        console.log("setconvo and loading...");
        ws.current = new WebSocket(`ws://localhost:8002/ws/chat/${userId}/`);

        ws.current.onmessage = (e) => {
          const newMessage: Message = JSON.parse(e.data);
          setMessages((prev) => [...prev, newMessage]);
        };

        ws.current.onerror = (error) => {
          console.error("WebSocket error:", error);
        };

        return () => ws.current?.close();
      } catch (error) {
        if (
          error instanceof Error &&
          "response" in error &&
          (error as any).response?.status === 401
        ) {
          router.push("/login");
        }
      }
    };

    initChat();
  }, [router]);

  const loadMessages = async (convoId: number) => {
    try {
      const res = await authClient.get<ConversationResponse>(
        `/conversations/${convoId}/`
      );
      console.log("here");
      // setSender_conversation(res.data.sender_conversation.id);
      // setReceiver_conversation(res.data.receiver_conversation);
      setMessages(res.data.message_set);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      const message = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("JWT")}`,
        },
        message: inputMessage,
      };
      console.log("here1");

      if (ws.current) {
        console.log("here2");
        ws.current.send(JSON.stringify(message));
        setInputMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex-col justify-center lg:px-64 md:px-40 sm:px-20 px-10 text-black">
      <aside className="my-6">
        <h1 className="text-3xl font-bold">Chat With Support</h1>
      </aside>

      <div className="row rounded-lg overflow-hidden shadow">
        <div className="col-7 px-0">
          <div className="px-4 py-5 chat-box bg-white">
            {messages.map((msg) => (
              <Messages conversationId={conversationId} msg={msg} />
            ))}
          </div>

          <MessageForm
            sendMessage={sendMessage}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
          />
        </div>
      </div>
    </div>
  );
}
