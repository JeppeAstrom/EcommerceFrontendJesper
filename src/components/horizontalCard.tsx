/* eslint-disable @next/next/no-img-element */
import { Context } from "@/app/context";
import CloseIcon from "@/app/icons/closeIcon";
import { Product } from "@/types/product";
import { NextPage } from "next";
import { useContext } from "react";

interface Props {
product: Product
}

const HorizontalCard:NextPage<Props> = ({product}) => {

    const context = useContext(Context);

    const { removeFromCart}: any= context;

   return(<>
    <div className="flex flex-row p-2 shadow-lg rounded-md py-5">
    <figure className="w-1/4">
    <img alt="" src={product.image} className="w-full h-full"/>
    </figure>
    <div className="flex flex-col pl-2 w-3/4">
    <div className="flex justify-between">
    <span className="text-serif font-semibold">{product.title}</span>
    <CloseIcon onClick={() => removeFromCart(product)}  className="w-7 h-7 cursor-pointer "/>
    </div>
    <span className="text-sm line-clamp-2">{product.description}</span>
        <div className="justify-between flex pt-1">
        <span className="text-sm">{product.price} kr</span>
       
        </div>
   
    </div>
    </div>
    </>)
}
export default HorizontalCard;