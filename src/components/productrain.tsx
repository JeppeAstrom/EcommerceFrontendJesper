'use client'

import ProductCard from "@/components/productcard";
import { Product } from "@/types/product";

import { NextPage } from "next";
import { useEffect, useState } from "react";

import Dropdown from "@/app/icons/dropdown";
import SideNavigation from "./side-navigation";


interface Props {
products: Product[];
category?: string;
}


const ProductRain:NextPage<Props> =  ({products, category})  => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const sideMenuItems = [
    {
      href: "",
      title: "",
    },
    { href: "", title: "" },
  ];
 
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
        {isOpen && (
          <SideNavigation
            activeRoute={`/${category}`} 
            sideMenuItems={sideMenuItems}
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