"use client";

import { SetStateAction, useState } from "react";
import { Product, ProductReview } from "@/lib/products";

import { addToCart } from "@/lib/cart";
import authClient from "@/services/authClient";
import RightSection from "./RightSection";
import LeftSection from "./LeftSection";

interface ProductDetailsProps {
  product: Product;
  initialReviews: ProductReview[];
}

export const ProductDetails = ({
  product,
  initialReviews,
}: ProductDetailsProps) => {
  console.log({ initialReviews });
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
  console.log({ initialReviews });
  console.log({ reviews });
  return (
    <>
      <div className="flex flex-row gap-20 p-6 text-balck">
        <LeftSection
          product={product}
          reviews={reviews}
          setParentReviewId={setParentReviewId}
          parentReviewId={parentReviewId}
          handleReviewSubmit={handleReviewSubmit}
        />
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
