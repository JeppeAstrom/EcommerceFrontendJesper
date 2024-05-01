/* eslint-disable @next/next/no-img-element */

import { Context } from "@/app/context/cartContext";
import Dropdown from "@/app/icons/dropdown";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Image from "next/image";

import Link from "next/link";
import { useState, useRef, useEffect, useContext } from "react";
import Carousel from "./carousel";
import { CartItem } from "@/utils/cartService";

interface Props {
  product: Product;
  toggleModal:() => void;
}

const QuickShopCard: NextPage<Props> = ({ product, toggleModal}) => {

  const {
    handleAddToCart,
  }: any = useContext(Context);
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes[0].size);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  },[error])

  const handleSizeSelect = (size: string) => {
  
    setSelectedSize(size);
  };



  return (
    <>
      <div className="flex flex-row p-2 lg:p-2 py-3 w-full">
        <div className="w-full items-center flex mb-auto pl-3">
          <Link href={'/produkter/' + product.id} className="aspect-[9/13] mb-auto bg-white items-center justify-center flex min-w-full h-full">
            <Carousel visibleSlidesCountDesktop={1} visibleSlidesCountMobile={1} visibleSlidesCountTablet={1} hideArrows={true}>
              {product.images.map((image, index) => (
            <Image
             key={index}
              width={1300}
              height={900}
              alt=""
              src={image.imageUrl}
              className="object-contain object-center min-h-full min-w-full"
            />
          ))}
            </Carousel>
          </Link>
        </div>
        <div className="flex flex-col pl-2 w-full relative">
          <div className="flex justify-between">
            <span className="text-serif font-semibold line-clamp-2 pr-8">
              {product.name}
            </span>
          </div>

          <span className="text-sm line-clamp-2 pr-8 pt-1">
            {product.description}
          </span>
          <span className="text-sm font-bold">
              {product.price} kr
            </span>
            <div className="pt-4 mr-8">
              {product.sizes.length > 0 && (
                <div className="relative">
                    <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2 min-w-full cursor-pointer">
                      {product.sizes.map((size, index) => (
                        <div key={index}>
                        <li
                          className='p-3 border border-black  justify-center flex items-center'
                          onClick={() => handleSizeSelect(size.size)}
                        >
                       <span className='text-black text-normal items-center flex justify-center'> {size.size}</span>
                        </li>
                        <div
                            className={`inline-block w-full h-[2px] ${
                              selectedSize === size.size ? "bg-black" : "bg-gray-300"
                            }`}
                          ></div>
                          </div>
                      ))}
                    </ul>
                 
                </div>
                
              )}
            <div className="mt-5">
                <button
                  onClick={() =>{ 
                    const cartItem:CartItem = {
                      id: product.id,
                      name:product.name,
                      imageUrl:product.images[0].imageUrl,
                      description:product.description,
                      productId: product.id,
                      quantity: product.quantity,
                      price:product.price,
                      chosenSize: selectedSize ? selectedSize : product.ChosenSize
                    }
                    handleAddToCart(cartItem, product);
                    toggleModal();
                  }}
                  className={`border w-full p-3 bg-black text-white font-semibold ${error ? 'transition-all scale-105' : 'transition-all'}`}
            
                >
                <span> {`${error ? 'Välj storlek' : 'Handla'}`}</span>
                </button>
              </div>
            
            </div>
          </div>
         </div>
    </>
  );
};
export default QuickShopCard;
