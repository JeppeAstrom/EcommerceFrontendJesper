/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { ContextType, useContext, useEffect, useRef, useState } from "react";
import CartModal from "./cartmodal";
import CartIcon from "@/app/icons/cartIcon";
import HeartIcon from "@/app/icons/hearticon";
import { Context } from "@/app/context/cartContext";
import Hamburger from "@/app/icons/hamburger";
import Modal from "../modal";
import ArrowLeft from "@/app/icons/arrowleft";
import SearchModal from "../searchmodal";
import LastAddeditem from "./lastAddedItem";
import Person from "@/app/icons/person";
import AboutUs from "@/app/icons/aboutus";
import SearchBar from "./searchbar";

import { Category } from "@/types/category";
import Login from "../forms/login";
import { AuthContext } from "@/app/context/authContext";

const Header = () => {
  const { isAuthenticated }: any = useContext(AuthContext);
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [toggleCategoryModal, setToggleCategoryModal] =
    useState<boolean>(false);
  const [toggleSearchModal, setToggleSearchModal] = useState<boolean>(false);
  const handlerToggleCart = () => setToggleCart((prev) => !prev);
  const handlerToggleCategoryModal = () =>
    setToggleCategoryModal((prev) => !prev);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const handlerToggleSearchModal = () => setToggleSearchModal((prev) => !prev);
  const [headerShadow, setHeaderShadow] = useState("");
  const context = useContext(Context);
  const { lastAddedItem, clearLastAddedItem, allProducts, categories }: any =
    context;
  const { cartItems }: any = context;
  const [cartCount, setCartCount] = useState<number>();
  const [loginModal, setLoginModal] = useState<boolean>();
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  const handleOpenLoginModal = () => setLoginModal((prev) => !prev);

  const handleOpenCart = () => {
    setToggleCart(true);
    clearLastAddedItem();
  };

  useEffect(() => {
    setCartCount(cartItems ? cartItems.length : 0);
  }, [cartItems]);

  useEffect(() => {
    if (!lastAddedItem) return;
    if (lastAddedItem) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        clearLastAddedItem();
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem, clearLastAddedItem]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = document.documentElement.scrollTop;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);

      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY !== 0) {
        setHeaderShadow("shadow-lg");
      } else {
        setHeaderShadow("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isLoggedin = await isAuthenticated();
      setIsLoggedIn(isLoggedin);
    };

    checkAuthentication();  
  }, [isAuthenticated, loginModal]);

  useEffect(() => {
    if(toggleCart || loginModal){
      document.body.style.overflow = 'hidden';
    }
    else{
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  },[toggleCart,loginModal])

  return (
    <div className="sticky top-0 z-10">
      <div
        className={` bg-white  transition-opacity duration-300 ease-in-out ${headerShadow}  ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-center p-5">
          <div className="w-[1400px] mx-auto">
            <div className="flex flex-col py-2">
              <div className="flex lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 items-center justify-center">
                <div className="flex items-center justify-start w-1/3 gap-x-3">
                  <Link href="/favoriter" className="flex items-center gap-2">
                    <HeartIcon className="w-8 h-8 cursor-pointer fill-black" />
                    <span className="hidden lg:flex font-light">Favoriter</span>
                  </Link>

                  {isLoggedin ? (
                    <Link
                      href="/mina-kop"
                      className="lg:hidden font-light flex"
                    >
                      <Person className="h-8 w-8 lg:hidden" />
                    </Link>
                  ) : (
                    <button
                      onClick={handleOpenLoginModal}
                      className="items-center gap-2 lg:hidden"
                    >
                      <Person className="h-8 w-8 lg:hidden" />
                    </button>
                  )}

                  <div className="lg:flex items-center gap-2 hidden">
                    <AboutUs className="h-8 w-8" />
                    <span className="font-light">Om oss</span>
                  </div>
                </div>

                <div className="w-full items-center justify-center">
                  <Link
                    href="/"
                    className="flex items-center justify-center p-2 font-semibold text-lg"
                  >
                    SandlerShop
                  </Link>
                </div>

                <div className="flex gap-x-3 w-1/3">
                  <div className="gap-4 justify-end flex w-full lg:hidden">
                    <button onClick={handlerToggleCart} className="flex gap-2">
                      <CartIcon
                        showCount={true}
                        cartCount={cartCount ? cartCount : 0}
                        className="w-8 h-8 cursor-pointer"
                      />
                      <span className="pt-1 pl-2 hidden lg:flex font-light">
                        Varukorg
                      </span>
                    </button>
                  </div>

                  <div className="gap-4 justify-end flex">
                    {isLoggedin ? (
                      <Link
                        href="/mina-kop"
                        className="items-center gap-2 hidden lg:flex"
                      >
                        <Person className="h-8 w-8" />
                        <span className="hidden lg:flex font-light">
                          Mina sidor
                        </span>
                      </Link>
                    ) : (
                      <button
                        onClick={handleOpenLoginModal}
                        className="items-center gap-2 hidden lg:flex"
                      >
                        <Person className="h-8 w-8" />
                        <span className="hidden lg:flex font-light">
                          Logga in
                        </span>
                      </button>
                    )}

                    <button
                      onClick={handlerToggleCart}
                      className="items-center hidden lg:flex"
                    >
                      <CartIcon
                        showCount={true}
                        cartCount={cartCount ? cartCount : 0}
                        className="w-8 h-8 cursor-pointer"
                      />
                      <span className="pt-1 pl-2 hidden lg:flex font-light">
                        Varukorg
                      </span>
                    </button>
                    <div>
                      <Hamburger
                        onClick={handlerToggleCategoryModal}
                        className="w-8 h-8 cursor-pointer lg:hidden"
                      />
                    </div>
                  </div>
                </div>

                {toggleCategoryModal && (
                  <Modal
                    title={"Kategorier"}
                    toggleModal={handlerToggleCategoryModal}
                  >
                    {(categories as Category[]).map((category, index) => (
                      <Link
                        key={index}
                        className="justify-between items-center flex border-b border-black w-full p-2 h-[32x]"
                        onClick={handlerToggleCategoryModal}
                        href={"/produkter/kategori/" + category.name}
                      >
                        <span className="font-semibold">{category.name}</span>
                        <ArrowLeft blackArrow={true} className="rotate-180 h-8 w-8 items-center flex justify-center mr-2" />
                      </Link>
                    ))}
                  </Modal>
                )}

                {toggleSearchModal && (
                  <SearchModal toggleModal={handlerToggleSearchModal}>
                    <div></div>
                  </SearchModal>
                )}
              </div>
            </div>
            <div className="sm:w-full lg:w-2/4 mx-auto relative">
              <div className="hidden lg:flex items-center gap-x-6 justify-center">
                {(categories as Category[]).map((category, index) => (
                  <Link
                    key={index}
                    className="flex pb-1 font-semibold text-md"
                    href={"/produkter/kategori/" + category.name}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <SearchBar products={allProducts} />
            </div>
          </div>
        </div>
      </div>
      {toggleCart && (
        <CartModal isOpen={toggleCart} handleToggleCart={handlerToggleCart} />
      )}
      <LastAddeditem
        showNotification={showNotification}
        showHeader={showNotification}
        clearLastAddedItem={clearLastAddedItem}
        lastAddedItem={lastAddedItem}
        handleOpenCart={handleOpenCart}
      />
      {loginModal && <Login openModal={handleOpenLoginModal} />}
    </div>
  );
};
export default Header;
