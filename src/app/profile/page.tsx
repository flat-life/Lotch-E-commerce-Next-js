"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authClient from "@/services/authClient";
import { ProfileTab } from "@/components/profile/ProfileTab";
import { AddressesTab } from "@/components/profile/AddressesTab";
import { OrdersTab } from "@/components/profile/OrdersTab";
import { Address, Order, UserData, CustomerData } from "@/lib/profile";
import Loading from "@/components/base/Loading";
import { verifyToken } from "@/lib/base";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("addresses");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfileData = async () => {
    const token = await verifyToken();
    if (!token) {
      router.push("login");
    }
    try {
      fetchCustomerData();
      fetchUserData();
      fetchAddresses();
      await fetchOrders();

      setLoading(false);
    } catch (err) {
      console.log(err);
      localStorage.removeItem("JWT");
      router.push("/login");
    }
  };
  useEffect(() => {
    verifyToken();
    fetchProfileData();
  }, [router]);

  const fetchCustomerData = async () => {
    try {
      const response = await authClient.get("/customers/me/");
      setCustomerData(response.data);
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await authClient.get("/auth/users/me/");
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await authClient.get("/addresses/");
      setAddresses(response.data);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await authClient.get("/orders/");
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("JWT");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div role="tablist" className="tabs tabs-lifted">
            <input
              type="radio"
              name="profile-tabs"
              role="tab"
              className="tab text-lg font-medium"
              aria-label="Addresses"
              checked={activeTab === "addresses"}
              onChange={() => setActiveTab("addresses")}
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              {loading ? (
                <Loading />
              ) : (
                <AddressesTab addresses={addresses} onUpdate={fetchAddresses} />
              )}
            </div>

            <input
              type="radio"
              name="profile-tabs"
              role="tab"
              className="tab text-lg font-medium"
              aria-label="Orders"
              checked={activeTab === "orders"}
              onChange={() => setActiveTab("orders")}
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              {loading ? <Loading /> : <OrdersTab orders={orders} />}
            </div>

            <input
              type="radio"
              name="profile-tabs"
              role="tab"
              className="tab text-lg font-medium"
              aria-label="Profile"
              checked={activeTab === "edit"}
              onChange={() => setActiveTab("edit")}
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              {loading ? (
                <Loading />
              ) : (
                <ProfileTab
                  customerData={customerData}
                  userData={userData}
                  onUpdateCustomer={fetchCustomerData}
                  onUpdateUser={fetchUserData}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
