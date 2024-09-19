import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { BiCategoryAlt } from "react-icons/bi";

export default function ProductItem({product}) {
  return (
    <>
   
  <Link href={`/productDetails/${product?.id}`}>
   <div className='shadow-md overflow-hidden rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer'>
     <Image src={product?.attributes?.banar.data.attributes.url} alt="course image" width={600} height={600} className=' w-full object-cover h-[170px]'/>
   <article className=' flex justify-between items-center p-3  bg-white'>
   <div>
   <h2 className=' text-base uppercase text-primary font-medium line-clamp-1'>{product?.attributes?.title}</h2>
   <h2 className=' text-xs uppercase text-gray-600 font-medium flex items-center gap-x-2'><BiCategoryAlt/> {product?.attributes?.category}</h2>
   </div>
   <span className='text-base uppercase text-primary font-medium'>{product?.attributes?.price} $</span>
   </article>
   </div> 
  </Link>
  
   </>
  )
}
