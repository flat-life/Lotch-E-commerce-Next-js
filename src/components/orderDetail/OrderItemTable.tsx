"use client";
import { OrderData } from "@/lib/order";
import { useTranslations } from "next-intl";

interface OrderItemTableProps {
  orderData: OrderData;
}

const OrderItemTable = ({ orderData }: OrderItemTableProps) => {
  const t = useTranslations("OrderItemTable");

  return (
    <div className="card bg-base-100 shadow-md rounded-none">
      <div className="card-body">
        <h2 className="card-title text-lg mb-4">{t("orderItems")}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>{t("product")}</th>
                <th className="text-center">{t("quantity")}</th>
                <th className="text-right">{t("price")}</th>
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
                  {t("total")}
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
