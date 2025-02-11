import { Dispatch, SetStateAction } from "react";

interface CommentFormProps {
  setFormData: Dispatch<
    SetStateAction<{
      subject: string;
      message: string;
    }>
  >;
  formData: {
    subject: string;
    message: string;
  };
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const CommentForm = ({
  formData,
  handleSubmit,
  setFormData,
}: CommentFormProps) => {
  return (
    <div className="mt-20">
      <h4 className="font-noraml text-xl">Leave a Comment</h4>
      <form onSubmit={handleSubmit} className="px-16 pt-8">
        <div className="">
          <input
            type="text"
            className="input w-full ring-1 ring-black rounded-none"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
        </div>
        <div className="my-6">
          <textarea
            className="textarea ring-1 ring-black w-full rounded-none"
            rows={4}
            placeholder="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="btn bg-black text-white hover:bg-gray-700 rounded-none"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};
export default CommentForm;
