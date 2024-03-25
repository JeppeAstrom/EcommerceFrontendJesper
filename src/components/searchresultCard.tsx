/* eslint-disable @next/next/no-img-element */
import { Context } from "@/app/context";
import CloseIcon from "@/app/icons/closeIcon";
import Minus from "@/app/icons/minus";
import Plus from "@/app/icons/plus";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";

interface Props {
product: Product
}

const SearchResultCard:NextPage<Props> = ({product}) => {

   return(<>
<Link href={'/produkter/' + product.id} className="flex flex-col">
    <figure className="p-4 aspect-[9/13] h-full w-full bg-white">
    <img alt={product.name} className="w-full h-full object-contain" src={product.images[0].imageUrl}/>
    </figure>
    <div className="flex flex-col">
    <span className="text-md line-clamp-1">{product.name}</span>
    <span className="text-sm line-clamp-1 font-light">{product.description}</span>
    <span className="text-sm pt-1">{product.price}SEK</span>
    </div>

</Link>
    </>)
}
export default SearchResultCard;