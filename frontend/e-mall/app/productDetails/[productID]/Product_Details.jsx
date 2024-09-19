import Image from 'next/image'
import React, { useContext } from 'react'
import { FaCartPlus } from "react-icons/fa6";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CartApis from '../../_utility/CartApis'
import { CartContext } from '../../_Context/CartContext';
export default function Product_Details({product}) {
  const {cart, setCart} = useContext(CartContext)
  const {user} = useUser();
  const router = useRouter();
  const handleClick =()=>{
   if(!user){
    router.push('/sign-in')
   }else{
       const data = {
        data:{
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id]
        }
       }
       CartApis.addToCart(data).then(res=>{
        console.log('cart created successfully')
        console.log(res)
        setCart(oldcart =>[
          ...oldcart,
          {
            id: res?.data?.data?.id,
            product
          }
        ])
       }).catch(error=>{
        console.log(error)
       })
   }
  }
  console.log(product)
  return (
    <>
    <section className='mt-10 md:p-10 p-5'>
      {product?.attributes ?
         <>
         <div className='grid md:grid-cols-2 grid-cols-1 gap-20'> 

         
        <Image src={product?.attributes?.banar?.data?.attributes?.url} alt={product.attributes.banar.data.attributes.name} width={600} height={600} className=' rounded-lg'/>
       <div>
        <h2 className=' my-5 text-primary uppercase'> {product?.attributes?.title} </h2>
        <h2 className='my-5 text-gray-400'> {product?.attributes?.category} </h2>
        <h2 className='my-5 text-gray-600'> {product?.attributes?.description[0]?.children[0]?.text} </h2>
        <p className=' flex items-center gap-2 capitalize text-base text-gray-400'> {product?.attributes?.instantDelivery ? <TbRosetteDiscountCheck className=' text-xl text-green-500'/> : <MdOutlineReportGmailerrorred className='text-xl text-yellow-300'/> }   eligible for instant delivery</p>
        <h2 className='my-5 text-gray-400'> $ {product?.attributes?.price} </h2>
       <button onClick={()=>handleClick()} className=' flex items-center gap-5 bg-primary p-2 rounded-lg border-2 border-primary text-white hover:bg-white hover:text-primary duration-300  capitalize'> <FaCartPlus/> add to cart</button>
       </div>
       </div>


       
        </>
       : 
       <div className=" p-4  h-96 w-full">
  <div className="animate-pulse space-x-4 grid md:grid-cols-2 grid-cols-1 gap-20 mt-10 md:p-10 p-5 h-full">
    <div className="rounded-lg bg-slate-700 h-full w-full"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="">
        
        <div className="h-2 my-5 p-1 bg-slate-700 rounded w-10"></div>
        <div className="h-2 my-5 p-1 bg-slate-700 rounded w-20"></div>
        <div className="h-2 my-5 p-1 bg-slate-700 rounded w-16"></div>
        <div className="h-2 my-5 p-1 bg-slate-700 rounded w-28"></div>
        <div className="h-2 my-5 p-1 bg-slate-700 rounded w-10"></div>
        <div className="h-2 my-5 py-4 bg-slate-700 rounded w-24"></div>
      </div>
    </div>
  </div>
      </div>
       }
       
    </section>
   
    </>
  )
}
