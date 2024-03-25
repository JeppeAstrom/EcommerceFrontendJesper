/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { ContextType, useContext, useEffect, useState } from "react";
import CartModal from "./cartmodal";
import CartIcon from "@/app/icons/cartIcon";
import HeartIcon from "@/app/icons/hearticon";
import { Context } from "@/app/context";
import Hamburger from "@/app/icons/hamburger";
import Modal from "../modal";
import ArrowLeft from "@/app/icons/arrowleft";
import SearchModal from "../searchmodal";
import LastAddeditem from "./lastAddedItem";
import Person from "@/app/icons/person";
import AboutUs from "@/app/icons/aboutus";
import SearchBar from "./searchbar";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { getMainCategories } from "@/utils/productService";

const Header = () => {
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

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 200);

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

  return (
    <div
      className={`sticky top-0 bg-white z-10 transition-opacity duration-300 ease-in-out ${headerShadow}  ${
        visible || showNotification
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex justify-center p-5">
        <div className="w-[1400px] mx-auto">
          <div className="flex flex-col py-2">
            <div className="flex lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 items-center justify-center">
              <div className="flex items-center justify-start w-1/3 gap-x-3">
                <div className="flex items-center gap-2">
                  <Link
                    className="items-center flex justify-center"
                    href="/favoriter"
                  >
                    <HeartIcon className="w-8 h-8 cursor-pointer" />
                  </Link>
                  <span className="hidden lg:flex font-light">Favoriter</span>
                </div>
                <div className="items-center gap-2 lg:hidden">
                  <Person className="h-8 w-8" />
                  <span className="hidden lg:flex font-light">Logga in</span>
                </div>
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
                  <div className="items-center gap-2 hidden lg:flex">
                    <Person className="h-8 w-8" />
                    <span className="hidden lg:flex font-light">Logga in</span>
                  </div>

                  <button
                    onClick={handlerToggleCart}
                    className="gap-2 items-center hidden lg:flex"
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

              {toggleCart && <CartModal handleToggleCart={handlerToggleCart} />}
              {toggleCategoryModal && (
                <Modal
                  title={"Kategorier"}
                  toggleModal={handlerToggleCategoryModal}
                >
                  {(categories as Category[]).map((category, index) => (
                    <Link
                      key={index}
                      className="justify-between flex border-b border-black w-full p-2"
                      onClick={handlerToggleCategoryModal}
                      href={"/produkter/kategori/" + category.name}
                    >
                      <span>{category.name}</span>
                      <ArrowLeft className="rotate-180 h-5 w-5 items-center flex justify-center mr-2" />
                    </Link>
                  ))}
                </Modal>
              )}

              {toggleSearchModal && (
                <SearchModal toggleModal={handlerToggleSearchModal}>
                  <div></div>
                </SearchModal>
              )}
              <LastAddeditem
                showNotification={showNotification}
                showHeader={showNotification}
                clearLastAddedItem={clearLastAddedItem}
                lastAddedItem={lastAddedItem}
              />
            </div>
          </div>
          <div className="sm:w-full lg:w-2/4 mx-auto relative">
            <div className="hidden lg:flex items-center gap-x-6 justify-center">
              {(categories as Category[]).map((category, index) => (
                <Link
                  key={index}
                  className="flex pb-1"
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
  );
};
export default Header;
