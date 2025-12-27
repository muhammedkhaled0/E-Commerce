'use client'
import React, { useContext, useState } from 'react'
import { Button } from './ui/button'
import { Loader, ShoppingCartIcon } from 'lucide-react'
import Spinner from './Spinner'
import toast from 'react-hot-toast'
import { CartContext } from './context/CartContext'
import { addToCartAction } from './addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AddToCard({productId}:{productId:string}) {
  const router=useRouter();
  const session=useSession()
  const [isLoading,setIsLoading] = useState(false)
  const {cartData,setCartData,userToken}=useContext(CartContext)
  async function addProductToCart(){
  if(session.status=='authenticated'){
    setIsLoading(true)
    const data=await addToCartAction(productId)
    data.status=='success'&&toast.success('Product Added Successfully')
    setIsLoading(false)
    setCartData(data)
  }
  else{
    router.push('login')
  }
}
  return (
    <>
      <Button className='grow me-2' disabled={isLoading} onClick={addProductToCart} >Add To Cart {isLoading?

<Spinner/>:<ShoppingCartIcon/>}</Button>
    </>
  )
}
