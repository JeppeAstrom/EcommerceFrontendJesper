'use client'

import ProductCard from "@/components/productcard";
import { Product } from "@/types/product"
import { GetProduct } from "@/utils/productService";
import { NextPage } from "next";
import router from "next/dist/client/router";
import { useParams, usePathname } from "next/navigation";




const ProductPage = async () => {

   const pageUrl = usePathname();
   const id = pageUrl.split('/')
    const length = id.length;
    const test = id[length -1];
    
    const product:Product = await GetProduct(test);


return(
    

    <div className="flex items-center justify-center">
        
       
        <div className="grid grid-cols-2 w-1/2">
        <div className="shadow-lg p-8">
        <figure className="aspect-w-9 aspect-h-13 overflow-hidden h-[400px]">
        <img className="w-full h-full object-fit" src={product.image}/>
        </figure>
        </div>
        <div className="p-8 relative">
        <span className="line-clamp-1 border-b border-black">{product.title}</span>
        <div className="mt-2">
        <span className="mt-4 text-sm">{product.description}</span>
        </div>
       
        <div className="flex justify-between items-center">
        <button className="absolute bottom-0 right-0 w-[150px] h-[50px] rounded-xl bg-amber-400">Köp</button>
        <button className="absolute bottom-0">{product.price}kr</button>
        </div>
     
      
        </div>
        </div>
    </div>
  
    



)



}
export default ProductPage