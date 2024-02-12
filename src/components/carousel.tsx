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
      updateVisibleItems(); // Initial check
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
      <div>
        <div className="flex items-center justify-center text-xl font-semibold py-6">{title}</div>
        <div className="flex justify-center items-center pb-6">
          <div className="flex items-center h-auto relative w-full justify-between">
            {products.slice(index, index + visibleItems).map((product, i) => (
              <div key={i} className="relative">
                <HeartIcon className="w-6 h-6 left-0 absolute" />
                <Link href={'/produkter/' + product.id}>
                <img alt="" src={product.image} className="lg:h-[320px] lg:w-[251px] h-[416px] p-6 hover:scale-105 transition-all" />
                </Link>
                <BuyIcon product={product} onClick={() => handleAddToCart(product)} className="w-6 h-6 top-0 right-0 absolute cursor-pointer" />
              </div>
            ))}
            <div className="top-3/5 mb-10">
              {index !== 0 && <ArrowLeft onClick={handlePrev} className="w-8 h-8 absolute left-0" />}
              {index + visibleItems < products.length && <ArrowLeft onClick={handleNext} className="w-8 h-8 absolute right-0 rotate-180" />}
            </div>
          </div>
        </div>
      </div>
    );
  };
export default Carousel;