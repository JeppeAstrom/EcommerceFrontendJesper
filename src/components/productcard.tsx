/* eslint-disable @next/next/no-img-element */
"use client";

import { Context } from "@/app/context/cartContext";
import BuyIcon from "@/app/icons/buyicon";
import CartIcon from "@/app/icons/cartIcon";
import HeartIcon from "@/app/icons/hearticon";
import ReviewModal from "@/app/mina-kop/reviewModal";
import { Product, ProductGroup } from "@/types/product";
import { GetProductGroup } from "@/utils/productService";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import RegistrationModal from "./forms/registrationModal";
import QuickShopModal from "./quickshopModal";
import HorizontalCard from "./horizontalCard";
import CheckoutCard from "./checkoutCard";
import OrderHistoryCard from "@/app/mina-kop/orderHistoryCard";
import QuickShopCard from "./quickShopCard";
import Carousel from "./carousel";
import CartProductCard from "@/app/icons/cartproductcard";
import { CartItem } from "@/utils/cartService";
import { AuthContext } from "@/app/context/authContext";
import { AddToFavourites, GetFavourites } from "@/utils/favouriteService";

interface Props {
  product: Product;
  hideIcons?: boolean;
  handleFavourite?: () => void;
}

const ProductCard: NextPage<Props> = ({
  product,
  hideIcons = false,
  handleFavourite,
}) => {
  const {
    handleAddToCart,
    getFavouritesFromLocalStorage,
    addProductToFavouritesLocalStorage,
  }: any = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { isAuthenticated }: any = useContext(AuthContext);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isLoggedin = await isAuthenticated();
      setIsLoggedIn(isLoggedin);
    };

    checkAuthentication();
  }, [isAuthenticated]);

  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  const [productGroup, setProductGroup] = useState<ProductGroup | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ProductGroup: ProductGroup = await GetProductGroup(
          product.id as any
        );
        setProductGroup(ProductGroup);
      } catch (error) {

      }
    };
    fetchData();
  }, [product.id]);

  const [favourite, setFavourite] = useState<boolean>(false);
  const toggleFavourite = async () => {
    if (isLoggedIn) {
      const response = await AddToFavourites(product.id);
    } else {
      addProductToFavouritesLocalStorage(product);
    }
    setFavourite(!favourite);
  };

  useEffect(() => {
    const fetchAndSetFavourites = async () => {
      if (isLoggedIn) {
        try {
          const favouriteProducts = await GetFavourites();
          if (favouriteProducts) {
            setFavourite(favouriteProducts.some((p) => p.id === product.id));
          }
        } catch (error) {
    
        }
      } else {
        const favouriteProducts: Product[] = getFavouritesFromLocalStorage();
        setFavourite(favouriteProducts.some((p) => p.id === product.id));
      }
    };

    fetchAndSetFavourites();
  }, [
    isLoggedIn,
    getFavouritesFromLocalStorage,
    product.id,
    setFavourite,
    isAuthenticated,
  ]);

  const [hoverSwatch, setHoverSwatch] = useState<string>();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleProducts =
    productGroup && productGroup.products
      ? isExpanded
        ? productGroup.products
        : productGroup.products.slice(0, 4)
      : [];

  const [activeVariant, setActiveVariant] = useState<Product>();

  const handleProduct = () => {
    if (
      (productGroup &&
        productGroup.products &&
        productGroup.products.length > 1) ||
      product.sizes.length > 0
    ) {
      toggleMenu();
    } else {
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0].imageUrl,
        description: product.description,
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
        chosenSize: product.chosenSize
          ? product.chosenSize
          : product.sizes[0].size,
      };
      handleAddToCart(cartItem, cartItem);
    }
  };

  const [hoverSwatchModal, setHoverSwatchModal] = useState<Product>();

  return (
    <>
      <div className="flex flex-col max-w-sm items-center justify-center">
        <div className="py-4 items-center justify-center flex flex-col w-full relative">
          {!hideIcons && (
            <div className="flex justify-between absolute top-5 md:px-7 px-5 w-full">
              <CartProductCard
                quickshop={handleProduct}
                className="cursor-pointer z-[5] absolute left-1 top-1 w-[25px] h-[25px] md:w-[32px] md:h-[32px]"
              />
              <HeartIcon
                onClick={() => {
                  toggleFavourite();
                  if (handleFavourite) {
                    handleFavourite();
                  }
                }}
                favourite={favourite}
                className="cursor-pointer z-[5] absolute top-1 right-1 w-[25px] h-[25px] md:w-[32px] md:h-[32px]"
              />
            </div>
          )}
          <Link
            className="aspect-[9/13] items-center  flex min-h-full bg-neutral-100 justify-center relative"
            href={"/produkter/" + product.id}
          >
            <Image
              width={900}
              height={1300}
              alt=""
              src={hoverSwatch ? hoverSwatch : product.images[0].imageUrl}
              className="object-contain transition-all object-center items-center justify-center"
            />
          </Link>

          <span className="line-clamp-1 text-start w-full text-md pt-2">
            {product.name}
          </span>

          <div className="flex relative w-full justify-between">
            <div>
              <span className="text-sm font-bold">{product.price} kr</span>
            </div>
          </div>

          <div className="flex justify-start items-start mr-auto gap-1 pt-1">
            {productGroup &&
              !hideIcons &&
              productGroup.products &&
              productGroup.products.length > 0 &&
              [...productGroup.products]
                .sort((a, b) => {
                  if (a.id === product.id) return -1;
                  if (b.id === product.id) return 1;
                  return 0;
                })
                .map((variant) => (
                  <Link
                    onMouseOver={() =>
                      setHoverSwatch(variant.images[0].imageUrl)
                    }
                    onMouseLeave={() => setHoverSwatch(undefined)}
                    href={`/produkter/${variant.id}`}
                    style={{ background: variant.color }}
                    className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full border border-gray-600"
                    key={variant.id}
                  ></Link>
                ))}
          </div>
        </div>
      </div>
      {open && (
        <QuickShopModal toggleModal={toggleMenu}>
          <div className="w-full flex flex-col">
            <QuickShopCard
              toggleModal={toggleMenu}
              product={
                hoverSwatchModal
                  ? hoverSwatchModal
                  : activeVariant
                  ? activeVariant
                  : product
              }
            />
            <div className="px-5">
              {productGroup?.products &&
                productGroup.products.length > 1 &&
                visibleProducts && (
                  <div className="pt-4 grid grid-cols-4 gap-4 justify-evenly items-center">
                    {[...visibleProducts]
                      .sort((a, b) => {
                        if (a.id === product.id) return -1;
                        if (b.id === product.id) return 1;
                        return 0;
                      })
                      .map((variant) => (
                        <button
                          className="aspect-[9/13]"
                          key={product.id}
                          onClick={() => setActiveVariant(variant)}
                          onMouseOver={() => setHoverSwatchModal(variant)}
                          onMouseLeave={() => setHoverSwatchModal(undefined)}
                        >
                          <Image
                            className="w-full h-full object-contain object-center"
                            width={900}
                            height={1300}
                            alt={variant.name}
                            src={variant.images[0].imageUrl}
                          />
                          <div
                            className={`inline-block w-full h-[2px] ${
                              (activeVariant &&
                                activeVariant.id === variant.id) ||
                              (!activeVariant && variant.id === product.id)
                                ? "bg-black"
                                : "bg-gray-300"
                            }`}
                          ></div>
                        </button>
                      ))}
                  </div>
                )}
              {productGroup &&
                Array.isArray(productGroup.products) &&
                productGroup?.products.length > 3 &&
                !isExpanded &&
                visibleProducts?.length !== productGroup.products.length && (
                  <button
                    className="text-center py-2 border-b border-black font-semibold px-1 text-sm"
                    onClick={() => setIsExpanded(true)}
                  >
                    Visa mer
                  </button>
                )}
              {productGroup &&
                Array.isArray(productGroup.products) &&
                productGroup?.products.length > 3 &&
                isExpanded && (
                  <button
                    className="text-center py-2 border-b border-black font-semibold px-1 text-sm"
                    onClick={() => setIsExpanded(false)}
                  >
                    Visa mindre
                  </button>
                )}
            </div>
          </div>
        </QuickShopModal>
      )}
    </>
  );
};
export default ProductCard;
