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

  const [addressesLoading, setAddressesLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [customerLoading, setCustomerLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  const handleAuthError = () => {
    localStorage.removeItem("JWT");
    router.push("/login");
  };

  const fetchCustomerData = async () => {
    setCustomerLoading(true);
    try {
      const response = await authClient.get("/customers/me/");
      setCustomerData(response.data);
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
      if (error.response?.status === 401) handleAuthError();
    } finally {
      setCustomerLoading(false);
    }
  };

  const fetchUserData = async () => {
    setUserLoading(true);
    try {
      const response = await authClient.get("/auth/users/me/");
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      if (error.response?.status === 401) handleAuthError();
    } finally {
      setUserLoading(false);
    }
  };

  const fetchAddresses = async () => {
    setAddressesLoading(true);
    try {
      const response = await authClient.get("/addresses/");
      setAddresses(response.data);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      if (error.response?.status === 401) handleAuthError();
    } finally {
      setAddressesLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const response = await authClient.get("/orders/");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      if (error.response?.status === 401) handleAuthError();
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const token = await verifyToken();
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        await Promise.all([
          fetchCustomerData(),
          fetchUserData(),
          fetchAddresses(),
          fetchOrders(),
        ]);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    initialize();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div role="tablist" className="tabs tabs-lifted">
            {/* Addresses Tab */}
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
              {addressesLoading ? (
                <Loading />
              ) : (
                <AddressesTab
                  addresses={addresses}
                  onUpdate={() => {
                    setAddressesLoading(true);
                    fetchAddresses().finally(() => setAddressesLoading(false));
                  }}
                />
              )}
            </div>

            {/* Orders Tab */}
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
              {ordersLoading ? <Loading /> : <OrdersTab orders={orders} />}
            </div>

            {/* Profile Tab */}
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
              {customerLoading || userLoading ? (
                <Loading />
              ) : (
                <ProfileTab
                  customerData={customerData}
                  userData={userData}
                  onUpdateCustomer={() => {
                    setCustomerLoading(true);
                    fetchCustomerData().finally(() =>
                      setCustomerLoading(false)
                    );
                  }}
                  onUpdateUser={() => {
                    setUserLoading(true);
                    fetchUserData().finally(() => setUserLoading(false));
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
