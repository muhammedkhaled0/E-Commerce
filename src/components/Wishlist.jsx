'use client'
import { useContext, useState } from 'react'
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
import { Button } from './ui/button'
import Image from 'next/image'
import Spinner from './Spinner'
import { WishlistContext } from './context/wishlistContext'
import AddToCard from './AddToCard'
export default function Wishlist({item}) {
  const[isLoading,setIsLoading]=useState(false)
    const {WishlistData,setWishlistData,getWishlist,userToken}=useContext(WishlistContext)
         async function deleteItemFromWishlist(itemId) {
        setIsLoading(true)
        const res=await fetch('https://ecommerce.routemisr.com/api/v1/wishlist/'+itemId,{
          method:'DELETE',
          headers:{
            token:userToken
          },
        })
        const data=await res.json()
       await getWishlist()
        setIsLoading(false)
      }
  return (
    <>
          <Image src={item?.imageCover ||'/placeholder.webp'} className="w-32 h-32 object-cover rounded-lg" alt={item.product?.title} width={128} height={128}/>
          <div className="flex-1 space-y-1">
            <h2 className="text-lg font-semibold">{item?.title}</h2>
          </div>
          <div className="text-right flex flex-col gap-2">
            <p className="font-medium">{item.price||0} EGP</p>
             <Dialog>
        <DialogTrigger asChild>
                <button className="text-red-500 text-sm cursor-pointer">Remove</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove Item</DialogTitle>
            <DialogDescription>Are You Sure</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={(e)=>deleteItemFromWishlist(item._id)} disabled={isLoading}>{isLoading?<Spinner/>:'Delete'}</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
          <AddToCard productId={item._id}/>
          </div>
    </>
  )
}
