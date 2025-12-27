'use client'
import { Button } from "@/components/ui/button"
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

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useRef, useState } from "react"
import { CartContext } from "./context/CartContext"
import { Loader } from "lucide-react"
import Spinner from "./Spinner"
import toast from "react-hot-toast"
export function PaymentDialog({cartId}:{cartId:string}) {
    const [isLoading,setIsLoading]=useState(false)
    const [isLoadingCash,setIsLoadingCash]=useState(false)
    const userDetails= useRef <HTMLInputElement|null>(null)
    const userPhone=useRef <HTMLInputElement|null>(null)
    const userCity=useRef <HTMLInputElement|null>(null)
    const{userToken}=useContext(CartContext)
  async function checkoutSession(){
    setIsLoading(true)
    console.log(cartId);
    const shippingAddress={details:userDetails.current?.value,phone:userPhone.current?.value,city:userCity.current?.value}
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
    method:'POST',
    body:JSON.stringify({shippingAddress}),
    headers:{
        token:userToken,
        'content-type':'application/json',
    }
    })
    const data=await res.json()
    console.log(data);
    setIsLoading(false)
    if(data.status=='success'){
        window.location.href=data.session.url
    }
 }
   async function cashOrder(){
    setIsLoadingCash(true)
    console.log(cartId);
    const shippingAddress={details:userDetails.current?.value,phone:userPhone.current?.value,city:userCity.current?.value}
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
    method:'POST',
    body:JSON.stringify({shippingAddress}),
    headers:{
        token:userToken,
        'content-type':'application/json',
    }
    })
    const data=await res.json()
    console.log(data);
    setIsLoadingCash(false)
    if(data.status=='success'){
       toast.success('Cash payment completed successfully! Thank you for your purchase',{duration:10000})
    }
    else{
       toast.error("Can't do an order cash for this cart",{duration:5000})
    }
 }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
                <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-500 cursor-pointer">
          Proceed to Checkout
        </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
                Make sure that, you entered the correct data
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Detials</Label>
              <Input id="name-1" name="detaills"  ref={userDetails}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-2">Phone</Label>
              <Input id="name-2" name="phone"  ref={userPhone}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-3">City</Label>
              <Input id="name-3" name="city"  ref={userCity}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={checkoutSession} disabled={isLoading}>{isLoading?<Spinner/>:"Visa"}</Button>
            <Button type="submit" onClick={cashOrder}disabled={isLoadingCash}>{isLoadingCash?<Spinner/>:"Cash"} </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}