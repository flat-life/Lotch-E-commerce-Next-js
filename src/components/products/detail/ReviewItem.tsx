"use client";
import { ProductReview } from "@/lib/products";
import { useTranslations } from "next-intl";

interface ReviewItemProps {
  review: ProductReview;
  onReply: (reviewId: number) => void;
  level?: number;
}

export const ReviewItem = ({ review, onReply, level = 0 }: ReviewItemProps) => {
  const t = useTranslations("ReviewItem");

  const marginLeft = level * 32;

  return (
    <div
      className={`bg-base-100 border p-4 mb-4 transition-all duration-200 hover:shadow-md ml-${marginLeft}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex items-baseline justify-between">
              <div>
                <h3 className="text-md font-semibold">
                  {`${review.customer.first_name} ${review.customer.last_name}`}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div className="rating rating-xs mb-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <input
                    key={value}
                    type="radio"
                    name={`rating-${review.id}`}
                    className="mask mask-star-2 bg-black"
                    defaultChecked={value === review.rating}
                    disabled
                    aria-label={`${value} stars`}
                  />
                ))}
              </div>
              <button
                className="btn rounded-none btn-md font-light text-xs text-black btn-outline hover:bg-black"
                onClick={() => onReply(review.id)}
              >
                {t("reply")}
              </button>
            </div>
          </div>
          {review.title && (
            <h4 className="text-sm font-semibold mt-2 text-gray-800">
              {review.title}
            </h4>
          )}
          <p className="text-gray-700 mt-1 font-light text-xs leading-relaxed">
            {review.description}
          </p>
        </div>
      </div>
      {review.replies?.map((reply) => (
        <ReviewItem
          key={reply.id}
          review={reply}
          onReply={onReply}
          level={Number(level) + 1}
        />
      ))}
    </div>
  );
};
