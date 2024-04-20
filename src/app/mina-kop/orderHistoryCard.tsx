/* eslint-disable @next/next/no-img-element */

import { Product } from "@/types/product";
import { NextPage } from "next";
import Image from "next/image";
import { useContext } from "react";
import { Context } from "../context/cartContext";


interface Props {
  product: Product;
  size:string;
}

const OrderHistoryCard: NextPage<Props> = ({ product, size }) => {
  const context = useContext(Context);
  const { handleAddToCart }: any = context;
  return (
    <>
      <div className="flex flex-row p-2 lg:p-2 py-3 pr-6 w-full">
        <div className="w-2/4 items-center flex justify-center pl-3">
          <figure className="aspect-[9/13] bg-white items-center justify-center flex min-w-full h-full">
            <Image
              width={1300}
              height={900}
              alt=""
              src={product.images[0].imageUrl}
              className="object-contain object-center min-h-full min-w-full"
            />
          </figure>
        </div>
        <div className="flex flex-col pl-2 w-full relative">
          <div className="flex justify-between">
            <span className="text-serif font-semibold line-clamp-2 max-w-[200px] lg:max-w-[300px] md:max-w-[500px]">
              {product.name}
            </span>
          </div>
         
          <span className="text-sm line-clamp-3 font-light max-w-[200px] lg:max-w-[300px] md:max-w-[500px]">
            {product.description}
          </span>

          <span className="pt-2 font-semibold">
           Storlek: {size}
          </span>

          <div className="justify-between flex pt-1">
            <span className="text-sm font-semibold absolute bottom-0 left-2">
              {product.price} kr
            </span>
          
            <div className="gap-2 flex justify-end w-full items-center absolute right-0 bottom-0">
            <button onClick={() => {
              product.chosenSize = product.chosenSize = size;
              handleAddToCart(product)}} className="border p-2 md:p-3 bg-black font-semibold text-white md:w-[120px] w-[100px] text-center">Köp igen</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderHistoryCard;
