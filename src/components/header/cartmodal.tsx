import  { Context } from "@/app/context";
import { NextPage } from "next";
import { useContext } from "react";
import CartIcon from "@/app/icons/cartIcon";
import CloseIcon from "@/app/icons/closeIcon";
import HorizontalCard from "../horizontalCard";
import { Product } from "@/types/product";

interface Props {
handleToggleCart: () => void;
}

const CartModal:NextPage<Props> = ({handleToggleCart}) => {
  const context = useContext(Context);

  const { cartItems}: any= context;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10">
    <div className="fixed top-0 right-0 lg:w-96 w-full h-full border z-20 bg-white overflow-y-auto">
      <div className="justify-between flex px-4 border items-center p-4">
        <CartIcon className="w-8 h-8 items-center"/>
        <CloseIcon onClick={handleToggleCart}  className="w-8 h-8 cursor-pointer"/>
      </div>
      <div className="p-4 flex flex-col">
        {cartItems && cartItems.map((product:Product, index:number) => (
          <HorizontalCard key={index} product={product} />
        ))}
      </div>
    </div>
    </div>
  );
  
}
export default CartModal;