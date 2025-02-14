"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import authClient from "@/services/authClient";
import Link from "next/link";
import { verifyToken } from "@/lib/base";
import Loading from "@/components/base/Loading";
import { FaCheck } from "react-icons/fa";
import { IoCheckmarkSharp } from "react-icons/io5";
import { OrderData } from "@/lib/order";
import OrderItemTable from "@/components/orderDetail/OrderItemTable";
import OrderDetailCards from "@/components/orderDetail/OrderDetailCards";
import OrderDetailHeader from "@/components/orderDetail/OrderDetailHeader";

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchOrderData = async () => {
    const token = await verifyToken();
    try {
      const response = await authClient.get(`/orders/${id}/`);
      setOrderData(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderData();
  }, [id, router]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container text-center py-5 text-danger">{error}</div>
    );
  }

  if (!orderData) {
    return <div className="container text-center py-5">Order not found</div>;
  }

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <OrderDetailHeader />

      <OrderDetailCards orderData={orderData} />

      <OrderItemTable orderData={orderData} />

      <div className="mt-6 text-center">
        <Link href="/profile" className="btn rounded-none bg-black text-white">
          Back to Orders
        </Link>
      </div>
    </div>
  );
}
