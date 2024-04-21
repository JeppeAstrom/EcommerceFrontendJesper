"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import Dropdown from "../icons/dropdown";
import SideNavigation from "@/components/side-navigation";
import { GetOrders, Order, OrderHistory } from "@/utils/orderService";
import OrderHistoryCard from "./orderHistoryCard";

import Carousel from "@/components/carousel";

const MyPurchases = () => {
  const { isAuthenticated, handleLogout }: any = useContext(AuthContext);
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [orderHistory, setOrderHistory] = useState<any>();
  const handleReroute = () => {
    handleLogout();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const order: any[] | undefined = await GetOrders();
      if(order && order?.length > 0){
      const sortedOrder = order.toReversed();
      setOrderHistory(sortedOrder);
    }
    };
    fetchOrderHistory();
  }, []);
  
  const toggleMenu = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    const checkAuthentication = async () => {
      const isLoggedin = await isAuthenticated();
      setIsLoggedIn(isLoggedin);
    };

    checkAuthentication();
  }, [isAuthenticated]);
  
  if (!isLoggedin) return;

  const sideMenuItems = [
    {
      href: "/mina-kop",
      title: "mina köp",
    },
    { href: "/andra-address", title: "ändra address" },
  ];
 
  return (
    <div className="w-full md:flex px-4 mb-10">
      <div className="lg:min-w-[300px] pt-8 sm:max-lg:w-full sm:relative">
      <span className="font-semibold text-3xl hidden md:flex sm:font-semibold">Mina sidor</span>
        <button
          onClick={toggleMenu}
          className="flex gap-2 md:mt-16 text-normal text-black font-sans"
        >
          <span className="border-b border-black">Mina sidor</span>
          <Dropdown
            className={`w-7 h-7 ${
              isOpen ? "rotate-180 transition-all" : "transition-all"
            }`}
          />
        </button>
        {isOpen && (
          <SideNavigation
            activeRoute={"/mina-kop"} 
            sideMenuItems={sideMenuItems}
          />
        )}
        <button
          className="text-start font-normal pt-5 font-sans sm:top-3 sm:right-5 sm:max-md:absolute"
          onClick={() => handleReroute()}
        >
          Logga ut
        </button>
      </div>
      <div>
        <div className="w-3/4 lg:px-8 items-center justify-center sm:w-full mx-auto sm:pt-10">
          {orderHistory &&
            orderHistory.map((order:any) => (
              <div key={order.id} className="text-sm mt-4 mx-auto">
                <div className="flex flex-col gap-1 ">
                  <span className="font-extralight text-2xl mb-2 ">Beställd {order.created}</span>
                <span className="">Order ID: {order.id}</span>
                <span className="font-semibold">Total pris: {order.totalPrice} kr</span>
                </div>
                <div className="pt-2 pb-4 border-b border-gray-400 overflow-x-auto w-full">
                  <Carousel visibleSlidesCountDesktop={order.orderProducts.length > 1 ? 2 : 1} visibleSlidesCountMobile={1} visibleSlidesCountTablet={1} useProgressBar={true}>
                  {order.orderProducts.map((orderProduct: any) => (
                    <OrderHistoryCard
                      size={orderProduct.size}
                      key={orderProduct.product.id}
                      product={orderProduct.product}
                    />
                  ))}
                  </Carousel>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default MyPurchases;