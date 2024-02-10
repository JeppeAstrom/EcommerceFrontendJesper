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
    <div className="flex flex-col rounded shadow-lg max-w-sm p-4">
   
    <figure className="aspect-w-9 aspect-h-13 overflow-hidden h-[400px]">
    <Link href={'/produkter/' + product.id}>
    <img src={product.image} className="w-full h-full object-fit"/>
    </Link>
    </figure>
    <div className="p-4">
    <div className="w-full flex justify-between">
    <span className="line-clamp-1 w-2/3">{product.title}</span>
    <span>{product.price}</span>
    </div>
    
    <div className="pt-3 flex justify-between">
    <span>{product.rating.rate} av 5</span>
    <button onClick={() => handleAddToCart(product)} className="w-1/3 bg-amber-400 rounded h-full hover:bg-amber-700">Köp</button>
    </div>
    </div>

    </div>
    
</>)
}
export default ProductCard;