import { Context } from "@/app/context/cartContext";
import { NextPage } from "next";
import { useContext, useEffect, useRef } from "react";
import CloseIcon from "@/app/icons/closeIcon";
import HorizontalCard from "../horizontalCard";
import { Product } from "@/types/product";
import ArrowLeft from "@/app/icons/arrowleft";
import Link from "next/link";
import router, { useRouter } from "next/router";
import CartIcon from "@/app/icons/cartIcon";
import Image from "next/image";
import { TransitionEvent } from "react";
import CartCard from "./cartCard";
import { CartItem } from "@/utils/cartService";

interface Props {
  handleToggleCart: () => void;
  isOpen: boolean;
}

const CartModal: NextPage<Props> = ({ handleToggleCart, isOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleToggleCart();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleToggleCart, isOpen]);

  const context = useContext(Context);

  const { cartItems }: any = context;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 h-full p-4">
      <div
        ref={modalRef}
        className="fixed top-0 right-0 lg:w-[600px] w-full h-full z-20 bg-white"
      >
        <div className="justify-between flex px-4 items-center p-4 border-b">
          <div className="flex items-center gap-4">
            <CartIcon className="h-8 w-8" />
            <span className="text-lg font-semibold">Varukorg</span>
          </div>
          <CloseIcon
            onClick={handleToggleCart}
            className="w-8 h-8 cursor-pointer justify-center"
          />
        </div>
        <div className="flex flex-col py-5 pt-2 h-[75dvh] md:h-[80vh] overflow-y-auto">
          {cartItems && cartItems.length > 0 ? (
            (cartItems as CartItem[]).map((cartItem, index) => {
              return (
                <CartCard
                  handleToggleCart={handleToggleCart}
                  key={index}
                  cartItem={cartItem!}
                />
              );
            })
          ) : (
            <div className="bg-white">
              <Image
                className=" object-contain"
                width="900"
                height="1300"
                alt="empty"
                src="https://ew.com/thmb/Z2g30rIL2w8b7gHilkA9pY7Tp1I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sandler-samberg_458-f0247cb3789a4ad9bc718cfcd305c04a.jpg"
              />
            </div>
          )}
        </div>
        <div className="px-5 pb-2 bg-white absolute w-full bottom-0 pt-2 border border-t-gray-300">
          {cartItems && cartItems.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="justify-between flex">
                <span className="font-semibold">Totalt</span>
                <span className="font-semibold">
                  {cartItems &&
                    (cartItems as CartItem[]).reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )}
                  kr
                </span>
              </div>
              <Link
                onClick={handleToggleCart}
                href="/kassa"
                className="w-full bg-black flex items center justify-center font-semibold text-white p-3"
                aria-disabled={cartItems && cartItems.length > 0}
              >
                Till kassan
              </Link>
            </div>
          ) : (
            <span className="w-full bg-black flex items center justify-center font-semibold text-white p-3">
              Tom varukorg
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartModal;
