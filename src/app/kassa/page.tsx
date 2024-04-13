"use client";
import { useContext, useState } from "react";
import { Context } from "../context";
import { Product } from "@/types/product";
import HorizontalCard from "@/components/horizontalCard";
import ProductCard from "@/components/productcard";
import Dropdown from "../icons/dropdown";
import CheckoutCard from "@/components/checkoutCard";

const Checkout = () => {
  const context = useContext(Context);

  const { cartItems }: any = context;

  const [toggleBag, setToggleBag] = useState<boolean>(true);

  const handleToggleBag = () => setToggleBag((prev) => !prev);

  if (!cartItems || cartItems.length === 0) {
    return <div className="flex justify-center">Tom varukorg</div>;
  }

  const totalPrice = (cartItems as Product[]).reduce((total, item) => {
    return total + item.price;
  }, 0);

  return (
    <div className="flex flex-col justify-center items-center h-auto mb-10">
      <button
        className="flex items-center mx-auto justify-center w-full"
        onClick={handleToggleBag}
      >
        <Dropdown className={`w-10 h-10 ${toggleBag ? "rotate-180" : ""}`} />
        <span>{`Shopping bag ${
          cartItems.length !== undefined && cartItems.length
        }`}</span>
      </button>

      <div className="flex-col lg:flex-row flex">
        {toggleBag && (
          <div className="relative overflow-y-auto items-center justify-center lg:w-3/4 md:max-h-[600px]">
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
                    <CheckoutCard
                      key={productId}
                      product={product!}
                      quantity={quantity}
                    />
                  );
                }
              )}
          </div>
        )}

        <div
          className={`flex px-4 h-fit pt-4 ${
            toggleBag ? "lg:w-1/3" : "lg:w-full"
          }`}
        >
          <div className="border border-black flex flex-col w-full px-4 gap-4 py-6">
            <span className="mx-auto text-2xl font-light font-serif">
              Din order
            </span>
            <div className="flex justify-between">
              <span className="text-md font-serif">Total kostnad: </span>
              <span className="text-md font-serif">{`${totalPrice}kr`} </span>
            </div>

            <div className="flex justify-between">
              <span className="text-md font-serif">
                Kostnad inklusive frakt:{" "}
              </span>
              <span className="text-md font-serif">
                {`${totalPrice + 299}kr`}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex pt-10">
        <button className="w-[300px] md:rounded-xl bg-white border border-black p-3 font-serif">
          Köp nu
        </button>
      </div>
    </div>
  );
};
export default Checkout;
