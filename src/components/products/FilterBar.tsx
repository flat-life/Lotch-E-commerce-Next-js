'use client';
import { useTranslation } from 'react-i18next';

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
	appliedFilters
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
		<div className="filter-bar d-flex flex-wrap align-items-center bg-red-200">
			<div>
				<div className="">
					<div id="sortingDropdown" className="btn-group">
						<button
							className={`btn btn-sm ${appliedFilters.ordering === 'default' ? 'btn-primary' : 'btn-outline-secondary'}`}
							onClick={() => handleSortingChange('default')}
						>
							{t("Default sorting")}
						</button>
						<button
							className={`btn btn-sm ${appliedFilters.ordering === 'price_asc' ? 'btn-primary' : 'btn-outline-secondary'}`}
							onClick={() => handleSortingChange('price_asc')}
						>
							{t("Price: Low to High")}
						</button>
						<button
							className={`btn btn-sm ${appliedFilters.ordering === 'price_desc' ? 'btn-primary' : 'btn-outline-secondary'}`}
							onClick={() => handleSortingChange('price_desc')}
						>
							{t("Price: High to Low")}
						</button>
						<button
							className={`btn btn-sm ${appliedFilters.ordering === 'best_sales' ? 'btn-primary' : 'btn-outline-secondary'}`}
							onClick={() => handleSortingChange('best_sales')}
						>
							{t("Best Sales")}
						</button>
					</div>
				</div>

				<br />

				<div id="secondhand" className="btn-group">
					<button
						className={`btn btn-sm ${appliedFilters.secondHand === true ? 'btn-primary' : 'btn-outline-secondary'}`}
						onClick={() => handleSecondHandChange(true)}
					>
						{t("Second hand Only")}
					</button>
					<button
						className={`btn btn-sm ${appliedFilters.secondHand === false ? 'btn-primary' : 'btn-outline-secondary'}`}
						onClick={() => handleSecondHandChange(false)}
					>
						{t("New Only")}
					</button>
				</div>

				<br />

				{selectedProducts.length > 0 && (
					<button
						id="compare-button"
						className="btn btn-primary mt-2"
						onClick={onCompare}
					>
						{t("Compare")} ({selectedProducts.length})
					</button>
				)}
			</div>
		</div>
	);
}
