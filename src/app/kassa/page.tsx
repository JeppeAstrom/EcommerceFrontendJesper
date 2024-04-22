"use client";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/cartContext";
import { Product } from "@/types/product";
import Image from "next/image";
import CheckoutCard from "@/components/checkoutCard";
import AddressForm from "./addressForm";
import PostPayment from "@/utils/paymentService";
import Dropdown from "../icons/dropdown";
import { PostOrder } from "@/utils/orderService";
import { Address, GetAddress } from "@/utils/addressService";
import { AuthContext } from "../context/authContext";
import LoadingSpinner from "@/components/spinners/loadingSpinner";

const Checkout = () => {  
  const [savedAddress, setSavedAddress] = useState<Address | null>(null);
  useEffect(()  => {
  const fetchAddress = async () => {
    const response = await GetAddress();
    setSavedAddress(response);
  }
  fetchAddress();
  },[])
  const { isAuthenticated, handleLogout }: any = useContext(AuthContext);
  const context = useContext(Context);
  const [readyToPurchase, setReadyToPurchase] = useState<boolean>(false);
  const [address, setAddress] = useState<number>();
  const [showCart, setShowCart] = useState<boolean>(false);
  const { cartItems, resetCart }: any = context;

  const [cardName, setCardname] = useState<string>();
  const [cardNumber, setCardNumber] = useState<string>();
  const [cvv, setCvv] = useState<string>();
  const [expirationDate, setExpirationDate] = useState<string>();
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const toggleCart = () => setShowCart(prev => !prev);

  const handleAddressId = (addressId: number) => {
    setAddress(addressId);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      setAuthLoading(true);
      const isLoggedin = await isAuthenticated();
      setIsLoggedIn(isLoggedin);
      setAuthLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated]);
  
  useEffect(() => {
    if (address && cardName && cardNumber && cvv && expirationDate) {
      setReadyToPurchase(true);
    }
  }, [address, cardName, cardNumber, cvv, expirationDate]);

  useEffect(() => {
    if (orderComplete) {
      const timeoutId = setTimeout(() => {
       window.location.href = '/mina-kop'
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [orderComplete]);

  const handleBuy = async () => {
    const orderProducts = (cartItems as Product[]).map(item => ({
      productId: item.id,
      size: item.chosenSize
    }));
    
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
          totalPrice,
          orderProducts
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
      
  if (authLoading) {
    return (
 <LoadingSpinner/>
    );
  }

      if (!isLoggedin ) {
        return (
          <div className="w-full lg:w-[500px] justify-center items-center mx-auto flex pt-5 px-4 pb-4">
        <div className="flex-col flex items-center">
        <span className="font-normal text-center text-2xl pb-4 mx-auto border-b border-black">Logga in för att göra en order</span>
          <Image
            width="900"
            height="1300"
            alt="empty"
            src="https://assets-prd.ignimgs.com/2022/06/01/hustle-button-1654092606562.jpg"
          />
        </div>
      </div>
        );
      }

  if (cartItems && cartItems.length <= 0 && !orderComplete) {
    return (
      <div className="w-full lg:w-[500px] justify-center items-center mx-auto flex pt-5 px-4 pb-4">
      <div className="flex-col flex items-center">
      <span className="font-normal text-center text-2xl pb-4 mx-auto border-b border-black">Logga in för att göra en order</span>
        <Image
          width="900"
          height="1300"
          alt="empty"
          src="https://filmtopp.b-cdn.net/media/2021/04/adamsandler%20heroedit.jpeg"
        />
      </div>
    </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="w-full lg:w-[400px] justify-center items-center mx-auto flex pt-5 px-4 pb-4">
        <div className="flex-col px-4 flex gap-4">
          <span className=" font-normal text-3xl pb-4 mx-auto border-b border-black">Tack för din order!</span>
          <Image
            width="900"
            height="1300"
            alt="empty"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0SU3IjiqDWLIOT1fJBziWr59ELtS4i5ZpCq5T3XaZGYRBKltw"
          />
        
        </div>
        
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-auto mb-2">
      <div className="flex-col lg:flex-row-reverse flex w-full">
        <div className="relative overflow-y-auto items-center justify-center lg:w-3/4 sm:max-h-full md:max-h-[750px] pb-8">
          
          <button className="p-2 w-full flex mx-auto items-center justify-center gap-4  font-light" onClick={toggleCart}>
           <span>{`Varukorg (${cartItems && cartItems.length})st `}</span> 
               <Dropdown className={`h-7 w-7 mt-1 ${showCart ? 'rotate-180 transition-all' : 'transition-all'}`}/>
           </button>
          {showCart && (
          <div className="max-h-[50vh] overflow-y-auto w-full">
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
          <div className="justify-between flex border-t pt-3 mt-4 px-3">
            <span className="font-semibold text-md">Frakt</span>
            <span>0 kr</span>
          </div>
          <div className="justify-between flex mt-1 px-3 mb-2">
            <span className="font-semibold text-md">Delsumma</span>
            <span>{totalPrice} kr</span>
          </div>

          <div className="justify-between flex mt-1 border-t pt-3 px-3 border-b pb-3">
            <span className="font-semibold text-lg">Totalsumma</span>
            <span className="font-semibold text-lg">{totalPrice} kr</span>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-3/5 px-3">
          {!address ? (
            <AddressForm savedAddress={savedAddress} handleAddressId={handleAddressId} />
          ) : (
            <div className="gap-2 flex-col flex">
               <span className="mb-3 w-fit font-semibold text-lg border-b border-black">Kortuppgifter</span>
              <input
                value={cardName}
                onChange={(e) => setCardname(e.target.value)}
                placeholder="Kortnamn"
                className=" border-black border p-2 font-light text-sm"
              />

              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Kortnummer"
                className=" border-black border p-2 font-light text-sm"
              />

              <input
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
                className=" border-black border p-2 font-light text-sm"
              />

              <div className="flex w-full gap-3">
                <input
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  placeholder="Utgångsdatum"
                  className=" border-black border p-2 font-light text-sm"
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
            className="flex  flex-col bg-white w-full items-center mx-auto pt-4 pb-2 md:pt-2"
          >
            <div className="w-full justify-center flex">
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
