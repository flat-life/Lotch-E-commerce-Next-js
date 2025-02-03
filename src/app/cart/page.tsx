'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getOrCreateCart, updateCartItem, deleteCartItem, applyDiscount, createOrder, Cart, CartItem } from '@/lib/cart';
import Link from 'next/link';
import authClient from '@/services/authClient';
import Banner from '@/components/base/Banner';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [discountCode, setDiscountCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getOrCreateCart();
        setCart(cartData);
        console.log({ cartData })
      } catch (error) {
        console.error('Error loading cart:', error);
        alert('Failed to load cart');
      }
    };
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (!cart) return;

    try {
      setLoading(true);
      const updatedCart = await updateCartItem(itemId, newQuantity);
      console.log({ updatedCart })
      const cartData = await getOrCreateCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
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
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
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
      setDiscountCode('');
      alert('Discount applied successfully');
    } catch (error) {
      console.error('Error applying discount:', error);
      alert('Failed to apply discount');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!localStorage.getItem('JWT')) {
      alert('Please login to proceed to checkout');
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      const order = await createOrder();

      const paymentResponse = await authClient.post(`/orders/${order.id}/payment-request/`);
      const { Authority } = paymentResponse.data;

      //const paymentWindow = window.open(redirect, '_blank');

      const verifyResponse = await authClient.post('/payment-verify/', {
        order_id: order.id,
        total_price: order.total_price,
        Authority
      });
      console.log({ verifyResponse })

      if (verifyResponse.status == 200) {
        alert('Payment successful!');
        router.push(`/order-detail/${order.id}`);
      } else {
        alert('Payment failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  console.log(cart)
  if (!cart) return <div>Loading cart...</div>;

  return (
    <>
      <Banner />

      <section className="container mx-auto px-4 py-8 mt-10">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{item.product.title}</td>
                  <td className="px-4 py-2">${item.product.price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={loading || item.quantity <= 1}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={loading}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2">${item.total_price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Total</h2>
            <div className="text-xl font-semibold">
              {cart.org_price !== cart.total_price ? (
                <div className="text-red-600">
                  <span className="line-through">${cart.org_price.toFixed(2)}</span>
                  <span className="ml-2">${cart.total_price.toFixed(2)}</span>
                </div>
              ) : (
                <span>${cart.total_price.toFixed(2)}</span>
              )}
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 px-4 py-2 border rounded"
            />
            <button
              onClick={handleApplyDiscount}
              disabled={loading || !discountCode}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Apply Discount
            </button>
          </div>

          <div className="flex justify-between">
            <Link
              href="/products"
              className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleCheckout}
              disabled={loading || cart.items.length === 0}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
