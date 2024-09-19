import Link from 'next/link';
import React from 'react'
import { TbRosetteDiscountCheck } from "react-icons/tb";

export default function paymentSuccess() {
  return (
    <>
    <section className='px-3 text-center'>
    <TbRosetteDiscountCheck className=' m-auto text-9xl text-green-600'/>
    <h2 className=' text-primary'>Payment Successful !</h2>
    <p className=' text-gray-500 my-5'>We sent an email with your order confirmation along with Digital Content</p>
    <Link href="/" className='px-2 py-1 bg-primary text-white rounded-lg tracking-wide	 hover:tracking-widest duration-200 '>
     Go To Home
    </Link>
    </section>
    </>
  )
}
