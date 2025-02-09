import AddToCartButton from "@/components/cart/AddToCartButton";
import { Product } from "@/lib/products";
import { Dispatch, SetStateAction } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

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
    <div className="w-[29rem] sticky top-0 h-screen overflow-y-auto">
      <div className="card bg-base-100 p-6 space-y-6 sticky">
        <div>
          <h1 className="text-white bg-[#7F7F7F] text-xxs font-light inline w-fit px-2 py-0.5">
            {product.badge}
          </h1>
          <h1 className="text-black text-md font-extralight m-0">
            {"EDIFICE SOSPENSIONE"}
          </h1>
          <h1 className="text-black text-4xl font-extrabold">
            {product.title}
          </h1>
        </div>

        <div>
          <p className="font-extralight text-xxxs  text-end">
            Incl. BTW en excl. verzendkosten
          </p>
          <p className="font-[600] text-end">€{product.price.toFixed(2)}</p>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">{"Quantity"}</span>
          </label>
          <div className="join">
            <button
              className="join-item btn btn-outline hover:bg-black"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <FaMinus className="size-2" />
            </button>
            <input
              type="text"
              value={quantity}
              className="join-item input input-bordered w-16 text-center border-black"
              readOnly
            />
            <button
              className="join-item btn btn-outline hover:bg-black"
              onClick={() => setQuantity(quantity + 1)}
            >
              <FaPlus className="size-2" />
            </button>
          </div>
        </div>

        <AddToCartButton
          product={product}
          style={
            "bg-black hover:bg-[#666666] text-white flex justify-center gap-4 items-center py-3 bottom-0"
          }
        />

        <div className="divider"></div>

        <div className="prose">
          <h3 className="text-md font-normal">{"Description"}</h3>
          <p className="text-base-content/80 font-light text-sm">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
