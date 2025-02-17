"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Product, ProductReview } from "@/lib/products";

import { addToCart } from "@/lib/cart";
import authClient from "@/services/authClient";
import RightSection from "./RightSection";
import LeftSection from "./LeftSection";
import { trackProductView } from "@/lib/tracking";
import { usePathname, useRouter } from "next/navigation";

import ProductCardTiny from "../ProductCardTiny";
import ProductSuggestions from "./ProductSuggestions";

interface ProductDetailsProps {
  product: Product;
  initialReviews: ProductReview[];
  useProductSuggestions: (productId: number) => Product[];
}

export const ProductDetails = ({
  product,
  initialReviews,
  useProductSuggestions,
}: ProductDetailsProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentProductId = product.id;

  useEffect(() => {
    trackProductView(product.id);
  }, [product.id]);

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
      <div className="mt-8 p-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          <ProductSuggestions productId={product.id} />
        </div>
      </div>
    </>
  );
};
