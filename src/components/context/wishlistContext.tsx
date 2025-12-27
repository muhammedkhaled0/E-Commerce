'use client'
import { wishlistI } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const WishlistContext=createContext<{
    wishlistData:wishlistI|null,
    setWishlistData:(value: null|wishlistI)=>void,
    contextLoading:boolean,
    getWishlist:()=>void,
    userToken:string
}>({
    wishlistData:null,
    setWishlistData:()=>{},
    contextLoading:false,
    getWishlist:()=>{},
    userToken:""
})

export function WishlistContextProvider({children}:{children:ReactNode}){
    const [wishlistData,setWishlistData]=useState <wishlistI|null>(null)
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
    async function getWishlist() {
        if(!userToken) return
        try{
            setContextLoading(true)
            const res=await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
                headers:{
                     token:userToken,
                }
            })
            setContextLoading(false)
            const data:wishlistI=await res.json()
            setWishlistData(data)
        }
        catch(error){
            console.log(error);
            setContextLoading(false)
        }
    }
    useEffect(()=>{
        if(userToken){
            getWishlist()
        }
    },[userToken])
    return <WishlistContext.Provider value={{wishlistData,setWishlistData,contextLoading,getWishlist,userToken}}>
        {children}
    </WishlistContext.Provider>
}