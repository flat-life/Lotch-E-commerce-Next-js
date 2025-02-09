import apiClient from "@/services/apiClient";
export interface ProductResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

interface ProductTranslation {
  title: string;
  slug: string;
  description: string;
}

interface FeatureKeyTranslation {
  key: string;
}

interface FeatureValueTranslation {
  value: string;
}

interface FeatureKey {
  id: number;
  translations: Record<string, FeatureKeyTranslation>;
  key: string;
}

interface FeatureValue {
  id: number;
  key: number;
  translations: Record<string, FeatureValueTranslation>;
  value: string;
}

export interface ValueFeature {
  id: number;
  key: FeatureKey;
  value: FeatureValue;
}

interface ProductImage {
  id: number;
  image: string;
}

export interface Product {
  id: number;
  translations: Record<string, ProductTranslation>;
  inventory: number;
  org_price: number;
  price: number;
  price_with_tax: number;
  collection_id: number | null;
  promotions: unknown | null;
  value_feature: ValueFeature[];
  images: ProductImage[];
  secondhand: boolean;
  title: string;
  description: string;
  slug: string;
  badge: string;
}

interface CollectionTranslation {
  title: string;
}

export interface Collection {
  id: number;
  translations: Record<string, CollectionTranslation>;
  parent: number | null;
  products_count: number;
  children: Collection[] | null;
  title: string;
}

export interface Feature {
  id: number;
  translations: Record<
    string,
    {
      key: string;
    }
  >;
  values: FeatureValueResponse[];
}

interface FeatureValueResponse {
  id: number;
  translations: Record<
    string,
    {
      value: string;
    }
  >;
  product_count: number;
}

export interface ProductReview {
  id: number;
  created_at: string;
  title: string;
  description: string;
  rating: number;
  parent_review: number | null;
  customer: {
    id: number;
    first_name: string;
    last_name: string;
  };
  replies: ProductReview[];
}

export interface ApiResponse {
  count: number;
  results: Product[];
}

export function buildApiUrl(
  //:-) NICE
  page: number,
  filters: {
    collectionsId?: string | null;
    unitPriceGt?: number | null;
    unitPriceLt?: number | null;
    search?: string | null;
    featureKey?: string | null;
    featureValue?: string | null;
    secondHand?: boolean | null;
    ordering?: string | null;
  }
) {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: "9",
    ...(filters.collectionsId && { collection_id: filters.collectionsId }),
    ...(filters.unitPriceGt && {
      unit_price__gt: filters.unitPriceGt.toString(),
    }),
    ...(filters.unitPriceLt && {
      unit_price__lt: filters.unitPriceLt.toString(),
    }),
    ...(filters.search && { search: filters.search }),
    ...(filters.featureKey && { feature_key: filters.featureKey }),
    ...(filters.featureValue && { feature_value: filters.featureValue }),
    ...(filters.secondHand && { secondhand: filters.secondHand.toString() }),
    ...(filters.ordering && { ordering: filters.ordering }),
  });
  console.log({ buildApiUrl: `/products?${params.toString()}` });

  return `/products?${params.toString()}`;
}

export async function fetchInitialData() {
  try {
    const [productsResponse, collectionsResponse, featuresResponse] =
      await Promise.all([
        apiClient.get<ProductResponse>("/products", {
          params: { page: 1 },
        }),
        apiClient.get<Collection[]>("/collections"),
        apiClient.get<Feature[]>("/features"),
      ]);

    return {
      initialProducts: productsResponse.data,
      collections: collectionsResponse.data,
      features: featuresResponse.data,
    };
  } catch (error) {
    console.error("Error fetching initial data:", error);
    return {
      initialProducts: { count: 0, results: [] },
      collections: [],
      features: [],
    };
  }
}
export async function getProduct(id: string): Promise<Product> {
  const response = await apiClient.get(`/products/${id}`);
  return response.data();
}
