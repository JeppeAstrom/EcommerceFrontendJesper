'use client'
import { Context } from "@/app/context";
import ArrowLeft from "@/app/icons/arrowleft";
import BuyIcon from "@/app/icons/buyicon";
import HeartIcon from "@/app/icons/hearticon";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { Product } from "@/types/product";
import { NextPage } from "next";
import { useContext, useState } from "react";

interface Props {
products: Product[]
title?: string;
}

const Carousel:NextPage<Props> = ({products, title}) => {
 

    const context = useContext(Context);

    const {handleAddToCart}:any= useContext(Context)

const [index, setIndex] = useState<number>(0);

const handlerRight = (i:number) => {
setIndex(index + 1)
}

const handlerLeft = (i:number) => {
    setIndex(index -  1)
}

return(<>
    <div className="flex items-center justify-center text-pretty text-xl font-semibold py-6">{title}</div>
    <div className="flex justify-center items-center pb-6">
    <div className="flex items-center gap-8 h-auto relative w-full justify-center">
    <div className="relative"> <HeartIcon className="w-5 h-5 left-0 absolute"/>
    <img alt="" src={products[index].image} className="lg:h-[320px] lg:w-[251px] h-[516px] p-6"/>
    <BuyIcon product={products[index]} onClick={handleAddToCart} className="w-5 h-5 top-0 right-0 absolute cursor-pointer"/>
    </div>
    <div className="relative hidden sm:flex md:hidden lg:flex"> <HeartIcon className="w-5 h-5 left-0 absolute"/>
    <img alt="" src={products[index + 1].image} className="lg:h-[320px] lg:w-[251px] p-6"/>
    <BuyIcon product={products[index + 1]} onClick={handleAddToCart} className="w-5 h-5 top-0 right-0 absolute cursor-pointer"/>
    </div>
    <div className="relative hidden sm:flex md:hidden lg:flex"> <HeartIcon className="w-5 h-5 left-0 absolute"/>
    <img alt="" src={products[(index + 2)].image} className="lg:h-[320px] lg:w-[251px] p-6"/>
    <BuyIcon product={products[index + 2]} onClick={handleAddToCart} className="w-5 h-5 top-0 right-0 absolute cursor-pointer"/>
    </div>
   
    <div className="relative hidden sm:flex md:hidden lg:flex"> <HeartIcon className="w-5 h-5 left-0 absolute"/>
    <img alt="" src={products[(index + 3)].image} className="lg:h-[320px] lg:w-[251px] p-6"/>
    <BuyIcon product={products[index + 3]} onClick={handleAddToCart} className="w-5 h-5 top-0 right-0 absolute cursor-pointer"/>
    </div>
    {index !== 0 && (
    <ArrowLeft onClick={() => handlerLeft(index)} className="w-8 h-8 absolute top-1/2 left-0 bg-amber-300"/>
    )}
    {index + 4 !== products.length && (
    <ArrowLeft onClick={() => handlerRight(index)} className="w-8 h-8 absolute top-1/2 right-0 rotate-180 bg-amber-300"/>
    )}
    </div>
    </div>
    



</>)
}
export default Carousel;