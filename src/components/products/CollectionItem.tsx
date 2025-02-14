export default function CollectionItem({ collection, isSelected, onClick }) {
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
