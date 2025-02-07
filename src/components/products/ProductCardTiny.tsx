import { Product } from "@/lib/products";

const ProductCardTiny = ({ product }: { product: Product }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={`${product.images[0]?.image}`} alt="Edifice" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.title}
          {product.secondhand && (
            <div className="badge badge-secondary">Seccend Hand</div>
          )}
        </h2>
        <p className="truncate">{product.description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{product.price}</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardTiny;
