"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CartModal from "./cartmodal";
import CartIcon from "@/app/icons/cartIcon";
import dropshiplogo from "../../app/images/dropshiplogo.png";
import HeartIcon from "@/app/icons/hearticon";
import { Context } from "@/app/context";
import { Product } from "@/types/product";

const Header = () => {
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const handlerToggleCart = () => setToggleCart((prev) => !prev);

  const context = useContext(Context);

  const {cartItems}: any= context;

  const [cartCount, setCartCount] = useState<number>();

  useEffect(() => {
      setCartCount(cartItems ? cartItems.length : 0)
  },[cartItems])


 

  return (
    <>
      <div className="flex w-full sm:flex md:flex p-3 items-center justify-center">
        <Link href="/" className="flex">
          <img
            alt=""
            className="h-[100px]"
            src="https://i.ibb.co/rfctdQj/testlogo2.png"
          />
        </Link>
      </div>
      <div className="w-full items-center flex justify-center">
        <input
          className="text-sm w-full lg:items-center lg:flex lg:w-1/2 lg:justify-center border px-4 p-2 rounded-xl border-black"
          placeholder="Sök product, kategori eller varumärke"
        />
        <div className="flex items-center px-2 gap-2">
          <Link href="/favoriter">
            <HeartIcon className="w-[25px] h-[25px] cursor-pointer" />
          </Link>
          <CartIcon
          cartCount={cartCount ? cartCount : 0}
            openCart={handlerToggleCart}
            className="w-[25px] h-[25px] cursor-pointer"
          />
          {toggleCart && <CartModal handleToggleCart={handlerToggleCart} />}
        </div>
      </div>
    </>
  );
};
export default Header;
