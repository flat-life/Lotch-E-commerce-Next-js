'use client';

import { useTranslation } from 'react-i18next';

interface AppliedFiltersProps {
	filters: Record<string, any>;
	onRemove: (filterKey: string) => void;
}

export default function AppliedFilters({ filters, onRemove }: AppliedFiltersProps) {
	const { t } = useTranslation();

	const filterLabels: Record<string, string> = {
		collectionsId: t('Collection'),
		featureKey: t('Feature'),
		featureValue: t('Value'),
		unitPriceGt: t('Min Price'),
		unitPriceLt: t('Max Price'),
		secondHand: t('Condition'),
		ordering: t('Sorting')
	};

	return (
		<div className="applied-filters mb-4">
			<h3 className="text-muted">{t('Applied Filters')}:</h3>
			<div className="d-flex flex-wrap gap-2">
				{Object.entries(filters).map(([key, value]) => {
					if (!value) return null;

					let displayValue = value;

					if (key === 'secondHand') {
						displayValue = value ? t('Second Hand') : t('New');
					}

					return (
						<div
							key={key}
							className="badge bg-primary cursor-pointer"
							onClick={() => onRemove(key)}
						>
							{filterLabels[key]}: {displayValue}
							<span className="ms-2">×</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
