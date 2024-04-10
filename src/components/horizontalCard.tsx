/* eslint-disable @next/next/no-img-element */
import { Context } from "@/app/context";
import CloseIcon from "@/app/icons/closeIcon";
import Minus from "@/app/icons/minus";
import Plus from "@/app/icons/plus";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Image from "next/image";
import { useContext } from "react";

interface Props {
product: Product
}

const HorizontalCard:NextPage<Props> = ({product}) => {

    const context = useContext(Context);

    const { removeFromCart, handleAddToCart}: any= context;

   return(<>
    <div className="flex flex-row p-4 w-full">
        
    <div className="w-1/3 items-center flex justify-center p-4">
 
    <figure className="aspect-[13/9] bg-white items-center justify-center flex min-w-full min-h-full">
        
    <Image width={1300} height={900} alt="" src={product.images[0].imageUrl} className="object-contain object-center min-h-full min-w-full"/>
    
    </figure>
    
  </div>
    <div className="flex flex-col pl-2 w-2/3">
    <div className="flex justify-between">
    <span className="text-serif font-semibold line-clamp-2">{product.name}</span>
     <div className="gap-2 flex justify-end w-full">
        <button onClick={() => removeFromCart(product)}>
            <Minus className="w-5 h-5"/>
        </button>
        <button onClick={() => handleAddToCart(product)}>
            <Plus className="w-5 h-5"/>
        </button>
        </div>
    </div>
    <span className="text-sm line-clamp-3 font-light">{product.description}</span>
        <div className="justify-between flex pt-1">
        <span className="text-sm font-semibold">{product.price}SEK</span>
     
   
        </div>
   
    </div>
    </div>
    </>)
}
export default HorizontalCard;