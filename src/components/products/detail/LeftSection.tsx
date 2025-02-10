"use client";

import FeaturesImage from "./FeaturesImage";
import { ProductSpecifications } from "./ProductSpecifications";
import { ReviewItem } from "./ReviewItem";
import { ReviewForm } from "./ReviewForm";
import { Product, ProductReview } from "@/lib/products";
import { Dispatch, SetStateAction } from "react";

interface LeftSectionProps {
  product: Product;
  reviews: ProductReview[];
  setParentReviewId: Dispatch<SetStateAction<number | null>>;
  parentReviewId: number | null;
  handleReviewSubmit: (reviewData: {
    rating: number;
    title: string;
    description: string;
    parent_review?: number;
  }) => Promise<void>;
}

const LeftSection = ({
  product,
  reviews,
  setParentReviewId,
  parentReviewId,
  handleReviewSubmit,
}: LeftSectionProps) => {
  return (
    <div className="flex-1 space-y-8">
      <div className="carousel w-full flex flex-wrap">
        {product.images.map((image, index) => (
          <div key={image.id} className=" w-1/2">
            <img
              src={image.image}
              alt={product.title}
              className="w-full object-cover h-96 "
            />
          </div>
        ))}
        <br />
        <FeaturesImage product={product} />
      </div>

      <ProductSpecifications features={product.value_feature} />

      <div className="space-y-6">
        <h2 className="text-md font-normal">{"Reviews"}</h2>
        <hr />
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onReply={setParentReviewId}
            />
          ))}
        </div>
        <ReviewForm
          parentReviewId={parentReviewId}
          setParentReviewId={setParentReviewId}
          onSubmit={handleReviewSubmit}
        />
      </div>
    </div>
  );
};
export default LeftSection;
