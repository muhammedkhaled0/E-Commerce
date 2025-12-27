import AddToCard from '@/components/AddToCard';
import { CardFooter } from '@/components/ui/card';
import { ProductI } from '@/interfaces'
import Star from '@/Star/Star';
import { HeartIcon } from 'lucide-react';
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
export default async function page({ params }: any) {
    const resolvedParams = await params;
    const { brandDetails } = resolvedParams;
    console.log(brandDetails);
    const res=await fetch("https://ecommerce.routemisr.com/api/v1/products")
    const data=await res.json()
    const products:ProductI[]=data.data
    const specificProducts:ProductI[]=[]
    for(let i=0;i<products.length;i++){
         if (products[i].brand._id==brandDetails[0]) {
            specificProducts.push(products[i])
         }
    }
    console.log(specificProducts);
  return (
    <div className='mx-4'>
      <h1 className="text-3xl font-bold my-10 capitalize">{brandDetails[1]}</h1>
      {specificProducts.length>0?
      <div className='grid lg:grid-cols-4 md:grid-cols-3 mx-5 gap-4'>
        {
      specificProducts.map((product)=>
      <div key={product._id} className='border-2 rounded-[10px] pb-7 px-5'>
        <Link href={"/products/"+product._id}>
          <Image src={product?.imageCover} width={600} height={600} className='w-full mb-4' alt={product?.title}/>
          <span className='text-gray-700 capitalize object-cover text-[14px]'>{brandDetails[1]}</span>
          <p className='font-bold text-xl'>{product.description.split(' ',2).join(' ')}</p>
          <span className='text-gray-700 capitalize object-cover text-[14px]'>{product?.category.name}</span>
          <div className='flex mb-4'>
          <Star/>
          <Star/>
          <Star/>
          <Star/>
          <span>({product.ratingsAverage})</span>
          </div>
          <p className='text-2xl font-bold mb-7'>EGP {product.price}</p>
          </Link>
  <CardFooter className='p-0'>
          <AddToCard productId={product._id}/>
          <HeartIcon/>
          </CardFooter>
      </div>
      )
    }
      </div>
      :<h2 className='text-center top-1/2 -translate-y-1/2 font-bold text-3xl'>No Products For This Brand</h2>}
    </div>
  )
}