'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CartContext } from "@/components/context/CartContext";
import { useContext, useEffect, useState } from "react";
import Loading from "./loading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import Cart from "@/components/Cart";
import EmptyCart from "@/components/EmptyCart";
import { PaymentDialog } from "@/components/PaymentDialog";
export default function cart() {
  const[isLoading1,setIsLoading1]=useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const {cartData,contextLoading,getCart,setCartData,userToken}=useContext(CartContext)
    const [totalPrice,setTotalPrice]=useState(cartData?.data.totalCartPrice)
    useEffect(() => {
    getCart();
  }, []);
  async function clearCart(){
    setIsLoading1(true)
    const res=await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
      method:'DELETE',
      headers:{
     token:userToken
      }
    })
    const data=await res.json()
    setIsLoading1(false)
    setCartData(null)
    setIsOpen(false)
  }

  return (
    cartData?.numOfCartItems==0 ||cartData==null?<EmptyCart type='Cart'/>:
  contextLoading?<Loading/>:<div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT SECTION */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-gray-700 text-xl font-semibold">{cartData?.data.products.length} items in your cart</p>
        {/* MAPPPPPPPPPPPPPPPING */}
        {cartData?.data.products.map((item)=>
        <div className="p-5 border rounded-2xl flex flex-col md:flex-row items-center gap-5" key={item._id}>
        <Cart item={item} userToken={userToken} getCart={getCart} setTotalPrice={setTotalPrice}/>
        </div>
        )}
      </div>
      {/* RIGHT SECTION */}
      <div className="lg:sticky lg:top-20 h-fit p-6 border rounded-2xl space-y-4">
        <h2 className="font-semibold text-lg">Order Summary</h2>

        <div className="flex justify-between text-sm text-gray-500">
          <p>Subtotal : 10 items</p>
          <p>totalCartPrice EGP</p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Shipping</p>
          <p className="text-green-500 font-medium">Free</p>
        </div>

        <div className="flex justify-between font-bold text-xl pt-3">
          <p>Total</p>
          <p>{totalPrice||cartData?.data.totalCartPrice} EGP</p>
        </div>
        <PaymentDialog cartId={cartData.cartId}/>
        <Link href={'/products'}>
        <button className="w-full border py-3 rounded-xl font-medium hover:bg-accent-foreground hover:text-accent transition-all duration-500 cursor-pointer">
          Continue Shopping
        </button>  
        </Link>

<Dialog>
        <DialogTrigger asChild>
                <button className="flex items-center justify-center gap-2 mt-3 cursor-pointer text-red-500 font-medium w-full border-red-500 border py-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-500" 
                 onClick={()=>setIsOpen(true)}>
          <span>🗑️</span> Clear Cart
        </button>
        </DialogTrigger>
        {isOpen&&<DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Cart</DialogTitle>
            <DialogDescription>Are You Sure</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={()=>clearCart()} disabled={isLoading1}>{isLoading1?<Spinner/>:'Delete'}</Button>
          </DialogFooter>
        </DialogContent>
}
    </Dialog>
      </div>
    </div>
  );
}
