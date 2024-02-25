/* eslint-disable @next/next/no-img-element */
import { Context } from "@/app/context";
import CloseIcon from "@/app/icons/closeIcon";
import Minus from "@/app/icons/minus";
import Plus from "@/app/icons/plus";
import { Product } from "@/types/product";
import { NextPage } from "next";
import { useContext } from "react";

interface Props {
product: Product
}

const HorizontalCard:NextPage<Props> = ({product}) => {

    const context = useContext(Context);

    const { removeFromCart, handleAddToCart}: any= context;

   return(<>
    <div className="flex flex-row p-2  py-5">
    <figure className="w-1/4">
    <img alt="" src={product.image} className="w-full h-full"/>
    </figure>
    <div className="flex flex-col pl-2 w-3/4">
    <div className="flex justify-between">
    <span className="text-serif font-semibold line-clamp-2">{product.title}</span>
  
    </div>
    <span className="text-sm line-clamp-3">{product.description}</span>
        <div className="justify-between flex pt-1">
        <span className="text-sm">{product.price} kr</span>
        <div className="gap-2 flex items-center">
        <button onClick={() => removeFromCart(product)}>
            <Minus className="w-5 h-5"/>
        </button>
        <button onClick={() => handleAddToCart(product)}>
            <Plus className="w-5 h-5"/>
        </button>
        </div>
   
        </div>
   
    </div>
    </div>
    </>)
}
export default HorizontalCard;