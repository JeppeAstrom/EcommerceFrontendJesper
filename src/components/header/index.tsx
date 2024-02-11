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
const categories:string[] = ["electronics",
"jewelery",
"men's clothing",
"women's clothing"]

const Header = () => {
  

  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const handlerToggleCart = () => setToggleCart((prev) => !prev);
  const handlerToggleModal = () => setToggleModal((prev) => !prev);
  const context = useContext(Context);

  const {cartItems}: any= context;

  const [cartCount, setCartCount] = useState<number>();

  useEffect(() => {
      setCartCount(cartItems ? cartItems.length : 0)
  },[cartItems])

  return (
    <>
      <div className="flex w-full p-2">
        <div className="flex justify-between grid-cols-2 w-full items-center">
         <div className="flex">
        <Link href="/" className="flex">
          <img
            alt=""
            className="h-[60px]"
            src="https://i.ibb.co/f82dWcj/ffffff.png"
          />
        </Link>
      
        </div>
      
       <div className="flex items-center justify-center gap-4">
        <div className="flex gap-4">
       <Link href="/favoriter">
            <HeartIcon className="w-[25px] h-[25px] cursor-pointer" />
          </Link>
          <CartIcon
          showCount={true}
          cartCount={cartCount ? cartCount : 0}
            openCart={handlerToggleCart}
            className="w-[25px] h-[25px] cursor-pointer"
          />
          </div>
          {toggleCart && <CartModal  handleToggleCart={handlerToggleCart} />}
          <Hamburger onClick={handlerToggleModal} className="w-20 h-20 pl-4 cursor-pointer lg:hidden"/>
         
          </div>
       
        </div>
      </div>
      <div className="w-full items-center flex justify-center">
        <input
          className="text-md w-full lg:items-center lg:flex lg:w-1/2 lg:justify-center border px-4 p-2 rounded-xl border-black"
          placeholder="Sök product, kategori eller varumärke"
        />
        
      </div>
      {toggleModal && (
      <Modal title={'Kategorier'} toggleModal={handlerToggleModal}>
        {categories.map((category, index) => (
       
          <Link key={index} className="justify-between flex border-b border-black w-full p-2" onClick={handlerToggleModal} href={'/produkter/kategori/' + category} >
          <span>{category}</span>
          <ArrowLeft className="rotate-180 h-5 w-5 items-center flex justify-center mr-2"/>
          </Link>
        
      ))}
      </Modal>
         )}
    </>
  );
};
export default Header;
