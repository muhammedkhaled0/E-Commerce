'use server'

import { getUserToken } from "@/app/Helpers/getUserToken";

export async function addToCartAction(productId:string){
    
    
    const token:string=await getUserToken()
        const res=await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
        method:"POST",
         body: JSON.stringify({ productId }),
        headers:{
            token:token,
            'content-type':'application/json',
        }
    })
    const data=await res.json()
    return data;
}