
import { CartContext } from "@/components/context/CartContext"
import { BrandI } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
export default async function page() {
    const res=await fetch('https://ecommerce.routemisr.com/api/v1/brands',{
  })
  const data=await res.json()
  const brands:BrandI[]=data.data
  return (
    <>

      <h1 className="text-3xl font-bold my-10">Brands</h1>
      {
        brands?<div className="mx-4 mt-4 grid lg:grid-cols-4 md:grid-cols-3 gap-3">
          {brands.map((brand)=> 
          <Link href={'brands/'+brand?._id+'/'+brand?.slug} key={brand?._id}>
          <div  className="border-2 hover:shadow-xl transition-all duration-500 cursor-pointer">
         <Image src={brand?.image} width={500} height={500} alt={brand?.name} className="w-full"/>
      <h2 className="text-3xl font-bold my-10 text-center">{brand?.name}</h2>
        </div>
        </Link>
      )}
      </div>:''
}
    </>
  )
}
