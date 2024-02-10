import { Context } from "@/app/context";
import { NextPage } from "next";
import { useContext } from "react";
import ProductCard from "../productcard";
import CartIcon from "@/app/icons/cartIcon";
import CloseIcon from "@/app/icons/closeIcon";
import HorizontalCard from "../horizontalCard";

interface Props {
handleToggleCart: () => void;
}

const CartModal:NextPage<Props> = ({handleToggleCart}) => {

  const {cartItems} = useContext(Context);
  

  return (
    <div className="fixed top-0 right-0 w-96 h-full border z-20 bg-white overflow-y-auto">
      <div className="justify-between flex px-4 border items-center p-4">
        <CartIcon className="w-8 h-8 items-center"/>
        <CloseIcon onClick={handleToggleCart}  className="w-8 h-8 cursor-pointer"/>
      </div>
      <div className="p-4 flex flex-col">
        {cartItems && cartItems.map((product, index) => (
          <HorizontalCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
  
}
export default CartModal;