/* eslint-disable @next/next/no-img-element */
import { AuthContext } from "@/app/context/authContext";
import { Context } from "@/app/context/cartContext";
import CloseIcon from "@/app/icons/closeIcon";
import HeartIcon from "@/app/icons/hearticon";
import Minus from "@/app/icons/minus";
import Plus from "@/app/icons/plus";
import TrashCan from "@/app/icons/trashcan";
import { Product } from "@/types/product";
import { CartItem } from "@/utils/cartService";
import { AddToFavourites, GetFavourites } from "@/utils/favouriteService";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface Props {
  cartItem: CartItem;
}

const CheckoutCard: NextPage<Props> = ({ cartItem }) => {
  const context = useContext(Context);

  const { removeFromCart, handleAddToCart, removeAllOfSameItem, addProductToFavouritesLocalStorage,
    getFavouritesFromLocalStorage,  }: any = context;




  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { isAuthenticated }: any = useContext(AuthContext);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isLoggedin = await isAuthenticated();
      setIsLoggedIn(isLoggedin);
    };

    checkAuthentication();
  }, [isAuthenticated]);

const [favourite, setFavourite] = useState<boolean>(false);
const toggleFavourite = async () => {
  if (isLoggedIn) {
    const response = await AddToFavourites(cartItem.productId);
  } else {
    addProductToFavouritesLocalStorage(cartItem);
  }
  setFavourite(!favourite);
};
useEffect(() => {
  const fetchAndSetFavourites = async () => {
    if (isLoggedIn) {
      try {
        const favouriteProducts: Product[] | undefined =
          await GetFavourites();
        if (favouriteProducts) {
          setFavourite(
            favouriteProducts.some((p) => p.id === cartItem.productId)
          );
        }
      } catch (error) {

      }
    } else {
      const favouriteProducts: Product[] = getFavouritesFromLocalStorage();
      setFavourite(favouriteProducts.some((p) => p.id === cartItem.productId));
    }
  };

  fetchAndSetFavourites();
}, [
  isLoggedIn,
  getFavouritesFromLocalStorage,
  cartItem.productId,
  setFavourite,
  isAuthenticated,
]);






  return (
    <>
      <div className="flex flex-row p-2 lg:p-2 py-3 pr-6 w-full">
        <div className="w-2/4 md:w-1/4 items-center flex justify-center pl-3 relative">
        <HeartIcon
                  favourite={favourite}
                  onClick={toggleFavourite}
                  className="h-6 w-6 z-[2] md:w-8 md:h-8 absolute left-4 top-1 cursor-pointer"
                />
          <Link href={`/produkter/${cartItem.productId}`} className="aspect-[9/13] bg-white items-center justify-center flex min-w-full h-full">
            <Image
              width={1300}
              height={900}
              alt=""
              src={cartItem.imageUrl}
              className="object-contain object-center min-h-full min-w-full"
            />
          </Link>
        </div>
        <div className="flex flex-col pl-2 w-full relative">
          <div className="flex justify-between">
            <span className="text-serif font-semibold line-clamp-2 max-w-[200px] lg:max-w-[300px] md:max-w-[500px]">
              {cartItem.name}
            </span>
            <button onClick={() => removeAllOfSameItem(cartItem)}>
              <TrashCan className="h-5 w-8" />
            </button>
          </div>

          <span className="text-sm line-clamp-4  max-w-[200px] lg:max-w-[300px] md:max-w-[500px]">
            {cartItem.description}
          </span>
          {cartItem.chosenSize && (
         <span className="md:pt-2 text-sm font-semibold">
         Storlek: {cartItem.chosenSize}
        </span>
        )}
          <div className="justify-between flex pt-1">
            <span className="text-sm font-semibold absolute bottom-0 left-2">
              {cartItem.price} kr
            </span>
            <div className="gap-2 flex justify-end w-full items-center">
           
                <div className="flex border border-black w-[80px] text-sm py-1 absolute right-2 bottom-0">
                  <p className="text-sm justify-start ml-2">{cartItem.quantity} </p>
                  <div className="flex justify-end w-full gap-1">
                    <button onClick={() => removeFromCart(cartItem)}>
                      <Minus className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleAddToCart(cartItem)}>
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckoutCard;
