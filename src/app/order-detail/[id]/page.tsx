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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Confirmation</h1>
        <p className="text-lg text-success flex justify-center items-center gap-2">
          <IoCheckmarkSharp />
          Your order has been successfully received!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <span>
                  {new Date(orderData.updated_at).toLocaleDateString()}
                </span>
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

        {/* Customer Information Card */}
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
                <a
                  href={`mailto:${orderData.email}`}
                  className="link link-hover"
                >
                  {orderData.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Address Card */}
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
      </div>

      {/* Order Items Table */}
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

      <div className="mt-6 text-center">
        <Link href="/profile" className="btn rounded-none bg-black text-white">
          Back to Orders
        </Link>
      </div>
    </div>
  );
}
