/* eslint-disable @next/next/no-img-element */
'use client'

import { Context } from "@/app/context";
import BuyIcon from "@/app/icons/buyicon";
import HeartIcon from "@/app/icons/hearticon";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";

interface ProductTest {
  product: Product
}


const ProductCard:NextPage<ProductTest> = ({product}) => {

    const {handleAddToCart}:any= useContext(Context)
  
return(<>
    <div className="flex flex-col rounded shadow-lg max-w-sm">
    <div className="p-4 rounded-xl">
      <div className="flex justify-between">
    <button onClick={() => handleAddToCart(product)}>
      <BuyIcon  className="w-6 h-6"/>
    </button>

    <button>
    <HeartIcon className="h-5 w-5"/>
    </button>
    </div>


    <figure className="aspect-w-9 aspect-h-13 overflow-hidden h-[400px]">
    <Link href={'/produkter/' + product.id}>
    <img alt="" src={product.image} className="w-full h-full object-fit"/>
    </Link>
    </figure>
   
    
    <span className="line-clamp-1 text-md font-sans pt-4">{product.title}</span>
   
    
    <div className="pt-3 flex justify-between">
    <span className="text-sm">{product.price}$</span>
    <span className="text-sm">{product.rating.rate} av 5</span>
    </div>
    
    </div>
    </div>
    
</>)
}
export default ProductCard;