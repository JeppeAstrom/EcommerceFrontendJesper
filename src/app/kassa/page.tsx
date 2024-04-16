"use client";
import { useContext, useState } from "react";
import { Context } from "../context/cartContext";
import { Product } from "@/types/product";
import HorizontalCard from "@/components/horizontalCard";
import ProductCard from "@/components/productcard";
import Dropdown from "../icons/dropdown";
import CheckoutCard from "@/components/checkoutCard";

const Checkout = () => {
  const context = useContext(Context);

  const { cartItems }: any = context;

  if (!cartItems || cartItems.length === 0) {
    return <div className="flex justify-center">Tom varukorg</div>;
  }

  const totalPrice = (cartItems as Product[]).reduce((total, item) => {
    return total + item.price;
  }, 0);

  return (
    <div className="flex flex-col justify-center items-center h-auto mb-10">


      <div className="flex-col lg:flex-row flex">
       
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
    

        <div
          className='flex px-4 h-fit pt-4'
        >
          <div className="border border-black flex flex-col px-2 gap-2  w-[300px] py-6">
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
      <div className="w-full justify-center flex pt-10 px-4">
        <button className="lg:w-[500px] w-full px-4 md:rounded-xl bg-black border text-white font-semibold p-3 ">
          Köp nu
        </button>
      </div>
    </div>
  );
};
export default Checkout;
