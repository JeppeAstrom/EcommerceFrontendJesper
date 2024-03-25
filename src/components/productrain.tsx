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
  <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-7 items-center justify-between">
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