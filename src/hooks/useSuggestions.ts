"use client";
import { useEffect, useState } from "react";
import { openDB } from "idb";
import apiClient from "@/services/apiClient";
import { Product } from "@/lib/products";

export const useProductSuggestions = (productId: number) => {
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const db = await openDB("ProductAnalytics", 1);
      const tx = db.transaction("productRelationships", "readonly");
      const store = tx.objectStore("productRelationships");

      const relationships = await store.index("bySource").getAll(productId);
      const sorted = relationships
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 4);

      const suggestions = await Promise.all(
        sorted.map(async ({ targetId }) => {
          try {
            const response = await apiClient.get(`/products/${targetId}`);
            return response.data;
          } catch (error) {
            console.error("Failed to fetch suggestion:", targetId, error);
            return null;
          }
        })
      );

      setSuggestions(suggestions.filter(Boolean) as Product[]);
    };

    fetchSuggestions();
  }, [productId]);

  return suggestions;
};
