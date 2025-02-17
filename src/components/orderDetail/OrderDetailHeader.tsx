"use client";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useTranslations } from "next-intl";

const OrderDetailHeader = () => {
  const t = useTranslations("OrderDetailHeader");

  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-2">{t("orderConfirmation")}</h1>
      <p className="text-lg text-success flex justify-center items-center gap-2">
        <IoCheckmarkSharp />
        {t("orderReceived")}
      </p>
    </div>
  );
};

export default OrderDetailHeader;
