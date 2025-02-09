import React from "react";
import BannerArea from "@/components/home/BannerArea";
import LatestProducts, {
  LatestProductsSkeleton,
} from "@/components/home/LatestProducts";
import BestSalesProducts, {
  BestSalesProductsSkeleton,
} from "@/components/home/BestSalesProducts";
import { Product } from "@/lib/products";
import apiClient from "@/services/apiClient";

const fetchLatestProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get("/products/?ordering=-updated_at");
  return response.data.results;
};

const fetchBestSalesProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get("/products/?ordering=best_sales");
  return response.data.results;
};

const HomePage = async () => {
  const latestProducts = await fetchLatestProducts();
  const bestSalesProducts = await fetchBestSalesProducts();

  return (
    <div>
      <BannerArea />
      <LatestProducts products={latestProducts} />
      <BestSalesProducts products={bestSalesProducts} />
    </div>
  );
};

export default HomePage;
