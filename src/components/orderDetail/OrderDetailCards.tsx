import { OrderData } from "@/lib/order";

interface OrderDetailCardsProps {
  orderData: OrderData;
}

const OrderDetailCards = ({ orderData }: OrderDetailCardsProps) => {
  const getOrderStatusBadge = (status: string) => {
    const baseClasses = "badge badge-sm";
    switch (status) {
      case "N":
        return <div className={`${baseClasses} badge-error`}>Not Paid</div>;
      case "P":
        return <div className={`${baseClasses} badge-warning`}>Pending</div>;
      case "S":
        return <div className={`${baseClasses} badge-info`}>Shipping</div>;
      case "D":
        return <div className={`${baseClasses} badge-success`}>Delivered</div>;
      case "F":
        return <div className={`${baseClasses} badge-error`}>Failed</div>;
      default:
        return <div className={`${baseClasses} badge-neutral`}>Unknown</div>;
    }
  };
  return (
    <>
      <div className="card bg-base-100 shadow-md rounded-none">
        <div className="card-body">
          <h2 className="card-title text-lg">Order Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-semibold">#{orderData.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{new Date(orderData.updated_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-semibold">
                ${orderData.total_price.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Status:</span>
              {getOrderStatusBadge(orderData.order_status)}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md rounded-none">
        <div className="card-body">
          <h2 className="card-title text-lg">Customer Details</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">
                {orderData.first_name} {orderData.last_name}
              </span>
            </p>
            <p>
              <a
                href={`tel:${orderData.phone_number}`}
                className="link link-hover"
              >
                {orderData.phone_number}
              </a>
            </p>
            <p>
              <a href={`mailto:${orderData.email}`} className="link link-hover">
                {orderData.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md rounded-none">
        <div className="card-body">
          <h2 className="card-title text-lg">Shipping Address</h2>
          <div className="space-y-2">
            <p>{orderData.province}</p>
            <p>{orderData.city}</p>
            <p>{orderData.path}</p>
            <p>Zip Code: {orderData.zip_code}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailCards;
