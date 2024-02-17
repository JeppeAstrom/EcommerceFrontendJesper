import { Context } from "@/app/context";
import { useContext, useEffect } from "react";
import ProductCard from "../productcard";
import { Product } from "@/types/product";
import HorizontalCard from "../horizontalCard";

const LastAddeditem = () => {


    const context = useContext(Context);

    const {lastAddedItem, clearLastAddedItem}:any = context;

   useEffect(() => {
    if (!lastAddedItem) return;
    const timer = setTimeout(() => {
        clearLastAddedItem();
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
}, [lastAddedItem, clearLastAddedItem]);

return(
    <>
{lastAddedItem && (
<div className="absolute right-0 top-0 shadow-lg w-[300px] z-[30] bg-white">
<span className="text-lg flex items-center justify-center pt-4">Produkt tillagd</span>
<div className="flex flex-row p-2 shadow-lg rounded-md py-5">
    <figure className="w-1/4">
    <img alt="" src={lastAddedItem.image} className="w-full h-full"/>
    </figure>
    <div className="flex flex-col pl-2 w-3/4">
    <div className="flex justify-between">
    <span className="text-serif font-semibold line-clamp-2">{lastAddedItem.title}</span>
  
    </div>
    <span className="text-sm line-clamp-3">{lastAddedItem.description}</span>
        <div className="justify-between flex pt-1">
        <span className="text-sm">{lastAddedItem.price} kr</span>
        </div>
   
    </div>
    </div>

</div> 
 )}
</>
)
}

export default LastAddeditem;