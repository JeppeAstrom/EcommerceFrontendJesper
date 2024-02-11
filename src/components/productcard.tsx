'use client'

import { Context } from "@/app/context";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";

interface ProductTest {
  product: Product
}


const ProductCard:NextPage<ProductTest> = ({product}) => {

    const {handleAddToCart} = useContext(Context)
  
return(<>
    <div className="flex flex-col rounded shadow-lg max-w-sm">
    <div className="p-4 rounded-xl">
    <figure className="aspect-w-9 aspect-h-13 overflow-hidden h-[400px]">
    <Link href={'/produkter/' + product.id}>
    <img src={product.image} className="w-full h-full object-fit"/>
    </Link>
    </figure>
    <div className="p-4">
 
    <span className="line-clamp-1 text-md">{product.title}</span>

    
 
   
    
    <div className="pt-3 flex justify-between">
    <span className="text-sm">{product.rating.rate} av 5</span>
    <span className="text-sm">{product.price}</span>

    </div>

    </div>
    </div>
    <button onClick={() => handleAddToCart(product)} className="w-full p-2 rounded-md bg-amber-400 h-full hover:bg-amber-700">Köp</button>
    </div>
    
</>)
}
export default ProductCard;