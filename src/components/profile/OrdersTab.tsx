"use client";
import { Order } from "@/lib/profile";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const OrdersTab = ({ orders }: { orders: Order[] }) => {
  const t = useTranslations("OrdersTab");
  const router = useRouter();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "N":
        return t("notPaid");
      case "P":
        return t("pending");
      case "S":
        return t("shipping");
      case "D":
        return t("delivered");
      case "F":
        return t("failed");
      default:
        return "";
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>{t("date")}</th>
            <th>{t("status")}</th>
            <th>{t("total")}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => router.push(`/order-detail/${order.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{new Date(order.updated_at).toLocaleDateString()}</td>
              <td>{getStatusLabel(order.order_status)}</td>
              <td>{t("currency", { amount: order.total_price })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
