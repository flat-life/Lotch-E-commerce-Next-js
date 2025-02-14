import { IoCheckmarkSharp } from "react-icons/io5";

const OrderDetailHeader = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-2">Order Confirmation</h1>
      <p className="text-lg text-success flex justify-center items-center gap-2">
        <IoCheckmarkSharp />
        Your order has been successfully received!
      </p>
    </div>
  );
};

export default OrderDetailHeader;
