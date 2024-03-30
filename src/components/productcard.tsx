/* eslint-disable @next/next/no-img-element */
"use client";

import { Context } from "@/app/context";
import BuyIcon from "@/app/icons/buyicon";
import HeartIcon from "@/app/icons/hearticon";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface Props {
  product: Product;
}

const ProductCard: NextPage<Props> = ({ product }) => {
  const { handleAddToCart, getFavouritesFromLocalStorage, addProductToFavouritesLocalStorage }: any = useContext(Context);

  const [favourite, setFavourite] = useState<boolean>(false);
  const toggleFavourite = () => {
    addProductToFavouritesLocalStorage(product);
    setFavourite(!favourite); // Toggle the state
  };
  useEffect(() => {
    const favouriteProducts:Product[] = getFavouritesFromLocalStorage();
    setFavourite(favouriteProducts.some(p => p.id === product.id));
  }, [product]);


  return (
    <>
      <div className="flex flex-col rounded-xl shadow-lg max-w-sm items-center justify-center">
        <div className="p-4 rounded-xl items-center justify-center flex flex-col w-full">
          <div className="flex justify-between relative w-full">
            <button onClick={() => toggleFavourite()}>
              <HeartIcon className={`h-6 w-6 absolute right-0 ${favourite ? "fill-red-400" : ''}`} />
            </button>

            <button onClick={() => handleAddToCart(product)}>
              <BuyIcon className="absolute left-0 w-6 h-6" />
            </button>
          </div>
          <Link className="min-w-full min-h-full" href={"/produkter/" + product.id}>
            <figure className="p-5 aspect-[9/13] min-h-full w-full bg-white flex justify-center items-center">
              <img
              width={900}
              height={1300}
                alt=""
                src={product.images[0] ? product.images[0].imageUrl : ""}
                className="object-contain transition-all min-h-full max-h-full min-w-full"
              />
            </figure>
          </Link>

          <span className="line-clamp-1 text-start w-full text-md font-light">
            {product.name}
          </span>

          <div className="pt-3 flex relative w-full justify-between">
            <div>
              <span className="text-sm font-sans font-light">{product.price}SEK</span>
            </div>
            <div>
              <Link
                href="/kassa"
                onClick={() => handleAddToCart(product, "NO")}
                className=" bg-red-200 rounded-xl w-[100px] items-center justify-center flex md:text-lg text-sm p-1"
              >
                Köp nu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
