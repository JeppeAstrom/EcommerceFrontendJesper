/* eslint-disable @next/next/no-img-element */
'use client'

import { Context } from "@/app/context";
import BuyIcon from "@/app/icons/buyicon";
import HeartIcon from "@/app/icons/hearticon";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";

interface Props {
  product: Product
}


const ProductCard:NextPage<Props> = ({product}) => {

    const {handleAddToCart}:any= useContext(Context)
  
return(<>
    <div className="flex flex-col rounded shadow-lg max-w-sm items-center justify-center">
    <div className="p-4 rounded-xl items-center justify-center flex flex-col">
     <div className="flex justify-between relative w-full">
    <button onClick={() => handleAddToCart(product)}>
      <BuyIcon  className="absolute right-0 w-6 h-6"/>
    </button>

    <button>
    <HeartIcon className="h-6 w-6 absolute left-0"/>
    </button>
    </div>
    <figure className="p-2 aspect-w-9 aspect-h-13 h-[250px] w-[200px] overflow-hidden bg-white flex justify-center items-center">
    <Link href={'/produkter/' + product.id}>
        <img alt="" src={product.image} className="max-w-full max-h-full object-contain transition-all"/>
    </Link>
    </figure>



   
    
    <span className="line-clamp-1 text-md font-sans">{product.title}</span>
    <div className="pt-3 flex  relative p-4 w-full">
    <span className="text-sm absolute left-0">{product.price}$</span>
    <Link href='/kassa' onClick={() => handleAddToCart(product, 'NO')} className="absolute right-0 bg-red-200 rounded-xl w-[100px] items-center justify-center flex">Köp nu</Link>
    </div>
    
    </div>
    </div>
    
</>)
}
export default ProductCard;