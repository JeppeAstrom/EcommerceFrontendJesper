"use client";
import SideNavigation from "@/components/side-navigation";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../icons/dropdown";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/authContext";
import Image from "next/image";
import GetProfile from "@/utils/profileService";
import LoadingSpinner from "@/components/spinners/loadingSpinner";

export default function Profile() {
  const router = useRouter();
  const { isAuthenticated, handleLogout }: any = useContext(AuthContext);
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleReroute = () => {
    handleLogout();
    router.push("/");
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    const checkAuthentication = async () => {
      const isLoggedin = await isAuthenticated();
      setIsLoggedIn(isLoggedin);
    };

    checkAuthentication();
  }, [isAuthenticated]);

  interface User {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string | null;
    phoneNumber: string | null;
    location: string | null;
  }

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getProfile = async () => {
      const response = await GetProfile();
      setUser(response);
    };
    if (!isLoggedin) return;
    getProfile();
  }, [isLoggedin]);

  if (!isLoggedin) return;
  const sideMenuItems = [
    {
      href: "/min-profil",
      title: "min profil",
    },
    {
      href: "/mina-kop",
      title: "mina köp",
    },
  ];

  if(!user){
    return <LoadingSpinner/>
  }
 
  return (
    <div className="w-full lg:flex px-4 mb-10">
      <div className="lg:min-w-[150px] pt-8 sm:max-lg:w-full md:relative sm:relative">
        <span className="font-semibold text-3xl hidden md:flex sm:font-semibold">
          Min profil
        </span>
        <button
          onClick={toggleMenu}
          className="flex gap-2 md:mt-16 text-normal text-black"
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
            activeRoute={"/min-profil"}
            sideMenuItems={sideMenuItems}
          />
        )}
        <button
          className="text-start text-white bg-black p-3 mt-8 font-semibold  sm:max-lg:top-3 sm:max-lg:right-5 sm:max-lg:absolute"
          onClick={() => handleReroute()}
        >
          Logga ut
        </button>
      </div>
      <div className="flex lg:flex-row flex-col lg:px-8  justify-center lg:mt-14 w-full mx-auto sm:pt-10">
        {user?.imageUrl && (
          <figure className="flex items-center justify-center lg:w-1/3 mx-auto w-full h-full bg-gray-white rounded-full">
            <Image width={900} height={1300} src={user?.imageUrl} alt="" className="object-contain rounded-full object-center w-full h-full" />
          </figure>
        )}
        <div className="w-full flex-col flex px-4">
          <h1 className="font-bold text-xl text-center mt-4 lg:text-start">{`Hej ${user?.firstName} ${user?.lastName}!`}</h1>
        </div>
      </div>
    </div>
  );
}
