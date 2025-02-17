"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getOrCreateCart,
  updateCartItem,
  deleteCartItem,
  applyDiscount,
  createOrder,
  Cart,
} from "@/lib/cart";
import Link from "next/link";
import authClient from "@/services/authClient";
import Banner from "@/components/base/Banner";
import { MdOutlineChevronLeft } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import TotalSection from "@/components/cart/TotalSection";
import CartItem from "@/components/cart/CartItem";
import Loading from "@/components/base/Loading";
import { useTranslations } from "next-intl";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslations("cartPage");
  const fetchCart = async () => {
    try {
      const cartData = await getOrCreateCart();
      setCart(cartData);
      console.log({ cartData });
    } catch (error) {
      console.error("Error loading cart:", error);
      alert("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (!cart) return;

    try {
      setLoading(true);
      const updatedCart = await updateCartItem(itemId, newQuantity);
      console.log({ updatedCart });
      const cartData = await getOrCreateCart();
      setCart(cartData);
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!cart) return;

    try {
      setLoading(true);
      const updatedCart = await deleteCartItem(itemId);
      const cartData = await getOrCreateCart();
      setCart(cartData);
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDiscount = async () => {
    if (!discountCode || !cart) return;

    try {
      setLoading(true);
      const updatedCart = await applyDiscount(discountCode);
      const cartData = await getOrCreateCart();
      setCart(cartData);
      alert("Discount applied successfully");
    } catch (error) {
      console.error("Error applying discount:", error);
      alert("Failed to apply discount");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!localStorage.getItem("JWT")) {
      alert("Please login to proceed to checkout");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      const order = await createOrder();

      const paymentResponse = await authClient.post(
        `/orders/${order.id}/payment-request/`
      );
      const { Authority } = paymentResponse.data;

      //const paymentWindow = window.open(redirect, '_blank');

      const verifyResponse = await authClient.post("/payment-verify/", {
        order_id: order.id,
        total_price: order.total_price,
        Authority,
      });
      console.log({ verifyResponse });

      if (verifyResponse.status == 200) {
        alert("Payment successful!");
        router.push(`/order-detail/${order.id}`);
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  console.log(cart);
  if (!cart) return <Loading />;

  return (
    <>
      <section className="container  px-5 sm:px-16 lg:px-28 py-8 mt-8 text-black flex ">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <MdOutlineChevronLeft />
            <Link href="/products" className="mt-0.5 underline"></Link>
          </div>

          <h1 className="text-3xl font-bold mb-6">{t("sC")}</h1>

          <div className="overflow-x-auto mt-20 md:mt-40">
            {cart.items.map((item) => (
              <CartItem
                item={item}
                loading={loading}
                handleDeleteItem={handleDeleteItem}
                handleUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
        </div>

        <TotalSection
          cart={cart}
          loading={loading}
          handleCheckout={handleCheckout}
          handleApplyDiscount={handleApplyDiscount}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
        />
      </section>
    </>
  );
}
