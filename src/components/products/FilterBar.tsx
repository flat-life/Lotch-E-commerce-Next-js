"use client";
import { useTranslation } from "react-i18next";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

interface FilterBarProps {
  selectedProducts: string[];
  onCompare: () => void;
  onFilterChange: (filter: Record<string, any>) => void;
  appliedFilters: Record<string, any>;
}

export default function FilterBar({
  selectedProducts,
  onCompare,
  onFilterChange,
  appliedFilters,
}: FilterBarProps) {
  const { t } = useTranslation();

  const handleSortingChange = (value: string) => {
    onFilterChange({ ordering: value });
  };

  const handleSecondHandChange = (value: boolean) => {
    const newValue = appliedFilters.secondHand === value ? null : value;
    onFilterChange({ secondHand: newValue });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-base-200 p-4 rounded-none mb-4">
      <div className="flex flex-wrap gap-2">
        <div className="form-control rounded-none">
          <select
            className="select select-bordered select-sm rounded-none"
            value={appliedFilters.ordering || "default"}
            onChange={(e) => handleSortingChange(e.target.value)}
          >
            <option value="default">{t("Default sorting")}</option>
            <option value="price_asc">{t("Price: Low to High")}</option>
            <option value="price_desc">{t("Price: High to Low")}</option>
            <option value="best_sales">{t("Best Sales")}</option>
          </select>
        </div>

        <div className="join rounded-none">
          <button
            className={`join-item btn btn-sm ${
              appliedFilters.secondHand === true ? "bg-black text-white" : ""
            }`}
            onClick={() => handleSecondHandChange(true)}
          >
            {t("Used")}
          </button>
          <button
            className={`join-item btn btn-sm ${
              appliedFilters.secondHand === false ? "bg-black text-white" : ""
            }`}
            onClick={() => handleSecondHandChange(false)}
          >
            {t("New")}
          </button>
        </div>
      </div>

      {selectedProducts.length > 0 && (
        <button
          className="btn bg-black text-white hover:bg-gray-700 rounded-none btn-sm gap-2"
          onClick={onCompare}
        >
          <HiOutlineMenuAlt3 className="size-5" />
          {t("Compare")} ({selectedProducts.length})
        </button>
      )}
    </div>
  );
}
