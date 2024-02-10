"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import CartModal from "./cartmodal";
import CartIcon from "@/app/icons/cartIcon";
import dropshiplogo from '../../app/images/dropshiplogo.png'



const Header = ()  => {
const [toggleCart, setToggleCart] = useState<boolean>(false);
const handlerToggleCart = () => setToggleCart(prev => !prev)    
    return(
        <>  
       
             <div className="grid grid-cols-3 p-3 items-center justify-center">
           <div>Dropshippa med oss!</div>
             <Link href='/' className="items-center flex justify-center">
               <img className="h-[100px]" src="https://i.ibb.co/rfctdQj/testlogo2.png"/>
             </Link>
          <div className="ml-auto flex items-center gap-8">
           <Link className="" href="/favoriter">Favoriter</Link>
        <CartIcon openCart={handlerToggleCart} className="w-[25px] h-[25px] cursor-pointer" />
           {toggleCart && (
          <CartModal handleToggleCart={handlerToggleCart}/>
           )}
           </div>
            </div>



            <div className="flex items-center justify-center w-full">
          
          
            <input className="items-center flex justify-center w-2/4 border px-4 p-2 rounded-xl border-black" placeholder="Sök product, kategori eller varumärke"/>

            
         
            </div>
        
            </>
    )
   
}
export default Header