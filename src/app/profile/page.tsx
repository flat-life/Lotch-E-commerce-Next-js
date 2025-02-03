'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import authClient from '@/services/authClient';
import apiClient from '@/services/apiClient';

type Address = {
  id: number;
  zip_code: string;
  province: string;
  city: string;
  path: string;
  default: boolean;
};

type Order = {
  id: number;
  updated_at: string;
  order_status: string;
  total_price: number;
};

type CustomerData = {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  membership: string;
  user_id: number;
};

type UserData = {
  id: number;
  email: string;
  phone_number: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('addresses');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('JWT');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        await authClient.post('/auth/jwt/verify/', { token });
        fetchCustomerData();
        fetchUserData();
        fetchAddresses();
        fetchOrders();
      } catch (err) {
        localStorage.removeItem('JWT');
        router.push('/login');
      }
    };

    verifyToken();
  }, [router]);

  const fetchCustomerData = async () => {
    try {
      const response = await authClient.get('/customers/me/');
      setCustomerData(response.data);
    } catch (error) {
      console.error('Failed to fetch customer data:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await authClient.get('/auth/users/me/');
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await authClient.get('/addresses/');
      setAddresses(response.data);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await authClient.get('/orders/');
      console.log(response.data)
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('JWT');
    router.push('/');
  };

  return (
    <div className="bg-theme bg-theme1 min-h-screen">
      <header className="topbar-nav">
        <nav className="navbar navbar-expand fixed-top bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand text-white" href="/">
              <i className="bi bi-house-door"></i>
            </a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#">
                    <i className="bi bi-person-circle"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <h6 className="mb-0">{userData?.email}</h6>
                          <small>{customerData?.first_name} {customerData?.last_name}</small>
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
                        className={`nav-link ${activeTab === 'addresses' ? 'active' : ''}`}
                        onClick={() => setActiveTab('addresses')}
                      >
                        Addresses
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                      >
                        Orders
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'edit' ? 'active' : ''}`}
                        onClick={() => setActiveTab('edit')}
                      >
                        Profile
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content p-3">
                    {activeTab === 'addresses' && (
                      <AddressesTab addresses={addresses} onUpdate={fetchAddresses} />
                    )}
                    {activeTab === 'orders' && <OrdersTab orders={orders} />}
                    {activeTab === 'edit' && (
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
            </div>
          </div>
        </div>
      </div>

      <footer className="footer bg-dark text-white mt-4">
        <div className="container text-center py-3">
          Copyright © 2024 By <a href="https://github.com/Y-A-Asd" className="text-warning">Y-A-Asd</a>
        </div>
      </footer>
    </div>
  );
}

// Addresses Tab Component
const AddressesTab = ({ addresses, onUpdate }: { addresses: Address[], onUpdate: () => void }) => {
  const { register, handleSubmit, reset, setValue } = useForm<Address>();
  const [editingId, setEditingId] = useState<number | null>(null);

  const onSubmit = async (data: Address) => {
    try {
      if (editingId) {
        await authClient.put(`/addresses/${editingId}/`, data);
      } else {
        await authClient.post('/addresses/', data);
      }
      onUpdate();
      reset();
      setEditingId(null);
    } catch (error) {
      console.error('Address operation failed:', error);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    Object.entries(address).forEach(([key, value]) => {
      setValue(key as keyof Address, value);
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await authClient.delete(`/addresses/${id}/`);
      onUpdate();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Zip Code</th>
            <th>Province</th>
            <th>City</th>
            <th>Path</th>
            <th>Default</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map(address => (
            <tr key={address.id}>
              <td>{address.zip_code}</td>
              <td>{address.province}</td>
              <td>{address.city}</td>
              <td>{address.path}</td>
              <td>{address.default ? 'Yes' : 'No'}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(address)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(address.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="row g-3">
          <div className="col-md-6">
            <input {...register('zip_code')} placeholder="Zip Code" className="form-control" />
          </div>
          <div className="col-md-6">
            <input {...register('province')} placeholder="Province" className="form-control" />
          </div>
          <div className="col-md-6">
            <input {...register('city')} placeholder="City" className="form-control" />
          </div>
          <div className="col-md-6">
            <input {...register('path')} placeholder="Path" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-check-label">
              <input type="checkbox" {...register('default')} className="form-check-input" />
              Default Address
            </label>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-dark">
              {editingId ? 'Update Address' : 'Add Address'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Orders Tab Component
const OrdersTab = ({ orders }: { orders: Order[] }) => {
  const router = useRouter();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'N': return 'Not Paid';
      case 'P': return 'Pending';
      case 'S': return 'Shipping';
      case 'D': return 'Delivered';
      case 'F': return 'Failed';
      default: return '';
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} onClick={() => router.push(`/order-detail/${order.id}`)} style={{ cursor: 'pointer' }}>
              <td>{new Date(order.updated_at).toLocaleDateString()}</td>
              <td>{getStatusLabel(order.order_status)}</td>
              <td>${order.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ customerData, userData, onUpdateCustomer, onUpdateUser }: {
  customerData: CustomerData | null,
  userData: UserData | null,
  onUpdateCustomer: () => void,
  onUpdateUser: () => void
}) => {
  const customerForm = useForm({ defaultValues: customerData || {} });
  const userForm = useForm({ defaultValues: userData || {} });
  const passForm = useForm();

  useEffect(() => {
    if (customerData) customerForm.reset(customerData);
    if (userData) userForm.reset(userData);
  }, [customerData, userData]);

  const handleCustomerSubmit = async (data: any) => {
    try {
      await authClient.put('/customers/me/', data);
      onUpdateCustomer();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleUserSubmit = async (data: any) => {
    try {
      await authClient.put('/auth/users/me/', data);
      onUpdateUser();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handlePasswordSubmit = async (data: any) => {
    try {
      await authClient.post('/auth/users/set_password/', data);
      passForm.reset();
    } catch (error) {
      console.error('Password change failed:', error);
    }
  };

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <form onSubmit={customerForm.handleSubmit(handleCustomerSubmit)}>
          <h5 className="mb-3">Personal Information</h5>
          <div className="mb-3">
            <input {...customerForm.register('first_name')} placeholder="First Name" className="form-control" />
          </div>
          <div className="mb-3">
            <input {...customerForm.register('last_name')} placeholder="Last Name" className="form-control" />
          </div>
          <div className="mb-3">
            <input
              type="date"
              {...customerForm.register('birth_date')}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>

      <div className="col-md-6">
        <form onSubmit={userForm.handleSubmit(handleUserSubmit)} className="mb-4">
          <h5 className="mb-3">Account Information</h5>
          <div className="mb-3">
            <input
              type="email"
              {...userForm.register('email')}
              placeholder="Email"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-secondary">Update Email</button>
        </form>

        <form onSubmit={passForm.handleSubmit(handlePasswordSubmit)}>
          <h5 className="mb-3">Change Password</h5>
          <div className="mb-3">
            <input
              type="password"
              {...passForm.register('current_password')}
              placeholder="Current Password"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              {...passForm.register('new_password')}
              placeholder="New Password"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success">Change Password</button>
        </form>
      </div>
    </div>
  );
};
