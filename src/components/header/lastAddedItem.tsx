/* eslint-disable @next/next/no-img-element */
import { Context } from "@/app/context/cartContext";
import CloseIcon from "@/app/icons/closeIcon";
import { Product } from "@/types/product";
import { NextPage } from "next";
import Image from "next/image";


interface Props {
showHeader: boolean;
showNotification: boolean;
lastAddedItem: Product;
clearLastAddedItem: () => void;
handleOpenCart: () => void;
}

const LastAddeditem:NextPage<Props> = ({ showNotification, lastAddedItem, clearLastAddedItem, handleOpenCart}) => {

return(
    <>
{lastAddedItem && showNotification && (
<div className="absolute right-2 md:right-10 top-0 shadow-lg w-[320px] md:w-[380px] z-[30] bg-white gap-4">
<div className="flex justify-between gap-4 pt-4 px-4 items-center">
<span className="text-lg font-semibold">Tillagd</span>
<CloseIcon onClick={clearLastAddedItem} className="w-8 h-8"/>
</div>
<div className="flex w-full flex-row py-3 px-4">
    <div className="w-2/4">
    <figure className="min-w-full min-h-full aspect-[9/13]">
    <Image width={1300} height={900} alt="" src={lastAddedItem.images[0].imageUrl} className="w-full h-full object-contain"/>
    </figure>
    </div>
    <div className="flex flex-col pl-2 w-fit mr-6 justify-center">
    <div className="flex justify-between">
    <span className="text-serif font-semibold line-clamp-2">{lastAddedItem.name}</span>
  
    </div>
    <span className="text-sm line-clamp-1">{lastAddedItem.description}</span>
        <div className="justify-between flex pt-1 mt-auto">
        <span className="text-sm font-semibold">{lastAddedItem.price} kr</span>
        </div>
   
    </div>
    
    </div>
    <div className="px-5 pb-2 bg-white">
    <button onClick={() => handleOpenCart()} className="w-full bg-black flex items center justify-center font-semibold text-white p-3">
    Varukorg
    </button>
    </div>
</div> 
 )}
</>
)
}

export default LastAddeditem;