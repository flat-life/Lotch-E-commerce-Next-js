"use client";
import { Product } from "@/lib/products";
import Link from "next/link";
import { RiHeartAddLine } from "react-icons/ri";
import {
  TbRefreshAlert,
  TbShoppingBagPlus,
  TbShoppingCartPlus,
} from "react-icons/tb";
import { addToCart } from "@/lib/cart";
import AddToCartButton from "../cart/AddToCartButton";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useTranslations } from "next-intl";

const ProductCardTiny = ({
  product,
  onCompare,
}: {
  product: Product;
  onCompare: ((productId: string) => void) | null;
}) => {
  const t = useTranslations("ProductCardTiny");

  return (
    <div className="bg-base-100 w-64 shadow-xl">
      <Link href={`/products/${product.id}`}>
        <div className="bg-[#F7F8FA]">
          <div className="relative flex items-center justify-between gap-8 py-1 mx-2">
            <span className="text-xxxs absolute font-normal text-gray-800 bg-white left-1 top-3 rounded-md shadow-md px-2">
              {product.badge}
            </span>
            <RiHeartAddLine className="absolute text-gray-500 size-5 right-1 top-3 hover:cursor-pointer" />
          </div>
          {/* Image */}
          <div className="group">
            <figure>
              <img
                src={product.images[0]?.image}
                alt="Edifice"
                className="w-full group-hover:hidden"
              />
            </figure>
            <figure>
              <img
                src={product.images[1]?.image}
                alt="Edifice"
                className="w-full hidden group-hover:inline"
              />
            </figure>
          </div>
        </div>
      </Link>
      <div className="flex-col">
        <div className="mx-5 flex-col space-y-8 py-3">
          <h2 className="flex-col">
            <p className="text-black text-xs">{t("brand")}</p>
            <p className="text-black text-sm font-semibold">{product.title}</p>
            {product.secondhand ? (
              <div className="badge badge-neutral text-xxs rounded-none">
                {t("used")}
              </div>
            ) : (
              <div className="badge badge-neutral invisible text-xxs">
                {t("used")}
              </div>
            )}
          </h2>
          <div className="card-actions justify-start">
            <div className="text-black text-xs">
              €{product.price},00* {t("currencyNote")}
            </div>
          </div>
        </div>
        <AddToCartButton
          product={product}
          style={
            "bg-black hover:bg-[#666666] mx-5 text-white flex justify-center gap-4 items-center py-2 bottom-0 cursor-pointer"
          }
        />
        {onCompare && (
          <div
            onClick={() => onCompare(String(product.id))}
            className="bg-white border-[#666666] border hover:border-black hover:border mx-5 text-black py-2 mt-4 flex justify-center items-center gap-4 mb-5 cursor-pointer"
          >
            <p className="text-xxs font-light">{t("compare")}</p>
            <HiOutlineMenuAlt3 className="size-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCardTiny;
