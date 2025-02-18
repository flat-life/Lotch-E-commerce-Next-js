import { addToCart } from "@/lib/cart";
import { Product } from "@/lib/products";
import { useTranslations } from "next-intl";
import { TbShoppingBagPlus } from "react-icons/tb";

interface AddToCartButtonProps {
  product: Product;
  style: string;
}

const AddToCartButton = ({ product, style }: AddToCartButtonProps) => {
  const t = useTranslations("addToCartButton");
  return (
    <div className={style} onClick={() => addToCart(product.id)}>
      <button
        disabled={product.inventory === 0}
        className=" flex justify-center gap-4 items-center"
      >
        <p className="text-xxs font-light">{t("dddToCart")}</p>
        <TbShoppingBagPlus className="" />
      </button>
    </div>
  );
};
export default AddToCartButton;
