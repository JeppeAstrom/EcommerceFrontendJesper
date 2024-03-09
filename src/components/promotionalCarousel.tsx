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
  const [visibleItems, setVisibleItems] = useState(4); // Default number of visible items
  const [itemWidth, setItemWidth] = useState(0); // State to hold the dynamic width of each item
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true); // New state to track if the carousel is at the start
  const [isAtEnd, setIsAtEnd] = useState(false); 

  const updateVisibleItemsAndWidth = () => {
    let visible = 4; // Default visible items
    if (window.innerWidth >= 1024) {
      visible = slidesDesktop;
    } else if (window.innerWidth >= 768) {
      visible = slidesTablet;
    } else {
      visible = slidesPhone;
    }
    setVisibleItems(visible);

    // Calculate the width of each item based on the carousel width and the number of visible items
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemWidth = containerWidth / visible;
      setItemWidth(itemWidth);
    }
  };
  
  const updateArrowVisibility = (scrollPosition:number) => {
    if (carouselRef.current) {
      const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      setIsAtStart(scrollPosition === 0);
      setIsAtEnd(scrollPosition >= maxScrollLeft);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateVisibleItemsAndWidth);
    updateVisibleItemsAndWidth(); // Initial update
    return () => window.removeEventListener('resize', updateVisibleItemsAndWidth);
  }, []);

  const scrollCarousel = (direction:'next' |'prev') => {
    if (carouselRef.current) {
      const scrollAmount = itemWidth; // Use the dynamically set item width for scrolling
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
      <div className="flex py-6 sm:px-2 flex-col gap-2">
        <span className="text-xl font-semibold">{title}</span>
       
      </div>

      <div className="flex items-center relative">
      { !isAtStart && <ArrowLeft onClick={() => scrollCarousel('prev')} className="w-8 h-8 left-0 bg-gray-400 absolute cursor-pointer z-10" /> }
        <div className="overflow-x-hidden hide-scroll-bar lg:w-[1400px] md:w-[768px] sm:w-[600x]" ref={carouselRef}>
       <div className="flex items-center justify-start">
            {promotion.map((promotion, index) => (
                 <div
                 key={index}
                 className="flex-shrink-0 flex-col flex items-center justify-center bg-white"
                 style={{ width: `${itemWidth}px` }}
               >
                  <img src={promotion.promotionImage} className="transition-all h-[800px] object-cover w-full" />
              </div>
            ))}
          </div>
        </div>
        { !isAtEnd && <ArrowLeft onClick={() => scrollCarousel('next')} className="w-8 h-8 right-0 bg-gray-400 absolute cursor-pointer z-5 rotate-180" /> }
      </div>
    </div>
  );
};

export default PromotionalCarousel;