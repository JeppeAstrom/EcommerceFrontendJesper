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
    <figure className="p-4">
    <img className="w-full h-full" src={product.image}/>
    </figure>
    <div className="flex flex-col">
    <span className="text-md line-clamp-1">{product.title}</span>
    <span className="text-sm line-clamp-1 font-light">{product.description}</span>
    <span className="text-sm pt-1">{product.price} kr</span>
    </div>

</Link>
    </>)
}
export default SearchResultCard;