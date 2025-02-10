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
  CartItem,
} from "@/lib/cart";
import Link from "next/link";
import authClient from "@/services/authClient";
import Banner from "@/components/base/Banner";
import { MdOutlineChevronLeft } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
      setDiscountCode("");
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
  if (!cart)
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>;
      </div>
    );

  return (
    <>
      <section className="container  px-5 sm:px-16 lg:px-28 py-8 mt-8 text-black flex ">
        <div className="grow-2">
          <div className="flex items-center mb-3">
            <MdOutlineChevronLeft />
            <Link href="/products" className="mt-0.5 underline">
              Continue Shopping
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

          <div className="overflow-x-auto mt-20 md:mt-40">
            {cart.items.map((item) => (
              <div className="grid grid-cols-4">
                <div>
                  <img
                    src={`http://localhost:8002${item.product.images[0].image}`}
                    className="w-40"
                  />
                </div>
                <div className="col-span-2">
                  <h1 className=" py-2 font-bold text-xl">
                    {item.product.title}
                  </h1>
                  <p className="text-xs font-light line-clamp-3 overflow-hidden">
                    {item.product.description}
                  </p>
                  <div className=" py-2">
                    <div className="form-control">
                      <label className="label"></label>
                      <div className="flex items-center gap-5">
                        <div className="join">
                          <button
                            className="join-item btn btn-outline hover:bg-black"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <FaMinus className="size-2" />
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            className="join-item input input-bordered w-16 text-center border-black"
                            readOnly
                          />
                          <button
                            className="join-item btn btn-outline hover:bg-black flex items-center"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <FaPlus className="size-2" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          disabled={loading}
                          className="text-slate-500 hover:text-black "
                        >
                          <IoTrashSharp className="size-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="px-4 py-2">${item.total_price.toFixed(2)}</p>
                </div>

                <p className="px-4 py-2"></p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 sticky top-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Total</h2>
            <div className="text-xl font-semibold">
              {loading ? (
                <span className="loading loading-infinity loading-lg"></span>
              ) : (
                <span>€{cart.total_price.toFixed(2)}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col my-5">
            <div className="flex justify-between">
              <p className="text-xs">Subtotal (incl. VAT):</p>
              {cart.org_price !== cart.total_price ? (
                <p className="text-xs line-through">
                  €{cart.org_price.toFixed(2)}
                </p>
              ) : (
                <p className="text-xs">€{cart.org_price.toFixed(2)}</p>
              )}
            </div>
            <div className="flex justify-between">
              <p className="text-xs">Postage costs:</p>
              <p className="text-xs">€{0}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs font-bold">Order value incl. VAT</p>
              <p className="text-xs">€{cart.total_price.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              disabled={loading}
              placeholder="Coupon code"
              className="input flex-1 px-4 py-1  roundend-none disabled:input-disabled"
            />
            <button
              onClick={handleApplyDiscount}
              disabled={loading || !discountCode}
              className="px-4 text-black btn  disabled:btn-disabled rounded-none"
            >
              Apply Discount
            </button>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleCheckout}
              disabled={loading || cart.items.length === 0}
              className="px-6 py-2 btn bg-black text-white rounded-none disabled:btn-disabled hover:bg-gray-600"
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
