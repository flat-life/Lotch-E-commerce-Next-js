"use client";

import { SetStateAction, useState } from "react";
import { Product, ProductReview } from "@/lib/products";
import { ReviewItem } from "./ReviewItem";
import { ReviewForm } from "./ReviewForm";
import { addToCart } from "@/lib/cart";
import authClient from "@/services/authClient";
import { ProductSpecifications } from "./ProductSpecifications";
import RightSection from "./RightSection";
import FeaturesImage from "./FeaturesImage";

interface ProductDetailsProps {
  product: Product;
  initialReviews: ProductReview[];
}

export const ProductDetails = ({
  product,
  initialReviews,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [parentReviewId, setParentReviewId] = useState<number | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const handleReviewSubmit = async (reviewData: {
    rating: number;
    title: string;
    description: string;
    parent_review?: number;
  }) => {
    try {
      const response = await authClient.post(
        `/products/${product.id}/reviews/`,
        reviewData
      );
      if (response.status === 201) {
        setReviews((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error("Review submission failed:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-20 p-6 text-balck">
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
            <h2 className="text-2xl font-bold">{"product.reviews"}</h2>
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
        <RightSection
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </>
  );
};
