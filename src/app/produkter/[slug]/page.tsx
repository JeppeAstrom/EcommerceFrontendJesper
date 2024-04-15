/* eslint-disable @next/next/no-img-element */
"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/app/context/cartContext";
import { GetProduct } from "@/utils/productService";
import { Product } from "@/types/product";
import { usePathname, useSearchParams } from "next/navigation"; // Import from next/navigation instead of next/router
import Link from "next/link";
import Carousel from "@/components/carousel";
import { useRouter } from "next/router";
import CarouselPDP from "@/components/carouselPDP";
import Image from "next/image";

const ProductPage = () => {
  const { handleAddToCart }: any = useContext(Context);
  const pageUrl = usePathname();
  const id = pageUrl.split("/").pop(); // Extract the id from the URL path

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const fetchedProduct: Product = await GetProduct(id);
          setProduct(fetchedProduct);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };
    fetchData();
  }, [id]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const wrapperRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setIsOpen(false);
  };
  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);
  if (!product) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        Loading...
      </div>
    );
  }
  const sizes = [
    { label: 'XS', extra: 'Påminn mig' },
    { label: 'S', extra: 'Långdistansvara 49,00 kr.' },
    { label: 'M', extra: 'Påminn mig' },
    { label: 'L', extra: 'Påminn mig' },
    { label: 'XL', extra: 'Långdistansvara 49,00 kr.' },
    { label: 'XXL', extra: 'Påminn mig' },
  ];
  return (
    <div className="flex w-3/4 justify-center items-center mx-auto mb-10">
      <div className="lg:flex w-full">
        <div className="aspect-[9/13] bg-white h-full w-full relative">
          <Carousel
            visibleSlidesCountDesktop={1}
            visibleSlidesCountMobile={1}
            visibleSlidesCountTablet={1}
          >
            {product.images.map((image, index) => (
              <figure
                key={index}
                className="aspect-[9/13] bg-white min-h-full min-w-full"
              >
                <Image
                  className="min-w-full object-center h-full object-contain"
                  width={900}
                  height={1300}
                  alt={product.name}
                  src={image.imageUrl}
                />
              </figure>
            ))}
          </Carousel>
        </div>
        <div className="lg:p-4 lg:px-6 relative">
          <span className="line-clamp-1 text-lg">
            {product.name}
          </span>
          <div className="mt-1">
            <span className="mt-4 text-lg font-semibold line-clamp-8 ">
              {product.description}
            </span>
          </div>
         <div className="pt-2">
          <span className="text-lg font-normal">{product.price} kr</span>
          </div>
          <div className="pt-4">
          <div ref={wrapperRef} className="relative" >
        <button className="border w-full text-start pl-4 p-2" onClick={toggleDropdown}>
        {selectedSize || 'Välj storlek'}
      </button>
      {isOpen && (
        <ul className="absolute border-l border-r w-full bg-white z-[2]">
          {sizes.map((size, index) => (
            <li key={index} className="p-3 border-b"
              onClick={() => handleSizeSelect(size.label)}>
              {size.label} — {size.extra}
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="pt-4 flex justify-center items-center">
      <button className="border w-full p-3 bg-black text-white font-semibold">Handla</button>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
