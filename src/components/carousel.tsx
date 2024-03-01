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
import { useContext, useEffect, useRef, useState } from "react";

interface Props {
products: Product[]
title?: string;
}

const Carousel: NextPage<Props> = ({ products, title }) => {
  const context = useContext(Context);
  const { handleAddToCart }: any = context;
  const [visibleItems, setVisibleItems] = useState(4); // Default to showing 4 items
  const carouselRef = useRef<HTMLDivElement>(null);

  const updateVisibleItems = () => {
    if (window.innerWidth >= 1024) {
      setVisibleItems(4);
    } else if (window.innerWidth >= 768) {
      setVisibleItems(3);
    } else {
      setVisibleItems(1);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateVisibleItems);
    updateVisibleItems();
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / visibleItems;
      const currentScroll = carouselRef.current.scrollLeft;
      carouselRef.current.scrollTo({
        left: direction === 'next' ? currentScroll + scrollAmount : currentScroll - scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-10">
      <div className="flex py-6 flex-col gap-2">
        <span className="text-xl font-semibold">{title}</span>
        <span>Köp dessa produkter</span>
      </div>

      <div className="flex items-center relative">
        <ArrowLeft onClick={() => scrollCarousel('prev')} className="w-8 h-8 left-0 bg-gray-400 absolute cursor-pointer z-10" />
        <div className="overflow-x-auto hide-scroll-bar lg:w-[1400px] md:w-[768px] sm:w-[600x]" ref={carouselRef}>
          <div className="flex items-center justify-start">
            {products.map((product, i) => (
              <div key={i} className="flex-shrink-0 flex-col lg:h-[365px] lg:w-[350px] md:w-[256px] w-[400px] flex items-center justify-center bg-white">
              
               
                <Link href={`/produkter/${product.id}`}>
                  
                  <img src={product.image} className="transition-all sm:w-[400px] lg:w-[200px] md:w-[200px] h-[300px]" />
                </Link>
      
             
              </div>
            ))}
          </div>
        </div>
        <ArrowLeft onClick={() => scrollCarousel('next')} className="w-8 h-8 right-0 bg-gray-400 absolute cursor-pointer z-10 rotate-180" />
      </div>
    </div>
  );
};

export default Carousel;