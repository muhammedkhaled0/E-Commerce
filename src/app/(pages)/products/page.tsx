import Image from 'next/image';
import { ProductI } from '@/interfaces';
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Star from '@/Star/Star';
import { HeartIcon } from 'lucide-react';
import Link from 'next/link';
import AddToCard from '@/components/AddToCard';
import AddProductToWishlist from '@/components/wishlistServices/addProductToWishlist';
import WishlistToggle from '@/components/wishlistServices/WishlistToggle';
export default async function page() {
 const res=await fetch('https://ecommerce.routemisr.com/api/v1/products',{
  })
  const {data:products}:{data:ProductI[]}=await res.json()
  return (
    <>
    <div className='container mx-auto'>
                <div className="grid lg:grid-cols-5 md:grid-cols-4  sm:grid-cols-3 gap-3">   
       {products.map((product)=><div key={product._id}>
        <Card className='border-gray-400 border mx-4 md:mx-0'>
        <Link href={'products/'+product._id}>
      <Image src={product.imageCover} height={400} width={400} alt={product.title} className='w-full h-100 object-cover mb-4'/>
  <CardHeader>
    <CardTitle>{product.title.split(' ',2).join(' ')}</CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
    <CardAction>{product.brand.name}</CardAction>
    <p><span className='font-bold'>Price : </span>{product.price} EGP</p>
  </CardHeader>
  <div className='flex ms-4'>
  <Star/>
  <Star/>
  <Star/>
  <Star/>
  {product.ratingsAverage}
  </div>
        </Link>
  <CardFooter>
    <AddToCard productId={product._id}/>
    <WishlistToggle itemId={product._id} />
  </CardFooter>
</Card>
      </div>
    )}
    </div>
    </div>

    </>
  )
}
