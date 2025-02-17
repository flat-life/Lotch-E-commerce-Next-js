"use client";
import { OrderData } from "@/lib/order";
import { useTranslations } from "next-intl";

interface OrderDetailCardsProps {
  orderData: OrderData;
}

const OrderDetailCards = ({ orderData }: OrderDetailCardsProps) => {
  const t = useTranslations("OrderDetailCards");

  const getOrderStatusBadge = (status: string) => {
    const baseClasses = "badge badge-sm";
    switch (status) {
      case "N":
        return (
          <div className={`${baseClasses} badge-error`}>
            {t("statusNotPaid")}
          </div>
        );
      case "P":
        return (
          <div className={`${baseClasses} badge-warning`}>
            {t("statusPending")}
          </div>
        );
      case "S":
        return (
          <div className={`${baseClasses} badge-info`}>
            {t("statusShipping")}
          </div>
        );
      case "D":
        return (
          <div className={`${baseClasses} badge-success`}>
            {t("statusDelivered")}
          </div>
        );
      case "F":
        return (
          <div className={`${baseClasses} badge-error`}>
            {t("statusFailed")}
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} badge-neutral`}>
            {t("statusUnknown")}
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="card bg-base-100 shadow-md rounded-none">
        <div className="card-body">
          <h2 className="card-title text-lg">{t("orderInformation")}</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t("orderNumber")}</span>
              <span className="font-semibold">#{orderData.id}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("date")}</span>
              <span>{new Date(orderData.updated_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("total")}</span>
              <span className="font-semibold">
                ${orderData.total_price.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t("status")}</span>
              {getOrderStatusBadge(orderData.order_status)}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md rounded-none">
        <div className="card-body">
          <h2 className="card-title text-lg">{t("customerDetails")}</h2>
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
          <h2 className="card-title text-lg">{t("shippingAddress")}</h2>
          <div className="space-y-2">
            <p>{orderData.province}</p>
            <p>{orderData.city}</p>
            <p>{orderData.path}</p>
            <p>
              {t("zipCode")}: {orderData.zip_code}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailCards;
