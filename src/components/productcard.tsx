/* eslint-disable @next/next/no-img-element */
"use client";

import { Context } from "@/app/context/cartContext";
import BuyIcon from "@/app/icons/buyicon";
import CartIcon from "@/app/icons/cartIcon";
import HeartIcon from "@/app/icons/hearticon";
import { Product, ProductGroup } from "@/types/product";
import { GetProductGroup } from "@/utils/productService";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface Props {
  product: Product;
}

const ProductCard: NextPage<Props> = ({ product }) => {
  const {
    handleAddToCart,
    getFavouritesFromLocalStorage,
    addProductToFavouritesLocalStorage,
  }: any = useContext(Context);

  const [productGroup, setProductGroup] = useState<ProductGroup | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ProductGroup: ProductGroup = await GetProductGroup(
          product.id as any
        );
        setProductGroup(ProductGroup);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [product.id]);

  const [favourite, setFavourite] = useState<boolean>(false);
  const toggleFavourite = () => {
    addProductToFavouritesLocalStorage(product);
    setFavourite(!favourite);
  };
  useEffect(() => {
    const favouriteProducts: Product[] = getFavouritesFromLocalStorage();
    setFavourite(favouriteProducts.some((p) => p.id === product.id));
  }, [getFavouritesFromLocalStorage, product.id]);

  return (
    <>
      <div className="flex flex-col max-w-sm items-center justify-center">
        <div className="p-4 items-center justify-center flex flex-col w-full relative">
          <HeartIcon
            onClick={() => toggleFavourite()}
            favourite={favourite}
            className="h-8 w-8 cursor-pointer absolute right-6 top-5 z-[5]"
          />

          <Link
            className="min-w-full flex min-h-full aspect-9/13 items-center justify-center relative"
            href={"/produkter/" + product.id}
          >
            <Image
              width={900}
              height={1300}
              alt=""
              src={product.images[0] ? product.images[0].imageUrl : ""}
              className="object-contain transition-all min-h-full  min-w-full object-center items-center justify-center"
            />
          </Link>

          <span className="line-clamp-1 font-sans text-start w-full text-md font-light pt-2">
            {product.name}
          </span>

          <div className="flex relative w-full justify-between">
            <div>
              <span className="text-sm font-sans font-light">
                {product.price}SEK
              </span>
            </div>
          </div>
          <div className="flex justify-start items-start mr-auto gap-1 pt-1">
            {productGroup &&
              productGroup.products &&
              productGroup.products.length > 0 &&
              [...productGroup.products]
                .sort((a, b) => {
                  if (a.id === product.id) return -1;
                  if (b.id === product.id) return 1;
                  return 0;
                })
                .map((variant) => (
                  <Link
                    href={`/produkter/${variant.id}`}
                    style={{ background: variant.color }}
                    className="w-4 h-4 rounded-full border border-gray-700"
                    key={variant.id}
                  ></Link>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
