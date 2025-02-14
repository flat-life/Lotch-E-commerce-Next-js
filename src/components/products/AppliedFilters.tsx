"use client";

import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

interface AppliedFiltersProps {
  filters: Record<string, any>;
  onRemove: (filterKey: string) => void;
}

export default function AppliedFilters({
  filters,
  onRemove,
}: AppliedFiltersProps) {
  const { t } = useTranslation();

  const filterLabels: Record<string, string> = {
    collectionsId: t("Collection"),
    featureKey: t("Feature"),
    featureValue: t("Value"),
    unitPriceGt: t("Min Price"),
    unitPriceLt: t("Max Price"),
    secondHand: t("Condition"),
    ordering: t("Sorting"),
  };

  return (
    <div className="bg-base-200 p-4 rounded-none mb-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-semibold">{t("Applied Filters")}:</span>
        {Object.entries(filters).map(([key, value]) => {
          if (!value) return null;

          let displayValue = value;
          if (key === "secondHand") displayValue = value ? t("Used") : t("New");

          return (
            <div
              key={key}
              className="badge badge-lg text-white hover:bg-gray-700 gap-2 cursor-pointer bg-black flex items-center"
              onClick={() => onRemove(key)}
            >
              <p className="text-sm">
                {filterLabels[key]}: {displayValue}
              </p>
              <IoClose />
            </div>
          );
        })}
      </div>
    </div>
  );
}
