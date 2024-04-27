/* eslint-disable @next/next/no-img-element */
import { Context } from "@/app/context/cartContext";
import CloseIcon from "@/app/icons/closeIcon";
import Minus from "@/app/icons/minus";
import Plus from "@/app/icons/plus";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

interface Props {
product: Product
}

const SearchResultCard:NextPage<Props> = ({product}) => {

   return(<div>
<Link href={'/produkter/' + product.id} className="flex flex-col">
    <figure className="p-4 h-full w-full ">
    <Image width={1300} height={900} alt={product.name} className="w-full h-full aspect-9/13 object-contain" src={product.images[0].imageUrl}/>
    </figure>
    <div className="flex flex-col">
    <span className="text-md line-clamp-1">{product.name}</span>
    <span className="text-sm line-clamp-1 ">{product.description}</span>
    <span className="text-sm pt-1 font-bold">{product.price} kr</span>
    </div>
</Link>
    </div>)
}
export default SearchResultCard;