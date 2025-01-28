import React from 'react';
import BannerArea from '@/components/home/BannerArea'
import FeaturesArea from '@/components/home/FeaturesArea'
import LatestProducts from '@/components/home/LatestProducts'
import BestSalesProducts from '@/components/home/BestSalesProducts'
import apiClient from '@/services/apiClient'

interface Banner {
  product: {
    title: string;
    description: string;
    images: { image: string }[];
  }[];
}

interface Product {
  id: number;
  title: string;
  price: number;
  org_price: number;
  images: { image: string }[];
}

interface HomePageProps {
  banners: Banner[];
  latestProducts: Product[];
  bestSalesProducts: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ banners, latestProducts, bestSalesProducts }) => {
  return (
    <div>
      <BannerArea banners={banners} />
      <FeaturesArea />
      <LatestProducts products={latestProducts} />
      <BestSalesProducts products={bestSalesProducts} />
    </div>
  );
};

const getServerSideProps = async () => {
  try {
    const [bannersResponse, latestProductsResponse, bestSalesProductsResponse] = await Promise.all([
      apiClient.get('/home-banners/'),
      apiClient.get('/products/', { params: { ordering: '-updated_at' } }),
      apiClient.get('/products/', { params: { ordering: 'best_sales' } }),
    ]);

    return {
      props: {
        banners: bannersResponse.data,
        latestProducts: latestProductsResponse.data.results,
        bestSalesProducts: bestSalesProductsResponse.data.results,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        banners: [],
        latestProducts: [],
        bestSalesProducts: [],
      },
    };
  }
};

export default HomePage;
