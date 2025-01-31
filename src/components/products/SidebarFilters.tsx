'use client';

import { useState, useEffect } from 'react';
import { Collection, Feature, FeatureValueResponse } from '@/lib/products';
import { useTranslation } from 'react-i18next';

interface SidebarFiltersProps {
	collections: Collection[];
	features: Feature[];
	onFilterChange: (filters: {
		collectionsId?: number | null;
		featureKey?: number | null;
		featureValue?: number | null;
		priceRange?: [number, number];
	}) => void;
	appliedFilters: string[]
}

export default function SidebarFilters({
	collections,
	features,
	onFilterChange, appliedFilters
}: SidebarFiltersProps) {
	const { t } = useTranslation();
	const [priceRange, setPriceRange] = useState([0, 1000]);
	const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
	const [selectedFeature, setSelectedFeature] = useState<{
		key: number | null;
		value: number | null;
	}>({ key: null, value: null });
	console.log({ features, collections })

	// Handle price range changes
	useEffect(() => {
		const timer = setTimeout(() => {
			onFilterChange({ priceRange });
		}, 500); // Debounce to avoid too many requests
		return () => clearTimeout(timer);
	}, [priceRange]);

	// Handle collection selection
	const handleCollectionClick = (collectionId: number) => {
		const newCollection = collectionId === selectedCollection ? null : collectionId;
		setSelectedCollection(newCollection);
		onFilterChange({ collectionsId: newCollection });
	};

	// Handle feature selection
	const handleFeatureClick = (featureId: number, valueId?: number) => {
		const newFeature = {
			key: featureId === selectedFeature.key ? null : featureId,
			value: valueId || null
		};

		setSelectedFeature(newFeature);
		onFilterChange({
			featureKey: newFeature.key,
			featureValue: newFeature.value
		});
	};

	return (
		<div className="sidebar-filter mt-50">
			<div className="head">{t("Browse Collections")}</div>
			<ul className="main-categories">
				{collections.map(collection => (
					<CollectionItem
						key={collection.id}
						collection={collection}
						isSelected={collection.id === selectedCollection}
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
							onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
						/>
						<input
							type="range"
							min="0"
							max="1000"
							value={priceRange[1]}
							onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
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
						isSelected={feature.id === selectedFeature.key}
						selectedValue={selectedFeature.value}
						onClick={handleFeatureClick}
					/>
				))}
			</div>
		</div>
	);
}

interface CollectionItemProps {
	collection: Collection;
	isSelected: boolean;
	onClick: (collectionId: number) => void;
}

function CollectionItem({ collection, isSelected, onClick }: CollectionItemProps) {
	return (
		<li className="main-nav-list">
			<button
				className={`collection-item ${isSelected ? 'selected' : ''}`}
				onClick={() => onClick(collection.id)}
			>
				<span className="lnr lnr-arrow-right"></span>
				{collection.title}
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

interface FeatureFilterProps {
	feature: Feature;
	isSelected: boolean;
	selectedValue: number | null;
	onClick: (featureId: number, valueId?: number) => void;
}

function FeatureFilter({ feature, isSelected, selectedValue, onClick }: FeatureFilterProps) {
	return (
		<div className="common-filter">
			<div
				className={`feature-header ${isSelected ? 'selected' : ''}`}
				onClick={() => onClick(feature.id)}
			>
				{feature.id}
			</div>
			{isSelected && (
				<ul className="filter-list">
					{feature.values.map(value => (
						<li
							key={value.id}
							className={`feature-value ${value.id === selectedValue ? 'selected' : ''}`}
							onClick={() => onClick(feature.id, value.id)}
						>
							{value.value} <span className="number">({value.product_count})</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
