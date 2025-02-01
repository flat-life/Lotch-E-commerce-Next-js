import Banner from '@/components/base/Banner';
import { ProductDetails } from '@/components/products/detail/ProductDetail';
import apiClient from '@/services/apiClient';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Fetch product data
  const productResponse = await apiClient.get(`/products/${params.id}/`);
  const product = productResponse.data;

  // Fetch reviews data
  const reviewsResponse = await apiClient.get(`/products/${params.id}/reviews/`);
  const initialReviews = reviewsResponse.data;

  return (
    <>
      <Banner />
      <ProductDetails
        product={product}
        initialReviews={initialReviews}
        lang="en"
      />
    </>
  );
}
