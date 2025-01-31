import React from 'react';
import BannerArea, { Banner } from '@/components/home/BannerArea';
import FeaturesArea from '@/components/home/FeaturesArea';
import LatestProducts from '@/components/home/LatestProducts';
import BestSalesProducts from '@/components/home/BestSalesProducts';

interface Product {
	id: number;
	title: string;
	price: number;
	org_price: number;
	images: { image: string }[];
}

const API_BASE = 'http://localhost:8002/api-v1';

const HomePage = async () => {
	try {
		const [bannersRes, latestRes, bestSalesRes] = await Promise.all([
			fetch(`${API_BASE}/home-banners/`),
			fetch(`${API_BASE}/products/?ordering=-updated_at`),
			fetch(`${API_BASE}/products/?ordering=best_sales`),
		]);

		const banners: Banner[] = await bannersRes.json();
		const latestProducts = await latestRes.json();
		const bestSalesProducts = await bestSalesRes.json();

		return (
			<div>
				<BannerArea banners={banners} />
				<FeaturesArea />
				<LatestProducts products={latestProducts.results} />
				<BestSalesProducts products={bestSalesProducts.results} />
			</div>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<div>
				<p>Failed to load data. Please try again later.</p>
			</div>
		);
	}
};

export default HomePage;
