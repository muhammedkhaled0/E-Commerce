'use client'

import { useContext, useEffect, useState } from "react";
import { faildOrderI, OrderI } from "@/interfaces";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CartContext } from "@/components/context/CartContext";
import EmptyCart from "@/components/EmptyCart";

export default function Orders() {
  const { cartData } = useContext(CartContext);
  const [orders, setOrders] = useState<OrderI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  async function getAllOders(){
    try{

      const res=await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/'+cartData?.data.cartOwner)
      const data=await res.json()
      return data
    }
    catch(error){
      setError(true)
    }
  }
useEffect(() => {
  const fetchOrders = async () => {
    const data: OrderI|faildOrderI = await getAllOders();
if ('statusMsg' in data && data.statusMsg === 'fail') {
  setError(true);
}
    else{
      setOrders(data);
      setError(false)
    }
  };
  fetchOrders();
}, [cartData]);

  return (
    <>
    { error||orders.length==0?<EmptyCart type="Order Page"/>:
    <div className="space-y-6 p-4">
      
      {orders?.map((order) => (
        <Card key={order._id} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Order ID: {order._id}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(order.createdAt).toLocaleString()}</span>
            </CardTitle>
            <CardDescription>
              User: {order.user.name} ({order.user.email})
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Cart Items Table */}
            <div>
              <h3 className="font-semibold">Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={item.product.imageCover} />
                          <AvatarFallback>Img</AvatarFallback>
                        </Avatar>
                        {item.product.title}
                      </TableCell>
                      <TableCell>{item.count}x</TableCell>
                      <TableCell>${item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Status & Total */}
            <div className="flex flex-wrap gap-2 justify-between items-center mt-4">
              <span className="font-semibold">Total: ${order.totalOrderPrice}</span>
              <span className={`px-3 py-1 rounded-full ${order.isPaid ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                {order.isPaid ? 'Paid' : 'Pending'}
              </span>
              <span className={`px-3 py-1 rounded-full ${order.isDelivered ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                {order.isDelivered ? 'Delivered' : 'Not Delivered'}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    }

    </>
  );
}
