'use client'

import ProductCard from "@/components/productcard";
import { Product } from "@/types/product";
import { GetAllProducts } from "@/utils/productService";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import FilterBar from "./filterBar";


interface Props {
products: Product[];
}


const ProductRain:NextPage<Props> =  ({products})  => {

   
  return(<>
  <div className="mb-10">
  <div className="flex items-center justify-center"> 
  <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-2 md:gap-7 p-2 gap-x-2  md:p-4 items-center justify-between">
    {products.map((product, index) => (
      <div key={index}>
        <ProductCard product={product}/>
         </div>
    ))}
  </div>
 

  </div>
  </div>
  </>)
}

export default ProductRain;