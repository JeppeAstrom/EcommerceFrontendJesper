"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import Dropdown from "../icons/dropdown";
import Link from "next/link";
import SideNavigation from "@/components/side-navigation";

const MyPurchases = () => {
  const { isAuthenticated, handleLogout }: any = useContext(AuthContext);
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleReroute = () => {
    handleLogout();
    window.location.href = "/";
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    const checkAuthentication = async () => {
      const isLoggedin = await isAuthenticated();
      setIsLoggedIn(isLoggedin);
    };

    checkAuthentication();
  }, [isAuthenticated]);

  if (!isLoggedin) return;

  const sideMenuItems = [{
    href: '/mina-kop',
    title: 'mina köp'
  },
{  href: '/andra-address',
title: 'ändra address'}]

  return (
    <div className="w-full flex-col md:flex-row">
      <div className="w-1/4 pt-8">
        <span className="font-semibold text-3xl">Mina sidor</span>
        <button
          onClick={toggleMenu}
          className="flex gap-2 mt-16 text-normal text-black font-sans"
        >
          <span className="border-b border-black">Mina sidor</span>{" "}
          <Dropdown
            className={`w-7 h-7 ${
              isOpen ? "rotate-180 transition-all" : "transition-all"
            }`}
          />
        </button>
        {isOpen && (
         <SideNavigation activeRoute={'/mina-kop'} sideMenuItems={sideMenuItems} />
        )}
        <button className="text-start font-normal pt-5 font-sans" onClick={() => handleReroute()}>Logga ut</button>
      </div>
      <div>
        



      </div>
    </div>
  );
};
export default MyPurchases;
