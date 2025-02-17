import { ConversationListResponse } from "@/lib/chat";
import { useTranslations } from "next-intl";

interface ConversationsProps {
  convo: ConversationListResponse;
  selectConversation: (convoId: string) => Promise<void>;
  activeConvo: string;
}

const Conversations = ({
  convo,
  selectConversation,
  activeConvo,
}: ConversationsProps) => {
  const t = useTranslations("Conversations");
  return (
    <div
      key={convo.id}
      onClick={() => selectConversation(String(convo.id))}
      className={`btn flex flex-col  text-start p-0
      rounded-none 

items-start justify-center pl-2 py-8 pr-10
      
      ${activeConvo === String(convo.id) ? " bg-black text-white " : ""}`}
    >
      <div className="flex flex-col ">
        <h6 className="text-sm">{convo.sender_conversation.phone_number}</h6>
        <p className="text-xs font-light">
          {convo.last_message?.text || t("noMessage")}
        </p>
      </div>
    </div>
  );
};

export default Conversations;
