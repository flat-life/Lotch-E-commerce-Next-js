import { SetStateAction } from "react";

interface MessageFormProps {
  sendMessage: (e: React.FormEvent) => Promise<void>;
  inputMessage: string;
  setInputMessage: (value: SetStateAction<string>) => void;
}

const MessageForm = ({
  sendMessage,
  inputMessage,
  setInputMessage,
}: MessageFormProps) => {
  return (
    <form onSubmit={sendMessage} className="p-10">
      <div className="flex flex-col space-y-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="input ring-1 ring-black rounded-none"
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="btn bg-black text-white rounded-none hover:bg-gray-600 ring-1 ring-black"
        >
          Send
        </button>
      </div>
    </form>
  );
};
export default MessageForm;
