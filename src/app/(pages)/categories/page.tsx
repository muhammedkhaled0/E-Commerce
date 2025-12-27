
import { CartContext } from "@/components/context/CartContext"
import { CategoryI } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
export default async function page() {
    const res=await fetch('https://ecommerce.routemisr.com/api/v1/categories',{
  })
  const data=await res.json()
  const categories:CategoryI[]=data.data
  return (
    <>

      <h1 className="text-3xl font-bold my-10">Categories</h1>
      {
        categories?<div className="mx-4 mt-4 grid lg:grid-cols-4 md:grid-cols-3 gap-3">
          {categories.map((category)=> 
          <Link href={'categories/'+category?._id+'/'+category?.slug} key={category?._id}>
          <div  className="border-2 hover:shadow-xl transition-all duration-500 cursor-pointer">
         <Image src={category?.image} width={500} height={500} alt={category?.name} className="w-full h-120"/>
      <h2 className="text-3xl font-bold my-10 text-center">{category?.name}</h2>
        </div>
        </Link>
      )}
      </div>:''
}
    </>
  )
}
