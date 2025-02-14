import { Feature } from "@/lib/products";

interface FeatureFilterProps {
  feature: Feature;
  isSelected: boolean;
  selectedValue: any;
  onClick: (featureId: number, valueId?: number) => void;
}

export default function FeatureFilter({
  feature,
  isSelected,
  selectedValue,
  onClick,
}: FeatureFilterProps) {
  const featureKey = feature.key;

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
            const valueText = value.value;
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
