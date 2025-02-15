"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Product, ProductReview } from "@/lib/products";

import { addToCart } from "@/lib/cart";
import authClient from "@/services/authClient";
import RightSection from "./RightSection";
import LeftSection from "./LeftSection";
import { initDB, trackProductExit, trackProductView } from "@/lib/tracking";
import { usePathname, useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: Product;
  initialReviews: ProductReview[];
}

export const ProductDetails = ({
  product,
  initialReviews,
}: ProductDetailsProps) => {
  const pathname = usePathname();
  const currentProductId = product.id;

  useEffect(() => {
    let navigationType: "self" | "external" = "external";
    let nextProductId: number | null = null;

    // Track initial view
    trackProductView(currentProductId);

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    // Patch history methods
    window.history.pushState = function (...args) {
      navigationType = "self";
      originalPushState.apply(window.history, args);
    };

    window.history.replaceState = function (...args) {
      navigationType = "self";
      originalReplaceState.apply(window.history, args);
    };

    const handlePopState = () => {
      navigationType = "external";
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      // Restore original methods
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", handlePopState);

      // Track exit
      trackProductExit();

      // Get next product ID
      const nextPath = window.location.pathname;
      if (nextPath.startsWith("/products/")) {
        nextProductId = Number(nextPath.split("/")[2]);
      }

      if (nextProductId && navigationType === "self") {
        updateProductRelationships(currentProductId, nextProductId);
      }
    };
  }, [currentProductId]);

  const updateProductRelationships = async (
    sourceId: number,
    targetId: number
  ) => {
    const db = await initDB();
    const tx = db.transaction("productRelationships", "readwrite");
    const store = tx.objectStore("productRelationships");

    const relationship = await store.get([sourceId, targetId]);

    await store.put({
      sourceProductId: sourceId,
      targetProductId: targetId,
      weight: relationship ? relationship.weight + 1 : 1,
    });
  };

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
