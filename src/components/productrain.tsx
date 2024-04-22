'use client'

import ProductCard from "@/components/productcard";
import { Product } from "@/types/product";

import { NextPage } from "next";
import { useEffect, useState } from "react";

import Dropdown from "@/app/icons/dropdown";
import SideNavigation from "./side-navigation";
import { ChildCategories } from "@/utils/productService";
import SideMenuProductRain from "./sideMenuProductRain";


interface Props {
products: Product[];
category?: string;
childCategories?: ChildCategories[]
}


const ProductRain:NextPage<Props> =  ({products, category, childCategories})  => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const toggleMenu = () => setIsOpen((prev) => !prev);
 
  return(<>
  <div className="mb-10">

  <div className="flex justify-center"> 
  {category && (
  <div className="lg:min-w-[150px] hidden lg:flex lg:flex-col">
        <button
          onClick={toggleMenu}
          className="flex gap-2 md:mt-16 text-normal text-black font-sans"
        >
          <span className="border-b border-black">{category}</span>
          <Dropdown
            className={`w-7 h-7 ${
              isOpen ? "rotate-180 transition-all" : "transition-all"
            }`}
          />
        </button>
        {isOpen && childCategories && childCategories.length > 0 && (
          <SideMenuProductRain
            activeRoute={`/${category}`} 
            childCategories={childCategories}
          />
        )}
      </div>
        )}
  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 md:gap-7 p-2 gap-x-2  md:p-4 items-center justify-between">
    
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