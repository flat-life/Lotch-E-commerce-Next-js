"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface ReviewFormProps {
  parentReviewId?: number | null;
  setParentReviewId: Dispatch<SetStateAction<number | null>>;
  onSubmit: (review: {
    rating: number;
    title: string;
    description: string;
    parent_review?: number;
  }) => Promise<void>;
}

export const ReviewForm = ({
  parentReviewId,
  onSubmit,
  setParentReviewId,
}: ReviewFormProps) => {
  const [rating, setRating] = useState(3);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(parentReviewId);
    e.preventDefault();
    await onSubmit({
      rating,
      title,
      description,
      ...(parentReviewId && { parent_review: parentReviewId }),
    });
    setTitle("");
    setDescription("");
  };

  const handleRemovereplie = () => {
    setParentReviewId(null);
  };
  return (
    <div className="review-form mb-10 ">
      <h4 className="text-md font-normal my-4">{"Submit Review"}</h4>
      {parentReviewId && (
        <button className="my-3" onClick={handleRemovereplie}>
          <div className="btn text-white hover:bg-slate-700 bg-black">
            {"Replying"}
          </div>
        </button>
      )}
      <form onSubmit={handleSubmit} className="form-control flex-col space-y-4">
        <div className="">
          <div className="rating">
            {[1, 2, 3, 4, 5].map((num) => (
              <input
                key={num}
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-black"
                checked={rating === num}
                onChange={() => setRating(num)}
              />
            ))}
          </div>
        </div>
        <div className="">
          <input
            className="border-black input w-full"
            type="text"
            placeholder={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="border-black input w-full pt-2"
            placeholder={"Message"}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn bg-black text-white hover:bg-gray-700 rounded-none"
        >
          {"Post"}
        </button>
      </form>
    </div>
  );
};
