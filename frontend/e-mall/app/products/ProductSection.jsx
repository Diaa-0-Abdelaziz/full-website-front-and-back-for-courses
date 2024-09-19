"use client";
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import ProductApis from '../_utility/ProductApis'

export default function ProductSection() {
    const [productList, setProductList]= useState([])
    useEffect(()=>{
        getLatestProducts_();
    }, [])
    const getLatestProducts_ = ()=>{
        ProductApis.getLatestProducts().then(res=>{
            // console.log(res.data.data)
            setProductList(res.data.data)
        })
    }
  return (
   <>
   <div className=' px-5 py-10'> 
    <p className=' capitalize my-5 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-xl font-extrabold text-transparent'>our latest courses</p>
  
   
   <ProductList productList = {productList}/>

   </div>
   </>
  )
}
