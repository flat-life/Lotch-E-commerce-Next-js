import { Product } from "@/lib/products";
import { Dispatch, SetStateAction } from "react";

interface RightSectionProps {
  product: Product;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  handleAddToCart: () => Promise<void>;
}

const RightSection = ({
  product,
  quantity,
  setQuantity,
  handleAddToCart,
}: RightSectionProps) => {
  return (
    <div className="w-96 sticky top-0 h-screen overflow-y-auto">
      <div className="card bg-base-100 shadow-xl p-6 space-y-6 sticky">
        <h1 className="text-black text-4xl font-extrabold">{product.title}</h1>

        <div className="badge badge-lg badge-primary">
          €{product.price.toFixed(2)}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">{"product.quantity"}</span>
          </label>
          <div className="join">
            <button
              className="join-item btn btn-outline"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              className="join-item input input-bordered w-16 text-center"
              readOnly
            />
            <button
              className="join-item btn btn-outline"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="btn btn-primary w-full"
          disabled={product.inventory === 0}
        >
          {"product.add_to_cart"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>

        <div className="divider"></div>

        <div className="prose">
          <h3 className="text-lg font-semibold">{"product.description"}</h3>
          <p className="text-base-content/80">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
