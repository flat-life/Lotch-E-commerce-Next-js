"use client";
import { useTranslations } from "next-intl";
import { IoClose } from "react-icons/io5";

interface AppliedFiltersProps {
  filters: Record<string, any>;
  onRemove: (filterKey: string) => void;
}

export default function AppliedFilters({
  filters,
  onRemove,
}: AppliedFiltersProps) {
  const t = useTranslations("AppliedFilters");

  const filterLabels: Record<string, string> = {
    collectionsId: t("collection"),
    featureKey: t("feature"),
    featureValue: t("value"),
    unitPriceGt: t("minPrice"),
    unitPriceLt: t("maxPrice"),
    secondHand: t("condition"),
    ordering: t("sorting"),
  };

  return (
    <div className="bg-base-200 p-4 rounded-none mb-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-semibold">{t("appliedFilters")}</span>
        {Object.entries(filters).map(([key, value]) => {
          if (!value) return null;

          let displayValue = value;
          if (key === "secondHand") {
            displayValue = value ? t("used") : t("new");
          }

          return (
            <div
              key={key}
              className="badge badge-lg text-white hover:bg-gray-700 gap-2 cursor-pointer bg-black flex items-center rounded-none"
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
