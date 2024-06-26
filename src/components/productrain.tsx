"use client";

import ProductCard from "@/components/productcard";
import { Product } from "@/types/product";

import { NextPage } from "next";
import { useEffect, useState } from "react";

import Dropdown from "@/app/icons/dropdown";
import SideNavigation from "./side-navigation";
import { ChildCategories } from "@/utils/productService";
import SideMenuProductRain from "./sideMenuProductRain";
import ArrowLeft from "@/app/icons/arrowleft";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  products: Product[];
  category?: string;
  childCategories?: ChildCategories[];
  parentCategory?: string | undefined;
  handleFavourite?: () => void;
}

const ProductRain: NextPage<Props> = ({
  products,
  category,
  childCategories,
  parentCategory,
  handleFavourite
}) => {

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
      <div className="mb-10">
        <div className="flex justify-center sm:flex-col lg:flex-row">
          {category && (
            <div className="lg:min-w-[150px] md:sticky pointer md:top-2 flex lg:flex lg:flex-col sm:max-lg:px-4 h-fit">
              {parentCategory && (
                <Link
                  href={`/produkter/kategori/${
                    pathSegments[pathSegments.length - 2]
                  }`}
                  className="flex gap-2 mt-4 items-center sm:max-lg:border sm:max-lg:border-gray-500 sm:max-lg:p-3 sm:max-lg:px-5"
                >
                  <ArrowLeft blackArrow={true} className="w-5 h-5 lg:hidden" />
                  <span className="">{parentCategory}</span>
                </Link>
              )}
              <button
                onClick={toggleMenu}
                className="flex gap-2 sm:max-lg:hidden sm:max-lg:pointer-events-none mt-4 sm:max-lg:items-center text-normal text-black"
              >
                <span className={` ${parentCategory ? 'pl-4' : ''}`}>{category}</span>
                 {childCategories && childCategories?.length > 0 && (
                <Dropdown
                  className={`w-7 h-7 ${
                    isOpen ? "rotate-180 transition-all" : "transition-all"
                  }`}
                />
              )}
              </button>
              {isOpen && childCategories && childCategories.length > 0 && (
                <SideMenuProductRain
                  activeRoute={`/${category}`}
                  childCategories={childCategories}
                />
              )}
            </div>
          )}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 md:gap-7 p-2 gap-x-2  md:p-4 items-center justify-between">
           {products.map((product, index) => (
              <div key={index}>
                <ProductCard handleFavourite={handleFavourite} product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default ProductRain;
