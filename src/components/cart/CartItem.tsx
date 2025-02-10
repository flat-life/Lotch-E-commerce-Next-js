import { CartItem as CI } from "@/lib/cart";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoTrashSharp } from "react-icons/io5";

interface CartItemProps {
  item: CI;
  handleUpdateQuantity: (itemId: number, newQuantity: number) => Promise<void>;
  loading: boolean;
  handleDeleteItem: (itemId: number) => Promise<void>;
}

const CartItem = ({
  item,
  handleUpdateQuantity,
  loading,
  handleDeleteItem,
}: CartItemProps) => {
  return (
    <div className="grid grid-cols-4">
      <div>
        <img
          src={`http://localhost:8002${item.product.images[0].image}`}
          className="w-40"
        />
      </div>
      <div className="col-span-2">
        <h1 className=" py-2 font-bold text-xl">{item.product.title}</h1>
        <p className="text-xs font-light line-clamp-3 overflow-hidden">
          {item.product.description}
        </p>
        <div className=" py-2">
          <div className="form-control">
            <label className="label"></label>
            <div className="flex items-center gap-5">
              <div className="join">
                <button
                  disabled={loading}
                  className="join-item btn btn-outline hover:bg-black"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                >
                  <FaMinus className="size-2" />
                </button>
                <input
                  disabled={loading}
                  type="text"
                  value={item.quantity}
                  className="join-item input input-bordered w-16 text-center border-black"
                  readOnly
                />
                <button
                  disabled={loading}
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
                className="text-slate-500 hover:text-black disabled:text-gray-300 "
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
  );
};
export default CartItem;
