"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import CartModal from "./cartmodal";




const Header = ()  => {
const [toggleCart, setToggleCart] = useState<boolean>(false);
const handlerToggleCart = () => setToggleCart(prev => !prev)
    return(
        <div className="flex justify-between p-4">
            <div className="">DropshippingGods</div>
            {toggleCart ?(
            <CartModal handleToggleCart={handlerToggleCart}/>
            ) : (
             <div className="flex gap-8">
             <Link href="/favoriter">Favoriter</Link>
             <button onClick={handlerToggleCart}>Varukorg</button>
             </div>
             )}
        </div>
    )
   
}
export default Header