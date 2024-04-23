/* eslint-disable @next/next/no-img-element */

import { Context } from "@/app/context/cartContext";
import Dropdown from "@/app/icons/dropdown";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Image from "next/image";

import Link from "next/link";
import { useState, useRef, useEffect, useContext } from "react";

interface Props {
  product: Product;
  toggleModal:() => void;
}

const QuickShopCard: NextPage<Props> = ({ product, toggleModal}) => {

  const {
    handleAddToCart,
  }: any = useContext(Context);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeSelect = (size: string) => {
  
    setSelectedSize(size);
  };



  return (
    <>
      <div className="flex flex-row p-2 lg:p-2 py-3 w-full">
        <div className="w-full items-center flex mb-auto pl-3">
          <Link href={'/produkter/' + product.id} className="aspect-[9/13] mb-auto bg-white items-center justify-center flex min-w-full h-full">
            <Image
              width={1300}
              height={900}
              alt=""
              src={product.images[0].imageUrl}
              className="object-contain object-center min-h-full min-w-full"
            />
          </Link>
        </div>
        <div className="flex flex-col pl-2 w-full relative">
          <div className="flex justify-between">
            <span className="text-serif font-semibold line-clamp-2 pr-8">
              {product.name}
            </span>
          </div>

          <span className="text-sm line-clamp-3 font-light pr-8 pt-1">
            {product.description}
          </span>
          <span className="text-sm font-semibold">
              {product.price} kr
            </span>
            <div className="pt-4 pr-8">
              {product.sizes.length > 0 && (
                <div className="relative">
                    <ul className=" w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-white cursor-pointer">
                      {product.sizes.map((size, index) => (
                        <li
                          key={index}
                          className={`p-3 border gap-1 ${selectedSize && selectedSize === size.size && 'bg-gray-100' }`}
                          onClick={() => handleSizeSelect(size.size)}
                        >
                       <span className='text-black text-lg font-sans items-center flex justify-center'> {size.size}</span>
                        </li>
                      ))}
                    </ul>
                 
                </div>
                
              )}
            <div className="mt-5">
                <button
                  onClick={() =>{ 
                    const productWithSize = {
                      ...product,
                      chosenSize: selectedSize
                    };
                    if(selectedSize){
                    handleAddToCart(productWithSize);
                    toggleModal();
                    }
                   
                  }}
                  className="border w-full p-3 bg-black text-white font-semibold"
                >
                  Handla
                </button>
              </div>
            
            </div>
          </div>
         </div>
    </>
  );
};
export default QuickShopCard;
