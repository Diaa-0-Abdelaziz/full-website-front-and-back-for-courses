"use client";
import React, { useEffect, useState } from 'react'
import Product_Details from './Product_Details';
import BreadCrumbs from './breadCrumbs';
import { usePathname } from 'next/navigation';
import ProductApis from '../../_utility/ProductApis';
import ProductList from '../../products/ProductList';

export default function ProductDetails({params}) {
    const [proDetails, setProductDetails] = useState({})
    const [proList, setProductList] = useState([])
    let path =  usePathname()
    useEffect(() => {
        getLatestProductById_()
       
    }, [params?.productID])



    const getLatestProductById_ = ()=>{
        ProductApis.getProductsById(params?.productID).then(res=>{
            console.log(res.data.data)
            setProductDetails(res?.data?.data)
            getProductListByCategory(res?.data?.data)
        })
    }
    const getProductListByCategory = (product)=>{
        ProductApis.getProductsByCategory(product?.attributes.category).then(res=>{
            console.log(res.data.data)
            setProductList(res?.data?.data)
        })
    }
  return (
    <div>
        <BreadCrumbs path={path}/>
        <Product_Details product = {proDetails}/>

        <ProductList productList = {proList}/>
    </div>
  )
}
