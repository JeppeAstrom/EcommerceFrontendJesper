"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import CartModal from "./cartmodal";
import CartIcon from "@/app/icons/cartIcon";




const Header = ()  => {
const [toggleCart, setToggleCart] = useState<boolean>(false);
const handlerToggleCart = () => setToggleCart(prev => !prev)
    return(
        
            <div className="grid grid-cols-3 p-6 items-center justify-center">
            <div className="flex">DropshippingGods</div>
          
            <input className="items-center flex justify-center border p-2 rounded-md border-amber-400" placeholder="Sök product, kategori eller varumärke"/>

            
            <div className="ml-auto flex items-baseline gap-8">
           
             <Link className="" href="/favoriter">Favoriter</Link>
             <button className="" onClick={handlerToggleCart}><CartIcon className="w-[25px] h-[25px]"/></button>
             
             {toggleCart && (
             <>
            <CartModal handleToggleCart={handlerToggleCart}/>
             </>
             )}
          
             </div>
      
            </div>
           
    )
   
}
export default Header