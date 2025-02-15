import { addToCart } from "@/lib/cart";
import { Product } from "@/lib/products";
import { TbShoppingBagPlus } from "react-icons/tb";

interface AddToCartButtonProps {
  product: Product;
  style: string;
}

const AddToCartButton = ({ product, style }: AddToCartButtonProps) => {
  return (
    <div className={style} onClick={() => addToCart(product.id)}>
      <button
        disabled={product.inventory === 0}
        className=" flex justify-center gap-4 items-center"
      >
        <p className="text-xxs font-light">Add to cart</p>
        <TbShoppingBagPlus className="" />
      </button>
    </div>
  );
};
export default AddToCartButton;
