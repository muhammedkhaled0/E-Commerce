import AddToCard from "@/components/AddToCard";
import MyCarousel from "@/components/MyCarousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductI } from '@/interfaces';
import Star from "@/Star/Star";
import { HeartIcon } from "lucide-react";
import { Params } from 'next/dist/server/request/params';
import Image from "next/image";
import React, { ReactNode } from 'react'

export default async function page({params}:{params:Params}) {
    const {productId}:{productId:string}=await params
    const res=await fetch('https://ecommerce.routemisr.com/api/v1/products/'+productId)
    const {data:product}:{data:ProductI}=await res.json()
    console.log(product);
    
  return (
    <>
        <Card className='grid md:grid-cols-2 items-center lg:w-[60%] md:w-[70%] mx-auto w-3/4'>
            <div>
                <MyCarousel images={product.images}/>
            </div>
            <div>
        <CardHeader>
            <CardTitle className='font-semibold'>{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
            <CardAction>{product.brand.name}</CardAction>
        </CardHeader>
        <CardContent className="md:mt-4">
            <div className="flex justify-between">
            <p><span className="font-semibold">Price : </span>{product.price}EGP</p>
            <p><span className="font-semibold">Quantity : </span>{product.quantity}</p>
            </div>
            <p className="mt-4 font-semibold text-gray-400">{product.category.name}</p>
            <div className="flex mb-4">
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <p className="text-gray-700 ms-3">({product.ratingsQuantity})</p>
            </div>
        </CardContent>
  <CardFooter className="md:mt-10">
    {
      productId?<AddToCard productId={productId}/>:''
    }
    <HeartIcon/>
  </CardFooter>
        </div>
        </Card>
      
    </>
  )
}
