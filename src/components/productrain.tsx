'use client'

import ProductCard from "@/components/productcard";
import { Product } from "@/types/product";
import { GetAllProducts } from "@/utils/productService";
import { NextPage } from "next";
import { useEffect, useState } from "react";


interface Props {
products: Product[];
}

const categories:string[] = ["electronics",
"jewelery",
"men's clothing",
"women's clothing"]

const ProductRain:NextPage<Props> =  ({products})  => {
 
  const [items, setItems] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>();
  useEffect(() => {
    setItems(products);
  }, [products]);

  const handlerCategory = (category:string) =>{
    setItems(products.filter(i => i.category === category))
    setCurrentCategory(category);
  }

  return(<>
  	
    <div className="py-10">
    <div className="items-center w-full justify-center gap-6 pt-2 hidden sm:flex md:hidden lg:flex">
    {categories.map((category, index) => (
       <span onClick={() => handlerCategory(category)}    className={"border p-4 text-lg" + (currentCategory ? (currentCategory === category && " p-5 border-black") : "")}  key={index}>{category}</span>
   ))}
    <span onClick={() => {
      setCurrentCategory(undefined);
      setItems(products)}} className="border p-4 text-lg">Alla</span>
    </div>
  <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-7 pt-10">
    {items.map((product, index) => (
      <div key={index}>
        <ProductCard product={product}/>
         </div>
    ))}
  </div>
  </div>
  </>)
}

export default ProductRain;