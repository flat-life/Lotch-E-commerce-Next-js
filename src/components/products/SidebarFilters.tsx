'use client';
import { useEffect, useState } from 'react';
import { Collection, Feature } from '@/lib/products';
import { useTranslation } from 'react-i18next';

interface SidebarFiltersProps {
	collections: Collection[];
	features: Feature[];
	onFilterChange: (filters: Record<string, any>) => void;
	appliedFilters: Record<string, any>;
}

export default function SidebarFilters({
	collections,
	features,
	onFilterChange,
	appliedFilters
}: SidebarFiltersProps) {
	const { t } = useTranslation();
	const [priceRange, setPriceRange] = useState<[number, number]>([
		appliedFilters.unitPriceGt || 0,
		appliedFilters.unitPriceLt || 1000
	]);

	useEffect(() => {
		setPriceRange([
			appliedFilters.unitPriceGt || 0,
			appliedFilters.unitPriceLt || 1000
		]);
	}, [appliedFilters.unitPriceGt, appliedFilters.unitPriceLt]);

	// Handle price range changes
	const handlePriceChange = (newRange: [number, number]) => {
		setPriceRange(newRange);
		onFilterChange({
			unitPriceGt: newRange[0],
			unitPriceLt: newRange[1]
		});
	};

	const handleCollectionClick = (collectionId: number) => {
		const newCollection = appliedFilters.collectionsId === collectionId ? null : collectionId;
		onFilterChange({ collectionsId: newCollection });
	};

	const handleFeatureClick = (featureId: number, valueId?: number) => {
		const newFilters: Record<string, any> = {};

		if (valueId) {
			newFilters.featureKey = featureId;
			newFilters.featureValue = valueId;
		} else {
			newFilters.featureKey = appliedFilters.featureKey === featureId ? null : featureId;
			newFilters.featureValue = null;
		}

		onFilterChange(newFilters);
	};

	return (
		<div className="sidebar-filter mt-50">
			<div className="head">{t("Browse Collections")}</div>
			<ul className="main-categories">
				{collections.map(collection => (
					<CollectionItem
						key={collection.id}
						collection={collection}
						isSelected={collection.id === appliedFilters.collectionsId}
						onClick={handleCollectionClick}
					/>
				))}
			</ul>

			<div className="sidebar-filter mt-50">
				<div className="head">{t("Filters")}</div>
				<div className="common-filter">
					<h5 className="head">{t('Price')}</h5>
					<div className="price-range-area">
						<input
							type="range"
							min="0"
							max="1000"
							value={priceRange[0]}
							onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
						/>
						<input
							type="range"
							min="0"
							max="1000"
							value={priceRange[1]}
							onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
						/>
						<div className="value-wrapper d-flex">
							<h5 className="price">{t('Price:')}</h5>
							<h6>$</h6>
							<h6 id="lower-value">{priceRange[0]}</h6>
							<h6 className="to">{t('to')}</h6>
							<h6>$</h6>
							<h6 id="upper-value">{priceRange[1]}</h6>
						</div>
					</div>
				</div>

				{features.map(feature => (
					<FeatureFilter
						key={feature.id}
						feature={feature}
						isSelected={feature.id === appliedFilters.featureKey}
						selectedValue={appliedFilters.featureValue}
						onClick={handleFeatureClick}
					/>
				))}
			</div>
		</div>
	);
}

// Updated CollectionItem component
function CollectionItem({ collection, isSelected, onClick }) {
	return (
		<li className="main-nav-list">
			<button
				className={`collection-item ${isSelected ? 'selected' : ''}`}
				onClick={() => onClick(collection.id)}
			>
				<span className="lnr lnr-arrow-right"></span>
				{collection.translations.en?.title || collection.title}
				<span className="number">({collection.products_count})</span>
			</button>
			{collection.children?.map(child => (
				<CollectionItem
					key={child.id}
					collection={child}
					isSelected={isSelected}
					onClick={onClick}
				/>
			))}
		</li>
	);
}

// Updated FeatureFilter component
function FeatureFilter({ feature, isSelected, selectedValue, onClick }) {
	const { t } = useTranslation();
	const featureKey = feature.translations.en?.key || feature.key;

	return (
		<div className="common-filter">
			<div
				className={`feature-header ${isSelected ? 'selected' : ''}`}
				onClick={() => onClick(feature.id)}
			>
				{featureKey}
				{feature.id}
			</div>
			{isSelected && (
				<ul className="filter-list">
					{feature.values.map(value => {
						const valueText = value.translations.en?.value || value.value;
						return (
							<li
								key={value.id}
								className={`feature-value ${value.id === selectedValue ? 'selected' : ''}`}
								onClick={() => onClick(feature.id, value.id)}
							>
								{valueText} <span className="number">({value.product_count})</span>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
