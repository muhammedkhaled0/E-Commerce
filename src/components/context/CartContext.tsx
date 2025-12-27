'use client'
import { CartI } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext=createContext<{
    cartData:CartI|null,
    setCartData:(value: null|CartI)=>void,
    contextLoading:boolean,
    getCart:()=>void,
    userToken:string
}>({
    cartData:null,
    setCartData:()=>{},
    contextLoading:false,
    getCart:()=>{},
    userToken:""
})

export function CartContextProvider({children}:{children:ReactNode}){
    const [cartData,setCartData]=useState <CartI|null>(null)
    const [contextLoading,setContextLoading]=useState(false)
    const [userToken,setUserToken]=useState("")
    
    useEffect(()=>{
        async function fetchToken() {
            const res = await fetch('/api/get-token')
            const data = await res.json()
            setUserToken(data.token)
        }
        fetchToken()
    },[])
    
    async function getCart() {
        if(!userToken) return
        try{
            setContextLoading(true)
            const res=await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:{
                     token:userToken,
                }
            })
            setContextLoading(false)
            const data:CartI=await res.json()
            setCartData(data)
        }
        catch(error){
            console.log(error);
            setContextLoading(false)
        }
    }
    
    useEffect(()=>{
        if(userToken){
            getCart()
        }
    },[userToken])
    
    return <CartContext.Provider value={{cartData,setCartData,contextLoading,getCart,userToken}}>
        {children}
    </CartContext.Provider>
}