/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CartModal from "./cartmodal";
import CartIcon from "@/app/icons/cartIcon";
import dropshiplogo from "../../app/images/dropshiplogo.png";
import HeartIcon from "@/app/icons/hearticon";
import { Context } from "@/app/context";
import { Product } from "@/types/product";
import Hamburger from "@/app/icons/hamburger";
import Modal from "../modal";

import router from "next/navigation";
import ArrowLeft from "@/app/icons/arrowleft";
import Search from "@/app/icons/searchicon";
import SearchModal from "../searchmodal";
import LastAddeditem from "./lastAddedItem";


const categories:string[] = ["electronics",
"jewelery",
"men's clothing",
"women's clothing"]

const TestHeader = () => {
  

  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [toggleCategoryModal, setToggleCategoryModal] = useState<boolean>(false);
  const [toggleSearchModal, setToggleSearchModal] = useState<boolean>(false);
  const handlerToggleCart = () => setToggleCart((prev) => !prev);
  const handlerToggleCategoryModal= () => setToggleCategoryModal((prev) => !prev);


  const handlerToggleSearchModal = () => setToggleSearchModal((prev) => !prev);


  const context = useContext(Context);

  const {cartItems}: any= context;

  const [cartCount, setCartCount] = useState<number>();

  useEffect(() => {
      setCartCount(cartItems ? cartItems.length : 0)
  },[cartItems])

  return (
    <>
    <div className="flex flex-col">
    <div className="grid grid-cols-3">

        <div>
             hej
        </div>

        <div className="flex items-center justify-center">
        <Link href="/">
          <img
            alt=""
            className="h-[60px] w-auto"
            src="https://i.ibb.co/f82dWcj/ffffff.png"
          />
        </Link>
        Fly hamsterhjulet
        </div>

        <div className="flex items-end justify-end">
        <Link className="items-center flex justify-center" href="/favoriter">
            <HeartIcon className="w-14 h-14 cursor-pointer" />
          </Link>
          <CartIcon
          showCount={true}
          cartCount={cartCount ? cartCount : 0}
            openCart={handlerToggleCart}
            className="w-14 h-14 cursor-pointer"
          />
        </div>

    </div>
    <div className="w-full bg-white shadow-lg grid grid-cols-3">
        <div>

        </div>
        <div>

        </div>
        <div>
            
        </div>
    </div>
    </div>

    </>
  );
};
export default TestHeader;
