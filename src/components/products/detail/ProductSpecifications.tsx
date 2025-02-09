import { ValueFeature } from "@/lib/products";

interface ProductSpecificationsProps {
  features: ValueFeature[];
}

export function ProductSpecifications({
  features,
}: ProductSpecificationsProps) {
  return (
    <div className="space-y-4 text-black">
      <h2 className="text-md font-normal">{"Specifications"}</h2>
      {features.map((feature, index) => (
        <div key={feature.id} className="collapse collapse-plus bg-base-200">
          <input
            type="radio"
            name="spec-accordion"
            defaultChecked={index === 0}
          />
          <div className="collapse-title text-xs font-bold items-center flex">
            <p>{feature.key.key}</p>
          </div>
          <div className="collapse-content">
            <p className="text-xxs font-normal">{feature.value.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
