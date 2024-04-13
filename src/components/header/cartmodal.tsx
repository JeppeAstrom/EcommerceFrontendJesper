import { Context } from "@/app/context";
import { NextPage } from "next";
import { useContext, useEffect, useRef } from "react";
import CloseIcon from "@/app/icons/closeIcon";
import HorizontalCard from "../horizontalCard";
import { Product } from "@/types/product";
import ArrowLeft from "@/app/icons/arrowleft";
import Link from "next/link";
import router, { useRouter } from "next/router";

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

  const totalPrice = (cartItems as Product[]).reduce((total, item) => {
    return total + item.price;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 h-full">
      <div
        ref={modalRef}
        className="fixed top-0 right-0 lg:w-[600px] w-full h-full z-20 bg-white overflow-y-auto"
      >
        <div className="justify-between flex px-4 items-center p-4 border-b">
          <ArrowLeft
            onClick={handleToggleCart}
            className="w-8 h-8 cursor-pointer"
          />
          <span className="text-lg font-light">Varukorg</span>
          <CloseIcon
            onClick={handleToggleCart}
            className="w-8 h-8 cursor-pointer justify-center"
          />
        </div>
        <div className="p-4 flex flex-col">
{cartItems &&
  [...new Set((cartItems as Product[]).map(item => item.id))].map(productId => {
    const product = (cartItems as Product[]).find(item => item.id === productId);
    const quantity = (cartItems as Product[]).filter(item => item.id === productId).length;
    return <HorizontalCard key={productId} product={product!} quantity={quantity} />;
  })
}
        </div>
        <div className="flex justify-between">
        <div className="flex px-4 w-full h-fit">
        <div className="border border-black flex flex-col w-full px-4 gap-4 py-2">
        <span className="mx-auto text-2xl font-light font-serif">Din varukorg</span>
        <div className="flex justify-between">
        <span className="text-md font-serif">Total kostnad: </span>
        <span className="text-md font-serif">{`${totalPrice}kr`} </span>
        </div>

        <div className="flex justify-between">
        <span className="text-md font-serif">Kostnad inklusive frakt: </span>
        <span className="text-md font-serif">{`${totalPrice + 299}kr`} </span>
        </div>
        {cartItems && cartItems.length > 0 && (
          <Link
            onClick={handleToggleCart}
            href="/kassa"
            className="w-[200px] mx-auto sticky h-10 bg-white bottom-0 border border-black items-center flex justify-center"
          >
            Till kassan
            
          </Link>
          
        )}
   
        </div>
        
        </div>
       
      </div>
      </div>
    </div>
  );
};
export default CartModal;
