"use client";
import ArrowLeft from "@/app/icons/arrowleft";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { Product } from "@/types/product";
import { Image } from "@/types/product";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Props {
  products: Product[] | Image[];
  type?: "PRODUCTS" | "IMAGES";
  currentProduct?: Product;
  slidesDesktop: number;
  slidesTablet: number;
  slidesPhone: number;
}

const Carousel: NextPage<Props> = ({
  products,
  slidesDesktop,
  slidesTablet,
  slidesPhone,
  type = "PRODUCTS",
  currentProduct,
}) => {
  const [visibleItems, setVisibleItems] = useState(1);
  const [itemWidth, setItemWidth] = useState(400); 
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true); 
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [pageWidth, setPageWidth] = useState<number>();
  const updateArrowVisibility = (scrollPosition: number) => {
    if (carouselRef.current) {
      const maxScrollLeft =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      setIsAtStart(scrollPosition <= 0);
      setIsAtEnd(scrollPosition >= maxScrollLeft - 1);
    }
  };

  useEffect(() => {
    setPageWidth(window.innerWidth);
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

    window.addEventListener("resize", updateVisibleItemsAndWidth);
    updateVisibleItemsAndWidth(); // Initial update
    return () =>
      window.removeEventListener("resize", updateVisibleItemsAndWidth);
  }, [slidesDesktop, slidesPhone, slidesTablet]);

  const scrollCarousel = (direction: "next" | "prev") => {
    if (carouselRef.current) {
      const scrollAmount = itemWidth; // Use the dynamically set item width for scrolling
      const currentScroll = carouselRef.current.scrollLeft;
      const newScrollPosition =
        direction === "next"
          ? currentScroll + scrollAmount
          : currentScroll - scrollAmount;
      carouselRef.current.scrollTo({
        left: newScrollPosition, // Use newScrollPosition here
        behavior: "smooth",
      });
      updateArrowVisibility(newScrollPosition);
    }
  };

  return (
    <div className={`${type === 'IMAGES' && 'lg:w-2/4'}`}>
      <div className="flex items-center relative">
        {!isAtStart  &&
           (products as Image[]).length > 1 &&  (
          <ArrowLeft
            onClick={() => scrollCarousel("prev")}
            className="w-8 h-8 left-0 bg-gray-400 absolute cursor-pointer z-10"
          />
        )}
  
        <div
          ref={carouselRef}
          className="flex items-center justify-start bg-white min-h-full min-w-full overflow-x-hidden hide-scroll-bar relative"
        >
          {products.map((product, index) => (
            <Link
              key={index}
              style={{ width: `${itemWidth}px` }}
              className={` bg-white ${
                (pageWidth && pageWidth < 768) || type === "IMAGES"
                  ? "min-w-full"
                  : "w-[200px] lg:h-[400px]"
              }`}
              href={`/produkter/${
                type === "PRODUCTS" ? product.id : currentProduct?.id
              }`}
            >
              <figure className="bg-white aspect-[9/13] items-center flex">
              <img
                width={900}
                height={1300}
                src={
                  type === "PRODUCTS"
                    ? (product as Product).images[0].imageUrl
                    : (product as Image).imageUrl
                }
                className="transition-all max-h-full max-w-full object-contain"
              />
           </figure>
            </Link>
          ))}
        </div>

        {!isAtEnd  &&
           (products as Image[]).length > 1 &&  (
              <ArrowLeft
                onClick={() => scrollCarousel("next")}
                className="w-8 h-8 right-0 bg-gray-400 absolute cursor-pointer z-10 rotate-180"
              />
            )}
      </div>
    </div>
  );
};

export default Carousel;
