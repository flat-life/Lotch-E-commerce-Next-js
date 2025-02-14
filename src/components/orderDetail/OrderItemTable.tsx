import { OrderData } from "@/lib/order";

interface OrderItemTableProps {
  orderData: OrderData;
}

const OrderItemTable = ({ orderData }: OrderItemTableProps) => {
  return (
    <div className="card bg-base-100 shadow-md rounded-none">
      <div className="card-body">
        <h2 className="card-title text-lg mb-4">Order Items</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Product</th>
                <th className="text-center">Quantity</th>
                <th className="text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderData.orders.map((item, index) => (
                <tr key={index}>
                  <td>{item.product.title}</td>
                  <td className="text-center">x{item.quantity}</td>
                  <td className="text-right">${item.price.toFixed(2)}</td>
                </tr>
              ))}

              <tr>
                <td colSpan={2} className="text-left">
                  Total
                </td>

                <td className="text-right">
                  ${orderData.total_price.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderItemTable;
