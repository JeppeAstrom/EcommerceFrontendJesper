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

const Header = () => {
  

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
      <div className="flex w-full sticky top-0 z-[25] bg-white p-6 shadow-lg">
        <div className="flex justify-between lg:grid-cols-3 w-full items-center">
        <Hamburger onClick={handlerToggleCategoryModal} className="w-20 h-20 cursor-pointer lg:hidden"/>
        <Link href="/" className="flex lg:justify-bottom">
          <img
            alt=""
            className="h-[60px] w-auto"
            src="https://i.ibb.co/f82dWcj/ffffff.png"
          />
        </Link>
         <div className="flex justify-center items-center lg:w-1/5">
       
       
       
        </div>
        <div className="items-center justify-center hidden sm:flex md:hidden lg:flex w-3/5 flex-col gap-2">
       
        <div className="flex w-full">
        {categories.map((category, index) => (
       <Link key={index} className="items-center justify-center flex w-full" onClick={handlerToggleCategoryModal} href={'/produkter/kategori/' + category} >
       <span>{category}</span>
       </Link>
     
   ))}
        </div>
        <input
          className="text-md w-full lg:items-center lg:flex lg:justify-center border px-4 p-2 rounded-xl border-black"
          placeholder="Sök product, kategori eller varumärke"
        />
  
      </div>
    
       <div className="flex items-center justify-end gap-4 lg:w-1/5">
        <div className="flex gap-6 items-baseline">
       <Link className="items-center flex justify-center" href="/favoriter">
            <HeartIcon className="w-14 h-14 cursor-pointer" />
          </Link>
          <div className="items-center flex justify-center">
          <CartIcon
          showCount={true}
          cartCount={cartCount ? cartCount : 0}
            openCart={handlerToggleCart}
            className="w-14 h-14 cursor-pointer"
          />
           <button onClick={handlerToggleSearchModal} className="lg:hidden w-14 h-14 pl-4  cursor-pointer items-center flex justify-center">
          <Search className=""/>
          </button>
          </div>
          </div>
          {toggleCart && <CartModal  handleToggleCart={handlerToggleCart} />}
          
         
          </div>
       
        </div>
   
      
      {toggleCategoryModal && (
      <Modal title={'Kategorier'} toggleModal={handlerToggleCategoryModal}>
        {categories.map((category, index) => (
       
          <Link key={index} className="justify-between flex border-b border-black w-full p-2" onClick={handlerToggleCategoryModal} href={'/produkter/kategori/' + category} >
          <span>{category}</span>
          <ArrowLeft className="rotate-180 h-5 w-5 items-center flex justify-center mr-2"/>
          </Link>
        
      ))}
      </Modal>
         )}

      {toggleSearchModal && (
      <SearchModal toggleModal={handlerToggleSearchModal}>
        <div>
          
        </div>
      </SearchModal>
         )}
      <LastAddeditem/>
      </div>
    </>
  );
};
export default Header;
