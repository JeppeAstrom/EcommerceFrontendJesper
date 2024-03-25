/* eslint-disable @next/next/no-img-element */
import { Context } from "@/app/context";
import CloseIcon from "@/app/icons/closeIcon";
import { Product } from "@/types/product";
import { NextPage } from "next";
import { useContext, useEffect } from "react";

interface Props {
showHeader: boolean;
showNotification: boolean;
lastAddedItem: Product;
clearLastAddedItem: () => void;
}

const LastAddeditem:NextPage<Props> = ({ showNotification, lastAddedItem, clearLastAddedItem}) => {



return(
    <>
{lastAddedItem && showNotification && (
<div className="absolute right-0 top-0 shadow-lg w-[400px] z-[30] bg-white">
<div className="flex justify-between pt-4 px-4 items-center">
<span className="text-lg">Produkt tillagd</span>
<CloseIcon onClick={clearLastAddedItem} className="w-8 h-8"/>
</div>
<div className="flex flex-row p-2 shadow-lg rounded-md py-5">
    <div className="w-1/4 p-4">
    <figure className="min-w-full min-h-full aspect-[9/13]">
    <img alt="" src={lastAddedItem.images[0].imageUrl} className="w-full h-full object-contain"/>
    </figure>
    </div>
    <div className="flex flex-col pl-2 w-3/4">
    <div className="flex justify-between">
    <span className="text-serif font-semibold line-clamp-2">{lastAddedItem.name}</span>
  
    </div>
    <span className="text-sm line-clamp-3">{lastAddedItem.description}</span>
        <div className="justify-between flex pt-1">
        <span className="text-sm">{lastAddedItem.price}SEK</span>
        </div>
   
    </div>
    </div>

</div> 
 )}
</>
)
}

export default LastAddeditem;