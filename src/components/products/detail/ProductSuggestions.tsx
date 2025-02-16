"use client";

import { useEffect, useState } from "react";
import { getProductSuggestions } from "@/lib/tracking";
import ProductCardTiny from "../ProductCardTiny";
import { Product } from "@/lib/products";

const ProductSuggestions = ({ productId }: { productId: number }) => {
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    getProductSuggestions(productId).then(setSuggestions);
  }, [productId]);

  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {suggestions.map((product) => (
        <ProductCardTiny key={product.id} product={product} onCompare={null} />
      ))}
    </div>
  );
};

export default ProductSuggestions;
