import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context";

interface Props {
    className?:string;
    openCart?: () => void;
    cartCount?:number;
    showCount?: boolean
}

const CartIcon:NextPage<Props> = ({className, openCart, cartCount, showCount}) => {



    return (
        <>
        <div onClick={openCart} className="flex relative cursor-pointer">
        <svg className={className}  xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"> 
        
        


        <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {showCount && (
        <svg className="absolute top-0 -mt-3 ml-5" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#000000" font-size="10" transform="translate(0, 1)">
        {cartCount ? cartCount : ""}
    </text>
    </svg>
    )}

        </div>


        </>
    )
}
export default CartIcon;