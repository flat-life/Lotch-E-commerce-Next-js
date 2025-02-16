import { ProductDetails } from "@/components/products/detail/ProductDetail";
import apiClient from "@/services/apiClient";
import { useProductSuggestions } from "@/hooks/useSuggestions";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productResponse = await apiClient.get(`/products/${id}/`);
  const product = productResponse.data;

  const reviewsResponse = await apiClient.get(`/products/${id}/reviews/`);
  const initialReviews = reviewsResponse.data;

  return (
    <>
      <ProductDetails
        product={product}
        initialReviews={initialReviews}
        useProductSuggestions={useProductSuggestions}
      />
    </>
  );
}
