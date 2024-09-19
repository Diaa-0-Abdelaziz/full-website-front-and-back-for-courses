"use client"
import React,{useContext, useEffect, useState} from 'react';
import { TbClockHour3 } from "react-icons/tb";
import { RiMenu3Line } from "react-icons/ri";

import { GrLocation } from "react-icons/gr";

import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import logo from '../imgs/logoipsum-253.svg';
import { GoDotFill } from "react-icons/go";
import { GoDot } from "react-icons/go";
import { PiPhoneLight } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { MdOutlineShoppingCart } from "react-icons/md";
import { CartContext } from '../_Context/CartContext';
import CartApis from '../_utility/CartApis';
import Cart from "../Cart/Cart"
export default function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false)
 const {userId} = useAuth();
 const {user} = useUser();
    let path =  usePathname()
    const [openCart, setOpenCart] = useState(false)
  const {cart, setCart} = useContext(CartContext);
useEffect(() => {
  user&&getCartItems()

}, [user])

  const getCartItems =()=>{
    CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(res=>{
      console.log(res?.data?.data)
      res?.data?.data.forEach(cartItem =>{
        setCart((oldCart)=>[
          ...oldCart,
          {
            id: cartItem.id,
            product: cartItem?.attributes?.products?.data[0]
          }
        ])
      })
    })
  }
    let navLinks = [
      {
        pathname:'/',
        navName:'Home'
      },
      {
        pathname:'/explore',
        navName:'Explore'
      },
      {
        pathname:'/projects',
        navName:'Projects'
      },
      {
        pathname:'/about',
        navName:'About us'
      },
      {
        pathname:'/contact',
        navName:'Contact us'
      },
    ]








    const handleMenu = ()=>{
        setToggleMenu(!toggleMenu)
    }
    const handleCloseMenu = ()=>{
        setToggleMenu(false)
    }
  return (
    <>
 
    <nav className='bg-[#ffffff00] py-5 relative '>
      <div className="justify-around flex container m-auto ">
        <div className='flex gap-2 items-center'> <Image src={logo} alt='logo' width={150} height={70}/></div>
        <ul className={`z-50 flex lg:flex-row flex-col gap-4 text-lg	font-normal	 lg:static lg:w-auto lg:bg-transparent absolute left-0 bg-white w-full ${toggleMenu ? 'h-80' : 'h-0'} lg:h-auto duration-500 overflow-hidden top-full lg:shadow-none shadow-md`}>
         
         {navLinks.map((link, index) =>
        
        <li className=' flex items-center cursor-pointer' key={index}>
          
          {path === link.pathname ? <GoDotFill className=' text-primary'/> : <GoDot className=' text-secondary'/>}
          <Link className={` ${path === link.pathname ? 'text-primary font-bold' : 'text-secondary font-bold'} hover:text-primary transition-all duration-200`} href={link.pathname} onClick={handleCloseMenu}>{link.navName}</Link></li>
        )}
          
       <li>
        <ul className=' text-primary font-semibold flex gap-x-5 xl:mx-24 mx-auto w-fit'>
          {!userId ? 
          <>
          <li className=' border-2 border-primary rounded-md px-2 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200'><Link href="/sign-in">Login</Link></li>
          <li className=' border-2 border-primary rounded-md px-2 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200'><Link href="/sign-up">Sign up</Link></li>
          </>
          :
           ''
          }
            
        </ul>
       </li>
        </ul>
        <div className=' flex items-center gap-5'>
        {userId ?
        <>
      
        <div onClick={()=>setOpenCart(!openCart)} className='  flex items-end m-2 cursor-pointer rounded-full'>
    <MdOutlineShoppingCart className='text-3xl text-primary'/>
    <p className=' bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text  font-extrabold text-transparent'>{cart?.length}</p>
    
    </div> 
    <Link href="/profile"><UserButton/></Link> 
    </>
    :
    ''
     }
        <i className='lg:hidden block text-primary text-4xl cursor-pointer' onClick={handleMenu}>
        {!toggleMenu ?<RiMenu3Line /> : <IoClose/>}
        </i>
        </div>
      </div>
    </nav>

    {userId ?
    openCart &&
    <Cart/>
    : ''}
    </>
  )
}