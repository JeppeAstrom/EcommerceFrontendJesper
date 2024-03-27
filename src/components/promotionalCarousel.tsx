'use client'
import ArrowLeft from "@/app/icons/arrowleft";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { Promotion } from "@/types/promotion";
import { NextPage } from "next";

import { useEffect, useRef, useState } from "react";

interface Props {
promotion: Promotion[]
title?: string;
slidesDesktop: number;
slidesTablet:number;
slidesPhone: number;
}

const PromotionalCarousel: NextPage<Props> = ({ promotion, title, slidesDesktop, slidesTablet, slidesPhone }) => {
  const [visibleItems, setVisibleItems] = useState(4);
  const [itemWidth, setItemWidth] = useState(700);  
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true); 
  const [isAtEnd, setIsAtEnd] = useState(false); 

  const updateArrowVisibility = (scrollPosition: number) => {
    if (carouselRef.current) {
      const maxScrollLeft =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      setIsAtStart(scrollPosition <= 0);
      setIsAtEnd(scrollPosition >= maxScrollLeft - 1); 
    }
  };

  useEffect(() => {
    const updateVisibleItemsAndWidth = () => {
      let visible = 4; 
      if (window.innerWidth >= 1024) {
        visible = slidesDesktop;
      } else if (window.innerWidth >= 768) {
        visible = slidesTablet;
      } else {
        visible = slidesPhone;
      }
      setVisibleItems(visible);
  
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        const itemWidth = containerWidth / visible;
        setItemWidth(itemWidth);
      }
    };
    window.addEventListener('resize', updateVisibleItemsAndWidth);
    updateVisibleItemsAndWidth();
    return () => window.removeEventListener('resize', updateVisibleItemsAndWidth);
  }, );

  const scrollCarousel = (direction:'next' |'prev') => {
    if (carouselRef.current) {
      const scrollAmount = itemWidth; 
      const currentScroll = carouselRef.current.scrollLeft;
      const newScrollPosition = direction === 'next' ? currentScroll + scrollAmount : currentScroll - scrollAmount;
      carouselRef.current.scrollTo({
        left: direction === 'next' ? currentScroll + scrollAmount : currentScroll - scrollAmount,
        behavior: 'smooth',
      });
      updateArrowVisibility(newScrollPosition);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex py-6 sm:px-2 flex-col">
        <span className="text-xl font-semibold px-4">{title}</span>
       
      </div>

      <div className="flex items-center relative justify-center mx-auto">
      { !isAtStart && <ArrowLeft onClick={() => scrollCarousel('prev')} className="w-8 h-8 left-0 bg-gray-400 absolute cursor-pointer z-10" /> }
        <div className="overflow-x-hidden overflow-y-hidden hide-scroll-bar" ref={carouselRef}>
       <div className="flex items-center lg:justify-start">
            {promotion.map((promotion, index) => (
                 <div
                 key={index}
                 className="flex-shrink-0 flex-col flex items-center justify-center px-2"
                 style={{ width: `${itemWidth}px` }}
               >
              
                <figure className="aspect-[9/13] min-w-full  justify-center items-center flex h-[500px] bg-gray-300">
                  <img src={promotion.promotionImage} className="transition-all object-contain min-h-full min-w-full" />
                  </figure>
              
              </div>
            ))}
          </div>
        </div>
        { !isAtEnd &&  <ArrowLeft onClick={() => scrollCarousel('next')} className={`w-8 h-8 right-0 bg-gray-400 absolute cursor-pointer z-5 rotate-180 ${slidesDesktop <= promotion.length && 'lg:hidden'} ${slidesTablet <= promotion.length && ' md:hidden'} ${slidesPhone <= promotion.length && 'sm:hidden'}`} /> }
      </div>
    </div>
  );
};

export default PromotionalCarousel;