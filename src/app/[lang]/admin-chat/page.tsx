"use client";
import { useState, useEffect, useRef } from "react";
import authClient from "@/services/authClient";
import { useRouter } from "next/navigation";
import Messages from "@/components/chat/Messages";
import {
  ConversationListResponse,
  ConversationParticipant,
  Message,
} from "@/lib/chat";
import MessageForm from "@/components/chat/MessageForm";
import Conversations from "@/components/chat/Conversations";
import Loading from "@/components/base/Loading";
import { useTranslations } from "next-intl";

export default function AdminChat() {
  const t = useTranslations("AdminChat");

  const [conversations, setConversations] = useState<
    ConversationListResponse[]
  >([]);
  const [activeConvo, setActiveConvo] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [sender_conversation, setSender_conversation] =
    useState<ConversationParticipant | null>(null);
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
      } finally {
        setIsLoading(false);
      }
    };
    loadConversations();
  }, [router]);

  const selectConversation = async (convoId: string) => {
    try {
      setIsLoading(true);
      if (ws.current) ws.current.close();
      const res = await authClient.get(`/conversations/${convoId}/`);
      setMessages(res.data.message_set);
      setSender_conversation(res.data.sender_conversation);
      setActiveConvo(String(convoId));
      ws.current = new WebSocket(`ws://localhost:8002/ws/chat/${convoId}/`);
      ws.current.onmessage = (e) => {
        const newMessage = JSON.parse(e.data);
        setMessages((prev) => [...prev, newMessage]);
      };
    } catch (error) {
      console.error("Error selecting conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    try {
      setIsSending(true);
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
    return <Loading />;
  }

  return (
    <div className="flex-col flex w-full justify-center lg:px-52 md:px-32 sm:px-16 px-10 text-black">
      <aside className="my-6">
        <h1 className="text-3xl font-bold">{t("adminSupport")}</h1>
      </aside>
      <div className="flex rounded-lg justify-start">
        <div className="flex flex-col space-y-3 w-1/4">
          <div className="">
            <h5 className="font-medium">{t("recentConversations")}</h5>
          </div>
          <div className="flex flex-col text-start items space-y-3 pr-10">
            {conversations.map((convo) => (
              <Conversations
                key={convo.id}
                activeConvo={activeConvo}
                convo={convo}
                selectConversation={selectConversation}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 rounded-lg overflow-hidden shadow p-5 my-10 ml-10">
          <div className="">
            <div className="px-4 py-5 chat-box bg-white h-[500px] overflow-y-auto scroll-smooth">
              {sender_conversation &&
                messages.map((msg) => (
                  <Messages
                    key={msg.id}
                    msg={msg}
                    conversationId={Number(activeConvo)}
                    isAdmin={true}
                    sender_conversation={sender_conversation}
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
    </div>
  );
}
