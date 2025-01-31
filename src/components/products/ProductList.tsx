'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';
import { buildApiUrl, Product, ApiResponse } from '@/lib/products';
import { useTranslation } from 'react-i18next';
import Pagination from '../base/Pagination';
import SidebarFilters from './SidebarFilters';
import AppliedFilters from './AppliedFilters';
import apiClient from '@/services/apiClient';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function ProductList({ initialProducts, collections, features }: {
	initialProducts: ApiResponse,
	collections: any,
	features: any
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const { t } = useTranslation();

	// Initialize state with search params
	const [products, setProducts] = useState(initialProducts.results);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(initialProducts.count);
	const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
	const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>(() => {
		const params = new URLSearchParams(searchParams.toString());
		const filters: Record<string, any> = {};
		if (params.get('search')) filters.search = params.get('search');
		return filters;
	});
	const [isLoading, setIsLoading] = useState(false);

	// Sync filters with URL changes
	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());
		const newFilters: Record<string, any> = {};

		params.forEach((value, key) => {
			newFilters[key] = value;
		});

		setAppliedFilters(prev => {
			if (JSON.stringify(prev) === JSON.stringify(newFilters)) return prev;
			return newFilters;
		});
	}, [searchParams]);

	const updateFilters = (newFilters: Record<string, any>) => {
		const params = new URLSearchParams(searchParams.toString());

		// Update URL with new filters
		Object.entries(newFilters).forEach(([key, value]) => {
			if (value) {
				params.set(key, value);
			} else {
				params.delete(key);
			}
		});

		router.replace(`${pathname}?${params.toString()}`);
		setCurrentPage(1);
	};

	const removeFilter = (filterKey: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete(filterKey);

		// Special case for feature filters
		if (filterKey === 'featureKey') {
			params.delete('featureValue');
		}

		router.replace(`${pathname}?${params.toString()}`);
	};

	useEffect(() => {
		const abortController = new AbortController();

		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const url = buildApiUrl(currentPage, appliedFilters);
				const response = await apiClient.get(url, {
					signal: abortController.signal
				});

				setProducts(response.data.results);
				setTotalCount(response.data.count);
			} catch (error) {
				if (!abortController.signal.aborted) {
					console.error('Error fetching products:', error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();

		return () => abortController.abort();
	}, [currentPage, appliedFilters]);

	const handleCompare = () => {
		const compareUrl = `/compare/?product_ids=${selectedProducts.join('&product_ids=')}`;
		window.location.href = compareUrl;
	};

	return (
		<div className="col-xl-9 col-lg-8 col-md-7">
			<SidebarFilters
				collections={collections}
				features={features}
				onFilterChange={updateFilters}
				appliedFilters={appliedFilters}
			/>

			<FilterBar
				onFilterChange={updateFilters}
				selectedProducts={selectedProducts}
				onCompare={handleCompare}
				appliedFilters={appliedFilters}
			/>

			<AppliedFilters
				filters={appliedFilters}
				onRemove={removeFilter}
			/>

			<section className="lattest-product-area pb-40 category-list">
				{isLoading ? (
					<div className="text-center">{t('Loading...')}</div>
				) : (
					<div className="row" id="productContainer">
						{products.map((product: Product) => (
							<ProductCard
								key={product.id}
								product={product}
								onCompare={(productId) =>
									setSelectedProducts(prev =>
										prev.includes(productId)
											? prev.filter(id => id !== productId)
											: [...prev, productId]
									)
								}
							/>
						))}
					</div>
				)}
			</section>

			<Pagination
				currentPage={currentPage}
				totalItems={totalCount}
				itemsPerPage={9}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}
