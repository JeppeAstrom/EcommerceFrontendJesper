"use client";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/cartContext";
import { Product } from "@/types/product";
import Image from "next/image";
import CheckoutCard from "@/components/checkoutCard";
import AddressForm from "./addressForm";
import PostPayment from "@/utils/paymentService";
import PostOrder from "@/utils/orderService";

const Checkout = () => {
  const context = useContext(Context);
  const [readyToPurchase, setReadyToPurchase] = useState<boolean>(false);
  const [address, setAddress] = useState<number>();
  const { cartItems, resetCart }: any = context;

  const [cardName, setCardname] = useState<string>();
  const [cardNumber, setCardNumber] = useState<string>();
  const [cvv, setCvv] = useState<string>();
  const [expirationDate, setExpirationDate] = useState<string>();

  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  const handleAddressId = (addressId: number) => {
    setAddress(addressId);
  };
  console.log(address, cardName, cardNumber, cvv, expirationDate);
  useEffect(() => {
    if (address && cardName && cardNumber && cvv && expirationDate) {
      setReadyToPurchase(true);
    }
  }, [address, cardName, cardNumber, cvv, expirationDate]);

  const handleBuy = async () => {
    if (cardName && cardNumber && cvv && expirationDate) {
      const paymentResponse = await PostPayment(
        cardName,
        cardNumber,
        cvv,
        expirationDate
      );

      if (paymentResponse && address) {
        const orderReponse = await PostOrder(
          paymentResponse,
          address,
          totalPrice
        );
        if (orderReponse) {
          setOrderComplete(orderReponse);
          resetCart();
        }
      }
    }
  };

  const totalPrice =
    Array.isArray(cartItems) && cartItems.length > 0
      ? cartItems.reduce((total, item) => total + item.price, 0)
      : 0;

  if (cartItems && cartItems.length <= 0 && !orderComplete) {
    return (
      <div className="w-full lg:w-[400px] justify-center items-center mx-auto flex pt-5 px-4 pb-4">
        <div className="flex-col">
          <Image
            width="900"
            height="1300"
            alt="empty"
            src="https://cdn.dribbble.com/users/2058104/screenshots/4198771/media/6a7fbadba54f099e51e634281956fae0.jpg?resize=400x300&vertical=center"
          />
          <button className="w-full bg-black border text-white font-semibold p-3">
            Tom varukorg
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="w-full lg:w-[400px] justify-center items-center mx-auto flex pt-5 px-4 pb-4">
        <div className="flex-col px-4 flex gap-4">
          <Image
            width="900"
            height="1300"
            alt="empty"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0SU3IjiqDWLIOT1fJBziWr59ELtS4i5ZpCq5T3XaZGYRBKltw"
          />
            <button className="w-full bg-black border text-white font-semibold p-3">
            Order lagd!
          </button>
        </div>
        
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-auto">
      <div className="flex-col lg:flex-row-reverse flex">
        <div className="relative overflow-y-auto items-center justify-center lg:w-3/4 sm:max-h-full md:max-h-[750px] pb-8">
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

          <div className="justify-between flex border-t pt-3 mt-4 px-3">
            <span className="font-semibold text-md">Frakt</span>
            <span>0 kr</span>
          </div>
          <div className="justify-between flex mt-1 px-3 mb-2">
            <span className="font-semibold text-md">Delsumma</span>
            <span>{totalPrice} kr</span>
          </div>

          <div className="justify-between flex mt-1 border-t pt-3 px-3">
            <span className="font-semibold text-lg">Totalsumma</span>
            <span className="font-semibold text-lg">{totalPrice} kr</span>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-3/5 gap-3 px-3">
          {!address ? (
            <AddressForm handleAddressId={handleAddressId} />
          ) : (
            <div className="gap-2 flex-col flex">
              <input
                value={cardName}
                onChange={(e) => setCardname(e.target.value)}
                placeholder="Kortnamn"
                className=" border-black border p-3"
              />

              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Kortnummer"
                className=" border-black border p-3"
              />

              <input
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
                className=" border-black border p-3"
              />

              <div className="flex w-full gap-3">
                <input
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  placeholder="Utgångsdatum"
                  className=" border-black border p-3"
                />

                <button
                  onClick={() => setAddress(undefined)}
                  className="w-1/4 bg-black font-semibold text-white"
                >
                  Tillbaka
                </button>
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleBuy();
            }}
            className="flex px-4 flex-col bg-white w-full items-center mx-auto sticky bottom-0 py-2 md:pt-5"
          >
            <div className="w-full lg:w-[400px] justify-center flex px-4">
              <button
                type="submit"
                disabled={!readyToPurchase}
                className={`w-full  border text-white font-semibold p-3 ${
                  readyToPurchase ? "bg-black" : "bg-gray-400"
                }`}
              >
                Köp nu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
