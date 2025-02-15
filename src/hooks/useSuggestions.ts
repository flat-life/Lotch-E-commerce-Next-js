import { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";
import { Product } from "@/lib/products";
import { initDB } from "@/lib/tracking";

export const useProductSuggestions = (productId: number) => {
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const db = await initDB();
      const tx = db.transaction("productRelationships", "readonly");
      const store = tx.objectStore("productRelationships");

      const relationships = await store.getAll(IDBKeyRange.only(productId));
      const sorted = relationships
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 4);

      const productPromises = sorted.map((rel) =>
        apiClient.get(`/products/${rel.targetProductId}`)
      );

      const results = await Promise.all(productPromises);
      setSuggestions(results.map((r) => r.data));
    };

    fetchSuggestions();
  }, [productId]);

  return suggestions;
};
