import { Comment } from "@/lib/blog";

const Comments = ({ comment }: { comment: Comment }) => {
  return (
    <div
      key={comment.id}
      className={` bg-base-100 border p-4 mb-4
         transition-all duration-200 hover:shadow-md 
         `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex items-baseline justify-between">
              <div>
                <h3 className="text-md font-semibold">
                  {`${comment.customer.first_name} ${comment.customer.last_name}`}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {comment.subject && (
            <h4 className="text-sm font-semibold mt-2 text-gray-800">
              {comment.subject}
            </h4>
          )}
          <p className="text-gray-700 mt-1 font-light text-xs leading-relaxed">
            {comment.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
