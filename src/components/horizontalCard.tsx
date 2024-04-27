/* eslint-disable @next/next/no-img-element */
import { Context } from "@/app/context/cartContext";
import CloseIcon from "@/app/icons/closeIcon";
import HeartIcon from "@/app/icons/hearticon";
import Minus from "@/app/icons/minus";
import Plus from "@/app/icons/plus";
import TrashCan from "@/app/icons/trashcan";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

interface Props {
  product: Product;
  quantity?: number;
  handleToggleCart?: () => void;
}

const HorizontalCard: NextPage<Props> = ({ product, quantity, handleToggleCart }) => {
  const context = useContext(Context);

  const { removeFromCart, handleAddToCart, removeAllOfSameItem }: any = context;

  return (
    <>
      <div className="flex flex-row p-2 lg:p-2 py-3 pr-6 w-full">
        <div className="w-2/4 items-center flex justify-center pl-3">
          <Link onClick={handleToggleCart} href={`/produkter/${product.id}`} className="aspect-[9/13] bg-white items-center justify-center flex min-w-full h-full">
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
            <span className="text-serif font-semibold line-clamp-1 max-w-[200px] lg:max-w-[300px] md:max-w-[500px]">
              {product.name}
            </span>
            <button className="lg:pr-2" onClick={() => removeFromCart(product)}>
              <TrashCan className="h-5 w-8" />
            </button>
          </div>

          <span className="text-sm line-clamp-1  max-w-[200px] lg:max-w-[300px] md:max-w-[500px]">
            {product.description}
          </span>
          {product.chosenSize && (
            <span className="md:pt-2 text-sm font-semibold">
            Storlek: {product.chosenSize}
           </span>
        )}
          <div className="justify-between flex pt-1">
            <span className="text-sm absolute bottom-0 left-2 font-bold">
              {product.price} kr
            </span>
            <div className="gap-2 flex justify-end w-full items-center">
              {quantity && (
                <div className="flex border border-black w-[80px] text-sm py-1 absolute right-2 bottom-0">
                  <p className="text-sm justify-start ml-2">{quantity} </p>
                  <div className="flex justify-end w-full gap-1">
                    <button onClick={() => removeFromCart(product)}>
                      <Minus className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleAddToCart(product, "YES")}>
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HorizontalCard;
