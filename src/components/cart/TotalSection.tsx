import { Cart } from "@/lib/cart";
import { SetStateAction } from "react";

interface TotalSectionProps {
  cart: Cart;
  discountCode: string;
  setDiscountCode: (value: SetStateAction<string>) => void;
  handleApplyDiscount: () => Promise<void>;
  loading: boolean;
  handleCheckout: () => Promise<void>;
}

const TotalSection = ({
  cart,
  loading,
  discountCode,
  setDiscountCode,
  handleCheckout,
  handleApplyDiscount,
}: TotalSectionProps) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 sticky top-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Total</h2>
        <div className="text-xl font-semibold h-[47px] flex items-center">
          {loading ? (
            <span className="loading loading-infinity loading-lg"></span>
          ) : (
            <span>€{cart.total_price.toFixed(2)}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col my-5">
        <div className="flex justify-between">
          <p className="text-xs  h-[20px]">Subtotal (incl. VAT):</p>
          {loading ? (
            <span className="loading text-gray-500 loading-infinity loading-sm"></span>
          ) : cart.org_price !== cart.total_price ? (
            <p className="text-xs line-through">€{cart.org_price.toFixed(2)}</p>
          ) : (
            <p className="text-xs">€{cart.org_price.toFixed(2)}</p>
          )}
        </div>
        <div className="flex justify-between">
          <p className="text-xs h-[20px]">Postage costs:</p>
          {loading ? (
            <span className="loading text-gray-500 loading-infinity loading-sm"></span>
          ) : (
            <p className="text-xs">:€0</p>
          )}
        </div>
        <div className="flex justify-between">
          <p className="text-xs  h-[20px] font-bold">Order value incl. VAT</p>
          {loading ? (
            <span className="loading text-gray-500 loading-infinity loading-sm"></span>
          ) : (
            <p className="text-xs">€{cart.total_price.toFixed(2)}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          disabled={loading || cart.org_price !== cart.total_price}
          placeholder={
            cart.org_price === cart.total_price ? "Coupon code" : discountCode
          }
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
          className="px-6 w-[180px] btn bg-black text-white rounded-none disabled:btn-disabled hover:bg-gray-600"
        >
          {loading ? (
            <span className="loading text-gray-500 loading-infinity loading-md"></span>
          ) : (
            "Proceed to Checkout"
          )}
        </button>
      </div>
    </div>
  );
};

export default TotalSection;
