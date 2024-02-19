'use client'
import { Context } from "@/app/context";
import ArrowLeft from "@/app/icons/arrowleft";
import BuyIcon from "@/app/icons/buyicon";
import HeartIcon from "@/app/icons/hearticon";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { Product } from "@/types/product";
import { NextPage } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface Props {
products: Product[]
title?: string;
}

const Carousel:NextPage<Props> = ({products, title}) => {
 

    const context = useContext(Context);

    const {handleAddToCart}:any= useContext(Context)
    const [index, setIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(4); // Default to desktop view
  
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1024) { // Desktop
        setVisibleItems(4);
      } else if (window.innerWidth >= 768) { // Tablet
        setVisibleItems(2);
      } else { // Mobile
        setVisibleItems(1);
      }
    };
  
    useEffect(() => {
      window.addEventListener('resize', updateVisibleItems);
      updateVisibleItems(); 
      return () => window.removeEventListener('resize', updateVisibleItems);
    }, []);
  
    const handlePrev = () => {
      if (index > 0) {
        setIndex(prevIndex => prevIndex - 1);
      }
    };
  
    const handleNext = () => {
      if (index + visibleItems < products.length) {
        setIndex(prevIndex => prevIndex + 1);
      }
    };
  
    return (
      <div className="">
        
        <div className="flex text-xl font-semibold py-6 justify-center">{title}</div>

        <div className="flex pb-6">
        <div className="flex items-center">
        {index !== 0 && <ArrowLeft onClick={handlePrev} className="w-8 h-8 left-0" />}
        </div>
          <div className="flex items-center h-auto relative w-full justify-evenly">
            {products.slice(index, index + visibleItems).map((product, i) => ( 
              <div key={i} className="relative">
                <BuyIcon product={product} onClick={() => handleAddToCart(product)} className="w-6 h-6 top-0  cursor-pointer left-0 absolute" />
                <Link href={'/produkter/' + product.id}>
                <img alt="" src={product.image} className="lg:h-[320px] lg:w-[251px] h-[416px] p-6 transition-all" />
                </Link>
                <HeartIcon className="w-6 h-6 right-0 absolute top-0" />
              </div>
            ))}
          
          </div>
          <div className="flex items-center">
            
              {index + visibleItems < products.length && <ArrowLeft onClick={handleNext} className="w-8 h-8  right-0 rotate-180" />}
            </div>
        </div>
      </div>
    );
  };
export default Carousel;