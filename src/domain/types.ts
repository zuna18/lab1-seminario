export type Product = {
  name: string;
  price: number;
  quantity: number;
};

export type CustomerType = "regular" | "premium" | "employee" | "vip";

export type Customer = {
  name: string;
  email: string;
  type: CustomerType;
};

export type Order = {
  id: string;
  customer: Customer;
  products: Product[];
  deliveryType: "home" | "pickup";
};

export type Receipt = {
  orderId: string;
  subtotal: number;
  discount: number;
  deliveryCost: number;
  total: number;
};