import React from 'react'
import ProductItem from './ProductItem'

export default function ProductList({productList}) {
  return (
    <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
        {productList.map(item=>(
            <ProductItem key={item.id} product = {item}/>
        ))}
    </div>
  )
}
