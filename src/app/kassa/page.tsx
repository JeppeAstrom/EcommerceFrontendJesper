'use client'
import { useContext, useState } from "react";
import { Context } from "../context";
import { Product } from "@/types/product";
import HorizontalCard from "@/components/horizontalCard";
import ProductCard from "@/components/productcard";
import Dropdown from "../icons/dropdown";
import CheckoutCard from "@/components/checkoutCard";

const Checkout = () => {


    const context = useContext(Context);

    const { cartItems  }:any = context;

    const [toggleBag, setToggleBag] = useState<boolean>(true);

    const handleToggleBag = () => setToggleBag(prev => !prev);

    if (cartItems.length === 0) {
        return <div className="flex justify-center">Tom varukorg</div>;
    }
    
 
    
    return(
   
    <div className="flex flex-col justify-center items-center">
        <button className="flex items-center mx-auto justify-center w-full" onClick={handleToggleBag}>
        <Dropdown className={`w-10 h-10 ${toggleBag ? 'rotate-180' : ''}`}/>
        <span>{`Shopping bag ${cartItems !== undefined && cartItems.length}`}</span>
        </button>
    
        
        {toggleBag && (
        <div className="relative overflow-y-auto items-center justify-center lg:w-2/4 md:max-h-[600px]">
        {(cartItems as Product[]).map((product, index) => (
              <CheckoutCard key={index} product={product}/>
        ))}
        </div>
        )}
             
      <div className={`w-full justify-center flex bottom-0 md:bottom-10 ${toggleBag ? 'sticky' : 'absolute'}`}>
    <button className="w-full md:w-[400px] md:rounded-xl bg-red-400 p-3 font-serif">Köp nu</button>
    </div>
    </div>
 
    )
}
export default Checkout