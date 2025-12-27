export interface OrderI {
  _id: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    details: string;
    city: string;
    phone: string;
  };
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  cartItems: {
    count: number;
    product: {
      title: string;
      imageCover: string;
      price: number;
    };
    price: number;
  }[];
}
export interface faildOrderI{
    statusMsg:string,
    message:string
}