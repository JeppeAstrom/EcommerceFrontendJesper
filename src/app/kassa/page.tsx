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
    <div className="flex flex-col justify-center items-center h-auto">


      <div className="flex-col lg:flex-row flex">
       
          <div className="relative overflow-y-auto items-center justify-center lg:min-w-3/4 sm:max-h-full md:max-h-[600px]">
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
    

        <div
          className='flex px-4 flex-col bg-white w-full items-center pt-4 mx-auto sticky bottom-0'
        >
          <div className="border border-black flex flex-col px-2 gap-2 w-[300px] lg:w-1/2 py-6">
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
      
  
      <div className="w-full lg:w-[400px] justify-center flex pt-5 px-4 pb-4">
        <button className="w-full bg-black border text-white font-semibold p-3">
          Köp nu
        </button>
      </div>
      </div>
      </div>
    </div>
  );
};
export default Checkout;
