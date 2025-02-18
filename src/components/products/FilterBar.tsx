"use client";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoChevronDownOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("FilterBar");

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
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm bg-black text-white border border-base-300 rounded-none"
          >
            {appliedFilters.ordering === "price_asc" && t("priceLowToHigh")}
            {appliedFilters.ordering === "price_desc" && t("priceHighToLow")}
            {appliedFilters.ordering === "best_sales" && t("bestSales")}
            {appliedFilters.ordering === "default" && t("defaultSorting")}
            {!appliedFilters.ordering && t("defaultSorting")}
            <IoChevronDownOutline />
          </div>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-none border border-base-300 w-52">
            <li>
              <button
                className={`text-sm ${
                  !appliedFilters.ordering ? "active rounded-none" : ""
                }`}
                onClick={() => handleSortingChange("default")}
              >
                {t("defaultSorting")}
              </button>
            </li>
            <li>
              <button
                className={`text-sm ${
                  appliedFilters.ordering === "price_asc"
                    ? "active rounded-none"
                    : ""
                }`}
                onClick={() => handleSortingChange("price_asc")}
              >
                {t("priceLowToHigh")}
              </button>
            </li>
            <li>
              <button
                className={`text-sm ${
                  appliedFilters.ordering === "price_desc"
                    ? "active rounded-none"
                    : ""
                }`}
                onClick={() => handleSortingChange("price_desc")}
              >
                {t("priceHighToLow")}
              </button>
            </li>
            <li>
              <button
                className={`text-sm ${
                  appliedFilters.ordering === "best_sales"
                    ? "active rounded-none"
                    : ""
                }`}
                onClick={() => handleSortingChange("best_sales")}
              >
                {t("bestSales")}
              </button>
            </li>
          </ul>
        </div>
        <div className="join rounded-none ">
          <button
            className={`join-item btn btn-sm border-black border-1 ${
              appliedFilters.secondHand === true ? "bg-black text-white" : ""
            }`}
            onClick={() => handleSecondHandChange(true)}
          >
            {t("used")}
          </button>
          <button
            className={`join-item btn btn-sm border-black border-1 ${
              appliedFilters.secondHand === false || !appliedFilters.secondHand
                ? "bg-black text-white"
                : ""
            }`}
            onClick={() => handleSecondHandChange(false)}
          >
            {t("new")}
          </button>
        </div>
      </div>
      {selectedProducts.length > 0 && (
        <button
          className="btn bg-black text-white hover:bg-gray-700 rounded-none btn-sm gap-2"
          onClick={onCompare}
        >
          <HiOutlineMenuAlt3 className="size-5" />
          {t("compare")} ({selectedProducts.length})
        </button>
      )}
    </div>
  );
}
