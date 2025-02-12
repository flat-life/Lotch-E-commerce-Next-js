"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authClient from "@/services/authClient";
import { ProfileTab } from "@/components/profile/ProfileTab";
import { AddressesTab } from "@/components/profile/AddressesTab";
import { OrdersTab } from "@/components/profile/OrdersTab";
import { Address, Order, UserData, CustomerData } from "@/lib/profile";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("addresses");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("JWT");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        setLoading(true);
        await authClient.post("/auth/jwt/verify/", { token });
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

    verifyToken();
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
    router.push("/login");
  };

  return (
    <div className="bg-theme bg-theme1 min-h-screen">
      <header className="topbar-nav">
        <nav className="navbar navbar-expand fixed-top bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand text-white" href="/">
              <i className="bi bi-house-door"></i>
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                  >
                    <i className="bi bi-person-circle"></i>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <h6 className="mb-0">{userData?.email}</h6>
                          <small>
                            {customerData?.first_name} {customerData?.last_name}
                          </small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="content-wrapper pt-5">
        <div className="container-fluid pt-4">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <ul className="nav nav-tabs nav-tabs-primary nav-justified">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "addresses" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("addresses")}
                      >
                        Addresses
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "orders" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("orders")}
                      >
                        Orders
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "edit" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("edit")}
                      >
                        Profile
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content p-3">
                    {loading ? (
                      <div> Loading... </div>
                    ) : (
                      <div>
                        {activeTab === "addresses" && (
                          <AddressesTab
                            addresses={addresses}
                            onUpdate={fetchAddresses}
                          />
                        )}
                        {activeTab === "orders" && (
                          <OrdersTab orders={orders} />
                        )}
                        {activeTab === "edit" && (
                          <ProfileTab
                            customerData={customerData}
                            userData={userData}
                            onUpdateCustomer={fetchCustomerData}
                            onUpdateUser={fetchUserData}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer bg-dark text-white mt-4">
        <div className="container text-center py-3">
          Copyright © 2025 By{" "}
          <a href="https://github.com/flat-life" className="text-warning">
            Flatlife
          </a>
        </div>
      </footer>
    </div>
  );
}
