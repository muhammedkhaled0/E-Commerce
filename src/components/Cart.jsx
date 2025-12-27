'use client'
import React, { useContext, useState } from 'react'
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
import { CartContext } from './context/CartContext'
export default function Cart({item,userToken,getCart,setTotalPrice}) {
  const[isLoading,setIsLoading]=useState(false)
  const[isLoadingChangeQunatity,setisLoadingChangeQunatity]=useState(false)
    const [count, setCount] = useState(item.count);
    const {cartData,setCartData}=useContext(CartContext)
      async function editQuantity(itemId,value) {
        setisLoadingChangeQunatity(true)
        const newCount = count + value;
        const res=await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+itemId,{
          method:'PUT',
          headers:{
            token:userToken,
            'content-type':'application/json'
          },
          body:JSON.stringify({count:newCount})
        })
        const data=await res.json()
        setTotalPrice(data.data.totalCartPrice)
        setisLoadingChangeQunatity(false)
        setCount(newCount);

    }
      async function deleteItem(itemId) {
        setIsLoading(true)
        console.log(itemId);
        const res=await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+itemId,{
          method:'DELETE',
          headers:{
            token:userToken
          },
        })
        const data=await res.json()
        console.log(data);
        setCartData(data)
        setIsLoading(false)
      }
  return (
    <>
          <Image src={item.product?.imageCover ||'/placeholder.webp'} className="w-32 h-32 object-cover rounded-lg" alt={item.product?.title} width={128} height={128}/>
          <div className="flex-1 space-y-1">
            <h2 className="text-lg font-semibold">{item.product?.title}</h2>
          {/* <p className="text-gray-500 text-sm">{item.product?.category.name}<br/>{item.product?.brand.name}</p> */}
            {isLoadingChangeQunatity?<Spinner/>:
            <div className="flex items-center gap-3 mt-3 lg:justify-start justify-center">
              <button className="px-3 py-1 border rounded cursor-pointer" disabled={Boolean(count==1)} onClick={()=>editQuantity(item.product._id,-1)}>-</button>
              <span className="text-lg">{count}</span>
              <button className="px-3 py-1 border rounded cursor-pointer" onClick={()=>editQuantity(item.product._id,1)}>+</button>
            </div>}
          </div>
          <div className="text-right flex flex-col gap-2">
            <p className="font-medium">{item.price||0} EGP</p>
             <Dialog>
        <DialogTrigger asChild>
                <button className="text-red-500 text-sm cursor-pointer">Remove</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>Are You Sure</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={(e)=>deleteItem(item.product._id)} disabled={isLoading}>{isLoading?<Spinner/>:'Delete'}</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
          </div>
    </>
  )
}
