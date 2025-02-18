import { Collection } from "@/lib/products";

interface CollectionItemProps {
  collection: Collection;
  isSelected: boolean;
  onClick: (collectionId: number) => void;
}

export default function CollectionItem({
  collection,
  isSelected,
  onClick,
}: CollectionItemProps) {
  return (
    <li>
      <button
        className={`${
          isSelected ? "active rounded-none " : ""
        } justify-between`}
        onClick={() => onClick(collection.id)}
      >
        {collection.title || collection.title}
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
