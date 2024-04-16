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

  useEffect(() => {});

  const context = useContext(Context);

  const { cartItems }: any = context;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 h-full">
      <div
        ref={modalRef}
        className="fixed top-0 right-0 lg:w-[600px] w-full h-full z-20 bg-white overflow-y-auto"
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
        <div className="flex flex-col">
          {cartItems &&
            [...new Set((cartItems as Product[]).map((item) => item.id))].map(
              (productId) => {
                const product = (cartItems as Product[]).find(
                  (item) => item.id === productId
                );
                const quantity = (cartItems as Product[]).filter(
                  (item) => item.id === productId
                ).length;
                return (
                  <HorizontalCard
                    key={productId}
                    product={product!}
                    quantity={quantity}
                  />
                );
              }
            )}
        </div>

        <div className="px-5 pb-2 bg-white sticky  bottom-0">
          <Link
            onClick={handleToggleCart}
            href="/kassa"
            className="w-full bg-black flex items center justify-center font-semibold text-white p-3"
          >
            Till kassan
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CartModal;
