'use client'
import { useContext, useEffect, useState } from "react";
import Loading from "./loading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import EmptyCart from "@/components/EmptyCart";
import { PaymentDialog } from "@/components/PaymentDialog";
import { WishlistContext } from "@/components/context/wishlistContext";
import Wishlist from "@/components/Wishlist"
export default function cart() {
  const[isLoading1,setIsLoading1]=useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const {wishlistData,getWishlist,userToken}=useContext(WishlistContext)
    useEffect(() => {
    getWishlist();
  }, []);
  return (
    wishlistData?.count==0?<EmptyCart type='Wishlist'/>:
  <div className="container mx-auto px-4 py-10">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold">My wishlist</h1>
        <p className="text-gray-700 text-xl font-semibold">{wishlistData?.count} items in my wishlist</p>
        {/* MAPPPPPPPPPPPPPPPING */}
        {wishlistData?.data.map((item)=>
        <div className="p-5 border rounded-2xl flex flex-col md:flex-row items-center gap-5" key={item._id}>
        <Wishlist item={item}/>
        </div>
        )}
      </div>
    </div>
  );
}
