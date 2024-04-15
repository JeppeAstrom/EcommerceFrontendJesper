/* eslint-disable @next/next/no-img-element */
import { Context } from "@/app/context/cartContext";
import CloseIcon from "@/app/icons/closeIcon";
import Minus from "@/app/icons/minus";
import Plus from "@/app/icons/plus";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Image from "next/image";
import { useContext } from "react";

interface Props {
product: Product
quantity:number
}

const CheckoutCard:NextPage<Props> = ({product, quantity}) => {

    const context = useContext(Context);

    const { removeFromCart, handleAddToCart}: any= context;

   return(<>
    <div className="flex flex-row p-4 w-full items-center justify-center">
        
    <div className="lg:w-1/5 w-1/3 items-center flex justify-center p-4">
 
    <figure className="aspect-[9/13] bg-white items-center justify-center flex min-w-full min-h-full">
        
    <Image width={1300} height={900} alt="" src={product.images[0].imageUrl} className="object-contain object-center min-h-full min-w-full"/>
    
    </figure>
    
  </div>
    <div className="flex flex-col pl-2 w-2/3">
    <div className="flex justify-between">
    <span className="text-serif font-semibold line-clamp-2">{product.name}</span>

    </div>
    
    <span className="text-sm line-clamp-3 font-light">{product.description} </span>
    
        <div className="justify-between flex pt-1">
        <span className="text-sm font-semibold">{product.price}SEK</span>
        <div className="gap-2 flex justify-end w-full items-center">
        {quantity && (
        <div className="flex border border-black w-[80px] text-sm py-1">
       <p className="text-sm justify-start ml-2">{quantity} </p>
       <div className="flex justify-end w-full gap-1">
    <button onClick={() => removeFromCart(product)}>
            <Minus className="w-5 h-5"/>
        </button>
        <button onClick={() => handleAddToCart(product, 'YES')}>
            <Plus className="w-5 h-5"/>
        </button>
        </div>
        </div>
         )}
   
        </div>
        </div>
   
    </div>
    </div>
    </>)
}
export default CheckoutCard;