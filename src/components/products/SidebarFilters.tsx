"use client";
import { useEffect, useState } from "react";
import { Collection, Feature } from "@/lib/products";
import { useTranslation } from "react-i18next";

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
  appliedFilters,
}: SidebarFiltersProps) {
  const { t } = useTranslation();
  const [priceRange, setPriceRange] = useState<[number, number]>([
    appliedFilters.unitPriceGt || 0,
    appliedFilters.unitPriceLt || 1000,
  ]);

  useEffect(() => {
    setPriceRange([
      appliedFilters.unitPriceGt || 0,
      appliedFilters.unitPriceLt || 1000,
    ]);
  }, [appliedFilters.unitPriceGt, appliedFilters.unitPriceLt]);

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    onFilterChange({
      unitPriceGt: newRange[0],
      unitPriceLt: newRange[1],
    });
  };

  const handleCollectionClick = (collectionId: number) => {
    const newCollection =
      appliedFilters.collectionsId === collectionId ? null : collectionId;
    onFilterChange({ collectionsId: newCollection });
  };

  const handleFeatureClick = (featureId: number, valueId?: number) => {
    const newFilters: Record<string, any> = {};

    if (valueId) {
      newFilters.featureKey = featureId;
      newFilters.featureValue = valueId;
    } else {
      newFilters.featureKey =
        appliedFilters.featureKey === featureId ? null : featureId;
      newFilters.featureValue = null;
    }

    onFilterChange(newFilters);
  };

  return (
    <div className="bg-base-100 p-4 rounded-box shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-lg mb-2">{t("Collections")}</h3>
          <ul className="menu menu-compact bg-base-200 rounded-box">
            {collections.map((collection) => (
              <CollectionItem
                key={collection.id}
                collection={collection}
                isSelected={collection.id === appliedFilters.collectionsId}
                onClick={handleCollectionClick}
              />
            ))}
          </ul>
        </div>

        <div className="divider"></div>

        <div>
          <h3 className="font-bold text-lg mb-4">{t("Price Range")}</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                {t("Min: $")}
                {priceRange[0]}
              </span>
              <span className="label-text">
                {t("Max: $")}
                {priceRange[1]}
              </span>
            </label>
            <div className="range range-primary">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) =>
                  handlePriceChange([Number(e.target.value), priceRange[1]])
                }
                className="range range-primary"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) =>
                  handlePriceChange([priceRange[0], Number(e.target.value)])
                }
                className="range range-primary"
              />
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div>
          <h3 className="font-bold text-lg mb-4">{t("Features")}</h3>
          <div className="space-y-4">
            {features.map((feature) => (
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
      </div>
    </div>
  );
}

function CollectionItem({ collection, isSelected, onClick }) {
  return (
    <li>
      <button
        className={`${isSelected ? "active" : ""} justify-between`}
        onClick={() => onClick(collection.id)}
      >
        {collection.translations.en?.title || collection.title}
        <span className="badge">{collection.products_count}</span>
      </button>
      {collection.children?.map((child) => (
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

function FeatureFilter({ feature, isSelected, selectedValue, onClick }) {
  const featureKey = feature.translations.en?.key || feature.key;

  return (
    <div className="collapse collapse-arrow border border-base-300 rounded-box">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onClick(feature.id)}
      />
      <div className="collapse-title font-medium">{featureKey}</div>
      <div className="collapse-content">
        <ul className="menu menu-compact">
          {feature.values.map((value) => {
            const valueText = value.translations.en?.value || value.value;
            return (
              <li key={value.id}>
                <button
                  className={`${
                    value.id === selectedValue ? "active" : ""
                  } justify-between`}
                  onClick={() => onClick(feature.id, value.id)}
                >
                  {valueText}
                  <span className="badge">{value.product_count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
