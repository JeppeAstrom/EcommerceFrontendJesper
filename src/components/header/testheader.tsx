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
import Person from "@/app/icons/person";


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
    
    <div className="flex flex-col py-4">
    <div className="grid lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1">

        <div className="flex w-full gap-2 lg:gap-4 items-center">
          <div>
        <Link href="/">
          <img
            alt=""
            className="h-[60px] w-auto"
            src="https://i.ibb.co/f82dWcj/ffffff.png"
          />
        </Link>
        </div>
        <input
          className="text-md h-10  w-1/2 border px-4 p-2 rounded-xl border-black items-baseline"
          placeholder="Sök product, kategori eller varumärke"
        />
        <div className="flex items-center gap-2">
         <Link className="items-center flex justify-center" href="/favoriter">
            <HeartIcon className="w-8 h-8 cursor-pointer" />
          </Link>
          <span className="hidden lg:flex md:flex">Favoriter</span>
          </div>
          <div>
          <button className="flex gap-2">
          <CartIcon
          showCount={true}
          cartCount={cartCount ? cartCount : 0}
            openCart={handlerToggleCart}
            className="w-8 h-8 cursor-pointer"
          />
          <span className="pt-1 pl-2 hidden md:flex lg:flex">
          Varukorg
          </span>
          </button>
          </div>
           <div className="flex items-center gap-2">
           <Person className="h-8 w-8"/>
           <span className="hidden lg:flex md:flex">Logga in</span>
           </div>
           <div>
           <Hamburger onClick={handlerToggleCategoryModal} className="w-8 h-8 cursor-pointer md:hidden lg:hidden"/>
           </div>  
           {toggleCart && <CartModal  handleToggleCart={handlerToggleCart} />}
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
    </div>
    </div>

  
  );
};
export default TestHeader;
