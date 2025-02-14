export interface OrderItem {
  product: {
    title: string;
  };
  quantity: number;
  price: number;
}

export interface OrderData {
  id: number;
  updated_at: string;
  total_price: number;
  order_status: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  province: string;
  city: string;
  path: string;
  zip_code: string;
  orders: OrderItem[];
}
